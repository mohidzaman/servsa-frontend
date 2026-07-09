import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, Upload, FileText, DollarSign, Clock, Layers, Send } from 'lucide-react';
import { contactApi } from '../api/contact.api';
import { useToast, ToastContainer } from '../components/ui/Toast';
import SeoMeta from '../seo/SeoMeta'
import { BreadcrumbSchema } from '../seo/SeoSchema'

const budgetOptions = ['< $5,000', '$5,000 - $15,000', '$15,000 - $50,000', '$50,000+', 'Not sure yet'];
const timelineOptions = ['ASAP (1-2 weeks)', '1-2 months', '3-6 months', '6+ months', 'Flexible'];
const serviceOptions = [
  { value: 'web-development', label: 'Web Development', icon: Layers },
  { value: 'ui-ux-design', label: 'UI/UX Design', icon: FileText },
  { value: 'digital-strategy', label: 'Digital Strategy', icon: DollarSign },
  { value: 'branding', label: 'Branding', icon: FileText },
  { value: 'seo-marketing', label: 'SEO & Marketing', icon: Clock },
  { value: 'other', label: 'Other', icon: Layers },
];

const schema = z.object({
  firstName: z.string().min(1, 'Required').max(100, 'Max 100 characters').trim(),
  lastName: z.string().min(1, 'Required').max(100, 'Max 100 characters').trim(),
  email: z.string().min(1, 'Email is required').email('Valid email required').toLowerCase().trim(),
  phone: z.string().max(50, 'Max 50 characters').optional(),
  company: z.string().max(255, 'Max 255 characters').optional(),
  serviceType: z.string().min(1, 'Please select a service'),
  projectDescription: z.string().min(20, 'Please describe your project (min 20 characters)').max(10000, 'Max 10000 characters'),
  budgetRange: z.string().optional(),
  timeline: z.string().optional(),
});

const steps = ['Project Type', 'Details', 'Budget & Timeline', 'Review'];

const fadeVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

