import { useState } from 'react';
import { Routes, Route, NavLink, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, MessageSquare, FileText, Briefcase, Settings,
  Image, LogOut, Menu, X, ChevronRight, Bell
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import OverviewTab from './OverviewTab';
import InquiriesPage from './InquiriesPage';
import QuotesPage from './QuotesPage';
import ServicesPage from './ServicesPage';
import PortfolioPage from './PortfolioPage';
import SettingsPage from './SettingsPage';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', to: '/admin' },
  { icon: MessageSquare, label: 'Inquiries', to: '/admin/inquiries' },
  { icon: FileText, label: 'Quote Requests', to: '/admin/quotes' },
  { icon: Briefcase, label: 'Services', to: '/admin/services' },
  { icon: Image, label: 'Portfolio', to: '/admin/portfolio' },
  { icon: Settings, label: 'Settings', to: '/admin/settings' },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-dark-card border-r border-white/10">
      <div className="px-6 py-5 border-b border-white/10">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-primary"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white text-xs font-bold">S</span>
          </div>
          Servsa Admin
        </Link>
      </div>

      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        {navItems.map(({ icon: Icon, label, to }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/admin'}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/5 mb-2">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold shrink-0">
            {admin?.firstName?.[0]}{admin?.lastName?.[0]}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{admin?.firstName} {admin?.lastName}</p>
            <p className="text-xs text-white/50 capitalize">{admin?.role?.replace('_', ' ')}</p>
          </div>
        </div>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:bg-red-500/20 hover:text-red-400 transition-all">
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#0a0a0f] overflow-hidden">
      <aside className="hidden lg:flex lg:w-64 flex-col">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <div className="fixed inset-0 z-50 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 w-64 z-50 lg:hidden flex flex-col"
            >
              <div className="absolute top-4 right-4 z-10">
                <button onClick={() => setSidebarOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10 text-white/60">
                  <X size={18} />
                </button>
              </div>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-dark-card border-b border-white/10 px-6 flex items-center justify-between shrink-0">
          <button className="lg:hidden p-2 rounded-lg hover:bg-white/10 text-white/60"
            onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-3 ml-auto">
            <button className="p-2 rounded-lg hover:bg-white/10 text-white/60 relative">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </button>
            <Link to="/" target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm text-primary border border-primary/30 hover:bg-primary/10 transition-colors font-medium">
              View Site <ChevronRight size={14} />
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-dark-base">
          <Routes>
            <Route index element={<OverviewTab />} />
            <Route path="inquiries" element={<InquiriesPage />} />
            <Route path="quotes" element={<QuotesPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="portfolio" element={<PortfolioPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
