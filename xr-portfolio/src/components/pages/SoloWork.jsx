import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import FrameCard from '../ui/FrameCard';
import { useMedia } from '../../lib/useMedia';

/* ══════════════════════════════════════════
   Solo Work — 혼자 기획하고 혼자 출시한 것들

   Work(기관 용역)와 AI-lab(AI 활용 방법론) 사이에 비어 있던 축.
   "XR 용역 말고 일반 B2C 서비스도 하는가"에 대한 답이 여기다.
   앱인토스 미니앱은 원래 AI-lab의 shipped/ 안에 있었는데,
   AI 활용 사례가 아니라 제품 출시 이력으로 읽혀야 해서 이쪽으로 옮겼다.
   ══════════════════════════════════════════ */

const ACCENT = '#8b6cf0';        // Solo Work 시그니처 — Work 3색·랜딩 민트와 겹치지 않는 보라
const PANEL_BG = '#2a1d5c';
const PANEL_SOFT = '#443088';

const INK = 'rgba(24,32,27,0.88)';
const INK_60 = 'rgba(24,32,27,0.6)';
const INK_45 = 'rgba(24,32,27,0.45)';
const BORDER = 'rgba(24,32,27,0.08)';
const CARD = 'rgba(255,255,255,0.6)';

const APPS = [
  {
    id: 'quizking',
    name: '성격유형 퀴즈왕',
    appName: 'personality-quiz-king',
    category: '교육 · 비게임',
    released: '2026.06 출시',
    color: '#f0b03c',
    summary: '성격유형별로 갈리는 상식 퀴즈. 12개 카테고리 × 3난이도 × 3,600문제.',
    decisions: [
      {
        t: '게임으로 만들지 않기로 한 결정',
        d: '게임으로 등록하면 GRAC 등급분류에 10~15일이 걸립니다. 퀴즈라는 형식은 유지하되 게임 요소를 걷어내고 교육 카테고리 비게임으로 설계해, 심사 리드타임을 없앴습니다.',
      },
      {
        t: '"시험형"에서 "놀이형"으로 전면 재설계',
        d: '초기 8개 카테고리(과학·역사·경제…)가 너무 어려워 이탈이 났습니다. 2,400문제를 전량 폐기하고 영화·K팝·밈·동물처럼 아는 이야기로 12개 카테고리를 다시 짰습니다. 어려운 문제는 암기형 대신 반전·함정형으로 바꿔 오답노트가 재방문 이유가 되게 했습니다.',
      },
      {
        t: '보상은 주되, 광고는 강제하지 않기',
        d: '리워드 광고를 항상 "선택"으로 유지했습니다. 시청을 강제하면 단기 노출은 오르지만 정책 위반 소지가 있고 리텐션이 먼저 깨집니다.',
      },
    ],
  },
  {
    id: 'walk',
    name: '반려동물 산책지수',
    appName: 'axiom-walk',
    category: '생활 · 비게임',
    released: '2026 출시',
    color: '#5cb2ed',
    summary: '오늘 산책 나가도 되는지를 지수 하나로. 전국 3,564개 읍면동 지원.',
    decisions: [
      {
        t: '외부 API 두 개를 하나의 지수로',
        d: '기상청과 에어코리아는 좌표계도 갱신 주기도 다릅니다. 기상 격자와 측정소를 최근접 매핑해 읍면동 단위로 붙이고, 두 값을 하나의 산책지수로 합쳐 사용자가 판단할 필요가 없게 만들었습니다.',
      },
      {
        t: '프록시와 캐시를 기획에 포함',
        d: '공공 API는 계정당 쿼터가 있습니다. 클라이언트에서 직접 부르지 않고 Edge Function 프록시 + 캐시 테이블을 거치게 해, 사용자가 늘어도 쿼터가 먼저 터지지 않도록 설계했습니다.',
      },
    ],
  },
  {
    id: 'spending',
    name: '소비유형 테스트',
    appName: 'axiom-spending-type-test',
    category: '콘텐츠 · 비게임',
    released: '2026 출시',
    color: '#4ec2a8',
    summary: '2지선다 밸런스 게임으로 소비 성향을 진단. 3축 → 8유형.',
    decisions: [
      {
        t: '광고 게이트를 "재시도"가 아니라 "결과 공개 직전"에',
        d: '유형 테스트는 재시도율이 낮습니다. 재시도에 광고를 걸면 대부분 한 번도 보지 않습니다. 완주자 전원이 반드시 지나는 결과 공개 직전으로 옮겨 노출을 확보하고, 세트 선택·한 번 더·공유는 전부 무료로 열어뒀습니다.',
      },
      {
        t: '실패해도 막지 않는 안전장치',
        d: '광고 미지원 환경이거나 로드가 실패하면 결과를 그냥 공개합니다. 수익 한 번보다 "결과를 못 봤다"는 경험이 더 비쌉니다.',
      },
      {
        t: '테스트를 모듈로',
        d: '테스트별로 독립된 결과 유니버스를 갖도록 구조를 잡았습니다. 새 테스트 추가 = 모듈 하나 + 이미지 폴더. 문항만 갈아끼우면 되도록 처음부터 재사용 틀로 만들었습니다.',
      },
    ],
  },
  {
    id: 'coffee',
    name: '오늘은 누가 쏠래?',
    appName: 'coffee-slot',
    category: '편의 · 비게임',
    released: '2026 출시',
    color: '#e8763c',
    summary: '커피 내기 슬롯머신. 이름 2~10명을 넣고 돌리면 한 명을 지목.',
    decisions: [
      {
        t: '확률이 아니라 연출을 손대기',
        d: '재미를 위해 확률을 비틀면 내기 도구로서 신뢰를 잃습니다. 당첨 확률은 정확히 균등 1/N로 고정하고, 긴장감은 붉은 스포트라이트가 후보 사이를 오가는 연출로 만들었습니다.',
      },
      {
        t: '심사 반려를 원인까지 파고들기',
        d: '아이콘 불일치로 반복 반려됐습니다. 픽셀을 맞춰도 계속 튕겼는데, 공식 문서를 확인해 `brand.icon`이 이미지가 아니라 콘솔에 올린 로고의 URL이어야 한다는 걸 찾아 해결했습니다. 같은 그림이 아니라 같은 파일이어야 했습니다.',
      },
    ],
  },
];

