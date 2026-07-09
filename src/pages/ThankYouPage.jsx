import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Home, Mail } from 'lucide-react';
import SeoMeta from '../seo/SeoMeta'

export default function ThankYouPage() {
  return (
    <>
      <SeoMeta title="Thank You" description="Thank you for contacting Servsa. We'll get back to you shortly." canonical="/thank-you" noindex={true} />
      <div className="min-h-screen flex items-center justify-center px-6 py-24 bg-atmos-deep">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-lg"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
          className="w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center bg-blue-500/20 shadow-lg"
        >
          <motion.div
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <CheckCircle2 size={48} className="text-blue-400" />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Thank You!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-white/60 text-lg mb-2"
        >
          Your request has been received.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-white/60 mb-4"
        >
          Our team will review your project details and reach out within <strong className="text-white">24 hours</strong>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card-atmos p-6 mb-8 text-left"
        >
          <h3 className="font-semibold text-white mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            What happens next?
          </h3>
          <div className="space-y-3">
            {[
              'We review your project requirements',
              'A team member reaches out within 24 hours',
              'We schedule a free discovery call',
              'You receive a detailed proposal',
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-white/60">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-blue-400">{i + 1}</span>
                </div>
                {step}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-white/10 text-white font-medium hover:bg-white/5 transition-all">
            <Home size={16} /> Back to Home
          </Link>
          <Link to="/portfolio"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-all shadow-md">
            View Our Work <ArrowRight size={16} />
          </Link>
        </motion.div>
      </motion.div>
    </div>
    </>
  );
}
