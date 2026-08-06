import { useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import InfiniteGallery from '../ui/InfiniteGallery';
import AtAGlance from '../ui/AtAGlance';

/* ══════════════════════════════════════════
   DATA
   ══════════════════════════════════════════ */

const META_BADGES = [
  { label: 'PM · 기획 · 컨셉 설계 · QA' },
  { label: '2025.09 — 2025.12' },
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

/* 버린 것 / 택한 것 — 판단력을 보여주는 4개 앵커.
   ⚠️ 세부 수치는 회고 정제본 기반(미검증). 확인된 값만 단계적으로 노출할 것. */
const DECISIONS = [
  {
    id: 'puzzle',
    tag: '난이도',
    title: '퍼즐 교체',
    before: '전구 토글 추론',
    after: '점등 순서 재현',
    verdict: '힌트를 겹겹이 얹어야 풀린다면, 퍼즐이 아니라 대상 설정이 틀린 것',
    detail: [
      '고등학생 기준으로 짠 퍼즐인데 타깃이 초등 고학년까지 내려감',
      '힌트 단계 추가부터 검토 → 기각. 정답에 가까워지는지 알 수 없는 게 본질',
      '세계관(전기)은 유지, 요구 능력만 추론 → 관찰·기억으로 전환',
      '난이도는 라운드 수로 조절. 실패 시 패턴 재제시로 재도전 유도',
    ],
  },
  {
    id: 'detective',
    tag: '스펙 정의',
    title: '추리를 데이터로',
    before: '"증거를 과학적으로 분석"',
    after: '증거=변수, 용의자=데이터셋, 범인=교집합',
    verdict: '개발자가 착수할 수 없는 문장은 기획이 아니라 소개문',
    detail: [
      '용의자를 속성 집합으로 정의 — 연령대·발 크기·유니폼',
      '증거를 대응 변수로 — 지문·족적·혈흔·섬유',
      '범인 특정 = 속성 교집합. 사건 전제로 현장 흔적의 개연성 확보',
      '사건보드 UI는 증거·용의자 카드 다중 연결 구조',
    ],
  },
  {
    id: 'stem',
    tag: '기술 제약',
    title: '생성 모델 우회',
    before: '파트별 분리 프롬프트',
    after: '완성곡 생성 → Stem 분리 → 트랙 믹싱',
    verdict: '모델을 설득할 수 없으면 파이프라인 순서를 바꾼다',
    detail: [
      '샘플 조합 구조는 1~2분이면 끝나는 "블록 고르기"였음',
      '"드럼 빼고" 류 프롬프트를 모델이 무시 → 프롬프트 튜닝 포기',
      'BPM·Key 통일한 완성곡 생성 후 Stem 분리, 엔진에서 ON/OFF 믹싱',
      'dspTime 예약 재생으로 트랙 어긋남 제거 · 전환 페이드로 클릭 노이즈 차단',
      '오디오 미들웨어는 과잉으로 판단, 내장 필터로 마감',
    ],
  },
  {
    id: 'stage',
    tag: '직업 정의',
    title: '공연기획자 재정의',
    before: '조명·효과 고르기',
    after: '관객·출연자 안전 조율',
    verdict: '재미가 안 나오면 대개 직업 정의부터 틀려 있다',
    detail: [
      '연출 선택형은 재미도 직업성도 약했음',
      '직업을 "무대를 꾸미는 사람"이 아니라 "사고 없이 공연을 끝내는 사람"으로 재정의',
      '절차형 안전 미션으로 재구성 — 조명 고장, 관객 방향 레이저, 깨진 유리, 특수효과 폭주',
      '모든 미션에 "설명 → 조작 → 테스트 → 성공" 동일 문법 적용해 학습 비용 절감',
      '체크리스트는 조작 대상이 아닌 표시 전용 UI. 진행 관리는 시스템이 담당',
    ],
  },
];

/* 아이디어 채택 여부를 판단한 10개 기준 */
const IDEA_FILTERS = [
  '직업의 본질을 담는가', '초5~고3이 이해하는가', '1분 내 규칙 파악', '개발팀이 명확히 구현 가능',
  '기존 자산 재사용', '실패해도 흐름 유지', '다음 직업과 연결', '시각 피드백 충분',
  '디바이스에서 무리 없음', '일정 내 제작 가능',
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
            Apple Vision Pro 직업체험 콘텐츠 9종. 실개발 2개월.
            설명하는 교육이 아니라 기억에 남는 체험으로 만들었습니다.
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
              처음 방식대로면<br />3종도 못 끝낼 일정이었다
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-[14px] leading-relaxed"
              style={{ color: C.text45 }}>
              XR 콘텐츠 하나에 보통 2~3개월. 만들 건 9종.
              초기 기획을 전부 폐기하고 구조부터 다시 세웠습니다.
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

      {/* 갤러리 — 별도 섹션 대신 결과물 바로 아래에 붙임 */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.1 }} className="mt-14">
        <InfiniteGallery items={GALLERY_ITEMS} />
      </motion.div>
    </section>
  );
}