/* ── 회고 ── */
const LEARNED = [
  {
    t: '만드는 계획은 있었고, 알리는 계획은 없었습니다',
    d: '네 개 다 "출시"를 목표로 잡았습니다. 심사 통과가 결승선이었고, 그 뒤는 비어 있었습니다. 획득 채널·초기 시드 유저·공유 동기를 기획서에 한 줄도 적지 않았고, 그래서 네 개가 똑같은 지점에서 멈췄습니다.',
  },
  {
    t: '리텐션을 검증할 만큼의 유입이 없었습니다',
    d: '오답노트, 업적 40종, 결과 공유 — 재방문 장치는 다 넣었습니다. 그런데 그게 작동하는지 판단할 표본 자체가 없었습니다. 리텐션 설계는 유입이 있고 나서의 문제라는 걸, 순서를 틀리고 나서 알았습니다.',
  },
  {
    t: '다음에는 채널부터 정하고 시작합니다',
    d: '무엇을 만들지보다 "누가 어디서 이걸 처음 보게 되는가"를 먼저 정하려 합니다. 그게 정해지지 않으면 기능이 아무리 촘촘해도 도달하지 않는다는 걸 네 번 확인했습니다.',
  },
];

function SectionLabel({ children }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="text-[11px] font-bold tracking-[0.3em] uppercase mb-6"
      style={{ color: '#6d4fd6' }}
    >
      {children}
    </motion.p>
  );
}

