import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  PhoneCall, 
  HelpCircle, 
  ChevronLeft, 
  Trash2, 
  Bot, 
  User, 
  CheckCheck, 
  Check, 
  Building2,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface WhatsAppSupportFABProps {
  customPhone?: string;
}

export const WhatsAppSupportFAB: React.FC<WhatsAppSupportFABProps> = ({
  customPhone = '963933112233',
}) => {
  const { 
    chatMessages, 
    isChatOpen, 
    setIsChatOpen, 
    chatPropertyContext, 
    setChatPropertyContext, 
    sendChatMessage, 
    resetChatMessages,
    isChatSending,
    formatPrice
  } = useApp();

  const [chatMode, setChatMode] = useState<'in_app' | 'whatsapp'>('in_app');
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (isChatOpen && chatMode === 'in_app') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isChatOpen, chatMode, isChatSending]);

  const quickOptions = [
    {
      title: 'استفسار عن حجز شاليه أو مزرعة',
      desc: 'استفسر عن الأسعار والمواعيد والتواريخ المتاحة',
      icon: '🏡',
      message: 'مرحباً فريق سيران سوريا، أود الاستفسار عن الشاليهات والمزارع المتاحة للحجز في ريف دمشق / الساحل السوري.',
    },
    {
      title: 'مساعدة في طرق الدفع وعربون الضمان',
      desc: 'سيريتل كاش، دولار أمريكي، ويسترن يونيون، أو حوالة الهرم',
      icon: '💵',
      message: 'مرحباً، أحتاج إلى مساعدة بشأن دفع عربون الضمان (25%) وطرق الدفع بالدولار أو الليرة السورية عبر سيريتل كاش.',
    },
    {
      title: 'إضافة عقاري أو مزرعتي كمستضيف',
      desc: 'انضم لشبكة المضيفين وانشر عقارك مجاناً 100%',
      icon: '✨',
      message: 'مرحباً، لدي مزرعة/شاليه وأرغب بإضافته إلى منصة سيران سوريا لاستقبال النزلاء والمغتربين.',
    },
    {
      title: 'محادثة مباشرة مع فريق الدعم الفني',
      desc: 'تحدث مع موظف خدمة العملاء الآن 24/7',
      icon: '🎧',
      message: 'السلام عليكم، أحتاج إلى التواصل مع موظف خدمة عملاء سيران سوريا لمساعدتي.',
    },
  ];

  const quickInAppPrompts = [
    '⚡ هل الكهرباء والمكيفات تعمل 24 ساعة بالطاقة الشمسية؟',
    '💳 كيف يتم دفع عربون الـ 25% وسيريتل كاش؟',
    '🏡 ما هي أفضل شاليهات ومزارع يعفور وبلودان العائلية؟',
    '🏨 ما هي الفنادق التراثية المتاحة في دمشق القديمة؟'
  ];

  const handleOpenWhatsApp = (msgText: string) => {
    const cleanNumber = customPhone.replace(/\D/g, '').replace(/^0/, '963');
    const encoded = encodeURIComponent(msgText);
    const url = `https://wa.me/${cleanNumber}?text=${encoded}`;
    window.open(url, '_blank');
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isChatSending) return;
    const msg = inputText;
    setInputText('');
    await sendChatMessage(msg);
  };

  const handleQuickPromptClick = (prompt: string) => {
    sendChatMessage(prompt);
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-50 flex flex-col items-start select-none">
      
      {/* Interactive Chat & Concierge Dialog Box */}
      {isChatOpen && (
        <div className="mb-3 w-[calc(100vw-2rem)] sm:w-[420px] max-w-[420px] h-[550px] max-h-[80vh] bg-white rounded-3xl shadow-2xl border border-emerald-100 flex flex-col overflow-hidden animate-fadeIn duration-200">
          
          {/* Top Banner & Mode Switcher */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white p-4 relative shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-emerald-600 shadow-md">
                  <Bot className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-black text-sm text-white flex items-center gap-1.5">
                    <span>مستشار سيران الذكي</span>
                    <span className="text-[10px] bg-emerald-500/50 text-emerald-100 px-1.5 py-0.5 rounded-full font-bold">24/7</span>
                  </h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-100 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping"></span>
                    <span className="w-2 h-2 rounded-full bg-emerald-300"></span>
                    <span>متصل الآن • رد فوري بالذكاء السوري</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {chatMode === 'in_app' && (
                  <button
                    onClick={resetChatMessages}
                    className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-100 hover:text-white transition"
                    title="إعادة بدء المحادثة"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition"
                  title="إغلاق المحادثة"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mode Switch Tabs */}
            <div className="grid grid-cols-2 gap-1 bg-emerald-800/50 p-1 rounded-2xl mt-3 text-xs font-bold">
              <button
                onClick={() => setChatMode('in_app')}
                className={`py-1.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  chatMode === 'in_app'
                    ? 'bg-white text-emerald-800 shadow-sm'
                    : 'text-emerald-100 hover:text-white'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                <span>المحادثة المباشرة</span>
              </button>
              <button
                onClick={() => setChatMode('whatsapp')}
                className={`py-1.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  chatMode === 'whatsapp'
                    ? 'bg-white text-emerald-800 shadow-sm'
                    : 'text-emerald-100 hover:text-white'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>واتساب سيران</span>
              </button>
            </div>
          </div>

          {/* MODE 1: In-App Interactive Chat */}
          {chatMode === 'in_app' && (
            <div className="flex-1 flex flex-col min-h-0 bg-slate-50">
              
              {/* Active Property Context Ribbon (if inquiring about a specific property) */}
              {chatPropertyContext && (
                <div className="px-3 py-2 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between gap-2 shrink-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src={chatPropertyContext.images[0]}
                      alt={chatPropertyContext.title}
                      className="w-9 h-9 rounded-xl object-cover border border-emerald-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-[11px] font-bold text-slate-800 truncate">
                        {chatPropertyContext.title}
                      </div>
                      <div className="text-[10px] text-emerald-700 font-medium">
                        {chatPropertyContext.area} • {formatPrice(chatPropertyContext.priceUsd)}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setChatPropertyContext(null)}
                    className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
                    title="إزالة العقار من سياق المحادثة"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Messages Scroll Area */}
              <div className="flex-1 overflow-y-auto p-3.5 space-y-3">
                {chatMessages.map((msg) => {
                  const isUser = msg.sender === 'user';
                  const timeFormatted = new Date(msg.timestamp).toLocaleTimeString('ar-SY', {
                    hour: '2-digit',
                    minute: '2-digit'
                  });

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-end gap-1.5 max-w-[85%]">
                        {!isUser && (
                          <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mb-1 text-[11px] shadow-xs">
                            🌿
                          </div>
                        )}

                        <div
                          className={`rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-xs ${
                            isUser
                              ? 'bg-emerald-600 text-white rounded-br-none'
                              : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-none'
                          }`}
                        >
                          {!isUser && (
                            <div className="text-[10px] font-bold text-emerald-600 mb-1 flex items-center gap-1">
                              <span>{msg.senderName}</span>
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                            </div>
                          )}

                          {msg.propertyTitle && (
                            <div className={`text-[10px] font-bold px-2 py-0.5 rounded-lg mb-1.5 inline-block ${
                              isUser ? 'bg-emerald-700 text-emerald-100' : 'bg-emerald-50 text-emerald-800'
                            }`}>
                              استفسار بخصوص: {msg.propertyTitle}
                            </div>
                          )}

                          <div className="whitespace-pre-wrap">{msg.text}</div>
                        </div>

                        {isUser && (
                          <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 mb-1 text-[11px]">
                            <User className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>

                      <div className={`flex items-center gap-1 text-[9px] text-slate-400 mt-1 px-1 ${
                        isUser ? 'justify-end' : 'justify-start'
                      }`}>
                        <span>{timeFormatted}</span>
                        {isUser && (
                          <CheckCheck className="w-3 h-3 text-emerald-600" />
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Typing Shimmer Indicator */}
                {isChatSending && (
                  <div className="flex items-center gap-2 text-xs text-slate-500 py-1 px-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                      🌿
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl px-3 py-2 flex items-center gap-1.5 text-[11px] shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]"></span>
                      <span className="text-slate-600 mr-1 font-medium">جاري كتابة الرد من مستشار سيران...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Inquiry Pills */}
              <div className="px-3 py-1.5 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto shrink-0 scrollbar-none">
                {quickInAppPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickPromptClick(prompt)}
                    className="text-[10px] whitespace-nowrap bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 px-2.5 py-1 rounded-full transition-all shrink-0"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSend} className="p-2.5 bg-white border-t border-slate-100 flex items-center gap-2 shrink-0">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="اكتب استفسارك هنا (مثال: هل يتوفر مسبح خاص؟)..."
                  disabled={isChatSending}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isChatSending}
                  className="w-9 h-9 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white flex items-center justify-center transition-all shadow-sm shrink-0"
                  title="إرسال"
                >
                  <Send className="w-4 h-4 rotate-180" />
                </button>
              </form>
            </div>
          )}

          {/* MODE 2: Direct WhatsApp List */}
          {chatMode === 'whatsapp' && (
            <div className="flex-1 flex flex-col min-h-0 bg-slate-50">
              <div className="p-3 bg-white border-b border-slate-100 text-[11px] text-slate-600 leading-relaxed font-medium">
                تواصل مباشر عبر تطبيق واتساب الرسمي للتحدث مع المشرف الميداني وتأكيد الحجوزات:
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {quickOptions.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOpenWhatsApp(opt.message)}
                    className="w-full text-right p-3 rounded-2xl bg-white hover:bg-emerald-50/80 border border-slate-200/90 hover:border-emerald-300 transition-all flex items-center justify-between group shadow-2xs"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="text-xl">{opt.icon}</span>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                          {opt.title}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          {opt.desc}
                        </div>
                      </div>
                    </div>
                    <ChevronLeft className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:-translate-x-1 transition-all" />
                  </button>
                ))}
              </div>

              {/* Footer WhatsApp Button */}
              <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between shrink-0">
                <span className="text-[10px] text-slate-400 font-medium">رقم الواتساب: 0933112233</span>
                <button
                  onClick={() => handleOpenWhatsApp('مرحباً فريق سيران سوريا، أود الاستفسار عن تفاصيل الحجز والإقامات')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>فتح تطبيق واتساب ↗</span>
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="flex items-center gap-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white pl-4 pr-3.5 py-3 rounded-full shadow-xl shadow-emerald-600/30 border-2 border-white transition-all hover:scale-105 active:scale-95 group"
        title="مستشار سيران الذكي والدعم الفني"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 fill-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 border border-white animate-pulse"></span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-xs font-black tracking-wide leading-tight hidden sm:inline">
            مستشار سيران الذكي
          </span>
          <span className="text-[9px] text-emerald-100 font-medium hidden sm:inline">
            دعم ومحادثة فورية 24/7
          </span>
          <span className="text-xs font-bold sm:hidden">
            محادثة سيران
          </span>
        </div>
      </button>

    </div>
  );
};
