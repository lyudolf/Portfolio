import { motion } from 'framer-motion';

const TABS = [
  { id: 'about', label: 'About' },
  { id: 'kisti', label: 'KISTI' },
  { id: 'dream', label: '꿈키올래' },
  { id: 'process', label: 'Process' },
  { id: 'whyme', label: 'Why Me' },
];

export default function Nav({ activeTab, onTabChange }) {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(8,10,15,0.92)',
        backdropFilter: 'blur(30px) saturate(1.4)',
        borderBottom: '1px solid rgba(38,50,71,0.3)',
      }}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="max-w-6xl mx-auto px-8 h-12 flex items-center justify-between">
        <span className="text-[13px] font-semibold" style={{ color: '#546178', letterSpacing: '-0.01em' }}>
          류동현
        </span>
        <div className="flex">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative px-4 py-1.5 text-[11px] font-medium transition-colors duration-200"
              style={{
                color: activeTab === tab.id ? '#F3F6FB' : '#546178',
                letterSpacing: '0.02em',
              }}
              onMouseEnter={e => { if (activeTab !== tab.id) e.currentTarget.style.color = '#98A4BA'; }}
              onMouseLeave={e => { if (activeTab !== tab.id) e.currentTarget.style.color = '#546178'; }}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute -bottom-px left-3 right-3 h-px"
                  style={{ background: 'rgba(243,246,251,0.4)' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
