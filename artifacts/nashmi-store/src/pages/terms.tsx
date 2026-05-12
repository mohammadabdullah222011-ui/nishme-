import { Link } from "wouter";
import { ArrowRight, FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
          <Link href="/" className="hover:text-white/70 transition-colors">الرئيسية</Link>
          <ArrowRight size={14} className="rotate-180" />
          <span className="text-white/60">الشروط والأحكام</span>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #dc2626, #7f1d1d)" }}>
            <FileText size={24} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-white" style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 900 }}>الشروط والأحكام</h1>
        </div>

        <div className="space-y-6 text-white/70 leading-relaxed">
          <p>مرحباً بك في <strong>نشمي سوق</strong>. باستخدامك لهذا الموقع، فإنك توافق على الشروط والأحكام التالية. يرجى قراءتها بعناية.</p>

          <h2 className="text-xl font-bold text-white mt-8">الحسابات</h2>
          <ul className="list-disc pr-6 space-y-2">
            <li>يجب أن تكون المعلومات التي تقدمها عند التسجيل صحيحة وكاملة</li>
            <li>أنت مسؤول عن الحفاظ على سرية كلمة المرور الخاصة بك</li>
            <li>يحق لنا إلغاء أو تعليق أي حساب يخالف هذه الشروط</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-8">الطلبات والدفع</h2>
          <ul className="list-disc pr-6 space-y-2">
            <li>تقديم طلب يعني موافقتك على سعر المنتج وشروط التوصيل</li>
            <li>يتم تأكيد الطلب بعد التواصل من قبل فريقنا</li>
            <li>الدفع نقداً عند الاستلام أو عبر التحويل البنكي</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-8">التوصيل</h2>
          <ul className="list-disc pr-6 space-y-2">
            <li>نوفر التوصيل إلى جميع محافظات الأردن</li>
            <li>مدة التوصيل تختلف حسب الموقع وتوافر المنتج</li>
            <li>قد تتأثر أوقات التوصيل بالظروف الطارئة</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-8">الإرجاع والاستبدال</h2>
          <ul className="list-disc pr-6 space-y-2">
            <li>يمكن إرجاع المنتجات خلال 7 أيام من الاستلام</li>
            <li>يجب أن يكون المنتج في حالته الأصلية</li>
            <li>بعض المنتجات قد تكون غير قابلة للإرجاع حسب سياسة المتجر</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-8">تعديل الشروط</h2>
          <p>نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إشعارك بالتغييرات عبر الموقع.</p>

          <h2 className="text-xl font-bold text-white mt-8">التواصل</h2>
          <p>للاستفسارات، يرجى التواصل عبر البريد الإلكتروني: <span className="text-red-400">nashmisouq25@gmail.com</span></p>
        </div>
      </div>
    </div>
  );
}
