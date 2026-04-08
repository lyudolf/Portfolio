import { motion } from 'framer-motion';
import FadeIn from '../ui/FadeIn';

/* ── 프로젝트 카드 데이터 ── */
const PROJECTS = [
  {
    id: 'etribe-20th',
    title: 'ETRIBE 20주년 기념 영상 제작',
    tools: ['Midjourney', 'Runway Gen-2', 'After Effects'],
    link: null,
    intro: 'AI 이미지 생성과 모션 합성을 활용하여 기획부터 최종 편집까지 전 과정을 자체 제작한 사내 공모전 1위 수상작. 기존 외주 대비 약 70% 리소스를 절감하며 크리에이티브 프로덕션의 새로운 가능성을 검증했습니다.',
    duration: '2일',
    language: 'Korean',
    thumbnail: null,
    award: '1st Prize',
    detailPage: 'etribe-detail',
  },
  {
    id: 'leaf-it-alone',
    title: 'Leaf-it-alone (Web 3D Game)',
    tools: ['React Three Fiber', 'ONNX Runtime', 'Vercel'],
    link: 'https://leaf-it-alone-web.vercel.app/',
    intro: '8,000개의 낙엽을 1인칭 시점으로 치우는 브라우저 3D 캐주얼 게임. InstancedMesh로 단일 드로우콜을 구현하고, ONNX 딥러닝 모델로 플레이어 행동을 예측하는 스나이퍼 AI를 탑재. 총 5스테이지, 7일 개발. Vercel 라이브 배포 중.',
    duration: '7일',
    language: 'JavaScript',
    thumbnail: null,
    award: null,
    detailPage: 'leaf-detail',
  },
];

/* ── Pipeline / Protocol 데이터 (보류 — 기존 유지) ── */
const PIPELINE_STEPS = [
  {
    step: '01',
    title: 'Architecture Design',
    agent: 'Human',
    agentColor: 'rgba(111, 216, 255, 0.8)',
    desc: '기술 스택 선정, DB 스키마 설계, API 엔드포인트 정의. 비즈니스 로직의 방향성을 인간이 결정합니다.',
  },
  {
    step: '02',
    title: 'Implementation & Generation',
    agent: 'AI',
    agentColor: 'rgba(110, 231, 183, 0.8)',
    desc: '보일러플레이트 생성, UI 컴포넌트 구현, 반복적 로직 코드 작성. AI가 빠르게 초안을 생산합니다.',
  },
  {
    step: '03',
    title: 'QA, Refactoring & Edge Cases',
    agent: 'Human',
    agentColor: 'rgba(111, 216, 255, 0.8)',
    desc: 'Google API 429 에러 방어, 예외 처리, 성능 최적화. 비즈니스 로직의 최종 검증은 인간이 수행합니다.',
  },
];

const PROTOCOL_RULES = [
  { key: 'Rule 1', title: 'No Unconditional Agreement', desc: '무조건적으로 동의하지 말 것. 논리적·기술적 오류가 있으면 반드시 지적할 것.' },
  { key: 'Rule 2', title: 'Provide Factual Grounding', desc: '기술적 답변 시, 추론의 근거를 짧게 명시할 것. "~인 것 같습니다"는 금지.' },
  { key: 'Rule 3', title: 'Confirm Before Execution', desc: '복잡한 태스크는 실행 전 이해한 바를 요약하여 컨펌을 받을 것.' },
  { key: 'Rule 4', title: 'Skip Apologies & Flattery', desc: '사과와 아첨을 생략하고, 모르면 모른다고 명확히 밝힐 것.' },
];

