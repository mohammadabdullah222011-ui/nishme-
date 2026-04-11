import { Link } from "wouter";
import { Monitor, Gamepad2, Headphones, Disc, ChevronLeft, Zap, Shield, Truck } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { featuredProducts } from "@/data/products";

const categoryIcons: Record<string, React.ReactNode> = {
  Monitor: <Monitor size={28} />,
  Gamepad2: <Gamepad2 size={28} />,
  Headphones: <Headphones size={28} />,
  Disc: <Disc size={28} />,
};

const categoriesList = [
  { id: "pc", label: "كمبيوتر", icon: "Monitor", count: 4, description: "معالجات وكروت شاشة ومكونات" },
  { id: "consoles", label: "كونسول", icon: "Gamepad2", count: 3, description: "PS5, Xbox, Nintendo" },
  { id: "accessories", label: "إكسسوارات", icon: "Headphones", count: 3, description: "ماوس، كيبورد، سماعات" },
  { id: "games", label: "ألعاب", icon: "Disc", count: 4, description: "أحدث الألعاب العالمية" },
];

const features = [
  {
    icon: <Zap size={22} />,
    title: "توصيل سريع",
    desc: "توصيل خلال 24-48 ساعة لجميع مناطق المملكة",
  },
  {
    icon: <Shield size={22} />,
    title: "ضمان أصلي",
    desc: "جميع المنتجات تأتي بضمان رسمي من الشركة",
  },
  {
    icon: <Truck size={22} />,
    title: "إرجاع مجاني",
    desc: "سياسة إرجاع مرنة خلال 14 يوم",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ paddingTop: "80px" }}
      >
        {/* Grid Background */}
        <div className="absolute inset-0 hero-grid opacity-60" />

        {/* Red gradient spots */}
        <div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, #dc2626, transparent)" }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #dc2626, transparent)" }}
        />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          {/* Tagline pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 text-red-400 text-sm font-semibold mb-8"
            style={{ background: "rgba(220,38,38,0.08)" }}
          >
            <Zap size={14} className="fill-current" />
            الوجهة الأولى للجيمرز في المملكة
          </div>

          {/* Store Name */}
          <h1
            className="text-7xl sm:text-8xl lg:text-9xl font-black mb-4 leading-none"
            style={{
              fontFamily: "'Cairo', sans-serif",
              fontWeight: 900,
              background: "linear-gradient(135deg, #ffffff 40%, #ef4444 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "none",
              filter: "drop-shadow(0 0 30px rgba(220,38,38,0.4))",
            }}
          >
            نشمي سوق
          </h1>

          <p className="text-white/60 text-lg sm:text-xl mb-10 font-medium max-w-xl mx-auto leading-relaxed">
            اكتشف عالماً من الألعاب والإكسسوارات الاحترافية. جهّز نفسك للمعركة.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/products">
              <button
                className="px-8 py-4 rounded-2xl text-white font-bold text-lg transition-all duration-300 hover:scale-105 active:scale-95 glow-red"
                style={{
                  background: "linear-gradient(135deg, #dc2626, #b91c1c)",
                  boxShadow: "0 0 30px rgba(220,38,38,0.5), 0 4px 20px rgba(0,0,0,0.4)",
                }}
                data-testid="button-shop-now"
              >
                تسوق الآن
              </button>
            </Link>
            <Link href="/categories">
              <button
                className="px-8 py-4 rounded-2xl text-white/80 font-bold text-lg border border-white/20 hover:border-red-500/40 hover:text-white hover:bg-white/5 transition-all duration-300"
                data-testid="button-explore-categories"
              >
                استكشف الفئات
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-16">
            {[
              { value: "+500", label: "منتج متاح" },
              { value: "+10K", label: "عميل سعيد" },
              { value: "24/7", label: "دعم فني" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-black text-red-400" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  {stat.value}
                </p>
                <p className="text-white/40 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
          <div
            className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
          >
            <div
              className="w-1 h-2 rounded-full bg-red-500"
              style={{ animation: "bounce 1.5s infinite" }}
            />
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="border-y border-white/8" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(220,38,38,0.12)", color: "#ef4444" }}
                >
                  {f.icon}
                </div>
                <div>
                  <p className="text-white font-bold">{f.title}</p>
                  <p className="text-white/50 text-sm">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black text-white mb-2">تسوق حسب الفئة</h2>
            <p className="text-white/40">اختر الفئة التي تناسب اهتمامك</p>
          </div>
          <Link href="/categories">
            <button className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm font-semibold transition-colors">
              عرض الكل
              <ChevronLeft size={16} />
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categoriesList.map((cat) => (
            <Link key={cat.id} href={`/products?category=${cat.id}`} data-testid={`card-category-${cat.id}`}>
              <div
                className="group relative rounded-2xl p-6 border border-white/8 card-hover overflow-hidden"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, rgba(220,38,38,0.08), transparent)" }}
                />
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: "rgba(220,38,38,0.12)",
                    color: "#ef4444",
                    boxShadow: "0 0 0 rgba(220,38,38,0)",
                  }}
                >
                  {categoryIcons[cat.icon]}
                </div>
                <h3 className="text-white font-bold text-lg group-hover:text-red-400 transition-colors">
                  {cat.label}
                </h3>
                <p className="text-white/40 text-sm mt-1">{cat.description}</p>
                <p className="text-red-400/70 text-xs font-semibold mt-3">
                  {cat.count} منتجات
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div
          className="rounded-3xl p-8 sm:p-10 border border-red-900/20"
          style={{ background: "rgba(220,38,38,0.04)" }}
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="w-8 h-1 rounded-full inline-block"
                  style={{ background: "linear-gradient(90deg, #dc2626, #7f1d1d)" }}
                />
                <span className="text-red-400 text-sm font-bold uppercase tracking-wider">
                  أبرز المنتجات
                </span>
              </div>
              <h2 className="text-3xl font-black text-white">منتجات مميزة</h2>
            </div>
            <Link href="/products">
              <button className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm font-semibold transition-colors">
                عرض الكل
                <ChevronLeft size={16} />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div
          className="relative rounded-3xl overflow-hidden text-center py-20 px-8"
          style={{
            background: "linear-gradient(135deg, #1a0000 0%, #0d0000 50%, #1a0000 100%)",
            border: "1px solid rgba(220,38,38,0.3)",
          }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 blur-3xl opacity-30"
            style={{ background: "radial-gradient(ellipse, #dc2626, transparent)" }}
          />
          <div className="relative z-10">
            <Gamepad2
              size={48}
              className="mx-auto mb-6 text-red-500"
              style={{ filter: "drop-shadow(0 0 15px rgba(220,38,38,0.6))" }}
            />
            <h2
              className="text-4xl sm:text-5xl font-black text-white mb-4"
              style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 900 }}
            >
              انضم لمجتمع نشمي
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-md mx-auto">
              سجّل حسابك الآن واحصل على خصم 10% على أول طلب
            </p>
            <Link href="/register">
              <button
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-bold text-lg transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #dc2626, #b91c1c)",
                  boxShadow: "0 0 30px rgba(220,38,38,0.5)",
                }}
                data-testid="button-register-cta"
              >
                إنشاء حساب مجاني
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
