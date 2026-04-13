import FadeIn from './ui/FadeIn';
import SectionLabel from './ui/SectionLabel';

const PROBLEMS = [
  { num: '01', title: '과도한 시각적 정보량', desc: '시점 고정 + 핵심 오브젝트 중심 씬 재설계, 집중도 향상' },
  { num: '02', title: '높은 멀미·적응 부담', desc: '고정 시점·확대 콜라이더 도입, 고령자 5명 파일럿 테스트 통과' },
  { num: '03', title: '깊은 Depth의 운영 구조', desc: '교수자/훈련자 2-depth 플랫 구조로 재정의, 실 운영 채택' },
  { num: '04', title: '불안정한 레거시 구조', desc: '인수 코드 재구조화, 임상 센터 3곳 안정 운영 중' },
];

const SOLUTIONS = [
  { badge: '훈련 콘텐츠', title: '곤충잡기 · 공놀이', desc: '색상, 종류, 방향, 기억 과제를 결합한 인지·운동 복합 훈련. 직관적 상호작용에 임상 정량 지표를 자연스럽게 녹였습니다.' },
  { badge: '검사 콘텐츠', title: '인지검사 · 균형검사', desc: '9가지 주의력 항목 측정, Force Plate 연동 실시간 균형 모니터링. 실행 안정성을 품질의 일부로 접근했습니다.' },
  { badge: '운영 시스템', title: '교수자 · 훈련자 런처', desc: '4~5단계 진입을 1~2 Depth로 과감히 단축. 대상자 선택부터 결과 확인까지 단일 흐름으로 재구성했습니다.' },
];

const PRINCIPLES = [
  { icon: '👁️', title: '시인성 최우선', desc: 'UI를 해치지 않는 선에서 텍스트를 충분히 크게, 교수자가 크기·수치를 제어' },
  { icon: '🎯', title: '조작 정확도', desc: '핸드트래킹 민감도 상향, 콜라이더 확대로 작은 오차에도 성공 경험 유도' },
  { icon: '⚡', title: '피로도 최소화', desc: '시점 전환과 카메라 이동을 제거, 고정 공간 내에서 상호작용 설계' },
  { icon: '🔒', title: '중앙 제어 강화', desc: '교수자가 모든 설정과 진행을 중앙에서 관리, 훈련자 부담 최소화' },
];

const C = {
  base: '#0A0E17',
  section: '#0E121B',
  card: '#141A26',
  accent: '#6FD8FF',
  accent2: '#59B8FF',
  accent3: '#7EF1D6',
  border: 'rgba(111,216,255,0.06)',
  borderHover: 'rgba(111,216,255,0.14)',
  accentDim: 'rgba(111,216,255,0.4)',
  accentLabel: 'rgba(111,216,255,0.55)',
  accentBg: 'rgba(111,216,255,0.04)',
  accentBorder: 'rgba(111,216,255,0.08)',
  numColor: 'rgba(111,216,255,0.12)',
  divider: 'rgba(111,216,255,0.08)',
};