/* ── 프로젝트 카드 컴포넌트 ── */
function ProjectCard({ project, index, onNavigate }) {
  return (
    <FadeIn delay={index * 0.08}>
      <div
        className="rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.border = '1px solid rgba(111, 216, 255, 0.15)';
          e.currentTarget.style.background = 'rgba(255,255,255,0.035)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.border = '1px solid rgba(255,255,255,0.06)';
          e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
        }}
      >
        <div className="flex flex-col md:flex-row">
          {/* Left — 16:9 Thumbnail */}
          <div className="md:w-[420px] flex-shrink-0">
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                aspectRatio: '16 / 9',
                background: 'rgba(255,255,255,0.03)',
                borderRight: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              {project.thumbnail ? (
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <div
                    className="w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(111, 216, 255, 0.06)' }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(111, 216, 255, 0.4)" strokeWidth="1.5">
                      <rect x="2" y="3" width="20" height="14" rx="2" />
                      <path d="M8 21h8M12 17v4" />
                    </svg>
                  </div>
                  <p className="text-[12px]" style={{ color: 'rgba(243,246,251,0.25)' }}>
                    Thumbnail
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right — Project Info */}
          <div className="flex-1 p-7 md:p-8 flex flex-col justify-between">
            <div>
              {/* Title + Award Badge */}
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-[20px] font-bold leading-tight" style={{ color: 'rgba(243,246,251,0.9)' }}>
                  {project.title}
                </h3>
                {project.award && (
                  <span
                    className="ml-3 flex-shrink-0 px-3 py-1 rounded-full text-[11px] font-bold"
                    style={{
                      background: 'rgba(216,165,75,0.1)',
                      color: 'rgba(216,165,75,0.85)',
                      border: '1px solid rgba(216,165,75,0.2)',
                    }}
                  >
                    🏆 {project.award}
                  </span>
                )}
              </div>

              {/* Tool Hashtags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-[12px] font-medium"
                    style={{ color: 'rgba(111, 216, 255, 0.6)' }}
                  >
                    #{tool.replace(/\s+/g, '')}
                  </span>
                ))}
              </div>

              {/* Intro */}
              <p
                className="text-[14px] leading-[1.8] mb-6"
                style={{ color: 'rgba(243,246,251,0.5)' }}
              >
                {project.intro}
              </p>

              {/* Meta Row: Duration / Language / Link */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px]">
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(111,216,255,0.4)" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span style={{ color: '#546178' }}>제작 기간</span>
                  <span style={{ color: 'rgba(243,246,251,0.6)' }}>{project.duration}</span>
                </div>

                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(111,216,255,0.4)" strokeWidth="1.5">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span style={{ color: '#546178' }}>언어</span>
                  <span style={{ color: 'rgba(243,246,251,0.6)' }}>{project.language}</span>
                </div>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 transition-colors"
                    style={{ color: 'rgba(111, 216, 255, 0.6)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(111, 216, 255, 0.9)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(111, 216, 255, 0.6)'}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                    <span className="text-[12px] font-medium">링크</span>
                  </a>
                )}
              </div>
            </div>

            {/* Detail Button */}
            <div className="mt-6 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              <button
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-200 cursor-pointer"
                style={{
                  background: 'rgba(111, 216, 255, 0.06)',
                  color: 'rgba(111, 216, 255, 0.75)',
                  border: '1px solid rgba(111, 216, 255, 0.12)',
                }}
                onClick={() => project.detailPage && onNavigate?.(project.detailPage)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(111, 216, 255, 0.12)';
                  e.currentTarget.style.borderColor = 'rgba(111, 216, 255, 0.25)';
                  e.currentTarget.style.color = 'rgba(111, 216, 255, 0.95)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(111, 216, 255, 0.06)';
                  e.currentTarget.style.borderColor = 'rgba(111, 216, 255, 0.12)';
                  e.currentTarget.style.color = 'rgba(111, 216, 255, 0.75)';
                }}
              >
                상세 보기
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

/* ── Divider ── */
function Divider() {
  return (
    <div className="mx-auto px-8" style={{ maxWidth: '1400px' }}>
      <div className="h-px" style={{ background: 'rgba(38,50,71,0.35)' }} />
    </div>
  );
}

