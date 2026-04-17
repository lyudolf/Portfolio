import { motion } from 'framer-motion';
import FadeIn from '../ui/FadeIn';
import MagicBento from '../ui/MagicBento';
import Orb from '../ui/Orb';
import ScrollFloat from '../ui/ScrollFloat';
import ScrollFloatWrapper from '../ui/ScrollFloatWrapper';

export default function About() {
  return (
    <div style={{ background: '#080A0F' }}>
      {/* Hero */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Orb hue={240} hoverIntensity={0.3} rotateOnHover={true} forceHoverState={false} backgroundColor="#080A0F" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-8">
          <motion.p className="text-label mb-10" style={{ color: 'rgba(167,139,250,0.45)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
            XR Service Planner · PM
          </motion.p>
          <motion.h1 className="text-display mb-8"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}>
            <span style={{ color: '#F3F6FB' }}>test data</span>
          </motion.h1>
          <motion.p className="text-body max-w-md" style={{ color: '#546178' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
            데이터를 기반으로 시스템의 병목을 찾아 효율화하는 역량
          </motion.p>
        </div>
      </section>

      {/* Sector 2 — Bento Grid with ScrollFloat title */}
      <section className="min-h-[100vh] flex flex-col items-center justify-center max-w-5xl mx-auto px-8">
        <ScrollFloat
          containerClassName="text-center mb-10"
          textClassName="font-bold text-white"
        >
          test data
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

        {/* Profile */}
        <div className="mt-20">
          <FadeIn>
            <div className="flex flex-col md:flex-row gap-12">
              {[
                { label: '역할', value: 'PM · 기획 · UX 설계' },
                { label: '경험', value: 'XR · VR · Vision Pro' },
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
  );
}
