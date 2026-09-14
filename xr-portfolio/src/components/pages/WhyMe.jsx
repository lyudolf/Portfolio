import { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import MermaidDiagram from '../ui/MermaidDiagram';

/* ══════════════════════════════════════════
   Why Me — "What I bring"
   2026-09-10 재작성. 이전 버전은 영어 제목("Impact-Driven", "Never Just No")과
   있어보이는 용어(Feature Creep, 인지적 간극) 위주의 "Technical PM" 자기소개였는데,
   8월에 정리한 포지셔닝(XR은 도메인, 본체는 서비스 기획 — "해상도를 높이는 기획자")과
   직업관 B안(plan-pdf-portfolio.md) 톤으로 맞췄다.
   원칙: 형용사로 주장하지 않고 본문 프로젝트에서 재확인되는 행동으로만 증명한다.
   ══════════════════════════════════════════ */

const INK = 'rgba(24,32,27,0.9)';
const INK_60 = 'rgba(24,32,27,0.62)';
const INK_45 = 'rgba(24,32,27,0.45)';
const ACCENT = '#0f8f74';

/* 일하는 순서 — 본인 구술(2026-09-11)을 그대로 옮긴 흐름.
   핵심은 리스크를 찾은 뒤의 세 갈래: 파훼 → 우회(유저가 보는 결과는 같게) → 가설로 복귀.
   "안 됩니다" 대신 선택지를 만드는 방식이 어디서 나오는지를 이 분기가 설명한다. */
const WORKFLOW = `%%{init: {
  'theme': 'base',
  'themeVariables': {
    'fontFamily': 'Pretendard, -apple-system, sans-serif',
    'fontSize': '13px',
    'primaryColor': '#ffffff',
    'primaryTextColor': '#1a231e',
    'primaryBorderColor': 'rgba(24,32,27,0.22)',
    'lineColor': 'rgba(24,32,27,0.42)',
    'secondaryColor': '#f2f4f0',
    'tertiaryColor': '#f2f4f0',
    'edgeLabelBackground': '#eff1ed',
    'clusterBkg': 'transparent'
  },
  'flowchart': { 'curve': 'basis', 'nodeSpacing': 34, 'rankSpacing': 44, 'padding': 10 }
}}%%
flowchart TD
  A["<b>문제 정의</b><br/>어디가 문제인가"] --> B["<b>가설 수립</b><br/>풀려면 어떤 방법이 있는가"]
  B --> C["<b>리스크 탐색</b><br/>이대로 가면 막히는 데가 있는가"]
  C -->|없음| GO(["진행"])
  C -->|있음| D{"파훼 방법이<br/>있는가"}
  D -->|있음| GO
  D -->|없음| E{"유저가 보는 결과는 같게<br/>돌아가는 길이 있는가"}
  E -->|있음| GO
  E -->|없음| B
  classDef step fill:#ffffff,stroke:#c9ccc8,stroke-width:1px,rx:10,ry:10;
  classDef ask fill:#f2f4f0,stroke:#c9ccc8,stroke-width:1px;
  classDef go fill:#0f8f74,stroke:#0f8f74,color:#ffffff,font-weight:700;
  class A,B,C step;
  class D,E ask;
  class GO go;
`;

const WORLDVIEW =
  '기획은 그럴듯한 문서가 아니라 실제로 굴러가는 결과로 끝난다고 생각합니다. ' +
  '그래서 화면 뒤에 숨은 리스크까지 미리 짚고, 만든 뒤에는 예상대로 움직이는지 확인될 때까지 손을 떼지 않습니다. ' +
  '깊게 파고들어 세운 가설이 현실에서 맞아떨어질 때의 희열 — 그게 저를 계속 움직이는 힘입니다.';

/* ── 카드 데이터 ──
   title = 하는 일(행동), subtitle = 그 일의 이름, body = 어떻게, proof = 어디서 확인되는가 */
const CARDS = [
  {
    id: 'define',
    label: '01 · 문제 정의',
    title: '흐린 요구를 착수 가능한 정의로',
    body: '"사이트를 더 좋게", "고령자가 쓰기 편하게" 같은 문장은 요구가 아니라 방향입니다. 무엇을 만들고 무엇을 안 만들지, 어디까지 확정이고 어디부터 열려 있는지를 먼저 적어서, 개발과 디자인이 그 문서 한 장으로 바로 착수하게 합니다.',
    proof: 'KISTI 인수 2주 만에 기획서·런처 UX·레벨 설계를 들고 선제 미팅 — 클라이언트 신뢰의 기점. 웹마인드 3사 전건 IA·요구사항 정의서부터 잡음.',
    col: 'md:col-span-2',
    accent: 'rgba(21,64,201,0.10)',
    border: 'rgba(21,64,201,0.18)',
  },
  {
    id: 'structure',
    label: '02 · 제약 안의 설계',
    title: '안 되는 일정은 구조로 바꿉니다',
    body: '일정이 불가능하다는 답이 돌아오면 요구를 깎기 전에 만드는 방식을 먼저 바꿉니다. 같은 뼈대를 공유하고 배리에이션만 달리하는 프레임워크, 폭포수 대신 1종 기획 즉시 개발로 넘기는 병렬 진행 — 구조가 바뀌면 같은 인원으로 다른 결과가 나옵니다.',
    proof: 'Vision Pro 직업체험 9종 — "3개월 안에 불가능" 판정에서 2개월 실개발로 납품, 클라이언트 후속 제안.',
    col: 'md:col-span-1',
    accent: 'rgba(158,106,22,0.10)',
    border: 'rgba(158,106,22,0.20)',
  },
  {
    id: 'feasibility',
    label: '03 · 기술 제약',
    title: '"개발 가능합니다"를 직접 확인하고 말합니다',
    body: '기술 제약을 개발자에게 묻기만 하지 않습니다. 렌더링이 버티는 선, AI를 클라이언트에 올리는 비용, 공공 API의 쿼터 같은 것을 직접 부딪혀본 뒤에 기획서에 씁니다. 그래서 기획자와 개발자가 같은 문서를 다르게 읽는 일이 줄어들고, 일정 산정에 근거가 생깁니다.',
    proof: '웹 3D 게임 7일 단독 개발·배포(8,000객체 단일 드로우콜, ONNX AI), 앱 5종 단독 출시, CS 전공 + React·Spring Boot 실무.',
    col: 'md:col-span-3',
    accent: 'rgba(122,143,36,0.10)',
    border: 'rgba(122,143,36,0.20)',
    wide: true,
  },
  {
    id: 'options',
    label: '04 · 클라이언트 협업',
    title: '"안 됩니다" 대신 고를 수 있는 선택지를',
    body: '요구가 기술적으로 어려울 때 거절로 끝내지 않습니다. 대체안과 우회안, 각각의 비용과 리스크를 나란히 올려 상대가 직접 고르게 합니다.',
    proof: 'KISTI 1년 용역 → 3년차 운영, 마지막 6년차 연장 논의. 꿈키올래 후속 제안 요청. 웹마인드 유지보수 계약 연장.',
    col: 'md:col-span-2',
    accent: 'rgba(15,143,116,0.10)',
    border: 'rgba(15,143,116,0.20)',
  },
  {
    id: 'verify',
    label: '05 · 현장 검증',
    title: '확인하기 전엔 완성이라 부르지 않습니다',
    body: '기획서의 가설과 실제 사용자의 행동은 어긋납니다. 임상 현장에 직접 내려가 관찰하고, 출시한 앱의 지표를 보고, 어긋난 만큼 그 자리에서 고칩니다.',
    proof: 'KISTI 임상 현장에서 색상 가시성·멀미·그랩 난이도 즉시 수정. 퀴즈왕 "시작까지의 거리" 가설 → 완주율 반응. 앱 5종 유입 실패 회고 공개.',
    col: 'md:col-span-1',
    accent: 'rgba(109,79,214,0.10)',
    border: 'rgba(109,79,214,0.20)',
  },
];

/* ── 커서를 따라오는 글로우 카드 ── */
function BentoCard({ card, index }) {
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
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`relative ${card.col} rounded-3xl overflow-hidden group`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ background: 'rgba(255,255,255,0.72)', border: `1px solid ${card.border}` }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(280px circle at ${glowX} ${glowY}, ${card.accent}, transparent 70%)` }}
      />

      <div className={`relative z-10 h-full flex flex-col ${card.wide ? 'p-8 md:flex-row md:items-start md:gap-12' : 'p-7'}`}>
        <div className={card.wide ? 'flex-1' : ''}>
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: ACCENT }}>
            {card.label}
          </p>
          <h3 className="font-extrabold leading-[1.3] mb-4"
            style={{ color: INK, fontSize: card.wide ? 26 : 21, letterSpacing: '-0.025em' }}>
            {card.title}
          </h3>
          <p className="text-[13.5px] leading-[1.9]" style={{ color: INK_60, maxWidth: card.wide ? 540 : '100%' }}>
            {card.body}
          </p>
        </div>

        {/* 근거 — 본문 프로젝트 페이지에서 그대로 재확인되는 사실만 */}
        <div className={card.wide ? 'md:w-[300px] md:flex-shrink-0 mt-6 md:mt-0' : 'mt-6'}>
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: INK_45 }}>
            어디서 확인되나
          </p>
          <p className="text-[12.5px] font-semibold leading-[1.75] px-3.5 py-3 rounded-xl"
            style={{ color: INK, background: card.accent, border: `1px solid ${card.border}` }}>
            {card.proof}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function WhyMe() {
  return (
    <div style={{ background: '#eff1ed', minHeight: '100vh' }}>
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-32">

        {/* 헤더 — 네비 문장 "What I bring"의 완성형 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-5" style={{ color: ACCENT }}>
            What I bring
          </p>
          <h1 className="text-[34px] md:text-[44px] font-extrabold leading-tight mb-5"
            style={{ color: INK, letterSpacing: '-0.025em' }}>
            해상도를 높이는 기획자입니다
          </h1>
          <p className="text-[15px] md:text-[16px] leading-[1.9]" style={{ color: INK_60, maxWidth: 620 }}>
            흐린 요구를 착수 가능한 정의로, 흩어진 화면을 한 흐름으로, 감을 값으로 —
            도메인이 VR이든 앱이든 웹이든, 흐린 것을 선명하게 만드는 일을 해왔습니다.
            아래 다섯 가지는 전부 이 사이트의 프로젝트 페이지에서 그대로 확인됩니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CARDS.map((card, i) => <BentoCard key={card.id} card={card} index={i} />)}
        </div>

        {/* 일하는 순서 — 위 다섯 카드가 실제로 어떤 순서로 굴러가는지 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5 }}
          className="mt-16"
        >
          <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-5" style={{ color: ACCENT }}>
            How I work
          </p>
          <h2 className="text-[26px] md:text-[32px] font-extrabold leading-[1.28] mb-8"
            style={{ color: INK, letterSpacing: '-0.025em' }}>
            나의 업무 방식
          </h2>
          <div className="rounded-3xl p-6 md:p-8"
            style={{ background: 'rgba(255,255,255,0.72)', border: '1px solid rgba(24,32,27,0.08)' }}>
            <div style={{ maxWidth: 560, margin: '0 auto' }}>
              <MermaidDiagram chart={WORKFLOW} />
            </div>
          </div>
        </motion.div>

        {/* 일하는 기준 — PDF 이력서면의 직업관과 같은 문단 (단일 원본) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5 }}
          className="mt-16 rounded-3xl p-8 md:p-10"
          style={{ background: '#12211a', color: '#fff' }}
        >
          <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-5" style={{ color: '#7ef1d6' }}>
            일하는 기준
          </p>
          <p className="text-[16px] md:text-[18px] leading-[1.9] font-medium" style={{ color: 'rgba(255,255,255,0.86)', maxWidth: 720 }}>
            {WORLDVIEW}
          </p>
        </motion.div>
      </section>
    </div>
  );
}