export default function KistiZone() {
  return (
    <section id="kisti" className="relative" style={{ background: C.base }}>
      <div className="h-32 w-full" style={{ background: `linear-gradient(180deg, #080A0F 0%, ${C.base} 100%)` }} />

      {/* --- Hero Banner --- */}
      <div className="max-w-5xl mx-auto px-6 pt-20 pb-24">
        <FadeIn>
          <SectionLabel color="inherit"><span style={{ color: C.accentLabel }}>Clinical XR — KISTi</span></SectionLabel>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="text-headline mb-6 max-w-3xl" style={{ color: 'rgba(243,246,251,0.9)' }}>
            고령자를 위한 XR은 단순히<br />"재미있는 콘텐츠"로 완성되지 않습니다
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-lg max-w-2xl leading-relaxed mb-10" style={{ color: '#98A4BA' }}>
            실제 임상 데이터가 수집되고, 현장 운영이 안정적으로 이어지는 '시스템'을 설계했습니다. 이 프로젝트는 VR 게임이 아니라, 실제 서비스 시스템입니다.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div className="flex flex-wrap gap-6 text-sm">
            {[['역할', '서비스 기획 (PM)'], ['기간', '2024 — 2025'], ['기술', 'Unity · VR · SSO · Force Plate'], ['성과', '차기 연차 연계 · 기술이전 논의']].map(([label, value]) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="text-label" style={{ color: C.accentDim }}>{label}</span>
                <span className="font-semibold" style={{ color: 'rgba(243,246,251,0.7)' }}>{value}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      <div className="max-w-5xl mx-auto px-6"><div className="h-px" style={{ background: `linear-gradient(to right, transparent, ${C.divider}, transparent)` }} /></div>

      {/* --- Problem Definition --- */}
      <div className="max-w-5xl mx-auto px-6 py-24">
        <FadeIn>
          <SectionLabel color="inherit"><span style={{ color: C.accentDim }}>Problem Definition</span></SectionLabel>
          <h3 className="text-subhead mb-4" style={{ color: 'rgba(243,246,251,0.8)' }}>기존 구조를 다시 봐야 했던 이유</h3>
          <p className="mb-12 max-w-xl" style={{ color: '#546178' }}>기존 업체가 제작한 콘텐츠는 기능 자체는 존재했지만, 실제 고령자가 사용하기에는 여러 한계가 있었습니다.</p>
        </FadeIn>
        <div className="space-y-4">
          {PROBLEMS.map((p, i) => (
            <FadeIn key={p.num} delay={i * 0.08}>
              <div className="flex items-start gap-6 p-6 rounded-xl transition-colors duration-300" style={{ background: C.card, border: `1px solid ${C.border}` }}
                onMouseEnter={e => e.currentTarget.style.borderColor = C.borderHover}
                onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                <span className="text-3xl font-black shrink-0 w-10 select-none" style={{ color: C.numColor }}>{p.num}</span>
                <div>
                  <h4 className="font-bold mb-1" style={{ color: 'rgba(243,246,251,0.8)' }}>{p.title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: '#98A4BA' }}>{p.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6"><div className="h-px" style={{ background: `linear-gradient(to right, transparent, ${C.divider}, transparent)` }} /></div>

      {/* --- UX Principles --- */}
      <div className="max-w-5xl mx-auto px-6 py-24">
        <FadeIn>
          <SectionLabel color="inherit"><span style={{ color: C.accentDim }}>Design Principles</span></SectionLabel>
          <h3 className="text-subhead mb-12" style={{ color: 'rgba(243,246,251,0.8)' }}>고령자 기준의 UX 재정의</h3>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-4">
          {PRINCIPLES.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.08}>
              <div className="p-6 rounded-xl transition-colors duration-300" style={{ background: C.card, border: `1px solid ${C.border}` }}
                onMouseEnter={e => e.currentTarget.style.borderColor = C.borderHover}
                onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                <div className="text-2xl mb-3">{p.icon}</div>
                <h4 className="font-bold mb-2 text-sm" style={{ color: 'rgba(243,246,251,0.8)' }}>{p.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: '#98A4BA' }}>{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6"><div className="h-px" style={{ background: `linear-gradient(to right, transparent, ${C.divider}, transparent)` }} /></div>

      {/* --- Core Solutions --- */}
      <div className="max-w-5xl mx-auto px-6 py-24">
        <FadeIn>
          <SectionLabel color="inherit"><span style={{ color: C.accentDim }}>Core Solutions</span></SectionLabel>
          <h3 className="text-subhead mb-12" style={{ color: 'rgba(243,246,251,0.8)' }}>해결책 및 핵심 기능</h3>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-4">
          {SOLUTIONS.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.1}>
              <div className="p-6 rounded-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col" style={{ background: C.card, border: `1px solid ${C.border}` }}>
                <span className="text-label mb-4" style={{ color: C.accentDim }}>{s.badge}</span>
                <h4 className="font-bold mb-3" style={{ color: 'rgba(243,246,251,0.8)' }}>{s.title}</h4>
                <p className="text-xs leading-relaxed flex-1" style={{ color: '#98A4BA' }}>{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6"><div className="h-px" style={{ background: `linear-gradient(to right, transparent, ${C.divider}, transparent)` }} /></div>

      {/* --- Impact --- */}
      <div className="max-w-5xl mx-auto px-6 py-24">
        <FadeIn>
          <SectionLabel color="inherit"><span style={{ color: C.accentDim }}>PM's Impact</span></SectionLabel>
          <h3 className="text-subhead mb-6" style={{ color: 'rgba(243,246,251,0.8)' }}>기준이 없는 상황에서 기준을 세우고,<br />굴러가는 구조를 만들다</h3>
        </FadeIn>
        <FadeIn delay={0.15}>
          <blockquote className="relative pl-6 py-4 mb-10" style={{ borderLeft: `2px solid rgba(111,216,255,0.25)` }}>
            <p className="italic leading-relaxed" style={{ color: 'rgba(243,246,251,0.55)' }}>
              "기획은 문서를 만드는 일이 아니라, 실제로 필요한 구조를 현실 안에서 작동하게 만드는 일임을 증명했습니다."
            </p>
          </blockquote>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { icon: '📈', title: '핵심 성과', desc: '차기 연차 연계 및 기술이전 논의 단계로 발전. 클라이언트가 계속 참여하는 조건으로 예산 확대를 제안.' },
            { icon: '🏗️', title: '운영 구조', desc: '임상 환경에서 실제 운영 가능한 구조 구축 완료. 안정적인 세션 반복 운영이 가능한 시스템 완성.' },
          ].map((item, i) => (
            <FadeIn key={item.title} delay={0.2 + i * 0.05}>
              <div className="p-6 rounded-xl" style={{ background: C.card, border: `1px solid ${C.border}` }}>
                <div className="text-2xl mb-3">{item.icon}</div>
                <h4 className="font-bold mb-2 text-sm" style={{ color: 'rgba(243,246,251,0.8)' }}>{item.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: '#98A4BA' }}>{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <div className="h-1" />
    </section>
  );
}
