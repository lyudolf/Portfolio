import { motion } from 'framer-motion';
import HeroShowcase from '../ui/HeroShowcase';

/* 랜딩 = 히어로(첫 화면 요약) + 역량 + 대표작 + 연락.
   히어로는 Work(ProjectShowcase)와 같은 흰 프레임 · 홈 탭 · 대형 타이포 문법을 쓴다.
   랜딩과 Work가 따로 노는 문제를 컨테이너 자체로 해결한 구조라,
   본문 섹션도 Work 상세와 마찬가지로 프레임 안쪽에 들어간다.
   깊은 내용은 Work · Solo Work · AI-lab · Why Me · 이력서가 담당한다. */

/* 공통 잉크 — Work 상세 페이지와 같은 값 */
const INK = 'rgba(24,32,27,0.88)';
const INK_60 = 'rgba(24,32,27,0.6)';
const INK_45 = 'rgba(24,32,27,0.45)';
const BORDER = 'rgba(24,32,27,0.08)';
const CARD = 'rgba(255,255,255,0.6)';
const ACCENT = '#0f8f74';

/* 역량 키워드 — 채용담당자가 스캔하는 지점 */
const CAPABILITIES = [
  '서비스 기획 · PO',
  '요구사항 정의 · IA',
  'XR · 3D 콘텐츠 설계',
  'AI 프로덕트 기획',
  '프로토타이핑 · 실행',
  'QA · 운영 설계',
];

/* 대표작 — 색·워드마크를 Work 쇼케이스 패널과 맞춰 같은 계보로 읽히게 한다 */
const FEATURED = [
  {
    tab: 'kisti', name: 'KISTI', sub: '고령자 인지-운동 융합 훈련 VR',
    meta: '2024 — 현재 · 단독 기획 · PM',
    bg: '#1540c9', bgSoft: '#2f66ee', accent: '#8ee4ff',
  },
  {
    tab: 'dream', name: '꿈키올래', sub: 'Vision Pro 직업체험 9종',
    meta: '2025 · PM · 기획 · QA',
    bg: '#3a2a10', bgSoft: '#5a4218', accent: '#e8bd6d',
  },
  {
    tab: 'kocca-detail', name: 'KOCCA', sub: 'LLM 실시간 생성 과학수사 체험',
    meta: '2026 · 국가과제 진행 중',
    bg: '#3b1428', bgSoft: '#5c1f3d', accent: '#f9a8d4',
  },
];

const CHANNELS = [
  {
    id: 'email',
    label: '이메일',
    value: 'iplay3473@gmail.com',
    href: 'mailto:iplay3473@gmail.com',
    hint: '가장 빠른 연락 수단입니다',
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'github.com/lyudolf',
    href: 'https://github.com/lyudolf',
    hint: '직접 만든 것들이 올라가 있습니다',
  },
];

function SectionLabel({ children }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="text-[11px] font-bold tracking-[0.3em] uppercase mb-6"
      style={{ color: ACCENT }}
    >
      {children}
    </motion.p>
  );
}

function CapabilitiesSection() {
  return (
    <section className="px-8 pb-4" style={{ maxWidth: 1100, margin: '0 auto' }}>
      <SectionLabel>What I Do</SectionLabel>
      <div className="flex flex-wrap gap-2">
        {CAPABILITIES.map((c, i) => (
          <motion.span
            key={c}
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="text-[13px] font-medium px-4 py-2 rounded-full"
            style={{ background: CARD, border: `1px solid ${BORDER}`, color: INK }}
          >
            {c}
          </motion.span>
        ))}
      </div>
    </section>
  );
}

