import { ShoppingCart, Star } from "lucide-react";
import { Link } from "wouter";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link href={`/products/${product.id}`} data-testid={`card-product-${product.id}`}>
      <div
        className="group relative rounded-2xl overflow-hidden border border-white/8 card-hover cursor-pointer h-full flex flex-col"
        style={{ background: "rgba(255,255,255,0.03)" }}
      >
        {/* Badge */}
        {product.badge && (
          <div
            className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full text-xs font-bold text-white"
            style={{
              background: "linear-gradient(135deg, #dc2626, #7f1d1d)",
              boxShadow: "0 0 10px rgba(220,38,38,0.5)",
            }}
          >
            {product.badge}
          </div>
        )}

        {/* Image */}
        <div className="relative overflow-hidden" style={{ paddingTop: "65%" }}>
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "linear-gradient(to bottom, transparent 50%, rgba(220,38,38,0.15) 100%)",
            }}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4">
          <p className="text-white/50 text-xs font-medium mb-1.5">
            {product.category === "pc"
              ? "كمبيوتر"
              : product.category === "consoles"
              ? "كونسول"
              : product.category === "accessories"
              ? "إكسسوارات"
              : "ألعاب"}
          </p>
          <h3 className="text-white font-bold text-base leading-snug mb-2 group-hover:text-red-400 transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-white/20"}
                />
              ))}
            </div>
            <span className="text-white/40 text-xs">({product.reviews})</span>
          </div>

          <div className="mt-auto flex items-center justify-between gap-3">
            <div>
              <p
                className="text-xl font-black"
                style={{ color: "#ef4444", fontFamily: "'Cairo', sans-serif" }}
                data-testid={`text-price-${product.id}`}
              >
                {product.price.toLocaleString("en")}
              </p>
              <p className="text-white/40 text-xs">دينار اردني</p>
            </div>
            <button
              onClick={handleAddToCart}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                added
                  ? "bg-green-600 text-white scale-95"
                  : "text-white hover:opacity-90 active:scale-95"
              }`}
              style={
                added
                  ? {}
                  : {
                      background: "linear-gradient(135deg, #dc2626, #b91c1c)",
                      boxShadow: "0 0 15px rgba(220,38,38,0.3)",
                    }
              }
              data-testid={`button-add-cart-${product.id}`}
            >
              <ShoppingCart size={14} />
              {added ? "تمت الإضافة" : "أضف"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
