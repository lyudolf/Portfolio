import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * InfiniteGallery
 * - 상단: 선택된 이미지 크게 표시 + 제목
 * - 하단: 무한 루프 썸네일 캐러셀 + 좌우 화살표
 *
 * Props:
 *   items: [{ src, title }]  — 갤러리 아이템 배열
 */
export default function InfiniteGallery({ items = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1: left, 1: right
  const stripRef = useRef(null);

  if (!items.length) return null;

  const count = items.length;

  // 무한 루프 인덱스 계산
  const wrap = (i) => ((i % count) + count) % count;

  const goPrev = () => {
    setDirection(-1);
    setActiveIndex(prev => wrap(prev - 1));
  };

  const goNext = () => {
    setDirection(1);
    setActiveIndex(prev => wrap(prev + 1));
  };

  // 보이는 썸네일 수 (홀수로 유지해 가운데 정렬)
  const VISIBLE = 7;
  const half = Math.floor(VISIBLE / 2);

  // 무한 루프 기반으로 보이는 인덱스 배열 생성
  const visibleIndices = [];
  for (let offset = -half; offset <= half; offset++) {
    visibleIndices.push(wrap(activeIndex + offset));
  }

  // 메인 이미지 슬라이드 애니메이션
  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="w-full">
      {/* ── 메인 이미지 영역 ── */}
      <div
        className="relative w-full overflow-hidden rounded-xl mb-4"
        style={{
          aspectRatio: '16 / 9',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <AnimatePresence custom={direction} mode="wait">
          <motion.img
            key={activeIndex}
            src={items[activeIndex].src}
            alt={items[activeIndex].title}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      {/* ── 메인 이미지 제목 ── */}
      <AnimatePresence mode="wait">
        <motion.p
          key={activeIndex}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="text-center text-sm font-semibold mb-6"
          style={{ color: 'rgba(243,246,251,0.8)' }}
        >
          {items[activeIndex].title}
        </motion.p>
      </AnimatePresence>

      {/* ── 썸네일 스트립 + 화살표 ── */}
      <div className="flex items-center gap-3">
        {/* 좌 화살표 */}
        <button
          onClick={goPrev}
          className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(243,246,251,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* 썸네일 스트립 */}
        <div ref={stripRef} className="flex-1 flex items-center justify-center gap-2 overflow-hidden">
          {visibleIndices.map((idx, pos) => {
            const isCenter = pos === half;
            return (
              <motion.button
                key={`${idx}-${pos}`}
                onClick={() => {
                  const offset = pos - half;
                  if (offset < 0) setDirection(-1);
                  else if (offset > 0) setDirection(1);
                  setActiveIndex(idx);
                }}
                className="shrink-0 rounded-lg overflow-hidden cursor-pointer transition-all duration-300"
                style={{
                  width: isCenter ? 96 : 72,
                  height: isCenter ? 64 : 48,
                  border: isCenter
                    ? '2px solid rgba(216,165,75,0.6)'
                    : '1px solid rgba(255,255,255,0.06)',
                  opacity: isCenter ? 1 : 0.45 + (1 - Math.abs(pos - half) / half) * 0.25,
                }}
                whileHover={{ opacity: 0.9, scale: 1.05 }}
                layout
              >
                <img
                  src={items[idx].src}
                  alt={items[idx].title}
                  className="w-full h-full object-cover"
                />
              </motion.button>
            );
          })}
        </div>

        {/* 우 화살표 */}
        <button
          onClick={goNext}
          className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(243,246,251,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
