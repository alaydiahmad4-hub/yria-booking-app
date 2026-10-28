import React from 'react';
import { Compass, ShieldCheck, HeartHandshake, PhoneCall, MessageCircle, MapPin } from 'lucide-react';
import { SeyranBrandLogo } from './SeyranBrandLogo';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { 
    setIsAdminMode, 
    setIsBrandHeritageModalOpen, 
    setActiveTab, 
    setSelectedGovernorate, 
    setSelectedType 
  } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs sm:text-sm pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand & Mission */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <SeyranBrandLogo variant="icon" size="sm" />
              <span className="text-xl font-black text-white">سيران سوريا</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              المنصة المتكاملة الرائدة لحجز المزارع، الشاليهات، الفنادق، والشقق السياحية في كافة المحافظات والمصايف السورية، مع ضمان توفر الطاقة الشمسية وكافة الخدمات.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>عقارات موثقة ومطابقة للصور 100%</span>
            </div>
          </div>

          {/* Syrian Destinations */}
          <div>
            <h4 className="font-bold text-white mb-3 text-sm flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-500" />
              أشهر وجهات الإقامة
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('explore');
                    setSelectedGovernorate('ريف دمشق');
                    setSelectedType('farm');
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-400 transition-colors text-right w-full"
                >
                  مزارع يعفور والصبورة وصحنايا
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('explore');
                    setSelectedGovernorate('طرطوس');
                    setSelectedType('chalet');
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-400 transition-colors text-right w-full"
                >
                  شاليهات بورتو طرطوس والكورنيش
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('explore');
                    setSelectedGovernorate('اللاذقية');
                    setSelectedType('chalet');
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-400 transition-colors text-right w-full"
                >
                  شاليهات الشاطئ الأزرق ووادي قنديل
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('explore');
                    setSelectedGovernorate('ريف دمشق');
                    setSelectedType('all');
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-400 transition-colors text-right w-full"
                >
                  مصايف بلودان والزبداني ومضايا
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('hotels');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors text-right w-full font-bold text-amber-300/90"
                >
                  ★ بيوت وفنادق دمشق القديمة (باب توما والقيمرية)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('explore');
                    setSelectedGovernorate('حمص');
                    setSelectedType('villa');
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-400 transition-colors text-right w-full"
                >
                  فلل مشتى الحلو وصافيتا ومرمريتا
                </button>
              </li>
            </ul>
          </div>

          {/* Payment Solutions for Syria */}
          <div>
            <h4 className="font-bold text-white mb-3 text-sm flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-emerald-500" />
              طرق الدفع والتثبيت في سوريا
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span>سيريتل كاش (Syriatel Cash) كود تاجر مباشر</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>MTN كاش للدفع الفوري</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <span>تطبيقات البنوك المحلية (بيمو / شام كاش)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>دفع نقدي عند الوصول مع عربون تثبيت</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                <span>حوالات للمغتربين القادمين من الخارج</span>
              </div>
            </div>
          </div>

          {/* Host Support & Contact */}
          <div>
            <h4 className="font-bold text-white mb-3 text-sm flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-emerald-500" />
              خدمة العملاء وأصحاب العقارات
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              فريقنا جاهز لمساعدتك في أي استفسار حول حجزك أو لإضافة عقارك في المنصة على مدار 24 ساعة:
            </p>
            <div className="space-y-2">
              <a
                href="https://wa.me/963933112233"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-emerald-700/60 hover:bg-emerald-600 text-white px-3 py-2 rounded-xl text-xs font-bold transition-all w-fit"
              >
                <MessageCircle className="w-4 h-4" />
                <span>دعم العملاء عبر واتساب</span>
              </a>
              <div className="text-[11px] text-slate-500 pt-1">
                دمشق - أوتوستراد المزة | طرطوس - الكورنيش
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & discrete administration links */}
        <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            جميع الحقوق محفوظة &copy; {new Date().getFullYear()} سيران سوريا (Seyran Syria). المنصة الرائدة لحجوزات الشاليهات والمزارع في سوريا.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            <button 
              onClick={() => setIsBrandHeritageModalOpen(true)}
              className="hover:text-emerald-400 transition-colors"
            >
              ميثاق الضيافة المعتمد
            </button>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">الشروط والضمانات</span>
            <span>•</span>
            <button
              onClick={() => setIsAdminMode(true)}
              className="hover:text-amber-400 text-slate-500 transition-colors flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>لوحة الإدارة</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
