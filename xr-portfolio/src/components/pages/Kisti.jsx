import ProjectShowcase from '../ui/ProjectShowcase';
import ProjectQA from '../ui/ProjectQA';

/* 교수자 런처 화면별 개선 전/후.
   실제 인수 시점 화면과 재설계 후 화면 — 실명·영상은 마스킹 처리됨. */
const SCREENS = [
  {
    id: 'login', label: '로그인',
    old: '/images/kisti/login-old.png', new: '/images/kisti/login-new.png',
    saw: '입체 버튼과 그림자가 강한 게임풍 UI였고, 입력 필드가 버튼처럼 보여 무엇을 눌러야 할지 헷갈렸습니다.',
    did: '장식을 걷어내고 입력과 버튼의 위계를 분리했습니다. 이후 모든 화면이 이 톤을 따르는 기준점이 됐습니다.',
  },
  {
    id: 'start', label: '시작 화면',
    old: '/images/kisti/start-old.png', new: '/images/kisti/start-new.png',
    saw: '색만 다른 큰 타일 네 개가 나란히 있어, 지금 무엇을 할 차례인지 화면이 알려주지 않았습니다.',
    did: '훈련자·교수자 화면을 분리하고 상단에 기기 연결 상태를 상시 노출했습니다. 시작 전에 무엇이 준비됐는지부터 보이게 했습니다.',
  },
  {
    id: 'prepare', label: '수업 준비',
    old: '/images/kisti/prepare-old.png', new: '/images/kisti/prepare-new.png',
    saw: '훈련자 목록과 콘텐츠 설정이 다른 화면에 흩어져 있어, 수업 하나를 열려면 화면을 여러 번 오가야 했습니다.',
    did: '한 화면에서 대상 선택 → 난이도·모드 설정 → 팀 구성 → 시작까지 끝나게 합쳤습니다. 기기 배터리와 로그인 상태도 같은 자리에서 보입니다.',
  },
  {
    id: 'class', label: '수업 관리',
    old: '/images/kisti/class-old.png', new: '/images/kisti/class-new.png',
    saw: '뒤로가기 버튼으로만 이동할 수 있어, 다른 기능으로 가려면 상위 화면까지 되돌아가야 했습니다.',
    did: '좌측에 상시 내비게이션을 두어 뒤로가기를 없앴습니다. 진입 6단계였던 구조가 1~2 depth로 줄었습니다.',
  },
  {
    id: 'learner', label: '훈련자 관리',
    old: '/images/kisti/learner-old.png', new: '/images/kisti/learner-new.png',
    saw: '명단만 있고 검사 이력은 다른 화면에 있어, 한 사람의 상태를 파악하려면 화면을 오가며 기억해야 했습니다.',
    did: '명단·검사 설정·회차별 결과를 한 화면에 세로로 쌓았습니다. 교수자가 한 사람을 선택하면 그 사람에 대한 모든 것이 아래로 이어집니다.',
  },
  {
    id: 'cognitive', label: '인지검사 결과',
    old: '/images/kisti/cognitive-old.png', new: '/images/kisti/cognitive-new.png',
    saw: '결과가 현재·직전·평균 세 열로만 나와, 회차가 쌓여도 나아지고 있는지를 읽기 어려웠습니다.',
    did: '회차별 표와 추이 그래프를 함께 배치하고 CSV·PDF 내보내기를 붙였습니다. 임상 데이터가 실제로 분석에 쓰이는 형태로 나가게 했습니다.',
  },
  {
    id: 'monitor', label: '모니터링',
    old: '/images/kisti/monitor-old.png', new: '/images/kisti/monitor-new.png',
    saw: '웹캠 화면만 크게 떠 있고, 훈련자가 안전한 자세인지·영역을 벗어났는지는 화면에서 알 수 없었습니다.',
    did: '자세·영역 안전 지표를 영상 위쪽에 상시 표시하고, 음소거·원격 요청을 같은 화면에 뒀습니다. 문제가 생기면 교수자가 그 자리에서 개입합니다.',
    note: '고령자 대상이라 낙상·이탈은 즉시 알아야 했습니다. 모니터링은 "보는 화면"이 아니라 "개입하는 화면"이어야 한다고 봤습니다.',
  },
];

/* KISTI — 고령자 인지·운동 융합 훈련 VR.
   본문 = 공통 Q&A 3문(스캔용 답변) + 각 답변의 증거 블록.
   출처: 본인 작성 50문항 Q&A (memory refs/kisti-qa-50.md).
   ⚠️ 사업비 증액 일화·타 용역사 비교는 공개 사이트 비노출 방침(면접용). */

