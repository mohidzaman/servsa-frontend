import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers } from 'lucide-react';
import { useState, useMemo } from 'react';
import { usePortfolio } from '../hooks/usePortfolio';
import { ContainerScroll } from '../components/ContainerScroll';
import { fadeUp } from '../utils/motion';
import SkeletonCard from '../components/ui/SkeletonCard';
import SeoMeta from '../seo/SeoMeta'
import { BreadcrumbSchema, PortfolioSchema } from '../seo/SeoSchema'

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { data, isLoading } = usePortfolio({ isPublished: true });
  const allProjects = data?.data || [];

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(allProjects.map((p) => p.category).filter(Boolean))];
    return cats;
  }, [allProjects]);

  const projects = activeCategory === 'All'
    ? allProjects
    : allProjects.filter((p) => p.category === activeCategory);

  return (
    <>
      <SeoMeta title="Portfolio" description="View Servsa's portfolio of web development, UI/UX design, mobile app, and cloud projects." canonical="/portfolio" />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Portfolio', path: '/portfolio' }]} />
      <PortfolioSchema projects={projects || []} />
      <div className="min-h-screen bg-atmos-deep">
      {/* ============ HERO ============ */}
      <section className="relative py-32 px-6 md:px-12 text-center overflow-hidden bg-atmos-hero">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-grid-white-subtle" />
          <div className="absolute top-10 right-20 w-20 h-20 rounded-xl bg-accent/10 animate-float-3" />
          <div className="absolute bottom-20 left-16 w-14 h-14 rounded-full bg-primary/10 animate-float-4" />
        </div>
        <ContainerScroll className="relative z-10 max-w-[1280px] mx-auto">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white/80 bg-white/10 backdrop-blur-sm mb-6 border border-white/20"
            >
              <Layers size={14} />
              Our Work
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}
            >
              Portfolio
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/60 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
            >
              A curated selection of projects that showcase our craft, creativity, and technical excellence.
            </motion.p>
          </div>
        </ContainerScroll>
      </section>

      {/* Category filter */}
      {categories.length > 1 && (
        <section className="sticky top-20 z-40 py-5 px-6 md:px-12 border-b border-white/10 bg-atmos-elevated/95 backdrop-blur-lg">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Project Grid */}
      <section className="py-16 px-6 md:px-12 bg-atmos-deep">
        <div className="max-w-[1280px] mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/60">No projects found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group rounded-2xl overflow-hidden border border-white/10 hover:shadow-dark-lg transition-all duration-300 card-atmos"
                >
                  <Link to={`/portfolio/${project.id}`}>
                    <div className="relative h-60 bg-gradient-to-br from-blue-500/20 to-primary/10 flex items-center justify-center overflow-hidden">
                      {project.imageUrl ? (
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <Layers size={48} className="text-blue-400/30" />
                      )}
                      <div className="absolute inset-0 bg-atmos-deep/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="px-5 py-2.5 bg-white text-primary-dark text-sm font-semibold rounded-xl hover:bg-primary hover:text-white transition-all">
                          View Case Study
                        </span>
                      </div>
                      {project.isFeatured && (
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-dark-base backdrop-blur-sm">
                          Featured
                        </span>
                      )}
                    </div>
                  </Link>
                  <div className="p-6">
                    {project.category && (
                      <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2 block">
                        {project.category}
                      </span>
                    )}
                    <h3 className="font-bold text-white mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {project.title}
                    </h3>
                    <p className="text-sm text-white/50 line-clamp-2 mb-4">
                      {project.shortDescription}
                    </p>
                    <Link
                      to={`/portfolio/${project.id}`}
                      className="inline-flex items-center gap-1 text-sm text-blue-400 font-semibold group-hover:gap-2 transition-all"
                    >
                      View Details <ArrowRight size={14} />
                    </Link>
                  </div>
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
              Have a Project in Mind?
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              Let&apos;s create something remarkable together.
            </p>
            <Link
              to="/contact?type=quote"
              className="inline-flex items-center gap-2 bg-white text-primary-dark font-bold px-8 py-4 rounded-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 shadow-lg"
            >
              Start a Project <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
}
