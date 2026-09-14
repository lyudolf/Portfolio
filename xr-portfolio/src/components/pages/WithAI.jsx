import { motion } from 'framer-motion';

/* ══════════════════════════════════════════
   AI-lab — "What I try"
   2026-09-15 재설계. 이전 버전은 전체화면 IDE 셸(탐색기·탭·터미널)이었는데,
   뷰포트를 통째로 가둬 답답했고 정작 보여줄 것(실험 2건)이 파일 클릭 뒤에 숨어 있었다.
   am/do/made 세 페이지가 이미 "둥근 패널 히어로 + 섹션" 한 틀이라, 여기는 그 틀도 쓰지 않는다.
   형식은 실험 기록(lab record): 모눈 바탕, 좌측 정렬 헤더, 모노스페이스 스탬프, 가는 괘선, 영상 인라인.
   IDE의 흔적은 실행 로그 슬랩과 protocol.json 코드 블록에만 남긴다.
   ══════════════════════════════════════════ */

const ACCENT = '#c2410c';
const INK = 'rgba(24,32,27,0.9)';
const INK_60 = 'rgba(24,32,27,0.64)';
const INK_45 = 'rgba(24,32,27,0.5)';
const RULE = 'rgba(24,32,27,0.14)';
const RULE_SOFT = 'rgba(24,32,27,0.08)';
const SLAB = '#12211a';
const MONO = '"JetBrains Mono", "Fira Code", ui-monospace, monospace';

/* ── 데이터 ── */
const EXPERIMENTS = [
  {
    id: 'leaf',
    stamp: 'EXP-01',
    detailPage: 'leaf-detail',
    title: 'Leaf It Alone',
    sub: '8,000개의 낙엽을 치우는 브라우저 3D 게임. 7일 단독 개발·배포.',
    tags: ['Next.js', 'React Three Fiber', 'ONNX Runtime', 'Zustand'],
    meta: [{ k: 'duration', v: '7일' }, { k: 'role', v: '기획·개발 단독' }, { k: 'status', v: 'live' }],
    video: '/withai/leaf/render.mp4',
    poster: '/withai/leaf/leaf.jpg',
    mediaTag: 'InstancedMesh — 8,000 objects / 1 draw call',
    body: [
      '1인칭 시점으로 낙엽을 치우는 캐주얼 게임입니다. 아이디어부터 배포까지 7일이 걸렸고, 기획·개발·배포를 혼자 했습니다.',
      '만들면서 확인하고 싶었던 건 하나였습니다 — AI를 제대로 쓰면 기획자가 어디까지 직접 만들 수 있는가.',
    ],
    highlights: [
      'InstancedMesh로 8,000개 오브젝트를 단일 드로우콜로 렌더링',
      '정지한 낙엽의 물리 연산을 건너뛰는 수면 시스템으로 평균 70% 객체를 비활성 유지',
      'PyTorch로 학습한 모델을 ONNX로 변환해 브라우저에서 직접 추론하는 적대적 AI 탑재',
      '수집 → 봉투 → 판매 → 업그레이드로 이어지는 경제 루프와 5스테이지 난이도 곡선 설계',
    ],
    link: 'https://leaf-it-alone-web.vercel.app/',
    linkLabel: 'leaf-it-alone-web.vercel.app',
    log: [
      '$ npm run build && vercel deploy --prod',
      '✓ built in 3.2s',
      '✓ deployed — leaf-it-alone-web.vercel.app',
      '! 8000 instances / 1 draw call',
    ],
  },
  {
    id: 'rl',
    stamp: 'EXP-02',
    detailPage: 'rl-detail',
    title: 'Hide & Seek RL',
    sub: '보상을 잘못 설계하면, 시스템은 보상만 최적화한다.',
    tags: ['Unity ML-Agents', 'PPO', 'Self-Play', 'LSTM', 'ONNX'],
    meta: [{ k: 'period', v: '2026.02' }, { k: 'steps', v: '27,000,000' }, { k: 'revisions', v: '5' }],
    video: '/withai/rl/v2-distance.mp4',
    poster: '/withai/rl/thumb.png',
    mediaTag: 'V2 — 거리 보상을 넣자 술래가 벽 너머 신호에 밀착',
    body: [
      'OpenAI Hide & Seek을 Unity ML-Agents로 재현한 개인 실험. 술래와 도망자를 셀프플레이로 붙여 누적 2,700만 step을 학습시켰고, 그동안 보상 설계를 다섯 번 갈아엎었습니다.',
      '남은 것은 강화학습 지식이 아니라 인센티브 설계의 실패 기록입니다.',
    ],
    highlights: [
      '거리 보상을 넣자 술래가 탐색을 버리고 벽 너머 신호에 밀착 — 지표를 주면 지표만 최적화된다',
      '도망자가 램프를 벽 밖으로 떨어뜨려 발각 불가 상태를 만드는 버그를 스스로 발견',
      '중간 보상을 전량 삭제하고 승 +1 / 패 -1만 남기자, 가르친 적 없는 입구 봉쇄 전략이 출현',
    ],
    link: 'https://github.com/lyudolf/hideNseek_ML',
    linkLabel: 'github.com/lyudolf/hideNseek_ML',
    log: [
      '$ mlagents-learn config/hns.yaml --run-id=v5',
      '  Step: 5,000,000  Hider: -0.31  Seeker: 0.28',
      '  Step: 27,000,000 Hider: 0.74  Seeker: -0.66',
      '✓ exported → HiderBrain.onnx, SeekerBrain.onnx',
    ],
  },
];