function AppCard({ app, index }) {
  return (
    <motion.article
      id={`app-${app.id}`}
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="overflow-hidden"
      style={{ borderRadius: 24, background: '#fff', border: `1px solid ${BORDER}`, boxShadow: '0 8px 24px rgba(24,32,27,0.05)', scrollMarginTop: 24 }}
    >
      {/* 헤더 — 앱 색으로 구분 */}
      <div className="px-6 md:px-8 py-6 flex flex-wrap items-center justify-between gap-3"
        style={{ borderBottom: `1px solid ${BORDER}`, background: `${app.color}12` }}>
        <div className="flex items-center gap-3">
          <span style={{ width: 10, height: 10, borderRadius: 99, background: app.color, flexShrink: 0 }} />
          <div>
            <h3 className="text-[19px] md:text-[22px] font-extrabold leading-tight"
              style={{ color: INK, letterSpacing: '-0.025em' }}>
              {app.name}
            </h3>
            <p className="text-[11.5px] mt-1" style={{ color: INK_45, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
              {app.appName}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold px-3 py-1.5 rounded-full"
            style={{ background: '#fff', border: `1px solid ${BORDER}`, color: INK_60 }}>
            {app.category}
          </span>
          <span className="text-[11px] font-bold px-3 py-1.5 rounded-full"
            style={{ background: app.color, color: '#fff' }}>
            {app.released}
          </span>
        </div>
      </div>

      <div className="px-6 md:px-8 py-6">
        <p className="text-[14px] leading-[1.8] mb-6" style={{ color: INK_60 }}>{app.summary}</p>

        <p className="text-[10px] font-bold tracking-[0.25em] uppercase mb-4" style={{ color: INK_45 }}>
          기획 판단
        </p>
        <div className="flex flex-col gap-5">
          {app.decisions.map((d, i) => (
            <div key={d.t} className="flex gap-4">
              <span className="text-[11px] font-bold pt-0.5 flex-shrink-0"
                style={{ color: app.color, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="text-[14px] font-bold mb-1.5" style={{ color: INK }}>{d.t}</p>
                <p className="text-[13px] leading-[1.9]" style={{ color: INK_60 }}>{d.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function AppsSection() {
  return (
    <section className="px-6 md:px-8 pb-4" style={{ maxWidth: 1100, margin: '0 auto' }}>
      <SectionLabel>Shipped</SectionLabel>
      <div className="flex flex-col gap-5">
        {APPS.map((a, i) => <AppCard key={a.id} app={a} index={i} />)}
      </div>
    </section>
  );
}

function RetroSection() {
  return (
    <section className="px-6 md:px-8 py-16" style={{ maxWidth: 1100, margin: '0 auto' }}>
      <SectionLabel>What Didn&apos;t Work</SectionLabel>

      <h2 className="text-[26px] md:text-[36px] font-extrabold leading-[1.24] mb-5"
        style={{ color: INK, letterSpacing: '-0.03em' }}>
        네 개 다 출시했지만,<br />유저는 만들지 못했습니다
      </h2>
      <p className="text-[14px] md:text-[15px] leading-[1.9] mb-10" style={{ color: INK_60, maxWidth: 620 }}>
        퀴즈왕이 2026년 7월에 70여 명 방문한 뒤로 유입이 멈췄고, 나머지 셋도 마찬가지입니다.
        숨길 이유가 없어서 그대로 적습니다. 이 페이지에서 제가 보여드릴 수 있는 건
        성과가 아니라, 실패의 원인을 어디까지 짚었는가입니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {LEARNED.map((l, i) => (
          <motion.div
            key={l.t}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="p-6 rounded-2xl"
            style={{ background: CARD, border: `1px solid ${BORDER}` }}
          >
            <p className="text-[11px] font-bold mb-3"
              style={{ color: '#6d4fd6', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
              {String(i + 1).padStart(2, '0')}
            </p>
            <p className="text-[15px] font-bold leading-snug mb-3" style={{ color: INK }}>{l.t}</p>
            <p className="text-[13px] leading-[1.9]" style={{ color: INK_60 }}>{l.d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CtaSection({ onNavigate }) {
  return (
    <section className="px-6 md:px-8 pb-20" style={{ maxWidth: 1100, margin: '0 auto' }}>
      <div className="flex flex-wrap items-center gap-2.5">
        <button onClick={() => onNavigate?.('withai')}
          className="px-6 py-3 rounded-full text-[13px] font-bold cursor-pointer transition-transform"
          style={{ background: '#12211a', color: '#fff' }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}>
          어떻게 만들었는지 보기 (AI-lab)
        </button>
        <button onClick={() => onNavigate?.('kisti')}
          className="px-6 py-3 rounded-full text-[13px] font-semibold cursor-pointer transition-all"
          style={{ background: CARD, border: `1px solid ${BORDER}`, color: INK }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#fff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = CARD; }}>
          실무 프로젝트 보기
        </button>
      </div>
    </section>
  );
}

/* ── 앱 인덱스 옵션 휠 ──
   우측 가장자리를 축으로 감긴 세로 휠. 가운데 항목이 선명하고,
   멀어질수록 기울고 흐려진다. 스크롤 휠·드래그·클릭으로 회전,
   활성 항목을 한 번 더 클릭하면 아래 해당 앱 카드로 스크롤. */
/* ⚙️ 휠 모양은 이 상수만 만지면 됩니다.
   방식 자체가 "오른쪽 축 회전" — 좌표 계산 없이, 회전축(transform-origin)을
   각 항목의 오른쪽 모서리에서 radius(px)만큼 더 나간 지점에 박고 rotate만 한다.
   모든 항목의 오른쪽 끝이 정렬돼 있어서 전부 같은 축을 돌게 되고,
   부챗살처럼 오른쪽에 고정된 채 왼쪽 끝이 벌어진다.

   stepDeg  한 칸당 부채 각도. 크면 활짝 벌어짐 (10~18 권장)
   radius   회전축이 오른쪽 모서리에서 얼마나 바깥에 있는지(px).
            작으면 급한 부채(축이 바로 옆), 크면 완만한 원호 (0~300)
   dir      뒷 번호(2,3,4…)가 펼쳐지는 방향. 1 = 위로, -1 = 아래로.
            위아래가 반대로 보이면 이 값만 뒤집으면 됨
   slotY    활성 슬롯(축)의 세로 위치 — 휠 영역 기준.
            '50%' = 중간, '30%' = 위쪽, 픽셀값(예: 300)도 가능
   fade     한 칸 멀어질 때 깎이는 불투명도 (바닥 0.35)
   blurStep 한 칸 멀어질 때 더해지는 블러 px (최대 1.6, 0이면 블러 없음) */
const WHEEL = {
  stepDeg: 30,
  radius: 360,
  dir: 1,
  slotY: '50%',
  fade: 1,
  blurStep: 1,
};
/* 드래그 환산용 — 한 칸당 텍스트 중심부의 대략적 세로 이동량.
   (텍스트 중심은 축에서 radius + 약 140px 거리에 있다) */
const WHEEL_STEP_PX = (WHEEL.radius + 140) * Math.sin((WHEEL.stepDeg * Math.PI) / 180);

function AppWheel() {
  /* 초기 선택 = 1번 — 아래쪽 활성 슬롯에 1번이 하이라이트된 채,
     2~4번이 dir 방향(기본: 위)으로 감겨 올라간 상태로 시작한다 */
  const [sel, setSel] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);  // 드래그 중 부동 소수 오프셋
  const [dragging, setDragging] = useState(false);  // 렌더용 — 드래그 중엔 transition 끔
  const drag = useRef(null);                        // { startY, moved }
  const wheelLock = useRef(0);

  const clamp = (v) => Math.max(0, Math.min(APPS.length - 1, v));
  const pos = sel - dragOffset; // 렌더 기준 위치(드래그 중엔 소수)

  const onWheel = (e) => {
    const now = Date.now();
    if (now - wheelLock.current < 260) return; // 트랙패드 연타 방지
    wheelLock.current = now;
    setSel((s) => clamp(s + (e.deltaY > 0 ? 1 : -1)));
  };

  const onPointerDown = (e) => {
    drag.current = { startY: e.clientY, moved: false };
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!drag.current) return;
    const dy = (e.clientY - drag.current.startY) / WHEEL_STEP_PX;
    if (Math.abs(dy) > 0.08) drag.current.moved = true;
    setDragOffset(dy);
  };
  const onPointerUp = () => {
    if (!drag.current) return;
    setSel((s) => clamp(Math.round(s - dragOffset)));
    setDragOffset(0);
    setDragging(false);
    drag.current = null;
  };

  const onItemClick = (i) => {
    if (drag.current?.moved) return; // 드래그 끝의 클릭 오발 방지
    // hover가 이미 선택을 담당하므로 클릭은 항상 해당 앱 카드로 이동
    document.getElementById(`app-${APPS[i].id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      className="absolute z-20 hidden md:block select-none"
      style={{ right: 0, top: 90, bottom: 200, width: 380, touchAction: 'none', cursor: 'grab' }}
      onWheel={onWheel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* 활성 슬롯(축) 위치 — WHEEL.slotY로 조정 */}
      <div className="relative" style={{ position: 'absolute', top: WHEEL.slotY, right: 44, width: '100%' }}>
        {APPS.map((a, i) => {
          const d = i - pos;                       // 활성 슬롯으로부터의 거리
          const abs = Math.abs(d);
          const active = Math.round(pos) === i;
          /* 이동 계산 없음 — 모든 항목이 같은 자리에서 시작해,
             오른쪽 바깥의 공통 축을 중심으로 회전만 한다.
             부호를 뒤집어 앞 번호(d<0)는 위로, 뒷 번호(d>0)는 아래로 —
             어느 항목이 활성이든 화면에는 항상 1→4 순서로 읽힌다. */
          return (
            <button
              key={a.id}
              onClick={() => onItemClick(i)}
              onMouseEnter={() => { if (!drag.current) setSel(i); }}
              className="absolute right-0 flex items-center gap-3 cursor-pointer whitespace-nowrap"
              style={{
                top: -31, /* 대략 텍스트 높이의 절반 — 활성 항목이 축 선상에 오도록 */
                transform: `rotate(${WHEEL.dir * d * WHEEL.stepDeg}deg)`,
                transformOrigin: `calc(100% + ${WHEEL.radius}px) 50%`,
                opacity: Math.max(0.35, 1 - abs * WHEEL.fade),
                filter: abs > 0.3 ? `blur(${Math.min(1.6, abs * WHEEL.blurStep)}px)` : 'none',
                transition: dragging
                  ? 'none'
                  : 'transform 0.32s cubic-bezier(0.22,1,0.36,1), opacity 0.32s ease, filter 0.32s ease',
              }}
            >
              <span className="text-[13px] font-bold"
                style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-[40px] lg:text-[52px] font-extrabold"
                style={{
                  color: active ? '#ffffff' : 'rgba(255,255,255,0.6)',
                  letterSpacing: '-0.04em',
                  transition: 'color 0.3s ease',
                }}>
                {a.name}
              </span>
              <span style={{ width: 11, height: 11, borderRadius: 99, background: a.color, flexShrink: 0 }} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── 히어로 패널 ── */
function HeroPanel({ isMobile }) {
  return (
    <>
      <div className="relative z-30 flex items-center justify-between gap-3 px-6 md:px-9 pt-6">
        {/* 어깨 라벨 = 네비 문장의 완성형 — "Made" 탭이 이 페이지로 연결된다 */}
        <p className="text-[10.5px] font-bold tracking-[0.28em] uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>
          What I made
        </p>
        <span className="text-[11px] font-semibold px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.24)', color: '#fff' }}>
          토스 앱인토스 · 4종 출시
        </span>
      </div>

      {/* 대형 타이포 — 좌측 상단 */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="absolute z-0 pointer-events-none select-none"
        style={{ top: isMobile ? 62 : 78, left: isMobile ? 18 : 40, margin: 0 }}
      >
        <span style={{
          display: 'block',
          fontSize: isMobile ? 'clamp(52px, 17vw, 76px)' : 'clamp(74px, 10.5vw, 158px)',
          fontWeight: 900, letterSpacing: '-0.055em',
          lineHeight: 0.92, whiteSpace: 'nowrap',
          backgroundImage:
            'linear-gradient(180deg, rgba(255,255,255,0.86) 26%, rgba(255,255,255,0.48) 62%, rgba(255,255,255,0.08) 100%)',
          WebkitBackgroundClip: 'text', backgroundClip: 'text',
          color: 'transparent', WebkitTextFillColor: 'transparent',
        }}>
          SOLO
        </span>
        <span style={{
          display: 'block',
          marginTop: isMobile ? 8 : 12,
          fontSize: isMobile ? 14 : 21,
          fontWeight: 600, letterSpacing: '-0.01em',
          color: 'rgba(255,255,255,0.68)',
          whiteSpace: 'nowrap',
        }}>
          혼자 기획하고 혼자 출시한 것들
        </span>
      </motion.h1>

      {/* 우측 — 앱 인덱스 옵션 휠 (Work의 오브젝트 자리) */}
      <AppWheel />

      {/* 좌하단 — 요약 · 지표 */}
      <div className="absolute left-0 bottom-0 z-20 px-6 md:px-10 pb-6 md:pb-9 w-full md:w-auto"
        style={{ width: isMobile ? '100%' : 'max(440px, calc(50% - 200px))' }}>
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}>
          <p className="text-[10.5px] font-semibold mb-2.5" style={{ color: ACCENT }}>
            기획 · 디자인 · 개발 · 심사 · 배포 전 과정 단독
          </p>
          <h2 className="text-[20px] md:text-[25px] font-extrabold leading-[1.28] mb-3"
            style={{ color: '#fff', letterSpacing: '-0.025em' }}>
            기관 용역 밖에서도<br />제품이 굴러가는지 확인했습니다
          </h2>
          <p className="text-[13px] leading-[1.85] mb-5" style={{ color: 'rgba(255,255,255,0.78)' }}>
            토스 앱인토스에 미니앱 4종을 올렸습니다. B2C 서비스의 수익 모델·심사·배포·운영을
            직접 겪으면서, 실무에서는 남이 대신 해주던 구간을 전부 통과했습니다.
          </p>
          <div className="flex gap-5">
            {[
              { num: '4종', label: '출시 완료' },
              { num: '3,600', label: '문제 데이터 설계' },
              { num: '3,564', label: '읍면동 데이터 매핑' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-[17px] font-extrabold leading-none mb-1" style={{ color: '#fff' }}>{s.num}</p>
                <p className="text-[10px] leading-snug" style={{ color: 'rgba(255,255,255,0.55)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default function SoloWork({ onNavigate }) {
  const isMobile = useMedia('(max-width: 767px)');

  return (
    <div className="relative w-full overflow-x-hidden"
      style={{ backgroundColor: '#efedf4', color: '#1a231e' }}>
      <div className="px-4 md:px-6 py-6">
        <div style={{ maxWidth: 1640, margin: '0 auto' }}>
          <FrameCard
            label="Solo Work"
            meta="개인 프로젝트 · 2026"
            accent={ACCENT}
            scrollBtnColor={PANEL_BG}
            panelStyle={{ background: `linear-gradient(150deg, ${PANEL_SOFT} 0%, ${PANEL_BG} 62%)` }}
            panel={<HeroPanel isMobile={isMobile} />}
          >
            <AppsSection />
            <RetroSection />
            <CtaSection onNavigate={onNavigate} />
          </FrameCard>
        </div>
      </div>
    </div>
  );
}
