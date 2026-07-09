import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmDialog({ open, onClose, onConfirm, title, message, confirmLabel = 'Delete', loading }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md rounded-2xl bg-dark-card border border-white/10 p-6 shadow-2xl">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <AlertTriangle size={20} className="text-red-400" />
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/5 text-white/50">
                  <X size={18} />
                </button>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{title || 'Confirm'}</h3>
              <p className="text-sm text-white/60 mb-6">{message || 'Are you sure?'}</p>
              <div className="flex justify-end gap-3">
                <button onClick={onClose} className="px-4 py-2 rounded-xl text-sm text-white/70 hover:bg-white/5 transition-all">
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  disabled={loading}
                  className="px-5 py-2 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 disabled:opacity-50 transition-all"
                >
                  {loading ? 'Deleting...' : confirmLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
