export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const getTransition = (duration = 0.6, delay = 0, ease = [0.22, 1, 0.36, 1]) => {
  if (prefersReducedMotion()) return { duration: 0.1, delay };
  return { duration, delay, ease };
};

// === Scroll Reveal Variants ===
export const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: getTransition(0.6),
};

export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: getTransition(0.5),
};

export const slideUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: getTransition(0.7),
};

export const slideLeft = {
  initial: { opacity: 0, x: 60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: getTransition(0.7),
};

export const slideRight = {
  initial: { opacity: 0, x: -60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: getTransition(0.7),
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.92 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: '-50px' },
  transition: getTransition(0.6),
};

// === Stagger ===
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: prefersReducedMotion() ? 0.05 : staggerChildren,
      delayChildren: prefersReducedMotion() ? 0 : delayChildren,
    },
  },
});

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: getTransition(0.5),
  },
};

// === Hover Effects ===
export const hoverLift = (y = -4) =>
  prefersReducedMotion() ? {} : {
    whileHover: { y, transition: { duration: 0.2 } },
  };

export const hoverScale = (scale = 1.03) =>
  prefersReducedMotion() ? {} : {
    whileHover: { scale, transition: { duration: 0.2 } },
    whileTap: { scale: scale * 0.97 },
  };

export const buttonScale = prefersReducedMotion() ? {} : {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
};

export const imageFloat = (duration = 6) =>
  prefersReducedMotion() ? {} : {
    animate: {
      y: [0, -12, 0],
      transition: { duration, repeat: Infinity, ease: 'easeInOut' },
    },
  };

// === 3D Tilt Card ===
export const tilt3d = prefersReducedMotion() ? {} : {
  whileHover: {
    rotateX: 3,
    rotateY: -3,
    z: 10,
    transition: { duration: 0.3 },
  },
  style: { perspective: 1000, transformStyle: 'preserve-3d' },
};

// === Parallax Scroll (use with useScroll + useTransform) ===
export const parallaxScroll = (scrollYProgress, outputRange = [0, -60]) => ({
  y: scrollYProgress ? undefined : 0,
});

// === Floating Elements ===
export const floatingElement = (duration = 6, yRange = [-10, 10]) =>
  prefersReducedMotion() ? {} : {
    animate: {
      y: yRange,
      transition: { duration, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' },
    },
  };

// === Image Reveal (clip-path) ===
export const imageReveal = {
  initial: { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
  whileInView: { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

// === Scale on Scroll ===
export const scaleOnScroll = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: '-50px' },
  transition: getTransition(0.6),
};

// === Count Up (for animated counter) ===
export const countUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

// === Existing animations ===
export const counterAnimation = (value) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: getTransition(0.6),
});

export const timelineLine = {
  initial: { scaleY: 0 },
  whileInView: { scaleY: 1 },
  viewport: { once: true },
  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
};

export const accordionVariants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: { height: 'auto', opacity: 1 },
};

export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

// === Premium Animation Helpers ===

export const magneticButton = prefersReducedMotion() ? {} : {
  whileHover: { scale: 1.04, transition: { type: 'spring', stiffness: 400, damping: 10 } },
  whileTap: { scale: 0.96 },
};

export const textReveal = {
  initial: { y: '100%' },
  whileInView: { y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export const smoothReveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

export const cardHover = prefersReducedMotion() ? {} : {
  whileHover: {
    y: -6,
    scale: 1.01,
    transition: { duration: 0.25, ease: 'easeOut' },
  },
};

export const buttonGlow = prefersReducedMotion() ? {} : {
  whileHover: {
    boxShadow: '0 0 30px rgba(37,99,235,0.3), 0 0 60px rgba(37,99,235,0.1)',
    transition: { duration: 0.3 },
  },
};

export const staggeredFade = (staggerDelay = 0.08) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: prefersReducedMotion() ? 0.03 : staggerDelay,
      delayChildren: 0,
    },
  },
});

export const staggeredItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};
