import { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import AtAGlance from '../ui/AtAGlance';
import ProjectShowcase from '../ui/ProjectShowcase';

/* ══════════════════════════════════════════
   DATA
   ══════════════════════════════════════════ */

const PROBLEMS = [
  {
    id: 'visual',
    title: '과도한 시각적 정보량',
    result: '시점 고정 + 핵심 오브젝트 중심 씬 재설계, 집중도 향상',
    body: '무한하게 펼쳐진 공간형 씬은 시각적 부하가 과했고, 고령자가 훈련 목표에 집중하기 어려웠습니다. 고정 시점 기반으로 씬을 재설계하고 핵심 오브젝트만 남겨 인지 부담을 최소화했습니다.',
  },
  {
    id: 'motion',
    title: '높은 멀미·적응 부담',
    result: '카메라 이동 완전 제거·콜라이더 확대로 멀미·실패 경험 최소화',
    body: 'VR 환경에 익숙하지 않은 고령자에게는 공간 적응과 멀미 부담이 컸습니다. 카메라 이동을 완전히 제거하고 콜라이더를 확대하여 핸드트래킹 오차를 흡수했습니다.',
  },
  {
    id: 'depth',
    title: '깊은 Depth의 운영 구조',
    result: '진입 6단계 → 1~2 depth로 단축, 현장 운영 흐름으로 채택',
    body: '진입 depth가 6단계에 달해 교수자와 훈련자 모두 혼란을 겪었습니다. 대상자 선택부터 결과 확인까지 단일 흐름의 1~2 depth 구조로 과감히 단축했습니다.',
  },
  {
    id: 'legacy',
    title: '불안정한 레거시 구조',
    result: '인수 코드 재구조화로 반복 세션 안정화 — 1년 용역이 3년차까지 연장',
    body: '기존 업체가 작성한 코드를 인수받아 시작한 프로젝트라, 구조와 일정 모두 불안정한 상태였습니다. 코드를 재구조화하고 안정적인 세션 반복 운영이 가능한 시스템을 구축했습니다.',
  },
];

const PRINCIPLES = [
  {
    id: 'visibility',
    icon: '👁️',
    title: '시인성 최우선',
    desc: 'UI를 해치지 않는 선에서 텍스트를 충분히 크게, 교수자가 크기·수치를 제어',
    accent: 'rgba(111,216,255,0.22)',
    border: 'rgba(23,118,166,0.28)',
  },
  {
    id: 'accuracy',
    icon: '🎯',
    title: '조작 정확도',
    desc: '핸드트래킹 민감도 상향, 콜라이더 확대로 작은 오차에도 성공 경험 유도',
    accent: 'rgba(74,222,128,0.2)',
    border: 'rgba(34,150,80,0.3)',
  },
  {
    id: 'fatigue',
    icon: '⚡',
    title: '피로도 최소화',
    desc: '시점 전환과 카메라 이동을 제거, 고정 공간 내에서 상호작용 설계',
    accent: 'rgba(168,85,247,0.16)',
    border: 'rgba(126,58,192,0.28)',
  },
  {
    id: 'control',
    icon: '🔒',
    title: '중앙 제어 강화',
    desc: '교수자가 모든 설정과 진행을 중앙에서 관리, 훈련자 부담 최소화',
    accent: 'rgba(244,162,63,0.18)',
    border: 'rgba(180,116,35,0.3)',
  },
];

const SOLUTIONS = [
  {
    id: 'training',
    badge: '훈련 콘텐츠',
    title: '곤충잡기 · 공놀이',
    desc: '색상, 종류, 방향, 기억 과제를 결합한 인지·운동 복합 훈련. 직관적 상호작용에 임상 정량 지표를 자연스럽게 녹였습니다.',
  },
  {
    id: 'test',
    badge: '검사 콘텐츠',
    title: '인지검사 · 균형검사',
    desc: '9가지 주의력 항목 측정, Force Plate 연동 실시간 균형 모니터링. 실행 안정성을 품질의 일부로 접근했습니다.',
  },
  {
    id: 'launcher',
    badge: '운영 시스템',
    title: '교수자 · 훈련자 런처',
    desc: '4~5단계 진입을 1~2 Depth로 과감히 단축. 대상자 선택부터 결과 확인까지 단일 흐름으로 재구성했습니다.',
  },
];

/* 시스템 구성 — 기기 3종 + 서버. 내부 문서에서 발췌하되 IP·키·코드 위치 등은 배제 */
const SYSTEM_NODES = [
  { id: 'pc', name: '교수자 PC', sub: '런처 + 서브모니터', desc: '수업 개설 · 진행 조종 · 모니터링 · 기록 열람' },
  { id: 'hmd', name: '훈련자 HMD', sub: 'VR 수업 앱', desc: '곤충채집 · 공놀이 훈련 플레이' },
  { id: 'eval', name: '검사용 HMD', sub: 'VR 임상검사 앱', desc: '인지 · 균형 · 심혈관 · 운동성 검사' },
];

const SYSTEM_DECISIONS = [
  {
    id: 'device',
    title: 'HMD는 스스로 로그인하지 않습니다',
    body: '고령 훈련자가 헤드셋 안에서 아이디와 비밀번호를 입력하는 것은 비현실적이라고 판단했습니다. 헤드셋은 켜지면 서버에 스스로 기기 등록만 하고, 교수자가 PC에서 기기와 훈련자 계정을 연결하는 순간 자동 로그인됩니다. "누가 어느 헤드셋을 쓰는가"를 교수자가 결정하는 구조입니다.',
  },
  {
    id: 'master',
    title: '진행 권한은 항상 교수자 PC에 있습니다',
    body: '게임 생성, 미션 결정, 시간과 라운드 관리, 기록 저장은 모두 교수자 런처가 맡습니다. HMD는 손으로 잡고 담는 판정과 점수 보고만 담당합니다. 진행 중 문제가 생겨도 교수자가 그 자리에서 수습할 수 있도록, 권한을 한곳에 모았습니다.',
  },
  {
    id: 'stage',
    title: 'VR은 무대, 측정은 검증된 장비가 합니다',
    body: '검사 4종 중 VR이 직접 측정하는 것은 인지검사 하나뿐입니다. 균형은 발판 압력 센서, 심혈관은 스마트워치, 운동성은 웹캠 관절 추적이 측정하고, VR은 검사 상황을 연출하고 시작·종료 신호를 보내는 역할에 집중합니다. 임상 데이터의 정확도가 필요한 곳에는 검증된 장비를 썼습니다.',
  },
  {
    id: 'recenter',
    title: '시야 보정을 직접 만들었습니다',
    body: '고령 훈련자는 헤드셋 기본 제공되는 화면 재정렬 조작을 쓰기 어려웠습니다. 그래서 검사 직전 "다음" 버튼을 누르는 순간의 머리 방향을 기준으로 화면 중앙을 다시 맞추는 자체 보정을 설계했습니다. 버튼 하나로 끝나는, 훈련자가 배울 필요 없는 보정입니다.',
  },
];

/* ── Animation variants ── */

/* ── Color tokens — 라이트(이끼·포슬린) 테마. 히어로의 밝은 톤을 상세까지 연장 ── */
const C = {
  accent: 'rgba(23,118,166,0.95)',      // 딥 시안 (밝은 배경용 텍스트 액센트)
  accentDim: 'rgba(23,118,166,0.6)',
  accentSoft: 'rgba(111,216,255,0.16)', // 파스텔 필 (히어로 핫스팟 #6fd8ff 계열)
  text92: 'rgba(24,32,27,0.92)',
  text60: 'rgba(24,32,27,0.65)',
  text45: 'rgba(24,32,27,0.52)',
  text35: 'rgba(24,32,27,0.4)',
  border: 'rgba(24,32,27,0.08)',
  cardBg: 'rgba(255,255,255,0.6)',
  cardBorder: 'rgba(24,32,27,0.08)',
  cardShadow: '0 8px 24px rgba(24,32,27,0.05)',
};

/* ══════════════════════════════════════════
   COMPONENTS
   ══════════════════════════════════════════ */

/* ── HeroSection — 이끼 배경 위 글래스 패널 (메인 히어로 문법 공유) ──
   커튼은 연출용 오버레이. 본문은 뒤에 이미 렌더되어 있고,
   모션 최소화 설정에서는 커튼 없이 즉시 보인다. */

/* ── ProblemSection (sticky sidebar) ── */
function ProblemSection() {
  return (
    <section className="px-8 py-24 border-b" style={{ maxWidth: '1100px', margin: '0 auto', borderColor: C.border }}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Left sticky */}
        <div className="md:col-span-4">
          <div className="md:sticky md:top-24">
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: C.accent }}>
              Problem Definition
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-[28px] md:text-[34px] font-bold leading-tight"
              style={{ color: C.text92, letterSpacing: '-0.02em' }}>
              기존 구조를<br />다시 봐야 했던 이유
            </motion.h2>
          </div>
        </div>

        {/* Right scrollable */}
        <div className="md:col-span-8 flex flex-col gap-14">
          {PROBLEMS.map((p, i) => (
            <motion.div key={p.id}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: C.accent }}>
                0{i + 1}
              </p>
              <h3 className="text-[18px] md:text-[20px] font-bold mb-2 leading-snug" style={{ color: 'rgba(24,32,27,0.88)' }}>
                {p.title}
              </h3>
              <p className="text-[12px] font-semibold mb-3 px-2 py-1 rounded inline-block"
                style={{ color: 'rgba(23,118,166,0.95)', background: 'rgba(111,216,255,0.16)' }}>
                → {p.result}
              </p>
              <div className="h-px w-full mb-4" style={{ background: 'rgba(24,32,27,0.08)' }} />
              <p className="text-[14px] leading-[2]"
                style={{ color: C.text45, fontFamily: '"Noto Serif KR", serif' }}>
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PrincipleCard (glow hover) ── */
function PrincipleCard({ item, index }) {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };
  const glowX = useTransform(mouseX, (v) => `${v}px`);
  const glowY = useTransform(mouseY, (v) => `${v}px`);

  return (
    <motion.div ref={ref} onMouseMove={handleMouseMove}
      className="relative rounded-2xl overflow-hidden group"
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ background: C.cardBg, border: `1px solid ${item.border}` }}>
      <motion.div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(240px circle at ${glowX} ${glowY}, ${item.accent}, transparent 70%)` }} />
      <div className="relative z-10 p-6">
        <div className="text-2xl mb-3">{item.icon}</div>
        <h4 className="text-[15px] font-bold mb-2" style={{ color: 'rgba(24,32,27,0.85)' }}>{item.title}</h4>
        <p className="text-[13px] leading-relaxed" style={{ color: C.text45 }}>{item.desc}</p>
      </div>
    </motion.div>
  );
}

/* ── PrinciplesSection ── */
function PrinciplesSection() {
  return (
    <section className="px-8 py-24 border-b" style={{ maxWidth: '1100px', margin: '0 auto', borderColor: C.border }}>
      <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: C.accent }}>
        Design Principles
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.06 }}
        className="text-[26px] md:text-[30px] font-bold leading-snug mb-12"
        style={{ color: C.text92, letterSpacing: '-0.01em' }}>
        고령자 기준의 UX 재정의
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PRINCIPLES.map((p, i) => (
          <PrincipleCard key={p.id} item={p} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ── SolutionsSection ── */
function SolutionsSection() {
  return (
    <section className="px-8 py-24 border-b" style={{ maxWidth: '1100px', margin: '0 auto', borderColor: C.border }}>
      <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: C.accent }}>
        Core Solutions
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.06 }}
        className="text-[26px] md:text-[30px] font-bold leading-snug mb-12"
        style={{ color: C.text92, letterSpacing: '-0.01em' }}>
        해결책 및 핵심 기능
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SOLUTIONS.map((s, i) => (
          <motion.div key={s.id}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative p-7 rounded-2xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col group overflow-hidden"
            style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}` }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(23,118,166,0.35)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.cardBorder; }}>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: C.accentDim }}>
              {s.badge}
            </p>
            <h4 className="text-[16px] font-bold mb-3" style={{ color: 'rgba(24,32,27,0.85)' }}>{s.title}</h4>
            <p className="text-[13px] leading-[1.85] flex-1"
              style={{ color: C.text45, fontFamily: '"Noto Serif KR", serif' }}>
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ── SystemSection — 시스템 구성도 + 설계 결정 ── */
function SystemSection() {
  const connectorText = { color: C.text35, fontSize: '11px', letterSpacing: '0.08em' };
  return (
    <section className="px-8 py-24 border-b" style={{ maxWidth: '1100px', margin: '0 auto', borderColor: C.border }}>
      <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: C.accent }}>
        System Architecture
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.06 }}
        className="text-[26px] md:text-[30px] font-bold leading-snug mb-4"
        style={{ color: C.text92, letterSpacing: '-0.01em' }}>
        화면 뒤의 구조까지 설계했습니다
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ delay: 0.12 }}
        className="text-[14px] leading-relaxed mb-12" style={{ color: C.text45, maxWidth: '620px' }}>
        교수자용 PC 프로그램 하나와 VR 헤드셋 앱 두 개가 서버를 사이에 두고 함께 움직이는 시스템입니다.
        세 프로그램이 어떤 역할을 나눠 맡고 어디서 만나는지를 기획 단계에서 정의했습니다.
      </motion.p>

      {/* 구성도 */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55 }}
        className="mb-14 p-6 md:p-8 rounded-2xl"
        style={{ background: 'rgba(255,255,255,0.5)', border: `1px solid ${C.cardBorder}`, boxShadow: C.cardShadow }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
          {SYSTEM_NODES.map((n) => (
            <div key={n.id} className="p-5 rounded-xl text-center"
              style={{ background: 'rgba(111,216,255,0.14)', border: '1px solid rgba(23,118,166,0.25)' }}>
              <p className="text-[15px] font-bold mb-1" style={{ color: 'rgba(24,32,27,0.88)' }}>{n.name}</p>
              <p className="text-[11px] font-semibold mb-2" style={{ color: C.accentDim }}>{n.sub}</p>
              <p className="text-[12px] leading-relaxed" style={{ color: C.text45 }}>{n.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mb-2" style={connectorText}>▲ ▼ 계정 확인 · 수업 정보 · 기기 연결 · 결과 기록</div>
        <div className="p-4 rounded-xl text-center mb-5"
          style={{ background: 'rgba(111,216,255,0.22)', border: '1px solid rgba(23,118,166,0.32)' }}>
          <p className="text-[14px] font-bold" style={{ color: 'rgba(24,32,27,0.88)' }}>백엔드 서버</p>
          <p className="text-[12px]" style={{ color: C.text45 }}>계정 / 수업(세션) / 기기 / 검사 기록 보관</p>
        </div>
        <div className="text-center mb-2" style={connectorText}>그리고 수업 중에는 —</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl text-center" style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}` }}>
            <p className="text-[13px] font-bold mb-1" style={{ color: 'rgba(24,32,27,0.8)' }}>실시간 게임 동기화</p>
            <p className="text-[12px]" style={{ color: C.text45 }}>같은 게임 방에 모여 움직임·점수를 실시간 공유</p>
          </div>
          <div className="p-4 rounded-xl text-center" style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}` }}>
            <p className="text-[13px] font-bold mb-1" style={{ color: 'rgba(24,32,27,0.8)' }}>화상 · 음성 통화</p>
            <p className="text-[12px]" style={{ color: C.text45 }}>교수자와 훈련자가 수업 내내 얼굴을 보며 소통</p>
          </div>
        </div>
      </motion.div>

      {/* 설계 결정 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {SYSTEM_DECISIONS.map((d, i) => (
          <motion.div key={d.id}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="p-6 md:p-7 rounded-2xl"
            style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}` }}>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: C.accentDim }}>
              Decision 0{i + 1}
            </p>
            <h4 className="text-[16px] font-bold mb-3 leading-snug" style={{ color: 'rgba(24,32,27,0.88)' }}>
              {d.title}
            </h4>
            <p className="text-[13px] leading-[1.9]" style={{ color: C.text45 }}>{d.body}</p>
          </motion.div>
        ))}
      </div>

      {/* 문서화 한 줄 */}
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="text-[14px] font-semibold leading-relaxed pl-4"
        style={{ color: 'rgba(23,118,166,0.92)', borderLeft: '2px solid rgba(23,118,166,0.4)' }}>
        이 구조 전체를 앱 3종 · 화면(씬) 30개 단위의 구조 문서로 정리해 두었습니다.
        본문은 비개발자 기준으로 쓰고 개발 상세는 접이식으로 분리해, 기획·개발·운영이 같은 문서를 봅니다.
      </motion.p>
    </section>
  );
}

