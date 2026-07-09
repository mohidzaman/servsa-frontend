import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logoImage from '../../assets/logo.png';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 50);

      if (currentY > 100) {
        if (currentY > lastScrollY.current + 10) {
          setVisible(false);
        } else if (currentY < lastScrollY.current - 10) {
          setVisible(true);
        }
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-primary origin-left"
        style={{ scaleX }}
      />

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: visible ? 0 : -120, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100vw-40px)] max-w-[980px]"
      >
        <div
          className={`
            flex items-center justify-between h-16 px-4
            rounded-full
            transition-all duration-500 ease-out
            ${isScrolled
              ? 'bg-[rgba(8,12,24,0.82)] border border-[rgba(255,255,255,0.06)] shadow-[0_8px_40px_rgba(0,0,0,0.35)]'
              : 'bg-[rgba(8,12,24,0.5)] border border-[rgba(255,255,255,0.04)]'
            }
            backdrop-blur-[18px]
          `}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-[12px] shrink-0 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="w-11 h-11 md:w-12 md:h-12 lg:w-[52px] lg:h-[52px] rounded-full overflow-hidden flex items-center justify-center bg-[rgba(8,12,24,0.5)] border border-[rgba(255,255,255,0.06)] backdrop-blur-[18px] transition-all duration-250 ease-out hover:border-primary/50 hover:shadow-[0_0_20px_rgba(79,125,255,0.25)]"
            >
              <img src={logoImage} alt="Servsa Logo" className="w-full h-full object-contain p-1.5" />
            </motion.div>
            <span
              className="font-[700] tracking-[-0.02em] text-[#F8FAFC] group-hover:text-[#FFFFFF] transition-colors duration-200 ease-out text-base"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Servsa
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            <LayoutGroup>
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="relative py-1"
                >
                  {({ isActive }) => (
                    <span
                      className={`text-sm font-medium transition-colors duration-[180ms] ${
                        isActive ? 'text-white' : 'text-[#B7C2D4] hover:text-white'
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="navIndicator"
                          className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-primary to-primary-light"
                          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        />
                      )}
                    </span>
                  )}
                </NavLink>
              ))}
            </LayoutGroup>
          </nav>

          {/* Right */}
          <div className="hidden lg:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 0 16px rgba(79,125,255,0.12)' }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate('/contact?type=quote')}
              className="px-6 py-[10px] bg-white text-black text-sm font-semibold rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              Get a Quote
            </motion.button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 rounded-full text-white/70 hover:text-white hover:bg-white/5 transition-all"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: -30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-24 left-4 right-4 z-50 mx-auto max-w-[400px] rounded-3xl bg-[rgba(10,18,38,0.96)] backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                <span
                  className="font-bold text-white text-sm tracking-wide"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Navigation
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/5 transition-colors text-white/70"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>
              <nav className="px-3 py-4 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <NavLink
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${
                          isActive
                            ? 'bg-white/10 text-white'
                            : 'text-[#B7C2D4] hover:text-white hover:bg-white/5'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
              <div className="px-6 py-5 border-t border-white/5">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { navigate('/contact?type=quote'); setMobileOpen(false); }}
                  className="w-full py-3.5 bg-white text-black font-semibold text-sm rounded-full hover:bg-white/90 transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  Get a Quote
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
