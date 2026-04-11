import { Link } from "wouter";
import { Gamepad2, Mail, Phone, MapPin } from "lucide-react";
import { SiX, SiInstagram, SiDiscord, SiYoutube } from "react-icons/si";

export default function Footer() {
  return (
    <footer
      className="border-t border-white/8 mt-20"
      style={{ background: "rgba(5,5,5,0.98)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #dc2626, #7f1d1d)" }}
              >
                <Gamepad2 size={22} className="text-white" />
              </div>
              <span
                className="text-2xl font-black text-white"
                style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 900 }}
              >
                نشمي سوق
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
              وجهتك الأولى للألعاب والإكسسوارات في المملكة العربية السعودية. جودة لا تُضاهى، أسعار تُرضيك.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              {[
                { Icon: SiX, href: "#", label: "إكس" },
                { Icon: SiInstagram, href: "#", label: "إنستغرام" },
                { Icon: SiDiscord, href: "#", label: "ديسكورد" },
                { Icon: SiYoutube, href: "#", label: "يوتيوب" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/50 hover:text-red-400 hover:border-red-500/40 hover:bg-red-600/10 transition-all duration-200"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">
              روابط سريعة
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                { href: "/", label: "الرئيسية" },
                { href: "/products", label: "المنتجات" },
                { href: "/categories", label: "الفئات" },
                { href: "/contact", label: "تواصل معنا" },
                { href: "/login", label: "تسجيل الدخول" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-red-400 text-sm transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-red-500/60" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">
              تواصل معنا
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3 text-white/50 text-sm">
                <Mail size={16} className="text-red-400 flex-shrink-0" />
                info@nashmi.sa
              </li>
              <li className="flex items-center gap-3 text-white/50 text-sm">
                <Phone size={16} className="text-red-400 flex-shrink-0" />
                +966 50 000 0000
              </li>
              <li className="flex items-start gap-3 text-white/50 text-sm">
                <MapPin size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                الرياض، المملكة العربية السعودية
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-sm">
            © 2025 نشمي سوق — جميع الحقوق محفوظة
          </p>
          <div className="flex items-center gap-4 text-white/30 text-xs">
            <a href="#" className="hover:text-white/60 transition-colors">سياسة الخصوصية</a>
            <span className="w-px h-3 bg-white/20" />
            <a href="#" className="hover:text-white/60 transition-colors">الشروط والأحكام</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
