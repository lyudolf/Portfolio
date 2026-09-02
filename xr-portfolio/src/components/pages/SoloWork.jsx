import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import FrameCard from '../ui/FrameCard';
import { useMedia } from '../../lib/useMedia';

/* ══════════════════════════════════════════
   Solo Work — 혼자 기획하고 혼자 출시한 것들

   Work(기관 용역)와 AI-lab(AI 활용 방법론) 사이에 비어 있던 축.
   "XR 용역 말고 일반 B2C 서비스도 하는가"에 대한 답이 여기다.
   앱인토스 미니앱은 원래 AI-lab의 shipped/ 안에 있었는데,
   AI 활용 사례가 아니라 제품 출시 이력으로 읽혀야 해서 이쪽으로 옮겼다.
   ══════════════════════════════════════════ */

const ACCENT = '#8b6cf0';        // Solo Work 시그니처 — Work 3색·랜딩 민트와 겹치지 않는 보라
const PANEL_BG = '#2a1d5c';
const PANEL_SOFT = '#443088';

const INK = 'rgba(24,32,27,0.88)';
const INK_60 = 'rgba(24,32,27,0.6)';
const INK_45 = 'rgba(24,32,27,0.45)';
const BORDER = 'rgba(24,32,27,0.08)';
const CARD = 'rgba(255,255,255,0.6)';

