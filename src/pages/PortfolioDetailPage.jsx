import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Layers } from 'lucide-react';
import { usePortfolioProject } from '../hooks/usePortfolio';
import Skeleton from '../components/ui/Skeleton';
import SkeletonText from '../components/ui/SkeletonText';
import SeoMeta from '../seo/SeoMeta'
import { BreadcrumbSchema } from '../seo/SeoSchema'

export default function PortfolioDetailPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = usePortfolioProject(id);
  const project = data?.data;

  if (isLoading) return (
    <div className="min-h-screen bg-atmos-deep px-6 md:px-12 py-16">
      <div className="max-w-[1280px] mx-auto">
        <Skeleton className="h-4 w-48 mb-12" />
        <Skeleton className="h-5 w-32 rounded-full mb-6" />
        <Skeleton className="h-14 w-[600px] max-w-full mb-4" />
        <Skeleton className="h-5 w-72 mb-12" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <SkeletonText lines={8} />
            <SkeletonText lines={5} />
            <SkeletonText lines={6} />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </div>
    </div>
  );

  if (isError || !project) return (
    <div className="min-h-screen bg-atmos-deep flex flex-col items-center justify-center gap-4">
      <p className="text-white/60">Project not found.</p>
      <Link to="/portfolio" className="text-blue-400 font-medium flex items-center gap-1">
        <ArrowLeft size={16} /> Back to Portfolio
      </Link>
    </div>
  );

  const techs = Array.isArray(project.technologies) ? project.technologies : [];
  const images = Array.isArray(project.images) ? project.images : [];

  return (
    <>
      <SeoMeta title={project?.title ? `${project.title} — Servsa` : 'Project Details'} description={project?.shortDescription || project?.description || 'Project details'} canonical={`/portfolio/${project?.slug || project?.id || ':id'}`} />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Portfolio', path: '/portfolio' }, { name: project?.title || 'Project Details', path: `/portfolio/${project?.slug || project?.id || ':id'}` }]} />
      <div className="min-h-screen bg-atmos-deep">
      {/* Breadcrumb */}
      <nav className="px-6 md:px-12 py-6 max-w-[1280px] mx-auto bg-atmos-deep" aria-label="Breadcrumb">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-white/50"
        >
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span className="text-white/30">/</span>
          <Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
          <span className="text-white/30">/</span>
          <span className="text-white font-medium">{project.title}</span>
        </motion.div>
      </nav>

      {/* ============ HERO ============ */}
      <section className="px-6 md:px-12 py-16 bg-atmos-hero">
        <div className="max-w-[1280px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {project.category && (
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-white/80 bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                {project.category}
              </span>
            )}
            <h1 className="text-5xl md:text-6xl font-bold text-white mt-2 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}>
              {project.title}
            </h1>
            {project.clientName && (
              <p className="text-white/60 mb-4">Client: <strong className="text-white">{project.clientName}</strong></p>
            )}
            {project.projectUrl && (
              <a href={project.projectUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-blue-400 text-sm font-medium hover:underline">
                <ExternalLink size={14} /> View Live Project
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {/* ============ CONTENT ============ */}
      <section className="px-6 md:px-12 py-16 bg-atmos-deep">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            {project.description && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl font-bold text-white mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Overview
                </h2>
                <p className="text-white/60 leading-relaxed text-lg">{project.description}</p>
              </motion.div>
            )}

            {project.challenges && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl font-bold text-white mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  The Challenge
                </h2>
                <p className="text-white/60 leading-relaxed">{project.challenges}</p>
              </motion.div>
            )}

            {project.solutions && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl font-bold text-white mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Our Solution
                </h2>
                <p className="text-white/60 leading-relaxed">{project.solutions}</p>
              </motion.div>
            )}

            {project.results && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-blue-500/10 border border-blue-500/20"
              >
                <h2 className="text-3xl font-bold text-white mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Results
                </h2>
                <p className="text-white/60 leading-relaxed">{project.results}</p>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {techs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="card-atmos p-6"
              >
                <h3 className="font-bold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {techs.map((tech, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-500/20 text-blue-400">
                      {typeof tech === 'string' ? tech : tech.name || JSON.stringify(tech)}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {images.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="card-atmos p-6"
              >
                <h3 className="font-bold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Gallery
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {images.map((img, i) => (
                    <div key={i} className="rounded-xl overflow-hidden bg-white/5 h-24">
                      {img.imageUrl ? (
                        <img src={img.imageUrl} alt={`${project.title} ${i + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" decoding="async" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Layers size={20} className="text-blue-400/30" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary via-primary-dark to-dark-base border border-white/10">
              <h3 className="font-bold text-lg text-white mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Like what you see?
              </h3>
              <p className="text-white/70 text-sm mb-4">Let's build something amazing together.</p>
              <Link to="/contact?type=quote"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-primary-dark font-bold text-sm hover:bg-white/90 transition-all">
                Start a Project <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-20 px-6 md:px-12 bg-atmos-cta">
        <div className="max-w-[1280px] mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Ready to Create Your Success Story?
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              Let's discuss how we can achieve remarkable results for your business.
            </p>
            <Link
              to="/contact?type=quote"
              className="inline-flex items-center gap-2 bg-white text-primary-dark font-bold px-8 py-4 rounded-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 shadow-lg"
            >
              Get in Touch <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
}
