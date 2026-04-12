import { useState, useRef } from "react";
import Modal from "@/components/Modal";
import { Package, ImagePlus, X, Upload } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (product: any) => void;
}

const categories = ["كمبيوتر", "كونسول", "إكسسوارات", "ألعاب"];

const emptyForm = { name: "", category: categories[0], price: "", stock: "", status: "متوفر" };

export default function AddProductModal({ open, onClose, onAdd }: Props) {
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [saved, setSaved] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImage = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
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
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.stock) return;
    onAdd({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      id: Date.now(),
      image: imagePreview ?? null,
      imageName: imageFile?.name ?? null,
    });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
      setForm(emptyForm);
      clearImage();
    }, 1000);
  };

  return (
    <Modal open={open} onClose={onClose} title="إضافة منتج جديد">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" dir="rtl">

        {/* Image Upload */}
        <div>
          <label className="text-white/60 text-xs font-medium block mb-1.5">
            صورة المنتج
          </label>

          {imagePreview ? (
            /* Preview */
            <div className="relative rounded-xl overflow-hidden border border-white/10 group">
              <img
                src={imagePreview}
                alt="preview"
                className="w-full h-36 object-cover"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white border border-white/20 hover:bg-white/10 transition-colors"
                >
                  <Upload size={12} />
                  تغيير
                </button>
                <button
                  type="button"
                  onClick={clearImage}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-colors"
                >
                  <X size={12} />
                  حذف
                </button>
              </div>
              {/* File name badge */}
              <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded-md text-[10px] text-white/60 max-w-[180px] truncate">
                {imageFile?.name}
              </div>
            </div>
          ) : (
            /* Drop zone */
            <div
              className={`relative flex flex-col items-center justify-center gap-2 h-32 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 ${
                dragOver
                  ? "border-red-500/60 bg-red-500/8"
                  : "border-white/15 hover:border-red-500/40 hover:bg-white/3"
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: dragOver ? "rgba(220,38,38,0.15)" : "rgba(255,255,255,0.05)",
                }}
              >
                <ImagePlus size={20} className={dragOver ? "text-red-400" : "text-white/30"} />
              </div>
              <p className="text-white/40 text-xs text-center">
                اسحب الصورة هنا أو{" "}
                <span className="text-red-400 font-semibold">اضغط للاختيار</span>
              </p>
              <p className="text-white/20 text-[10px]">PNG, JPG, WEBP — حتى 5MB</p>
            </div>
          )}

          {/* Hidden file input */}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImage(file);
            }}
            data-testid="input-product-image"
          />
        </div>

        {/* Product name */}
        <div>
          <label className="text-white/60 text-xs font-medium block mb-1.5">اسم المنتج</label>
          <input
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-red-500/50 transition-colors"
            placeholder="مثال: PlayStation 5"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        {/* Category + Status */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-white/60 text-xs font-medium block mb-1.5">الفئة</label>
            <select
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors"
              style={{ background: "rgba(255,255,255,0.05)" }}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {categories.map((c) => (
                <option key={c} value={c} style={{ background: "#111" }}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-white/60 text-xs font-medium block mb-1.5">الحالة</label>
            <select
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors"
              style={{ background: "rgba(255,255,255,0.05)" }}
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              {["متوفر", "منخفض", "نفد"].map((s) => (
                <option key={s} value={s} style={{ background: "#111" }}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Price + Stock */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-white/60 text-xs font-medium block mb-1.5">السعر (JOD)</label>
            <input
              type="number"
              min="0"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-red-500/50 transition-colors"
              placeholder="0"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="text-white/60 text-xs font-medium block mb-1.5">الكمية</label>
            <input
              type="number"
              min="0"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-red-500/50 transition-colors"
              placeholder="0"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 flex items-center justify-center gap-2 mt-1"
          style={{
            background: saved ? "rgba(16,185,129,0.85)" : "rgba(220,38,38,0.85)",
            boxShadow: saved ? "0 0 20px rgba(16,185,129,0.4)" : "0 0 20px rgba(220,38,38,0.3)",
          }}
          data-testid="button-save-product"
        >
          <Package size={15} />
          {saved ? "تم الحفظ ✓" : "إضافة المنتج"}
        </button>
      </form>
    </Modal>
  );
}
