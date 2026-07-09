import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import SeoMeta from '../seo/SeoMeta'

export default function NotFoundPage() {
  return (
    <>
      <SeoMeta title="404 — Page Not Found" description="The page you're looking for doesn't exist." canonical="/404" noindex={true} />
      <div className="min-h-screen flex items-center justify-center px-6 py-24 bg-atmos-deep">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        <div
          className="text-8xl md:text-9xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          404
        </div>
        <h1 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Page Not Found
        </h1>
        <p className="text-white/60 mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-white/10 text-white font-medium hover:bg-white/5 transition-all">
            <ArrowLeft size={16} /> Go Back
          </button>
          <Link to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-all shadow-md">
            <Home size={16} /> Home
          </Link>
        </div>
      </motion.div>
    </div>
    </>
  );
}