const WORKFLOW_STEPS = [
  { agent: 'Human', title: '아키텍처 설계', desc: '기술 스택 선정, 데이터 구조 정의, 인터페이스 경계 결정. 무엇을 만들지는 사람이 정합니다.' },
  { agent: 'AI', title: '구현·생성', desc: '보일러플레이트, UI 컴포넌트, 반복 로직. 초안을 빠르게 뽑아내는 구간입니다.' },
  { agent: 'Human', title: '검증·예외 처리', desc: 'API 실패 방어, 엣지 케이스, 성능 최적화. 비즈니스 로직의 최종 책임은 사람이 집니다.' },
];

const PROTOCOL_RULES = [
  { key: 'no_unconditional_agreement', desc: '무조건적으로 동의하지 말 것. 논리적·기술적 오류가 있으면 반드시 지적할 것.' },
  { key: 'provide_factual_grounding', desc: '기술적 답변 시 추론의 근거를 짧게 명시할 것. "~인 것 같습니다"는 금지.' },
  { key: 'confirm_before_execution', desc: '복잡한 태스크는 실행 전 이해한 바를 요약하여 컨펌을 받을 것.' },
  { key: 'skip_apologies', desc: '사과와 아첨을 생략하고, 모르면 모른다고 명확히 밝힐 것.' },
];

/* 헤더 아래 스펙 눈금 — 페이지 전체를 한 줄로 요약하는 계기판 */
const SPECS = [
  { k: 'experiments', v: '02' },
  { k: 'build', v: '7 days' },
  { k: 'training steps', v: '27,000,000' },
  { k: 'rules', v: '04' },
];

/* ── 프리미티브 ── */
const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
};

function Mono({ children, color = INK_45, size = 11, style, className }) {
  return (
    <span className={className} style={{ fontFamily: MONO, fontSize: size, letterSpacing: '0.04em', color, ...style }}>
      {children}
    </span>
  );
}

function SectionHead({ index, label, title }) {
  return (
    <div className="flex items-baseline gap-4 mb-8" style={{ borderBottom: `1px solid ${RULE}`, paddingBottom: 12 }}>
      <Mono color={ACCENT} size={11.5} style={{ fontWeight: 700 }}>{index}</Mono>
      <h2 className="text-[22px] md:text-[26px] font-extrabold leading-none" style={{ color: INK, letterSpacing: '-0.025em' }}>
        {title}
      </h2>
      <Mono style={{ marginLeft: 'auto', textTransform: 'uppercase' }} className="hidden md:inline">{label}</Mono>
    </div>
  );
}

