import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'db.json');

const app = express();

// Security middlewares
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret_in_prod';

// Rate limiting: max 100 requests per 15 minutes per IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api/', apiLimiter);

// CORS – allow only trusted origins (dev and production)
const allowedOrigins = ['http://localhost:3000', 'https://syria-booking.example.com'];
app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps, curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

app.use(cookieParser());
// CSRF token endpoint for frontend
app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Dummy login route (for demo purposes)
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

app.post('/api/login', (req, res) => {
  const parse = loginSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: 'Invalid login data', details: parse.error.errors });
  }
  const { email, password } = parse.data;
  // In a real app, verify against DB. Here we accept any credentials.
  const user = { id: 'user-1', email, role: 'host' }; // role can be 'host' or 'admin'
  const token = jwt.sign(user, JWT_SECRET, { expiresIn: '2h' });
  // Set HttpOnly cookie
  res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
  res.json({ message: 'Logged in', user });
});

app.use(csurf({ cookie: true }));

// Helper to verify JWT token
function authMiddleware(req, res, next) {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: 'Authentication required' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    // attach user info to request for later use
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

const PORT = 5001;

app.use(cors());
app.use(express.json());

// Zod schemas for request validation
const propertySchema = z.object({
  title: z.string().min(1),
  area: z.string().min(1),
  governorate: z.string().min(1),
  priceUsd: z.number().positive(),
  // other fields can be optional for demo purposes
});

const bookingSchema = z.object({
  propertyId: z.string().min(1),
  userId: z.string().min(1),
  totalPriceUsd: z.number().positive(),
  totalPriceSyp: z.number().positive(),
  paymentMethod: z.enum(['cash_deposit', 'online']),
  // additional fields as needed
});

function readDb() {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    if (!parsed.chatMessages || !Array.isArray(parsed.chatMessages) || parsed.chatMessages.length === 0) {
      parsed.chatMessages = [
        {
          id: 'msg-welcome',
          sender: 'support',
          senderName: 'مستشار سيران الذكي',
          text: 'أهلاً بك في منصة سيران سوريا 🌿! كيف يمكننا مساعدتك اليوم؟ يمكنك الاستفسار عن توفر المزارع والشاليهات، منظومات الطاقة الشمسية، أو المساعدة في الحجز وطرق الدفع بالليرة والدولار.',
          timestamp: new Date().toISOString(),
          status: 'read'
        }
      ];
    }
    return parsed;
  } catch (err) {
    console.error('Error reading db.json:', err);
    return { properties: [], bookings: [], chatMessages: [] };
  }
}

function writeDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing db.json:', err);
    return false;
  }
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// GET Properties
app.get('/api/properties', (req, res) => {
  const db = readDb();
  const includeAll = req.query.all === 'true';
  if (includeAll) {
    return res.json(db.properties);
  }
  // Public users only see approved properties
  const publicProps = db.properties.filter(p => p.status === 'approved' || !p.status);
  res.json(publicProps);
});

// POST New Property (from Host)
app.post('/api/properties', authMiddleware, (req, res) => {
  // Validate input using Zod
  const parseResult = propertySchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: 'Invalid property data', details: parseResult.error.errors });
  }
  const validData = parseResult.data;
  const db = readDb();
  const newProp = {
    id: `prop-${Date.now()}`,
    status: req.body.isAdmin ? 'approved' : 'pending_approval',
    isVerifiedField: false,
    verificationNotes: 'بانتظار التحقق الميداني من منظومة الطاقة الشمسية والمسبح',
    rating: 5.0,
    reviewCount: 0,
    createdAt: new Date().toISOString(),
    ...validData,
    // preserve any extra fields like isAdmin not part of schema
    ...req.body,
  };

  db.properties.unshift(newProp);
  writeDb(db);
  res.status(201).json(newProp);
});
  const db = readDb();
  const newProp = {
    id: `prop-${Date.now()}`,
    status: req.body.isAdmin ? 'approved' : 'pending_approval',
    isVerifiedField: false,
    verificationNotes: 'بانتظار التحقق الميداني من منظومة الطاقة الشمسية والمسبح',
    rating: 5.0,
    reviewCount: 0,
    createdAt: new Date().toISOString(),
    ...req.body
  };

  db.properties.unshift(newProp);
  writeDb(db);
  res.status(201).json(newProp);
});

// PATCH Property (Admin approval / Field verification toggle)
app.patch('/api/properties/:id', (req, res) => {
  const db = readDb();
  const index = db.properties.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Property not found' });
  }

  db.properties[index] = {
    ...db.properties[index],
    ...req.body
  };

  writeDb(db);
  res.json(db.properties[index]);
});

// DELETE Property
app.delete('/api/properties/:id', (req, res) => {
  const db = readDb();
  db.properties = db.properties.filter(p => p.id !== req.params.id);
  writeDb(db);
  res.json({ success: true });
});

// GET Bookings (for Admin and Host)
app.get('/api/bookings', (req, res) => {
  const db = readDb();
  res.json(db.bookings);
});

