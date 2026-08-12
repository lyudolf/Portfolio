import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import FadeIn from '../ui/FadeIn';
import MagicBento from '../ui/MagicBento';
import ScrollFloat from '../ui/ScrollFloat';
import ScrollFloatWrapper from '../ui/ScrollFloatWrapper';
import HeroLanding from '../HeroLanding';

/* 히어로 아래 프로젝트 섹션 3개 — 각각 캡슐 → 펼침 → 다시 캡슐로 축소되는 스크롤 모프.
   TODO: image는 프로젝트별 실제 비주얼로 교체 (현재 임시 공용 이미지). */
const MORPH_PROJECTS = [
  {
    tab: 'kisti',
    eyebrow: 'Clinical XR',
    title: 'KISTI',
    period: '2024 — 현재',
    subtitle: '고령자 인지·운동 XR 훈련',
    highlight: '1차 임상 60명 · 3년차 연장',
    tagline: '기준이 없던 곳에, 기준을 세우다.',
    image: '/hero-bg.jpg',
    summary: [
      { head: '문제 정의', items: ['무한 씬의 과도한 시각 부하', 'VR 멀미·공간 적응 부담', '진입 depth 6단계의 혼란'] },
      { head: '해결', items: ['시점 고정 + 공간 대폭 축소', '콜라이더 확대·교수자 중앙 제어', '1~2 depth 단일 흐름 재설계'] },
      { head: '성과', items: ['1차 임상 60명 무이슈 완료', '1년 용역 → 3년차 연장', '사업비 증액·차기 연차 제안'] },
    ],
  },
  {
    tab: 'dream',
    eyebrow: 'Apple Vision Pro',
    title: '꿈키올래',
    period: '2025.09 — 2025.12',
    subtitle: 'XR 직업체험 콘텐츠 9종',
    highlight: '2개월 실개발 · 9종 납품',
    tagline: '불가능한 일정을, 구조로 풀다.',
    image: '/hero-bg.jpg',
    summary: [
      { head: '문제 정의', items: ['9종을 2개월 안에 만들어야 함', '경험 없는 Vision Pro 디바이스', '초등~고등, 넓어진 타깃 연령'] },
      { head: '해결', items: ['3컨셉 × 3직업 프레임워크로 재설계', '폭포수 → 애자일 병렬 파이프라인', '나레이션+자막 이중 가드레일'] },
      { head: '성과', items: ['9종 전량 납기 내 완성', '이전 업체 대비 완성도 호평', '클라이언트 후속 제안 요청'] },
    ],
  },
  {
    tab: 'withai',
    eyebrow: 'AI-lab',
    title: 'AI-lab',
    period: '2026 — 진행 중',
    subtitle: 'AI를 쓰는 기획·실행 사이클',
    highlight: '기획서가 아닌, 출시된 제품으로',
    tagline: '만들어서 증명한다.',
    image: '/hero-bg.jpg',
    summary: [
      { head: '방식', items: ['인간이 설계, AI가 생산, 인간이 검증', '프롬프트로 문서화·소통 가속', '프로토타입으로 불확실성 제거'] },
      { head: '결과물', items: ['웹 3D 게임 7일 단독 개발·배포', '토스 미니앱 3종 출시·심사 진행', 'AI 영상 사내 공모전 1위'] },
      { head: '의미', items: ['기술 feasibility를 직접 검증', '아이디어 → 실물 사이클 단축', '개발팀과의 언어 간극 축소'] },
    ],
  },
];

/* 빠른 타이핑 훅 — active 되면 delay 후 글자가 차라락 생성 */
function useTyped(text, active, delay) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) { setN(0); return; }
    let i = 0; let iv;
    const to = setTimeout(() => {
      iv = setInterval(() => {
        i += 1; setN(i);
        if (i >= text.length) clearInterval(iv);
      }, 12);
    }, delay);
    return () => { clearTimeout(to); clearInterval(iv); };
  }, [active, text, delay]);
  return text.slice(0, n);
}

/* 타이핑 텍스트 — 남은 글자를 투명으로 미리 렌더해 레이아웃 밀림 방지 */
function TypedText({ text, active, delay }) {
  const shown = useTyped(text, active, delay);
  return (
    <>
      {shown}
      <span style={{ opacity: 0 }}>{text.slice(shown.length)}</span>
    </>
  );
}

