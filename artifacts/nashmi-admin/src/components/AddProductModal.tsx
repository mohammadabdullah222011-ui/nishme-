import { useState, useRef, useEffect } from "react";
import Modal from "@/components/Modal";
import { Package, ImagePlus, X, Upload, Link as LinkIcon, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import type { AdminProduct } from "@/lib/api";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: ProductFormData) => Promise<void>;
  editingProduct?: AdminProduct | null;
}

export interface ProductFormData {
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  badge: string;
  imageUrl: string;
}

const CATEGORIES = ["كمبيوتر", "كونسول", "إكسسوارات", "ألعاب"];
const BADGES = ["جديد", "عروض", "الأكثر مبيعاً", "محدود", ""];

const categoryToEn: Record<string, string> = {
  "كمبيوتر": "pc",
  "كونسول": "consoles",
  "إكسسوارات": "accessories",
  "ألعاب": "games",
  "pc": "pc",
  "consoles": "consoles",
  "accessories": "accessories",
  "games": "games",
};

const categoryToAr: Record<string, string> = {
  pc: "كمبيوتر",
  consoles: "كونسول",
  accessories: "إكسسوارات",
  games: "ألعاب",
};

const emptyForm = {
  name: "",
  description: "",
  category: CATEGORIES[0],
  price: "",
  stock: "",
  badge: "جديد",
  imageUrl: "",
};

