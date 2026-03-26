import FadeIn from './ui/FadeIn';
import SectionLabel from './ui/SectionLabel';

const WORLDS = [
  { name: '꿈키 MARS', jobs: ['기계공학자', '우주자원개발자', '바이오식품공학자'], desc: '허공에 주먹을 쥐면 조종간이 생성되고, 이를 통해 기기를 조작하는 방식. Vision Pro의 공간 인터랙션을 직업체험에 재해석했습니다.' },
  { name: '밀실사건수사대', jobs: ['과학수사관', '국과수 직무', '프로파일러'], desc: '하나의 사건을 중심으로 증거 수집-분석-결과 도출이 이어지는 구조. 각 직업 체험이 개별적으로 끝나지 않고 사건 서사 안에서 연결됩니다.' },
  { name: '꿈키 엔터테인먼트', jobs: ['작곡가', '공연기획자', '아이돌'], desc: '광선응원봉으로 노트를 쳐내는 리듬게임 구조. 허공에 손을 쥐면 응원봉이 생성되고, HMD 밖으로 손이 나가도 오브젝트가 유지됩니다.' },
];

const CHALLENGES = [
  { icon: '⏱️', title: '9종을 3개월 안에', desc: '처음 기획은 1종에 한 달. 전면 재설계로 생산 가능한 프레임워크로 전환' },
  { icon: '🎭', title: '타깃의 변화', desc: '고등학생에서 초등 저학년까지. 난이도·조작·흐름·재미 밀도 전체를 재설계' },
  { icon: '🔮', title: '디바이스 불확실성', desc: 'Vision Pro 경험 부재. 호환성·라이브러리·전환 방식의 기술적 리스크 관리' },
];

const UX_POINTS = [
  { title: '시선 + 제스처 조작', desc: '아이트래킹 기반 조준 후 엄지·검지 클릭. 눈이 좋지 않은 사용자를 위해 head raycast 접근성 옵션 추가' },
  { title: '이중 가드레일', desc: '음성 나레이션 + 하단 자막으로 "다음에 뭘 해야 하지?"를 최소화. 시각·청각 동시 안내 체계' },
  { title: '텍스트 최소화', desc: '긴 텍스트 대신 그림·자막·나레이션 중심. 초등학생 저학년까지 고려한 정보 밀도 조절' },
];

const C = {
  base: '#0C0A12',
  section: '#0E121B',
  card: '#151220',
  accent: '#D8A54B',
  accent2: '#8C6DD8',
  accent3: '#F1C87A',
  border: 'rgba(216,165,75,0.06)',
  borderHover: 'rgba(216,165,75,0.15)',
  accentDim: 'rgba(216,165,75,0.45)',
  accentLabel: 'rgba(216,165,75,0.6)',
  accentBg: 'rgba(216,165,75,0.04)',
  accentBorder: 'rgba(216,165,75,0.08)',
  divider: 'rgba(216,165,75,0.08)',
  purpleDim: 'rgba(140,109,216,0.4)',
};

