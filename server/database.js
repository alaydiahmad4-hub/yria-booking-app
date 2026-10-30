import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'seyran.sqlite');

export const db = new Database(DB_FILE);

// Enable WAL mode for high concurrency & performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// 1. Initialize Schema
export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      phone TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'guest',
      password_hash TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS properties (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      type TEXT NOT NULL,
      governorate TEXT NOT NULL,
      area TEXT NOT NULL,
      price_usd REAL NOT NULL,
      day_use_price_usd REAL,
      status TEXT NOT NULL DEFAULT 'approved',
      is_verified_field INTEGER NOT NULL DEFAULT 0,
      data_json TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      property_id TEXT NOT NULL,
      guest_name TEXT NOT NULL,
      guest_phone TEXT NOT NULL,
      check_in TEXT NOT NULL,
      check_out TEXT NOT NULL,
      booking_type TEXT NOT NULL,
      payment_method TEXT NOT NULL,
      payment_status TEXT NOT NULL,
      escrow_status TEXT NOT NULL,
      total_price_usd REAL NOT NULL,
      total_price_syp REAL NOT NULL,
      deposit_usd REAL NOT NULL,
      deposit_syp REAL NOT NULL,
      remaining_usd REAL NOT NULL,
      remaining_syp REAL NOT NULL,
      transaction_reference TEXT,
      data_json TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS chat_messages (
      id TEXT PRIMARY KEY,
      sender TEXT NOT NULL,
      sender_name TEXT NOT NULL,
      text TEXT NOT NULL,
      property_id TEXT,
      status TEXT NOT NULL DEFAULT 'delivered',
      timestamp TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS payments (
      id TEXT PRIMARY KEY,
      booking_id TEXT NOT NULL,
      provider TEXT NOT NULL,
      reference TEXT UNIQUE NOT NULL,
      amount_usd REAL,
      amount_syp REAL,
      status TEXT NOT NULL DEFAULT 'verified',
      sender_phone TEXT,
      metadata_json TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_properties_gov ON properties(governorate);
    CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(type);
    CREATE INDEX IF NOT EXISTS idx_bookings_prop ON bookings(property_id);
    CREATE INDEX IF NOT EXISTS idx_payments_booking ON payments(booking_id);
  `);

  // Seed default admin and host users if not present
  const adminExists = db.prepare('SELECT id FROM users WHERE phone = ?').get('+963944112233');
  if (!adminExists) {
    const adminHash = bcrypt.hashSync('Admin@Seyran2026', 10);
    db.prepare(`
      INSERT INTO users (id, phone, name, role, password_hash, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run('usr-admin-1', '+963944112233', 'مدير سيران العام', 'admin', adminHash, new Date().toISOString());
  }

  const hostExists = db.prepare('SELECT id FROM users WHERE phone = ?').get('+963933445566');
  if (!hostExists) {
    const hostHash = bcrypt.hashSync('Host@Seyran2026', 10);
    db.prepare(`
      INSERT INTO users (id, phone, name, role, password_hash, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run('usr-host-1', '+963933445566', 'أبو أحمد الشامي (مضيف يعفور)', 'host', hostHash, new Date().toISOString());
  }

  // Seed default exchange rate setting (1 USD = 14,500 SYP)
  const rateExists = db.prepare('SELECT key FROM settings WHERE key = ?').get('syp_rate');
  if (!rateExists) {
    db.prepare('INSERT INTO settings (key, value, updated_at) VALUES (?, ?, ?)').run('syp_rate', '14500', new Date().toISOString());
  }

  // Seed initial properties from db.json if database table is empty
  const propCount = db.prepare('SELECT COUNT(*) as count FROM properties').get();
  if (propCount.count === 0) {
    const legacyDbPath = path.join(__dirname, 'db.json');
    if (fs.existsSync(legacyDbPath)) {
      try {
        const legacyData = JSON.parse(fs.readFileSync(legacyDbPath, 'utf-8'));
        if (legacyData.properties && Array.isArray(legacyData.properties)) {
          const insertProp = db.prepare(`
            INSERT INTO properties (id, title, type, governorate, area, price_usd, day_use_price_usd, status, is_verified_field, data_json, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `);
          const insertMany = db.transaction((props) => {
            for (const p of props) {
              insertProp.run(
                p.id,
                p.title || 'عقار سيران',
                p.type || 'chalet',
                p.governorate || 'دمشق',
                p.area || 'ريف دمشق',
                p.priceUsd || 100,
                p.dayUsePriceUsd || null,
                p.status || 'approved',
                p.isVerifiedField ? 1 : 0,
                JSON.stringify(p),
                p.createdAt || new Date().toISOString(),
                p.updatedAt || new Date().toISOString()
              );
            }
          });
          insertMany(legacyData.properties);
        }

        if (legacyData.bookings && Array.isArray(legacyData.bookings)) {
          const insertBooking = db.prepare(`
            INSERT INTO bookings (id, property_id, guest_name, guest_phone, check_in, check_out, booking_type, payment_method, payment_status, escrow_status, total_price_usd, total_price_syp, deposit_usd, deposit_syp, remaining_usd, remaining_syp, transaction_reference, data_json, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `);
          const insertManyBookings = db.transaction((bks) => {
            for (const b of bks) {
              insertBooking.run(
                b.id,
                b.propertyId,
                b.guestName || 'ضيف سيران',
                b.guestPhone || '+963911000000',
                b.checkIn || new Date().toISOString().split('T')[0],
                b.checkOut || new Date().toISOString().split('T')[0],
                b.bookingType || 'overnight',
                b.paymentMethod || 'cash_deposit',
                b.paymentStatus || 'confirmed',
                b.escrowStatus || 'held_in_escrow',
                b.totalPriceUsd || 100,
                b.totalPriceSyp || 1450000,
                b.depositUsd || 25,
                b.depositSyp || 362500,
                b.remainingUsd || 75,
                b.remainingSyp || 1087500,
                b.transactionReference || null,
                JSON.stringify(b),
                b.createdAt || new Date().toISOString(),
                b.updatedAt || new Date().toISOString()
              );
            }
          });
          insertManyBookings(legacyData.bookings);
        }

        if (legacyData.chatMessages && Array.isArray(legacyData.chatMessages)) {
          const insertChat = db.prepare(`
            INSERT INTO chat_messages (id, sender, sender_name, text, property_id, status, timestamp)
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `);
          const insertManyChats = db.transaction((msgs) => {
            for (const m of msgs) {
              insertChat.run(
                m.id,
                m.sender,
                m.senderName || 'مستخدم',
                m.text,
                m.propertyId || null,
                m.status || 'delivered',
                m.timestamp || new Date().toISOString()
              );
            }
          });
          insertManyChats(legacyData.chatMessages);
        }
      } catch (err) {
        console.error('Error seeding SQLite from legacy db.json:', err);
      }
    }
  }

  // Ensure default welcome message in chat if empty
  const chatCount = db.prepare('SELECT COUNT(*) as count FROM chat_messages').get();
  if (chatCount.count === 0) {
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
  }
}