export default function AddProductModal({ open, onClose, onSave, editingProduct }: Props) {
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageMode, setImageMode] = useState<"upload" | "url">("url");
  const [dragOver, setDragOver] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      if (editingProduct) {
        const catAr = categoryToAr[editingProduct.category] || editingProduct.category;
        setForm({
          name: editingProduct.name,
          description: editingProduct.description || "",
          category: catAr,
          price: String(editingProduct.price),
          stock: String(editingProduct.stock),
          badge: editingProduct.badge || "",
          imageUrl: editingProduct.imageUrl || "",
        });
        if (editingProduct.imageUrl && !editingProduct.imageUrl.startsWith("data:")) {
          setImagePreview(editingProduct.imageUrl);
          setImageMode("url");
        } else if (editingProduct.imageUrl?.startsWith("data:")) {
          setImagePreview(editingProduct.imageUrl);
          setImageMode("upload");
        }
      } else {
        setForm(emptyForm);
        setImageFile(null);
        setImagePreview(null);
      }
      setStatus("idle");
      setErrorMsg("");
    }
  }, [open, editingProduct]);

  const handleImage = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImagePreview(result);
      setForm((f) => ({ ...f, imageUrl: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleImage(file);
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setForm((f) => ({ ...f, imageUrl: "" }));
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price || !form.stock) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const payload: ProductFormData = {
        name: form.name.trim(),
        description: form.description.trim() || form.name.trim(),
        category: categoryToEn[form.category] || "pc",
        price: Number(form.price),
        stock: Number(form.stock),
        badge: form.badge,
        imageUrl: form.imageUrl || imagePreview || "",
      };
      await onSave(payload);
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        onClose();
        setForm(emptyForm);
        clearImage();
      }, 1200);
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "حدث خطأ أثناء الحفظ");
    }
  };

  const isEditing = !!editingProduct;

  return (
    <Modal open={open} onClose={onClose} title={isEditing ? "تعديل المنتج" : "إضافة منتج جديد"}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" dir="rtl">

        {/* Image section */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-white/60 text-xs font-medium">صورة المنتج</label>
            <div className="flex gap-1">
              <button type="button" onClick={() => setImageMode("url")}
                className={`text-[10px] px-2 py-0.5 rounded-md transition-colors ${imageMode === "url" ? "bg-red-500/20 text-red-400" : "text-white/30 hover:text-white/50"}`}>
                <LinkIcon size={10} className="inline ml-1" />رابط
              </button>
              <button type="button" onClick={() => setImageMode("upload")}
                className={`text-[10px] px-2 py-0.5 rounded-md transition-colors ${imageMode === "upload" ? "bg-red-500/20 text-red-400" : "text-white/30 hover:text-white/50"}`}>
                <Upload size={10} className="inline ml-1" />رفع
              </button>
            </div>
          </div>

          {imageMode === "url" ? (
            <div className="flex flex-col gap-2">
              <input type="url" placeholder="https://..." value={form.imageUrl}
                onChange={(e) => { setForm((f) => ({ ...f, imageUrl: e.target.value })); setImagePreview(e.target.value || null); }}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-red-500/50 transition-colors" />
              {imagePreview && imagePreview.startsWith("http") && (
                <img src={imagePreview} alt="preview" className="w-full h-28 object-cover rounded-xl border border-white/10" onError={() => setImagePreview(null)} />
              )}
            </div>
          ) : imagePreview ? (
            <div className="relative rounded-xl overflow-hidden border border-white/10 group">
              <img src={imagePreview} alt="preview" className="w-full h-36 object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button type="button" onClick={() => inputRef.current?.click()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white border border-white/20 hover:bg-white/10 transition-colors">
                  <Upload size={12} />تغيير
                </button>
                <button type="button" onClick={clearImage}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-colors">
                  <X size={12} />حذف
                </button>
              </div>
              {imageFile && (
                <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded-md text-[10px] text-white/60 max-w-[180px] truncate">
                  {imageFile.name}
                </div>
              )}
            </div>
          ) : (
            <div
              className={`relative flex flex-col items-center justify-center gap-2 h-32 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 ${dragOver ? "border-red-500/60 bg-red-500/8" : "border-white/15 hover:border-red-500/40 hover:bg-white/3"}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: dragOver ? "rgba(220,38,38,0.15)" : "rgba(255,255,255,0.05)" }}>
                <ImagePlus size={20} className={dragOver ? "text-red-400" : "text-white/30"} />
              </div>
              <p className="text-white/40 text-xs text-center">اسحب الصورة هنا أو <span className="text-red-400 font-semibold">اضغط للاختيار</span></p>
              <p className="text-white/20 text-[10px]">PNG, JPG, WEBP — حتى 5MB</p>
            </div>
          )}

          <input ref={inputRef} type="file" accept="image/*" className="hidden" data-testid="input-product-image"
            onChange={(e) => { const file = e.target.files?.[0]; if (file) handleImage(file); }} />
        </div>

        {/* Name */}
        <div>
          <label className="text-white/60 text-xs font-medium block mb-1.5">اسم المنتج *</label>
          <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-red-500/50 transition-colors"
            placeholder="مثال: PlayStation 5" />
        </div>

        {/* Description */}
        <div>
          <label className="text-white/60 text-xs font-medium block mb-1.5">الوصف</label>
          <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            rows={2}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-red-500/50 transition-colors resize-none"
            placeholder="وصف مختصر للمنتج..." />
        </div>

        {/* Category + Badge */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-white/60 text-xs font-medium block mb-1.5">الفئة</label>
            <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors"
              style={{ background: "rgba(255,255,255,0.05)" }}>
              {CATEGORIES.map((c) => <option key={c} value={c} style={{ background: "#111" }}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-white/60 text-xs font-medium block mb-1.5">الشارة</label>
            <select value={form.badge} onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors"
              style={{ background: "rgba(255,255,255,0.05)" }}>
              {BADGES.map((b) => <option key={b} value={b} style={{ background: "#111" }}>{b || "(بدون)"}</option>)}
            </select>
          </div>
        </div>

        {/* Price + Stock */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-white/60 text-xs font-medium block mb-1.5">السعر (JOD) *</label>
            <input required type="number" min="0" step="0.01" value={form.price}
              onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-red-500/50 transition-colors"
              placeholder="0" />
          </div>
          <div>
            <label className="text-white/60 text-xs font-medium block mb-1.5">المخزون *</label>
            <input required type="number" min="0" value={form.stock}
              onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-red-500/50 transition-colors"
              placeholder="0" />
          </div>
        </div>

        {/* Error */}
        {status === "error" && (
          <div className="flex items-center gap-2 p-3 rounded-xl border border-red-500/30 text-red-400 text-sm"
            style={{ background: "rgba(220,38,38,0.08)" }}>
            <AlertCircle size={14} className="shrink-0" />
            {errorMsg}
          </div>
        )}

        {/* Submit */}
        <button type="submit" disabled={status === "loading" || status === "success"}
          className="w-full py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 flex items-center justify-center gap-2 mt-1 disabled:opacity-70"
          style={{
            background: status === "success"
              ? "rgba(16,185,129,0.85)"
              : "rgba(220,38,38,0.85)",
            boxShadow: status === "success"
              ? "0 0 20px rgba(16,185,129,0.4)"
              : "0 0 20px rgba(220,38,38,0.3)",
          }}
          data-testid="button-save-product">
          {status === "loading" ? (
            <><Loader2 size={15} className="animate-spin" />جارٍ الحفظ...</>
          ) : status === "success" ? (
            <><CheckCircle size={15} />تم الحفظ بنجاح ✓</>
          ) : (
            <><Package size={15} />{isEditing ? "تحديث المنتج" : "إضافة المنتج"}</>
          )}
        </button>
      </form>
    </Modal>
  );
}
