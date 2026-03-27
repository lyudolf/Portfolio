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
      className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div
        className="flex items-center gap-1 px-2 py-2 rounded-full pointer-events-auto"
        style={{
          background: 'rgba(12, 14, 20, 0.75)',
          backdropFilter: 'blur(24px) saturate(1.6)',
          border: '1px solid rgba(243, 200, 247, 0.22)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.03) inset',
        }}
      >
        {TABS.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative px-10 py-2 text-[12px] font-medium rounded-full transition-colors duration-200"
              style={{
                color: isActive ? '#F3F6FB' : '#546178',
                letterSpacing: '0.02em',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#98A4BA'; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#546178'; }}
            >
              {isActive && (
                <motion.div
                  layoutId="pill-indicator"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'rgba(167, 139, 250, 0.12)',
                    border: '1px solid rgba(167, 139, 250, 0.2)',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}
