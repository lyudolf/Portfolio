import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ZoneTransition() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0.2, 0.5], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.4, 0.7, 0.9], [0, 1, 1, 0.5]);

  return (
    <section ref={ref} className="relative py-40 overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #0A0E17 0%, #0B0A10 40%, #0C0A12 100%)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-15" style={{ background: 'radial-gradient(circle, rgba(216,165,75,0.12) 0%, rgba(140,109,216,0.06) 50%, transparent 70%)' }} />

      <motion.div className="relative z-10 max-w-4xl mx-auto px-6 text-center" style={{ scale, opacity }}>
        <p className="text-label mb-8" style={{ color: '#546178' }}>Zone Shift</p>
        <h2 className="text-display mb-8" style={{ color: 'rgba(243,246,251,0.8)' }}>
          <span className="block text-[0.5em] mb-2" style={{ color: 'rgba(111,216,255,0.3)' }}>임상 구조에서</span>
          경험 세계관으로
        </h2>
        <p className="text-lg max-w-lg mx-auto leading-relaxed" style={{ color: '#546178' }}>
          구조적 안정성이 중심이었던 프로젝트에서,<br />몰입과 세계관이 핵심인 프로젝트로.
        </p>
      </motion.div>
    </section>
  );
}