// POST New Booking (with 25% escrow deposit calculation)
app.post('/api/bookings', (req, res) => {
  const db = readDb();
  const { totalPriceUsd, totalPriceSyp } = req.body;
  const depositUsd = Math.round(totalPriceUsd * 0.25);
  const depositSyp = Math.round(totalPriceSyp * 0.25);
  const remainingUsd = totalPriceUsd - depositUsd;
  const remainingSyp = totalPriceSyp - depositSyp;

  const newBooking = {
    id: `book-${Date.now()}`,
    createdAt: new Date().toISOString(),
    depositUsd,
    depositSyp,
    remainingUsd,
    remainingSyp,
    paymentStatus: req.body.paymentMethod === 'cash_deposit' ? 'cash_on_arrival' : 'pending_verification',
    escrowStatus: 'held_in_escrow',
    ...req.body
  };

  db.bookings.unshift(newBooking);
  writeDb(db);
  res.status(201).json(newBooking);
});

// PATCH Booking Status (Confirm deposit, Release escrow to host, Refund)
app.patch('/api/bookings/:id', (req, res) => {
  const db = readDb();
  const index = db.bookings.findIndex(b => b.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  db.bookings[index] = {
    ...db.bookings[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  writeDb(db);
  res.json(db.bookings[index]);
});

// GET Admin Dashboard Statistics
app.get('/api/stats', (req, res) => {
  const db = readDb();
  const totalBookings = db.bookings.length;
  const totalVolumeUsd = db.bookings.reduce((sum, b) => sum + (b.totalPriceUsd || 0), 0);
  const totalDepositHeldUsd = db.bookings
    .filter(b => b.escrowStatus === 'held_in_escrow')
    .reduce((sum, b) => sum + (b.depositUsd || 0), 0);
  const pendingApprovalsCount = db.properties.filter(p => p.status === 'pending_approval').length;
  const fieldVerifiedCount = db.properties.filter(p => p.isVerifiedField).length;

  res.json({
    totalBookings,
    totalVolumeUsd,
    totalDepositHeldUsd,
    pendingApprovalsCount,
    fieldVerifiedCount,
    totalProperties: db.properties.length
  });
});

// GET Booking Official PDF Voucher
app.get('/api/bookings/:id/pdf', (req, res) => {
  const db = readDb();
  const booking = db.bookings.find(b => b.id === req.params.id) || db.bookings[0];
  if (!booking) {
    return res.status(404).json({ error: 'No bookings found to generate voucher.' });
  }

  const property = db.properties.find(p => p.id === booking.propertyId) || {
    title: 'فيلا واستراحة سيران الفاخرة',
    area: 'بلودان',
    governorate: 'ريف دمشق'
  };

  const payload = { booking, property };
  const tempJson = path.join(__dirname, `temp_${Date.now()}.json`);
  const outPdf = path.join(__dirname, `voucher_${booking.id}.pdf`);

  try {
    fs.writeFileSync(tempJson, JSON.stringify(payload), 'utf-8');
    execSync(`python generate_voucher_pdf.py "${tempJson}" "${outPdf}"`, { cwd: __dirname, timeout: 15000 });
    
    // Clean up temp json
    try { fs.unlinkSync(tempJson); } catch (e) {}

    const pdfBuffer = fs.readFileSync(outPdf);
    try { fs.unlinkSync(outPdf); } catch (e) {}
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="Seyran_Voucher_${booking.id}.pdf"`);
    res.send(pdfBuffer);
  } catch (err) {
    try { if (fs.existsSync(tempJson)) fs.unlinkSync(tempJson); } catch (e) {}
    console.error('PDF Generation Error:', err);
    res.status(500).json({ error: 'Failed to generate PDF voucher', details: err.message });
  }
});

// GET Chat Messages
app.get('/api/chat/messages', (req, res) => {
  const db = readDb();
  res.json(db.chatMessages || []);
});

// POST Send Chat Message (with automatic intelligent Syrian concierge reply)
app.post('/api/chat/messages', (req, res) => {
  const db = readDb();
  if (!db.chatMessages || !Array.isArray(db.chatMessages)) {
    db.chatMessages = [];
  }

  const { text, sender = 'user', senderName = 'الضيف', propertyId } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Message text is required' });
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

  db.chatMessages.push(userMsg);

  // If user sent a message, generate instant context-aware Syrian concierge response
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

    db.chatMessages.push(autoReply);
  }

  writeDb(db);
  res.status(201).json({
    userMessage: userMsg,
    replyMessage: autoReply,
    allMessages: db.chatMessages
  });
});

// DELETE / Reset chat messages
app.delete('/api/chat/messages', (req, res) => {
  const db = readDb();
  db.chatMessages = [
    {
      id: 'msg-welcome',
      sender: 'support',
      senderName: 'مستشار سيران الذكي',
      text: 'أهلاً بك في منصة سيران سوريا 🌿! كيف يمكننا مساعدتك اليوم؟ يمكنك الاستفسار عن توفر المزارع والشاليهات، منظومات الطاقة الشمسية، أو المساعدة في الحجز وطرق الدفع بالليرة والدولار.',
      timestamp: new Date().toISOString(),
      status: 'read'
    }
  ];
  writeDb(db);
  res.json({ success: true, messages: db.chatMessages });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Seyran Syria API Server running on http://localhost:${PORT}`);
});
