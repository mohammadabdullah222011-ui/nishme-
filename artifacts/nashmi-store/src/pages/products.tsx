import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import type { Category } from "@/data/products";
import { useSearch } from "wouter";

const categoryLabels: Record<string, string> = {
  all: "الكل",
  pc: "كمبيوتر",
  consoles: "كونسول",
  accessories: "إكسسوارات",
  games: "ألعاب",
};

const sortOptions = [
  { value: "default", label: "الافتراضي" },
  { value: "price-asc", label: "السعر: الأقل أولاً" },
  { value: "price-desc", label: "السعر: الأعلى أولاً" },
  { value: "rating", label: "الأعلى تقييماً" },
];

export default function ProductsPage() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const initialCategory = params.get("category") || "all";

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === (activeCategory as Category));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.includes(searchQuery) ||
          p.description.includes(searchQuery) ||
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1
            className="text-4xl font-black text-white mb-2"
            style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 900 }}
          >
            جميع المنتجات
          </h1>
          <p className="text-white/40">
            {filteredProducts.length} منتج متاح
          </p>
        </div>

        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute top-1/2 -translate-y-1/2 right-4 text-white/30"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن منتج..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-12 pl-4 text-white placeholder:text-white/30 focus:outline-none focus:border-red-500/50 transition-colors"
              data-testid="input-search"
            />
          </div>
          <div className="relative">
            <SlidersHorizontal
              size={16}
              className="absolute top-1/2 -translate-y-1/2 right-4 text-white/30 pointer-events-none"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl py-3 pr-12 pl-4 text-white focus:outline-none focus:border-red-500/50 transition-colors appearance-none cursor-pointer"
              data-testid="select-sort"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value} className="bg-gray-900">
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                activeCategory === key
                  ? "text-white"
                  : "text-white/50 border border-white/10 hover:border-white/20 hover:text-white/70"
              }`}
              style={
                activeCategory === key
                  ? {
                      background: "linear-gradient(135deg, #dc2626, #b91c1c)",
                      boxShadow: "0 0 15px rgba(220,38,38,0.3)",
                    }
                  : {}
              }
              data-testid={`button-filter-${key}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.2)" }}
            >
              <Search size={32} className="text-red-500/60" />
            </div>
            <p className="text-white/50 text-lg">لا توجد نتائج</p>
            <p className="text-white/30 text-sm mt-2">جرّب البحث بكلمات مختلفة</p>
          </div>
        )}
      </div>
    </div>
  );
}