function Label({ children }) {
  return (
    <p className="text-[10.5px] font-bold tracking-[0.22em] uppercase mb-3" style={{ color: INK_45 }}>
      {children}
    </p>
  );
}

/* 실행 로그 — 이전 IDE 터미널의 흔적. 어두운 슬랩 하나로만 남긴다. */
function LogSlab({ lines }) {
  const color = (ln) =>
    ln.startsWith('$') ? '#8ab4f8'
      : ln.startsWith('✓') ? '#7ef1d6'
        : ln.startsWith('!') ? '#f2b880' : 'rgba(255,255,255,0.62)';
  return (
    <div style={{
      background: SLAB, borderRadius: 8, padding: '12px 16px',
      fontFamily: MONO, fontSize: 11.5, lineHeight: 1.9, overflowX: 'auto',
    }}>
      {lines.map((ln, i) => (
        <p key={i} style={{ color: color(ln), whiteSpace: 'pre', margin: 0 }}>{ln}</p>
      ))}
    </div>
  );
}

/* ── 실험 기록 한 건 ── */
function Experiment({ exp, onNavigate }) {
  return (
    <motion.article {...fadeUp} className="py-10 md:py-12" style={{ borderTop: `1px solid ${RULE}` }}>
      <div className="grid gap-x-10 gap-y-7 md:grid-cols-[136px_1fr] lg:grid-cols-[136px_minmax(0,1fr)_400px]">
        {/* 스탬프 + 메타 */}
        <div className="flex md:flex-col items-baseline md:items-start gap-x-5 gap-y-4">
          <p style={{ fontFamily: MONO, fontSize: 13, fontWeight: 700, color: ACCENT, letterSpacing: '0.06em' }}>
            {exp.stamp}
          </p>
          <dl className="flex md:flex-col flex-wrap gap-x-4 gap-y-1.5">
            {exp.meta.map((m) => (
              <div key={m.k} className="flex gap-1.5" style={{ whiteSpace: 'nowrap' }}>
                <dt><Mono>{m.k}</Mono></dt>
                <dd><Mono color={INK}>{m.v}</Mono></dd>
              </div>
            ))}
          </dl>
        </div>

        {/* 본문 */}
        <div style={{ minWidth: 0 }}>
          <h3 className="text-[28px] md:text-[34px] font-extrabold leading-[1.15] mb-2.5"
            style={{ color: INK, letterSpacing: '-0.03em' }}>
            {exp.title}
          </h3>
          <p className="text-[15px] md:text-[16px] leading-[1.7] mb-4" style={{ color: INK_60 }}>{exp.sub}</p>
          <div className="flex flex-wrap gap-1.5 mb-7">
            {exp.tags.map((t) => (
              <span key={t} style={{
                fontFamily: MONO, fontSize: 11, color: INK_60,
                border: `1px solid ${RULE}`, borderRadius: 4, padding: '2px 8px', background: 'rgba(255,255,255,0.5)',
              }}>
                {t}
              </span>
            ))}
          </div>

          <Label>확인하고 싶었던 것</Label>
          {exp.body.map((t) => (
            <p key={t} className="text-[14px] leading-[1.9] mb-2.5" style={{ color: INK_60 }}>{t}</p>
          ))}

          <div className="mt-6">
            <Label>확인한 것</Label>
            <ul className="flex flex-col gap-2.5">
              {exp.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-[14px] leading-[1.8]" style={{ color: INK }}>
                  <span style={{ fontFamily: MONO, color: ACCENT, flexShrink: 0, fontWeight: 700 }}>+</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-8">
            <button onClick={() => onNavigate?.(exp.detailPage)}
              className="px-5 py-2.5 rounded-full text-[12.5px] font-bold cursor-pointer transition-transform"
              style={{ background: SLAB, color: '#fff' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}>
              전체 케이스 스터디 →
            </button>
            <a href={exp.link} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: MONO, fontSize: 12, color: INK_60, textDecoration: 'underline', textUnderlineOffset: 4 }}>
              {exp.linkLabel} ↗
            </a>
          </div>
        </div>

        {/* 미디어 + 로그 */}
        <div className="md:col-start-2 lg:col-start-3 flex flex-col gap-3" style={{ minWidth: 0 }}>
          <figure style={{ margin: 0 }}>
            <div style={{
              aspectRatio: '16 / 9', borderRadius: 8, overflow: 'hidden',
              border: `1px solid ${RULE}`, background: '#0f1512',
            }}>
              <video src={exp.video} poster={exp.poster} autoPlay muted loop playsInline preload="metadata"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <figcaption className="mt-2">
              <Mono>{exp.mediaTag}</Mono>
            </figcaption>
          </figure>
          <LogSlab lines={exp.log} />
        </div>
      </div>
    </motion.article>
  );
}

