import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address').toLowerCase().trim(),
  password: z.string().min(1, 'Password is required'),
});

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data) => {
    setServerError('');
    try {
      await login(data);
      navigate(from, { replace: true });
    } catch {
      setServerError('Invalid email or password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: '#070B1A', fontFamily: "'Inter', sans-serif" }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full"
          style={{ background: 'rgba(79, 70, 229, 0.08)', filter: 'blur(120px)' }}
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full"
          style={{ background: 'rgba(79, 70, 229, 0.06)', filter: 'blur(120px)' }}
        />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[420px] z-10 px-4"
      >
        <div
          className="p-8 md:p-10"
          style={{
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '18px',
            boxShadow: '0 0 40px rgba(79, 70, 229, 0.08), 0 8px 32px rgba(0, 0, 0, 0.2)',
          }}
        >
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)' }}
            >
              <span className="text-white text-lg font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>S</span>
            </div>
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Welcome Back
            </h1>
            <p className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Sign in to access the Servsa Admin Dashboard.
            </p>
          </div>

          {/* Server error alert */}
          {serverError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-5 flex items-center gap-2.5 p-3.5 rounded-xl text-sm"
              style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)', border: '1px solid rgba(220, 38, 38, 0.2)', color: '#FCA5A5' }}
            >
              <AlertCircle size={15} className="shrink-0" />
              <span>{serverError}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="admin@servsa.com"
                {...register('email')}
                className="w-full px-4 py-3 text-sm rounded-xl outline-none transition-all duration-200 placeholder:opacity-40"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  border: errors.email ? '1px solid rgba(220, 38, 38, 0.5)' : '1px solid rgba(255,255,255,0.06)',
                  color: 'rgba(255,255,255,0.9)',
                }}
                onFocus={(e) => {
                  if (!errors.email) e.target.style.borderColor = 'rgba(79, 70, 229, 0.5)';
                }}
                onBlur={(e) => {
                  if (!errors.email) e.target.style.borderColor = 'rgba(255,255,255,0.06)';
                }}
              />
              {errors.email && (
                <p className="text-xs flex items-center gap-1 mt-1" style={{ color: '#FCA5A5' }}>
                  <AlertCircle size={11} />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  {...register('password')}
                  className="w-full px-4 py-3 text-sm rounded-xl outline-none transition-all duration-200 placeholder:opacity-40"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    border: errors.password ? '1px solid rgba(220, 38, 38, 0.5)' : '1px solid rgba(255,255,255,0.06)',
                    color: 'rgba(255,255,255,0.9)',
                    paddingRight: '2.75rem',
                  }}
                  onFocus={(e) => {
                    if (!errors.password) e.target.style.borderColor = 'rgba(79, 70, 229, 0.5)';
                  }}
                  onBlur={(e) => {
                    if (!errors.password) e.target.style.borderColor = 'rgba(255,255,255,0.06)';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs flex items-center gap-1 mt-1" style={{ color: '#FCA5A5' }}>
                  <AlertCircle size={11} />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3 px-6 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: isSubmitting ? 'rgba(79, 70, 229, 0.6)' : 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)',
                boxShadow: isSubmitting ? 'none' : '0 4px 20px rgba(79, 70, 229, 0.3)',
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 28px rgba(79, 70, 229, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                if (!isSubmitting) {
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(79, 70, 229, 0.3)';
                }
              }}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Logging in…
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
