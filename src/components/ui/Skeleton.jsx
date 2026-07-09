import { useState, useEffect } from 'react';

export default function Skeleton({ className }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-surface-dim ${className || ''}`}>
      {!reduced && (
        <div
          className="absolute inset-0 animate-shimmer pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
          }}
        />
      )}
    </div>
  );
}
