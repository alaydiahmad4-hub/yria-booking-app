import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  PhoneCall, 
  HelpCircle, 
  ChevronLeft,
  Bot,
  User,
  Zap,
  DollarSign,
  Gift,
  Home,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  actionType?: 'whatsapp' | 'explore' | 'offline';
  actionLabel?: string;
}

interface WhatsAppSupportFABProps {
  customPhone?: string;
}

export const WhatsAppSupportFAB: React.FC<WhatsAppSupportFABProps> = ({
  customPhone = '963933112233',
}) => {
  const { 
    isChatOpen: isOpen, 
    setIsChatOpen: setIsOpen, 
    chatPropertyContext, 
    setChatPropertyContext,
    sendChatMessage 
  } = useApp();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: 'مرحباً بك في سيران سوريا! 🌿 أنا مساعد الكونسيرج الذكي، كيف يمكنني مساعدتك اليوم في حجز مزرعة، شاليه، أو فندق في سوريا؟',
      timestamp: 'الآن'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (chatPropertyContext && isOpen) {
      const ctxMsgId = `prop-ctx-${chatPropertyContext.id}`;
      setMessages(prev => {
        if (prev.some(m => m.id === ctxMsgId)) return prev;
        return [
          ...prev,
          {
            id: ctxMsgId,
            sender: 'bot',
            text: `🏡 أهلاً بك! أنت تستفسر الآن عن "${chatPropertyContext.title}" في (${chatPropertyContext.area}). السعر المعتمد: $${chatPropertyContext.priceUsd} / ليلة. تفضل بطرح أي سؤال أو اطلب تثبيت الحجز فوراً!`,
            timestamp: 'الآن',
            actionType: 'whatsapp',
            actionLabel: 'تواصل مباشر مع المضيف عبر واتساب'
          }
        ];
      });
    }
  }, [chatPropertyContext?.id, isOpen]);

  // Quick topics for immediate help
  const quickTopics = [
    { label: '☀️ واقع الكهرباء والطاقة', query: 'كيف وضع الكهرباء والتكييف في المزارع والفنادق؟' },
    { label: '💵 طرق الدفع (USD وليرة)', query: 'ماهي طرق دفع عربون الضمان المتاحة داخل وخارج سوريا؟' },
    { label: '🎁 إهداء حجز لعائلتي', query: 'أنا مغترب وأرغب بإهداء إقامة لعائلتي في سوريا، كيف يتم ذلك؟' },
    { label: '🏡 حجز سيران نهاري (Day-Use)', query: 'هل تتوفر مزارع ومسابح لسيران نهاري بدون مبيت؟' }
  ];

  const generateBotReply = (query: string): { reply: string; actionType?: 'whatsapp' | 'explore' | 'offline'; actionLabel?: string } => {
    const q = query.toLowerCase();
    
    if (q.includes('كهرباء') || q.includes('طاقة') || q.includes('تكييف') || q.includes('شمسية') || q.includes('أمبير')) {
      return {
        reply: 'جميع منشآت ومزارع "سيران سوريا" موثقة ميدانياً ومجهزة بمنظومات طاقة شمسية ليثيوم 24/7 أو خطوط كهرباء معفاة من التقنين ومولدات صامتة لضمان تشغيل المكيفات والمضخات باستمرار دون انقطاع.',
        actionType: 'explore',
        actionLabel: 'استعراض العقارات المعتمدة'
      };
    }
    
    if (q.includes('دفع') || q.includes('دولار') || q.includes('ليرة') || q.includes('سيريتل') || q.includes('عربون') || q.includes('ضمان') || q.includes('سعر')) {
      return {
        reply: 'نظام الدفع محصور حصرياً بالدولار ($ USD) والليرة السورية (ل.س SYP): يتم دفع عربون 25% فقط لضمان الحجز (عبر سيريتل كاش أو الهرم محلياً، أو بطاقات الائتمان والحوالات للمغتربين)، والمبلغ المتبقي يُدفع نقداً للمالك عند الوصول مع حماية كاملة بنظام الضمان (Escrow).',
        actionType: 'whatsapp',
        actionLabel: 'تأكيد الحجز والدفع مع المحاسبة'
      };
    }

    if (q.includes('مغترب') || q.includes('أهل') || q.includes('عائل') || q.includes('هدية') || q.includes('إهداء')) {
      return {
        reply: 'خدمة "إهداء الأهل في سوريا" مخصصة للمغتربين: يمكنك تفعيل خيار الإهداء في شاشة الحجز، وسنقوم بتسليم إقامة VIP لوالديك أو عائلتك مع سلة فواكه وحلويات شامية ترحيبية وتأمين سيارة بسائق خاص إذا رغبت!',
        actionType: 'whatsapp',
        actionLabel: 'تنسيق هدية العائلة مع الكونسيرج'
      };
    }

    if (q.includes('نهاري') || q.includes('day') || q.includes('مسبح') || q.includes('مشاوي') || q.includes('جمعة')) {
      return {
        reply: 'نعم بالتأكيد! نوفر خيار "سيران نهاري Day-Use" من الساعة 10:00 صباحاً حتى 08:00 مساءً بأسعار مخفضة للمزارع والمسابح الخاصة في يعفور وصحنايا وبلودان للمشاوي والجمعات العائلية.',
        actionType: 'explore',
        actionLabel: 'مشاهدة مزارع السيران النهاري'
      };
    }

    return {
      reply: 'شكراً لتواصلك! تم تسجيل استفسارك وسيقوم موظف خدمة عملاء سيران سوريا بالرد الفوري عليك. يمكنك أيضاً المتابعة عبر محادثة واتساب الرسمية.',
      actionType: 'whatsapp',
      actionLabel: 'فتح محادثة واتساب المباشرة'
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('ar-SY', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);
    sendChatMessage(text).catch(() => {});

    setTimeout(() => {
      const { reply, actionType, actionLabel } = generateBotReply(text);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: reply,
        timestamp: new Date().toLocaleTimeString('ar-SY', { hour: '2-digit', minute: '2-digit' }),
        actionType,
        actionLabel
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleOpenWhatsApp = (customMsg?: string) => {
    const text = customMsg || 'مرحباً فريق سيران سوريا، أود الاستفسار عن الحجوزات والخدمات المتاحة.';
    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/${customPhone}?text=${encoded}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] md:bottom-6 left-4 sm:left-6 z-50 flex flex-col items-start select-none font-sans">
      
      {/* Live In-App Chat Modal */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2rem)] sm:w-96 bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden flex flex-col h-[520px] max-h-[80vh] animate-fadeIn">
          
          {/* Top Header Card */}
          <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-slate-900 text-white p-4 relative flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                  <Bot className="w-5 h-5 text-amber-300" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full animate-pulse"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-black text-sm text-white">كونسيرج سيران سوريا</h4>
                  <span className="text-[9px] bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 px-1.5 py-0.2 rounded-full font-bold">
                    مباشر 24/7
                  </span>
                </div>
                <p className="text-[11px] text-emerald-100/90 mt-0.5">
                  استجابة فورية لحجوزات الفنادق والمزارع
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => handleOpenWhatsApp()}
                className="p-2 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 text-white transition-all text-xs flex items-center gap-1"
                title="المتابعة عبر واتساب"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
                title="إغلاق المحادثة"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-slate-50/70 text-xs">
            {messages.map((m) => {
              const isBot = m.sender === 'bot';
              return (
                <div
                  key={m.id}
                  className={`flex items-start gap-2 ${isBot ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 text-[11px] ${
                    isBot ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-900 text-white'
                  }`}>
                    {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  <div className={`max-w-[82%] space-y-1.5 ${isBot ? 'text-right' : 'text-right'}`}>
                    <div className={`p-3 rounded-2xl shadow-2xs leading-relaxed ${
                      isBot 
                        ? 'bg-white text-slate-800 border border-slate-200/80 rounded-tr-xs' 
                        : 'bg-emerald-600 text-white rounded-tl-xs font-medium'
                    }`}>
                      {m.text}

                      {/* Optional Action Button inside Bot Message */}
                      {m.actionLabel && (
                        <div className="pt-2 mt-2 border-t border-slate-100">
                          <button
                            onClick={() => {
                              if (m.actionType === 'whatsapp') {
                                handleOpenWhatsApp(m.text);
                              } else {
                                setIsOpen(false);
                              }
                            }}
                            className="w-full py-1.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-[11px] transition flex items-center justify-center gap-1 border border-emerald-200/60"
                          >
                            <span>{m.actionLabel}</span>
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                    <span className="text-[9px] text-slate-400 block px-1">
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs py-1">
                <Bot className="w-4 h-4 text-emerald-600" />
                <span className="italic animate-pulse">جاري كتابة الرد الفوري...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Pills */}
          <div className="p-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickTopics.map((topic, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(topic.query)}
                className="whitespace-nowrap px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-[10px] font-bold text-slate-700 transition flex-shrink-0 border border-slate-200/70"
              >
                {topic.label}
              </button>
            ))}
          </div>

          {/* Chat Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2.5 bg-white border-t border-slate-100 flex items-center gap-1.5 flex-shrink-0"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="اكتب استفسارك هنا..."
              className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white transition flex-shrink-0"
              title="إرسال"
            >
              <Send className="w-4 h-4 rotate-180" />
            </button>
          </form>

        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white pl-4 pr-3.5 py-3 rounded-full shadow-xl shadow-emerald-700/30 border-2 border-white transition-all hover:scale-105 active:scale-95 group"
        title="المحادثة المباشرة وخدمة العملاء"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 fill-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 border border-white animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 border border-white"></span>
        </div>
        <span className="text-xs font-black tracking-wide hidden sm:inline">
          محادثة الكونسيرج المباشرة
        </span>
        <span className="text-xs font-bold sm:hidden">
          محادثة
        </span>
      </button>

    </div>
  );
};
