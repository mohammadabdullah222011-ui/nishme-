import { Link } from "wouter";
import { Monitor, Gamepad2, Headphones, Disc, ChevronLeft } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";

const categoriesList = [
  {
    id: "pc",
    label: "كمبيوتر",
    description: "معالجات، كروت شاشة، ذاكرة عشوائية، ومكونات الكمبيوتر الشخصي وأجهزة الألعاب المتكاملة.",
    icon: Monitor,
    gradient: "from-blue-900/30 to-blue-950/10",
    border: "border-blue-900/30",
    iconColor: "#60a5fa",
  },
  {
    id: "consoles",
    label: "كونسول",
    description: "PlayStation 5، Xbox Series X، Nintendo Switch وجميع أجهزة الألعاب المنزلية والمحمولة.",
    icon: Gamepad2,
    gradient: "from-red-900/30 to-red-950/10",
    border: "border-red-900/30",
    iconColor: "#ef4444",
  },
  {
    id: "accessories",
    label: "إكسسوارات",
    description: "ماوس، كيبورد، سماعات، كراسي جيمينج وجميع الملحقات التي تحتاجها لتجربة لعب مثالية.",
    icon: Headphones,
    gradient: "from-purple-900/30 to-purple-950/10",
    border: "border-purple-900/30",
    iconColor: "#a78bfa",
  },
  {
    id: "games",
    label: "ألعاب",
    description: "أحدث الألعاب العالمية لجميع المنصات مع عروض حصرية وإصدارات محدودة النسخ.",
    icon: Disc,
    gradient: "from-green-900/30 to-green-950/10",
    border: "border-green-900/30",
    iconColor: "#34d399",
  },
];

export default function CategoriesPage() {
  const { products } = useProducts();
  const getCount = (catId: string) =>
    products.filter((p) => p.category === catId).length;

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1
            className="text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 900 }}
          >
            الفئات
          </h1>
          <p className="text-white/40 text-lg max-w-lg mx-auto">
            استكشف تشكيلتنا الواسعة من المنتجات المصنفة لتجدها بسهولة
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {categoriesList.map((cat) => {
            const count = getCount(cat.id);
            const Icon = cat.icon;
            const catProducts = products.filter((p) => p.category === cat.id).slice(0, 3);

            return (
              <Link
                key={cat.id}
                href={`/products?category=${cat.id}`}
                data-testid={`card-cat-${cat.id}`}
              >
                <div
                  className={`group relative rounded-3xl p-8 border ${cat.border} card-hover overflow-hidden`}
                  style={{
                    background: `linear-gradient(135deg, rgba(10,10,10,0.9), rgba(5,5,5,0.9))`,
                  }}
                >
                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-60 group-hover:opacity-80 transition-opacity duration-300`}
                  />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{ background: `${cat.iconColor}18`, border: `1px solid ${cat.iconColor}30` }}
                      >
                        <Icon size={30} style={{ color: cat.iconColor }} />
                      </div>
                      <div className="flex items-center gap-2 text-white/60 group-hover:text-white/80 transition-colors">
                        <span className="text-sm font-semibold">تسوق الآن</span>
                        <ChevronLeft size={16} />
                      </div>
                    </div>

                    <h2 className="text-2xl font-black text-white mb-2 group-hover:text-opacity-90">
                      {cat.label}
                    </h2>
                    <p className="text-white/50 text-sm leading-relaxed mb-6">
                      {cat.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span
                        className="text-sm font-bold"
                        style={{ color: cat.iconColor }}
                      >
                        {count} منتجات متاحة
                      </span>

                      {/* Preview images */}
                      <div className="flex -space-x-2 space-x-reverse">
                        {catProducts.map((p) => (
                          <img
                            key={p.id}
                            src={p.image}
                            alt={p.name}
                            className="w-8 h-8 rounded-full object-cover border-2 border-white/10"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* All Products CTA */}
        <div
          className="text-center rounded-3xl p-12 border border-white/8"
          style={{ background: "rgba(255,255,255,0.02)" }}
        >
          <h3 className="text-2xl font-bold text-white mb-3">
            عرض جميع المنتجات
          </h3>
          <p className="text-white/40 mb-6">
            {products.length}+ منتجات متاحة بانتظارك
          </p>
          <Link href="/products">
            <button
              className="px-8 py-3.5 rounded-2xl text-white font-bold transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #dc2626, #b91c1c)",
                boxShadow: "0 0 20px rgba(220,38,38,0.3)",
              }}
              data-testid="button-all-products"
            >
              تصفح الكل
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
