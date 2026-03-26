import FadeIn from '../ui/FadeIn';

const ENTRIES = [
  {
    project: '꿈키올래',
    title: '재미가 먼저, 정보는 뒤에서',
    body: '꿈키올래에서 학생들이 "이건 교육이구나"라고 느끼는 순간 몰입은 끝납니다. 직무를 그대로 재현하면 지루하고, 고증도 애매해집니다. 그래서 메인 게임 + 미니게임 구조를 도입했습니다. 사용자가 먼저 재밌게 플레이하고, 마지막에 직업 정보를 자연스럽게 확인합니다.',
  },
  {
    project: '꿈키올래',
    title: '불가능한 일정을 구조로 해결',
    body: '9종을 각각 독립 제작하면 최소 9개월. 하지만 일정은 3개월이었습니다. 초기 기획을 전면 폐기하고, 3개 컨셉 × 3개 직업의 프레임워크 구조로 전환했습니다. 공통 뼈대 위에 각 직업의 차별 포인트를 강하게 주는 방식입니다.',
  },
  {
    project: 'KISTi',
    title: '사용자를 관찰하고, UX를 바꾸다',
    body: 'KISTI에서 고령자는 VR HMD 자체가 낯선 사용자입니다. 시점 전환, 카메라 무빙, 작은 UI 버튼 — 일반 사용자에게 당연한 것이 모두 장벽이었습니다. 저는 이를 무시하지 않고, 고정 시점, 확대 콜라이더, 교수자 중앙 제어로 UX를 재설계했습니다.',
  },
  {
    project: 'KISTi',
    title: '레거시 안에서 신뢰를 만들다',
    body: '이전 업체의 코드를 인수받은 상태에서 프로젝트는 시작됐습니다. 무엇이 기존 합의인지, 어디서부터 제 판단인지 구분하는 것부터 해야 했습니다. 산개된 자료를 다시 구조화하며 기준부터 세웠습니다.',
  },
  {
    project: 'Both',
    title: '안 된다고만 하지 않는다',
    body: '클라이언트의 요구가 기술적으로 어려울 때, 단순히 거절하지 않았습니다. 대체 구현안, 우회 방식, 리스크 비교를 함께 제시하여 판단 가능한 형태로 만들었습니다. 이것이 두 프로젝트 모두에서 클라이언트 신뢰를 만든 핵심이었습니다.',
  },
  {
    project: 'Both',
    title: '디바이스 특성이 설계를 바꾼다',
    body: 'Vision Pro의 아이트래킹은 정밀하지만, 긴 플레이에서 눈 피로가 심합니다. Quest의 핸드트래킹은 자유롭지만, 고령자에게는 정확도가 부족합니다. 저는 각 디바이스의 한계를 회피하지 않고, UX 설계 자체로 보완했습니다.',
  },
];

export default function Process() {
  return (
    <div style={{ background: '#090C14' }}>
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-8 pt-16 pb-20">
        <FadeIn>
          <p className="text-label mb-10" style={{ color: 'rgba(126,241,214,0.45)' }}>Design Process</p>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h1 className="text-headline mb-6" style={{ color: 'rgba(243,246,251,0.92)' }}>
            기획은 어떻게<br />
            <span style={{ color: 'rgba(126,241,214,0.6)' }}>판단이 되는가</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-body max-w-md">
            두 프로젝트를 관통하는 기획 사고 방식.<br />
            제약을 기회로, 모호함을 구조로 바꾸는 과정입니다.
          </p>
        </FadeIn>
      </section>

      <div className="max-w-3xl mx-auto px-8"><div className="h-px" style={{ background: 'rgba(38,50,71,0.35)' }} /></div>

      {/* Entries — editorial essay blocks */}
      <section className="max-w-3xl mx-auto px-8 py-16 pb-32">
        {ENTRIES.map((e, i) => (
          <FadeIn key={e.title} delay={i * 0.03}>
            <article className="py-10" style={{ borderBottom: i < ENTRIES.length - 1 ? '1px solid rgba(38,50,71,0.2)' : 'none' }}>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-label" style={{ color: 'rgba(126,241,214,0.25)' }}>{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[10px] font-medium" style={{ color: '#546178' }}>{e.project}</span>
              </div>
              <h3 className="text-subhead mb-4" style={{ color: 'rgba(243,246,251,0.85)' }}>{e.title}</h3>
              <p className="text-body leading-[1.9] max-w-xl">{e.body}</p>
            </article>
          </FadeIn>
        ))}
      </section>
    </div>
  );
}
