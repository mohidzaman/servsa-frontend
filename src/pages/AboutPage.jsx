import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Target, Award, Globe, ArrowRight, Lightbulb, Heart } from 'lucide-react';
import { ContainerScroll, ParallaxSection } from '../components/ContainerScroll';
import { fadeUp, scaleOnScroll } from '../utils/motion';
import SeoMeta from '../seo/SeoMeta'
import { BreadcrumbSchema } from '../seo/SeoSchema'

const values = [
  { icon: Target, title: 'Mission-Driven', desc: 'Every decision we make is aligned with delivering measurable impact for our clients and their communities.' },
  { icon: Users, title: 'Client-First', desc: 'We treat every project as a long-term partnership built on trust, transparency, and mutual success.' },
  { icon: Award, title: 'Excellence', desc: 'We set the bar high and hold ourselves to the highest standards of quality and craftsmanship.' },
  { icon: Globe, title: 'Global Perspective', desc: 'Our diverse team brings global insights to local challenges, delivering solutions that work worldwide.' },
];

const milestones = [
  { year: '2024', title: 'Founded', desc: 'Servsa was founded by Mohid Zaman with a vision to transform digital experiences for ambitious organizations.' },
  { year: '2024', title: 'First Clients', desc: 'Achieved our first major milestone by delivering exceptional solutions to early adopters and building a strong portfolio.' },
  { year: '2024', title: 'Team Assembly', desc: 'Assembled a talented team including Hashim as CTO, Ahmed Asif as Head of Design, and Rohsan Sahmas as Lead Developer.' },
  { year: '2025', title: 'Growth & Expansion', desc: 'Expanding our reach and capabilities to serve clients across multiple industries and regions.' },
];

const team = [
  { name: 'Mohid Zaman', role: 'CEO & Founder', initials: 'MZ' },
  { name: 'Hashim', role: 'CTO', initials: 'H' },
  { name: 'Ahmed Asif', role: 'Head of Design', initials: 'AA' },
  { name: 'Rohsan Sahmas', role: 'Lead Developer', initials: 'RS' },
];

const stats = [
  { value: '150+', label: 'Projects' },
  { value: '25+', label: 'Team Members' },
  { value: '12+', label: 'Countries' },
  { value: '98%', label: 'Satisfaction' },
];

