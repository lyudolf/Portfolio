/* 사이트 전역 메타 정보.
   ⚠️ SITE_URL은 실제 배포 도메인으로 교체 필요 (sitemap.xml, robots.txt에도 동일 반영). */
export const SITE_URL = 'https://lyuheesu.com';

export const SITE_NAME = '유희수 포트폴리오';

/* 탭 key ↔ URL 경로 매핑 (App.jsx 라우팅 + SEO 메타 공용) */
export const TAB_PATHS = {
  about: '/',
  kisti: '/kisti',
  dream: '/dream',
  process: '/process',
  withai: '/with-ai',
  whyme: '/why-me',
  'etribe-detail': '/etribe',
  'leaf-detail': '/leaf',
  resume: '/resume',
};

export const PATH_TABS = Object.fromEntries(
  Object.entries(TAB_PATHS).map(([tab, path]) => [path, tab])
);

/* 페이지별 SEO 메타 (React 19가 <title>/<meta>를 <head>로 호이스팅) */
export const PAGE_META = {
  about: {
    title: "유희수 — 서비스 기획자 · PM 포트폴리오",
    description:
      "'Why'로 문제를 정의하고 실현 가능한 'How'를 설계하는 서비스 기획자. 팀 매출 3배 성장 견인, 임상 XR 시스템 3년 운영, 웹어워드 코리아 금상.",
  },
  kisti: {
    title: 'KISTI 임상 XR — 고령자 인지·운동 훈련 시스템 | 유희수',
    description:
      '고령자 XR 훈련 시스템 단독 기획·PM. 1차 임상 60명 무이슈 완료, 1년 용역이 3년차 운영으로 연장, 진입 6단계를 1~2 depth로 재설계.',
  },
  dream: {
    title: '꿈키올래 — Apple Vision Pro XR 직업체험 9종 | 유희수',
    description:
      'Vision Pro 기반 XR 직업체험 콘텐츠 9종을 2개월 실개발로 딜리버리. 초기 기획 전면 폐기 후 프레임워크화로 불가능한 일정을 구조로 해결.',
  },
  process: {
    title: '워크 프로세스 | 유희수',
    description: '문제 정의부터 QA·운영까지, 서비스 기획자 유희수의 일하는 방식.',
  },
  withai: {
    title: 'with AI — Human-in-the-Loop 방법론 | 유희수',
    description:
      'AI를 인지적 증폭기로 쓰는 기획자. 7일 만에 웹 3D 게임 단독 개발·배포, 토스 앱인토스 미니앱 3종 기획부터 출시까지 단독 수행.',
  },
  whyme: {
    title: 'Why Me — Technical PM | 유희수',
    description:
      '기획과 엔지니어링의 간극을 없애는 Technical PM. 개발 feasibility를 아는 기획, AI 활용 빠른 프로토타이핑.',
  },
  'etribe-detail': {
    title: 'ETRIBE 20주년 기념 영상 — AI 프로덕션 | 유희수',
    description: 'Midjourney·Runway 기반 AI 영상 제작. 사내 공모전 1위, 외주 대비 약 70% 리소스 절감.',
  },
  'leaf-detail': {
    title: 'Leaf It Alone — 7일 만에 만든 웹 3D 게임 | 유희수',
    description:
      'React Three Fiber로 7일 단독 개발·배포. 8,000개 객체 단일 드로우콜 최적화, ONNX 딥러닝 적 AI 직접 구현.',
  },
  resume: {
    title: '이력서 — 해상도를 높이는 기획자, 유희수',
    description:
      "모호한 문제(Why)를 선명한 실행(How)으로. 서비스 기획자 유희수의 이력서 — 팀 매출 3배 성장, 임상 XR 3년 운영, 웹어워드 금상.",
  },
};
