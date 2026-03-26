import FadeIn from './ui/FadeIn';

export default function Philosophy() {
  return (
    <section className="relative py-40 px-6" style={{ background: '#080A0F' }}>
      {/* Divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-[rgba(167,139,250,0.15)]" />

      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <p className="text-label text-center mb-6" style={{ color: 'rgba(167,139,250,0.5)' }}>Two Worlds, One Planner</p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-headline text-center mb-16" style={{ color: 'rgba(243,246,251,0.85)' }}>
            한 명의 기획자가 마주한<br />
            <span style={{ color: '#F3F6FB' }}>완전히 다른 두 개의 XR 문제</span>
          </h2>
        </FadeIn>

        {/* Split comparison */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* KISTI */}
          <FadeIn delay={0.2} direction="left">
            <div className="group relative p-8 md:p-10 rounded-2xl transition-all duration-500"
              style={{ background: '#0E121B', border: '1px solid rgba(111,216,255,0.08)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(111,216,255,0.18)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(111,216,255,0.08)'}
            >
              <div className="text-label mb-4" style={{ color: 'rgba(111,216,255,0.6)' }}>Project 01</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'rgba(243,246,251,0.9)' }}>
                KISTi
              </h3>
              <p className="leading-relaxed mb-6" style={{ color: '#98A4BA' }}>
                고령자를 위한 임상 XR 시스템.<br />
                구조적이고, 데이터 중심이며, 안전이 최우선인 프로젝트.
              </p>
              <div className="flex flex-wrap gap-2">
                {['임상 운영', '인지훈련', '안전 설계', '데이터 수집'].map(tag => (
                  <span key={tag} className="px-3 py-1 text-[10px] font-bold rounded-full"
                    style={{ background: 'rgba(111,216,255,0.06)', color: 'rgba(111,216,255,0.5)', border: '1px solid rgba(111,216,255,0.1)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* 꿈키올래 */}
          <FadeIn delay={0.3} direction="right">
            <div className="group relative p-8 md:p-10 rounded-2xl transition-all duration-500"
              style={{ background: '#0E121B', border: '1px solid rgba(216,165,75,0.08)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(216,165,75,0.18)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(216,165,75,0.08)'}
            >
              <div className="text-label mb-4" style={{ color: 'rgba(216,165,75,0.6)' }}>Project 02</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'rgba(243,246,251,0.9)' }}>
                꿈키올래
              </h3>
              <p className="leading-relaxed mb-6" style={{ color: '#98A4BA' }}>
                Vision Pro 기반 몰입형 직업체험.<br />
                세계관 기반이며, 경험 중심이고, 창의적인 프로젝트.
              </p>
              <div className="flex flex-wrap gap-2">
                {['세계관 설계', '인터랙션', '직업체험', 'Vision Pro'].map(tag => (
                  <span key={tag} className="px-3 py-1 text-[10px] font-bold rounded-full"
                    style={{ background: 'rgba(216,165,75,0.06)', color: 'rgba(216,165,75,0.5)', border: '1px solid rgba(216,165,75,0.1)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Connection line */}
        <FadeIn delay={0.5}>
          <p className="text-center mt-16 text-sm leading-relaxed max-w-lg mx-auto" style={{ color: '#546178' }}>
            하나는 안정적인 시스템을, 다른 하나는 몰입형 세계관을 요구했습니다.<br />
            두 프로젝트 모두 '실제로 작동하는 XR 경험'이라는 하나의 기준으로 설계되었습니다.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