/* 섹션 2 — 스크롤 모프: 중앙 캡슐이 스크롤에 따라 우측으로 펼쳐지며 정리된 내용 표시 */
function ProjectMorphSection({ data, overlap, onActive, onNavigate }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  /* 스크롤을 스프링으로 보간 — 휠의 계단식 입력을 부드러운 연속 동작으로 */
  const sp = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.5, restDelta: 0.0005 });

  /* 캡슐(처음부터 표시) → 확장(1180×640) → 유지(길게, 읽는 구간) → 좌측 네비로 흡입 */
  const width = useTransform(sp, [0.05, 0.22], [330, 1180]);
  const height = useTransform(sp, [0.05, 0.22], [620, 640]);
  const radius = useTransform(sp, [0.05, 0.22, 0.84, 0.97], [165, 28, 28, 60]);

  /* 흡입 연출: 네비 아이템 좌표를 측정해 그 방향으로 이동+축소.
     좌표 도착 전에 페이드가 끝나도록 페이드를 먼저 시작. */
  const suckTarget = useRef({ x: 0, y: 0 });
  const suck = useTransform(sp, [0.84, 0.97], [0, 1]);
  const x = useTransform(suck, (t) => t * suckTarget.current.x);
  const y = useTransform(suck, (t) => t * suckTarget.current.y);
  const scale = useTransform(suck, (t) => 1 - t * 0.94);

  /* 레이어 전환은 state로 제어 (MotionValue opacity는 일부 환경에서 갱신 누락) */
  const [visible, setVisible] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [typing, setTyping] = useState(false);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setVisible(v <= 0.9);             // 흡입 이동 중에 페이드 시작 → 도착 전에 사라짐
    setExpanded(v > 0.16);            // 흡입 중에도 펼친 내용 유지(통째로 빨려들어감)
    setTyping(v > 0.24 && v < 0.84);
    onActive?.(v > 0.02 && v < 0.98); // 좌측 네비 활성 표시용
    /* 흡입 직전에 네비 아이템 위치 측정 (뷰포트 중앙 기준 오프셋) */
    if (v > 0.7 && v < 0.98) {
      const el = document.getElementById(`morph-nav-${data.tab}`);
      if (el) {
        const r = el.getBoundingClientRect();
        suckTarget.current = {
          x: r.left + r.width / 2 - window.innerWidth / 2,
          y: r.top + r.height / 2 - window.innerHeight / 2,
        };
      }
    }
  });

  const capsule = data;

  return (
    <section ref={ref} id={`morph-sec-${data.tab}`} className="relative"
      style={{ height: '170vh', marginTop: overlap ? '-18vh' : 0 }}>
      <div className="sticky top-0 h-screen flex items-center justify-center px-5 pointer-events-none">
        <motion.div
          className={`relative overflow-hidden ${visible ? 'pointer-events-auto' : ''}`}
          style={{
            width, height, borderRadius: radius, maxWidth: '94vw',
            x, y, scale,
            opacity: visible ? 1 : 0,
            transition: 'opacity .45s ease',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.07) 100%)',
            backdropFilter: 'blur(22px) saturate(1.15)',
            WebkitBackdropFilter: 'blur(22px) saturate(1.15)',
            border: '1px solid rgba(255,255,255,0.4)',
            boxShadow: '0 30px 70px rgba(0,0,0,0.3)',
          }}>

          {/* 레이어 A — 캡슐 요약 */}
          <div
            style={{ opacity: expanded ? 0 : 1, transition: 'opacity .35s ease' }}
            className="absolute inset-0 flex flex-col items-center text-center px-6 pt-[18px] pointer-events-none">
            <div className="overflow-hidden flex-shrink-0" style={{ width: 278, height: 278, borderRadius: '50%' }}>
              <img src={capsule.image} alt={`${capsule.title} ${capsule.subtitle}`} className="w-full h-full object-cover" />
            </div>
            <p className="mt-8 text-[13px] tracking-wide" style={{ color: 'rgba(255,255,255,0.6)' }}>{capsule.eyebrow}</p>
            <h2 className="mt-1 font-medium" style={{ fontSize: 44, color: 'rgba(255,255,255,0.95)', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
              {capsule.title}
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.68)' }}>
              {capsule.period}<br />{capsule.subtitle}
            </p>
            <p className="mt-5 text-[14px] font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>
              {capsule.highlight}
            </p>
            <p className="mt-6 text-[12px]" style={{ color: 'rgba(255,255,255,0.5)' }}>{capsule.tagline}</p>
          </div>

          {/* 레이어 B — 좌: 캡슐 요약 고정 / 우: 타이핑으로 차라락 생성되는 내용 */}
          <div
            key={data.tab}
            style={{ opacity: expanded ? 1 : 0, transition: 'opacity .4s ease' }}
            className={`absolute inset-0 flex flex-col md:flex-row items-stretch gap-6 md:gap-12 p-7 md:p-12 ${typing ? '' : 'pointer-events-none'}`}>

            {/* 좌측 상단 — 캡슐에 있던 요약이 왼쪽 위로 정착 */}
            <div className="hidden md:flex flex-col items-start text-left flex-shrink-0" style={{ width: 240 }}>
              <div className="overflow-hidden" style={{ width: 150, height: 150, borderRadius: '50%' }}>
                <img src={data.image} alt={`${data.title} ${data.subtitle}`} className="w-full h-full object-cover" />
              </div>
              <p className="mt-5 text-[13px] tracking-wide" style={{ color: 'rgba(255,255,255,0.6)' }}>{data.eyebrow}</p>
              <h3 className="mt-0.5 font-medium" style={{ fontSize: 36, color: 'rgba(255,255,255,0.95)', lineHeight: 1.1 }}>{data.title}</h3>
              <p className="mt-3 text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.68)' }}>
                {data.period}<br />{data.subtitle}
              </p>
              <p className="mt-3 text-[13px] font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>
                {data.highlight}
              </p>
              <p className="mt-4 text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>{data.tagline}</p>
            </div>

            {/* 세로 디바이더 — 좌/우 구역 분리 */}
            <div className="hidden md:block w-px flex-shrink-0 self-stretch" style={{ background: 'rgba(255,255,255,0.18)' }} />

            {/* 우측 — 문제 → 해결 → 성과 (빠른 타이핑 생성) */}
            <div className="flex-1 w-full flex flex-col justify-start">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-9">
                {data.summary.map((col, ci) => (
                  <div key={col.head}>
                    <p className="text-[14px] font-semibold tracking-wide mb-4 pb-2.5"
                      style={{ color: 'rgba(255,255,255,0.92)', borderBottom: '1px solid rgba(255,255,255,0.22)' }}>
                      <TypedText text={col.head} active={typing} delay={ci * 90} />
                    </p>
                    <ul className="flex flex-col gap-3">
                      {col.items.map((it, ii) => (
                        <li key={it} className="flex items-start gap-2.5 text-[13px] leading-relaxed"
                          style={{ color: 'rgba(255,255,255,0.75)' }}>
                          <span className="mt-[8px] w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'rgba(255,255,255,0.5)' }} />
                          <span><TypedText text={it} active={typing} delay={300 + (ci * 3 + ii) * 160} /></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-8 flex justify-end">
                <button
                  onClick={() => onNavigate?.(data.tab)}
                  className="rounded-full px-7 py-3 text-[14px] font-semibold cursor-pointer transition-opacity"
                  style={{ background: '#1d211e', color: '#ffffff' }}
                  onMouseOver={(e) => { e.currentTarget.style.opacity = '0.82'; }}
                  onMouseOut={(e) => { e.currentTarget.style.opacity = '1'; }}>
                  자세히 보기 →
                </button>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}

/* 모프 존 — 좌측 고정 네비 + 프로젝트 모프 섹션 3개.
   카드가 사라질 때 해당 네비 텍스트 위치로 빨려들어간다. */
function MorphZone({ items, onNavigate }) {
  const [activeSet, setActiveSet] = useState(() => new Set());
  const setActive = (i, inView) => {
    setActiveSet((prev) => {
      const nxt = new Set(prev);
      if (inView) nxt.add(i); else nxt.delete(i);
      return nxt;
    });
  };
  const current = Math.min(...(activeSet.size ? [...activeSet] : [Infinity]));

  return (
    <div className="relative">
      {/* 좌측 고정 네비 — 상시 노출 */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-6">
        {items.map((p, i) => {
          const isActive = i === current;
          return (
            <button
              key={p.tab}
              id={`morph-nav-${p.tab}`}
              onClick={() => document.getElementById(`morph-sec-${p.tab}`)?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-3 text-left cursor-pointer transition-all duration-300">
              {/* 가로선 인디케이터 — 활성 시 길어짐 */}
              <span className="flex-shrink-0 transition-all duration-300"
                style={{
                  width: isActive ? 36 : 18, height: 2,
                  background: isActive ? '#ffffff' : 'rgba(255,255,255,0.7)',
                  boxShadow: isActive ? '0 0 12px rgba(255,255,255,0.8)' : '0 1px 6px rgba(0,0,0,0.4)',
                }} />
              <span className="transition-colors duration-300"
                style={{
                  fontSize: isActive ? 17 : 15,
                  fontWeight: isActive ? 700 : 600,
                  letterSpacing: '0.02em',
                  color: isActive ? '#ffffff' : 'rgba(255,255,255,0.72)',
                  textShadow: '0 2px 10px rgba(0,0,0,0.6)',
                }}>
                {p.title}
              </span>
            </button>
          );
        })}
      </div>

      {items.map((p, i) => (
        <ProjectMorphSection key={p.tab} data={p} overlap={i > 0}
          onActive={(inView) => setActive(i, inView)}
          onNavigate={onNavigate} />
      ))}
    </div>
  );
}

export default function About({ onNavigate }) {
  return (
    <div style={{
      /* 이끼 배경(1:2 세로형)이 페이지 상단부터 스크롤 따라 이어지고,
         섹션 4를 지나며 다크로 페이드 → 하단 다크 콘텐츠 연결. */
      backgroundColor: '#080A0F',
      backgroundImage:
        "linear-gradient(180deg, rgba(8,10,15,0) 0%, rgba(8,10,15,0.18) 150vh, rgba(8,10,15,0.4) 330vh, rgba(8,10,15,0.82) 520vh, #080A0F 590vh), url('/hero-bg.jpg')",
      backgroundSize: 'auto, 100% auto',
      backgroundPosition: 'top center',
      backgroundRepeat: 'no-repeat',
    }}>
      {/* Hero — 3D 자연 오브 랜딩 (섹션 1) */}
      <HeroLanding onNavigate={onNavigate} />

      {/* 섹션 2~4 — 좌측 고정 네비 + 캡슐 → 확장 → 네비로 흡입 사이클 */}
      <MorphZone items={MORPH_PROJECTS} onNavigate={onNavigate} />

      {/* 이끼 존 → 다크 존 전환 */}
      <div style={{ height: '18vh', background: 'linear-gradient(180deg, rgba(8,10,15,0) 0%, #080A0F 100%)' }} />

      {/* 다크 존 — 기존 벤토/Key Results/Profile (다크 스타일 유지) */}
      <div style={{ background: '#080A0F' }}>
      {/* Sector 2 — Bento Grid with ScrollFloat title */}
      <section className="min-h-[100vh] flex flex-col items-center justify-center max-w-5xl mx-auto px-8">
        <ScrollFloat
          containerClassName="text-center mb-10"
          textClassName="font-bold text-white"
        >
          About
        </ScrollFloat>

        <MagicBento gridClassName="grid grid-cols-4 gap-3" gridStyle={{ gridAutoRows: '160px' }}>

            {/* Row 1 — Top-left: 2 small cards */}
            <ScrollFloatWrapper delay={0} style={{ gridColumn: '1 / 2', gridRow: '1 / 2' }}>
              <MagicBento.Card className="col-span-2 row-span-1 p-6 flex flex-col justify-between h-full">
                <p className="text-label" style={{ color: 'rgba(167,139,250,0.5)' }}>XR Planning</p>
                <div>
                  <h3 className="text-sm font-semibold mb-0.5" style={{ color: 'rgba(243,246,251,0.9)' }}>서비스 기획</h3>
                  <p className="text-caption">사용자 리서치 기반 경험 설계</p>
                </div>
              </MagicBento.Card>
            </ScrollFloatWrapper>

            <ScrollFloatWrapper delay={0.05} style={{ gridColumn: '2 / 3', gridRow: '1 / 2' }}>
              <MagicBento.Card className="col-span-2 row-span-1 p-6 flex flex-col justify-between h-full">
                <p className="text-label" style={{ color: 'rgba(167,139,250,0.5)' }}>PM</p>
                <div>
                  <h3 className="text-sm font-semibold mb-0.5" style={{ color: 'rgba(243,246,251,0.9)' }}>프로젝트 매니징</h3>
                  <p className="text-caption">일정·리스크·커뮤니케이션 관리</p>
                </div>
              </MagicBento.Card>
            </ScrollFloatWrapper>

            {/* Row 1-2 — Top-right: tall card (spans 2 rows) */}
            <ScrollFloatWrapper delay={0.1} style={{ gridColumn: '3 / 5', gridRow: '1 / 3' }}>
              <MagicBento.Card className="p-7 flex flex-col justify-between h-full">
                <p className="text-label" style={{ color: 'rgba(111,216,255,0.5)' }}>01 — Clinical XR</p>
                <div>
                  <h3 className="text-subhead mb-1" style={{ color: 'rgba(243,246,251,0.9)' }}>KISTi</h3>
                  <p className="text-caption leading-relaxed">고령자 XR 인지·운동 훈련 시스템.<br />임상 환경에서 실제로 운영되는 구조를 설계.</p>
                </div>
              </MagicBento.Card>
            </ScrollFloatWrapper>

            {/* Row 2-3 — Middle-left: wide tall card (spans 2 cols, 2 rows) */}
            <ScrollFloatWrapper delay={0.15} style={{ gridColumn: '1 / 3', gridRow: '2 / 4' }}>
              <MagicBento.Card className="p-7 flex flex-col justify-between h-full">
                <p className="text-label" style={{ color: 'rgba(216,165,75,0.5)' }}>02 — Career XR</p>
                <div>
                  <h3 className="text-subhead mb-1" style={{ color: 'rgba(243,246,251,0.9)' }}>꿈키올래</h3>
                  <p className="text-caption leading-relaxed">Apple Vision Pro 기반 XR 직업체험 9종.<br />3개월 내 기획·구축 완료.</p>
                </div>
              </MagicBento.Card>
            </ScrollFloatWrapper>

            {/* Row 3 — Bottom-right: 2 small cards */}
            <ScrollFloatWrapper delay={0.2} style={{ gridColumn: '3 / 4', gridRow: '3 / 4' }}>
              <MagicBento.Card className="p-6 flex flex-col justify-between h-full">
                <p className="text-label" style={{ color: 'rgba(167,139,250,0.5)' }}>UX Design</p>
                <div>
                  <h3 className="text-sm font-semibold mb-0.5" style={{ color: 'rgba(243,246,251,0.9)' }}>인터랙션 설계</h3>
                  <p className="text-caption">디바이스별 UX 최적화</p>
                </div>
              </MagicBento.Card>
            </ScrollFloatWrapper>

            <ScrollFloatWrapper delay={0.25} style={{ gridColumn: '4 / 5', gridRow: '3 / 4' }}>
              <MagicBento.Card className="p-6 flex flex-col justify-between h-full">
                <p className="text-label" style={{ color: 'rgba(167,139,250,0.5)' }}>QA & Ops</p>
                <div>
                  <h3 className="text-sm font-semibold mb-0.5" style={{ color: 'rgba(243,246,251,0.9)' }}>품질 관리</h3>
                  <p className="text-caption">운영 구조 구축</p>
                </div>
              </MagicBento.Card>
            </ScrollFloatWrapper>

          </MagicBento>

        {/* Key Results — 검증된 정량성과 */}
        <div className="mt-20 w-full">
          <FadeIn>
            <p className="text-label mb-6 text-center" style={{ color: 'rgba(111,216,255,0.45)' }}>Key Results</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { num: '3배+', label: '팀 매출 성장 견인', desc: '3.8억 → 11.5억 (전년 대비), B2G XR 사업 기획·PM 총괄' },
                { num: '3년차', label: '1년 용역 → 계속 연장', desc: '1차 임상 60명 무이슈 완료, 클라이언트 신뢰로 5·6년차 논의 중' },
                { num: '금상', label: '웹어워드 코리아 수상', desc: 'B2B 웹 구축 기획 주도, 신규 제안 수주 100% 기여' },
              ].map(item => (
                <div key={item.label} className="p-6 rounded-2xl text-center"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <p className="text-[28px] font-extrabold mb-1" style={{ color: 'rgba(111,216,255,0.85)' }}>{item.num}</p>
                  <p className="text-sm font-semibold mb-2" style={{ color: 'rgba(243,246,251,0.85)' }}>{item.label}</p>
                  <p className="text-caption leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Profile */}
        <div className="mt-16">
          <FadeIn>
            <div className="flex flex-col md:flex-row gap-12">
              {[
                { label: '역할', value: 'PM · 서비스 기획 · UX 설계' },
                { label: '도메인', value: 'XR · B2B 웹 · B2G' },
                { label: '특기', value: '구조 설계 · 제약 해결' },
              ].map(item => (
                <div key={item.label}>
                  <p className="text-label mb-2" style={{ color: '#546178' }}>{item.label}</p>
                  <p className="text-sm font-medium" style={{ color: 'rgba(243,246,251,0.7)' }}>{item.value}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
      </div>
    </div>
  );
}
