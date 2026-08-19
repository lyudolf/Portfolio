import IdeShell from '../ui/IdeShell';
import { IDE, MONO } from '../ui/ideTokens';

/* ══════════════════════════════════════════
   with AI — 작업 환경(에디터) 자체를 페이지로.
   콘텐츠는 "파일"로 정의하고, IdeShell이 탐색기·탭·에디터 셸을 제공한다.
   ══════════════════════════════════════════ */

/* ── 문서용 프리미티브 ── */
function DocHead({ title, sub, tags, meta }) {
  return (
    <div style={{ marginBottom: 26 }}>
      <h1 style={{
        fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em',
        lineHeight: 1.3, marginBottom: sub ? 8 : 14,
      }}>
        {title}
      </h1>
      {sub && (
        <p style={{ fontSize: 14, color: IDE.textDim, lineHeight: 1.7, marginBottom: 14 }}>{sub}</p>
      )}
      {tags && (
        <div className="flex flex-wrap gap-1.5" style={{ marginBottom: 12 }}>
          {tags.map((t) => (
            <span key={t} style={{
              fontSize: 11, fontFamily: MONO, color: IDE.accent,
              background: 'rgba(111,216,255,0.08)', border: '1px solid rgba(111,216,255,0.2)',
              borderRadius: 5, padding: '2px 8px',
            }}>
              {t}
            </span>
          ))}
        </div>
      )}
      {meta && (
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1"
          style={{ fontSize: 11.5, fontFamily: MONO, color: IDE.muted }}>
          {meta.map((m) => (
            <span key={m.k}>
              <span style={{ color: IDE.purple }}>{m.k}</span>
              <span style={{ opacity: 0.6 }}>: </span>
              <span style={{ color: IDE.string }}>{m.v}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function DocSection({ label, children }) {
  return (
    <section style={{ marginTop: 30 }}>
      {label && (
        <p style={{
          fontSize: 10.5, fontFamily: MONO, letterSpacing: '0.14em', textTransform: 'uppercase',
          color: IDE.muted, marginBottom: 12, paddingBottom: 7, borderBottom: `1px solid ${IDE.lineSoft}`,
        }}>
          {label}
        </p>
      )}
      {children}
    </section>
  );
}

function P({ children }) {
  return <p style={{ fontSize: 13.5, lineHeight: 1.95, color: IDE.textDim, marginBottom: 12 }}>{children}</p>;
}

function OpenPageButton({ onClick, label }) {
  return (
    <button onClick={onClick}
      className="cursor-pointer inline-flex items-center gap-2"
      style={{
        marginTop: 18, padding: '9px 16px', borderRadius: 7,
        background: 'rgba(111,216,255,0.1)', border: '1px solid rgba(111,216,255,0.28)',
        color: IDE.accent, fontSize: 12.5, fontWeight: 700,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(111,216,255,0.18)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(111,216,255,0.1)'; }}>
      ↗ {label}
    </button>
  );
}

function ExternalLink({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      style={{ color: IDE.accent, fontSize: 12.5, fontFamily: MONO, textDecoration: 'underline', textUnderlineOffset: 3 }}>
      {children}
    </a>
  );
}

/* ── 프로젝트 문서 ── */
function ProjectDoc({ data, onNavigate }) {
  return (
    <article>
      <DocHead title={data.title} sub={data.sub} tags={data.tags} meta={data.meta} />
      {data.media && (
        <div style={{
          borderRadius: 8, overflow: 'hidden', border: `1px solid ${IDE.line}`,
          marginBottom: 22, aspectRatio: '16 / 9', background: '#141414',
        }}>
          <img src={data.media} alt={data.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}
      <DocSection label="Overview">
        {data.body.map((t) => <P key={t}>{t}</P>)}
      </DocSection>
      {data.highlights && (
        <DocSection label="Highlights">
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {data.highlights.map((h) => (
              <li key={h} className="flex gap-2.5" style={{ fontSize: 13, lineHeight: 1.85, color: IDE.textDim }}>
                <span style={{ color: IDE.green, fontFamily: MONO, flexShrink: 0 }}>+</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </DocSection>
      )}
      <div className="flex flex-wrap items-center gap-4">
        {data.detailPage && (
          <OpenPageButton onClick={() => onNavigate?.(data.detailPage)} label="전체 케이스 스터디 열기" />
        )}
        {data.link && <span style={{ marginTop: 18 }}><ExternalLink href={data.link}>{data.linkLabel ?? data.link}</ExternalLink></span>}
      </div>
    </article>
  );
}

/* ── 데이터 ── */
const PROJECT_FILES = [
  {
    id: 'leaf',
    name: 'leaf-it-alone.md',
    kind: 'md',
    detailPage: 'leaf-detail',
    title: 'Leaf It Alone',
    sub: '8,000개의 낙엽을 치우는 브라우저 3D 게임. 7일 단독 개발·배포.',
    tags: ['React Three Fiber', 'ONNX Runtime', 'Zustand', 'Vercel'],
    meta: [{ k: 'duration', v: '7일' }, { k: 'role', v: '기획·개발 단독' }, { k: 'status', v: 'live' }],
    media: '/withai/leaf/leaf.jpg',
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
    terminal: [
      '$ npm run build && vercel deploy --prod',
      '✓ built in 3.2s',
      '✓ deployed — leaf-it-alone-web.vercel.app',
      '! 8000 instances / 1 draw call',
    ],
  },
  {
    id: 'rl',
    name: 'hide-n-seek.md',
    kind: 'log',
    detailPage: 'rl-detail',
    title: 'Hide & Seek RL',
    sub: '보상을 잘못 설계하면, 시스템은 보상만 최적화한다.',
    tags: ['Unity ML-Agents', 'PPO', 'Self-Play', 'LSTM', 'ONNX'],
    meta: [{ k: 'period', v: '2026.02' }, { k: 'steps', v: '27,000,000' }, { k: 'revisions', v: '5' }],
    media: '/withai/rl/thumb.png',
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
    terminal: [
      '$ mlagents-learn config/hns.yaml --run-id=v5',
      '  Step: 5,000,000  Hider: -0.31  Seeker: 0.28',
      '  Step: 27,000,000 Hider: 0.74  Seeker: -0.66',
      '✓ exported → HiderBrain.onnx, SeekerBrain.onnx',
    ],
  },
  {
    id: 'etribe',
    name: 'etribe-20th.md',
    kind: 'md',
    detailPage: 'etribe-detail',
    title: 'ETRIBE 20주년 기념 영상',
    sub: 'AI 이미지 생성과 모션 합성으로 전 과정을 자체 제작. 사내 공모전 1위.',
    tags: ['Midjourney', 'Runway Gen-2', 'After Effects'],
    meta: [{ k: 'duration', v: '2일' }, { k: 'award', v: '사내 공모전 1위' }],
    body: [
      '기획부터 최종 편집까지 외주 없이 직접 만든 사내 기념 영상입니다. 기존 외주 대비 약 70%의 리소스를 절감했습니다.',
      'AI를 데모가 아니라 실제 납품물 제작에 쓴 첫 사례였고, 이후 꿈키올래의 컨셉아트 파이프라인으로 이어졌습니다.',
    ],
    terminal: [
      '$ 프롬프트 이터레이션 로그',
      '  seated perspective → 의자가 계속 생성됨',
      '  as if sitting in the chair → 여전히 의자',
      '✓ 낮은 카메라 위치에서 정면 1인칭 → 해결',
      '! AI에게 이유를 설명하면 불필요한 오브젝트가 생긴다',
    ],
  },
];

const PROTOCOL_RULES = [
  { key: 'no_unconditional_agreement', desc: '무조건적으로 동의하지 말 것. 논리적·기술적 오류가 있으면 반드시 지적할 것.' },
  { key: 'provide_factual_grounding', desc: '기술적 답변 시 추론의 근거를 짧게 명시할 것. "~인 것 같습니다"는 금지.' },
  { key: 'confirm_before_execution', desc: '복잡한 태스크는 실행 전 이해한 바를 요약하여 컨펌을 받을 것.' },
  { key: 'skip_apologies', desc: '사과와 아첨을 생략하고, 모르면 모른다고 명확히 밝힐 것.' },
];

const WORKFLOW_STEPS = [
  { agent: 'Human', color: IDE.accent, title: '아키텍처 설계', desc: '기술 스택 선정, 데이터 구조 정의, 인터페이스 경계 결정. 무엇을 만들지는 사람이 정합니다.' },
  { agent: 'AI', color: IDE.green, title: '구현·생성', desc: '보일러플레이트, UI 컴포넌트, 반복 로직. 초안을 빠르게 뽑아내는 구간입니다.' },
  { agent: 'Human', color: IDE.accent, title: '검증·예외 처리', desc: 'API 실패 방어, 엣지 케이스, 성능 최적화. 비즈니스 로직의 최종 책임은 사람이 집니다.' },
];

/* ── 페이지 ── */
export default function WithAI({ onNavigate }) {
  const readme = {
    id: 'readme',
    name: 'README.md',
    kind: 'md',
    terminal: ['$ cat README.md', '✓ AI는 대체재가 아니라 증폭기'],
    render: () => (
      <article>
        <DocHead
          title="with AI — Human-in-the-Loop"
          sub="AI를 인지적 증폭기로 쓰는 기획자의 작업 기록."
          meta={[{ k: 'author', v: '유희수' }, { k: 'branch', v: 'human-in-the-loop' }]}
        />
        <DocSection label="Why">
          <P>
            AI는 사람을 대체하는 도구가 아니라, 판단의 속도를 올리는 증폭기라고 봅니다.
            방향을 정하는 일과 결과를 책임지는 일은 여전히 사람 몫이고, 그 사이의 실행 구간이 극적으로 짧아졌을 뿐입니다.
          </P>
          <P>
            그래서 이 페이지는 완성된 결과물만 늘어놓지 않고, 실제로 어떤 파일을 열어 무엇을 판단했는지를 그대로 보여줍니다.
            왼쪽 탐색기에서 파일을 열어보세요.
          </P>
        </DocSection>
        <DocSection label="Index">
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              ['projects/', '직접 만들어 배포한 것 — 웹 3D 게임, 강화학습 실험, AI 영상'],
              ['workflow.md', '사람과 AI의 역할 분담'],
              ['protocol.json', 'AI를 다룰 때 지키는 규칙'],
            ].map(([k, v]) => (
              <li key={k} className="flex gap-3" style={{ fontSize: 13, lineHeight: 1.8 }}>
                <span style={{ fontFamily: MONO, color: IDE.amber, minWidth: 118 }}>{k}</span>
                <span style={{ color: IDE.textDim }}>{v}</span>
              </li>
            ))}
          </ul>
        </DocSection>
      </article>
    ),
  };

  const workflow = {
    id: 'workflow',
    name: 'workflow.md',
    kind: 'md',
    terminal: ['$ 사람 → AI → 사람', '✓ 3 stages'],
    render: () => (
      <article>
        <DocHead title="Workflow" sub="인간이 설계하고, AI가 생산하고, 인간이 검증합니다." />
        <DocSection label="Pipeline">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {WORKFLOW_STEPS.map((s, i) => (
              <div key={s.title} style={{
                padding: '16px 18px', borderRadius: 8,
                background: 'rgba(255,255,255,0.03)', border: `1px solid ${IDE.line}`,
              }}>
                <div className="flex items-center gap-2.5" style={{ marginBottom: 7 }}>
                  <span style={{
                    fontSize: 10.5, fontFamily: MONO, fontWeight: 700, color: s.color,
                    border: `1px solid ${s.color}44`, borderRadius: 4, padding: '1px 7px',
                  }}>
                    {s.agent}
                  </span>
                  <span style={{ fontSize: 10.5, fontFamily: MONO, color: IDE.muted }}>0{i + 1}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{s.title}</span>
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.85, color: IDE.textDim }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </DocSection>
      </article>
    ),
  };

  const protocol = {
    id: 'protocol',
    name: 'protocol.json',
    kind: 'json',
    terminal: ['$ validate protocol.json', '✓ 4 rules loaded', '✓ schema ok'],
    render: () => (
      <article>
        <DocHead title="Operator's Protocol" sub="AI를 쓸 때 매번 지키는 네 가지 규칙." />
        <div style={{
          fontFamily: MONO, fontSize: 12.5, lineHeight: 2.1,
          background: '#141414', border: `1px solid ${IDE.line}`, borderRadius: 8,
          padding: '18px 8px 18px 0', marginTop: 22, overflowX: 'auto',
        }}>
          {[
            '{',
            ...PROTOCOL_RULES.flatMap((r, i) => [
              `  "${r.key}": {`,
              `    "rule": "${r.desc}"`,
              `  }${i < PROTOCOL_RULES.length - 1 ? ',' : ''}`,
            ]),
            '}',
          ].map((line, i) => (
            <div key={i} className="flex" style={{ whiteSpace: 'pre' }}>
              <span style={{
                width: 46, textAlign: 'right', paddingRight: 16, color: IDE.muted,
                opacity: 0.55, flexShrink: 0, userSelect: 'none',
              }}>
                {i + 1}
              </span>
              <span style={{
                color: line.includes('"rule"') ? IDE.string
                  : line.trim().startsWith('"') ? IDE.blue : IDE.textDim,
              }}>
                {line}
              </span>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 14, fontSize: 12, fontFamily: MONO, color: IDE.green }}>
          ✓ Protocol loaded. All rules enforced.
        </p>
      </article>
    ),
  };

  const tree = [
    {
      type: 'folder',
      name: 'projects',
      children: PROJECT_FILES.map((f) => ({
        type: 'file',
        id: f.id,
        name: f.name,
        kind: f.kind,
        terminal: f.terminal,
        render: () => <ProjectDoc data={f} onNavigate={onNavigate} />,
      })),
    },
    { type: 'file', ...readme },
    { type: 'file', ...workflow },
    { type: 'file', ...protocol },
  ];

  return (
    <IdeShell
      tree={tree}
      initialFileId="readme"
      windowTitle="ai-lab"
      statusText="Human-in-the-Loop"
      onNavigate={onNavigate}
    />
  );
}
