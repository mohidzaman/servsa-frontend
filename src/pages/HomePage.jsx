import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ArrowDown, Zap, Shield, Globe, Star,
  Code, Palette, TrendingUp, Brain, Layers, Layout, Smartphone,
  Server, Cloud, Users, Target, Award, Plus, Minus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useServices } from '../hooks/useServices';
import { usePortfolio } from '../hooks/usePortfolio';
import { ContainerScroll, ScrollReveal, ParallaxSection } from '../components/ContainerScroll';
import { fadeUp, prefersReducedMotion } from '../utils/motion';
import SeoMeta from '../seo/SeoMeta'

const trustedLogos = [
  'React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker',
  'PostgreSQL', 'Figma', 'Next.js', 'Tailwind', 'GraphQL', 'Supabase'
];

const whyChooseUs = [
  { icon: Zap, title: 'Lightning Fast', desc: 'Optimized for performance at every layer of the stack with 99.9% uptime and global CDN.' },
  { icon: Shield, title: 'Enterprise Secure', desc: 'SOC 2-ready infrastructure with end-to-end encryption and 24/7 threat monitoring.' },
  { icon: Globe, title: 'Globally Scalable', desc: 'Built to scale from day one to millions of users across multi-region deployments.' },
  { icon: Star, title: 'Award Winning', desc: 'Recognized by industry leaders for design excellence and innovation.' },
];

const industries = [
  { icon: Layout, title: 'SaaS', desc: 'Scalable cloud platforms' },
  { icon: Smartphone, title: 'FinTech', desc: 'Secure financial solutions' },
  { icon: TrendingUp, title: 'E-Commerce', desc: 'High-conversion stores' },
  { icon: Server, title: 'Healthcare', desc: 'HIPAA-compliant systems' },
  { icon: Brain, title: 'AI & ML', desc: 'Intelligent automation' },
  { icon: Cloud, title: 'Enterprise', desc: 'Digital transformation' },
];

const processSteps = [
  { step: '01', title: 'Discovery', desc: 'We learn about your business, goals, and challenges to define the perfect strategy.' },
  { step: '02', title: 'Design', desc: 'Our team creates intuitive interfaces and engaging experiences that delight users.' },
  { step: '03', title: 'Develop', desc: 'We build robust, scalable solutions using cutting-edge technologies and best practices.' },
  { step: '04', title: 'Launch', desc: 'We deploy, test, and optimize to ensure a seamless go-live and ongoing success.' },
];

const faqData = [
  { q: 'What services does Servsa offer?', a: 'Servsa offers comprehensive digital solutions including web development, UI/UX design, digital strategy, brand identity, SEO, and custom software development tailored for enterprise organizations.' },
  { q: 'How long does a typical project take?', a: 'Project timelines vary based on scope and complexity. A simple website may take 4-6 weeks, while complex enterprise applications can take 3-6 months.' },
  { q: 'What is your pricing model?', a: 'We offer flexible pricing models including fixed-price projects for well-defined scopes, and time-and-materials for agile engagements.' },
  { q: 'How do I get started?', a: 'Simply fill out our quote request form or send us an email. We\'ll schedule a free discovery call to understand your needs.' },
];

const stats = [
  { value: '150+', label: 'Projects Delivered' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '12+', label: 'Countries' },
  { value: '5+', label: 'Years Experience' },
];

