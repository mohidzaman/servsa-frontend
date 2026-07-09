import { Link } from 'react-router-dom';
import { Mail, ArrowUpRight, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import logoImage from '../../assets/logo.png';
const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const footerLinks = {
  Services: [
    { label: 'Web Development', to: '/services' },
    { label: 'UI/UX Design', to: '/services' },
    { label: 'Digital Strategy', to: '/services' },
    { label: 'Brand Identity', to: '/services' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Portfolio', to: '/portfolio' },
    { label: 'FAQ', to: '/faq' },
    { label: 'Contact', to: '/contact' },
  ],
  Support: [
    { label: 'Privacy Policy', to: '#' },
    { label: 'Terms of Service', to: '#' },
    { label: 'Cookie Policy', to: '#' },
  ],
};

const socials = [
  { icon: InstagramIcon, label: 'Instagram', href: 'https://instagram.com/servsa1' },
  { icon: FacebookIcon, label: 'Facebook', href: 'https://facebook.com/servsa' },
  { icon: LinkedinIcon, label: 'LinkedIn', href: 'https://linkedin.com/company/servsa' },
  { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/923450513634' },
];

const staggerSocial = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const socialItem = {
  hidden: { opacity: 0, y: 10, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-inverse-surface text-inverse-on-surface relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid-white opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pt-20 pb-16">
          {/* Brand - wider */}
          <div className="lg:col-span-2 space-y-6">
            <Link
              to="/"
              className="flex items-center gap-2.5 font-bold text-xl text-inverse-on-surface group"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <motion.div
                whileHover={{ rotate: -5, scale: 1.05 }}
                className="flex items-center justify-center"
              >
                <img src={logoImage} alt="Servsa Logo" className="w-9 h-9 object-contain" />
              </motion.div>
              <span className="group-hover:text-primary transition-colors">Servsa</span>
            </Link>
            <p className="text-sm text-inverse-on-surface/60 leading-relaxed max-w-sm">
              We build exceptional digital experiences that drive growth and create lasting impressions for ambitious organizations worldwide.
            </p>
            <div className="space-y-3">
              {[
                { icon: Mail, label: 'info@servsa.online', href: 'mailto:info@servsa.online' },
                { icon: Mail, label: 'sales@servsa.online', href: 'mailto:sales@servsa.online' },
                { icon: MessageCircle, label: '+92-345-0513634', href: 'https://wa.me/923450513634' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      className="flex items-center gap-3 text-sm text-inverse-on-surface/70 hover:text-inverse-on-surface transition-colors group"
                    >
                      <span className="w-8 h-8 rounded-lg bg-inverse-on-surface/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                        <item.icon size={14} />
                      </span>
                      {item.label}
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 text-sm text-inverse-on-surface/70">
                      <span className="w-8 h-8 rounded-lg bg-inverse-on-surface/10 flex items-center justify-center">
                        <item.icon size={14} />
                      </span>
                      {item.label}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            {/* Social icons */}
            <motion.div
              variants={staggerSocial}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex gap-3 pt-2"
            >
              {socials.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  variants={socialItem}
                  href={href}
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-inverse-on-surface/10 hover:bg-gradient-to-br hover:from-primary hover:to-primary-dark transition-all duration-300 flex items-center justify-center text-inverse-on-surface/70 hover:text-white"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-inverse-on-surface/40 mb-5">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm text-inverse-on-surface/60 hover:text-inverse-on-surface transition-colors flex items-center gap-1 group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">{label}</span>
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter + Bottom */}
        <div className="py-10 border-t border-inverse-on-surface/10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            {/* Newsletter */}
            <div className="w-full max-w-md">
              <div className="glass-dark rounded-2xl p-6 border border-white/[0.06]">
                <h3 className="text-sm font-semibold text-inverse-on-surface mb-1">Stay updated</h3>
                <p className="text-xs text-inverse-on-surface/50 mb-4">Get the latest insights and updates from Servsa.</p>
                {subscribed ? (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-primary-light"
                  >
                    Thanks for subscribing!
                  </motion.p>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="flex-1 px-4 py-2.5 rounded-xl bg-inverse-on-surface/10 border border-inverse-on-surface/20 text-inverse-on-surface text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-inverse-on-surface/30"
                    />
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-5 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all shrink-0"
                    >
                      Subscribe
                    </motion.button>
                  </form>
                )}
              </div>
            </div>

            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs text-inverse-on-surface/40">
              <p>&copy; {new Date().getFullYear()} Servsa. All rights reserved.</p>
              <Link
                to="/contact?type=quote"
                className="text-inverse-primary hover:text-primary-light transition-colors font-semibold flex items-center gap-1 group"
              >
                Start a Project{' '}
                <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