export const APPS = [
  /* PillStack — 앱인토스 네 종보다 먼저 만든 실용 도구. 시간순 첫 번째.
     콘텐츠 앱이 아니라 공공 의료 데이터를 다뤘고, 스토어에 직접 낸 유일한 앱.
     서술 근거: 코드 분석 문서(Others/pillstack-portfolio.md).
     ⚠️ 검색은 Elasticsearch가 아니라 PostgreSQL 다중 쿼리 + 앱 레벨 스코어링. */
  {
    id: 'pillstack',
    name: 'PillStack',
    appName: 'kr.pillstack',
    category: '건강 · Google Play',
    released: '프로덕션 출시',
    color: '#7a6ce0',
    summary: '지금 먹는 영양제 조합이 괜찮은지 답하는 앱. 식약처 공공데이터 3종·44,622건 위에서 성분 중복과 충돌을 분석합니다.',
    why: {
      pain: '영양제는 "많이 먹을수록 좋다"는 인식 때문에 여러 제품을 한꺼번에 먹게 됩니다. 그런데 멀티비타민에 비타민D를 더하면 상한치를 넘고, 칼슘과 철분은 같이 먹으면 서로 흡수를 방해하고, 유산균은 공복·지용성 비타민은 식후로 타이밍마저 제품마다 다릅니다. 정작 이걸 확인할 방법이 없습니다.',
      gap: '기존 영양제 앱은 대부분 기록과 알림에 머물러 있었습니다. "무엇을 먹었는지"는 알려주지만 "지금 이 조합이 괜찮은지"는 답하지 않습니다. 사용자가 실제로 궁금한 건 후자인데, 그 답은 성분 데이터를 직접 대조해야만 나옵니다.',
      question: '내가 지금 먹는 영양제 조합, 괜찮은 건가?',
    },
    decisions: [
      {
        t: '기록하는 앱이 아니라 판단해주는 앱으로',
        d: '그래서 제품의 1순위 기능을 복용 이력이 아니라 조합 검증으로 뒀습니다. 등록된 영양제의 성분을 합산해 상한치 초과·흡수 방해·복용 타이밍 충돌을 즉시 지목하고, 기록과 알림은 그 판단을 유지하기 위한 보조 기능으로 내렸습니다. 같은 데이터를 갖고도 무엇을 화면 첫 줄에 놓느냐가 앱의 성격을 갈랐습니다.',
      },
      {
        t: 'AI에게 역할보다 제약을 알려주는 게 중요했다',
        d: '"10년차 약사처럼 답하라"고 페르소나를 줘도 AI는 "격일로 드세요", "주 3회만" 같은 조언을 했습니다. 그런데 이 앱은 매일 고정 시간 알림만 지원합니다 — 실행할 수 없는 조언은 사용자를 혼란스럽게 할 뿐입니다. 프롬프트에 앱이 무엇을 못 하는지를 직접 써넣고 나서야 답변이 실제로 실행 가능한 행동으로 좁혀졌습니다.',
      },
      {
        t: '수백 건의 경고를 의미 있는 몇 건으로',
        d: '식약처 DUR은 의약품 간 병용금기 데이터라, 성분명으로 조회하면 전문의약품과의 금기가 수백 건 쏟아졌습니다. 영양제만 먹는 사용자에게는 전부 노이즈였습니다. 사용자가 등록한 성분 집합과의 교집합만 남기고 중복 쌍을 제거해, 실제로 볼 필요가 있는 몇 건으로 압축했습니다.',
      },
      {
        t: '검색이 안 될 때 인프라가 아니라 데이터를 봤다',
        d: '"종근당"으로 검색하면 DB에 "종근당건강(주)"로 등록돼 있어 안 걸리고, 띄어쓰기가 제각각이라 결과가 형편없었습니다. 한국어 형태소 분석기를 붙인 검색엔진이 교과서적 해답이었지만, 4만 건에 역색인은 과투자였고 서버리스 구조에 상시 클러스터를 붙이는 것도 맞지 않았습니다. 문제는 검색 인프라가 부족한 게 아니라 제품명 데이터가 지저분한 것이었습니다. 인프라를 늘리는 대신 단어 분해 매칭·붙여쓰기 폴백·브랜드 가중치 스코어링을 직접 설계해, 기존 스택 안에서 품질을 올렸습니다.',
      },
      {
        t: '광고는 사용 주기가 비는 곳에',
        d: '영양제는 보통 30~90일 단위로 먹고, 구성이 바뀌기 전엔 재분석할 일이 없습니다. 그래서 매일 쓰는 기능(복용 체크·알림)은 광고 없이 열어두고, 드물게 발생하는 고비용 작업인 AI 분석에만 리워드 광고를 붙였습니다. 신규 앱은 광고 재고가 없는 경우가 많아, 로드에 실패하면 분석을 그냥 통과시키는 안전장치도 함께 뒀습니다.',
      },
    ],
  },
  {
    id: 'quizking',
    name: '성격유형 퀴즈왕',
    appName: 'personality-quiz-king',
    category: '교육 · 비게임',
    released: '2026.06 출시',
    color: '#f0b03c',
    summary: '성격유형별로 갈리는 상식 퀴즈. 12개 카테고리 × 3난이도 × 3,600문제.',
    why: {
      pain: '성격유형 콘텐츠는 이미 넘칩니다. 그런데 대부분 "당신은 OO형입니다"에서 끝납니다. 결과를 캡처해서 공유하고 나면 그 앱을 다시 열 이유가 없습니다. 유저를 데려오는 비용은 똑같이 드는데, 한 번 쓰고 버려지는 구조입니다.',
      gap: '유형이라는 소재를 한 번 쓰고 버리지 않으려면 결과가 끝이 아니라 소속이 되어야 했습니다. 그래서 유형을 진단하는 앱이 아니라 유형끼리 겨루는 앱으로 방향을 잡았습니다. 내가 푼 점수가 내 유형의 순위에 반영되고, 유형별 랭킹과 전체 랭킹을 함께 보여줍니다. 문제를 푸는 이유가 "내 유형이 몇 등인가"가 되면, 콘텐츠만 채워도 반복이 만들어집니다.',
      question: '내 유형은 몇 등일까?',
    },
    decisions: [
      {
        t: '게임으로 만들지 않기로 한 결정',
        d: '게임으로 등록하면 GRAC 등급분류에 10~15일이 걸립니다. 퀴즈라는 형식은 유지하되 게임 요소를 걷어내고 교육 카테고리 비게임으로 설계해, 심사 리드타임을 없앴습니다.',
      },
      {
        t: '"시험형"에서 "놀이형"으로 전면 재설계',
        d: '초기 8개 카테고리(과학·역사·경제…)가 너무 어려워 이탈이 났습니다. 2,400문제를 전량 폐기하고 영화·K팝·밈·동물처럼 아는 이야기로 12개 카테고리를 다시 짰습니다. 어려운 문제는 암기형 대신 반전·함정형으로 바꿔 오답노트가 재방문 이유가 되게 했습니다.',
      },
      {
        t: '문제는 콘텐츠가 아니라 시작까지의 거리였다',
        d: '출시 후 유저가 퀴즈를 푸는 단계까지 아예 오지 않았습니다. 간단 퀴즈 앱으로 유저를 많이 모은 운영자의 인터뷰를 보고, 이탈 원인이 콘텐츠 품질이 아니라 "시작 버튼까지 가는 거리"일 거라고 가정했습니다. 퀴즈 시작을 첫 화면에 바로 노출하고, 앱을 켜면 쉬운 문제 3개가 곧장 나오도록 바꿨습니다. 이후 실제로 퀴즈를 푸는 비율과 재방문이 근소하게 올랐습니다. 표본이 작아 지표로 단정할 수는 없지만, 가설을 세우고 바꾸고 확인하는 순서를 처음 제대로 돌려본 경험이었습니다.',
      },
      {
        t: '보상은 주되, 광고는 강제하지 않기',
        d: '리워드 광고를 항상 "선택"으로 유지했습니다. 시청을 강제하면 단기 노출은 오르지만 정책 위반 소지가 있고 리텐션이 먼저 깨집니다.',
      },
    ],
  },
  {
    id: 'walk',
    name: '반려동물 산책지수',
    appName: 'axiom-walk',
    category: '생활 · 비게임',
    released: '2026 출시',
    color: '#5cb2ed',
    summary: '오늘 산책 나가도 되는지를 지수 하나로. 전국 3,564개 읍면동 지원.',
    why: {
      pain: '산책 전에 확인해야 할 게 앱 두 개에 흩어져 있습니다. 날씨 앱에서 기온과 비 소식을 보고, 미세먼지 앱에서 대기질을 따로 확인해야 합니다. 그렇게 두 앱을 오가도 나온 건 "체감 31도, PM2.5 55"라는 숫자뿐이라, 나가도 되는지는 결국 본인이 판단해야 합니다.',
      gap: '게다가 그 숫자는 전부 사람 기준입니다. 한낮 33도가 지면에 발을 딛는 반려견에게 무슨 의미인지는 어디에도 없습니다. 필요한 건 데이터가 아니라 판정이었습니다. 그리고 안 되는 날이라면 언제가 괜찮은지까지 — 그래서 5단계 등급과 아침·낮·저녁 시간대 추천을 한 카드에 담았습니다.',
      question: '오늘 우리 동네, 반려견 산책해도 될까요?',
    },
    decisions: [
      {
        t: '외부 API 두 개를 하나의 지수로',
        d: '기상청과 에어코리아는 좌표계도 갱신 주기도 다릅니다. 기상 격자와 측정소를 최근접 매핑해 읍면동 단위로 붙이고, 두 값을 하나의 산책지수로 합쳐 사용자가 판단할 필요가 없게 만들었습니다.',
      },
      {
        t: '프록시와 캐시를 기획에 포함',
        d: '공공 API는 계정당 쿼터가 있습니다. 클라이언트에서 직접 부르지 않고 Edge Function 프록시 + 캐시 테이블을 거치게 해, 사용자가 늘어도 쿼터가 먼저 터지지 않도록 설계했습니다.',
      },
    ],
  },
  {
    id: 'spending',
    name: '소비유형 테스트',
    appName: 'axiom-spending-type-test',
    category: '콘텐츠 · 비게임',
    released: '2026 출시',
    color: '#4ec2a8',
    summary: '2지선다 밸런스 게임으로 소비 성향을 진단. 3축 → 8유형.',
    why: {
      pain: '소비 성향을 알려주는 서비스는 대개 가계부입니다. 몇 달치 지출을 쌓아야 결과가 나오는데, 그 몇 달을 버티는 사람이 거의 없습니다. 반대로 밸런스 게임은 진입은 쉽지만 "짜장면파"에서 끝나 남는 게 없습니다.',
      gap: '쉬운 쪽은 알려주는 게 없고, 알려주는 쪽은 시작이 어렵습니다. 그 사이를 노렸습니다. 형식은 2지선다 그대로 두고 문항만 소비 상황으로 짜서, 기록 없이 고른 선택만으로 8유형까지 가게 했습니다. 결과 이름을 "분노의 결제왕", "무덤까지 가져갈 인간 금고"처럼 지은 것도 같은 이유입니다 — 공유하고 싶어지는 문장이 곧 유입 경로였습니다.',
      question: '가계부를 쓰지 않고도 내 소비 성향을 알 수 있을까?',
    },
    decisions: [
      {
        t: '광고 게이트를 "재시도"가 아니라 "결과 공개 직전"에',
        d: '유형 테스트는 재시도율이 낮습니다. 재시도에 광고를 걸면 대부분 한 번도 보지 않습니다. 완주자 전원이 반드시 지나는 결과 공개 직전으로 옮겨 노출을 확보하고, 세트 선택·한 번 더·공유는 전부 무료로 열어뒀습니다.',
      },
      {
        t: '실패해도 막지 않는 안전장치',
        d: '광고 미지원 환경이거나 로드가 실패하면 결과를 그냥 공개합니다. 수익 한 번보다 "결과를 못 봤다"는 경험이 더 비쌉니다.',
      },
      {
        t: '테스트를 모듈로',
        d: '테스트별로 독립된 결과 유니버스를 갖도록 구조를 잡았습니다. 새 테스트 추가 = 모듈 하나 + 이미지 폴더. 문항만 갈아끼우면 되도록 처음부터 재사용 틀로 만들었습니다.',
      },
    ],
  },
  {
    id: 'coffee',
    name: '오늘은 누가 쏠래?',
    appName: 'coffee-slot',
    category: '편의 · 비게임',
    released: '2026 출시',
    color: '#e8763c',
    summary: '커피 내기 슬롯머신. 이름 2~10명을 넣고 돌리면 한 명을 지목.',
    why: {
      pain: '커피 내기를 정할 때 쓰는 도구는 대개 사다리타기입니다. 결과는 정확하지만 뽑는 순간이 밋밋하고, 무엇보다 결과 화면 위로 배너가 덮이거나 전면광고가 끼어드는 앱이 많습니다. 내기는 모두가 결과에 승복해야 끝나는데, 광고가 결과에 붙는 순간 "이거 조작 아니야?"가 나옵니다.',
      gap: '그래서 이 도구는 두 가지를 동시에 만족해야 했습니다. 확률이 정말 균등하다는 걸 설명할 수 있을 것, 그리고 결과가 나오기까지가 재미있을 것. 보통 둘 중 하나를 포기합니다 — 재미를 위해 확률을 비틀거나, 신뢰를 위해 연출을 없애거나. 이 둘은 서로 다른 층위라 같이 가질 수 있다고 봤습니다.',
      question: '결과는 완전히 공정하면서, 뽑는 순간은 재미있게 만들 수 없을까?',
    },
    decisions: [
      {
        t: '확률이 아니라 연출을 손대기',
        d: '재미를 위해 확률을 비틀면 내기 도구로서 신뢰를 잃습니다. 당첨 확률은 정확히 균등 1/N로 고정하고, 긴장감은 붉은 스포트라이트가 후보 사이를 오가는 연출로 만들었습니다.',
      },
      {
        t: '광고를 결과 근처에서 치우기',
        d: '수익보다 승복이 먼저였습니다. 배너는 이름을 입력하는 화면 하단에만 두고, 추첨이 돌아가는 동안과 결과 화면 위에는 어떤 광고도 올리지 않았습니다. 전면광고와 보상형은 아예 넣지 않았습니다. 결과 옆에 광고가 있으면 뽑기 자체를 의심하게 되고, 한 번 의심받은 내기 도구는 다시 열리지 않습니다.',
      },
      {
        t: '심사 반려를 원인까지 파고들기',
        d: '아이콘 불일치로 반복 반려됐습니다. 픽셀을 맞춰도 계속 튕겼는데, 공식 문서를 확인해 `brand.icon`이 이미지가 아니라 콘솔에 올린 로고의 URL이어야 한다는 걸 찾아 해결했습니다. 같은 그림이 아니라 같은 파일이어야 했습니다.',
      },
    ],
  },
];

