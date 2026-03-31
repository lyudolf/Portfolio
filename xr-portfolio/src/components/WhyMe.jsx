import FadeIn from './ui/FadeIn';

const STRENGTHS = [
  { title: '구조적 서비스 설계', desc: '레거시를 인수받아 운영 가능한 시스템으로 재구축. 임상 현장에서 실제로 작동하는 구조를 만들었습니다.', from: 'KISTi' },
  { title: '창의적 세계관 기획', desc: '직업 정보를 설명하지 않고, 세계관과 미션 안에서 체험하게 만드는 경험 설계를 주도했습니다.', from: '꿈키올래' },
  { title: '제약 안에서의 구조 재편', desc: '불가능한 일정과 조건 속에서 기획 자체를 생산 가능한 형태로 전환한 PM 판단력.', from: 'Both' },
  { title: '모호함을 방향으로', desc: '기준이 없는 상황에서 기준을 세우고, 팀이 움직일 수 있는 구조를 만들어 프로젝트를 굴렸습니다.', from: 'Both' },
];

export default function WhyMe() {
  return (
    <section id="whyme" className="relative py-40" style={{ background: '#090B10' }}>
      <div className="absolute top-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(180deg, #0C0A12 0%, #090B10 100%)' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <FadeIn>
          <p className="text-label text-center mb-6" style={{ color: '#546178' }}>Exhibition Ends Here</p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-headline text-center mb-6" style={{ color: 'rgba(243,246,251,0.9)' }}>
            두 개의 XR 세계를 관통하는<br />
            <span style={{ color: '#F3F6FB' }}>하나의 기획 원칙</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-center max-w-lg mx-auto mb-16 leading-relaxed" style={{ color: '#546178' }}>
            임상 시스템이든 직업체험 세계관이든,<br />
            저는 실제로 작동하고, 실제로 기억에 남는 XR 경험을 만듭니다.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {STRENGTHS.map((s, i) => (
            <FadeIn key={s.title} delay={0.2 + i * 0.08}>
              <div className="p-6 rounded-xl h-full transition-all duration-300"
                style={{ background: '#141A26', border: '1px solid #263247' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#1A2233'; e.currentTarget.style.borderColor = '#334563'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#141A26'; e.currentTarget.style.borderColor = '#263247'; }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 text-[9px] font-bold rounded" style={{ background: 'rgba(255,255,255,0.04)', color: '#546178' }}>
                    {s.from}
                  </span>
                </div>
                <h4 className="font-bold mb-2" style={{ color: 'rgba(243,246,251,0.8)' }}>{s.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: '#98A4BA' }}>{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.6}>
          <div className="text-center">
            <blockquote className="text-xl md:text-2xl font-semibold leading-relaxed max-w-2xl mx-auto mb-10"
              style={{ color: 'rgba(243,246,251,0.55)' }}>
              "XR 경험은 기술이 아니라 기획에서 완성됩니다.<br />
              저는 그 기획을 현실에서 작동하게 만드는 사람입니다."
            </blockquote>
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-bold" style={{ color: 'rgba(243,246,251,0.5)' }}>유희수</span>
              <span className="text-xs" style={{ color: '#546178' }}>XR Service Planner · PM</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
