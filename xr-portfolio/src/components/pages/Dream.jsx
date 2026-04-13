import FadeIn from '../ui/FadeIn';
import InfiniteGallery from '../ui/InfiniteGallery';

const GALLERY_ITEMS = [
  { src: '/images/dream/1.png', title: '꿈키 MARS — 우주 탐사 체험' },
  { src: '/images/dream/2.png', title: '밀실사건수사대 — 증거 수집 장면' },
  { src: '/images/dream/3.png', title: '꿈키 엔터테인먼트 — 리듬게임 UI' },
  { src: '/images/dream/4.png', title: 'Vision Pro 핸드트래킹 인터랙션' },
  { src: '/images/dream/5.png', title: '공간 UI 프로토타입 테스트' },
  { src: '/images/dream/6.png', title: '사용자 체험 세션 현장' },
  { src: '/images/dream/7.png', title: '아이트래킹 UX 검증' },
  { src: '/images/dream/8.jpg', title: '세계관 컨셉 아트 — MARS' },
];

const WORLDS = [
  { name: '꿈키 MARS', desc: '허공에 주먹을 쥐면 조종간이 생성되고, 이를 통해 기기를 조작하는 방식. Vision Pro의 공간 인터랙션을 직업체험에 재해석했습니다.', jobs: '기계공학자 · 우주자원개발자 · 바이오식품공학자' },
  { name: '밀실사건수사대', desc: '하나의 사건을 중심으로 증거 수집-분석-결과 도출이 이어지는 구조. 각 직업 체험이 사건 서사 안에서 연결됩니다.', jobs: '과학수사관 · 국과수 직무 · 프로파일러' },
  { name: '꿈키 엔터테인먼트', desc: '광선응원봉으로 노트를 쳐내는 리듬게임 구조. HMD 밖으로 손이 나가도 오브젝트가 유지되도록 설계했습니다.', jobs: '작곡가 · 공연기획자 · 아이돌' },
];

const UX = [
  { title: '시선 + 제스처 조작', desc: '아이트래킹 기반 조준 후 엄지·검지 클릭. 눈이 좋지 않은 사용자를 위해 head raycast 접근성 옵션 추가' },
  { title: '이중 가드레일', desc: '음성 나레이션 + 하단 자막으로 "다음에 뭘 해야 하지?"를 최소화. 시각·청각 동시 안내 체계' },
  { title: '텍스트 최소화', desc: '긴 텍스트 대신 그림·자막·나레이션 중심. 초등학생 저학년까지 고려한 정보 밀도 조절' },
];

function Divider() {
  return <div className="max-w-3xl mx-auto px-8"><div className="h-px" style={{ background: 'rgba(38,50,71,0.35)' }} /></div>;
}

