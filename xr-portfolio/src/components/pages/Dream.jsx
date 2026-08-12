import { useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import InfiniteGallery from '../ui/InfiniteGallery';
import AtAGlance from '../ui/AtAGlance';
import ProjectShowcase from '../ui/ProjectShowcase';

/* ══════════════════════════════════════════
   DATA
   ══════════════════════════════════════════ */

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
  {
    num: '01',
    title: '불가능한 일정',
    body: '아홉 종을 각각 설계하는 대신, 세 개의 세계관 아래 세 직업이 같은 흐름을 공유하도록 묶었습니다. 인트로 · 메인 미션 · 미니게임 · 진로 정보라는 뼈대를 고정하고, 직업마다 달라지는 부분만 새로 채웠습니다.',
    result: '기획·개발·검수가 같은 틀 위에서 반복되면서 아홉 종을 납기 안에 완성했습니다.',
  },
  {
    num: '02',
    title: '미지의 디바이스',
    body: 'Apple Vision Pro는 팀에게도 저에게도 처음이었고, 컨트롤러 없이 시선과 손동작만으로 조작하는 기기였습니다. 참고할 만한 직업체험 사례가 없어 인터랙션 규칙부터 직접 세워야 했습니다.',
    result: '실패 확률이 낮은 동작만 남기고 나머지는 버튼으로 대체하는 기준을 정리했습니다.',
  },
  {
    num: '03',
    title: '넓은 타겟 연령',
    body: '초기 타깃은 고등학생이었는데 진행 중에 초등 고학년까지 확대됐습니다. 규칙이 어려우면 저학년이 막히고 너무 쉬우면 고학년이 지루해지는 구간을, 같은 콘텐츠 안에서 동시에 만족시켜야 했습니다.',
    result: '나레이션과 자막으로 안내를 이중으로 깔고, 난이도는 콘텐츠마다 조절 가능한 형태로 설계했습니다.',
  },
];