/* ── Leaf It Alone — 앱 5종과 별도 축의 웹 게임 ──
   앱 5종이 "출시 프로세스"의 증명이라면 이건 "기술 제약을 직접 밟아본" 증명.
   그래서 APPS에 섞지 않고(휠·회고의 "다섯" 서사 유지) 별도 섹션으로 둔다.
   서술 근거: LeafDetail.jsx TROUBLESHOOTING_ITEMS (상세 페이지 /leaf와 단일 원본). */
const LEAF = {
  id: 'leaf',
  name: 'Leaf It Alone',
  appName: 'leaf-it-alone-web.vercel.app',
  category: '웹 3D 게임 · 라이브',
  released: '7일 단독 개발',
  color: '#7a8f24',
  summary: '가을 마당의 낙엽을 치우는 웹 3D 게임. 브라우저 안에서 낙엽 8,000장이 실제 물리로 구르고, 딥러닝 AI 두더지가 플레이어의 경로를 예측해 방해합니다.',
  why: {
    pain: '기획자가 "이건 개발 가능합니다"라고 말할 때, 그 근거는 대개 남의 경험입니다. 렌더링이 버티는 선, AI를 클라이언트에 올리는 비용 같은 것을 직접 밟아본 적이 없다면, 제약을 말하는 일도 결국 어림짐작이 됩니다.',
    gap: '그래서 기획서 없이, 팀 없이, 7일을 정해놓고 혼자 끝까지 만들어 배포했습니다. 위의 앱 다섯 개가 출시 프로세스의 기록이라면, 이건 실무에서 개발자에게 묻기만 하던 기술 제약을 손으로 확인한 기록입니다.',
    question: '내가 말해온 "개발 가능한 선"을, 직접 밟아서 확인할 수 있을까?',
  },
  decisions: [
    {
      t: '8,000장을 브라우저에서 굴리기',
      d: '낙엽 8,000개가 매 프레임 물리 연산을 하면 메인 스레드가 버티지 못합니다. 개별 오브젝트를 하나의 메시로 통합해 드로우콜을 8,000회에서 1회로 줄이고, 멈춘 낙엽은 연산을 재우는 수면 시스템으로 평균 70%의 물리 계산을 걷어냈습니다.',
    },
    {
      t: '패턴이 읽히면 긴장이 죽는다',
      d: '타이머 기반 장애물은 몇 판이면 패턴이 읽힙니다. 플레이어의 시선 방향과 낙엽 밀도를 입력받는 324차원 딥러닝 모델(ONNX)을 브라우저에 직접 탑재해 이동 경로를 예측하고 선제 타겟팅하게 했고, 도우미 NPC는 유한 상태 머신으로 수집·운반을 분업시켰습니다.',
    },
    {
      t: '도구 추가가 코드 수정이 되지 않게',
      d: '갈퀴·송풍기처럼 장비마다 물리 방식이 다릅니다. 충돌 범위와 힘의 방향을 컴포넌트로 모듈화해, 새 장비는 기존 코드 수정 없이 데이터 주입만으로 동작하도록 설계했습니다.',
    },
    {
      t: '반복 노동을 경제로 바꾸기',
      d: '낙엽 치우기는 본질적으로 반복 노동입니다. 수집 → 봉투 생성 → 판매 → 업그레이드로 이어지는 보상 파이프라인을 깔고, 5개 스테이지에 걸쳐 도구와 환경 변수를 점진 해금해 학습 곡선을 조절했습니다.',
    },
  ],
};

