import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle2, AlertCircle, Clock, MessageCircle } from 'lucide-react';
import { contactApi } from '../api/contact.api';
import { fadeUp } from '../utils/motion';
import SeoMeta from '../seo/SeoMeta'
import { BreadcrumbSchema } from '../seo/SeoSchema'

const schema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100, 'Max 100 characters').trim(),
  lastName: z.string().min(1, 'Last name is required').max(100, 'Max 100 characters').trim(),
  email: z.string().min(1, 'Email is required').email('Valid email required').toLowerCase().trim(),
  phone: z.string().max(50, 'Max 50 characters').optional(),
  company: z.string().max(255, 'Max 255 characters').optional(),
  subject: z.string().min(1, 'Subject is required').max(255, 'Max 255 characters').trim(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000, 'Max 5000 characters'),
});

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'info@servsa.online', href: 'mailto:info@servsa.online', detail: 'We typically respond within 24 hours' },
  { icon: Mail, label: 'Sales', value: 'sales@servsa.online', href: 'mailto:sales@servsa.online', detail: 'For quote & sales inquiries' },
  { icon: MessageCircle, label: 'WhatsApp', value: '+92-345-0513634', href: 'https://wa.me/923450513634', detail: 'Quick replies via WhatsApp' },
  { icon: Clock, label: 'Response Time', value: 'Within 24 hours', href: '#', detail: 'Average first response time' },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setServerError('');
    try {
      await contactApi.submitContact(data);
      setSubmitted(true);
      reset();
    } catch (err) {
      setServerError(err?.response?.data?.message || 'Failed to send. Please try again.');
    }
  };

  return (
    <>
      <SeoMeta title="Contact Us" description="Get in touch with Servsa. Let's discuss how we can help transform your digital presence." canonical="/contact" />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Contact Us', path: '/contact' }]} />
      <div className="min-h-screen bg-atmos-deep">
      {/* ============ HERO ============ */}
      <section className="relative py-24 px-6 md:px-12 text-center overflow-hidden bg-atmos-hero">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-grid-white-subtle" />
          <div className="absolute top-10 left-20 w-20 h-20 rounded-xl bg-accent/10 animate-float-3" />
          <div className="absolute bottom-16 right-20 w-14 h-14 rounded-full bg-primary/10 animate-float-4" />
        </div>
        <div className="max-w-[1280px] mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-white/80 bg-white/10 backdrop-blur-sm mb-6 border border-white/20">
              Get In Touch
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Contact Us
            </h1>
            <p className="text-white/60 max-w-xl mx-auto text-lg">
              Have a question or project in mind? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============ TWO COLUMN LAYOUT ============ */}
      <section className="py-16 px-6 md:px-12 bg-atmos-deep">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left: Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div {...fadeUp}>
              <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Let's Talk
              </h2>
              <p className="text-white/50 text-sm">
                We're here to help. Choose your preferred way to reach us.
              </p>
            </motion.div>
            <div className="space-y-5">
              {contactInfo.map(({ icon: Icon, label, value, href, detail }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="card-atmos p-5 flex items-start gap-5"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-0.5">{label}</p>
                    <a href={href} className="text-white font-medium hover:text-blue-400 transition-colors">{value}</a>
                    <p className="text-xs text-white/40 mt-0.5">{detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="card-atmos p-10 md:p-14 text-center">
                <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} className="text-blue-400" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Message Sent!
                </h3>
                <p className="text-white/60 mb-2">Thank you for reaching out.</p>
                <p className="text-white/50 text-sm mb-8">We'll get back to you within 24 hours.</p>
                <button onClick={() => setSubmitted(false)}
                  className="px-6 py-3 rounded-xl text-blue-400 border-2 border-blue-400/30 font-medium hover:bg-blue-500/20 transition-all">
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="card-atmos p-8 md:p-10">
                {serverError && (
                  <div className="mb-6 flex items-start gap-3 p-4 rounded-xl bg-red-500/10 text-red-400 text-sm border border-red-500/20">
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    {serverError}
                  </div>
                )}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[['firstName', 'First Name'], ['lastName', 'Last Name']].map(([field, label]) => (
                      <div key={field}>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-1.5">
                          {label} <span className="text-red-400">*</span>
                        </label>
                        <input {...register(field)} placeholder={field === 'firstName' ? 'John' : 'Doe'}
                          className={`w-full px-4 py-3 rounded-xl border text-white text-sm outline-none transition-all focus:ring-4 bg-white/5 placeholder:text-white/30 ${errors[field] ? 'border-red-500/50 focus:ring-red-500/20' : 'border-white/10 focus:border-primary focus:ring-primary/20'}`} />
                        {errors[field] && <p className="text-xs text-red-400 mt-1">{errors[field].message}</p>}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-1.5">Email <span className="text-red-400">*</span></label>
                      <input type="email" {...register('email')} placeholder="you@company.com"
                        className={`w-full px-4 py-3 rounded-xl border text-white text-sm outline-none transition-all focus:ring-4 bg-white/5 placeholder:text-white/30 ${errors.email ? 'border-red-500/50 focus:ring-red-500/20' : 'border-white/10 focus:border-primary focus:ring-primary/20'}`} />
                      {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-1.5">Phone</label>
                      <input type="tel" {...register('phone')} placeholder="+1 (234) 567-890"
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 placeholder:text-white/30" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-1.5">Company</label>
                    <input {...register('company')} placeholder="Acme Inc."
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 placeholder:text-white/30" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-1.5">Subject <span className="text-red-400">*</span></label>
                    <input {...register('subject')} placeholder="Project Inquiry"
                      className={`w-full px-4 py-3 rounded-xl border text-white text-sm outline-none transition-all focus:ring-4 bg-white/5 placeholder:text-white/30 ${errors.subject ? 'border-red-500/50 focus:ring-red-500/20' : 'border-white/10 focus:border-primary focus:ring-primary/20'}`} />
                    {errors.subject && <p className="text-xs text-red-400 mt-1">{errors.subject.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-1.5">Message <span className="text-red-400">*</span></label>
                    <textarea {...register('message')} rows={5} placeholder="Tell us about your project..."
                      className={`w-full px-4 py-3 rounded-xl border text-white text-sm outline-none transition-all focus:ring-4 bg-white/5 placeholder:text-white/30 resize-none ${errors.message ? 'border-red-500/50 focus:ring-red-500/20' : 'border-white/10 focus:border-primary focus:ring-primary/20'}`} />
                    {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message.message}</p>}
                  </div>
                  <button type="submit" disabled={isSubmitting}
                    className="btn-premium w-full py-4 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                    ) : (
                      <>Send Message <Send size={16} /></>
                    )}
                  </button>
                </form>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
