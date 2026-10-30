import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { api, AuthUser } from '../services/api';
import { 
  X, 
  Smartphone, 
  Lock, 
  User, 
  ShieldCheck, 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  KeyRound,
  ArrowRight
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    currentUser, 
    setCurrentUser,
    addNotification
  } = useApp();

  const [tab, setTab] = useState<'login' | 'register' | 'otp'>('login');
  const [phone, setPhone] = useState('+963944112233');
  const [password, setPassword] = useState('Admin@Seyran2026');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'guest' | 'host'>('guest');
  const [otp, setOtp] = useState('123456');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleDemoAdmin = () => {
    setTab('login');
    setPhone('+963944112233');
    setPassword('Admin@Seyran2026');
    setError(null);
  };

  const handleDemoHost = () => {
    setTab('login');
    setPhone('+963933445566');
    setPassword('Host@Seyran2026');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (tab === 'login') {
        const res = await api.login(phone, password);
        if (res && res.user) {
          setCurrentUser(res.user);
          addNotification({
            title: 'تم تسجيل الدخول بنجاح',
            message: `أهلاً بك مجدداً، ${res.user.name} (${res.user.role === 'admin' ? 'مدير عام' : res.user.role === 'host' ? 'مضيف معتمد' : 'ضيف كريم'})`,
            type: 'system'
          });
          setIsAuthModalOpen(false);
        } else {
          setError('رقم الهاتف أو كلمة المرور غير صحيحة');
        }
      } else if (tab === 'register') {
        if (!name.trim()) {
          setError('يرجى كتابة الاسم الكريم');
          setLoading(false);
          return;
        }
        const res = await api.register(phone, name, password, role);
        if (res && res.user) {
          setCurrentUser(res.user);
          addNotification({
            title: 'مرحباً بك في سيران سوريا',
            message: `تم إنشاء حسابك بنجاح كـ ${role === 'host' ? 'مضيف عقارات' : 'ضيف'}`,
            type: 'system'
          });
          setIsAuthModalOpen(false);
        } else {
          setError('فشل إنشاء الحساب، قد يكون رقم الهاتف مسجلاً مسبقاً');
        }
      } else if (tab === 'otp') {
        const res = await api.otpLogin(phone, name || 'ضيف سيران', otp);
        if (res && res.user) {
          setCurrentUser(res.user);
          addNotification({
            title: 'تم التحقق بنجاح عبر SMS',
            message: `أهلاً بك في سيران، ${res.user.name}`,
            type: 'sms'
          });
          setIsAuthModalOpen(false);
        } else {
          setError('رمز التحقق غير صحيح أو انتهت صلاحيته');
        }
      }
    } catch (err: any) {
      setError(err?.message || 'حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn" dir="rtl">
      <div className="bg-white rounded-[32px] max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-5 left-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            aria-label="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-amber-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-lg">بوابة الدخول والمصادقة الآمنة</h3>
              <p className="text-xs text-emerald-200 mt-0.5">منصة سيران سوريا الموثقة</p>
            </div>
          </div>

          {/* Quick Demo Credentials Bar */}
          <div className="mt-4 pt-3 border-t border-emerald-700/60 flex items-center justify-between text-[11px]">
            <span className="text-emerald-200">حسابات تجريبية سريعة:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleDemoAdmin}
                className="bg-amber-400 text-slate-950 font-black px-2.5 py-1 rounded-lg hover:bg-amber-300 transition-all shadow-xs"
              >
                مدير المنصة (Admin)
              </button>
              <button
                type="button"
                onClick={handleDemoHost}
                className="bg-emerald-600 text-white font-bold px-2.5 py-1 rounded-lg hover:bg-emerald-500 transition-all border border-emerald-400/40"
              >
                مضيف (Host)
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-3 p-2 bg-slate-100 border-b border-slate-200 text-xs font-bold">
          <button
            onClick={() => { setTab('login'); setError(null); }}
            className={`py-2 rounded-xl transition-all ${tab === 'login' ? 'bg-white text-emerald-800 shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'}`}
          >
            تسجيل الدخول
          </button>
          <button
            onClick={() => { setTab('register'); setError(null); }}
            className={`py-2 rounded-xl transition-all ${tab === 'register' ? 'bg-white text-emerald-800 shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'}`}
          >
            حساب جديد
          </button>
          <button
            onClick={() => { setTab('otp'); setError(null); }}
            className={`py-2 rounded-xl transition-all ${tab === 'otp' ? 'bg-white text-emerald-800 shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'}`}
          >
            رمز SMS السريع
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Name Field (if registering or otp) */}
          {(tab === 'register' || (tab === 'otp' && !otpSent)) && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-700" />
                <span>الاسم الكامل</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثال: عمر الدمشقي"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
              />
            </div>
          )}

          {/* Phone Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-emerald-700" />
              <span>رقم الهاتف السوري (سيريتل أو MTN)</span>
            </label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+9639XXXXXXXX أو 09XXXXXXXX"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-mono text-left"
              dir="ltr"
            />
          </div>

          {/* Password Field (for login & register) */}
          {tab !== 'otp' && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-700" />
                <span>كلمة المرور</span>
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
              />
            </div>
          )}

          {/* Role selector for registration */}
          {tab === 'register' && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">نوع الحساب</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('guest')}
                  className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                    role === 'guest'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <User className="w-4 h-4 text-emerald-700" />
                  <span>ضيف (حجز إقامات)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('host')}
                  className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                    role === 'host'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-amber-600" />
                  <span>مضيف (تأجير عقار/فندق)</span>
                </button>
              </div>
            </div>
          )}

          {/* OTP Input (for fast sms login) */}
          {tab === 'otp' && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-emerald-700" />
                <span>رمز التحقق المرسل عبر SMS (الافتراضي: 123456)</span>
              </label>
              <input
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-center font-mono text-base font-black tracking-widest"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white rounded-xl font-black text-xs sm:text-sm shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <span>جاري التحقق والاتصال...</span>
            ) : tab === 'login' ? (
              <>
                <span>تسجيل الدخول إلى حسابي</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : tab === 'register' ? (
              <>
                <span>تأكيد وإنشاء الحساب</span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </>
            ) : (
              <>
                <span>تأكيد رمز الـ SMS والدخول</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};

export default AuthModal;
