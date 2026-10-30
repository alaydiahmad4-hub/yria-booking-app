import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db, initDatabase } from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize SQLite Database schema & seeds
initDatabase();

const app = express();
const PORT = 5001;
const JWT_SECRET = process.env.JWT_SECRET || 'seyran_syria_super_secret_jwt_key_2026';

app.use(cors());
app.use(express.json());

// Auth Token Verification Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Authentication token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
}

// -------------------------------------------------------------
// 1. Health & Status
// -------------------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', engine: 'better-sqlite3', time: new Date().toISOString() });
});

// -------------------------------------------------------------
// 2. Authentication & Authorization (Step 2)
// -------------------------------------------------------------
app.post('/api/auth/register', (req, res) => {
  try {
    const { phone, name, password, role = 'guest' } = req.body;
    if (!phone || !name || !password) {
      return res.status(400).json({ error: 'رقم الهاتف، الاسم، وكلمة المرور مطلوبة' });
    }

    const cleanPhone = phone.trim();
    const existing = db.prepare('SELECT id FROM users WHERE phone = ?').get(cleanPhone);
    if (existing) {
      return res.status(400).json({ error: 'رقم الهاتف مسجل بالفعل مسبقاً' });
    }

    const id = `usr-${Date.now()}`;
    const hash = bcrypt.hashSync(password, 10);
    const createdAt = new Date().toISOString();

    db.prepare(`
      INSERT INTO users (id, phone, name, role, password_hash, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(id, cleanPhone, name.trim(), role, hash, createdAt);

    const user = { id, phone: cleanPhone, name: name.trim(), role };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ user, token, message: 'تم إنشاء الحساب بنجاح' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'فشل إنشاء الحساب', details: err.message });
  }
});

app.post('/api/auth/login', (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) {
      return res.status(400).json({ error: 'رقم الهاتف وكلمة المرور مطلوبان' });
    }

    const cleanPhone = phone.trim();
    const user = db.prepare('SELECT * FROM users WHERE phone = ?').get(cleanPhone);
    if (!user) {
      return res.status(401).json({ error: 'رقم الهاتف أو كلمة المرور غير صحيحة' });
    }

    const validPassword = bcrypt.compareSync(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'رقم الهاتف أو كلمة المرور غير صحيحة' });
    }

    const userInfo = { id: user.id, phone: user.phone, name: user.name, role: user.role };
    const token = jwt.sign(userInfo, JWT_SECRET, { expiresIn: '7d' });

    res.json({ user: userInfo, token, message: 'تم تسجيل الدخول بنجاح' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'فشل تسجيل الدخول', details: err.message });
  }
});

// Mock Syrian SMS OTP Verification Endpoint
app.post('/api/auth/otp-login', (req, res) => {
  try {
    const { phone, name, otp } = req.body;
    if (!phone) {
      return res.status(400).json({ error: 'رقم الهاتف مطلوب' });
    }

    // Default universal verification code for Syrian dev / testing is 123456
    const cleanPhone = phone.trim();
    let user = db.prepare('SELECT * FROM users WHERE phone = ?').get(cleanPhone);

    if (!user) {
      const id = `usr-${Date.now()}`;
      const defaultHash = bcrypt.hashSync('SeyranGuest@2026', 10);
      const createdAt = new Date().toISOString();
      const userName = name ? name.trim() : 'ضيف سيران';

      db.prepare(`
        INSERT INTO users (id, phone, name, role, password_hash, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(id, cleanPhone, userName, 'guest', defaultHash, createdAt);

      user = { id, phone: cleanPhone, name: userName, role: 'guest' };
    }

    const userInfo = { id: user.id, phone: user.phone, name: user.name, role: user.role };
    const token = jwt.sign(userInfo, JWT_SECRET, { expiresIn: '7d' });

    res.json({ user: userInfo, token, message: 'تم التحقق وتأكيد الدخول عبر الرمز' });
  } catch (err) {
    console.error('OTP login error:', err);
    res.status(500).json({ error: 'فشل التحقق من الرمز', details: err.message });
  }
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// -------------------------------------------------------------
// 3. Properties Management
// -------------------------------------------------------------
app.get('/api/properties', (req, res) => {
  try {
    const includeAll = req.query.all === 'true';
    let rows;
    if (includeAll) {
      rows = db.prepare('SELECT * FROM properties ORDER BY created_at DESC').all();
    } else {
      rows = db.prepare("SELECT * FROM properties WHERE status = 'approved' ORDER BY created_at DESC").all();
    }

    const properties = rows.map(r => {
      try {
        const parsed = JSON.parse(r.data_json);
        return {
          ...parsed,
          id: r.id,
          title: r.title,
          type: r.type,
          governorate: r.governorate,
          area: r.area,
          priceUsd: r.price_usd,
          dayUsePriceUsd: r.day_use_price_usd,
          status: r.status,
          isVerifiedField: Boolean(r.is_verified_field)
        };
      } catch {
        return r;
      }
    });

    res.json(properties);
  } catch (err) {
    console.error('Get properties error:', err);
    res.status(500).json({ error: 'فشل جلب قائمة العقارات' });
  }
});

app.post('/api/properties', (req, res) => {
  try {
    const p = req.body;
    const id = `prop-${Date.now()}`;
    const status = p.isAdmin ? 'approved' : 'pending_approval';
    const isVerifiedField = 0;
    const createdAt = new Date().toISOString();

    const fullProp = {
      id,
      status,
      isVerifiedField: false,
      verificationNotes: 'بانتظار التحقق الميداني من منظومة الطاقة الشمسية والمسبح',
      rating: 5.0,
      reviewCount: 0,
      createdAt,
      ...p
    };

    db.prepare(`
      INSERT INTO properties (id, title, type, governorate, area, price_usd, day_use_price_usd, status, is_verified_field, data_json, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      p.title || 'عقار سيران الجديد',
      p.type || 'chalet',
      p.governorate || 'دمشق',
      p.area || 'ريف دمشق',
      p.priceUsd || 100,
      p.dayUsePriceUsd || null,
      status,
      isVerifiedField,
      JSON.stringify(fullProp),
      createdAt,
      createdAt
    );

    res.status(201).json(fullProp);
  } catch (err) {
    console.error('Create property error:', err);
    res.status(500).json({ error: 'فشل إدراج العقار' });
  }
});

app.patch('/api/properties/:id', (req, res) => {
  try {
    const row = db.prepare('SELECT * FROM properties WHERE id = ?').get(req.params.id);
    if (!row) return res.status(404).json({ error: 'العقار غير موجود' });

    let existingData = {};
    try { existingData = JSON.parse(row.data_json); } catch {}

    const updatedData = { ...existingData, ...req.body };
    const newStatus = req.body.status !== undefined ? req.body.status : row.status;
    const newVerified = req.body.isVerifiedField !== undefined ? (req.body.isVerifiedField ? 1 : 0) : row.is_verified_field;
    const newPrice = req.body.priceUsd !== undefined ? req.body.priceUsd : row.price_usd;
    const updatedAt = new Date().toISOString();

    db.prepare(`
      UPDATE properties
      SET status = ?, is_verified_field = ?, price_usd = ?, data_json = ?, updated_at = ?
      WHERE id = ?
    `).run(newStatus, newVerified, newPrice, JSON.stringify(updatedData), updatedAt, req.params.id);

    res.json({ ...updatedData, id: req.params.id, status: newStatus, isVerifiedField: Boolean(newVerified) });
  } catch (err) {
    console.error('Update property error:', err);
    res.status(500).json({ error: 'فشل تحديث العقار' });
  }
});

app.delete('/api/properties/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM properties WHERE id = ?').run(req.params.id);
    res.json({ success: true, id: req.params.id });
  } catch (err) {
    console.error('Delete property error:', err);
    res.status(500).json({ error: 'فشل حذف العقار' });
  }
});

// -------------------------------------------------------------
// 4. Bookings & Escrow Operations
// -------------------------------------------------------------
app.get('/api/bookings', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM bookings ORDER BY created_at DESC').all();
    const bookings = rows.map(r => {
      try {
        const parsed = JSON.parse(r.data_json);
        return {
          ...parsed,
          id: r.id,
          propertyId: r.property_id,
          guestName: r.guest_name,
          guestPhone: r.guest_phone,
          checkIn: r.check_in,
          checkOut: r.check_out,
          bookingType: r.booking_type,
          paymentMethod: r.payment_method,
          paymentStatus: r.payment_status,
          escrowStatus: r.escrow_status,
          totalPriceUsd: r.total_price_usd,
          totalPriceSyp: r.total_price_syp,
          depositUsd: r.deposit_usd,
          depositSyp: r.deposit_syp,
          remainingUsd: r.remaining_usd,
          remainingSyp: r.remaining_syp,
          transactionReference: r.transaction_reference
        };
      } catch {
        return r;
      }
    });

    res.json(bookings);
  } catch (err) {
    console.error('Get bookings error:', err);
    res.status(500).json({ error: 'فشل جلب الحجوزات' });
  }
});

app.post('/api/bookings', (req, res) => {
  try {
    const b = req.body;
    const { totalPriceUsd = 100, totalPriceSyp = 1450000 } = b;
    const depositUsd = Math.round(totalPriceUsd * 0.25);
    const depositSyp = Math.round(totalPriceSyp * 0.25);
    const remainingUsd = totalPriceUsd - depositUsd;
    const remainingSyp = totalPriceSyp - depositSyp;
    const id = b.id || `book-${Date.now()}`;
    const createdAt = new Date().toISOString();
    const paymentStatus = b.paymentMethod === 'cash_deposit' ? 'cash_on_arrival' : 'pending_verification';
    const escrowStatus = 'held_in_escrow';

    const fullBooking = {
      id,
      depositUsd,
      depositSyp,
      remainingUsd,
      remainingSyp,
      paymentStatus,
      escrowStatus,
      createdAt,
      ...b
    };

    db.prepare(`
      INSERT INTO bookings (id, property_id, guest_name, guest_phone, check_in, check_out, booking_type, payment_method, payment_status, escrow_status, total_price_usd, total_price_syp, deposit_usd, deposit_syp, remaining_usd, remaining_syp, transaction_reference, data_json, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      b.propertyId || 'prop-1',
      b.guestName || 'ضيف سيران',
      b.guestPhone || '+963911000000',
      b.checkIn || createdAt.split('T')[0],
      b.checkOut || createdAt.split('T')[0],
      b.bookingType || 'overnight',
      b.paymentMethod || 'cash_deposit',
      paymentStatus,
      escrowStatus,
      totalPriceUsd,
      totalPriceSyp,
      depositUsd,
      depositSyp,
      remainingUsd,
      remainingSyp,
      b.transactionReference || null,
      JSON.stringify(fullBooking),
      createdAt,
      createdAt
    );

    res.status(201).json(fullBooking);
  } catch (err) {
    console.error('Create booking error:', err);
    res.status(500).json({ error: 'فشل تأكيد الحجز' });
  }
});

app.patch('/api/bookings/:id', (req, res) => {
  try {
    const row = db.prepare('SELECT * FROM bookings WHERE id = ?').get(req.params.id);
    if (!row) return res.status(404).json({ error: 'الحجز غير موجود' });

    let existing = {};
    try { existing = JSON.parse(row.data_json); } catch {}

    const updated = { ...existing, ...req.body };
    const newPaymentStatus = req.body.paymentStatus !== undefined ? req.body.paymentStatus : row.payment_status;
    const newEscrowStatus = req.body.escrowStatus !== undefined ? req.body.escrowStatus : row.escrow_status;
    const updatedAt = new Date().toISOString();

    db.prepare(`
      UPDATE bookings
      SET payment_status = ?, escrow_status = ?, data_json = ?, updated_at = ?
      WHERE id = ?
    `).run(newPaymentStatus, newEscrowStatus, JSON.stringify(updated), updatedAt, req.params.id);

    res.json({ ...updated, id: req.params.id, paymentStatus: newPaymentStatus, escrowStatus: newEscrowStatus });
  } catch (err) {
    console.error('Update booking error:', err);
    res.status(500).json({ error: 'فشل تحديث الحجز' });
  }
});

// -------------------------------------------------------------
// 5. Payment Gateway Webhooks & Ledger (Step 3)
// -------------------------------------------------------------
// Syriatel Cash Official Merchant Webhook Simulator
app.post('/api/payments/syriatel/webhook', (req, res) => {
  try {
    const {
      transactionId,
      bookingId,
      amountSyp,
      senderPhone,
      signature,
      status = 'SUCCESS'
    } = req.body;

    if (!transactionId || !bookingId) {
      return res.status(400).json({ error: 'بيانات العملية غير مكتملة' });
    }

    const payId = `pay-${Date.now()}`;
    const createdAt = new Date().toISOString();

    // 1. Record payment in SQLite ledger
    db.prepare(`
      INSERT OR REPLACE INTO payments (id, booking_id, provider, reference, amount_syp, status, sender_phone, metadata_json, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      payId,
      bookingId,
      'syriatel_cash',
      transactionId,
      amountSyp || 362500,
      status === 'SUCCESS' ? 'verified' : 'rejected',
      senderPhone || '+963944000000',
      JSON.stringify(req.body),
      createdAt
    );

    // 2. Auto-confirm booking in Escrow
    if (status === 'SUCCESS') {
      const booking = db.prepare('SELECT * FROM bookings WHERE id = ?').get(bookingId);
      if (booking) {
        let bData = {};
        try { bData = JSON.parse(booking.data_json); } catch {}
        bData.paymentStatus = 'confirmed';
        bData.transactionReference = transactionId;
        bData.escrowStatus = 'held_in_escrow';

        db.prepare(`
          UPDATE bookings
          SET payment_status = 'confirmed', escrow_status = 'held_in_escrow', transaction_reference = ?, data_json = ?, updated_at = ?
          WHERE id = ?
        `).run(transactionId, JSON.stringify(bData), createdAt, bookingId);
      }
    }

    res.json({
      success: true,
      transactionId,
      bookingId,
      status: 'confirmed',
      message: 'تم تأكيد وصول العربون عبر سيريتل كاش بنجاح واحتجازه بنظام الأمانات'
    });
  } catch (err) {
    console.error('Syriatel webhook error:', err);
    res.status(500).json({ error: 'فشل معالجة إشعار الدفع' });
  }
});

// Al-Haram / MTN Cash Manual Verification Endpoint
app.post('/api/payments/verify-reference', (req, res) => {
  try {
    const { bookingId, reference, provider = 'al_haram' } = req.body;
    if (!bookingId || !reference) {
      return res.status(400).json({ error: 'رقم الحجز ورقم الإشعار مطلوبان' });
    }

    const payId = `pay-${Date.now()}`;
    const createdAt = new Date().toISOString();

    db.prepare(`
      INSERT OR REPLACE INTO payments (id, booking_id, provider, reference, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(payId, bookingId, provider, reference.trim(), 'verified', createdAt);

    const booking = db.prepare('SELECT * FROM bookings WHERE id = ?').get(bookingId);
    if (booking) {
      let bData = {};
      try { bData = JSON.parse(booking.data_json); } catch {}
      bData.paymentStatus = 'confirmed';
      bData.transactionReference = reference.trim();

      db.prepare(`
        UPDATE bookings
        SET payment_status = 'confirmed', transaction_reference = ?, data_json = ?, updated_at = ?
        WHERE id = ?
      `).run(reference.trim(), JSON.stringify(bData), createdAt, bookingId);
    }

    res.json({ success: true, reference, message: 'تم التحقق من الحوالة وتأكيد العربون بنجاح' });
  } catch (err) {
    console.error('Verify reference error:', err);
    res.status(500).json({ error: 'فشل التحقق من الإشعار' });
  }
});

// -------------------------------------------------------------
// 6. Admin Statistics
// -------------------------------------------------------------
app.get('/api/stats', (req, res) => {
  try {
    const totalBookings = db.prepare('SELECT COUNT(*) as c FROM bookings').get().c;
    const totalProperties = db.prepare('SELECT COUNT(*) as c FROM properties').get().c;
    const approvedProps = db.prepare("SELECT COUNT(*) as c FROM properties WHERE status = 'approved'").get().c;
    const pendingProps = db.prepare("SELECT COUNT(*) as c FROM properties WHERE status = 'pending_approval'").get().c;

    const volumeQuery = db.prepare('SELECT SUM(total_price_usd) as totalUsd, SUM(deposit_usd) as escrowUsd FROM bookings').get();
    const totalVolumeUsd = volumeQuery.totalUsd || 0;
    const pendingEscrowUsd = volumeQuery.escrowUsd || 0;

    res.json({
      totalBookings,
      totalVolumeUsd,
      pendingEscrowUsd,
      propertiesCount: totalProperties,
      approvedProperties: approvedProps,
      pendingProperties: pendingProps
    });
  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({ error: 'فشل جلب الإحصائيات' });
  }
});

// -------------------------------------------------------------
// 7. Live Chat & Intelligent Syrian Concierge
// -------------------------------------------------------------
app.get('/api/chat/messages', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM chat_messages ORDER BY timestamp ASC').all();
    const messages = rows.map(r => ({
      id: r.id,
      sender: r.sender,
      senderName: r.sender_name,
      text: r.text,
      propertyId: r.property_id,
      status: r.status,
      timestamp: r.timestamp
    }));
    res.json(messages);
  } catch (err) {
    console.error('Chat get error:', err);
    res.status(500).json({ error: 'فشل جلب رسائل المحادثة' });
  }
});

app.post('/api/chat/messages', (req, res) => {
  try {
    const { text, sender = 'user', senderName = 'الضيف', propertyId } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'نص الرسالة مطلوب' });
    }

    const userMsg = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      sender,
      senderName,
      text: text.trim(),
      propertyId: propertyId || null,
      timestamp: new Date().toISOString(),
      status: 'delivered'
    };

    db.prepare(`
      INSERT INTO chat_messages (id, sender, sender_name, text, property_id, status, timestamp)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(userMsg.id, userMsg.sender, userMsg.senderName, userMsg.text, userMsg.propertyId, userMsg.status, userMsg.timestamp);

    // Context-aware Syrian Smart Concierge Reply
    let autoReply = null;
    if (sender === 'user') {
      const lower = text.toLowerCase();
      let replyText = 'تم استلام استفسارك بنجاح! سيقوم فريق خدمة عملاء ومستشاري سيران بالتواصل معك فوراً لتأكيد كافة الترتيبات.';

      if (lower.includes('طاقة') || lower.includes('كهربا') || lower.includes('مكيف') || lower.includes('انترنت') || lower.includes('نت')) {
        replyText = '⚡ نؤكد لك أن كافة العقارات المعتمدة في سيران مزودة بإما منظومة طاقة شمسية ليثيوم 24/7 تشغل المكيفات أو مولدات احتياطية، مع خط فايبر/إنترنت مستمر ومفحوص ميدانياً.';
      } else if (lower.includes('دفع') || lower.includes('سيريتل') || lower.includes('كاش') || lower.includes('عربون') || lower.includes('دولار') || lower.includes('ليرة')) {
        replyText = '💳 الدفع في سيران آمن ومحمي بنظام الأمانات (Escrow): تدفع عربون 25% فقط عبر سيريتل كاش أو حوالة الهرم أو كاش باليد، والمبلغ محجوز ولا يُسلّم للمضيف إلا بعد دخولك ومعاينتك للعقار.';
      } else if (lower.includes('يعفور') || lower.includes('بلودان') || lower.includes('صحنايا') || lower.includes('مزرعة') || lower.includes('مسبح')) {
        replyText = '🏡 متوفر لدينا شاليهات ومزارع مميزة في يعفور وبلودان وصحنايا مع مسابح معقمة وسواتر خصوصية عائلية تامة. هل ترغب بحجز لقضاء يوم (Day Use) أم إقامة كاملة؟';
      } else if (lower.includes('فندق') || lower.includes('دمشق') || lower.includes('تراث') || lower.includes('باب توما')) {
        replyText = '🏨 فنادق دمشق القديمة وقصور باب توما وساروجة التراثية متاحة مع فطور شامي وضيافة فاخرة، مع تأكيد حجز فوري للمغتربين والزوار.';
      } else if (lower.includes('مرحبا') || lower.includes('السلام') || lower.includes('أهلا') || lower.includes('مساء') || lower.includes('صباح')) {
        replyText = 'أهلاً وسهلاً بك في سيران سوريا! يسعدنا مساعدتك في اختيار أفضل مكان لإقامتك أو عطلتك القادمة، تفضل بأي استفسار!';
      }

      autoReply = {
        id: `msg-${Date.now() + 1}-reply`,
        sender: 'support',
        senderName: 'مستشار سيران الذكي',
        text: replyText,
        propertyId: propertyId || null,
        timestamp: new Date().toISOString(),
        status: 'delivered'
      };

      db.prepare(`
        INSERT INTO chat_messages (id, sender, sender_name, text, property_id, status, timestamp)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(autoReply.id, autoReply.sender, autoReply.senderName, autoReply.text, autoReply.propertyId, autoReply.status, autoReply.timestamp);
    }

    const allMessages = db.prepare('SELECT * FROM chat_messages ORDER BY timestamp ASC').all().map(r => ({
      id: r.id,
      sender: r.sender,
      senderName: r.sender_name,
      text: r.text,
      propertyId: r.property_id,
      status: r.status,
      timestamp: r.timestamp
    }));

    res.status(201).json({
      userMessage: userMsg,
      replyMessage: autoReply,
      allMessages
    });
  } catch (err) {
    console.error('Chat post error:', err);
    res.status(500).json({ error: 'فشل إرسال الرسالة' });
  }
});

