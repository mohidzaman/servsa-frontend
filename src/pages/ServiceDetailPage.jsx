import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Plus, Minus, Zap } from 'lucide-react';
import { useService } from '../hooks/useServices';
import { fadeUp, prefersReducedMotion } from '../utils/motion';
import Skeleton from '../components/ui/Skeleton';
import SkeletonText from '../components/ui/SkeletonText';
import SeoMeta from '../seo/SeoMeta'
import { BreadcrumbSchema } from '../seo/SeoSchema'

const faqData = [
  { q: 'How long does this service take?', a: 'Timelines vary based on scope and complexity. We provide a detailed timeline during our discovery phase, typically ranging from 4-12 weeks for most engagements.' },
  { q: 'What is included in the pricing?', a: 'Our pricing includes discovery, design, development, testing, deployment, and post-launch support. Each engagement is fully scoped with clear deliverables.' },
  { q: 'Do you offer ongoing support?', a: 'Yes, we offer maintenance and support packages to ensure your solution continues to perform at its best after launch.' },
];

export default function ServiceDetailPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useService(id);
  const service = data?.data;
  const [openFaq, setOpenFaq] = useState(null);

  if (isLoading) return (
    <div className="min-h-screen bg-atmos-deep px-6 md:px-12 py-16">
      <div className="max-w-[1280px] mx-auto">
        <Skeleton className="h-4 w-48 mb-12" />
        <Skeleton className="h-5 w-32 rounded-full mb-6" />
        <Skeleton className="h-14 w-[600px] max-w-full mb-4" />
        <Skeleton className="h-5 w-[500px] max-w-full mb-12" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <SkeletonText lines={10} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full rounded-xl" />
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </div>
    </div>
  );

  if (isError || !service) {
    return (
      <div className="min-h-screen bg-atmos-deep flex flex-col items-center justify-center gap-4">
        <p className="text-white/60">Service not found.</p>
        <Link to="/services" className="text-blue-400 font-medium flex items-center gap-1">
          <ArrowLeft size={16} /> Back to Services
        </Link>
      </div>
    );
  }

  const features = Array.isArray(service.features) ? service.features : [];

  return (
    <>
      <SeoMeta title={service?.title ? `${service.title} — Servsa` : 'Service Details'} description={service?.shortDescription || 'Service details'} canonical={`/services/${service?.slug || service?.id || ':id'}`} />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }, { name: service?.title || 'Service Details', path: `/services/${service?.slug || service?.id || ':id'}` }]} />
      <div className="min-h-screen bg-atmos-deep">
      {/* ============ BREADCRUMB ============ */}
      <nav className="px-6 md:px-12 py-6 max-w-[1280px] mx-auto bg-atmos-deep" aria-label="Breadcrumb">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-white/50"
        >
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span className="text-white/30">/</span>
          <Link to="/services" className="hover:text-white transition-colors">Services</Link>
          <span className="text-white/30">/</span>
          <span className="text-white font-medium">{service.title}</span>
        </motion.div>
      </nav>

      {/* ============ HERO ============ */}
      <section className="relative px-6 md:px-12 py-16 overflow-hidden bg-atmos-hero">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-grid-white-subtle" />
        </div>
        <div className="max-w-[1280px] mx-auto relative z-10">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-white/80 bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
            >
              <Zap size={12} />
              {service.category?.name || 'Service'}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}
            >
              {service.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-white/60 leading-relaxed"
            >
              {service.shortDescription}
            </motion.p>
          </div>
        </div>
      </section>

      {/* ============ OVERVIEW + FEATURES ============ */}
      <section className="px-6 md:px-12 py-20 bg-atmos-deep">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            {service.fullDescription && (
              <motion.div {...fadeUp}>
                <h2 className="text-3xl font-bold text-white mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Overview
                </h2>
                <div
                  className="prose prose-invert max-w-none text-white/60 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: service.fullDescription }}
                />
              </motion.div>
            )}

            {features.length > 0 && (
              <motion.div {...fadeUp}>
                <h2 className="text-3xl font-bold text-white mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Key Benefits
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((f, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10"
                    >
                      <CheckCircle2 size={18} className="text-blue-400 mt-0.5 shrink-0" />
                      <span className="text-sm text-white/60">
                        {typeof f === 'string' ? f : f.name || f.label || ''}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="card-atmos p-6"
              >
                <h3 className="font-bold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  What&apos;s Included
                </h3>
                <ul className="space-y-3">
                  {features.slice(0, 8).map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                      <CheckCircle2 size={16} className="text-blue-400 mt-0.5 shrink-0" />
                      <span>{typeof f === 'string' ? f : f.name || f.label || ''}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary via-primary-dark to-dark-base border border-white/10">
              <h3 className="font-bold text-lg text-white mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Interested in this service?
              </h3>
              <p className="text-white/70 text-sm mb-4">Let&apos;s discuss how we can help.</p>
              <Link
                to="/contact?type=quote"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-primary-dark font-bold text-sm hover:bg-white/90 transition-all"
              >
                Get a Quote <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="py-20 px-6 md:px-12 bg-atmos-surface">
        <div className="max-w-[1280px] mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Frequently Asked Questions
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Common questions about our services and process.
            </p>
          </motion.div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqData.map(({ q, a }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-white/10 overflow-hidden card-atmos hover:border-white/20 transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/[0.03] transition-colors"
                >
                  <span className="font-semibold text-white pr-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{q}</span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                    openFaq === i ? 'bg-primary text-white' : 'bg-white/10 text-white/50'
                  }`}>
                    {openFaq === i ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-white/50 text-sm leading-relaxed">{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-20 px-6 md:px-12 bg-atmos-cta">
        <div className="max-w-[1280px] mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Ready to Get Started?
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              Let&apos;s discuss your project and create a tailored solution.
            </p>
            <Link
              to="/contact?type=quote"
              className="inline-flex items-center gap-2 bg-white text-primary-dark font-bold px-8 py-4 rounded-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 shadow-lg"
            >
              Get Started <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
}
