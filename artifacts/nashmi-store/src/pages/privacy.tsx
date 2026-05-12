import { Link } from "wouter";
import { ArrowRight, Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
          <Link href="/" className="hover:text-white/70 transition-colors">الرئيسية</Link>
          <ArrowRight size={14} className="rotate-180" />
          <span className="text-white/60">سياسة الخصوصية</span>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #dc2626, #7f1d1d)" }}>
            <Shield size={24} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-white" style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 900 }}>سياسة الخصوصية</h1>
        </div>

        <div className="space-y-6 text-white/70 leading-relaxed">
          <p>نحن في <strong>نشمي سوق</strong> نلتزم بحماية خصوصية زوارنا وعملائنا. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية معلوماتك الشخصية.</p>

          <h2 className="text-xl font-bold text-white mt-8">المعلومات التي نجمعها</h2>
          <p>نقوم بجمع المعلومات التالية عند استخدامك لموقعنا:</p>
          <ul className="list-disc pr-6 space-y-2">
            <li>الاسم والبريد الإلكتروني ورقم الهاتف عند إنشاء حساب</li>
            <li>عنوان التوصيل عند تقديم طلب</li>
            <li>معلومات التصفح مثل الصفحات التي تزورها</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-8">كيف نستخدم معلوماتك</h2>
          <p>نستخدم معلوماتك من أجل:</p>
          <ul className="list-disc pr-6 space-y-2">
            <li>معالجة طلباتك وتوصيلها</li>
            <li>التواصل معك بخصوص طلباتك</li>
            <li>تحسين تجربتك على الموقع</li>
            <li>إرسال عروض ترويجية (يمكنك إلغاء الاشتراك في أي وقت)</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-8">حماية المعلومات</h2>
          <p>نتخذ إجراءات أمنية مناسبة لحماية معلوماتك من الوصول غير المصرح به أو التعديل أو الكشف.</p>

          <h2 className="text-xl font-bold text-white mt-8">جهات خارجية</h2>
          <p>لا نقوم ببيع أو مشاركة معلوماتك الشخصية مع أطراف ثالثة لأغراض تسويقية دون موافقتك.</p>

          <h2 className="text-xl font-bold text-white mt-8">التواصل</h2>
          <p>للاستفسارات المتعلقة بالخصوصية، يرجى التواصل معنا على البريد الإلكتروني: <span className="text-red-400">nashmisouq25@gmail.com</span></p>
        </div>
      </div>
    </div>
  );
}
