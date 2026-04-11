import { useParams, Link } from "wouter";
import { ShoppingCart, Star, ArrowRight, CheckCircle } from "lucide-react";
import { useState } from "react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/50 text-xl mb-4">المنتج غير موجود</p>
          <Link href="/products">
            <button className="text-red-400 hover:text-red-300 text-sm font-semibold">
              العودة للمنتجات
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const categoryLabel =
    product.category === "pc"
      ? "كمبيوتر"
      : product.category === "consoles"
      ? "كونسول"
      : product.category === "accessories"
      ? "إكسسوارات"
      : "ألعاب";

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
          <Link href="/" className="hover:text-white/70 transition-colors">
            الرئيسية
          </Link>
          <ArrowRight size={14} className="rotate-180" />
          <Link href="/products" className="hover:text-white/70 transition-colors">
            المنتجات
          </Link>
          <ArrowRight size={14} className="rotate-180" />
          <span className="text-white/60">{product.name}</span>
        </div>

        {/* Product Main */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Image */}
          <div className="relative">
            <div
              className="rounded-3xl overflow-hidden border border-white/10"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full object-cover"
                style={{ maxHeight: "480px" }}
                data-testid="img-product-main"
              />
            </div>
            {product.badge && (
              <div
                className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-sm font-bold text-white"
                style={{
                  background: "linear-gradient(135deg, #dc2626, #7f1d1d)",
                  boxShadow: "0 0 15px rgba(220,38,38,0.5)",
                }}
              >
                {product.badge}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <span className="text-red-400/70 text-sm font-bold uppercase tracking-wider mb-2">
              {categoryLabel}
            </span>
            <h1
              className="text-3xl lg:text-4xl font-black text-white mb-4 leading-tight"
              style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 900 }}
              data-testid="text-product-name"
            >
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-white/20"
                    }
                  />
                ))}
              </div>
              <span className="text-yellow-400 font-bold">{product.rating}</span>
              <span className="text-white/40 text-sm">({product.reviews} تقييم)</span>
            </div>

            {/* Price */}
            <div
              className="flex items-baseline gap-2 mb-6 p-4 rounded-2xl border border-red-900/30"
              style={{ background: "rgba(220,38,38,0.06)" }}
            >
              <span
                className="text-5xl font-black"
                style={{ color: "#ef4444", fontFamily: "'Orbitron', sans-serif" }}
                data-testid="text-product-price"
              >
                {product.price.toLocaleString("ar-SA")}
              </span>
              <span className="text-white/50 text-lg font-medium">ريال سعودي</span>
            </div>

            {/* Description */}
            <p className="text-white/60 leading-relaxed mb-6">{product.description}</p>

            {/* Specs */}
            {product.specs && product.specs.length > 0 && (
              <div className="mb-8">
                <h3 className="text-white font-bold mb-3">المواصفات</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.specs.map((spec) => (
                    <div key={spec} className="flex items-center gap-2 text-sm">
                      <CheckCircle size={14} className="text-red-400 flex-shrink-0" />
                      <span className="text-white/70">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-white/60 text-sm font-medium">الكمية</span>
              <div className="flex items-center gap-3 border border-white/10 rounded-xl px-4 py-2">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="text-white/60 hover:text-white transition-colors text-lg font-bold w-5 text-center"
                  data-testid="button-decrease-qty"
                >
                  -
                </button>
                <span className="text-white font-bold w-6 text-center" data-testid="text-qty">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="text-white/60 hover:text-white transition-colors text-lg font-bold w-5 text-center"
                  data-testid="button-increase-qty"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className={`flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-lg text-white transition-all duration-300 hover:scale-[1.02] active:scale-95 ${
                added ? "bg-green-600" : ""
              }`}
              style={
                added
                  ? {}
                  : {
                      background: "linear-gradient(135deg, #dc2626, #b91c1c)",
                      boxShadow: "0 0 30px rgba(220,38,38,0.4), 0 4px 20px rgba(0,0,0,0.4)",
                    }
              }
              data-testid="button-add-to-cart"
            >
              <ShoppingCart size={22} />
              {added ? "تمت الإضافة للسلة" : "أضف إلى السلة"}
            </button>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span
                className="w-8 h-1 rounded-full inline-block"
                style={{ background: "linear-gradient(90deg, #dc2626, #7f1d1d)" }}
              />
              <h2 className="text-2xl font-black text-white">منتجات مشابهة</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