/* ── Main Page ── */
export default function WithAI({ onNavigate }) {
  return (
    <div style={{ background: '#0C0A12' }}>

      {/* ── Section 1: Abstract ── */}
      <section className="mx-auto px-8 pt-16 pb-20 text-center" style={{ maxWidth: '1400px' }}>
        <FadeIn>
          <p className="text-label mb-10" style={{ color: 'rgba(111, 216, 255, 0.45)' }}>
            Methodology
          </p>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h1 className="text-headline mb-6" style={{ color: 'rgba(243,246,251,0.92)' }}>
            with AI: The Human-in-the-Loop<br />
            <span style={{ color: 'rgba(111, 216, 255, 0.7)' }}>Methodology</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-body leading-[1.9] max-w-2xl mx-auto"
            style={{ fontFamily: '"Noto Serif KR", serif' }}>
            AI는 대체재가 아닌 인지적 증폭기(Amplifier)입니다.<br />
            명확한 프롬프트 엔지니어링과 아키텍처 설계를 통해<br />
            기획부터 프로덕션까지의 리소스를 최적화한<br />
            본인만의 오퍼레이팅 방법론을 공유합니다.
          </p>
        </FadeIn>
      </section>

      <Divider />

      {/* ── Section 2: Project Cards ── */}
      <section className="mx-auto px-8 py-20" style={{ maxWidth: '1400px' }}>
        <FadeIn>
          <p className="text-label mb-3" style={{ color: 'rgba(111, 216, 255, 0.35)' }}>
            Projects
          </p>
          <h2 className="text-subhead mb-12" style={{ color: 'rgba(243,246,251,0.85)' }}>
            AI-Powered Project Archive
          </h2>
        </FadeIn>

        {/* Project Card List */}
        <div className="flex flex-col gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onNavigate={onNavigate} />
          ))}
        </div>
      </section>

      <Divider />

      {/* ── Section 3: Smart Workflow Pipeline (보류) ── */}
      <section className="mx-auto px-8 py-20" style={{ maxWidth: '1400px' }}>
        <FadeIn>
          <p className="text-label mb-3" style={{ color: 'rgba(111, 216, 255, 0.35)' }}>
            Development Process
          </p>
          <h2 className="text-subhead mb-4" style={{ color: 'rgba(243,246,251,0.85)' }}>
            Next-Gen Development Workflow
          </h2>
          <p className="text-caption mb-14 max-w-lg">
            Human-AI Collaboration: 인간이 설계하고, AI가 생산하고, 인간이 검증합니다.
          </p>
        </FadeIn>

        <div className="flex flex-col md:flex-row items-stretch gap-0">
          {PIPELINE_STEPS.map((step, i) => (
            <FadeIn key={step.step} delay={i * 0.06}>
              <div className="flex items-stretch">
                <div className="flex-1 rounded-xl p-6"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-md"
                      style={{
                        background: step.agentColor.replace('0.8', '0.08'),
                        color: step.agentColor,
                        border: `1px solid ${step.agentColor.replace('0.8', '0.2')}`,
                      }}>
                      {step.agent}
                    </span>
                    <span className="text-[11px] font-semibold" style={{ color: '#546178' }}>
                      Step {step.step}
                    </span>
                  </div>
                  <h3 className="text-[15px] font-bold mb-2" style={{ color: 'rgba(243,246,251,0.8)' }}>
                    {step.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: '#546178' }}>
                    {step.desc}
                  </p>
                </div>

                {i < PIPELINE_STEPS.length - 1 && (
                  <div className="hidden md:flex items-center px-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" strokeLinecap="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── Section 4: The Operator's Protocol (보류) ── */}
      <section className="mx-auto px-8 py-20 pb-32" style={{ maxWidth: '1400px' }}>
        <FadeIn>
          <p className="text-label mb-3" style={{ color: 'rgba(111, 216, 255, 0.35)' }}>
            Operating System
          </p>
          <h2 className="text-subhead mb-12" style={{ color: 'rgba(243,246,251,0.85)' }}>
            The Operator's Protocol
          </h2>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="rounded-xl overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 8px 40px rgba(0,0,0,0.3)' }}>
            <div className="flex items-center gap-2 px-4 py-3"
              style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
              <span className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
              <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
              <span className="text-[11px] ml-3" style={{ color: '#546178', fontFamily: '"JetBrains Mono", monospace' }}>
                operator_protocol.json
              </span>
            </div>

            <div className="px-6 py-6" style={{ background: 'rgba(0,0,0,0.3)', fontFamily: '"JetBrains Mono", "Fira Code", monospace' }}>
              <p className="text-[12px] mb-1" style={{ color: '#546178' }}>
                {'// AI 운용 원칙 — Human-in-the-Loop Operator Rules'}
              </p>
              <p className="text-[12px] mb-5" style={{ color: '#546178' }}>
                {'// @author 유희수 | XR Service Planner'}
              </p>

              <div className="text-[13px] leading-[2.2]">
                <p style={{ color: 'rgba(243,246,251,0.5)' }}>{'{'}</p>
                {PROTOCOL_RULES.map((rule, i) => (
                  <div key={rule.key} className="pl-6">
                    <span style={{ color: 'rgba(111, 216, 255, 0.8)' }}>"{rule.key}"</span>
                    <span style={{ color: 'rgba(243,246,251,0.3)' }}>{': {'}</span>
                    <div className="pl-6">
                      <span style={{ color: 'rgba(110, 231, 183, 0.7)' }}>"title"</span>
                      <span style={{ color: 'rgba(243,246,251,0.3)' }}>: </span>
                      <span style={{ color: 'rgba(167, 139, 250, 0.8)' }}>"{rule.title}"</span>
                      <span style={{ color: 'rgba(243,246,251,0.3)' }}>,</span>
                    </div>
                    <div className="pl-6">
                      <span style={{ color: 'rgba(110, 231, 183, 0.7)' }}>"desc"</span>
                      <span style={{ color: 'rgba(243,246,251,0.3)' }}>: </span>
                      <span style={{ color: 'rgba(216,165,75,0.75)' }}>"{rule.desc}"</span>
                    </div>
                    <span className="pl-6" style={{ color: 'rgba(243,246,251,0.3)' }}>
                      {'}'}{i < PROTOCOL_RULES.length - 1 ? ',' : ''}
                    </span>
                  </div>
                ))}
                <p style={{ color: 'rgba(243,246,251,0.5)' }}>{'}'}</p>
              </div>

              <p className="text-[12px] mt-5" style={{ color: 'rgba(110, 231, 183, 0.5)' }}>
                ✓ Protocol loaded successfully. All rules enforced.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