/* ── DecisionRow — 버린 것 → 택한 것 (클릭 시 근거 펼침) ── */
function DecisionRow({ item, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: isOpen ? 'rgba(216,165,75,0.05)' : C.cardBg,
        border: `1px solid ${isOpen ? 'rgba(216,165,75,0.22)' : C.cardBorder}`,
        transition: 'background 0.25s, border-color 0.25s',
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full text-left p-6 md:p-7 cursor-pointer"
      >
        {/* 번호 · 태그 · 펼침 표시 */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[11px] font-bold tracking-[0.2em]" style={{ color: C.accentDim }}>
            0{index + 1}
          </span>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md"
            style={{ background: 'rgba(216,165,75,0.08)', color: 'rgba(216,165,75,0.8)' }}>
            {item.tag}
          </span>
          <span className="ml-auto text-[18px] leading-none font-light select-none"
            style={{ color: C.accentDim, transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.25s' }}>
            +
          </span>
        </div>

        <h3 className="text-[19px] md:text-[21px] font-bold mb-4"
          style={{ color: C.text92, letterSpacing: '-0.01em' }}>
          {item.title}
        </h3>

        {/* 버린 것 → 택한 것 */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
          <span className="text-[13px] px-3 py-1.5 rounded-lg"
            style={{ color: 'rgba(243,246,251,0.35)', background: 'rgba(255,255,255,0.03)', textDecoration: 'line-through' }}>
            {item.before}
          </span>
          <span style={{ color: C.accentDim }}>→</span>
          <span className="text-[13px] font-semibold px-3 py-1.5 rounded-lg"
            style={{ color: 'rgba(216,165,75,0.9)', background: 'rgba(216,165,75,0.08)' }}>
            {item.after}
          </span>
        </div>

        {/* 한 줄 결론 */}
        <p className="text-[14px] md:text-[15px] font-semibold leading-snug pl-4"
          style={{ color: C.text92, borderLeft: '2px solid rgba(216,165,75,0.4)' }}>
          {item.verdict}
        </p>
      </button>

      {/* 펼침 — 판단 근거 */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-6 md:px-7 pb-7 pt-1">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4 pb-2"
                style={{ color: C.accentDim, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                판단 근거
              </p>
              <ul className="flex flex-col gap-2.5">
                {item.detail.map((d) => (
                  <li key={d} className="flex gap-3 text-[13px] leading-[1.75]" style={{ color: C.text60 }}>
                    <span style={{ color: C.accentDim }}>·</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── DecisionSection — 버린 것/택한 것 + 판단 기준 10 ── */
function DecisionSection() {
  const [openId, setOpenId] = useState(null);

  return (
    <section className="px-8 py-24 border-b" style={{ maxWidth: '1100px', margin: '0 auto', borderColor: C.border }}>
      <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: C.accent }}>
        What I Cut
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.06 }}
        className="text-[26px] md:text-[32px] font-bold leading-snug mb-4"
        style={{ color: C.text92, letterSpacing: '-0.01em' }}>
        9종을 만든 힘은<br />아이디어가 아니라 버리는 속도였다
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ delay: 0.12 }}
        className="text-[14px] leading-relaxed mb-12" style={{ color: C.text45, maxWidth: '580px' }}>
        일정을 맞추려면 좋은 안을 고르는 것보다, 안 맞는 안을 빨리 걷어내는 게 중요했습니다.
        대표적으로 갈아엎은 네 가지. <span style={{ color: C.text60 }}>카드를 누르면 판단 근거가 열립니다.</span>
      </motion.p>

      <div className="flex flex-col gap-3">
        {DECISIONS.map((d, i) => (
          <DecisionRow
            key={d.id} item={d} index={i}
            isOpen={openId === d.id}
            onToggle={() => setOpenId(openId === d.id ? null : d.id)}
          />
        ))}
      </div>

      {/* 판단 기준 10 */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5 }}
        className="mt-12 p-7 md:p-8 rounded-2xl"
        style={{ background: 'rgba(216,165,75,0.04)', border: '1px solid rgba(216,165,75,0.14)' }}>
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: C.accentDim }}>
          기준
        </p>
        <h4 className="text-[17px] font-bold mb-4" style={{ color: C.text92 }}>
          버릴지 말지는 이 10가지로 판단했습니다
        </h4>
        <div className="flex flex-wrap gap-2 mb-7">
          {IDEA_FILTERS.map((f) => (
            <span key={f} className="text-[12px] font-medium px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: C.text60 }}>
              {f}
            </span>
          ))}
        </div>
        <p className="text-[14px] font-semibold leading-snug pl-4"
          style={{ color: 'rgba(216,165,75,0.9)', borderLeft: '2px solid rgba(216,165,75,0.4)' }}>
          기준이 고정되니 논쟁이 줄고, 9종이 같은 품질로 나왔습니다.
        </p>
      </motion.div>
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
        className="text-[26px] md:text-[32px] font-bold leading-snug mb-8"
        style={{ color: C.text92, letterSpacing: '-0.01em' }}>
        기획 순서를 바꿔<br />일정을 만들어냈습니다
      </motion.h2>

      {/* 파이프라인 전환 */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ delay: 0.15 }} className="mb-14 flex flex-col gap-3" style={{ maxWidth: '640px' }}>
        <div className="flex items-center gap-3 text-[13px] px-4 py-3 rounded-xl"
          style={{ color: 'rgba(243,246,251,0.35)', background: 'rgba(255,255,255,0.02)' }}>
          <span className="font-semibold" style={{ minWidth: '52px' }}>이전</span>
          <span>1종 기획 → 개발 → 검수 → 다음 1종</span>
        </div>
        <div className="flex items-center gap-3 text-[13px] px-4 py-3 rounded-xl"
          style={{ color: 'rgba(216,165,75,0.9)', background: 'rgba(216,165,75,0.07)' }}>
          <span className="font-semibold" style={{ minWidth: '52px' }}>이후</span>
          <span>1종 기획 → 개발 전달 <span style={{ color: C.accentDim }}>‖</span> 동시에 다음 1종 기획 → 병렬 검수</span>
        </div>
      </motion.div>

      {/* 결과 3종 — UX 원칙 포함 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { head: '납기', body: '9종 전량 기한 내 납품. 체험센터 운영 가능 수준으로 마감.' },
          { head: '신뢰', body: '클라이언트가 완성도·디테일을 높게 평가, 후속 제안 요청으로 연결.' },
          { head: '접근성', body: '시선+제스처가 어려운 사용자를 위한 head raycast 옵션, 나레이션·자막 이중 안내로 초등 저학년까지 커버.' },
        ].map((r, i) => (
          <motion.div key={r.head}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
            className="p-6 rounded-2xl"
            style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}` }}>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: C.accentDim }}>
              {r.head}
            </p>
            <p className="text-[13px] leading-[1.8]" style={{ color: C.text60 }}>{r.body}</p>
          </motion.div>
        ))}
      </div>
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
      <AtAGlance
        accent="rgba(216,165,75,0.85)"
        items={[
          { num: '9종', label: 'XR 직업체험 콘텐츠', sub: '3컨셉 × 3직업 프레임워크화' },
          { num: '2개월', label: '실개발 기간', sub: '초기 기획 폐기 → 병렬 파이프라인 전환' },
          { num: '40~50분', label: '통합 체험 플로우', sub: '로비 → 3컨셉 선택 → 체험 → 진로정보' },
          { num: '후속 제안', label: '클라이언트 재요청', sub: '퀄리티·디테일 평가로 이어진 신뢰' },
        ]}
      />
      <ChallengeSection />
      <WorldsSection />
      <DecisionSection />
      <OutcomeSection />
    </div>
  );
}
