import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Search, HelpCircle, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fadeUp } from '../utils/motion';
import SeoMeta from '../seo/SeoMeta'
import { BreadcrumbSchema, FaqSchema } from '../seo/SeoSchema'

const faqData = [
  { category: 'General', q: 'What services does Servsa offer?', a: 'Servsa offers comprehensive digital solutions including web development, UI/UX design, digital strategy, brand identity, SEO, and custom software development tailored for enterprise organizations.' },
  { category: 'General', q: 'What technologies do you specialize in?', a: 'Our team is proficient in React, Next.js, Node.js, Python, PostgreSQL, AWS, and many other modern technologies. We choose the best stack for each project based on requirements and scalability needs.' },
  { category: 'General', q: 'Do you work with startups?', a: 'Absolutely! We love working with ambitious startups. We offer startup-friendly packages and can scale our engagement as your company grows.' },
  { category: 'Process', q: 'How long does a typical project take?', a: 'Project timelines vary based on scope and complexity. A simple website may take 4-6 weeks, while complex enterprise applications can take 3-6 months. We provide detailed project timelines during our discovery phase.' },
  { category: 'Process', q: 'How do I get started?', a: 'Simply fill out our quote request form or send us an email at info@servsa.online. We\'ll schedule a free 30-minute discovery call to understand your needs and provide a tailored proposal.' },
  { category: 'Process', q: 'What is your development process?', a: 'Our process follows four key phases: Discovery (understanding your needs), Design (creating intuitive interfaces), Development (building robust solutions), and Launch (deploying and optimizing for success).' },
  { category: 'Pricing', q: 'What is your pricing model?', a: 'We offer flexible pricing models including fixed-price projects for well-defined scopes, and time-and-materials for agile engagements. We provide detailed proposals after our initial discovery call.' },
  { category: 'Pricing', q: 'Do you offer post-launch support?', a: 'Yes, we offer ongoing maintenance, support packages, and retainer agreements to ensure your product continues to perform at its best after launch.' },
  { category: 'Legal', q: 'Do you sign NDAs?', a: 'Yes, we are happy to sign NDAs before discussing sensitive project details. Client confidentiality is something we take very seriously at Servsa.' },
  { category: 'Legal', q: 'Who owns the intellectual property?', a: 'Upon full payment, you own all intellectual property rights to the work we produce. We believe you should have full ownership of your digital assets.' },
];

const categories = ['All', 'General', 'Process', 'Pricing', 'Legal'];

export default function FaqPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState(null);

  const filtered = useMemo(() => {
    let result = faqData;
    if (activeCategory !== 'All') {
      result = result.filter((f) => f.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        ({ q: question, a }) =>
          question.toLowerCase().includes(q) || a.toLowerCase().includes(q)
      );
    }
    return result;
  }, [search, activeCategory]);

  return (
    <>
      <SeoMeta title="FAQ" description="Frequently asked questions about Servsa's services, process, pricing, and more." canonical="/faq" />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'FAQ', path: '/faq' }]} />
      <FaqSchema questions={faqData} />
      <div className="min-h-screen bg-atmos-deep">
      {/* ============ HERO ============ */}
      <section className="relative py-24 px-6 md:px-12 text-center overflow-hidden bg-atmos-hero">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-grid-white-subtle" />
          <div className="absolute top-10 left-20 w-20 h-20 rounded-xl bg-accent/10 animate-float-3" />
          <div className="absolute bottom-16 right-16 w-14 h-14 rounded-full bg-primary/10 animate-float-4" />
        </div>
        <div className="max-w-[1280px] mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-white/80 bg-white/10 backdrop-blur-sm mb-6 border border-white/20">
              Knowledge Base
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Frequently Asked Questions
            </h1>
            <p className="text-white/60 max-w-xl mx-auto text-lg">
              Everything you need to know about working with Servsa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search + Categories */}
      <section className="sticky top-20 z-40 py-5 px-6 md:px-12 border-b border-white/10 bg-atmos-elevated/95 backdrop-blur-lg">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
              <Search size={16} />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all placeholder:text-white/30"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
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

      {/* ============ FAQ LIST ============ */}
      <section className="py-16 px-6 md:px-12 bg-atmos-deep">
        <div className="max-w-3xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <HelpCircle size={48} className="text-white/20 mx-auto mb-4" />
              <p className="text-white/60 text-lg mb-1">No results found</p>
              <p className="text-sm text-white/40">
                {search ? `No results for "${search}"` : 'No questions in this category.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map(({ q, a }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className="rounded-2xl border border-white/10 overflow-hidden card-atmos hover:border-white/20 transition-all"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/[0.03] transition-colors"
                  >
                    <span className="font-semibold text-white pr-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {q}
                    </span>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                      openIndex === i ? 'bg-primary text-white shadow-sm' : 'bg-white/10 text-white/50'
                    }`}>
                      {openIndex === i ? <Minus size={16} /> : <Plus size={16} />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-white/50 text-sm leading-relaxed">{a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============ STILL NEED HELP ============ */}
      <section className="py-20 px-6 md:px-12 bg-atmos-cta">
        <div className="max-w-[1280px] mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
              <Mail size={28} className="text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Still Have Questions?
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              Can't find what you're looking for? Our team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-primary-dark font-bold px-8 py-4 rounded-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 shadow-lg"
              >
                Contact Us <ArrowRight size={18} />
              </Link>
              <a
                href="mailto:info@servsa.online"
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all"
              >
                Email Us <Mail size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
}
