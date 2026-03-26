import FadeIn from '../ui/FadeIn';

export default function WhyMe() {
  return (
    <div style={{ background: '#090B10' }}>
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-8 pt-16 pb-20">
        <FadeIn>
          <p className="text-label mb-10" style={{ color: '#546178' }}>Why Me</p>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h1 className="text-headline mb-6" style={{ color: 'rgba(243,246,251,0.92)' }}>
            두 개의 XR 세계를 관통하는<br />하나의 기획 원칙
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-body max-w-md">
            임상 시스템이든 직업체험 세계관이든,<br />
            저는 실제로 작동하고, 실제로 기억에 남는 XR 경험을 만듭니다.
          </p>
        </FadeIn>
      </section>

      <div className="max-w-3xl mx-auto px-8"><div className="h-px" style={{ background: 'rgba(38,50,71,0.35)' }} /></div>

      {/* Strengths — editorial, not cards */}
      <section className="max-w-3xl mx-auto px-8 py-20">
        <FadeIn>
          <p className="text-label mb-12" style={{ color: '#546178' }}>Core Strengths</p>
        </FadeIn>
        {[
          { title: '구조적 서비스 설계', desc: '레거시를 인수받아 운영 가능한 시스템으로 재구축. 임상 현장에서 실제로 작동하는 구조를 만들었습니다.', from: 'KISTi' },
          { title: '창의적 세계관 기획', desc: '직업 정보를 설명하지 않고, 세계관과 미션 안에서 체험하게 만드는 경험 설계를 주도했습니다.', from: '꿈키올래' },
          { title: '제약 안에서의 구조 재편', desc: '불가능한 일정과 조건 속에서 기획 자체를 생산 가능한 형태로 전환한 PM 판단력.', from: 'Both' },
          { title: '모호함을 방향으로', desc: '기준이 없는 상황에서 기준을 세우고, 팀이 움직일 수 있는 구조를 만들어 프로젝트를 굴렸습니다.', from: 'Both' },
        ].map((s, i) => (
          <FadeIn key={s.title} delay={i * 0.03}>
            <div className="flex flex-col md:flex-row gap-6 py-6" style={{ borderBottom: i < 3 ? '1px solid rgba(38,50,71,0.2)' : 'none' }}>
              <div className="md:w-28 shrink-0">
                <p className="text-[10px] font-medium" style={{ color: '#546178' }}>{s.from}</p>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold mb-2" style={{ color: 'rgba(243,246,251,0.85)' }}>{s.title}</h3>
                <p className="text-caption leading-relaxed">{s.desc}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </section>

      <div className="max-w-3xl mx-auto px-8"><div className="h-px" style={{ background: 'rgba(38,50,71,0.35)' }} /></div>

      {/* Roles — inline tags */}
      <section className="max-w-3xl mx-auto px-8 py-20">
        <FadeIn>
          <p className="text-label mb-3" style={{ color: '#546178' }}>담당 역할</p>
          <p className="text-caption mb-8 max-w-md">프로젝트가 굴러가도록 만드는 기준과 흐름을 설계하는 데 집중했습니다.</p>
        </FadeIn>
        <FadeIn delay={0.05}>
          <p className="text-sm leading-loose" style={{ color: 'rgba(243,246,251,0.5)' }}>
            제안 · 기획 · UI/UX 설계 · 콘텐츠 구조 설계 · 클라이언트 커뮤니케이션 · 개발 일정 관리 · QA
          </p>
        </FadeIn>
      </section>

      <div className="max-w-3xl mx-auto px-8"><div className="h-px" style={{ background: 'rgba(38,50,71,0.35)' }} /></div>

      {/* Statement */}
      <section className="max-w-3xl mx-auto px-8 py-24 pb-32">
        <FadeIn>
          <blockquote className="text-lg md:text-xl font-medium leading-relaxed mb-10" style={{ color: 'rgba(243,246,251,0.45)', letterSpacing: '-0.01em' }}>
            "XR 경험은 기술이 아니라 기획에서 완성됩니다.<br />
            저는 그 기획을 현실에서 작동하게 만드는 사람입니다."
          </blockquote>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm font-semibold" style={{ color: 'rgba(243,246,251,0.55)' }}>류동현</p>
              <p className="text-[11px]" style={{ color: '#546178' }}>XR Service Planner · PM</p>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="mt-16">
            <a href="https://github.com/lyudolf" target="_blank" rel="noopener noreferrer"
              className="text-[11px] font-medium transition-colors duration-200"
              style={{ color: '#546178' }}
              onMouseEnter={e => e.currentTarget.style.color = '#98A4BA'}
              onMouseLeave={e => e.currentTarget.style.color = '#546178'}>
              GitHub →
            </a>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
