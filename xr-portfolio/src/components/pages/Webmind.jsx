import ProjectShowcase from '../ui/ProjectShowcase';
import ProjectQA from '../ui/ProjectQA';

/* 웹마인드 — B2B 웹/앱 서비스 구축 (2023.04 — 2024.07).
   본문 = 공통 Q&A 3문 + 노션 갤러리 카드(구축 건별 썸네일 게시물).
   출처: 사람인 이력서 기준 (memory career-history).
   ⚠️ 클라이언트 실명·사이트 URL은 본인 확인 후 교체 — 지금은 업종명으로 표기. */

const QA = [
  {
    q: '어떤 문제였나',
    a: [
      'B2B 웹 구축은 발주사의 추상적인 요구를 서비스 구조로 번역하는 일입니다. "사이트를 더 좋게"라는 문장에서 시작해, 예산과 일정이 고정된 채로 무엇을 만들지부터 정의해야 했습니다.',
      '제안 PT로 수주를 만들고, 구축이 끝나면 유지보수로 관계를 이어가는 — 기획이 곧 영업이고 운영인 환경이었습니다.',
    ],
  },
  {
    q: '무엇을 결정했나',
    a: [
      '기획 산출물의 전 과정을 직접 잡았습니다. 경쟁사 분석으로 방향을 세우고, IA와 요구사항 정의서로 범위를 고정하고, 화면정의서로 개발과 디자인이 바로 착수할 수 있게 넘겼습니다.',
      '개발이 가능한 선을 먼저 확인하고 UI/UX를 설계해, 일정과 품질 사이의 균형을 잡았습니다. 오픈 이후를 대비해 GA 트래킹 코드도 함께 심어뒀습니다.',
    ],
    blocks: [
      {
        type: 'posts',
        label: '구축 프로젝트',
        items: [
          {
            client: '물질성분 분석 기업',
            title: '공식 사이트 고도화',
            body: '방대한 기술·연구 콘텐츠가 기준 없이 쌓여 있어, 사용자가 찾는 정보에 닿지 못하는 상태였습니다. IA부터 다시 잡아 정보 접근성을 끌어올렸습니다.',
            tags: ['IA 개선', '정보 접근성'],
          },
          {
            client: '주차 솔루션 기업',
            title: '브랜드 사이트 리뉴얼',
            body: '경쟁사 분석과 화면정의서 기반으로 리뉴얼 전 과정을 기획했습니다. 웹어워드 코리아 금상을 수상했고 유지보수 계약이 연장됐습니다.',
            tags: ['리뉴얼', '웹어워드 금상', '유지보수 연장'],
          },
          {
            client: '건설사',
            title: '공식 사이트 구축',
            body: '제안 PT부터 참여해 수주를 만들고 구축까지 이어갔습니다. 참여한 신규 제안이 전부 수주로 이어졌습니다.',
            tags: ['제안 PT', '수주 100%'],
          },
        ],
      },
    ],
  },
  {
    q: '결과가 어땠나',
    a: [
      '참여한 신규 제안이 전부 수주로 이어졌고, 리뉴얼 프로젝트는 웹어워드 코리아 금상을 받았습니다. 구축으로 끝나지 않고 유지보수 계약 연장으로 관계가 이어졌습니다.',
    ],
    blocks: [
      {
        type: 'stats',
        items: [
          { num: '100%', label: '신규 제안 수주', sub: '제안 PT 참여 건 기준' },
          { num: '금상', label: '웹어워드 코리아', sub: '주차 솔루션 리뉴얼' },
          { num: '연장', label: '유지보수 계약', sub: '구축 → 운영 관계 지속' },
          { num: '1년 4개월', label: 'B2B 웹 기획', sub: '2023.04 — 2024.07' },
        ],
      },
    ],
  },
];

export default function Webmind({ onNavigate }) {
  return (
    <div
      className="relative w-full overflow-x-hidden"
      style={{ backgroundColor: '#ecf2ee', color: '#1a231e' }}
    >
      <div className="px-4 md:px-6 py-6">
        <div style={{ maxWidth: 1640, margin: '0 auto' }}>
          <ProjectShowcase activeId="webmind" onNavigate={onNavigate}>
            <ProjectQA items={QA} />
          </ProjectShowcase>
        </div>
      </div>
    </div>
  );
}
