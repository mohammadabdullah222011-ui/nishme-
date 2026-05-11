import { useState, useEffect, useCallback } from "react";
import { Search, Plus, Filter, Trash2, Loader2, RefreshCw, Pencil, Package } from "lucide-react";
import AddProductModal, { type ProductFormData } from "@/components/AddProductModal";
import { adminApi, type AdminProduct } from "@/lib/api";
import { useLang } from "@/i18n/context";
import { useIsMobile } from "@/hooks/use-mobile";

const categoryLabel: Record<string, string> = {
  pc: "كمبيوتر",
  consoles: "كونسول",
  accessories: "إكسسوارات",
  games: "ألعاب",
};

function stockStatus(stock: number) {
  if (stock === 0) return "نفد";
  if (stock <= 5) return "منخفض";
  return "متوفر";
}

const stockStyles: Record<string, string> = {
  "متوفر": "text-green-400 bg-green-400/10 border-green-400/20",
  "منخفض": "text-orange-400 bg-orange-400/10 border-orange-400/20",
  "نفد": "text-red-400 bg-red-400/10 border-red-400/20",
};

export default function Products() {
  const { t } = useLang();
  const isMobile = useIsMobile();
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<number | null>(null);

  const fetchProducts = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const data = await adminApi.getProducts();
      setProducts(data);
      setError("");
    } catch (e: any) {
      console.error("Error fetching products:", e);
      if (!silent) setError(e.message);
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    const interval = setInterval(() => fetchProducts(true), 10000);
    
    // الاستماع لتحديثات المنتجات من Dashboard
    const handleProductsUpdate = (event: CustomEvent) => {
      if (event.detail.action === 'add') {
        // إضافة المنتج الجديد إلى القائمة
        setProducts((prev) => [event.detail.product, ...prev]);
      }
    };
    
    window.addEventListener('productsUpdate', handleProductsUpdate as EventListener);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('productsUpdate', handleProductsUpdate as EventListener);
    };
  }, [fetchProducts]);

  const handleSave = async (data: ProductFormData) => {
    try {
      if (editingProduct) {
        const updated = await adminApi.updateProduct(editingProduct.id, data);
        setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? updated : p)));
        await fetchProducts(true);
      } else {
        const created = await adminApi.addProduct(data);
        setProducts((prev) => [created, ...(Array.isArray(prev) ? prev : [])]);
        setShowModal(false);
        setEditingProduct(null);
      }
    } catch (error: any) {
      alert("Failed to save product: " + (error.message || "Unknown error"));
    }
  };

  const openAdd = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const openEdit = (product: AdminProduct) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setDeleting(id);
    try {
      await adminApi.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setDeleting(null);
    }
  };

  const productsArray = Array.isArray(products) ? products : [];
  const filtered = productsArray.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (categoryLabel[p.category] || p.category).includes(search)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-white text-2xl font-bold">{t("المنتجات")}</h1>
          <span className="text-white/30 text-sm">({productsArray.length})</span>
          <button onClick={() => fetchProducts()} title={t("تحديث")}
            className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-all">
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200"
          style={{ background: "rgba(220,38,38,0.85)", boxShadow: "0 0 15px rgba(220,38,38,0.3)" }}
          data-testid="button-add-product">
          <Plus size={15} />
          {t("إضافة منتج")}
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-xl border border-red-500/25 text-red-400 text-sm flex items-center gap-2"
          style={{ background: "rgba(220,38,38,0.08)" }}>
          ⚠️ {error}
        </div>
      )}

      {/* Table card */}
      <div className="stat-card">
        <div className="flex gap-3 mb-5">
          <div className="relative flex-1">
            <Search size={14} className="absolute top-1/2 -translate-y-1/2 left-3 text-white/30" />
            <input type="search" placeholder={t("البحث في المنتجات...")}
              className="w-full bg-white/5 border border-white/8 rounded-xl py-2 pl-8 pr-4 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-red-500/40 transition-colors"
              value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/8 text-white/50 hover:text-white text-sm transition-all">
            <Filter size={14} />{t("فلتر")}
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12 gap-3">
            <Loader2 size={24} className="animate-spin text-red-500" />
            <span className="text-white/40 text-sm">{t("جارٍ التحميل...")}</span>
          </div>
        ) : isMobile ? (
          <div className="space-y-3">
            {filtered.map((p) => {
              const status = stockStatus(p.stock);
              return (
                <div key={p.id} className="rounded-xl border border-white/[0.06] p-3 space-y-2"
                  style={{ background: "rgba(255,255,255,0.02)" }}>
                  <div className="flex items-center gap-3">
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt={p.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-white/10" />
                    ) : (
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, rgba(220,38,38,0.3), rgba(220,38,38,0.1))" }}>
                        <Package size={18} />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-white/85 font-medium text-sm truncate">{p.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-white/50 text-[10px] px-2 py-0.5 rounded-full border border-white/10 bg-white/5">
                          {t(categoryLabel[p.category] || p.category)}
                        </span>
                        {p.badge && <span className="text-[10px] text-red-400/70">{p.badge}</span>}
                      </div>
                    </div>
                    <span className="text-white font-bold text-xs" style={{ fontFamily: "'Orbitron', monospace" }}>
                      {p.price.toLocaleString("en")} JD
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${stockStyles[status]}`}>
                      {t(status)} ({p.stock})
                    </span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(p)}
                        className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium flex items-center gap-1 px-2 py-1 rounded-lg border border-white/10">
                        <Pencil size={11} />
                        {t("تعديل")}
                      </button>
                      <button onClick={() => handleDelete(p.id)} disabled={deleting === p.id}
                        className="text-xs text-red-400 hover:text-red-300 transition-colors font-medium flex items-center gap-1 px-2 py-1 rounded-lg border border-white/10 disabled:opacity-50">
                        {deleting === p.id ? <Loader2 size={11} className="animate-spin" /> : <Trash2 size={11} />}
                        {t("حذف")}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <div className="py-10 text-center text-white/30 text-sm">
                <Package size={28} className="mx-auto text-white/10 mb-2" />
                {search ? t("لا توجد نتائج للبحث") : t("لا توجد منتجات — اضغط إضافة منتج للبدء")}
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {[t("المنتج"), t("الفئة"), t("السعر"), t("المخزون"), t("الحالة"), t("الإجراءات")].map((h) => (
                    <th key={h} className="text-right text-white/35 font-medium text-xs pb-3 px-2">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => {
                  const status = stockStatus(p.stock);
                  return (
                    <tr key={p.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-3">
                          {p.imageUrl ? (
                            <img src={p.imageUrl} alt={p.name} className="w-9 h-9 rounded-lg object-cover flex-shrink-0 border border-white/10" />
                          ) : (
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                              style={{ background: "linear-gradient(135deg, rgba(220,38,38,0.3), rgba(220,38,38,0.1))" }}>
                              {p.id}
                            </div>
                          )}
                          <div>
                            <p className="text-white/85 font-medium text-xs truncate max-w-[180px]">{p.name}</p>
                            {p.badge && (
                              <span className="text-[10px] text-red-400/70">{p.badge}</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <span className="text-white/50 text-xs px-2 py-0.5 rounded-full border border-white/10 bg-white/5">
                          {t(categoryLabel[p.category] || p.category)}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-white font-bold text-xs" style={{ fontFamily: "'Orbitron', monospace" }}>
                        {p.price.toLocaleString("en")} JOD
                      </td>
                      <td className="py-3 px-2 text-white/60 text-xs">{p.stock}</td>
                      <td className="py-3 px-2">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${stockStyles[status]}`}>
                          {t(status)}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <button onClick={() => openEdit(p)}
                            className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium flex items-center gap-1"
                            data-testid={`button-edit-${p.id}`}>
                            <Pencil size={12} />
                            {t("تعديل")}
                          </button>
                          <span className="text-white/15">|</span>
                          <button onClick={() => handleDelete(p.id)} disabled={deleting === p.id}
                            className="text-xs text-red-400 hover:text-red-300 transition-colors font-medium flex items-center gap-1 disabled:opacity-50"
                            data-testid={`button-delete-${p.id}`}>
                            {deleting === p.id ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
                            {t("حذف")}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && !loading && (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-white/30 text-sm">
                      {search ? t("لا توجد نتائج للبحث") : t("لا توجد منتجات — اضغط إضافة منتج للبدء")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AddProductModal
        open={showModal}
        onClose={() => { setShowModal(false); setEditingProduct(null); }}
        onSave={handleSave}
        editingProduct={editingProduct}
      />
    </div>
  );
}