const WORLDS = [
  {
    id: 'mars',
    name: '꿈키 MARS',
    desc: '화성에서 탈출한다는 하나의 목표를 세 직업이 나눠 맡습니다. 우주선을 조립하고, 현지 자원으로 연료를 만들고, 식량을 배양하는 과정이 순서대로 이어집니다.',
    signature: '허공에 주먹을 쥐면 조종간이 생성됩니다',
    jobs: '기계공학자 · 우주자원개발자 · 바이오식품공학자',
    accent: 'rgba(216,165,75,0.22)',
    border: 'rgba(158,106,22,0.3)',
  },
  {
    id: 'crime',
    name: '밀실사건수사대',
    desc: '박물관에서 벌어진 사건 하나를 세 직업이 이어받습니다. 증거를 수집하고, 수치와 데이터로 바꾸고, 그 데이터를 연결해 범인을 특정하는 흐름입니다.',
    signature: '증거를 눈앞으로 가져와 직접 채증합니다',
    jobs: '과학수사관 · 국과수 직무 · 프로파일러',
    accent: 'rgba(140,109,216,0.2)',
    border: 'rgba(104,78,178,0.3)',
  },
  {
    id: 'ent',
    name: '꿈키 엔터테인먼트',
    desc: '쇼케이스 한 편을 무대에 올리는 과정을 세 직업이 나눠 맡습니다. 곡을 만들고, 무대를 안전하게 준비하고, 그 결과를 무대 위에서 퍼포먼스로 완성합니다.',
    signature: '손이 시야 밖으로 나가도 응원봉은 유지됩니다',
    jobs: '작곡가 · 공연기획자 · 아이돌',
    accent: 'rgba(244,114,182,0.2)',
    border: 'rgba(200,60,120,0.3)',
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
    verdict: '힌트를 겹겹이 얹어야 풀리는 퍼즐이라면, 문제는 퍼즐이 아니라 대상 설정이라고 판단했습니다',
    detail: [
      '고등학생 기준으로 설계한 퍼즐이었는데, 타깃이 초등 고학년까지 내려가면서 난이도가 맞지 않게 됐습니다.',
      '처음에는 힌트 단계를 얹는 방향으로 검토했습니다. 하지만 사용자가 정답에 가까워지고 있는지 스스로 알 수 없다는 게 본질이라 기각했습니다.',
      '전기라는 세계관은 그대로 두고, 요구하는 능력만 추론에서 관찰과 기억으로 바꿨습니다.',
      '난이도는 라운드 수로 조절하고, 실패하면 정답 패턴을 다시 보여줘 자연스럽게 재도전하도록 했습니다.',
    ],
  },
  {
    id: 'detective',
    tag: '스펙 정의',
    title: '추리를 데이터로',
    before: '"증거를 과학적으로 분석"',
    after: '증거=변수, 용의자=데이터셋, 범인=교집합',
    verdict: '개발자가 바로 착수할 수 없는 문장은 기획이 아니라 소개문이라고 봤습니다',
    detail: [
      '용의자를 연령대·발 크기·유니폼 같은 속성의 집합으로 정의했습니다.',
      '증거는 각 속성에 대응하는 변수로 뒀습니다. 지문·족적·혈흔·섬유가 저마다 다른 정보를 알려줍니다.',
      '그 결과 범인 특정이 속성의 교집합 문제가 됐습니다. 증거 하나로는 좁혀지지 않지만 여러 개를 겹치면 한 명으로 수렴합니다.',
      '전날 청소가 끝났다는 전제를 깔아, 현장에 남은 흔적이 범인의 것일 개연성부터 확보했습니다.',
      '사건보드는 증거 카드와 용의자 카드를 여러 갈래로 연결할 수 있는 구조로 설계했습니다.',
    ],
  },
  {
    id: 'stem',
    tag: '기술 제약',
    title: '생성 모델 우회',
    before: '파트별 분리 프롬프트',
    after: '완성곡 생성 → Stem 분리 → 트랙 믹싱',
    verdict: '모델을 설득할 수 없다면 파이프라인 순서를 바꾸는 편이 빠르다고 판단했습니다',
    detail: [
      '샘플 세 개를 고르는 초기 구조는 1~2분이면 끝났고, 음악을 만든다기보다 블록을 고르는 느낌이었습니다.',
      '악기별로 나눠 생성하려 했지만, 생성 모델이 "드럼 빼고" 같은 지시를 제대로 따르지 않아 프롬프트 조정은 포기했습니다.',
      'BPM과 키를 맞춘 완성곡을 먼저 만든 뒤 트랙을 분리하고, 엔진에서 켜고 끄는 방식으로 순서를 뒤집었습니다.',
      '트랙이 미세하게 어긋나는 문제는 dspTime 기반 예약 재생으로 잡고, 켜고 끌 때 생기는 잡음은 짧은 페이드로 없앴습니다.',
      '전문 오디오 미들웨어까지는 과하다고 보고 엔진 내장 기능으로 마감했습니다.',
    ],
  },
  {
    id: 'stage',
    tag: '직업 정의',
    title: '공연기획자 재정의',
    before: '조명·효과 고르기',
    after: '관객·출연자 안전 조율',
    verdict: '재미가 나오지 않을 때는 대개 직업 정의부터 다시 봐야 한다고 생각했습니다',
    detail: [
      '조명과 효과를 고르는 구조는 재미도 약하고 직업의 본질과도 멀었습니다.',
      '공연기획자를 "무대를 꾸미는 사람"이 아니라 "사고 없이 공연을 끝내는 사람"으로 다시 정의했습니다.',
      '그 정의에 맞춰 조명 고장, 관객 쪽을 향한 레이저, 무대 위 깨진 유리, 특수효과 폭주라는 네 가지 안전 미션으로 재구성했습니다.',
      '모든 미션에 설명 → 조작 → 테스트 → 성공이라는 같은 문법을 적용해, 하나만 익히면 나머지는 바로 이해되도록 했습니다.',
      '체크리스트는 사용자가 조작하지 않고 진행 상태만 보여주는 UI로 뒀습니다. 이미 조작할 것이 충분히 많았기 때문입니다.',
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

/* ── Color tokens — 라이트(이끼·포슬린) 테마. 히어로의 밝은 톤을 상세까지 연장 ── */
const C = {
  accent: 'rgba(158,106,22,0.9)',      // 딥 앰버 (밝은 배경용 텍스트 액센트, 핫스팟 #d8a54b 계열)
  accentDim: 'rgba(158,106,22,0.55)',
  text92: 'rgba(27,24,18,0.92)',
  text45: 'rgba(27,24,18,0.52)',
  text60: 'rgba(27,24,18,0.65)',
  border: 'rgba(27,24,18,0.08)',
  cardBg: 'rgba(255,255,255,0.6)',
  cardBorder: 'rgba(27,24,18,0.08)',
  cardShadow: '0 8px 24px rgba(27,24,18,0.05)',
};

/* ══════════════════════════════════════════
   COMPONENTS
   ══════════════════════════════════════════ */

/* ── HeroSection (auto curtain reveal) ──
   커튼은 연출용 오버레이일 뿐이라, 본문은 뒤에서 이미 렌더되어 있습니다.
   모션 최소화 설정에서는 커튼을 아예 띄우지 않고 본문을 즉시 보여줍니다. */

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
              처음 방식대로라면<br />세 종도 끝내지 못할 일정이었습니다
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-[14px] leading-relaxed"
              style={{ color: C.text45 }}>
              XR 콘텐츠 한 종을 만드는 데 보통 2~3개월이 듭니다.
              그런데 만들어야 할 건 아홉 종이었습니다. 초기 기획을 전부 폐기하고 구조부터 다시 세웠습니다.
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
              <h3 className="text-[18px] md:text-[20px] font-bold mb-3" style={{ color: 'rgba(27,24,18,0.88)' }}>
                {p.title}
              </h3>
              <p className="text-[14px] leading-[1.85] mb-4" style={{ color: C.text60, maxWidth: '580px' }}>
                {p.body}
              </p>
              <p className="text-[13px] font-semibold leading-relaxed pl-4"
                style={{ color: 'rgba(158,106,22,0.92)', borderLeft: '2px solid rgba(158,106,22,0.4)' }}>
                {p.result}
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
          style={{ color: 'rgba(158,106,22,0.6)' }}>
          World {String(index + 1).padStart(2, '0')}
        </p>
        <h4 className="text-[17px] font-bold mb-3" style={{ color: 'rgba(27,24,18,0.88)' }}>{world.name}</h4>
        <p className="text-[13px] leading-[1.85] mb-4 flex-1"
          style={{ color: C.text45, fontFamily: '"Noto Serif KR", serif' }}>
          {world.desc}
        </p>
        <p className="text-[12px] leading-snug mb-4 pl-3"
          style={{ color: 'rgba(158,106,22,0.85)', borderLeft: '2px solid rgba(158,106,22,0.4)' }}>
          {world.signature}
        </p>
        <p className="text-[11px] font-semibold"
          style={{ color: 'rgba(104,78,178,0.75)' }}>
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
        직업을 목록으로 나열하는 대신, 세 개의 세계관 안에서 골라 들어가 서사를 따라 경험하도록 구성했습니다.
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
        background: isOpen ? 'rgba(216,165,75,0.14)' : C.cardBg,
        border: `1px solid ${isOpen ? 'rgba(158,106,22,0.32)' : C.cardBorder}`,
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
            style={{ background: 'rgba(216,165,75,0.18)', color: 'rgba(158,106,22,0.9)' }}>
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
            style={{ color: 'rgba(27,24,18,0.5)', background: 'rgba(27,24,18,0.05)', textDecoration: 'line-through' }}>
            {item.before}
          </span>
          <span style={{ color: C.accentDim }}>→</span>
          <span className="text-[13px] font-semibold px-3 py-1.5 rounded-lg"
            style={{ color: 'rgba(158,106,22,0.95)', background: 'rgba(216,165,75,0.18)' }}>
            {item.after}
          </span>
        </div>

        {/* 한 줄 결론 */}
        <p className="text-[14px] md:text-[15px] font-semibold leading-snug pl-4"
          style={{ color: C.text92, borderLeft: '2px solid rgba(158,106,22,0.45)' }}>
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
                style={{ color: C.accentDim, borderBottom: '1px solid rgba(27,24,18,0.08)' }}>
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
        아홉 종을 만든 힘은<br />아이디어가 아니라 버리는 속도였습니다
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ delay: 0.12 }}
        className="text-[14px] leading-relaxed mb-12" style={{ color: C.text45, maxWidth: '580px' }}>
        일정을 맞추려면 좋은 안을 고르는 것보다 맞지 않는 안을 빨리 걷어내는 편이 중요했습니다.
        아래 네 가지가 그렇게 갈아엎은 대표 사례입니다. <span style={{ color: C.text60 }}>카드를 누르면 판단 근거를 볼 수 있습니다.</span>
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
        style={{ background: 'rgba(216,165,75,0.12)', border: '1px solid rgba(158,106,22,0.28)' }}>
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: C.accentDim }}>
          기준
        </p>
        <h4 className="text-[17px] font-bold mb-4" style={{ color: C.text92 }}>
          버릴지 말지는 이 10가지로 판단했습니다
        </h4>
        <div className="flex flex-wrap gap-2 mb-7">
          {IDEA_FILTERS.map((f) => (
            <span key={f} className="text-[12px] font-medium px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(27,24,18,0.1)', color: C.text60 }}>
              {f}
            </span>
          ))}
        </div>
        <p className="text-[14px] font-semibold leading-snug pl-4"
          style={{ color: 'rgba(158,106,22,0.95)', borderLeft: '2px solid rgba(158,106,22,0.45)' }}>
          기준을 고정해두니 논쟁이 줄었고, 아홉 종이 같은 품질로 나왔습니다.
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
          style={{ color: 'rgba(27,24,18,0.5)', background: 'rgba(27,24,18,0.04)' }}>
          <span className="font-semibold" style={{ minWidth: '52px' }}>이전</span>
          <span>1종 기획 → 개발 → 검수 → 다음 1종</span>
        </div>
        <div className="flex items-center gap-3 text-[13px] px-4 py-3 rounded-xl"
          style={{ color: 'rgba(158,106,22,0.95)', background: 'rgba(216,165,75,0.16)' }}>
          <span className="font-semibold" style={{ minWidth: '52px' }}>이후</span>
          <span>1종 기획 → 개발 전달 <span style={{ color: C.accentDim }}>‖</span> 동시에 다음 1종 기획 → 병렬 검수</span>
        </div>
      </motion.div>

      {/* 결과 3종 — UX 원칙 포함 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { head: '납기', body: '아홉 종을 모두 기한 안에 납품했고, 체험센터에서 바로 운영할 수 있는 상태로 마감했습니다.' },
          { head: '신뢰', body: '클라이언트가 완성도와 디테일을 높게 평가해 후속 제안 요청으로 이어졌습니다.' },
          { head: '접근성', body: '시선과 제스처가 어려운 사용자를 위해 head raycast 옵션을 넣고, 나레이션과 자막으로 안내를 이중으로 깔아 초등 저학년까지 커버했습니다.' },
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
export default function Dream({ onNavigate }) {
  return (
    <div
      className="relative w-full overflow-x-hidden"
      style={{
        backgroundColor: '#f1eee4',
        backgroundImage:
          "linear-gradient(180deg, rgba(241,238,228,0) 0%, rgba(241,238,228,0.55) 70vh, rgba(241,238,228,0.94) 115vh, #f1eee4 150vh), url('/hero-bg.jpg')",
        backgroundSize: 'auto, 100% auto',
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat',
        color: '#221e15',
      }}
    >
      <div
        className="fixed top-0 left-0 right-0 h-px pointer-events-none z-10"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(158,106,22,0.25), transparent)' }}
      />
      <div className="px-4 md:px-6 pt-6">
        <div style={{ maxWidth: 1640, margin: '0 auto' }}>
          <ProjectShowcase activeId="dream" onNavigate={onNavigate} />
        </div>
      </div>
      <AtAGlance
        accent="rgba(158,106,22,0.92)"
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
