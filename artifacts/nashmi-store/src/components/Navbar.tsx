import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingCart, Menu, X, Gamepad2, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/products", label: "المنتجات" },
  { href: "/categories", label: "الفئات" },
  { href: "/contact", label: "تواصل معنا" },
];

export default function Navbar() {
  const [location] = useLocation();
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/5"
        style={{ background: "rgba(10,10,10,0.95)", backdropFilter: "blur(20px)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <button
              className="lg:hidden text-white/80 hover:text-white transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  data-testid={`link-nav-${link.label}`}
                  className={`text-sm font-semibold transition-all duration-200 hover:text-red-500 relative group ${
                    location === link.href ? "text-red-500" : "text-white/80"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-red-500 transition-transform duration-200 origin-right ${
                      location === link.href
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100 group-hover:origin-left"
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group" data-testid="link-logo">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:glow-red"
                style={{ background: "linear-gradient(135deg, #dc2626, #7f1d1d)" }}
              >
                <Gamepad2 size={20} className="text-white" />
              </div>
              <span
                className="text-xl font-black tracking-wider text-white group-hover:text-red-400 transition-colors"
                style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 900 }}
              >
                نشمي سوق
              </span>
            </Link>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <Link href="/login" data-testid="link-login">
                <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border border-red-600/40 text-red-400 hover:bg-red-600/10 hover:border-red-500 transition-all duration-200 text-sm font-semibold">
                  <User size={16} />
                  <span>دخول</span>
                </button>
              </Link>
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2.5 rounded-lg border border-white/10 text-white/80 hover:text-white hover:border-red-500/50 hover:bg-red-600/10 transition-all duration-200"
                data-testid="button-cart"
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span
                    className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-white"
                    style={{ background: "#dc2626", boxShadow: "0 0 10px rgba(220,38,38,0.6)" }}
                    data-testid="text-cart-count"
                  >
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="lg:hidden border-t border-white/5"
            style={{ background: "rgba(10,10,10,0.98)" }}
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    location === link.href
                      ? "bg-red-600/20 text-red-400 border border-red-600/30"
                      : "text-white/80 hover:bg-white/5 hover:text-white"
                  }`}
                  data-testid={`link-mobile-nav-${link.label}`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-4 py-3 rounded-lg border border-red-600/40 text-red-400 text-sm font-semibold text-center hover:bg-red-600/10 transition-all"
                data-testid="link-mobile-login"
              >
                تسجيل الدخول
              </Link>
            </div>
          </div>
        )}
      </nav>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