const QA = [
  {
    q: '어떤 문제였나',
    a: [
      '고령자의 인지와 운동 기능을 함께 훈련하고, 그 과정을 임상 연구 데이터로 수집하는 국가 과제였습니다. 저는 6년 사업의 3년차에 투입됐습니다.',
      '인수받은 기존 콘텐츠는 고령자가 쓰기 어려운 상태였습니다. 씬은 지평선까지 펼쳐져 산만했고, 메뉴는 6단계 깊이였고, 무엇이 확정된 기획인지조차 정리돼 있지 않았습니다.',
    ],
    blocks: [
      {
        type: 'cards',
        label: '인수 시점의 문제와 대응',
        items: [
          {
            num: '01', title: '과도한 시각적 정보량',
            body: '무한하게 펼쳐진 공간형 씬은 시각적 부하가 과했고, 고령자가 훈련 목표에 집중하기 어려웠습니다.',
            foot: '시점 고정 + 핵심 오브젝트 중심으로 씬 재설계',
          },
          {
            num: '02', title: '높은 멀미·적응 부담',
            body: 'VR에 익숙하지 않은 고령자에게 공간 적응과 멀미 부담이 컸습니다.',
            foot: '카메라 이동 완전 제거 · 콜라이더 확대로 오차 흡수',
          },
          {
            num: '03', title: '깊은 depth의 운영 구조',
            body: '진입 depth가 6단계에 달해 교수자와 훈련자 모두 혼란을 겪었습니다.',
            foot: '대상자 선택 → 결과 확인까지 1~2 depth 단일 흐름으로 단축',
          },
          {
            num: '04', title: '불안정한 레거시 구조',
            body: '기존 업체의 코드를 인수받아 시작해, 구조와 일정 모두 불안정했습니다.',
            foot: '재구조화로 반복 세션 안정화 — 임상 운영의 전제 확보',
          },
        ],
      },
      {
        type: 'explorer',
        label: '화면별 개선 — 인수 시점 vs 재설계 후',
        accent: '#1540c9',
        items: SCREENS,
      },
    ],
  },
  {
    q: '무엇을 결정했나',
    a: [
      '가장 오래 고민한 결정은 "고령자에게 조작을 요구하지 않는 것"이었습니다. 계정 연결과 세션 생성, 진행 제어를 전부 교수자 PC로 옮기고, 훈련자는 쓰고 움직이기만 하면 되게 했습니다.',
      '낙상 위험이 있던 "눈 감고 서 있기" 검사는 씬을 어둡게 바꾸는 방식으로 대체했습니다 — 안전 문제를 절차가 아니라 연출로 푼 결정이었습니다. 대신 훈련의 자율성은 포기했습니다. 스스로 탐색하는 재미보다, 실패 없이 끝까지 도달하는 경험이 이 사용자에게는 우선이라고 판단했습니다.',
    ],
    blocks: [
      {
        type: 'cards',
        label: '결정의 상세 — 시스템은 이렇게 굴러갑니다',
        items: [
          {
            title: 'HMD는 스스로 로그인하지 않습니다',
            body: '고령 훈련자가 헤드셋 안에서 계정을 입력하는 건 비현실적입니다. 헤드셋은 켜지면 기기 등록만 하고, 교수자가 PC에서 기기와 계정을 연결하는 순간 자동 로그인됩니다.',
          },
          {
            title: '진행 권한은 항상 교수자 PC에 있습니다',
            body: '게임 생성·미션·시간·기록 저장은 교수자 런처가 맡고, HMD는 판정과 점수 보고만 합니다. 문제가 생겨도 교수자가 그 자리에서 수습할 수 있게 권한을 한곳에 모았습니다.',
          },
          {
            title: 'VR은 무대, 측정은 검증된 장비가 합니다',
            body: '검사 4종 중 VR이 직접 재는 건 인지검사뿐입니다. 균형은 압력 센서, 심혈관은 스마트워치, 운동성은 웹캠이 측정합니다. 임상 데이터의 정확도가 필요한 곳엔 검증된 장비를 썼습니다.',
          },
          {
            title: '시야 보정을 직접 만들었습니다',
            body: '기본 제공되는 화면 재정렬 조작은 고령자가 쓰기 어려웠습니다. "다음" 버튼을 누르는 순간의 머리 방향으로 화면 중앙을 다시 맞추는, 배울 필요 없는 보정을 설계했습니다.',
          },
        ],
      },
    ],
  },
  {
    q: '결과가 어땠나',
    a: [
      '1차 임상 60명이 이슈 없이 완료됐고, 원래 1년짜리였던 용역이 3년차 운영으로 이어져 5·6년차 연장이 논의되고 있습니다. 클라이언트 측에서는 기술이전을 준비 중입니다.',
    ],
    blocks: [
      {
        type: 'stats',
        items: [
          { num: '60명', label: '1차 임상 무이슈 완료', sub: '목표 120명, 2차 진행 중' },
          { num: '3년차', label: '1년 용역 → 계속 연장', sub: '5·6년차 연장 논의 중' },
          { num: '3배+', label: '팀 매출 성장 견인', sub: '3.8억 → 11.5억 (전년 대비)' },
          { num: '1~2', label: '운영 depth 단축', sub: '진입 6단계에서 재설계' },
        ],
      },
    ],
  },
];

export default function Kisti({ onNavigate }) {
  return (
    <div
      className="relative w-full overflow-x-hidden"
      style={{ backgroundColor: '#eef2ec', color: '#1a231e' }}
    >
      <div className="px-4 md:px-6 py-6">
        <div style={{ maxWidth: 1640, margin: '0 auto' }}>
          <ProjectShowcase activeId="kisti" onNavigate={onNavigate}>
            <ProjectQA items={QA} />
          </ProjectShowcase>
        </div>
      </div>
    </div>
  );
}
