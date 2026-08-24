import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/* 네비 = "What I ___" 문장 완성.
   좌측 고정 텍스트가 문두를 잡고, 각 탭이 빈칸을 채운다.
   낯선 단어라 스캔이 느려지는 문제는 활성 탭에 페이지명을 병기해 보완.
   이력서는 문법이 안 만들어져 시스템 밖 CTA로 분리.

   디자인은 흰 프레임 카드와 같은 계열(흰 바탕 + 잉크 텍스트)로 얇게.
   콘텐츠 가림을 줄이기 위해 스크롤 다운 시 숨고, 업 시 다시 나타난다. */
const TABS = [
  { id: 'about', label: 'am', page: 'About' },
  { id: 'kisti', label: 'Do', page: 'Work' },
  { id: 'solo', label: 'Made', page: 'Solo' },
  { id: 'withai', label: 'Try', page: 'AI-lab' },
  { id: 'whyme', label: 'Bring', page: 'Why Me' },
];

/* 하위 상세 페이지에 있을 때 어느 상위 탭을 활성 표시할지 */
const PARENT_TAB = {
  dream: 'kisti',
  'kocca-detail': 'kisti',
  webmind: 'kisti',
  'leaf-detail': 'withai',
  'etribe-detail': 'withai',
  'rl-detail': 'withai',
};

const INK = 'rgba(24,32,27,0.85)';
const INK_MID = 'rgba(24,32,27,0.55)';
const INK_DIM = 'rgba(24,32,27,0.38)';

/* 스크롤 방향 감지 — 내리면 숨김, 올리면 표시. 최상단 근처에선 항상 표시. */
function useScrollHidden() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      if (Math.abs(delta) > 8) {
        setHidden(delta > 0 && y > 200);
        lastY = y;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return hidden;
}

export default function Nav({ activeTab, onTabChange }) {
  const current = PARENT_TAB[activeTab] ?? activeTab;
  const hidden = useScrollHidden();

  return (
    <motion.nav
      className="fixed bottom-4 left-0 right-0 z-50 flex justify-center pointer-events-none"
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: hidden ? 76 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div
        className="flex items-center gap-0.5 pl-1 pr-1 py-1 rounded-full pointer-events-auto"
        style={{
          background: 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(16px) saturate(1.3)',
          WebkitBackdropFilter: 'blur(16px) saturate(1.3)',
          border: '1px solid rgba(24,32,27,0.1)',
          boxShadow: '0 4px 20px rgba(20,28,24,0.12)',
        }}
      >
        {/* 문두 — 클릭 불가 고정 텍스트 */}
        <span
          className="pl-2 md:pl-3 pr-1 text-[10.5px] md:text-[11.5px] font-medium select-none whitespace-nowrap"
          style={{ color: INK_DIM, letterSpacing: '0.02em', fontStyle: 'italic' }}
        >
          What I...
        </span>

        {TABS.map(tab => {
          const isActive = current === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              title={tab.page}
              className="relative px-2 md:px-3.5 py-1 text-[10.5px] md:text-[11.5px] font-semibold rounded-full transition-colors duration-200 cursor-pointer"
              style={{ color: isActive ? INK : INK_MID, letterSpacing: '0.02em' }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = INK; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = INK_MID; }}
            >
              {isActive && (
                <motion.div
                  layoutId="pill-indicator"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'rgba(24,32,27,0.07)',
                    border: '1px solid rgba(24,32,27,0.1)',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
              <span className="relative z-10">
                {tab.label}
                {/* 활성 탭에만 페이지명 병기 — 낯선 단어의 스캔 속도 보완 */}
                {isActive && (
                  <span className="hidden md:inline" style={{ color: INK_DIM, marginLeft: 5, fontSize: 10 }}>
                    {tab.page}
                  </span>
                )}
              </span>
            </button>
          );
        })}

        {/* 이력서 — 문장 시스템 밖의 실전 문서, 잉크 채움 pill로 구분 */}
        <button
          onClick={() => onTabChange('resume')}
          className="relative ml-0.5 px-2.5 md:px-4 py-1 text-[10.5px] md:text-[11.5px] font-bold rounded-full transition-all duration-200 cursor-pointer"
          style={{
            background: current === 'resume' ? '#12211a' : 'rgba(24,32,27,0.85)',
            color: '#fff',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#12211a'; }}
          onMouseLeave={e => { if (current !== 'resume') e.currentTarget.style.background = 'rgba(24,32,27,0.85)'; }}
        >
          이력서
        </button>
      </div>
    </motion.nav>
  );
}
