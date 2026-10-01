/* 이력서 — 사람인/링크드인식 구조 문서.
   화면에서는 포슬린 배경 위 A4 시트, 인쇄(PDF 저장) 시 시트만 남는다.
   ⚠️ 연봉·클라이언트 내부 발언(사업비 증액 일화)은 공개 문서 비노출 방침.
   데이터 출처: 사람인 이력서(career-history) + 수정 문구(handoff-saramin-fixes),
   미니앱 상태는 4종 전부 출시로 갱신(appsintoss-traction). */

/* 사진은 기본 미노출.
   타겟(IT 자체서비스 기업)에서는 이력서 사진을 요구하지 않고, 블라인드 채용도 흔하다.
   사람인 이력서에는 이미 사진이 있으니 채널별로 역할을 나눈다.
   넣고 싶으면 SHOW_PHOTO를 true로 (public/resume-profile.jpg 교체 후). */
const SHOW_PHOTO = false;
const PROFILE_IMG = '/resume-profile.jpg';

const INK = 'rgba(20,26,22,0.92)';
const INK_70 = 'rgba(20,26,22,0.7)';
const INK_50 = 'rgba(20,26,22,0.5)';
const INK_38 = 'rgba(20,26,22,0.38)';
const LINE = 'rgba(20,26,22,0.1)';
const ACCENT = '#0f8f74';

/* ── 데이터 ── */

/* 리멤버 자기소개 본인 최종본(2026-09-16)과 같은 문장 — 플랫폼 간 문체 통일 */
export const SUMMARY =
  '서비스 기획·PM 3년 7개월. 현재 ㈜이트라이브에서 국가과제 XR 시스템과 사내 신사업 플랫폼의 기획·PM을 맡고 있습니다. ' +
  '컴퓨터공학 전공 · 정보처리기사 · React/Spring Boot 실무 경험. 기술 제약을 직접 확인하고 기획합니다.';

/* 팀 매출: 2026-09-30 본인 결정으로 "3배 견인" 대신 연도별 숫자만 (2024 4억 · 2025 9억 · 2026 현재 13억) */
export const KEY_RESULTS = [
  { num: '13억', label: '팀 매출 (2026 현재)', sub: '4억(2024) → 9억(2025) → 13억' },
  { num: '60명', label: '1차 임상 무이슈 완료', sub: '2차 진행 중' },
  { num: '3년차', label: '1년 용역 → 계속 연장', sub: '마지막 6년차 연장 논의 중' },
  { num: '금상', label: '웹어워드 코리아', sub: '리뉴얼 프로젝트 기획' },
];

export const CAREERS = [
  {
    company: '㈜이트라이브 (ETRIBE)',
    role: 'CTS본부 · 매니저 · PM/서비스 기획',
    period: '2024.07 ~ 재직 중',
    intro: 'XR·플랫폼 B2G/신사업 프로젝트 기획·PM. 제안서 작성부터 수주·인력 배정·개발 관리·검증·납품·정산까지 전 사이클 수행.',
    /* 2026-09-30: 면접관이 훑어보기 좋게 불릿은 결과 먼저, 한 줄 길이로 */
    bullets: [
      'KISTI 고령자 XR 훈련 시스템 (단독 기획·PM): 1차 임상 60명 크리티컬 이슈 없이 완료(2차 진행 중), 1년 용역 → 3년차 운영 연장',
      'KISTI UX 재설계: 진입 6단계 메뉴 → 1~2 depth, 조작을 교수자 PC로 모은 중앙 제어 구조',
      'ZING 캠페인 플랫폼 (기획·설계·개발 1인): 9개월 동안 미뤄지던 마케팅 홈페이지 구축을 6영업일에 완료',
      '꿈키올래 Vision Pro 직업체험 9종 (PM·기획·QA): 실개발 2개월에 9종 납품, 클라이언트 후속 제안',
      '한국콘텐츠진흥원 AI 직업체험 국가과제: 초기 기획 참여 (페르소나·난이도 파라미터·평가지표 설계)',
      '팀 매출 4억(2024) → 9억(2025) → 13억(2026 현재): 제안서 작성부터 수주·수행·정산까지 직접 수행',
    ],
  },
  {
    company: '웹마인드',
    role: '기획 · 주임',
    period: '2023.04 ~ 2024.07',
    intro: 'B2B 웹/앱 구축 기획 전 과정(IA·요구사항 정의·화면설계·일정/예산) 담당. 참여한 신규 제안 전건 수주.',
    bullets: [
      '아마노코리아 브랜드 사이트 리뉴얼: 웹어워드 코리아(K-Award) 금상, 유지보수 계약 연장',
      'Intertek 공식 사이트 고도화: 기술·연구 콘텐츠 IA 재구조화로 정보 접근성 개선',
      '한국건설품질협의회 공식 사이트 구축(대우건설 진행): 제안 PT부터 참여해 수주',
    ],
  },
  {
    company: '캐파 (CAPA)',
    role: '개발 인턴',
    period: '2023.01 ~ 2023.02',
    intro: null,
    bullets: ['React·Spring Boot 웹 서비스 파일첨부(Dropzone) UI 구현 및 API 연동'],
  },
];