export default function AboutPage() {
  return (
    <>
      <SeoMeta title="About Us" description="Learn about Servsa — our story, mission, values, and the team behind our digital agency." canonical="/about" />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'About Us', path: '/about' }]} />
      <div className="min-h-screen bg-atmos-deep">
      {/* ============ HERO BANNER ============ */}
      <ParallaxSection speed={0.2}>
      <section className="relative py-32 px-6 md:px-12 bg-atmos-hero overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-grid-white-subtle" />
          <div className="absolute top-10 left-20 w-24 h-24 rounded-2xl rotate-12 bg-accent/10 animate-float-3" />
          <div className="absolute bottom-20 right-16 w-16 h-16 rounded-full bg-primary/10 animate-float-4" />
        </div>
        <ContainerScroll className="relative z-10 max-w-[1280px] mx-auto text-center">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-white/80 bg-white/10 backdrop-blur-sm mb-6 border border-white/20"
            >
              About Servsa
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}
            >
              Building the Future,<br />One Project at a Time
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            >
              Founded in 2024, Servsa is at the forefront of digital transformation, helping organizations navigate the complexities of the modern digital landscape with confidence and clarity.
            </motion.p>
          </div>
        </ContainerScroll>
      </section>
      </ParallaxSection>

      {/* Stats bar */}
      <section className="py-12 px-6 md:px-12 bg-atmos-surface border-b border-white/5">
        <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-blue-400" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{value}</div>
              <div className="text-sm text-white/50 mt-1">{label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============ COMPANY STORY ============ */}
      <section className="py-24 px-6 md:px-12 bg-atmos-deep">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...scaleOnScroll}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 mb-4">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              From Vision to Reality
            </h2>
            <p className="text-white/60 leading-relaxed mb-6">
              Servsa was founded in 2024 by Mohid Zaman with a simple belief: that technology, when applied with purpose and creativity, can transform businesses and improve lives. What started with a vision has quickly grown into a dynamic digital agency delivering impactful solutions.
            </p>
            <p className="text-white/60 leading-relaxed mb-8">
              Our journey has been defined by a relentless commitment to quality, innovation, and client success. We&apos;ve had the privilege of working with startups, enterprises, and everything in between — each project teaching us something new and pushing us to be better.
            </p>
            <Link to="/contact"
              className="btn-premium px-6 py-3 inline-flex items-center gap-2"
            >
              Work With Us <ArrowRight size={16} />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl bg-gradient-to-br from-blue-500/20 to-primary/5 p-8 flex items-center justify-center h-96 border border-white/10"
          >
            <div className="text-center">
              <Globe size={64} className="text-blue-400/30 mx-auto mb-4" />
              <p className="text-lg font-semibold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Global Impact</p>
              <p className="text-sm text-white/50 mt-1">12+ countries served</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ MISSION & VISION ============ */}
      <section className="py-24 px-6 md:px-12 bg-atmos-surface">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-atmos p-10"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-5">
              <Target size={28} className="text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Our Mission</h3>
            <p className="text-white/60 leading-relaxed">
              To empower organizations with cutting-edge digital solutions that drive measurable growth, operational excellence, and lasting competitive advantage in an ever-evolving technological landscape.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-atmos p-10"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-5">
              <Lightbulb size={28} className="text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Our Vision</h3>
            <p className="text-white/60 leading-relaxed">
              To be the most trusted digital transformation partner globally, recognized for our unwavering commitment to quality, innovation, and the success of every client we serve.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============ CORE VALUES ============ */}
      <section className="py-24 px-6 md:px-12 bg-atmos-deep">
        <div className="max-w-[1280px] mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 mb-4">Values</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              What We Stand For
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">These principles guide everything we do at Servsa.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="card-atmos p-8 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-5 group-hover:bg-blue-500/30 transition-all">
                  <Icon size={26} className="text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TIMELINE ============ */}
      <section className="py-24 px-6 md:px-12 bg-atmos-surface">
        <div className="max-w-[1280px] mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 mb-4">Our Journey</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              The Servsa Timeline
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">Key milestones from our journey so far.</p>
          </motion.div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-white/10" />
            <div className="space-y-12">
              {milestones.map(({ year, title, desc }, i) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-14"
                >
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md z-10">
                    <Heart size={16} className="text-white" />
                  </div>
                  <div className="card-atmos p-6">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">{year}</span>
                    <h3 className="text-lg font-bold text-white mt-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{title}</h3>
                    <p className="text-sm text-white/50 mt-1 leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ TEAM ============ */}
      <section className="py-24 px-6 md:px-12 bg-atmos-deep">
        <div className="max-w-[1280px] mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 mb-4">Team</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Leadership</h2>
            <p className="text-white/50 max-w-xl mx-auto">The talented people behind Servsa.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(({ name, role, initials }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="text-center card-atmos p-8"
              >
                <div className="w-24 h-24 rounded-2xl mx-auto mb-5 flex items-center justify-center text-white font-bold text-xl bg-gradient-to-br from-primary to-primary-dark shadow-md">
                  {initials}
                </div>
                <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{name}</h3>
                <p className="text-sm text-white/50">{role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-24 px-6 md:px-12 bg-atmos-cta">
        <div className="max-w-[1280px] mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Want to Be Part of Our Story?
            </h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
              Let&apos;s discuss how Servsa can help transform your digital presence.
            </p>
            <Link
              to="/contact?type=quote"
              className="inline-flex items-center gap-2 bg-white text-primary-dark font-bold px-8 py-4 rounded-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 shadow-lg"
            >
              Start a Conversation <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
}
