import { useFrameMetrics } from '../../lib/useMedia';

/* ══════════════════════════════════════════
   FrameCard — 사이트 공통 컨테이너 문법

   흰 프레임 · 상단 홈 탭(워드마크) · 컬러/사진 패널 ·
   하단 중앙 홈 + 스크롤 버튼 · 프레임 안으로 들어오는 본문.

   랜딩(HeroShowcase)과 Solo Work가 같은 값을 쓰도록 한곳에 모았다.
   ProjectShowcase는 스위처·페이지네이션이 얽혀 있어 아직 자체 구현.
   ══════════════════════════════════════════ */

/**
 * @param {string} label      상단 홈 탭의 워드마크 (예: '유희수', 'KISTI')
 * @param {string} meta       워드마크 옆 작은 설명
 * @param {string} accent     탭 점 색
 * @param {object} panelStyle 패널에 적용할 background 등 (borderRadius·mask는 여기서 관리)
 * @param {number} minHeight  패널 최소 높이 (모바일/데스크톱 각각)
 * @param {node}   panel      패널 안에 들어갈 내용
 * @param {node}   children   프레임 안, 패널 아래로 흐르는 본문
 * @param {string} scrollBtnColor 하단 홈 버튼 글자색
 */
export default function FrameCard({
  label,
  meta,
  accent,
  panelStyle,
  minHeight,
  mobileMinHeight,
  panel,
  children,
  scrollBtnColor = '#12211a',
}) {
  const { isMobile, NOTCH, TAB_H, FILLET } = useFrameMetrics();

  const notchMask =
    `radial-gradient(circle ${NOTCH}px at 50% 100%, transparent 0 ${NOTCH}px, #000 ${NOTCH + 1}px)`;

  const scrollDown = () =>
    window.scrollTo({ top: Math.round(window.innerHeight * 0.92), behavior: 'smooth' });

  return (
    <div
      className="relative w-full"
      style={{
        background: '#ffffff',
        borderRadius: isMobile ? 30 : 44,
        padding: isMobile ? 8 : 13,
        boxShadow: '0 20px 56px rgba(20,28,24,0.2), 0 0 0 1px rgba(24,32,27,0.05)',
      }}
    >
      <div className="relative">
        {/* 상단 홈 — 프레임이 패널 위로 파고든 탭.
            양옆 필렛이 오목하게 이어져 깎아낸 것처럼 보인다. */}
        <div className="absolute left-1/2 z-30 flex items-start pointer-events-none"
          style={{ top: 0, transform: 'translateX(-50%)' }}>
          <div style={{
            width: FILLET, height: FILLET, marginRight: -1,
            background: `radial-gradient(circle ${FILLET}px at 0 100%, transparent ${FILLET - 0.5}px, #fff ${FILLET}px)`,
          }} />
          <div className="flex items-center justify-center gap-2"
            style={{
              height: TAB_H,
              minWidth: isMobile ? 240 : 420,
              padding: isMobile ? '0 18px' : '0 26px',
              background: '#fff',
              borderRadius: `0 0 ${TAB_H * 0.55}px ${TAB_H * 0.55}px`,
            }}>
            <span style={{ width: 7, height: 7, borderRadius: 99, background: accent, flexShrink: 0 }} />
            <span style={{
              fontSize: isMobile ? 14 : 16, fontWeight: 800, letterSpacing: '-0.02em',
              color: 'rgba(24,32,27,0.88)', whiteSpace: 'nowrap',
            }}>
              {label}
            </span>
            <span style={{
              fontSize: isMobile ? 10.5 : 12, fontWeight: 600,
              color: 'rgba(24,32,27,0.35)', whiteSpace: 'nowrap',
            }}>
              {meta}
            </span>
          </div>
          <div style={{
            width: FILLET, height: FILLET, marginLeft: -1,
            background: `radial-gradient(circle ${FILLET}px at 100% 100%, transparent ${FILLET - 0.5}px, #fff ${FILLET}px)`,
          }} />
        </div>

        {/* 패널 */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            borderRadius: isMobile ? 24 : 33,
            minHeight: isMobile ? (mobileMinHeight ?? 660) : (minHeight ?? 700),
            WebkitMaskImage: notchMask,
            maskImage: notchMask,
            ...panelStyle,
          }}
        >
          {panel}
        </div>

        {/* 홈에 앉는 스크롤 버튼 — 지름을 홈 구멍(2×NOTCH)과 정확히 맞추고
           중심을 패널 모서리에 둬서, 배경과 흰 원의 경계가 홈 곡선과 맞물린다.
           원이 움직이면 틈이 보이므로 hover는 화살표만 움직인다. */}
        <button
          onClick={scrollDown}
          aria-label="아래 내용으로 이동"
          className="group absolute left-1/2 z-40 flex items-center justify-center rounded-full cursor-pointer"
          style={{
            bottom: -NOTCH,
            transform: 'translateX(-50%)',
            width: NOTCH * 2,
            height: NOTCH * 2,
            background: '#ffffff',
            color: scrollBtnColor,
            fontSize: NOTCH * 0.55,
            lineHeight: 1,
          }}
        >
          <span className="flex flex-col items-center transition-transform duration-200 group-hover:translate-y-[3px]"
            style={{ marginTop: -NOTCH * 0.35 /* 보이는 건 위 반원뿐이라 화살표를 그쪽으로 */ }}>
            <span>↓</span>
            <span style={{
              fontSize: 9.5, fontWeight: 700, letterSpacing: '0.06em',
              opacity: 0.5, marginTop: 3, whiteSpace: 'nowrap',
            }}>
              click me!
            </span>
          </span>
        </button>
      </div>

      {/* 프레임 안으로 들어오는 본문 섹션 */}
      {children && <div style={{ paddingTop: isMobile ? 24 : 40 }}>{children}</div>}
    </div>
  );
}