export const SIDE_PROJECTS = {
  title: '개인 프로젝트: AI 활용 서비스 기획·출시',
  period: '2026.01 ~ 진행 중',
  bullets: [
    '앱인토스 미니앱 4종 + Google Play 앱 1종 단독 기획·개발·출시 (퀴즈왕 · 산책지수 · 소비유형 테스트 · 오늘은 누가 쏠래? · PillStack)',
    "웹 3D 게임 'Leaf It Alone' 7일 단독 개발·배포 (React Three Fiber · ONNX AI, 라이브 서비스 중)",
  ],
};

const EDUCATION = [
  { name: '강남대학교', detail: '컴퓨터공학 전공 · 미디어공학 복수전공', period: '2014.03 ~ 2020.02 졸업' },
];

const CERTS = [
  { name: '정보처리기사', detail: '한국산업인력공단', period: '2021.06' },
  { name: '웹어워드 코리아(K-Award) 금상', detail: '한국인터넷전문가협회, 리뉴얼 프로젝트 기획 담당', period: '수상' },
];

const TRAININGS = [
  { name: '멀티캠퍼스 Java/Spring · DB · API 개발 교육', period: '2021 ~ 2022' },
  { name: '한국기술교육대학교 협동로봇 연수 · KSA IoT/데이터 교육', period: '2020 ~ 2021' },
];

export const SKILLS = {
  /* 2026-09-30: 경력 불릿에 근거 없는 KPI 관리·Agile, 도구 나열뿐인 ChatGPT·Midjourney·프롬프트 엔지니어링 제외 */
  '기획·운영': ['서비스 기획', '요구사항 정의', 'IA 설계', '화면정의서', 'WBS/일정 관리', 'QA'],
  /* 분석 도구는 실제 사용 깊이대로 — Firebase Analytics는 PillStack에서 직접 연동,
     GA는 웹마인드에서 트래킹 코드 설치 수준. */
  '데이터·도구': ['Firebase Analytics', 'GA 트래킹', 'SQL', 'Supabase', 'Figma', 'Notion', 'draw.io', 'Slack'],
  'AI·기술': ['React', 'Spring Boot', 'Unity(협업)', 'Claude', 'Cursor'],
};

const MILITARY = '육군 병장 만기전역 (2016.01 ~ 2017.10)';

/* ── 프리미티브 ── */

function SectionTitle({ children }) {
  return (
    <h2 className="text-[13px] font-bold tracking-[0.16em] uppercase mb-4 pb-2"
      style={{ color: ACCENT, borderBottom: `1.5px solid ${LINE}` }}>
      {children}
    </h2>
  );
}

