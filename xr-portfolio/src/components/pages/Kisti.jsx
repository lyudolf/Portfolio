import FadeIn from '../ui/FadeIn';

const PROBLEMS = [
  { title: '과도한 시각적 정보량', desc: '시점 고정 + 핵심 오브젝트 중심 씬 재설계, 집중도 향상' },
  { title: '높은 멀미·적응 부담', desc: '고정 시점·확대 콜라이더 도입, 고령자 5명 파일럿 테스트 통과' },
  { title: '깊은 Depth의 운영 구조', desc: '교수자/훈련자 2-depth 플랫 구조로 재정의, 실 운영 채택' },
  { title: '불안정한 레거시 구조', desc: '인수 코드 재구조화, 임상 센터 3곳 안정 운영 중' },
];

const PRINCIPLES = [
  { title: '시인성 최우선', desc: 'UI를 해치지 않는 선에서 텍스트를 충분히 크게, 교수자가 크기·수치를 제어' },
  { title: '조작 정확도', desc: '핸드트래킹 민감도 상향, 콜라이더 확대로 작은 오차에도 성공 경험 유도' },
  { title: '피로도 최소화', desc: '시점 전환과 카메라 이동을 제거, 고정 공간 내에서 상호작용 설계' },
  { title: '중앙 제어 강화', desc: '교수자가 모든 설정과 진행을 중앙에서 관리, 훈련자 부담 최소화' },
];

const SOLUTIONS = [
  { label: '훈련 콘텐츠', title: '곤충잡기 · 공놀이', desc: '색상, 종류, 방향, 기억 과제를 결합한 인지·운동 복합 훈련. 직관적 상호작용에 임상 정량 지표를 녹였습니다.' },
  { label: '검사 콘텐츠', title: '인지검사 · 균형검사', desc: '9가지 주의력 항목 측정, Force Plate 연동 실시간 균형 모니터링. 실행 안정성을 품질의 일부로 접근했습니다.' },
  { label: '운영 시스템', title: '교수자 · 훈련자 런처', desc: '4~5단계 진입을 1~2 Depth로 과감히 단축. 대상자 선택부터 결과 확인까지 단일 흐름으로 재구성했습니다.' },
];

function Divider() {
  return <div className="max-w-3xl mx-auto px-8"><div className="h-px" style={{ background: 'rgba(38,50,71,0.35)' }} /></div>;
}