export default function DreamZone() {
  return (
    <section id="dream" className="relative" style={{ background: C.base }}>
      <div className="h-32 w-full" style={{ background: `linear-gradient(180deg, transparent 0%, ${C.base} 100%)` }} />

      {/* --- Hero Banner --- */}
      <div className="max-w-5xl mx-auto px-6 pt-20 pb-24">
        <FadeIn>
          <SectionLabel color="inherit"><span style={{ color: C.accentLabel }}>Career XR — 꿈키올래</span></SectionLabel>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="text-headline mb-6 max-w-3xl" style={{ color: 'rgba(243,246,251,0.9)' }}>
            직업을 설명하지 않고,<br />
            <span style={{ background: `linear-gradient(135deg, ${C.accent}, ${C.accent3})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              세계관 안에서 경험하게 만들다
            </span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-lg max-w-2xl leading-relaxed mb-10" style={{ color: '#98A4BA' }}>
            Apple Vision Pro 기반 XR 직업체험 콘텐츠 9종을 3개월 안에 기획·구축. 교육 콘텐츠가 아닌, 기억에 남는 체험을 설계했습니다.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div className="flex flex-wrap gap-6 text-sm">
            {[['역할', 'PM · 기획 · 컨셉 설계 · QA'], ['기간', '2025.09 — 2025.11 (3개월)'], ['디바이스', 'Apple Vision Pro'], ['규모', '3 컨셉 × 9 직업체험']].map(([label, value]) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="text-label" style={{ color: C.accentDim }}>{label}</span>
                <span className="font-semibold" style={{ color: 'rgba(243,246,251,0.7)' }}>{value}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      <div className="max-w-5xl mx-auto px-6"><div className="h-px" style={{ background: `linear-gradient(to right, transparent, ${C.divider}, transparent)` }} /></div>

      {/* --- The Challenge --- */}
      <div className="max-w-5xl mx-auto px-6 py-24">
        <FadeIn>
          <SectionLabel color="inherit"><span style={{ color: C.accentDim }}>The Challenge</span></SectionLabel>
          <h3 className="text-subhead mb-12" style={{ color: 'rgba(243,246,251,0.8)' }}>처음 구상한 방식으로는 완성이 불가능했다</h3>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-4">
          {CHALLENGES.map((c, i) => (
            <FadeIn key={c.title} delay={i * 0.1}>
              <div className="p-6 rounded-xl transition-all duration-300 h-full" style={{ background: C.card, border: `1px solid ${C.border}` }}
                onMouseEnter={e => e.currentTarget.style.borderColor = C.borderHover}
                onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                <div className="text-2xl mb-3">{c.icon}</div>
                <h4 className="font-bold mb-2 text-sm" style={{ color: 'rgba(243,246,251,0.8)' }}>{c.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: '#98A4BA' }}>{c.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6"><div className="h-px" style={{ background: `linear-gradient(to right, transparent, ${C.divider}, transparent)` }} /></div>

      {/* --- 3 Worlds --- */}
      <div className="max-w-5xl mx-auto px-6 py-24">
        <FadeIn>
          <SectionLabel color="inherit"><span style={{ color: C.purpleDim }}>Worldbuilding</span></SectionLabel>
          <h3 className="text-subhead mb-4" style={{ color: 'rgba(243,246,251,0.8)' }}>3개의 세계, 9개의 직업</h3>
          <p className="mb-12 max-w-xl" style={{ color: '#546178' }}>
            단순 목록형 나열 대신, 컨셉별 세계관과 서사 안에서 선택하고 경험하는 구조. 인트로 영상으로 서사를 부여하고, 아웃트로로 마무리합니다.
          </p>
        </FadeIn>
        <div className="space-y-6">
          {WORLDS.map((w, i) => (
            <FadeIn key={w.name} delay={i * 0.12}>
              <div className="relative p-8 rounded-2xl transition-all duration-500 group" style={{ background: C.card, border: `1px solid ${C.border}` }}
                onMouseEnter={e => e.currentTarget.style.borderColor = C.borderHover}
                onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1">
                    <div className="text-label mb-2" style={{ color: C.accentDim }}>World {String(i + 1).padStart(2, '0')}</div>
                    <h4 className="text-xl font-bold mb-3" style={{ color: 'rgba(243,246,251,0.9)' }}>{w.name}</h4>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: '#98A4BA' }}>{w.desc}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 md:pt-6 shrink-0">
                    {w.jobs.map(job => (
                      <span key={job} className="px-3 py-1.5 text-[11px] font-semibold rounded-lg" style={{ background: 'rgba(140,109,216,0.06)', color: 'rgba(140,109,216,0.6)', border: '1px solid rgba(140,109,216,0.1)' }}>
                        {job}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6"><div className="h-px" style={{ background: `linear-gradient(to right, transparent, ${C.divider}, transparent)` }} /></div>

      {/* --- UX / Interaction --- */}
      <div className="max-w-5xl mx-auto px-6 py-24">
        <FadeIn>
          <SectionLabel color="inherit"><span style={{ color: C.accentDim }}>UX & Interaction</span></SectionLabel>
          <h3 className="text-subhead mb-12" style={{ color: 'rgba(243,246,251,0.8)' }}>Vision Pro에서의 사용성을 보완하다</h3>
        </FadeIn>
        <div className="space-y-4">
          {UX_POINTS.map((u, i) => (
            <FadeIn key={u.title} delay={i * 0.08}>
              <div className="flex gap-6 p-6 rounded-xl transition-colors duration-300" style={{ background: C.card, border: `1px solid ${C.border}` }}
                onMouseEnter={e => e.currentTarget.style.borderColor = C.borderHover}
                onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                <div className="w-1 rounded-full shrink-0" style={{ background: 'rgba(216,165,75,0.2)' }} />
                <div>
                  <h4 className="font-bold mb-1 text-sm" style={{ color: 'rgba(243,246,251,0.8)' }}>{u.title}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: '#98A4BA' }}>{u.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6"><div className="h-px" style={{ background: `linear-gradient(to right, transparent, ${C.divider}, transparent)` }} /></div>

      {/* --- PM Decisions & Outcome --- */}
      <div className="max-w-5xl mx-auto px-6 py-24">
        <FadeIn>
          <SectionLabel color="inherit"><span style={{ color: C.accentDim }}>PM Decisions & Outcome</span></SectionLabel>
          <h3 className="text-subhead mb-6" style={{ color: 'rgba(243,246,251,0.8)' }}>짧은 기간 안에 기획 구조 자체를<br />생산 가능한 형태로 바꾸다</h3>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="p-8 rounded-2xl mb-8" style={{ background: C.card, border: `1px solid ${C.border}` }}>
            <h4 className="text-label mb-4" style={{ color: C.accentDim }}>제작 방식 전환</h4>
            <div className="flex items-center gap-3 flex-wrap">
              {['1종 기획', '디자인/개발 전달', '다음 1종 기획', '병렬 검수'].map((step, i) => (
                <span key={step} className="flex items-center gap-3">
                  <span className="px-3 py-1.5 text-xs font-semibold rounded-lg" style={{ background: 'rgba(216,165,75,0.08)', color: 'rgba(241,200,122,0.7)', border: '1px solid rgba(216,165,75,0.12)' }}>
                    {step}
                  </span>
                  {i < 3 && <span style={{ color: 'rgba(216,165,75,0.25)' }}>→</span>}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { icon: '🎯', title: '클라이언트 대응', desc: '"안 된다"고만 말하지 않고, 대체 구현안·우회 방식·리스크 비교를 제시해 판단 가능한 형태로 변환. 이것이 신뢰의 핵심이었습니다.' },
            { icon: '📊', title: '최종 성과', desc: '9종 XR 직업체험 콘텐츠 완성. 체험센터 운영 수준 구축. 퀄리티·디테일 높은 평가 확보. 후속 제안 요청으로 이어지는 만족도.' },
          ].map((item, i) => (
            <FadeIn key={item.title} delay={0.2 + i * 0.05}>
              <div className="p-6 rounded-xl" style={{ background: C.card, border: `1px solid ${C.border}` }}>
                <h4 className="font-bold mb-2 text-sm" style={{ color: 'rgba(243,246,251,0.8)' }}>{item.icon} {item.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: '#98A4BA' }}>{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <div className="h-1" />
    </section>
  );
}
