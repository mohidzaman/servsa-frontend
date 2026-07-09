import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';
import { useServices, useServiceCategories } from '../hooks/useServices';
import { useState } from 'react';
import { ContainerScroll } from '../components/ContainerScroll';
import { fadeUp } from '../utils/motion';
import SkeletonCard from '../components/ui/SkeletonCard';
import SeoMeta from '../seo/SeoMeta'
import { BreadcrumbSchema, ServiceSchema } from '../seo/SeoSchema'

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { data: categoriesData } = useServiceCategories();
  const { data: servicesData, isLoading } = useServices(
    activeCategory !== 'all' ? { categoryId: activeCategory, isPublished: true } : { isPublished: true }
  );

  const categories = categoriesData?.data || [];
  const services = servicesData?.data || [];

  return (
    <>
      <SeoMeta title="Services" description="Explore Servsa's full range of digital services including web development, UI/UX design, mobile apps, cloud infrastructure, and DevOps." canonical="/services" />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }]} />
      <ServiceSchema services={services || []} />
      <div className="min-h-screen bg-atmos-deep">
      {/* ============ HERO ============ */}
      <section className="relative py-32 px-6 md:px-12 text-center overflow-hidden bg-atmos-hero">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-grid-white-subtle" />
          <div className="absolute top-10 left-20 w-20 h-20 rounded-xl bg-accent/10 animate-float-3" />
          <div className="absolute bottom-16 right-20 w-14 h-14 rounded-full bg-primary/10 animate-float-4" />
        </div>
        <ContainerScroll className="relative z-10 max-w-[1280px] mx-auto">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white/80 bg-white/10 backdrop-blur-sm mb-6 border border-white/20"
            >
              <Zap size={14} />
              What We Offer
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}
            >
              Our Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/60 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-10"
            >
              Comprehensive digital solutions tailored to elevate your organization with precision and innovation.
            </motion.p>
            {categories.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap justify-center gap-3"
              >
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === 'all'
                      ? 'bg-primary text-white shadow-lg shadow-primary/25'
                      : 'bg-white/10 text-white/60 border border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  All Services
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeCategory === cat.id
                        ? 'bg-primary text-white shadow-lg shadow-primary/25'
                        : 'bg-white/10 text-white/60 border border-white/10 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </ContainerScroll>
      </section>

      {/* ============ SERVICES GRID ============ */}
      <section className="py-20 px-6 md:px-12 bg-atmos-deep">
        <div className="max-w-[1280px] mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/60 text-lg mb-1">No services in this category yet</p>
              <p className="text-sm text-white/40">Try selecting a different category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, i) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group card-atmos p-8 flex flex-col"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors duration-300">
                    <Zap size={22} className="text-blue-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {service.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-5 flex-1">
                    {service.shortDescription}
                  </p>
                  <Link
                    to={`/services/${service.id}`}
                    className="inline-flex items-center gap-1.5 text-sm text-blue-400 font-semibold group-hover:gap-3 transition-all self-start"
                  >
                    Learn More <ArrowRight size={14} />
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-20 px-6 md:px-12 bg-atmos-cta">
        <div className="max-w-[1280px] mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Ready to Transform Your Business?
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              Let&apos;s discuss how our services can help you achieve your goals.
            </p>
            <Link
              to="/contact?type=quote"
              className="inline-flex items-center gap-2 bg-white text-primary-dark font-bold px-8 py-4 rounded-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 shadow-lg"
            >
              Request a Quote <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
}
