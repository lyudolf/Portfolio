import FadeIn from '../ui/FadeIn';
import MagicBento from '../ui/MagicBento';
import ScrollFloat from '../ui/ScrollFloat';
import ScrollFloatWrapper from '../ui/ScrollFloatWrapper';
import HeroLanding from '../HeroLanding';

/* 히어로가 지표·역량·대표작을 모두 담게 되면서
   그 아래 있던 스크롤 모프 섹션(캡슐 → 펼침 → 축소)은 역할이 겹쳐 제거함. */

export default function About({ onNavigate }) {
  return (
    <div style={{
      /* 이끼 배경(1:2 세로형)이 페이지 상단부터 스크롤 따라 이어지고,
         섹션 4를 지나며 다크로 페이드 → 하단 다크 콘텐츠 연결. */
      backgroundColor: '#080A0F',
      backgroundImage:
        "linear-gradient(180deg, rgba(8,10,15,0) 0%, rgba(8,10,15,0.35) 78vh, rgba(8,10,15,0.9) 105vh, #080A0F 125vh), url('/hero-bg.jpg')",
      backgroundSize: 'auto, 100% auto',
      backgroundPosition: 'top center',
      backgroundRepeat: 'no-repeat',
    }}>
      {/* Hero — 3D 자연 오브 랜딩 (섹션 1) */}
      <HeroLanding onNavigate={onNavigate} />


      {/* 다크 존 — 기존 벤토/Key Results/Profile (다크 스타일 유지) */}
      <div style={{ background: '#080A0F' }}>
      {/* Sector 2 — Bento Grid with ScrollFloat title */}
      <section className="min-h-[100vh] flex flex-col items-center justify-center max-w-5xl mx-auto px-8">
        <ScrollFloat
          containerClassName="text-center mb-10"
          textClassName="font-bold text-white"
        >
          About
        </ScrollFloat>

        <MagicBento gridClassName="grid grid-cols-4 gap-3" gridStyle={{ gridAutoRows: '160px' }}>

            {/* Row 1 — Top-left: 2 small cards */}
            <ScrollFloatWrapper delay={0} style={{ gridColumn: '1 / 2', gridRow: '1 / 2' }}>
              <MagicBento.Card className="col-span-2 row-span-1 p-6 flex flex-col justify-between h-full">
                <p className="text-label" style={{ color: 'rgba(167,139,250,0.5)' }}>XR Planning</p>
                <div>
                  <h3 className="text-sm font-semibold mb-0.5" style={{ color: 'rgba(243,246,251,0.9)' }}>서비스 기획</h3>
                  <p className="text-caption">사용자 리서치 기반 경험 설계</p>
                </div>
              </MagicBento.Card>
            </ScrollFloatWrapper>

            <ScrollFloatWrapper delay={0.05} style={{ gridColumn: '2 / 3', gridRow: '1 / 2' }}>
              <MagicBento.Card className="col-span-2 row-span-1 p-6 flex flex-col justify-between h-full">
                <p className="text-label" style={{ color: 'rgba(167,139,250,0.5)' }}>PM</p>
                <div>
                  <h3 className="text-sm font-semibold mb-0.5" style={{ color: 'rgba(243,246,251,0.9)' }}>프로젝트 매니징</h3>
                  <p className="text-caption">일정·리스크·커뮤니케이션 관리</p>
                </div>
              </MagicBento.Card>
            </ScrollFloatWrapper>

            {/* Row 1-2 — Top-right: tall card (spans 2 rows) */}
            <ScrollFloatWrapper delay={0.1} style={{ gridColumn: '3 / 5', gridRow: '1 / 3' }}>
              <MagicBento.Card className="p-7 flex flex-col justify-between h-full">
                <p className="text-label" style={{ color: 'rgba(111,216,255,0.5)' }}>01 — Clinical XR</p>
                <div>
                  <h3 className="text-subhead mb-1" style={{ color: 'rgba(243,246,251,0.9)' }}>KISTi</h3>
                  <p className="text-caption leading-relaxed">고령자 XR 인지·운동 훈련 시스템.<br />임상 환경에서 실제로 운영되는 구조를 설계.</p>
                </div>
              </MagicBento.Card>
            </ScrollFloatWrapper>

            {/* Row 2-3 — Middle-left: wide tall card (spans 2 cols, 2 rows) */}
            <ScrollFloatWrapper delay={0.15} style={{ gridColumn: '1 / 3', gridRow: '2 / 4' }}>
              <MagicBento.Card className="p-7 flex flex-col justify-between h-full">
                <p className="text-label" style={{ color: 'rgba(216,165,75,0.5)' }}>02 — Career XR</p>
                <div>
                  <h3 className="text-subhead mb-1" style={{ color: 'rgba(243,246,251,0.9)' }}>꿈키올래</h3>
                  <p className="text-caption leading-relaxed">Apple Vision Pro 기반 XR 직업체험 9종.<br />3개월 내 기획·구축 완료.</p>
                </div>
              </MagicBento.Card>
            </ScrollFloatWrapper>

            {/* Row 3 — Bottom-right: 2 small cards */}
            <ScrollFloatWrapper delay={0.2} style={{ gridColumn: '3 / 4', gridRow: '3 / 4' }}>
              <MagicBento.Card className="p-6 flex flex-col justify-between h-full">
                <p className="text-label" style={{ color: 'rgba(167,139,250,0.5)' }}>UX Design</p>
                <div>
                  <h3 className="text-sm font-semibold mb-0.5" style={{ color: 'rgba(243,246,251,0.9)' }}>인터랙션 설계</h3>
                  <p className="text-caption">디바이스별 UX 최적화</p>
                </div>
              </MagicBento.Card>
            </ScrollFloatWrapper>

            <ScrollFloatWrapper delay={0.25} style={{ gridColumn: '4 / 5', gridRow: '3 / 4' }}>
              <MagicBento.Card className="p-6 flex flex-col justify-between h-full">
                <p className="text-label" style={{ color: 'rgba(167,139,250,0.5)' }}>QA & Ops</p>
                <div>
                  <h3 className="text-sm font-semibold mb-0.5" style={{ color: 'rgba(243,246,251,0.9)' }}>품질 관리</h3>
                  <p className="text-caption">운영 구조 구축</p>
                </div>
              </MagicBento.Card>
            </ScrollFloatWrapper>

          </MagicBento>

        {/* Key Results — 검증된 정량성과 */}
        <div className="mt-20 w-full">
          <FadeIn>
            <p className="text-label mb-6 text-center" style={{ color: 'rgba(111,216,255,0.45)' }}>Key Results</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { num: '3배+', label: '팀 매출 성장 견인', desc: '3.8억 → 11.5억 (전년 대비), B2G XR 사업 기획·PM 총괄' },
                { num: '3년차', label: '1년 용역 → 계속 연장', desc: '1차 임상 60명 무이슈 완료, 클라이언트 신뢰로 5·6년차 논의 중' },
                { num: '금상', label: '웹어워드 코리아 수상', desc: 'B2B 웹 구축 기획 주도, 신규 제안 수주 100% 기여' },
              ].map(item => (
                <div key={item.label} className="p-6 rounded-2xl text-center"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <p className="text-[28px] font-extrabold mb-1" style={{ color: 'rgba(111,216,255,0.85)' }}>{item.num}</p>
                  <p className="text-sm font-semibold mb-2" style={{ color: 'rgba(243,246,251,0.85)' }}>{item.label}</p>
                  <p className="text-caption leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Profile */}
        <div className="mt-16">
          <FadeIn>
            <div className="flex flex-col md:flex-row gap-12">
              {[
                { label: '역할', value: 'PM · 서비스 기획 · UX 설계' },
                { label: '도메인', value: 'XR · B2B 웹 · B2G' },
                { label: '특기', value: '구조 설계 · 제약 해결' },
              ].map(item => (
                <div key={item.label}>
                  <p className="text-label mb-2" style={{ color: '#546178' }}>{item.label}</p>
                  <p className="text-sm font-medium" style={{ color: 'rgba(243,246,251,0.7)' }}>{item.value}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
      </div>
    </div>
  );
}