function Bullet({ children }) {
  return (
    <li className="flex gap-2.5 text-[13px] leading-[1.8]" style={{ color: INK_70 }}>
      <span style={{ color: INK_38, flexShrink: 0 }}>·</span>
      <span>{children}</span>
    </li>
  );
}

/* ═══ 메인 ═══ */
export default function Resume({ onNavigate }) {
  return (
    <div className="min-h-screen print:bg-white" style={{ background: '#eef0ec' }}>
      {/* 인쇄 여백 설정 */}
      <style>{`@media print { @page { size: A4; margin: 14mm 12mm; } html, body { background: #fff !important; } .resume-sheet { border: 0 !important; box-shadow: none !important; border-radius: 0 !important; max-width: none !important; } }`}</style>

      {/* 상단 액션 바 — 인쇄 시 숨김 */}
      <div className="print:hidden sticky top-0 z-40 flex items-center justify-between px-5 py-3"
        style={{ background: 'rgba(238,240,236,0.9)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${LINE}` }}>
        <button onClick={() => onNavigate?.('about')}
          className="text-[13px] font-semibold cursor-pointer"
          style={{ color: INK_50 }}
          onMouseEnter={(e) => { e.currentTarget.style.color = INK; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = INK_50; }}>
          ← 포트폴리오로
        </button>
        <button onClick={() => window.print()}
          className="px-4 py-2 rounded-full text-[12.5px] font-bold cursor-pointer transition-transform"
          style={{ background: '#12211a', color: '#fff' }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}>
          PDF로 저장
        </button>
      </div>

      {/* A4 시트 */}
      <div className="resume-sheet mx-auto my-8 print:my-0 px-8 md:px-12 py-10 md:py-12 print:px-0 print:py-0 print:shadow-none print:border-0"
        style={{
          maxWidth: 860,
          background: '#fff',
          border: `1px solid ${LINE}`,
          borderRadius: 18,
          boxShadow: '0 16px 48px rgba(20,28,24,0.1)',
        }}>

        {/* ── 헤더 ── */}
        <header className="flex items-start justify-between gap-6 mb-8">
          <div className="min-w-0">
            <h1 className="text-[30px] md:text-[34px] font-extrabold leading-tight" style={{ color: INK, letterSpacing: '-0.02em' }}>
              유희수
            </h1>
            <p className="text-[14px] font-semibold mt-1" style={{ color: ACCENT }}>
              서비스 기획 · PM | 임상 XR 3년 운영 · 캠페인 플랫폼 1인 구축 · 앱 5종 출시
            </p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[12.5px]" style={{ color: INK_50 }}>
              <a href="mailto:iplay3473@gmail.com" style={{ color: 'inherit' }}>iplay3473@gmail.com</a>
              <a href="https://lyuheesu.com" style={{ color: 'inherit' }}>lyuheesu.com</a>
              <a href="https://github.com/lyudolf" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>github.com/lyudolf</a>
              <span>서울 동작구 · {MILITARY}</span>
            </div>
          </div>
          {SHOW_PHOTO && (
            <img src={PROFILE_IMG} alt="유희수 프로필"
              className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover flex-shrink-0"
              style={{ objectPosition: '50% 30%', border: `1px solid ${LINE}` }} />
          )}
        </header>

        {/* ── 요약 ── */}
        <section className="mb-8">
          <SectionTitle>Summary</SectionTitle>
          <p className="text-[13.5px] leading-[1.9]" style={{ color: INK_70 }}>{SUMMARY}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mt-5">
            {KEY_RESULTS.map((s) => (
              <div key={s.label} className="rounded-xl px-3 py-3 text-center"
                style={{ background: 'rgba(15,143,116,0.05)', border: `1px solid rgba(15,143,116,0.16)` }}>
                <p className="text-[19px] font-extrabold leading-none" style={{ color: ACCENT }}>{s.num}</p>
                <p className="text-[11px] font-semibold mt-1.5" style={{ color: INK_70 }}>{s.label}</p>
                <p className="text-[10px] mt-0.5" style={{ color: INK_38 }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 경력 ── */}
        <section className="mb-8">
          <SectionTitle>경력 (총 3년 7개월)</SectionTitle>
          <div className="flex flex-col gap-6">
            {CAREERS.map((c) => (
              <div key={c.company} style={{ breakInside: 'avoid' }}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 mb-0.5">
                  <h3 className="text-[15.5px] font-bold" style={{ color: INK }}>{c.company}</h3>
                  <span className="text-[12px] font-semibold" style={{ color: INK_38 }}>{c.period}</span>
                </div>
                <p className="text-[12.5px] font-semibold mb-2" style={{ color: INK_50 }}>{c.role}</p>
                {c.intro && (
                  <p className="text-[13px] leading-[1.8] mb-2" style={{ color: INK_70 }}>{c.intro}</p>
                )}
                <ul className="flex flex-col gap-1.5">
                  {c.bullets.map((b) => <Bullet key={b.slice(0, 20)}>{b}</Bullet>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── 개인 프로젝트 ── */}
        <section className="mb-8" style={{ breakInside: 'avoid' }}>
          <SectionTitle>개인 프로젝트</SectionTitle>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 mb-2">
            <h3 className="text-[15px] font-bold" style={{ color: INK }}>{SIDE_PROJECTS.title}</h3>
            <span className="text-[12px] font-semibold" style={{ color: INK_38 }}>{SIDE_PROJECTS.period}</span>
          </div>
          <ul className="flex flex-col gap-1.5">
            {SIDE_PROJECTS.bullets.map((b) => <Bullet key={b.slice(0, 20)}>{b}</Bullet>)}
          </ul>
        </section>

        {/* ── 학력 · 자격/수상 ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8" style={{ breakInside: 'avoid' }}>
          <section>
            <SectionTitle>학력</SectionTitle>
            {EDUCATION.map((e) => (
              <div key={e.name}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h3 className="text-[14px] font-bold" style={{ color: INK }}>{e.name}</h3>
                  <span className="text-[11.5px]" style={{ color: INK_38 }}>{e.period}</span>
                </div>
                <p className="text-[12.5px] mt-0.5" style={{ color: INK_70 }}>{e.detail}</p>
              </div>
            ))}
            <div className="mt-5">
              <SectionTitle>교육</SectionTitle>
              <ul className="flex flex-col gap-1.5">
                {TRAININGS.map((t) => (
                  <li key={t.name} className="text-[12.5px] leading-[1.7]" style={{ color: INK_70 }}>
                    {t.name} <span style={{ color: INK_38 }}>({t.period})</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section>
            <SectionTitle>자격 · 수상</SectionTitle>
            <ul className="flex flex-col gap-2.5">
              {CERTS.map((c) => (
                <li key={c.name}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <span className="text-[13px] font-bold" style={{ color: INK }}>{c.name}</span>
                    {c.period && <span className="text-[11.5px]" style={{ color: INK_38 }}>{c.period}</span>}
                  </div>
                  <p className="text-[12px] mt-0.5" style={{ color: INK_50 }}>{c.detail}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* ── 스킬 ── */}
        <section style={{ breakInside: 'avoid' }}>
          <SectionTitle>스킬</SectionTitle>
          <div className="flex flex-col gap-3">
            {Object.entries(SKILLS).map(([group, items]) => (
              <div key={group} className="flex flex-col md:flex-row md:items-baseline gap-1.5 md:gap-4">
                <span className="text-[11.5px] font-bold flex-shrink-0 md:w-[88px]" style={{ color: INK_50 }}>{group}</span>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((s) => (
                    <span key={s} className="text-[11.5px] font-medium px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(20,26,22,0.045)', border: `1px solid ${LINE}`, color: INK_70 }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <p className="print:hidden text-center text-[11.5px] pb-10" style={{ color: INK_38 }}>
        &ldquo;PDF로 저장&rdquo;을 누르면 브라우저 인쇄 대화상자에서 PDF로 내려받을 수 있습니다.
      </p>
    </div>
  );
}
