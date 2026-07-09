import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';

export default function FormModal({ open, onClose, title, subtitle, children, maxWidth = 'lg', footer, loading }) {
  const widths = { sm: 'max-w-md', md: 'max-w-xl', lg: 'max-w-2xl', xl: 'max-w-4xl' };
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={loading ? undefined : onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-12 overflow-y-auto"
          >
            <div className={`w-full ${widths[maxWidth] || widths.lg} rounded-2xl bg-dark-card border border-white/10 shadow-2xl`}>
              <div className="flex items-start justify-between px-6 py-5 border-b border-white/10">
                <div>
                  <h2 className="text-lg font-bold text-white">{title}</h2>
                  {subtitle && <p className="text-sm text-white/50 mt-0.5">{subtitle}</p>}
                </div>
                <button onClick={onClose} disabled={loading} className="p-1.5 rounded-lg hover:bg-white/5 text-white/50 transition-all disabled:opacity-30">
                  <X size={18} />
                </button>
              </div>
              <div className="p-6 pb-4 max-h-[55vh] overflow-y-auto">
                {children}
              </div>
              {footer && (
                <div className="sticky bottom-0 px-6 py-4 border-t border-white/10 bg-dark-card rounded-b-2xl flex items-center justify-end gap-3">
                  {loading && <Loader2 size={16} className="animate-spin text-white/50" />}
                  {footer}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