/* ── 역할 분담 — 가로 한 줄 타임라인 ── */
function Workflow() {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      {/* 연결선 (데스크톱) */}
      <div className="hidden md:block absolute left-0 right-0" style={{ top: 9, height: 1, background: RULE }} />
      {WORKFLOW_STEPS.map((s, i) => {
        const human = s.agent === 'Human';
        return (
          <motion.div key={s.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }} className="relative">
            <div className="flex items-center gap-3 mb-4">
              <span style={{
                width: 19, height: 19, borderRadius: 99, flexShrink: 0,
                background: human ? SLAB : '#fff', border: `2px solid ${human ? SLAB : ACCENT}`,
              }} />
              <span style={{
                fontFamily: MONO, fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em',
                color: human ? '#fff' : ACCENT, background: human ? SLAB : 'transparent',
                border: `1px solid ${human ? SLAB : ACCENT}`, borderRadius: 4, padding: '2px 8px',
              }}>
                {s.agent.toUpperCase()}
              </span>
              <Mono>0{i + 1}</Mono>
            </div>
            <p className="text-[17px] font-extrabold mb-2" style={{ color: INK, letterSpacing: '-0.02em' }}>{s.title}</p>
            <p className="text-[13.5px] leading-[1.85]" style={{ color: INK_60 }}>{s.desc}</p>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ── protocol.json — 코드 블록 그대로 ── */
function Protocol() {
  const lines = [
    '{',
    ...PROTOCOL_RULES.flatMap((r, i) => [
      `  "${r.key}": {`,
      `    "rule": "${r.desc}"`,
      `  }${i < PROTOCOL_RULES.length - 1 ? ',' : ''}`,
    ]),
    '}',
  ];
  return (
    <motion.div {...fadeUp} style={{ background: SLAB, borderRadius: 14, padding: '22px 8px 20px 0', overflowX: 'auto' }}>
      <div className="flex items-center gap-2 mb-3" style={{ paddingLeft: 52 }}>
        <Mono color="rgba(255,255,255,0.45)">protocol.json</Mono>
        <Mono color="rgba(255,255,255,0.25)">· 4 rules</Mono>
      </div>
      <div style={{ fontFamily: MONO, fontSize: 12.5, lineHeight: 2.05 }}>
        {lines.map((line, i) => (
          <div key={i} className="flex" style={{ whiteSpace: 'pre' }}>
            <span style={{ width: 52, textAlign: 'right', paddingRight: 18, color: 'rgba(255,255,255,0.28)', flexShrink: 0, userSelect: 'none' }}>
              {i + 1}
            </span>
            <span style={{
              color: line.includes('"rule"') ? '#f2b880'
                : line.trim().startsWith('"') ? '#8ab4f8' : 'rgba(255,255,255,0.62)',
            }}>
              {line}
            </span>
          </div>
        ))}
      </div>
      <p style={{ marginTop: 14, paddingLeft: 52, fontFamily: MONO, fontSize: 12, color: '#7ef1d6' }}>
        ✓ Protocol loaded. All rules enforced.
      </p>
    </motion.div>
  );
}

/* ── 페이지 ── */
export default function WithAI({ onNavigate }) {
  return (
    <div style={{
      background: '#f5f3ee',
      backgroundImage: `radial-gradient(${RULE_SOFT} 1px, transparent 1px)`,
      backgroundSize: '22px 22px',
      color: INK, minHeight: '100vh',
    }}>
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-32">

        {/* 헤더 — 네비 문장 "What I try"의 완성형 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center justify-between mb-6">
            <p className="text-[11px] font-bold tracking-[0.3em] uppercase" style={{ color: ACCENT }}>What I try</p>
            <Mono className="hidden md:inline" style={{ textTransform: 'uppercase' }}>lab record · 2026</Mono>
          </div>
          <h1 className="text-[36px] md:text-[54px] font-extrabold leading-[1.08] mb-5"
            style={{ color: INK, letterSpacing: '-0.035em' }}>
            with AI —<br className="md:hidden" /> Human-in-the-Loop
          </h1>
          <p className="text-[17px] md:text-[19px] font-semibold leading-[1.6] mb-4" style={{ color: INK, maxWidth: 640 }}>
            AI로 직접 만든 것들의 기록.
          </p>
          <p className="text-[15px] leading-[1.9]" style={{ color: INK_60, maxWidth: 640 }}>
            AI는 사람을 대체하는 도구가 아니라, 판단의 속도를 올리는 증폭기라고 봅니다.
            방향을 정하는 일과 결과를 책임지는 일은 여전히 사람 몫이고, 그 사이의 실행 구간이 극적으로 짧아졌을 뿐입니다.
          </p>
        </motion.div>

        {/* 스펙 눈금 */}
        <motion.div {...fadeUp} className="grid grid-cols-2 md:grid-cols-4 mt-12 mb-20"
          style={{ borderTop: `1px solid ${INK}`, borderBottom: `1px solid ${RULE}` }}>
          {SPECS.map((s, i) => (
            <div key={s.k} className="py-4 pr-4"
              style={{ borderLeft: i % 2 === 1 ? `1px solid ${RULE}` : 'none', paddingLeft: i % 2 === 1 ? 16 : 0 }}>
              <Mono style={{ display: 'block', marginBottom: 6, textTransform: 'uppercase' }}>{s.k}</Mono>
              <span className="text-[20px] md:text-[24px] font-extrabold leading-none" style={{ color: INK, letterSpacing: '-0.02em', fontFamily: MONO }}>
                {s.v}
              </span>
            </div>
          ))}
        </motion.div>

        {/* 01 실험 기록 */}
        <SectionHead index="01" label="experiments" title="실험 기록" />
        <div style={{ borderBottom: `1px solid ${RULE}` }}>
          {EXPERIMENTS.map((e) => <Experiment key={e.id} exp={e} onNavigate={onNavigate} />)}
        </div>

        {/* 02 역할 분담 */}
        <div className="mt-24">
          <SectionHead index="02" label="workflow" title="사람이 설계하고, AI가 생산하고, 사람이 검증합니다" />
          <Workflow />
        </div>

        {/* 03 규칙 */}
        <div className="mt-24">
          <SectionHead index="03" label="protocol" title="AI를 쓸 때 매번 지키는 네 가지 규칙" />
          <Protocol />
        </div>

        {/* 다음 */}
        <div className="flex flex-wrap items-center gap-2.5 mt-20">
          <button onClick={() => onNavigate?.('solo')}
            className="px-6 py-3 rounded-full text-[13px] font-bold cursor-pointer transition-transform"
            style={{ background: SLAB, color: '#fff' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}>
            출시한 앱 보기 (Solo Work)
          </button>
          <button onClick={() => onNavigate?.('whyme')}
            className="px-6 py-3 rounded-full text-[13px] font-semibold cursor-pointer transition-all"
            style={{ background: 'rgba(255,255,255,0.6)', border: `1px solid ${RULE}`, color: INK }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.6)'; }}>
            일하는 방식 보기 (Why Me)
          </button>
        </div>
      </section>
    </div>
  );
}
