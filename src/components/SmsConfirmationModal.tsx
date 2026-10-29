import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Smartphone, 
  X, 
  Check, 
  Copy, 
  ExternalLink, 
  ShieldCheck, 
  MessageSquare, 
  Sparkles,
  Signal,
  Wifi,
  BatteryCharging
} from 'lucide-react';

export const SmsConfirmationModal: React.FC = () => {
  const { 
    isSmsModalOpen, 
    setIsSmsModalOpen, 
    latestSms,
    setIsVoucherModalOpen 
  } = useApp();

  const [copied, setCopied] = useState(false);

  if (!isSmsModalOpen || !latestSms) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(latestSms.confirmationCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenVoucher = () => {
    setIsSmsModalOpen(false);
    setIsVoucherModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn" dir="rtl">
      <div className="max-w-sm w-full bg-slate-900 rounded-[40px] p-3 shadow-2xl border-4 border-slate-700 relative">
        
        {/* Smartphone Speaker & Camera Notch */}
        <div className="w-24 h-4 bg-slate-950 rounded-b-2xl mx-auto mb-2 flex items-center justify-center">
          <div className="w-8 h-1 bg-slate-800 rounded-full"></div>
        </div>

        {/* Smartphone Screen Canvas */}
        <div className="bg-slate-950 rounded-[32px] p-4 text-white space-y-4 border border-slate-800">
          
          {/* Status Bar */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold px-1 select-none">
            <span>{latestSms.timestamp}</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-emerald-400 font-bold">{latestSms.sender} 4G</span>
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>

          {/* SMS Notification Banner */}
          <div className="bg-gradient-to-r from-emerald-900/90 to-teal-900/90 border border-emerald-500/40 rounded-2xl p-3 shadow-lg">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-xs font-black text-amber-300">رسالة نصية SMS واردة</span>
              </div>
              <span className="text-[10px] text-slate-300 font-bold">{latestSms.sender}</span>
            </div>
            <p className="text-[11px] text-slate-200 font-medium leading-relaxed">
              مرسل إلى: <span className="font-bold text-white">{latestSms.recipientPhone}</span>
            </p>
          </div>

          {/* SMS Chat Bubble */}
          <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-black text-white flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>{latestSms.sender} Official</span>
              </span>
              <span className="text-[10px] text-slate-400">{latestSms.timestamp}</span>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed font-medium bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
              {latestSms.text}
            </p>

            {/* OTP Code Box */}
            <div className="bg-emerald-950/80 border border-emerald-500/40 p-3 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-emerald-300 font-bold block">رمز الدخول وتأكيد الحجز:</span>
                <span className="text-lg font-black text-amber-300 tracking-wider">
                  {latestSms.confirmationCode}
                </span>
              </div>

              <button
                onClick={handleCopyCode}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-amber-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'تم النسخ!' : 'نسخ الرمز'}</span>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-1">
            <button
              onClick={handleOpenVoucher}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black py-2.5 rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>فتح سند الحجز الرقمي (PDF/Voucher)</span>
            </button>

            <button
              onClick={() => setIsSmsModalOpen(false)}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2 rounded-2xl text-xs transition-all"
            >
              إغلاق الرسالة
            </button>
          </div>

        </div>

        {/* Smartphone Home Indicator Bar */}
        <div className="w-32 h-1 bg-slate-600 rounded-full mx-auto mt-2"></div>

      </div>
    </div>
  );
};