export default function HomePage() {
  const { data: servicesData } = useServices({ isPublished: true, isFeatured: true, limit: 6 });
  const { data: portfolioData } = usePortfolio({ isPublished: true, isFeatured: true, limit: 3 });
  const [openFaq, setOpenFaq] = useState(null);

  const services = servicesData?.data || [];
  const projects = portfolioData?.data || [];

  return (
    <>
      <SeoMeta title="Home" description="Servsa is a digital agency specializing in web development, UI/UX design, mobile apps, and cloud solutions." canonical="/" ogType="website" />
      <div className="overflow-x-hidden bg-atmos-deep">
      {/* ============ HERO ============ */}
      <ParallaxSection speed={0.15} className="min-h-screen">
      <section className="relative min-h-screen flex items-center px-6 md:px-12 overflow-hidden bg-atmos-hero">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[800px] h-[800px] rounded-full opacity-[0.08] bg-primary blur-[200px]" />
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.06] bg-primary blur-[200px]" />
          <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full opacity-[0.04] bg-primary blur-[150px]" />
          <div className="absolute inset-0 bg-grid-subtle" />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-32">
          {/* Left - Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-sm font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20"
            >
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Organizational Excellence Since 2024
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}
            >
              We Build Digital{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
                Experiences
              </span>{' '}
              That Matter
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-white/70 max-w-xl mb-10 leading-relaxed"
            >
              From strategy to deployment, we craft cutting-edge solutions that drive measurable growth for ambitious organizations worldwide.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-start gap-4 mb-16"
            >
              <Link
                to="/contact?type=quote"
                className="btn-premium px-8 py-4 shadow-premium-xl glow-blue"
              >
                Start Your Project
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/portfolio"
                className="btn-premium-outline px-8 py-4"
              >
                View Our Work
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6"
            >
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <div className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {value}
                  </div>
                  <div className="text-xs mt-0.5 text-white/50">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - Illustration / Floating shapes */}
          <ContainerScroll className="relative hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-lg aspect-square">
              {/* Central card */}
              <motion.div
                animate={prefersReducedMotion() ? {} : { y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-8 rounded-3xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-2xl"
              >
                <div className="text-center text-white p-8">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                    <Code size={32} />
                  </div>
                  <p className="text-lg font-semibold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Digital Innovation</p>
                  <p className="text-sm text-white/70 mt-1">Enterprise Solutions</p>
                </div>
              </motion.div>

              {/* Floating shapes */}
              <motion.div
                animate={prefersReducedMotion() ? {} : { x: [0, 15, 0], y: [0, -10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-dark-card/60 border border-white/10 flex items-center justify-center shadow-lg"
              >
                <Zap size={28} className="text-primary" />
              </motion.div>
              <motion.div
                animate={prefersReducedMotion() ? {} : { x: [0, -12, 0], y: [0, 15, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-2 -left-4 w-24 h-24 rounded-2xl bg-dark-card/40 border border-white/10 flex items-center justify-center shadow-lg"
              >
                <Palette size={28} className="text-primary" />
              </motion.div>
              <motion.div
                animate={prefersReducedMotion() ? {} : { x: [0, 10, 0], y: [0, 12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1/2 -right-8 w-16 h-16 rounded-full bg-dark-card/50 border border-white/10 flex items-center justify-center shadow-lg"
              >
                <Layers size={22} className="text-primary" />
              </motion.div>
              <motion.div
                animate={prefersReducedMotion() ? {} : { x: [0, -8, 0], y: [0, -12, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-1/4 -left-8 w-14 h-14 rounded-xl bg-dark-card/30 border border-white/10 flex items-center justify-center shadow-lg"
              >
                <Globe size={22} className="text-tertiary" />
              </motion.div>
            </div>
          </ContainerScroll>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-white/50 font-medium">Scroll to explore</span>
            <motion.div
              animate={prefersReducedMotion() ? {} : { y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowDown size={16} className="text-white/50" />
          </motion.div>
        </motion.div>
      </section>
      </ParallaxSection>

      {/* ============ TRUSTED TECHNOLOGIES ============ */}
      <section className="py-16 px-6 md:px-12 bg-atmos-surface border-b border-white/5">
        <div className="max-w-[1280px] mx-auto">
          <motion.p {...fadeUp} className="text-center text-xs font-semibold uppercase tracking-widest text-white/40 mb-8">
            Trusted Technologies We Work With
          </motion.p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
            {trustedLogos.map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="text-sm font-semibold text-white/40 hover:text-blue-400 transition-colors px-3 py-1.5"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      {services.length > 0 && (
        <section className="py-24 px-6 md:px-12 bg-atmos-deep">
          <ScrollReveal className="max-w-[1280px] mx-auto">
            <motion.div {...fadeUp} className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 mb-4">Our Services</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                What We Do Best
              </h2>
              <p className="text-white/50 max-w-xl mx-auto">
                Comprehensive digital solutions tailored to elevate your organization.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((service, i) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group card-atmos p-8"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors duration-300">
                    <Zap size={22} className="text-blue-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {service.title}
                  </h3>
                  <p className="text-sm text-white/50 mb-5 line-clamp-3 leading-relaxed">
                    {service.shortDescription}
                  </p>
                  <Link
                    to={`/services/${service.id}`}
                    className="inline-flex items-center gap-1.5 text-sm text-blue-400 font-semibold group-hover:gap-3 transition-all"
                  >
                    Learn More <ArrowRight size={14} />
                  </Link>
                </motion.div>
              ))}
            </div>
            <motion.div {...fadeUp} className="text-center mt-10">
              <Link to="/services" className="inline-flex items-center gap-2 text-blue-400 font-semibold hover:gap-3 transition-all">
                View All Services <ArrowRight size={16} />
              </Link>
            </motion.div>
          </ScrollReveal>
        </section>
      )}

      {/* ============ WHY CHOOSE SERVSA ============ */}
      <section className="py-24 px-6 md:px-12 bg-atmos-surface border-t border-white/5">
        <ScrollReveal className="max-w-[1280px] mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 mb-4">Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Built for Excellence
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              We combine deep technical expertise with strategic thinking.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="card-atmos p-8"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-5">
                  <Icon size={26} className="text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ============ INDUSTRIES ============ */}
      <section className="py-24 px-6 md:px-12 bg-atmos-deep">
        <ScrollReveal className="max-w-[1280px] mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 mb-4">Industries</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              We Serve Every Industry
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Deep domain expertise across multiple sectors.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl card-atmos border border-white/10 hover:border-primary/30 hover:shadow-dark-lg transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
                  <Icon size={22} className="text-blue-400" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">{title}</h3>
                <p className="text-xs text-white/50">{desc}</p>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ============ OUR PROCESS ============ */}
      <section className="py-24 px-6 md:px-12 bg-atmos-surface border-t border-white/5 overflow-hidden">
        <ScrollReveal className="max-w-[1280px] mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 mb-4">Our Process</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              How We Deliver
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              A proven methodology refined over hundreds of successful projects.
            </p>
          </motion.div>

          {/* Desktop timeline */}
          <div className="hidden md:relative md:grid md:grid-cols-4 md:gap-5 lg:gap-6">
            <div className="absolute top-[30px] left-[12.5%] right-[12.5%] h-[3px]">
              <div className="absolute inset-0 rounded-full bg-[rgba(255,255,255,0.08)]" />
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full origin-left"
                style={{
                  background: 'linear-gradient(90deg, #2563EB, #3B82F6, #6366F1)',
                  opacity: 0.75,
                  filter: 'blur(6px)',
                }}
              />
            </div>
            {processSteps.map(({ step, title, desc }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="relative text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.08, boxShadow: '0 0 32px rgba(37,99,235,0.5)' }}
                  className="relative z-10 w-[60px] h-[60px] rounded-full bg-gradient-to-br from-[#2563EB] to-[#4F46E5] flex items-center justify-center mx-auto mb-5 shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                >
                  <span className="text-white font-bold text-sm">{step}</span>
                </motion.div>
                <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{title}</h3>
                <p className="text-sm text-white/50 leading-relaxed max-w-[260px] mx-auto">{desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Mobile timeline */}
          <div className="md:hidden space-y-12">
            {processSteps.map(({ step, title, desc }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="relative pl-16"
              >
                {i < processSteps.length - 1 && (
                  <div className="absolute left-[29px] top-[60px] bottom-[-36px] w-[2px] bg-[rgba(255,255,255,0.08)] rounded-full">
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: i * 0.15 }}
                      className="origin-top w-full h-full rounded-full"
                      style={{
                        background: 'linear-gradient(180deg, #2563EB, #3B82F6, #6366F1)',
                        opacity: 0.75,
                      }}
                    />
                  </div>
                )}
                <div className="absolute left-0 top-0 w-[60px] h-[60px] rounded-full bg-gradient-to-br from-[#2563EB] to-[#4F46E5] flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)] z-10">
                  <span className="text-white font-bold text-sm">{step}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ============ FEATURED PORTFOLIO ============ */}
      {projects.length > 0 && (
        <section className="py-24 px-6 md:px-12 bg-atmos-deep">
          <ScrollReveal className="max-w-[1280px] mx-auto">
            <motion.div {...fadeUp} className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-4">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 mb-4">Our Work</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Featured Projects
                </h2>
                <p className="text-white/50">Selected case studies showcasing our expertise.</p>
              </div>
              <Link to="/portfolio" className="hidden md:inline-flex items-center gap-2 text-blue-400 font-semibold hover:gap-3 transition-all">
                View All Projects <ArrowRight size={16} />
              </Link>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -6 }}
                  className="group rounded-2xl overflow-hidden border border-white/10 hover:shadow-dark-xl transition-all duration-300 card-atmos"
                >
                  <div className="relative h-56 bg-gradient-to-br from-blue-500/20 to-primary/10 flex items-center justify-center overflow-hidden">
                    {project.images?.[0]?.imageUrl ? (
                      <img src={project.images[0].imageUrl} alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <Layers size={48} className="text-blue-400/30" />
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-atmos-deep/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Link to={`/portfolio/${project.id}`}
                        className="px-5 py-2.5 bg-white text-primary-dark text-sm font-semibold rounded-xl hover:bg-primary hover:text-white transition-all"
                      >
                        View Case Study
                      </Link>
                    </div>
                    {project.isFeatured && (
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-dark-base backdrop-blur-sm">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    {project.category && (
                      <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2 block">{project.category}</span>
                    )}
                    <h3 className="font-bold text-white mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{project.title}</h3>
                    <p className="text-sm text-white/50 line-clamp-2">{project.shortDescription}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div {...fadeUp} className="text-center mt-10 md:hidden">
              <Link to="/portfolio" className="inline-flex items-center gap-2 text-blue-400 font-semibold hover:gap-3 transition-all">
                View All Projects <ArrowRight size={16} />
              </Link>
            </motion.div>
          </ScrollReveal>
        </section>
      )}

      {/* ============ FAQ ============ */}
      <section className="py-24 px-6 md:px-12 bg-atmos-surface border-t border-white/5">
        <div className="max-w-[1280px] mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 mb-4">FAQ</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Frequently Asked Questions
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Everything you need to know about working with Servsa.
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
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
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
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-white/50 text-sm leading-relaxed">{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp} className="text-center mt-10">
            <Link to="/faq" className="inline-flex items-center gap-2 text-blue-400 font-semibold hover:gap-3 transition-all">
              View All FAQs <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="py-24 px-6 md:px-12 bg-atmos-deep">
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl p-12 md:p-20 text-center text-white overflow-hidden bg-atmos-cta shadow-dark-xl"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
              <div className="absolute top-1/2 left-1/3 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
              <div className="absolute inset-0 bg-grid-white-subtle" />
            </div>
            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Ready to Get Started?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-white/80 text-lg max-w-xl mx-auto mb-8"
              >
                Let&apos;s discuss your project and create something extraordinary together.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  to="/contact?type=quote"
                  className="inline-flex items-center gap-2 bg-white text-primary-dark font-bold px-8 py-4 rounded-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 shadow-lg"
                >
                  Request a Free Quote
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
}