/* ── 회고 ── */
export const LEARNED = [
  {
    t: '만드는 계획은 있었고, 알리는 계획은 없었습니다',
    d: '다섯 개 다 "출시"를 목표로 잡았습니다. 심사 통과가 결승선이었고, 그 뒤는 비어 있었습니다. 획득 채널·초기 시드 유저·공유 동기를 기획서에 한 줄도 적지 않았고, 그래서 다섯 개가 똑같은 지점에서 멈췄습니다.',
  },
  {
    t: '리텐션을 검증할 만큼의 유입이 없었습니다',
    d: '오답노트, 업적 40종, 결과 공유 — 재방문 장치는 다 넣었습니다. 그런데 그게 작동하는지 판단할 표본 자체가 없었습니다. 리텐션 설계는 유입이 있고 난 다음의 문제라는 걸, 순서를 틀리고 나서 알았습니다.',
  },
  {
    t: '다음에는 채널부터 정하고 시작합니다',
    d: '무엇을 만들지보다 "누가 어디서 이걸 처음 보게 되는가"를 먼저 정하려 합니다. 그게 정해지지 않으면 기능이 아무리 초밀해도 도달하지 않는다는 걸 다섯 번 확인했습니다.',
  },
];

function SectionLabel({ children }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="text-[11px] font-bold tracking-[0.3em] uppercase mb-6"
      style={{ color: '#6d4fd6' }}
    >
      {children}
    </motion.p>
  );
}