/* ── ImpactSection ── */
function ImpactSection() {
  return (
    <section className="px-8 py-24 pb-32" style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: C.accent }}>
        PM's Impact
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.06 }}
        className="text-[26px] md:text-[30px] font-bold leading-snug mb-8"
        style={{ color: C.text92, letterSpacing: '-0.01em' }}>
        기준이 없는 상황에서 기준을 세우고,<br />굴러가는 구조를 만들다
      </motion.h2>

      {/* Quote */}
      <motion.blockquote initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="relative pl-6 py-4 mb-14"
        style={{ borderLeft: '2px solid rgba(23,118,166,0.35)' }}>
        <p className="text-[15px] italic leading-relaxed" style={{ color: C.text45 }}>
          "기획은 문서를 만드는 일이 아니라, 실제로 필요한 구조를 현실 안에서 작동하게 만드는 일임을 증명했습니다."
        </p>
      </motion.blockquote>

      {/* Impact cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: '📈', title: '핵심 성과', desc: '1년 용역이 신뢰를 얻어 3년차까지 연장(5·6년차 논의 중). 박사가 직접 방문해 "합류 조건으로 사업비 증액·차기 연차 연계"를 제안.' },
          { icon: '🩺', title: '임상 검증', desc: '1차 임상 60명을 크리티컬 이슈 없이 완료(목표 120명, 2차 진행 중). 정확성·품질을 입증해 기관 신뢰를 확보.' },
          { icon: '🏗️', title: '운영 구조', desc: '기준·PM 프로세스가 부재한 R&D 환경에서 측정 지표와 운영 구조를 신규 정의. 반복 세션이 안정적으로 굴러가는 시스템을 구축.' },
        ].map((item, i) => (
          <motion.div key={item.title}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
            className="p-7 rounded-2xl"
            style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}` }}>
            <div className="text-2xl mb-3">{item.icon}</div>
            <h4 className="text-[15px] font-bold mb-2" style={{ color: 'rgba(24,32,27,0.85)' }}>{item.title}</h4>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text45 }}>{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════ */
export default function Kisti({ onNavigate }) {
  return (
    <div
      className="relative w-full overflow-x-hidden"
      style={{
        backgroundColor: '#eef2ec',
        color: '#1a231e',
      }}
    >
      {/* Top glow line */}
      <div
        className="fixed top-0 left-0 right-0 h-px pointer-events-none z-10"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(23,118,166,0.25), transparent)' }}
      />
      <div className="px-4 md:px-6 py-6">
        <div style={{ maxWidth: 1640, margin: '0 auto' }}>
          <ProjectShowcase activeId="kisti" onNavigate={onNavigate}>
          <AtAGlance
            accent="rgba(111,216,255,0.85)"
            items={[
              { num: '60명', label: '1차 임상 무이슈 완료', sub: '목표 120명, 2차 진행 중' },
              { num: '3년차', label: '1년 용역 → 계속 연장', sub: '5·6년차 연장 논의 중' },
              { num: '3배+', label: '팀 매출 성장 견인', sub: '3.8억 → 11.5억 (전년 대비)' },
              { num: '1~2', label: '운영 Depth 단축', sub: '진입 6단계 → 1~2 depth 재설계' },
            ]}
          />
          <ProblemSection />
          <PrinciplesSection />
          <SolutionsSection />
          <SystemSection />
          <ImpactSection />
          </ProjectShowcase>
        </div>
      </div>
    </div>
  );
}