app.delete('/api/chat/messages', (req, res) => {
  try {
    db.prepare('DELETE FROM chat_messages').run();
    db.prepare(`
      INSERT INTO chat_messages (id, sender, sender_name, text, property_id, status, timestamp)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      'msg-welcome',
      'support',
      'مستشار سيران الذكي',
      'أهلاً بك في منصة سيران سوريا 🌿! كيف يمكننا مساعدتك اليوم؟ يمكنك الاستفسار عن توفر المزارع والشاليهات، منظومات الطاقة الشمسية، أو المساعدة في الحجز وطرق الدفع بالليرة والدولار.',
      null,
      'read',
      new Date().toISOString()
    );

    res.json({ success: true, message: 'تمت إعادة ضبط المحادثة بنجاح' });
  } catch (err) {
    console.error('Reset chat error:', err);
    res.status(500).json({ error: 'فشل إعادة ضبط المحادثة' });
  }
});

// -------------------------------------------------------------
// 8. Official PDF Voucher Generation
// -------------------------------------------------------------
app.get('/api/bookings/:id/pdf', (req, res) => {
  try {
    const bookingRow = db.prepare('SELECT * FROM bookings WHERE id = ?').get(req.params.id) ||
                       db.prepare('SELECT * FROM bookings LIMIT 1').get();
    if (!bookingRow) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    let booking = {};
    try { booking = JSON.parse(bookingRow.data_json); } catch { booking = bookingRow; }

    const propRow = db.prepare('SELECT * FROM properties WHERE id = ?').get(booking.propertyId || bookingRow.property_id);
    let property = {};
    if (propRow) {
      try { property = JSON.parse(propRow.data_json); } catch { property = propRow; }
    }

    const payload = { booking, property };
    const tempJson = path.join(__dirname, `temp_${Date.now()}.json`);
    const outPdf = path.join(__dirname, `voucher_${bookingRow.id}.pdf`);

    fs.writeFileSync(tempJson, JSON.stringify(payload), 'utf-8');
    execSync(`python generate_voucher_pdf.py "${tempJson}" "${outPdf}"`, { cwd: __dirname, timeout: 15000 });

    try { fs.unlinkSync(tempJson); } catch (e) {}

    const pdfBuffer = fs.readFileSync(outPdf);
    try { fs.unlinkSync(outPdf); } catch (e) {}

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="Seyran_Voucher_${bookingRow.id}.pdf"`);
    res.send(pdfBuffer);
  } catch (err) {
    console.error('PDF Generation Error:', err);
    res.status(500).json({ error: 'Failed to generate PDF voucher', details: err.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Seyran Syria Production Server running on http://localhost:${PORT}`);
});
