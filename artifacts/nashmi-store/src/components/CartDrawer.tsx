import { useState } from "react";
import { ShoppingCart, X, Plus, Minus, Trash2, CheckCircle, LogIn, Loader2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import { api } from "@/lib/api";
import { Link } from "wouter";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
  const { user } = useUser();
  const [checking, setChecking] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    if (!user) return;
    setChecking(true);
    setError("");
    try {
      await api.createOrder(items.map((i) => ({ product_id: i.product.id, quantity: i.quantity })));
      setSuccess(true);
      clearCart();
      setTimeout(() => { setSuccess(false); onClose(); }, 2500);
    } catch (e: any) {
      setError(e.message || "حدث خطأ أثناء الطلب");
    } finally {
      setChecking(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:w-[420px] flex flex-col border-l border-red-900/30"
        style={{ background: "#0d0d0d", direction: "rtl" }}
      >
        <SheetHeader className="border-b border-white/10 pb-4">
          <SheetTitle className="flex items-center gap-3 text-white text-xl font-bold">
            <ShoppingCart size={22} className="text-red-500" />
            سلة التسوق
            {totalItems > 0 && (
              <span className="text-sm font-normal text-white/50">({totalItems} منتج)</span>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {/* Success state */}
          {success ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)" }}>
                <CheckCircle size={40} className="text-green-400" />
              </div>
              <p className="text-white text-xl font-bold">تم استلام طلبك!</p>
              <p className="text-white/40 text-sm">سيتم التواصل معك قريباً</p>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.2)" }}>
                <ShoppingCart size={36} className="text-red-500/60" />
              </div>
              <p className="text-white/50 text-lg">السلة فارغة</p>
              <p className="text-white/30 text-sm">أضف منتجات لتبدأ التسوق</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-4 p-3 rounded-xl border border-white/8 hover:border-red-900/30 transition-colors"
                  style={{ background: "rgba(255,255,255,0.03)" }} data-testid={`card-cart-${product.id}`}>
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm leading-tight truncate">{product.name}</p>
                    <p className="text-red-400 font-bold mt-1">{product.price.toLocaleString("en")} د.أ</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-6 h-6 rounded-md border border-white/20 flex items-center justify-center text-white hover:border-red-500/50 hover:text-red-400 transition-colors"
                        data-testid={`button-decrease-${product.id}`}>
                        <Minus size={12} />
                      </button>
                      <span className="text-white text-sm font-semibold w-5 text-center" data-testid={`text-quantity-${product.id}`}>
                        {quantity}
                      </span>
                      <button onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-6 h-6 rounded-md border border-white/20 flex items-center justify-center text-white hover:border-red-500/50 hover:text-red-400 transition-colors"
                        data-testid={`button-increase-${product.id}`}>
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(product.id)}
                    className="self-start p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-600/10 transition-colors"
                    data-testid={`button-remove-${product.id}`}>
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && !success && (
          <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-white/60">المجموع</span>
              <span className="text-white font-bold text-lg">{totalPrice.toLocaleString("en")} د.أ</span>
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center py-1">{error}</p>
            )}

            {user ? (
              <button onClick={handleCheckout} disabled={checking}
                className="w-full py-3.5 rounded-xl font-bold text-white text-base transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg, #dc2626, #b91c1c)", boxShadow: "0 0 20px rgba(220,38,38,0.4)" }}
                data-testid="button-checkout">
                {checking ? <><Loader2 size={18} className="animate-spin" /> جارٍ إرسال الطلب...</> : "إتمام الطلب"}
              </button>
            ) : (
              <Link href="/login" onClick={onClose}>
                <button className="w-full py-3.5 rounded-xl font-bold text-white text-base transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-2"
                  style={{ background: "linear-gradient(135deg, #dc2626, #b91c1c)", boxShadow: "0 0 20px rgba(220,38,38,0.4)" }}
                  data-testid="button-login-to-checkout">
                  <LogIn size={18} />
                  سجّل الدخول لإتمام الطلب
                </button>
              </Link>
            )}

            <Link href="/products" onClick={onClose}>
              <button className="w-full py-3 rounded-xl font-semibold text-white/60 text-sm border border-white/10 hover:border-white/20 hover:text-white/80 transition-all"
                data-testid="button-continue-shopping">
                مواصلة التسوق
              </button>
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
