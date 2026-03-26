import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function FadeIn({ children, delay = 0, direction = 'up' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const y = direction === 'up' ? 16 : direction === 'down' ? -16 : 0;
  const x = direction === 'left' ? 16 : direction === 'right' ? -16 : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.45, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