export default function Dream() {
  return (
    <div style={{ background: '#0C0A12' }}>
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-8 pt-16 pb-20">
        <FadeIn>
          <p className="text-label mb-10" style={{ color: 'rgba(216,165,75,0.55)' }}>Career XR — 꿈키올래</p>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h1 className="text-headline mb-6" style={{ color: 'rgba(243,246,251,0.92)' }}>
            직업을 설명하지 않고,<br />
            <span style={{ color: 'rgba(216,165,75,0.75)' }}>세계관 안에서 경험하게 만들다</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-body max-w-lg mb-12">
            Apple Vision Pro 기반 XR 직업체험 콘텐츠 9종을 3개월 안에 기획·구축.<br />
            교육 콘텐츠가 아닌, 기억에 남는 체험을 설계했습니다.
          </p>
        </FadeIn>
        <FadeIn delay={0.12}>
          <div className="flex flex-wrap gap-10 text-sm">
            {[['역할', 'PM · 기획 · 컨셉 설계 · QA'], ['기간', '2025.09 — 2025.11'], ['디바이스', 'Apple Vision Pro']].map(([l, v]) => (
              <div key={l}>
                <p className="text-label mb-1.5" style={{ color: 'rgba(216,165,75,0.3)' }}>{l}</p>
                <p className="font-medium" style={{ color: 'rgba(243,246,251,0.6)' }}>{v}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      <Divider />

      {/* Challenges — inline text, not cards */}
      <section className="max-w-3xl mx-auto px-8 py-20">
        <FadeIn>
          <p className="text-label mb-3" style={{ color: 'rgba(216,165,75,0.35)' }}>The Challenge</p>
          <h2 className="text-subhead mb-6" style={{ color: 'rgba(243,246,251,0.85)' }}>처음 구상한 방식으로는 완성이 불가능했다</h2>
        </FadeIn>
        <FadeIn delay={0.05}>
          <p className="text-body leading-[1.9] max-w-xl">
            일반적으로 XR 콘텐츠 하나에 최소 2~3개월.<br />
            주어진 시간은 3개월, 완성해야 할 콘텐츠는 9종.<br />
            초기 기획(직업별 독립 제작)을 전면 폐기하고<br />
            '3개 컨셉 × 3개 직업' 공통 프레임워크로 전환.<br />
            공통 뼈대 위에 각 직업의 차별 포인트만 적층하는 방식으로<br />
            납기 내 9종 완성.
          </p>
        </FadeIn>
      </section>

      <Divider />

      {/* Gallery */}
      <section className="max-w-4xl mx-auto px-8 py-20">
        <FadeIn>
          <p className="text-label mb-3" style={{ color: 'rgba(216,165,75,0.35)' }}>Gallery</p>
          <h2 className="text-subhead mb-12" style={{ color: 'rgba(243,246,251,0.85)' }}>프로젝트 스크린샷</h2>
        </FadeIn>
        <FadeIn delay={0.05}>
          <InfiniteGallery items={GALLERY_ITEMS} />
        </FadeIn>
      </section>

      <Divider />

      {/* Worlds — editorial numbered entries */}
      <section className="max-w-3xl mx-auto px-8 py-20">
        <FadeIn>
          <p className="text-label mb-3" style={{ color: 'rgba(140,109,216,0.4)' }}>Worldbuilding</p>
          <h2 className="text-subhead mb-4" style={{ color: 'rgba(243,246,251,0.85)' }}>3개의 세계, 9개의 직업</h2>
          <p className="text-caption mb-14 max-w-md">단순 목록형 나열 대신, 컨셉별 세계관과 서사 안에서 선택하고 경험하는 구조.</p>
        </FadeIn>
        {WORLDS.map((w, i) => (
          <FadeIn key={w.name} delay={i * 0.04}>
            <div className="flex flex-col md:flex-row gap-6 py-6" style={{ borderBottom: i < WORLDS.length - 1 ? '1px solid rgba(38,50,71,0.25)' : 'none' }}>
              <div className="md:w-48 shrink-0">
                <p className="text-label mb-1" style={{ color: 'rgba(216,165,75,0.3)' }}>World {String(i + 1).padStart(2, '0')}</p>
                <p className="text-sm font-semibold" style={{ color: 'rgba(243,246,251,0.85)' }}>{w.name}</p>
              </div>
              <div className="flex-1">
                <p className="text-caption leading-relaxed mb-2">{w.desc}</p>
                <p className="text-[11px] font-medium" style={{ color: 'rgba(140,109,216,0.4)' }}>{w.jobs}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </section>

      <Divider />

      {/* UX  */}
      <section className="max-w-3xl mx-auto px-8 py-20">
        <FadeIn>
          <p className="text-label mb-3" style={{ color: 'rgba(216,165,75,0.35)' }}>UX & Interaction</p>
          <h2 className="text-subhead mb-12" style={{ color: 'rgba(243,246,251,0.85)' }}>Vision Pro에서의 사용성을 보완하다</h2>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-x-10 gap-y-8">
          {UX.map((u, i) => (
            <FadeIn key={u.title} delay={i * 0.03}>
              <div>
                <h3 className="text-sm font-semibold mb-2" style={{ color: 'rgba(243,246,251,0.8)' }}>{u.title}</h3>
                <p className="text-caption leading-relaxed">{u.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <Divider />

      {/* Outcome */}
      <section className="max-w-3xl mx-auto px-8 py-20 pb-32">
        <FadeIn>
          <p className="text-label mb-3" style={{ color: 'rgba(216,165,75,0.35)' }}>Outcome</p>
          <h2 className="text-subhead mb-8" style={{ color: 'rgba(243,246,251,0.85)' }}>짧은 기간 안에 기획 구조 자체를 생산 가능한 형태로 바꾸다</h2>
        </FadeIn>
        <FadeIn delay={0.05}>
          <p className="text-body leading-[1.9] max-w-xl mb-14">
            1종씩 순차적으로 기획하던 방식을 폐기하고, 1종 기획 → 디자인/개발 전달 → 다음 1종 기획 → 병렬 검수의 파이프라인 구조로 전환했습니다.
            "안 된다"고만 말하지 않고, 대체 구현안과 리스크 비교를 함께 제시해 판단 가능한 형태로 만든 것이
            클라이언트 신뢰의 핵심이었습니다.
          </p>
        </FadeIn>
        <div className="flex flex-col md:flex-row gap-12">
          <FadeIn delay={0.08}>
            <div>
              <p className="text-sm font-semibold mb-2" style={{ color: 'rgba(243,246,251,0.8)' }}>최종 성과</p>
              <p className="text-caption leading-relaxed max-w-xs">9종 XR 직업체험 콘텐츠 완성. 체험센터 운영 수준 구축. 후속 제안 요청으로 이어지는 만족도.</p>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
