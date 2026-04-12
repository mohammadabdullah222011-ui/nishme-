import { useState } from "react";
import { Search, Plus, Filter } from "lucide-react";
import AddProductModal from "@/components/AddProductModal";

const initialProducts = [
  { id: 1, name: "PlayStation 5 Digital Edition", category: "كونسول", price: 2299, stock: 3, status: "منخفض" },
  { id: 2, name: "Xbox Series X 1TB", category: "كونسول", price: 2099, stock: 18, status: "متوفر" },
  { id: 3, name: "ROG Strix G15 Laptop", category: "كمبيوتر", price: 4899, stock: 7, status: "متوفر" },
  { id: 4, name: "Alienware m15 R7", category: "كمبيوتر", price: 5499, stock: 5, status: "متوفر" },
  { id: 5, name: "SteelSeries Arctis Nova Pro", category: "إكسسوارات", price: 599, stock: 24, status: "متوفر" },
  { id: 6, name: "Logitech G Pro X Superlight", category: "إكسسوارات", price: 399, stock: 31, status: "متوفر" },
  { id: 7, name: "God of War: Ragnarok", category: "ألعاب", price: 199, stock: 52, status: "متوفر" },
  { id: 8, name: "FIFA 25", category: "ألعاب", price: 179, stock: 0, status: "نفد" },
];

const stockStyles: Record<string, string> = {
  "متوفر": "text-green-400 bg-green-400/10 border-green-400/20",
  "منخفض": "text-orange-400 bg-orange-400/10 border-orange-400/20",
  "نفد": "text-red-400 bg-red-400/10 border-red-400/20",
};

export default function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.includes(search)
  );

  const handleAdd = (product: any) => {
    setProducts([{ ...product, id: products.length + 1 }, ...products]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-white text-2xl font-bold">المنتجات</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200"
          style={{ background: "rgba(220,38,38,0.85)", boxShadow: "0 0 15px rgba(220,38,38,0.3)" }}
          data-testid="button-add-product"
        >
          <Plus size={15} />
          إضافة منتج
        </button>
      </div>

      <div className="stat-card">
        <div className="flex gap-3 mb-5">
          <div className="relative flex-1">
            <Search size={14} className="absolute top-1/2 -translate-y-1/2 left-3 text-white/30" />
            <input
              type="search"
              placeholder="البحث في المنتجات..."
              className="w-full bg-white/5 border border-white/8 rounded-xl py-2 pl-8 pr-4 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-red-500/40 transition-colors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/8 text-white/50 hover:text-white text-sm transition-all">
            <Filter size={14} />
            فلتر
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {["المنتج", "الفئة", "السعر", "المخزون", "الحالة", ""].map((h) => (
                  <th key={h} className="text-right text-white/35 font-medium text-xs pb-3 px-2">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, rgba(220,38,38,0.3), rgba(220,38,38,0.1))" }}
                      >
                        {p.id}
                      </div>
                      <span className="text-white/80 font-medium text-xs truncate max-w-[200px]">{p.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <span className="text-white/50 text-xs px-2 py-0.5 rounded-full border border-white/10 bg-white/5">
                      {p.category}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-white font-bold text-xs" style={{ fontFamily: "'Orbitron', monospace" }}>
                    {p.price.toLocaleString()} JOD
                  </td>
                  <td className="py-3 px-2 text-white/60 text-xs">{p.stock}</td>
                  <td className="py-3 px-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${stockStyles[p.status]}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <button className="text-xs text-red-400 hover:text-red-300 transition-colors font-medium">
                      تعديل
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-white/30 text-sm">لا توجد نتائج</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddProductModal open={showModal} onClose={() => setShowModal(false)} onAdd={handleAdd} />
    </div>
  );
}
