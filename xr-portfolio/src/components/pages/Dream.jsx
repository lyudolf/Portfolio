import { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import InfiniteGallery from '../ui/InfiniteGallery';

/* ══════════════════════════════════════════
   DATA
   ══════════════════════════════════════════ */

const META_BADGES = [
  { label: 'PM · 기획 · 컨셉 설계 · QA' },
  { label: '2025.09 — 2025.11' },
  { label: 'Apple Vision Pro' },
  { label: 'Unity · visionOS' },
];

const GALLERY_ITEMS = [
  { src: '/images/dream/1.png', title: '꿈키 MARS — 우주 탐사 체험' },
  { src: '/images/dream/2.png', title: '밀실사건수사대 — 증거 수집 장면' },
  { src: '/images/dream/3.png', title: '꿈키 엔터테인먼트 — 리듬게임 UI' },
  { src: '/images/dream/4.png', title: 'Vision Pro 핸드트래킹 인터랙션' },
  { src: '/images/dream/5.png', title: '공간 UI 프로토타입 테스트' },
  { src: '/images/dream/6.png', title: '사용자 체험 세션 현장' },
  { src: '/images/dream/7.png', title: '아이트래킹 UX 검증' },
  { src: '/images/dream/8.jpg', title: '세계관 컨셉 아트 — MARS' },
];

const CHALLENGE_POINTS = [
  { num: '01', title: '불가능한 일정', result: '3개 컨셉 × 3개 직업 공통 프레임워크로 전환, 납기 내 9종 완성' },
  { num: '02', title: '미지의 디바이스', result: 'Vision Pro 핸드트래킹·아이트래킹 기반 인터랙션 패턴 자체 정립' },
  { num: '03', title: '넓은 타겟 연령', result: '초등 저학년~고등학생까지 커버하는 이중 가드레일 UX 설계' },
];

const WORLDS = [
  {
    id: 'mars',
    name: '꿈키 MARS',
    desc: '허공에 주먹을 쥐면 조종간이 생성되고, 이를 통해 기기를 조작하는 방식. Vision Pro의 공간 인터랙션을 직업체험에 재해석했습니다.',
    jobs: '기계공학자 · 우주자원개발자 · 바이오식품공학자',
    accent: 'rgba(216,165,75,0.12)',
    border: 'rgba(216,165,75,0.18)',
  },
  {
    id: 'crime',
    name: '밀실사건수사대',
    desc: '하나의 사건을 중심으로 증거 수집-분석-결과 도출이 이어지는 구조. 각 직업 체험이 사건 서사 안에서 연결됩니다.',
    jobs: '과학수사관 · 국과수 직무 · 프로파일러',
    accent: 'rgba(140,109,216,0.12)',
    border: 'rgba(140,109,216,0.18)',
  },
  {
    id: 'ent',
    name: '꿈키 엔터테인먼트',
    desc: '광선응원봉으로 노트를 쳐내는 리듬게임 구조. HMD 밖으로 손이 나가도 오브젝트가 유지되도록 설계했습니다.',
    jobs: '작곡가 · 공연기획자 · 아이돌',
    accent: 'rgba(244,114,182,0.12)',
    border: 'rgba(244,114,182,0.18)',
  },
];

const UX = [
  { title: '시선 + 제스처 조작', desc: '아이트래킹 기반 조준 후 엄지·검지 클릭. 눈이 좋지 않은 사용자를 위해 head raycast 접근성 옵션 추가', icon: '👁️' },
  { title: '이중 가드레일', desc: '음성 나레이션 + 하단 자막으로 "다음에 뭘 해야 하지?"를 최소화. 시각·청각 동시 안내 체계', icon: '🛡️' },
  { title: '텍스트 최소화', desc: '긴 텍스트 대신 그림·자막·나레이션 중심. 초등학생 저학년까지 고려한 정보 밀도 조절', icon: '✨' },
];

/* ── Animation ── */
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } } };
const stagger = { visible: { transition: { staggerChildren: 0.06 } } };

/* ── Color tokens ── */
const C = {
  accent: 'rgba(216,165,75,0.55)',
  accentDim: 'rgba(216,165,75,0.35)',
  text92: 'rgba(243,246,251,0.92)',
  text45: 'rgba(243,246,251,0.45)',
  text60: 'rgba(243,246,251,0.6)',
  border: 'rgba(255,255,255,0.06)',
  cardBg: 'rgba(255,255,255,0.03)',
  cardBorder: 'rgba(255,255,255,0.07)',
};

/* ══════════════════════════════════════════
   COMPONENTS
   ══════════════════════════════════════════ */

