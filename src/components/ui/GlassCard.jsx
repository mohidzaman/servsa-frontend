import { motion } from 'framer-motion';
import { prefersReducedMotion } from '../../utils/motion';

export default function GlassCard({ children, className = '', hover = true, as = 'div', glow = false }) {
  const Component = motion[as] || motion.div;

  const hoverProps = hover && !prefersReducedMotion()
    ? {
        whileHover: { y: -8, scale: 1.01, transition: { duration: 0.3, ease: 'easeOut' } },
        whileTap: { scale: 0.99 },
      }
    : {};

  return (
    <Component
      className={`glass-premium rounded-2xl transition-all duration-500 ${
        glow ? 'shadow-premium-xl glow-blue' : 'shadow-premium'
      } ${className}`}
      {...hoverProps}
    >
      {children}
    </Component>
  );
}