/* 각 카드가 해당 프로젝트 쇼케이스 패널의 축소판 — 색·워드마크·서브가 그대로 이어진다 */
function FeaturedSection({ onNavigate }) {
  return (
    <section className="px-8 py-16" style={{ maxWidth: 1100, margin: '0 auto' }}>
      <div className="flex items-baseline justify-between mb-6">
        <SectionLabel>Selected Work</SectionLabel>
        <button onClick={() => onNavigate?.('kisti')}
          className="text-[12px] font-semibold cursor-pointer transition-colors"
          style={{ color: INK_45 }}
          onMouseEnter={(e) => { e.currentTarget.style.color = INK; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = INK_45; }}>
          전체 보기 →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {FEATURED.map((f, i) => (
          <motion.button
            key={f.tab}
            onClick={() => onNavigate?.(f.tab)}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="text-left overflow-hidden cursor-pointer"
            style={{
              borderRadius: 22,
              background: '#fff',
              border: `1px solid ${BORDER}`,
              boxShadow: '0 8px 24px rgba(24,32,27,0.05)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 16px 36px rgba(24,32,27,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(24,32,27,0.05)';
            }}
          >
            {/* 미니 패널 — 쇼케이스 히어로와 같은 그라디언트·대형 워드마크 */}
            <div className="relative flex items-end px-5"
              style={{
                height: 132,
                background: `linear-gradient(150deg, ${f.bgSoft} 0%, ${f.bg} 62%)`,
              }}>
              <span style={{
                position: 'absolute', left: 18, bottom: 10,
                fontSize: 42, fontWeight: 900, letterSpacing: '-0.055em', lineHeight: 0.92,
                backgroundImage:
                  'linear-gradient(180deg, rgba(255,255,255,0.82) 26%, rgba(255,255,255,0.4) 68%, rgba(255,255,255,0.06) 100%)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text',
                color: 'transparent', WebkitTextFillColor: 'transparent',
                whiteSpace: 'nowrap',
              }}>
                {f.name}
              </span>
              <span style={{
                position: 'absolute', right: 16, top: 14,
                width: 7, height: 7, borderRadius: 99, background: f.accent,
              }} />
            </div>

            <div className="px-5 py-4">
              <p className="text-[14px] font-bold mb-1.5" style={{ color: INK }}>{f.sub}</p>
              <p className="text-[11.5px]" style={{ color: INK_45 }}>{f.meta}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

function ContactSection({ onNavigate }) {
  return (
    <section className="px-8 pt-4 pb-20" style={{ maxWidth: 1100, margin: '0 auto' }}>
      <SectionLabel>Let&apos;s talk</SectionLabel>
      <h2 className="text-[28px] md:text-[38px] font-extrabold leading-[1.22] mb-5"
        style={{ color: INK, letterSpacing: '-0.03em' }}>
        서비스 기획 · PO 포지션을<br />찾고 있습니다
      </h2>
      <p className="text-[14px] md:text-[15px] leading-[1.9] mb-10"
        style={{ color: INK_60, maxWidth: 560 }}>
        문제 정의부터 실행까지 함께 만들 팀이라면, 도메인을 가리지 않고 이야기 나누고 싶습니다.
        이력서는 아래에서 바로 보실 수 있습니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10" style={{ maxWidth: 760 }}>
        {CHANNELS.map((c) => (
          <a key={c.id} href={c.href}
            target={c.id === 'github' ? '_blank' : undefined}
            rel={c.id === 'github' ? 'noopener noreferrer' : undefined}
            className="block p-6 rounded-2xl transition-all"
            style={{ background: CARD, border: `1px solid ${BORDER}` }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.borderColor = 'rgba(15,143,116,0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = CARD;
              e.currentTarget.style.borderColor = BORDER;
            }}>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: ACCENT }}>
              {c.label}
            </p>
            <p className="text-[16px] font-semibold mb-1.5" style={{ color: INK }}>{c.value}</p>
            <p className="text-[12px]" style={{ color: INK_45 }}>{c.hint}</p>
          </a>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <button onClick={() => onNavigate?.('resume')}
          className="px-6 py-3 rounded-full text-[13px] font-bold cursor-pointer transition-transform"
          style={{ background: '#12211a', color: '#fff' }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}>
          이력서 보기
        </button>
        <button onClick={() => onNavigate?.('whyme')}
          className="px-6 py-3 rounded-full text-[13px] font-semibold cursor-pointer transition-all"
          style={{ background: CARD, border: `1px solid ${BORDER}`, color: INK }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#fff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = CARD; }}>
          왜 저인가
        </button>
      </div>
    </section>
  );
}

export default function About({ onNavigate }) {
  return (
    <div
      className="relative w-full overflow-x-hidden"
      style={{ backgroundColor: '#eef0ec', color: '#1a231e' }}
    >
      <div className="px-4 md:px-6 py-6">
        <div style={{ maxWidth: 1640, margin: '0 auto' }}>
          <HeroShowcase onNavigate={onNavigate}>
            <CapabilitiesSection />
            <FeaturedSection onNavigate={onNavigate} />
            <ContactSection onNavigate={onNavigate} />
          </HeroShowcase>
        </div>
      </div>
    </div>
  );
}