/* ── HeroSection (auto curtain reveal) ── */
function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* Curtain left */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 z-20 flex items-center justify-end pr-10"
        initial={{ x: '0%' }}
        animate={{ x: '-100%' }}
        transition={{ duration: 1.0, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
        style={{ background: '#0C0A12' }}
      >
        <p className="text-[22px] md:text-[28px] font-extrabold tracking-[0.35em] uppercase"
          style={{ color: 'rgba(216,165,75,0.7)' }}>
          Career XR
        </p>
      </motion.div>
      {/* Curtain right */}
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 z-20 flex items-center pl-10"
        initial={{ x: '0%' }}
        animate={{ x: '100%' }}
        transition={{ duration: 1.0, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
        style={{ background: '#0C0A12' }}
      >
        <p className="text-[22px] md:text-[28px] font-extrabold tracking-[0.35em] uppercase"
          style={{ color: 'rgba(216,165,75,0.7)' }}>
          꿈키올래
        </p>
      </motion.div>

      {/* Revealed content */}
      <motion.div
        className="relative z-10 px-8 w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ maxWidth: '1100px' }}
      >
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-[11px] font-bold tracking-[0.3em] uppercase mb-6"
            style={{ color: C.accent }}>
            Career XR — 꿈키올래
          </motion.p>
          <motion.h1 variants={fadeUp}
            className="text-[42px] md:text-[56px] font-extrabold leading-[1.08] tracking-tight mb-6"
            style={{ color: C.text92, letterSpacing: '-0.02em' }}>
            직업을 설명하지 않고,<br />
            <span style={{ color: 'rgba(216,165,75,0.75)' }}>세계관 안에서 경험하게 만들다</span>
          </motion.h1>
          <motion.p variants={fadeUp}
            className="text-[16px] md:text-[18px] font-medium leading-relaxed mb-10"
            style={{ color: C.text45, maxWidth: '520px' }}>
            Apple Vision Pro 기반 XR 직업체험 콘텐츠 9종을 3개월 안에 기획·구축.
            교육 콘텐츠가 아닌, 기억에 남는 체험을 설계했습니다.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2.5">
            {META_BADGES.map((b) => (
              <span key={b.label}
                className="text-[12px] font-semibold px-3 py-1.5 rounded-md"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: C.text60 }}>
                {b.label}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ── ChallengeSection (sticky sidebar) ── */
function ChallengeSection() {
  return (
    <section className="px-8 py-24 border-b" style={{ maxWidth: '1100px', margin: '0 auto', borderColor: C.border }}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-24">
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: C.accent }}>
              The Challenge
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-[28px] md:text-[34px] font-bold leading-tight mb-4"
              style={{ color: C.text92, letterSpacing: '-0.02em' }}>
              처음 구상한 방식으로는<br />완성이 불가능했다
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-[14px] leading-relaxed"
              style={{ color: C.text45, fontFamily: '"Noto Serif KR", serif' }}>
              일반적으로 XR 콘텐츠 하나에 최소 2~3개월.
              주어진 시간은 3개월, 완성해야 할 콘텐츠는 9종.
            </motion.p>
          </div>
        </div>
        <div className="md:col-span-8 flex flex-col gap-14">
          {CHALLENGE_POINTS.map((p, i) => (
            <motion.div key={p.num}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.07 }}>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: C.accent }}>
                {p.num}
              </p>
              <h3 className="text-[18px] md:text-[20px] font-bold mb-2" style={{ color: 'rgba(243,246,251,0.88)' }}>
                {p.title}
              </h3>
              <p className="text-[12px] font-semibold mb-3 px-2 py-1 rounded inline-block"
                style={{ color: 'rgba(216,165,75,0.8)', background: 'rgba(216,165,75,0.06)' }}>
                → {p.result}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── WorldCard (glow hover) ── */
function WorldCard({ world, index }) {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };
  const glowX = useTransform(mouseX, (v) => `${v}px`);
  const glowY = useTransform(mouseY, (v) => `${v}px`);

  return (
    <motion.div ref={ref} onMouseMove={handleMouseMove}
      className="relative rounded-2xl overflow-hidden group"
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ background: C.cardBg, border: `1px solid ${world.border}` }}>
      <motion.div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(240px circle at ${glowX} ${glowY}, ${world.accent}, transparent 70%)` }} />
      <div className="relative z-10 p-7 flex flex-col h-full">
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-3"
          style={{ color: 'rgba(216,165,75,0.5)' }}>
          World {String(index + 1).padStart(2, '0')}
        </p>
        <h4 className="text-[17px] font-bold mb-3" style={{ color: 'rgba(243,246,251,0.88)' }}>{world.name}</h4>
        <p className="text-[13px] leading-[1.85] mb-4 flex-1"
          style={{ color: C.text45, fontFamily: '"Noto Serif KR", serif' }}>
          {world.desc}
        </p>
        <p className="text-[11px] font-semibold"
          style={{ color: 'rgba(140,109,216,0.5)' }}>
          {world.jobs}
        </p>
      </div>
    </motion.div>
  );
}

/* ── WorldsSection ── */
function WorldsSection() {
  return (
    <section className="px-8 py-24 border-b" style={{ maxWidth: '1100px', margin: '0 auto', borderColor: C.border }}>
      <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: C.accent }}>
        Worldbuilding
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.06 }}
        className="text-[26px] md:text-[30px] font-bold leading-snug mb-4"
        style={{ color: C.text92, letterSpacing: '-0.01em' }}>
        3개의 세계, 9개의 직업
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ delay: 0.12 }}
        className="text-[14px] mb-12" style={{ color: C.text45 }}>
        단순 목록형 나열 대신, 컨셉별 세계관과 서사 안에서 선택하고 경험하는 구조.
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {WORLDS.map((w, i) => (
          <WorldCard key={w.id} world={w} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ── GallerySection ── */
function GallerySection() {
  return (
    <section className="px-8 py-24 border-b" style={{ maxWidth: '1100px', margin: '0 auto', borderColor: C.border }}>
      <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: C.accent }}>
        Gallery
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.06 }}
        className="text-[26px] md:text-[30px] font-bold leading-snug mb-12"
        style={{ color: C.text92, letterSpacing: '-0.01em' }}>
        프로젝트 스크린샷
      </motion.h2>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.1 }}>
        <InfiniteGallery items={GALLERY_ITEMS} />
      </motion.div>
    </section>
  );
}

/* ── UXSection ── */
function UXSection() {
  return (
    <section className="px-8 py-24 border-b" style={{ maxWidth: '1100px', margin: '0 auto', borderColor: C.border }}>
      <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: C.accent }}>
        UX & Interaction
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.06 }}
        className="text-[26px] md:text-[30px] font-bold leading-snug mb-12"
        style={{ color: C.text92, letterSpacing: '-0.01em' }}>
        Vision Pro에서의 사용성을 보완하다
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {UX.map((u, i) => (
          <motion.div key={u.title}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="p-7 rounded-2xl transition-all duration-300 hover:-translate-y-1"
            style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}` }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(216,165,75,0.2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.cardBorder; }}>
            <div className="text-2xl mb-3">{u.icon}</div>
            <h4 className="text-[15px] font-bold mb-2" style={{ color: 'rgba(243,246,251,0.85)' }}>{u.title}</h4>
            <p className="text-[13px] leading-relaxed"
              style={{ color: C.text45, fontFamily: '"Noto Serif KR", serif' }}>
              {u.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ── OutcomeSection ── */
function OutcomeSection() {
  return (
    <section className="px-8 py-24 pb-32" style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: C.accent }}>
        Outcome
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.06 }}
        className="text-[26px] md:text-[30px] font-bold leading-snug mb-8"
        style={{ color: C.text92, letterSpacing: '-0.01em' }}>
        짧은 기간 안에 기획 구조 자체를<br />생산 가능한 형태로 바꾸다
      </motion.h2>
      <motion.blockquote initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="relative pl-6 py-4 mb-14"
        style={{ borderLeft: '2px solid rgba(216,165,75,0.25)' }}>
        <p className="text-[15px] italic leading-relaxed" style={{ color: C.text45 }}>
          "1종씩 순차적으로 기획하던 방식을 폐기하고, 1종 기획 → 디자인/개발 전달 → 다음 1종 기획 → 병렬 검수의 파이프라인 구조로 전환했습니다."
        </p>
      </motion.blockquote>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="p-7 rounded-2xl"
        style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}` }}>
        <div className="text-2xl mb-3">🎯</div>
        <h4 className="text-[15px] font-bold mb-2" style={{ color: 'rgba(243,246,251,0.85)' }}>최종 성과</h4>
        <p className="text-[13px] leading-relaxed"
          style={{ color: C.text45 }}>
          9종 XR 직업체험 콘텐츠 완성. 체험센터 운영 수준 구축. 후속 제안 요청으로 이어지는 만족도.
        </p>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════ */
export default function Dream() {
  return (
    <div
      className="relative w-full overflow-x-hidden"
      style={{ background: '#0C0A12', color: '#f3f6fb' }}
    >
      <div
        className="fixed top-0 left-0 right-0 h-px pointer-events-none z-10"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(216,165,75,0.15), transparent)' }}
      />

      <HeroSection />
      <ChallengeSection />
      <WorldsSection />
      <GallerySection />
      <UXSection />
      <OutcomeSection />
    </div>
  );
}
