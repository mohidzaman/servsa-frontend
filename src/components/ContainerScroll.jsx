import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { prefersReducedMotion } from '../utils/motion';

export const ContainerScroll = ({ children, title, className = '' }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const contentScale = useTransform(scrollYProgress, [0, 0.4, 0.7], [0.88, 1, 1]);
  const contentY = useTransform(scrollYProgress, [0, 0.4], [50, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.4], [60, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);

  if (prefersReducedMotion()) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={containerRef} className={className}>
      {title && (
        <motion.div style={{ y: titleY, opacity: titleOpacity }} className="mb-6 md:mb-8">
          {title}
        </motion.div>
      )}
      <motion.div
        style={{ scale: contentScale, y: contentY, opacity: contentOpacity }}
        className="w-full origin-top"
      >
        {children}
      </motion.div>
    </div>
  );
};

export const ScrollReveal = ({ children, className = '' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'start 0.2'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 1]);

  if (prefersReducedMotion()) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ scale, y, opacity }} className={className}>
      {children}
    </motion.div>
  );
};

export const ParallaxSection = ({ children, className = '', speed = 0.3 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

  if (prefersReducedMotion()) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y, opacity }} className="w-full">
        {children}
      </motion.div>
    </div>
  );
};
