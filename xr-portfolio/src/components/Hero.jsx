import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="entrance"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#080A0F' }}
    >
      {/* Abstract background grid */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-25"
          style={{
            background:
              'radial-gradient(circle, rgba(167,139,250,0.1) 0%, rgba(111,216,255,0.04) 40%, transparent 70%)',
          }}
        />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        {/* Vertical light beam */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(167,139,250,0.12) 40%, rgba(167,139,250,0.12) 60%, transparent)',
            y,
          }}
        />
      </div>

      {/* Content */}
      <motion.div className="relative z-10 text-center px-6 max-w-4xl" style={{ opacity }}>
        {/* Role label */}
        <motion.div
          className="text-label mb-8"
          style={{ color: 'rgba(167,139,250,0.6)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          XR Service Planner · PM
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="text-display mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="block" style={{ color: '#F3F6FB' }}>
            실제로 작동하는
          </span>
          <span
            className="block"
            style={{
              background: 'linear-gradient(135deg, #a78bfa, #6FD8FF, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            XR 경험을 설계합니다
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{ color: '#98A4BA' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          임상 현장의 고령자 인지훈련 시스템부터,<br className="hidden md:block" />
          Apple Vision Pro 기반 몰입형 직업체험 콘텐츠까지.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: '#546178' }}>
            Scroll to Enter
          </span>
          <motion.div
            className="w-px h-12"
            style={{ background: 'linear-gradient(to bottom, rgba(167,139,250,0.3), transparent)' }}
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