export default function QuotePage() {
  const [step, setStep] = useState(0);
  const [serverError, setServerError] = useState('');
  const [files, setFiles] = useState([]);
  const { toasts, toast, remove } = useToast();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting }, watch, getValues, trigger } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '', lastName: '', email: '', phone: '', company: '',
      serviceType: '', projectDescription: '', budgetRange: '', timeline: '',
    },
  });

  const serviceType = watch('serviceType');
  const budgetRange = watch('budgetRange');
  const timeline = watch('timeline');

  const validateStep = async () => {
    let fields = [];
    if (step === 0) fields = ['serviceType'];
    else if (step === 1) fields = ['firstName', 'lastName', 'email', 'projectDescription'];
    else if (step === 2) fields = ['budgetRange', 'timeline'];
    const valid = await trigger(fields);
    return valid;
  };

  const nextStep = async () => {
    if (await validateStep()) setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (data) => {
    setServerError('');
    try {
      await contactApi.submitQuote(data);
      navigate('/thank-you');
    } catch (err) {
      setServerError(err?.response?.data?.message || 'Submission failed. Please try again.');
    }
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files || []);
    const maxSize = 10 * 1024 * 1024;
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png', 'image/jpeg'];
    const valid = selected.filter(f => {
      if (f.size > maxSize) { toast(`"${f.name}" exceeds 10MB limit`, 'error'); return false; }
      if (!allowedTypes.includes(f.type)) { toast(`"${f.name}" has an unsupported file type`, 'error'); return false; }
      return true;
    });
    setFiles((prev) => [...prev, ...valid].slice(0, 5));
    if (e.target) e.target.value = '';
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <SeoMeta title="Request a Quote" description="Request a customized quote for your web development, design, or cloud project." canonical="/quote" />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Request a Quote', path: '/quote' }]} />
      <div className="min-h-screen bg-atmos-deep">
      <ToastContainer toasts={toasts} remove={remove} />
      {/* ============ HERO ============ */}
      <section className="relative py-24 px-6 md:px-12 text-center overflow-hidden bg-atmos-hero">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-grid-white-subtle" />
          <div className="absolute top-10 left-20 w-20 h-20 rounded-xl bg-accent/10 animate-float-3" />
          <div className="absolute bottom-16 right-24 w-14 h-14 rounded-full bg-primary/10 animate-float-4" />
        </div>
        <div className="max-w-[1280px] mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-white/80 bg-white/10 backdrop-blur-sm mb-6 border border-white/20">Free Estimate</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Request a Quote
            </h1>
            <p className="text-white/60 max-w-xl mx-auto text-lg">
              Tell us about your project and we'll get back to you within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============ FORM ============ */}
      <section className="py-16 px-6 md:px-12 bg-atmos-deep">
        <div className="max-w-3xl mx-auto">
          {/* Steps indicator */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                  i <= step ? 'bg-primary text-white shadow-md' : 'bg-white/10 text-white/50'
                }`}>
                  {i < step ? <CheckCircle2 size={16} /> : i + 1}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${i <= step ? 'text-white' : 'text-white/40'}`}>
                  {s}
                </span>
                {i < steps.length - 1 && (
                  <div className={`w-8 h-0.5 ${i < step ? 'bg-primary' : 'bg-white/10'}`} />
                )}
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-atmos p-8 md:p-10"
          >
            {serverError && (
              <div className="mb-6 flex items-start gap-3 p-4 rounded-xl bg-red-500/10 text-red-400 text-sm border border-red-500/20">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                {serverError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <AnimatePresence mode="wait">
                {/* Step 0: Project Type */}
                {step === 0 && (
                  <motion.div key="step0" variants={fadeVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>What do you need?</h2>
                    <p className="text-sm text-white/50 mb-6">Select the service that best describes your project.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {serviceOptions.map(({ value, label, icon: Icon }) => (
                        <label
                          key={value}
                          className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                            serviceType === value
                              ? 'border-primary bg-blue-500/20'
                              : 'border-white/10 bg-white/5 hover:border-primary/50'
                          }`}
                        >
                          <input type="radio" {...register('serviceType')} value={value} className="sr-only" />
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            serviceType === value ? 'bg-primary text-white' : 'bg-white/10 text-white/50'
                          }`}>
                            <Icon size={18} />
                          </div>
                          <span className={`text-sm font-medium ${serviceType === value ? 'text-blue-400' : 'text-white'}`}>
                            {label}
                          </span>
                        </label>
                      ))}
                    </div>
                    {errors.serviceType && <p className="text-xs text-red-400 mt-2">{errors.serviceType.message}</p>}
                  </motion.div>
                )}

                {/* Step 1: Details */}
                {step === 1 && (
                  <motion.div key="step1" variants={fadeVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-5">
                    <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Tell us about yourself</h2>
                    <p className="text-sm text-white/50 mb-4">We'll use this information to get back to you.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {[['firstName', 'First Name', 'John'], ['lastName', 'Last Name', 'Doe']].map(([field, label, ph]) => (
                        <div key={field}>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-1.5">{label} *</label>
                          <input {...register(field)} placeholder={ph}
                            className={`w-full px-4 py-3 rounded-xl border text-white text-sm outline-none transition-all focus:ring-4 bg-white/5 placeholder:text-white/30 ${errors[field] ? 'border-red-500/50 focus:ring-red-500/20' : 'border-white/10 focus:border-primary focus:ring-primary/20'}`} />
                          {errors[field] && <p className="text-xs text-red-400 mt-1">{errors[field].message}</p>}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-1.5">Email *</label>
                        <input type="email" {...register('email')} placeholder="you@company.com"
                          className={`w-full px-4 py-3 rounded-xl border text-white text-sm outline-none focus:ring-4 bg-white/5 placeholder:text-white/30 ${errors.email ? 'border-red-500/50 focus:ring-red-500/20' : 'border-white/10 focus:border-primary focus:ring-primary/20'}`} />
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
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-1.5">Project Description *</label>
                      <textarea {...register('projectDescription')} rows={5}
                        placeholder="Describe your project goals, requirements, and any specific features you need..."
                        className={`w-full px-4 py-3 rounded-xl border text-white text-sm outline-none transition-all focus:ring-4 bg-white/5 placeholder:text-white/30 resize-none ${errors.projectDescription ? 'border-red-500/50 focus:ring-red-500/20' : 'border-white/10 focus:border-primary focus:ring-primary/20'}`} />
                      {errors.projectDescription && <p className="text-xs text-red-400 mt-1">{errors.projectDescription.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-1.5">Attach Files (optional)</label>
                      <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                        onClick={() => document.getElementById('file-upload').click()}>
                        <Upload size={24} className="text-white/40 mx-auto mb-2" />
                        <p className="text-sm text-white/50">Drag & drop or click to upload</p>
                        <p className="text-xs text-white/30 mt-1">Max 5 files (PDF, DOC, PNG, JPG)</p>
                        <input id="file-upload" type="file" multiple onChange={handleFileChange}
                          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" className="hidden" />
                      </div>
                      {files.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {files.map((file, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 text-sm">
                              <span className="text-white/60 truncate">{file.name}</span>
                              <button type="button" onClick={() => removeFile(i)}
                                className="text-red-400 hover:text-red-300 text-xs font-semibold">Remove</button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Budget & Timeline */}
                {step === 2 && (
                  <motion.div key="step2" variants={fadeVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-6">
                    <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Budget & Timeline</h2>
                    <p className="text-sm text-white/50 mb-4">Help us understand your constraints.</p>
                    <div>
                      <label className="block text-sm font-semibold text-white mb-3">Budget Range</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {budgetOptions.map((o) => (
                          <label key={o}
                            className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                              budgetRange === o ? 'border-primary bg-blue-500/20' : 'border-white/10 bg-white/5 hover:border-primary/50'
                            }`}
                          >
                            <input type="radio" {...register('budgetRange')} value={o} className="sr-only" />
                            <DollarSign size={16} className={budgetRange === o ? 'text-blue-400' : 'text-white/50'} />
                            <span className={`text-sm font-medium ${budgetRange === o ? 'text-blue-400' : 'text-white'}`}>{o}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-white mb-3">Timeline</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {timelineOptions.map((o) => (
                          <label key={o}
                            className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                              timeline === o ? 'border-primary bg-blue-500/20' : 'border-white/10 bg-white/5 hover:border-primary/50'
                            }`}
                          >
                            <input type="radio" {...register('timeline')} value={o} className="sr-only" />
                            <Clock size={16} className={timeline === o ? 'text-blue-400' : 'text-white/50'} />
                            <span className={`text-sm font-medium ${timeline === o ? 'text-blue-400' : 'text-white'}`}>{o}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Review */}
                {step === 3 && (
                  <motion.div key="step3" variants={fadeVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-6">
                    <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Review Your Request</h2>
                    <p className="text-sm text-white/50 mb-4">Please verify your information before submitting.</p>
                    <div className="space-y-3">
                      {[
                        { label: 'Service', value: serviceOptions.find((o) => o.value === getValues('serviceType'))?.label || getValues('serviceType') },
                        { label: 'Name', value: `${getValues('firstName')} ${getValues('lastName')}` },
                        { label: 'Email', value: getValues('email') },
                        { label: 'Phone', value: getValues('phone') || 'Not provided' },
                        { label: 'Company', value: getValues('company') || 'Not provided' },
                        { label: 'Budget', value: getValues('budgetRange') || 'Not specified' },
                        { label: 'Timeline', value: getValues('timeline') || 'Not specified' },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex justify-between py-2 border-b border-white/10">
                          <span className="text-sm text-white/50">{label}</span>
                          <span className="text-sm font-medium text-white">{value}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white/50 mb-1">Project Description</p>
                      <p className="text-sm text-white/50 bg-white/5 p-4 rounded-xl leading-relaxed">
                        {getValues('projectDescription')}
                      </p>
                    </div>
                    {files.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-white/50 mb-1">Attachments ({files.length})</p>
                        <div className="flex flex-wrap gap-2">
                          {files.map((f, i) => (
                            <span key={i} className="text-xs px-3 py-1 rounded-lg bg-white/10 text-white/60">{f.name}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                {step > 0 ? (
                  <button type="button" onClick={prevStep}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-all text-sm">
                    <ArrowLeft size={16} /> Back
                  </button>
                ) : (
                  <div />
                )}
                {step < steps.length - 1 ? (
                  <button type="button" onClick={nextStep}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-all shadow-md text-sm">
                    Continue <ArrowRight size={16} />
                  </button>
                ) : (
                  <button type="submit" disabled={isSubmitting}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-all disabled:opacity-70 shadow-md text-sm">
                    {isSubmitting ? (
                      <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</>
                    ) : (
                      <>Submit Request <Send size={16} /></>
                    )}
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
}
