import { motion } from 'framer-motion';

/**
 * 프로젝트 상세 상단 정량 지표 스트립.
 * items: [{ num, label, sub? }], accent: 강조 색상(rgba 문자열)
 */
export default function AtAGlance({ items, accent = 'rgba(111,216,255,0.85)' }) {
  return (
    <section className="px-8 pb-4" style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <motion.p
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-[11px] font-bold tracking-[0.3em] uppercase mb-6"
        style={{ color: accent }}
      >
        At a Glance
      </motion.p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="p-5 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <p className="text-[26px] md:text-[30px] font-extrabold leading-none mb-2" style={{ color: accent }}>
              {item.num}
            </p>
            <p className="text-[13px] font-semibold mb-1" style={{ color: 'rgba(243,246,251,0.85)' }}>
              {item.label}
            </p>
            {item.sub && (
              <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(243,246,251,0.35)' }}>
                {item.sub}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