export default function Kisti() {
  return (
    <div style={{ background: '#0A0E17' }}>
      {/* Hero — editorial */}
      <section className="max-w-3xl mx-auto px-8 pt-16 pb-20">
        <FadeIn>
          <p className="text-label mb-10" style={{ color: 'rgba(111,216,255,0.5)' }}>Clinical XR — KISTi</p>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h1 className="text-headline mb-6" style={{ color: 'rgba(243,246,251,0.92)' }}>
            고령자를 위한 XR은 단순히<br />"재미있는 콘텐츠"로 완성되지 않습니다
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-body max-w-lg mb-12">
            실제 임상 데이터가 수집되고, 현장 운영이 안정적으로 이어지는 '시스템'을 설계했습니다.
          </p>
        </FadeIn>
        <FadeIn delay={0.12}>
          <div className="flex flex-wrap gap-10 text-sm">
            {[['역할', '서비스 기획 (PM)'], ['기간', '2024 — 2025'], ['기술', 'Unity · VR · SSO · Force Plate']].map(([l, v]) => (
              <div key={l}>
                <p className="text-label mb-1.5" style={{ color: 'rgba(111,216,255,0.3)' }}>{l}</p>
                <p className="font-medium" style={{ color: 'rgba(243,246,251,0.6)' }}>{v}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      <Divider />

      {/* Problems — numbered list, not cards */}
      <section className="max-w-3xl mx-auto px-8 py-20">
        <FadeIn>
          <p className="text-label mb-3" style={{ color: 'rgba(111,216,255,0.35)' }}>Problem Definition</p>
          <h2 className="text-subhead mb-4" style={{ color: 'rgba(243,246,251,0.85)' }}>기존 구조를 다시 봐야 했던 이유</h2>
          <p className="text-caption mb-14 max-w-md">기존 업체가 제작한 콘텐츠는 기능 자체는 존재했지만, 실제 고령자가 사용하기에는 여러 한계가 있었습니다.</p>
        </FadeIn>
        {PROBLEMS.map((p, i) => (
          <FadeIn key={p.title} delay={i * 0.03}>
            <div className="flex gap-6 py-5" style={{ borderBottom: i < PROBLEMS.length - 1 ? '1px solid rgba(38,50,71,0.25)' : 'none' }}>
              <span className="text-label pt-0.5 w-8 shrink-0" style={{ color: 'rgba(111,216,255,0.15)' }}>{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="text-sm font-semibold mb-1" style={{ color: 'rgba(243,246,251,0.8)' }}>{p.title}</h3>
                <p className="text-caption">{p.desc}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </section>

      <Divider />

      {/* Principles — 2×2 tight grid, no card borders */}
      <section className="max-w-3xl mx-auto px-8 py-20">
        <FadeIn>
          <p className="text-label mb-3" style={{ color: 'rgba(111,216,255,0.35)' }}>Design Principles</p>
          <h2 className="text-subhead mb-12" style={{ color: 'rgba(243,246,251,0.85)' }}>고령자 기준의 UX 재정의</h2>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          {PRINCIPLES.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.03}>
              <div>
                <h3 className="text-sm font-semibold mb-2" style={{ color: 'rgba(243,246,251,0.8)' }}>{p.title}</h3>
                <p className="text-caption leading-relaxed">{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <Divider />

      {/* Solutions — editorial with label */}
      <section className="max-w-3xl mx-auto px-8 py-20">
        <FadeIn>
          <p className="text-label mb-3" style={{ color: 'rgba(111,216,255,0.35)' }}>Core Solutions</p>
          <h2 className="text-subhead mb-14" style={{ color: 'rgba(243,246,251,0.85)' }}>해결책 및 핵심 기능</h2>
        </FadeIn>
        <div className="space-y-12">
          {SOLUTIONS.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.04}>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-32 shrink-0">
                  <p className="text-label" style={{ color: 'rgba(111,216,255,0.3)' }}>{s.label}</p>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold mb-2" style={{ color: 'rgba(243,246,251,0.8)' }}>{s.title}</h3>
                  <p className="text-caption leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <Divider />

      {/* Impact — pull quote + data */}
      <section className="max-w-3xl mx-auto px-8 py-20 pb-32">
        <FadeIn>
          <p className="text-label mb-3" style={{ color: 'rgba(111,216,255,0.35)' }}>PM's Impact</p>
          <h2 className="text-subhead mb-8" style={{ color: 'rgba(243,246,251,0.85)' }}>기준이 없는 상황에서 기준을 세우고, 굴러가는 구조를 만들다</h2>
        </FadeIn>
        <FadeIn delay={0.05}>
          <blockquote className="pl-5 mb-14" style={{ borderLeft: '2px solid rgba(111,216,255,0.2)' }}>
            <p className="text-body italic" style={{ color: 'rgba(243,246,251,0.4)' }}>
              "기획은 문서를 만드는 일이 아니라, 실제로 필요한 구조를 현실 안에서 작동하게 만드는 일임을 증명했습니다."
            </p>
          </blockquote>
        </FadeIn>
        <div className="flex flex-col md:flex-row gap-12">
          <FadeIn delay={0.08}>
            <div>
              <p className="text-sm font-semibold mb-2" style={{ color: 'rgba(243,246,251,0.8)' }}>핵심 성과</p>
              <p className="text-caption leading-relaxed max-w-xs">차기 연차 연계 및 기술이전 논의 단계로 발전. 클라이언트가 계속 참여하는 조건으로 예산 확대를 제안.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div>
              <p className="text-sm font-semibold mb-2" style={{ color: 'rgba(243,246,251,0.8)' }}>운영 구조</p>
              <p className="text-caption leading-relaxed max-w-xs">임상 환경에서 실제 운영 가능한 구조 구축 완료. 안정적인 세션 반복 운영이 가능한 시스템 완성.</p>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