function AppCard({ app, index }) {
  return (
    <motion.article
      id={`app-${app.id}`}
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="overflow-hidden"
      style={{ borderRadius: 24, background: '#fff', border: `1px solid ${BORDER}`, boxShadow: '0 8px 24px rgba(24,32,27,0.05)', scrollMarginTop: 24 }}
    >
      {/* 헤더 — 앱 색으로 구분 */}
      <div className="px-6 md:px-8 py-6 flex flex-wrap items-center justify-between gap-3"
        style={{ borderBottom: `1px solid ${BORDER}`, background: `${app.color}12` }}>
        <div className="flex items-center gap-3">
          <span style={{ width: 10, height: 10, borderRadius: 99, background: app.color, flexShrink: 0 }} />
          <div>
            <h3 className="text-[19px] md:text-[22px] font-extrabold leading-tight"
              style={{ color: INK, letterSpacing: '-0.025em' }}>
              {app.name}
            </h3>
            <p className="text-[11.5px] mt-1" style={{ color: INK_45, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
              {app.appName}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold px-3 py-1.5 rounded-full"
            style={{ background: '#fff', border: `1px solid ${BORDER}`, color: INK_60 }}>
            {app.category}
          </span>
          <span className="text-[11px] font-bold px-3 py-1.5 rounded-full"
            style={{ background: app.color, color: '#fff' }}>
            {app.released}
          </span>
        </div>
      </div>

      <div className="px-6 md:px-8 py-6">
        <p className="text-[14px] leading-[1.8] mb-6" style={{ color: INK_60 }}>{app.summary}</p>

        {/* 왜 만들었나 — 페인포인트. 기획 판단 앞에 두어 "무엇을 봤는지"를 먼저 보여줌 */}
        {app.why && (
          <div className="mb-7 px-5 md:px-6 py-5"
            style={{ borderRadius: 16, background: `${app.color}0d`, border: `1px solid ${app.color}26` }}>
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase mb-3.5" style={{ color: app.color }}>
              왜 만들었나
            </p>
            <p className="text-[13px] leading-[1.9] mb-3" style={{ color: INK_60 }}>{app.why.pain}</p>
            <p className="text-[13px] leading-[1.9]" style={{ color: INK_60 }}>{app.why.gap}</p>
            {app.why.question && (
              <p className="text-[14px] md:text-[15px] font-bold leading-[1.7] mt-4 pt-4"
                style={{ color: INK, borderTop: `1px solid ${app.color}26`, letterSpacing: '-0.02em' }}>
                “{app.why.question}”
              </p>
            )}
          </div>
        )}

        <p className="text-[10px] font-bold tracking-[0.25em] uppercase mb-4" style={{ color: INK_45 }}>
          기획 판단
        </p>
        <div className="flex flex-col gap-5">
          {app.decisions.map((d, i) => (
            <div key={d.t} className="flex gap-4">
              <span className="text-[11px] font-bold pt-0.5 flex-shrink-0"
                style={{ color: app.color, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="text-[14px] font-bold mb-1.5" style={{ color: INK }}>{d.t}</p>
                <p className="text-[13px] leading-[1.9]" style={{ color: INK_60 }}>{d.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function AppsSection() {
  return (
    <section className="px-6 md:px-8 pb-4" style={{ maxWidth: 1100, margin: '0 auto' }}>
      <SectionLabel>Shipped</SectionLabel>
      <div className="flex flex-col gap-5">
        {APPS.map((a, i) => <AppCard key={a.id} app={a} index={i} />)}
      </div>
    </section>
  );
}

function RetroSection() {
  return (
    <section className="px-6 md:px-8 py-16" style={{ maxWidth: 1100, margin: '0 auto' }}>
      <SectionLabel>What Didn&apos;t Work</SectionLabel>

      <h2 className="text-[26px] md:text-[36px] font-extrabold leading-[1.24] mb-5"
        style={{ color: INK, letterSpacing: '-0.03em' }}>
        다섯 개 다 출시했지만,<br />유저는 만들지 못했습니다
      </h2>
      <p className="text-[14px] md:text-[15px] leading-[1.9] mb-10" style={{ color: INK_60, maxWidth: 620 }}>
        퀴즈왕이 2026년 7월에 70여 명 방문한 뒤로 유입이 멈췄고, 나머지도 마찬가지입니다.
        들어온 사람이 화면 안에서 어떻게 움직이는지는 관찰하고 고칠 수 있었지만,
        애초에 들어오는 사람 자체를 만들지 못했습니다. 숨길 이유가 없어서 그대로 적습니다.
        이 페이지에서 제가 보여드릴 수 있는 건 성과가 아니라, 실패의 원인을 어디까지 짚었는가입니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {LEARNED.map((l, i) => (
          <motion.div
            key={l.t}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="p-6 rounded-2xl"
            style={{ background: CARD, border: `1px solid ${BORDER}` }}
          >
            <p className="text-[11px] font-bold mb-3"
              style={{ color: '#6d4fd6', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
              {String(i + 1).padStart(2, '0')}
            </p>
            <p className="text-[15px] font-bold leading-snug mb-3" style={{ color: INK }}>{l.t}</p>
            <p className="text-[13px] leading-[1.9]" style={{ color: INK_60 }}>{l.d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* 앱 회고 다음, CTA 앞. "다섯 개" 서사가 닫힌 뒤에 다른 축의 증명으로 등장한다. */
function LeafSection({ onNavigate }) {
  return (
    <section className="px-6 md:px-8 pb-16" style={{ maxWidth: 1100, margin: '0 auto' }}>
      <SectionLabel>Hand-Built</SectionLabel>
      <h2 className="text-[26px] md:text-[36px] font-extrabold leading-[1.24] mb-5"
        style={{ color: INK, letterSpacing: '-0.03em' }}>
        그리고, 손으로 끝까지<br />만들어본 게임 하나
      </h2>
      <p className="text-[14px] md:text-[15px] leading-[1.9] mb-8" style={{ color: INK_60, maxWidth: 620 }}>
        위의 다섯 개가 출시 프로세스의 기록이라면, 이건 기술 제약을 직접 밟아본 기록입니다.
        기획 단계에서 늘 개발자에게 물어야 했던 것들 — 어디까지 그려지는지, AI가 어디서 도는지 —
        을 7일 동안 혼자 부딪혀 확인했습니다.
      </p>
      <AppCard app={LEAF} index={0} />
      <div className="flex flex-wrap gap-2.5 mt-5">
        <a href="https://leaf-it-alone-web.vercel.app/" target="_blank" rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-full text-[12.5px] font-bold transition-transform inline-block"
          style={{ background: LEAF.color, color: '#fff' }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}>
          지금 플레이하기 ↗
        </a>
        <button onClick={() => onNavigate?.('leaf-detail')}
          className="px-5 py-2.5 rounded-full text-[12.5px] font-semibold cursor-pointer transition-all"
          style={{ background: CARD, border: `1px solid ${BORDER}`, color: INK }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#fff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = CARD; }}>
          렌더링·AI 설계 상세 보기
        </button>
      </div>
    </section>
  );
}

function CtaSection({ onNavigate }) {
  return (
    <section className="px-6 md:px-8 pb-20" style={{ maxWidth: 1100, margin: '0 auto' }}>
      <div className="flex flex-wrap items-center gap-2.5">
        <button onClick={() => onNavigate?.('withai')}
          className="px-6 py-3 rounded-full text-[13px] font-bold cursor-pointer transition-transform"
          style={{ background: '#12211a', color: '#fff' }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}>
          어떻게 만들었는지 보기 (AI-lab)
        </button>
        <button onClick={() => onNavigate?.('kisti')}
          className="px-6 py-3 rounded-full text-[13px] font-semibold cursor-pointer transition-all"
          style={{ background: CARD, border: `1px solid ${BORDER}`, color: INK }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#fff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = CARD; }}>
          실무 프로젝트 보기
        </button>
      </div>
    </section>
  );
}

/* ── 앱 인덱스 옵션 휠 ──
   우측 가장자리를 축으로 감긴 세로 휠. 가운데 항목이 선명하고,
   멀어질수록 기울고 흐려진다. 스크롤 휠·드래그·클릭으로 회전,
   활성 항목을 한 번 더 클릭하면 아래 해당 앱 카드로 스크롤. */
/* ⚙️ 휠 모양은 이 상수만 만지면 됩니다.
   방식 자체가 "오른쪽 축 회전" — 좌표 계산 없이, 회전축(transform-origin)을
   각 항목의 오른쪽 모서리에서 radius(px)만큼 더 나간 지점에 박고 rotate만 한다.
   모든 항목의 오른쪽 끝이 정렬돼 있어서 전부 같은 축을 돌게 되고,
   부챗살처럼 오른쪽에 고정된 채 왼쪽 끝이 벌어진다.

   stepDeg  한 칸당 부채 각도. 크면 활짝 벌어짐 (10~18 권장)
   radius   회전축이 오른쪽 모서리에서 얼마나 바깥에 있는지(px).
            작으면 급한 부채(축이 바로 옆), 크면 완만한 원호 (0~300)
   dir      뒷 번호(2,3,4…)가 펼쳐지는 방향. 1 = 위로, -1 = 아래로.
            위아래가 반대로 보이면 이 값만 뒤집으면 됨
   slotY    활성 슬롯(축)의 세로 위치 — 휠 영역 기준.
            '50%' = 중간, '30%' = 위쪽, 픽셀값(예: 300)도 가능
   fade     한 칸 멀어질 때 깎이는 불투명도 (바닥 0.35)
   blurStep 한 칸 멀어질 때 더해지는 블러 px (최대 1.6, 0이면 블러 없음) */
const WHEEL = {
  stepDeg: 30,
  radius: 360,
  dir: 1,
  slotY: '50%',
  fade: 1,
  blurStep: 1,
};
/* 드래그 환산용 — 한 칸당 텍스트 중심부의 대략적 세로 이동량.
   (텍스트 중심은 축에서 radius + 약 140px 거리에 있다) */
const WHEEL_STEP_PX = (WHEEL.radius + 140) * Math.sin((WHEEL.stepDeg * Math.PI) / 180);

function AppWheel() {
  /* 초기 선택 = 1번 — 아래쪽 활성 슬롯에 1번이 하이라이트된 채,
     2~4번이 dir 방향(기본: 위)으로 감겨 올라간 상태로 시작한다 */
  const [sel, setSel] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);  // 드래그 중 부동 소수 오프셋
  const [dragging, setDragging] = useState(false);  // 렌더용 — 드래그 중엔 transition 끔
  const drag = useRef(null);                        // { startY, moved }
  const wheelLock = useRef(0);

  const clamp = (v) => Math.max(0, Math.min(APPS.length - 1, v));
  const pos = sel - dragOffset; // 렌더 기준 위치(드래그 중엔 소수)

  const onWheel = (e) => {
    const now = Date.now();
    if (now - wheelLock.current < 260) return; // 트랙패드 연타 방지
    wheelLock.current = now;
    setSel((s) => clamp(s + (e.deltaY > 0 ? 1 : -1)));
  };

  const onPointerDown = (e) => {
    drag.current = { startY: e.clientY, moved: false };
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!drag.current) return;
    const dy = (e.clientY - drag.current.startY) / WHEEL_STEP_PX;
    if (Math.abs(dy) > 0.08) drag.current.moved = true;
    setDragOffset(dy);
  };
  const onPointerUp = () => {
    if (!drag.current) return;
    setSel((s) => clamp(Math.round(s - dragOffset)));
    setDragOffset(0);
    setDragging(false);
    drag.current = null;
  };

  const onItemClick = (i) => {
    if (drag.current?.moved) return; // 드래그 끝의 클릭 오발 방지
    // hover가 이미 선택을 담당하므로 클릭은 항상 해당 앱 카드로 이동
    document.getElementById(`app-${APPS[i].id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      className="absolute z-20 hidden md:block select-none"
      style={{ right: 0, top: 90, bottom: 200, width: 380, touchAction: 'none', cursor: 'grab' }}
      onWheel={onWheel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* 활성 슬롯(축) 위치 — WHEEL.slotY로 조정 */}
      <div className="relative" style={{ position: 'absolute', top: WHEEL.slotY, right: 44, width: '100%' }}>
        {APPS.map((a, i) => {
          const d = i - pos;                       // 활성 슬롯으로부터의 거리
          const abs = Math.abs(d);
          const active = Math.round(pos) === i;
          /* 이동 계산 없음 — 모든 항목이 같은 자리에서 시작해,
             오른쪽 바깥의 공통 축을 중심으로 회전만 한다.
             부호를 뒤집어 앞 번호(d<0)는 위로, 뒷 번호(d>0)는 아래로 —
             어느 항목이 활성이든 화면에는 항상 1→4 순서로 읽힌다. */
          return (
            <button
              key={a.id}
              onClick={() => onItemClick(i)}
              onMouseEnter={() => { if (!drag.current) setSel(i); }}
              className="absolute right-0 flex items-center gap-3 cursor-pointer whitespace-nowrap"
              style={{
                top: -31, /* 대략 텍스트 높이의 절반 — 활성 항목이 축 선상에 오도록 */
                transform: `rotate(${WHEEL.dir * d * WHEEL.stepDeg}deg)`,
                transformOrigin: `calc(100% + ${WHEEL.radius}px) 50%`,
                opacity: Math.max(0.35, 1 - abs * WHEEL.fade),
                filter: abs > 0.3 ? `blur(${Math.min(1.6, abs * WHEEL.blurStep)}px)` : 'none',
                transition: dragging
                  ? 'none'
                  : 'transform 0.32s cubic-bezier(0.22,1,0.36,1), opacity 0.32s ease, filter 0.32s ease',
              }}
            >
              <span className="text-[13px] font-bold"
                style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-[40px] lg:text-[52px] font-extrabold"
                style={{
                  color: active ? '#ffffff' : 'rgba(255,255,255,0.6)',
                  letterSpacing: '-0.04em',
                  transition: 'color 0.3s ease',
                }}>
                {a.name}
              </span>
              <span style={{ width: 11, height: 11, borderRadius: 99, background: a.color, flexShrink: 0 }} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── 히어로 패널 ── */
function HeroPanel({ isMobile }) {
  return (
    <>
      <div className="relative z-30 flex items-center justify-between gap-3 px-6 md:px-9 pt-6">
        {/* 어깨 라벨 = 네비 문장의 완성형 — "Made" 탭이 이 페이지로 연결된다 */}
        <p className="text-[10.5px] font-bold tracking-[0.28em] uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>
          What I made
        </p>
        <span className="text-[11px] font-semibold px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.24)', color: '#fff' }}>
          앱스토어 · 앱인토스 · 5종 출시
        </span>
      </div>

      {/* 대형 타이포 — 좌측 상단 */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="absolute z-0 pointer-events-none select-none"
        style={{ top: isMobile ? 62 : 78, left: isMobile ? 18 : 40, margin: 0 }}
      >
        <span style={{
          display: 'block',
          fontSize: isMobile ? 'clamp(52px, 17vw, 76px)' : 'clamp(74px, 10.5vw, 158px)',
          fontWeight: 900, letterSpacing: '-0.055em',
          lineHeight: 0.92, whiteSpace: 'nowrap',
          backgroundImage:
            'linear-gradient(180deg, rgba(255,255,255,0.86) 26%, rgba(255,255,255,0.48) 62%, rgba(255,255,255,0.08) 100%)',
          WebkitBackgroundClip: 'text', backgroundClip: 'text',
          color: 'transparent', WebkitTextFillColor: 'transparent',
        }}>
          SOLO
        </span>
        <span style={{
          display: 'block',
          marginTop: isMobile ? 8 : 12,
          fontSize: isMobile ? 14 : 21,
          fontWeight: 600, letterSpacing: '-0.01em',
          color: 'rgba(255,255,255,0.68)',
          whiteSpace: 'nowrap',
        }}>
          혼자 기획하고 혼자 출시한 것들
        </span>
      </motion.h1>

      {/* 우측 — 앱 인덱스 옵션 휠 (Work의 오브젝트 자리) */}
      <AppWheel />

      {/* 좌하단 — 요약 · 지표 */}
      <div className="absolute left-0 bottom-0 z-20 px-6 md:px-10 pb-6 md:pb-9 w-full md:w-auto"
        style={{ width: isMobile ? '100%' : 'max(440px, calc(50% - 200px))' }}>
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}>
          <p className="text-[10.5px] font-semibold mb-2.5" style={{ color: ACCENT }}>
            기획 · 디자인 · 개발 · 심사 · 배포 전 과정 단독
          </p>
          <h2 className="text-[20px] md:text-[25px] font-extrabold leading-[1.28] mb-3"
            style={{ color: '#fff', letterSpacing: '-0.025em' }}>
            기관 용역 밖에서도<br />제품이 굴러가는지 확인했습니다
          </h2>
          <p className="text-[13px] leading-[1.85] mb-5" style={{ color: 'rgba(255,255,255,0.78)' }}>
            앱스토어와 토스 앱인토스에 앱 5종을 올렸습니다. B2C 서비스의 수익 모델·심사·배포·운영을
            직접 겪으면서, 실무에서는 남이 대신 해주던 구간을 전부 통과했습니다.
          </p>
          <div className="flex gap-5">
            {[
              { num: '5종', label: '출시 완료' },
              { num: '3,600', label: '문제 데이터 설계' },
              { num: '3,564', label: '읍면동 데이터 매핑' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-[17px] font-extrabold leading-none mb-1" style={{ color: '#fff' }}>{s.num}</p>
                <p className="text-[10px] leading-snug" style={{ color: 'rgba(255,255,255,0.55)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default function SoloWork({ onNavigate }) {
  const isMobile = useMedia('(max-width: 767px)');

  return (
    <div className="relative w-full overflow-x-hidden"
      style={{ backgroundColor: '#efedf4', color: '#1a231e' }}>
      <div className="px-4 md:px-6 py-6">
        <div style={{ maxWidth: 1640, margin: '0 auto' }}>
          <FrameCard
            label="Solo Work"
            meta="개인 프로젝트 · 2026"
            accent={ACCENT}
            scrollBtnColor={PANEL_BG}
            panelStyle={{ background: `linear-gradient(150deg, ${PANEL_SOFT} 0%, ${PANEL_BG} 62%)` }}
            panel={<HeroPanel isMobile={isMobile} />}
          >
            <AppsSection />
            <RetroSection />
            <LeafSection onNavigate={onNavigate} />
            <CtaSection onNavigate={onNavigate} />
          </FrameCard>
        </div>
      </div>
    </div>
  );
}
