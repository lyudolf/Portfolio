/* ══════════════════════════════════════════
   /print2 — PDF 리메이크 시안 (2026-10-27)

   본인 피드백: 기존 /print는 디자인도 정신없고 글자도 많다.
   원칙:
   - 한 장 = 한 메시지. 제목 자리에 결과 한 문장.
   - 본문은 세 덩어리뿐: 문제 / 바꾼 것 / 결과. 각 1~3줄.
   - 오른쪽 반은 이미지 하나 크게.
   - 장식 없음: 칩·STAR 배지·구슬·점선·카드 그림자 전부 제거. 색은 포인트 하나.
   - 불릿 기호 한 종류.

   지금은 KISTI 2장만 — 방향 확인용. OK 나오면 나머지를 같은 틀로. */

import { SCREENS } from './Kisti';
import { QA as WEBMIND_QA } from './Webmind';
import { APPS, LEAF } from './SoloWork';
import { CAREERS, KEY_RESULTS, AI_USAGE } from './Resume';

const INK = '#17181c';
const INK_60 = 'rgba(23,24,28,0.62)';
const INK_35 = 'rgba(23,24,28,0.38)';
const LINE = 'rgba(23,24,28,0.12)';
const POINT = '#1540c9';

const CONTACT = { name: '유희수', position: '서비스 기획 · PM', site: 'lyuheesu.com', email: 'iplay3473@gmail.com', github: 'github.com/lyudolf' };

function Slide({ children }) {
  return (
    <section className="pp" style={{ background: '#fff', color: INK }}>
      {children}
      <div className="absolute flex items-center justify-between" style={{ left: 64, right: 64, bottom: 28 }}>
        <p className="text-[11px]" style={{ color: INK_35 }}>{CONTACT.name} · {CONTACT.position} · {CONTACT.site}</p>
        <p className="pn text-[11px]" style={{ color: INK_35 }} />
      </div>
    </section>
  );
}

/* 왼쪽 위 작은 메타 한 줄 */
function Meta({ children }) {
  return <p className="text-[12.5px] font-semibold tracking-[0.01em]" style={{ color: POINT }}>{children}</p>;
}

/* 결과 한 문장 — 이 장의 제목 */
function Headline({ children }) {
  return (
    <h2 className="text-[32px] font-extrabold leading-[1.28] mt-3" style={{ letterSpacing: '-0.025em', wordBreak: 'keep-all' }}>
      {children}
    </h2>
  );
}

/* 문제 / 바꾼 것 / 결과 — 라벨 + 줄 */
function Block({ label, lines, strong = false }) {
  return (
    <div style={{ paddingTop: 14, borderTop: `1px solid ${LINE}` }}>
      <p className="text-[12px] font-bold mb-1.5" style={{ color: INK_35 }}>{label}</p>
      <ul className="flex flex-col" style={{ gap: 3 }}>
        {lines.map((l) => (
          <li key={l} className="flex gap-2.5" style={{ fontSize: 15, lineHeight: '24px', color: strong ? INK : INK_60, fontWeight: strong ? 700 : 500 }}>
            <span style={{ color: POINT, flexShrink: 0 }}>·</span>
            <span>{l}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Img({ src, caption, aspect = '16 / 10', style }) {
  return (
    <figure className="min-w-0" style={style}>
      <div className="w-full overflow-hidden rounded-lg" style={{ aspectRatio: aspect, border: `1px solid ${LINE}`, background: '#f6f6f8' }}>
        <img src={src} alt={caption} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
      </div>
      {caption && <figcaption className="text-[11.5px] mt-2" style={{ color: INK_35 }}>{caption}</figcaption>}
    </figure>
  );
}

/* 칸 높이에 맞춰 채우는 이미지 — aspectRatio 이미지는 그리드 행을 밀어내 footer를 덮는다 */
function FillImg({ src, caption, grow = 1, fit = 'cover' }) {
  return (
    <figure className="min-w-0 flex flex-col" style={{ flex: `${grow} 1 0`, minHeight: 0 }}>
      <div className="w-full flex-1 overflow-hidden rounded-lg" style={{ minHeight: 0, border: `1px solid ${LINE}`, background: '#f6f6f8' }}>
        <img src={src} alt={caption} style={{ width: '100%', height: '100%', objectFit: fit, objectPosition: fit === 'contain' ? 'center' : 'top center', background: '#fff' }} />
      </div>
      {caption && <figcaption className="text-[11.5px] mt-2" style={{ color: INK_35, flexShrink: 0 }}>{caption}</figcaption>}
    </figure>
  );
}

/* ══ KISTI 1 — 한 장 요약 ══ */
function KistiSlide() {
  return (
    <Slide>
      <div className="grid flex-1" style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'minmax(0, 1fr)', gap: 56, paddingBottom: 36, minHeight: 0 }}>
        <div className="flex flex-col" style={{ minHeight: 0 }}>
          <Meta>KISTI 고령자 XR 훈련 시스템 · 국가과제 · 2024.07 ~ 재직 중 · 기획 · PM 단독</Meta>
          <Headline>1년짜리 용역을 3년차 운영까지 이어가고, 임상 60명을 이슈 없이 마쳤습니다</Headline>
          <p className="text-[14.5px] leading-[1.7] mt-4" style={{ color: INK_60 }}>
            병원에서 50세 이상 훈련자와 교수자가 함께 쓰는 임상 XR 훈련 시스템. 6년 사업의 3년차에 투입됐습니다.
          </p>

          <div className="flex flex-col mt-auto" style={{ gap: 14 }}>
            <Block label="문제" lines={[
              '매년 구축 업체가 바뀌어 확정된 기획이 없었고, 훈련 진입까지 메뉴 6단계',
              '지평선까지 펼쳐진 씬과 카메라 이동으로 멀미',
            ]} />
            <Block label="바꾼 것" lines={[
              '조작은 전부 교수자 PC 런처로, 훈련자는 쓰고 움직이기만',
              '진입 6단계 → 1~2단계, 시점 고정 · 핵심 오브젝트 중심으로 씬 재설계',
              '클라이언트 요구를 모아 안정성 1순위로 로드맵, 임상 현장에서 직접 수정',
            ]} />
            <Block label="결과" strong lines={[
              '1차 임상 60명 무이슈 완료, 2차 진행 중',
              '1년 용역 → 3년차 운영, 4년차 논의 중 · 기술이전 준비',
            ]} />
          </div>
        </div>

        <div className="flex flex-col" style={{ gap: 20, minHeight: 0 }}>
          <FillImg src="/images/kisti/start-new.png" caption="교수자 런처 시작 화면 — 대상 선택부터 시작까지 한 화면" />
          <FillImg src="/images/kisti/cognitive-new.png" caption="인지검사 결과 — 회차별 표 · 추이 그래프 · 내보내기" />
        </div>
      </div>
    </Slide>
  );
}

/* ══ KISTI 2 — 기획서 → 실제 화면 (본인 제공 2024.09 와이어프레임 p3·p8 + 구현 화면, 2026-10-27) ══ */
function KistiSpecSlide() {
  const pairs = [
    { wire: '/images/kisti/spec/wire-main-vr.png', impl: '/images/kisti/spec/impl-main-vr.png', label: '교수자 메인 화면 (VR 수업 중)' },
    { wire: '/images/kisti/spec/wire-prepare.png', impl: '/images/kisti/prepare-new.png', label: '수업 준비' },
  ];
  return (
    <Slide>
      <div className="grid flex-1" style={{ gridTemplateColumns: '380px 1fr', gridTemplateRows: 'minmax(0, 1fr)', gap: 44, paddingBottom: 36, minHeight: 0 }}>
        <div className="flex flex-col" style={{ minHeight: 0 }}>
          <Meta>KISTI 고령자 XR 훈련 시스템 · 기획서 → 실제 화면</Meta>
          <Headline>번호를 붙인 와이어프레임과 설명표로 쓴 기획서, 그대로 구현된 교수자 화면</Headline>
          <div className="flex flex-col mt-auto" style={{ gap: 14 }}>
            <Block label="기획서 형식" lines={[
              '화면 요소마다 번호, 오른쪽 표에 동작 · 상태 · 예외를 적음 (2024.09)',
              '예: 안전도 — 기본 green, 불안전 감지 시 red, 교수자가 탭을 눌러 교정, 학습자 off면 gray',
              '예: 학습자 ready / not ready — 수업 1회 뒤 로비 복귀를 확인해 재시작 시 연결 끊김 방지',
            ]} />
            <Block label="결과" strong lines={[
              '개발 2명이 이 문서를 기준으로 구현, 화면이 기획서와 같은 구조로 나옴',
            ]} />
          </div>
        </div>
        <div className="flex flex-col" style={{ gap: 18, minHeight: 0 }}>
          {pairs.map((pr) => (
            <div key={pr.label} className="flex flex-col" style={{ flex: '1 1 0', minHeight: 0 }}>
              <p className="text-[13px] font-bold mb-2" style={{ color: INK, flexShrink: 0 }}>{pr.label}</p>
              <div className="flex" style={{ gap: 14, flex: 1, minHeight: 0 }}>
                <FillImg src={pr.wire} caption="기획서 (와이어프레임 + 설명표)" fit="contain" />
                <FillImg src={pr.impl} caption="실제 화면" fit="contain" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

/* ══ KISTI 3 — 2026 햅틱 MR PoC (본인 제공 캡처 2026-10-27, 1인 제작·Vercel 배포) ══ */
function MrPocSlide() {
  return (
    <Slide>
      <div className="grid flex-1" style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'minmax(0, 1fr)', gap: 56, paddingBottom: 36, minHeight: 0 }}>
        <div className="flex flex-col" style={{ minHeight: 0 }}>
          <Meta>KISTI 2026 과업 · 햅틱 MR PoC · 기획 · 스토리보드 · 시연 플레이어 1인</Meta>
          <Headline>프롬프트로 만든 진동 파형을 햅틱 글러브로 보내는 MR 훈련 런처, 기획서부터 시연까지</Headline>
          <p className="text-[14.5px] leading-[1.7] mt-4" style={{ color: INK_60 }}>
            교수자가 쓴 프롬프트로 진동 파형을 만들어 두 훈련자의 글러브로 보내는 협업 훈련 콘텐츠입니다.
          </p>

          <div className="flex flex-col mt-auto" style={{ gap: 14 }}>
            <Block label="만든 것" lines={[
              '교수자 런처: 프롬프트 → 파형 후보 5종 → 추천 3개 → Quest 전송',
              '2인 협업 훈련 6단계: 카드 학습(진동) → 양손 게이지 → 합의 선택 → 퍼즐 → 환경 재생',
              '오답 처리 · 동물별 액션 · 안내 음성까지 표로 정의한 기획서',
            ]} />
            <Block label="방식" lines={[
              '스토리보드를 그대로 재생하는 3D 플레이어를 AI로 만들어 Vercel에 배포, 리뷰 때 말 대신 재생',
            ]} />
            <Block label="결과" strong lines={[
              'PoC 완료 (2026) · 기획서 → 스토리보드 → 런처 한 세트',
            ]} />
          </div>
        </div>

        <div className="flex flex-col" style={{ gap: 20, minHeight: 0 }}>
          <FillImg src="/images/kisti/mr-storyboard.png" caption="스토리보드 3D 플레이어 — 단계 버튼을 누르면 시나리오가 그대로 재생" grow={1.25} />
          <FillImg src="/images/kisti/mr-launcher.png" caption="교수자 런처 — 파형 생성 · 추천 선택 · Quest 전송" />
        </div>
      </div>
    </Slide>
  );
}

/* ══ 꿈키올래 — 프레임워크 기획 + 스토리보드 (본인 제공 2026-10-27: 바이오식품공학자 · 범죄분석관 · 작곡가) ══ */
function DreamSlide() {
  const pages = [
    ['/images/dream/storyboard/bio.png', '바이오식품공학자'],
    ['/images/dream/storyboard/profiler.png', '범죄분석관'],
    ['/images/dream/storyboard/composer.png', '작곡가'],
  ];
  return (
    <Slide>
      <div className="grid flex-1" style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'minmax(0, 1fr)', gap: 56, paddingBottom: 36, minHeight: 0 }}>
        <div className="flex flex-col" style={{ minHeight: 0 }}>
          <Meta>꿈키올래 · 서귀포 진로직업체험센터 · Apple Vision Pro 직업체험 9종 · 2025.09 ~ 11 · PM · 기획 · QA</Meta>
          <Headline>기한 내 납품 불가 판정을 받은 9종을 공통 프레임워크로 다시 짜서 실개발 2개월에 납품</Headline>
          <p className="text-[14.5px] leading-[1.7] mt-4" style={{ color: INK_60 }}>
            3개 세계관 × 3개 직업을 40~50분 동안 이어서 체험하는 콘텐츠입니다.
          </p>

          <div className="flex flex-col mt-auto" style={{ gap: 14 }}>
            <Block label="문제" lines={[
              '9종을 따로 만들면 9개월, 실개발 기간은 2개월 — 개발 단에서 기한 내 불가 판정',
              '팀 전원이 처음 쓰는 Vision Pro, 진행 중 타깃이 초등 고학년까지 확대',
            ]} />
            <Block label="바꾼 것" lines={[
              '직업당 30분 기획을 버리고, 9종이 같은 절차를 공유하는 프레임워크로 재기획',
              '스토리보드도 한 틀: 씬 ID · 플레이 흐름 · [버튼] [HUD] [NPC 자막] 색 규칙을 9종에 동일 적용',
              '1종 기획이 끝나는 대로 개발로 넘기는 병렬 진행, 외주 없이 완료',
            ]} />
            <Block label="결과" strong lines={[
              '9종 기한 내 납품 · 후속 제안이 한국콘텐츠진흥원 국가과제로 연결 (과학기술혁신대상 금상)',
            ]} />
          </div>
        </div>

        <div className="flex flex-col" style={{ gap: 20, minHeight: 0 }}>
          <div className="flex" style={{ gap: 14, flex: '1.45 1 0', minHeight: 0 }}>
            {pages.map(([src, cap]) => <FillImg key={src} src={src} caption={cap} />)}
          </div>
          <FillImg src="/images/dream/storyboard/profiler-case14.png" caption="범죄분석관 CASE_14 — 왼쪽 화면 시안, 오른쪽 보드 구성 · NPC 대사 · HUD 트리거" />
        </div>
      </div>
    </Slide>
  );
}

/* ══ 표지 — 2026-10-27 본인 결정: 슬로건·해시태그 삭제, 사실만 ══ */
function CoverSlide() {
  const projects = [
    ['KISTI 고령자 XR 훈련 시스템', '국가과제 · 기획 · PM 단독 · 2024.07 ~'],
    ['KISTI 햅틱 MR PoC', '기획 · 스토리보드 · 시연 플레이어 1인 · 2026'],
    ['ZING 캠페인 매칭 플랫폼', '사내 신사업 · 기획 · 설계 · 개발 1인 · 2026.09 ~'],
    ['꿈키올래 Vision Pro 직업체험 9종', 'PM · 기획 · QA · 2025.09 ~ 11'],
    ['한국콘텐츠진흥원 AI 직업체험 국가과제', '초기 기획 · 콘텐츠 기획안 · 과학기술혁신대상 금상'],
    ['웹마인드 B2B 웹 구축 3건', '제안 PT → IA · 화면정의서 → 유지보수 · 2023.04 ~ 2024.07'],
  ];
  return (
    <Slide>
      <div className="grid flex-1" style={{ gridTemplateColumns: '1fr 1fr', gap: 72, paddingBottom: 36, minHeight: 0 }}>
        <div className="flex flex-col">
          <Meta>Portfolio · 2026</Meta>
          <h1 className="text-[56px] font-extrabold leading-none mt-4" style={{ letterSpacing: '-0.03em' }}>{CONTACT.name}</h1>
          <p className="text-[18px] font-bold mt-3" style={{ color: INK_60 }}>{CONTACT.position} · 3년 8개월</p>
          <p className="text-[15px] leading-[1.75] mt-6" style={{ color: INK_60, maxWidth: 480 }}>
            컴퓨터공학 전공과 React/Spring Boot 개발 경험을 바탕으로 기획합니다. 화면을 그리기 전에 기술 제약과 데이터 흐름을 직접 확인하고, 개발팀과 같은 말로 이야기해서 실제로 구현되는 기획서를 만듭니다.
          </p>
          <div className="grid grid-cols-2 mt-auto" style={{ gap: '14px 28px' }}>
            {KEY_RESULTS.map((k) => (
              <div key={k.label} style={{ borderTop: `1px solid ${LINE}`, paddingTop: 10 }}>
                <p className="text-[24px] font-extrabold leading-none" style={{ color: POINT }}>{k.num}</p>
                <p className="text-[12.5px] font-semibold mt-1.5" style={{ color: INK }}>{k.label}</p>
                {k.sub && <p className="text-[11px] mt-0.5" style={{ color: INK_35 }}>{k.sub}</p>}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col" style={{ paddingTop: 6 }}>
          <p className="text-[12px] font-bold mb-3" style={{ color: INK_35 }}>경력</p>
          {CAREERS.map((c) => (
            <div key={c.company} className="flex items-baseline justify-between" style={{ padding: '9px 0', borderTop: `1px solid ${LINE}` }}>
              <div>
                <p className="text-[14px] font-bold" style={{ color: INK }}>{c.company}</p>
                <p className="text-[11.5px]" style={{ color: INK_60 }}>{c.role}</p>
              </div>
              <p className="text-[12px] font-semibold" style={{ color: INK_35, flexShrink: 0 }}>{c.period}</p>
            </div>
          ))}
          <p className="text-[12px] font-bold mt-7 mb-3" style={{ color: INK_35 }}>이 문서의 프로젝트</p>
          {projects.map(([n, d]) => (
            <div key={n} className="flex items-baseline justify-between" style={{ padding: '7px 0', borderTop: `1px solid ${LINE}` }}>
              <p className="text-[13.5px] font-bold" style={{ color: INK }}>{n}</p>
              <p className="text-[11.5px] text-right" style={{ color: INK_60, flexShrink: 0, marginLeft: 16 }}>{d}</p>
            </div>
          ))}
          <div className="mt-auto text-[12px] leading-[1.8]" style={{ color: INK_60 }}>
            <p>{CONTACT.email}</p>
            <p>{CONTACT.site} · {CONTACT.github}</p>
          </div>
        </div>
      </div>
    </Slide>
  );
}

/* ══ ZING 1 — 요약 ══ */
function ZingSlide() {
  return (
    <Slide>
      <div className="grid flex-1" style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'minmax(0, 1fr)', gap: 56, paddingBottom: 36, minHeight: 0 }}>
        <div className="flex flex-col" style={{ minHeight: 0 }}>
          <Meta>ZING 캠페인 매칭 플랫폼 · 사내 신사업 · 2026.09 ~ 진행 중 · 기획 · 설계 · 개발 1인</Meta>
          <Headline>9개월 미뤄지던 신사업 플랫폼을 혼자 설계·구축해 비공개 테스트 환경까지 열었습니다</Headline>
          <p className="text-[14.5px] leading-[1.7] mt-4" style={{ color: INK_60 }}>
            한국 광고주와 중국 인플루언서를 잇는 플랫폼. 광고주 · 인플루언서 · 관리자 세 콘솔이 캠페인 요청부터 정산까지 한 흐름으로 움직입니다.
          </p>
          <div className="flex flex-col mt-auto" style={{ gap: 14 }}>
            <Block label="문제" lines={[
              '넘겨받은 건 화면만 있는 Figma Make 프로토타입 — 데이터는 전부 mock, 연결 안 된 페이지 40 · 끊긴 링크 14',
              '상태는 화면마다 따로, 정책값은 코드 곳곳에 하드코딩',
            ]} />
            <Block label="바꾼 것" lines={[
              '상태를 캠페인 · 지원 · 참여 · 정산 네 축으로 통합, 규칙은 DB 설정값으로 옮기고 화면은 보여주기만',
              '결제 · 직접 채팅은 제외하고 문의 → 관리자 등록 → 진행 한 사이클부터, 기한이 지나면 자동 진행',
              '설계 → 프로세스 콘솔 → 공개 사이트 → 운영 규칙 → 문서 · QA 순서로 구축',
            ]} />
            <Block label="결과" strong lines={[
              '화면 73 · 테이블 47 · 자동화 8종 문서화, QA 96항목 설계 · 1차 회신 13건 반영',
              '비공개 테스트 환경 오픈, 다음 단계 클로즈드 베타',
            ]} />
          </div>
        </div>
        <div className="flex flex-col" style={{ gap: 20, minHeight: 0 }}>
          <FillImg src="/images/zing/01-home.png" caption="공개 메인 — 플랫폼 소개와 모집 중 캠페인" />
          <FillImg src="/images/zing/08-admin-requests.png" caption="관리자 콘솔 — 캠페인 요청 큐" />
        </div>
      </div>
    </Slide>
  );
}

/* ══ ZING 2 — 산출물 ══ */
function ZingDocsSlide() {
  return (
    <Slide>
      <div className="grid flex-1" style={{ gridTemplateColumns: '380px 1fr', gridTemplateRows: 'minmax(0, 1fr)', gap: 44, paddingBottom: 36, minHeight: 0 }}>
        <div className="flex flex-col" style={{ minHeight: 0 }}>
          <Meta>ZING 캠페인 매칭 플랫폼 · 기획 산출물</Meta>
          <Headline>운영 DB와 코드에서 읽어 거꾸로 쓴 역기획서, 화면 73개와 동작 394개를 문서로 남겼습니다</Headline>
          <div className="flex flex-col mt-auto" style={{ gap: 14 }}>
            <Block label="문서 구성" lines={[
              'IA 구조도 — 공개 · 광고주 · 인플루언서 · 관리자 화면 46개의 위치',
              '상태값 네 축과 상태 머신 — 캠페인 · 지원 · 참여 · 정산이 어떤 순서로 바뀌는지',
              'DB 관계도 — 테이블 47개 중 흐름에 걸리는 19개',
              '화면 기능명세 — 보이는 조건 · 누르면 · 바뀌는 상태 · 특수 상태',
            ]} />
            <Block label="원칙" strong lines={[
              '추측한 내용 없이 전부 운영 DB와 코드에서 읽어온 것',
            ]} />
          </div>
          <p className="text-[11.5px] mt-5" style={{ color: INK_35 }}>산출물 6종 전체 → {CONTACT.site}/zing · 내부 정책 수치는 가렸습니다</p>
        </div>
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 16, minHeight: 0 }}>
          <FillImg src="/images/zing/doc-01-ia-tree.png" caption="IA 구조도" />
          <FillImg src="/images/zing/doc-03-status-axes.png" caption="상태값 네 축" fit="contain" />
          <FillImg src="/images/zing/doc-04-erd.png" caption="DB 핵심 관계도" fit="contain" />
          <FillImg src="/images/zing/doc-06-spec.png" caption="화면 기능명세 — 캠페인 상세 · 지원자 탭" />
        </div>
      </div>
    </Slide>
  );
}

/* ══ 웹마인드 ══ */
function WebmindSlide() {
  const posts = WEBMIND_QA[2].blocks.find((b) => b.type === 'posts').items;
  return (
    <Slide>
      <div className="grid flex-1" style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'minmax(0, 1fr)', gap: 56, paddingBottom: 36, minHeight: 0 }}>
        <div className="flex flex-col" style={{ minHeight: 0 }}>
          <Meta>웹마인드 · B2B 웹에이전시 · 2023.04 ~ 2024.07 · 기획 · 주임</Meta>
          <Headline>제안 PT부터 IA · 화면정의서 · 유지보수까지, 참여한 신규 제안은 전부 수주했습니다</Headline>
          <p className="text-[14.5px] leading-[1.7] mt-4" style={{ color: INK_60 }}>
            기획 일을 처음 시작한 곳. 사수 없이 제안서 작성 · 경쟁사 분석 · IA · 요구사항 정의 · 화면정의서 · 일정 관리를 맡았습니다.
          </p>
          <div className="flex flex-col mt-auto" style={{ gap: 14 }}>
            <Block label="한 일" lines={[
              '아마노코리아(주차 솔루션) 브랜드 사이트 리뉴얼 — 경쟁사 분석 기반 UX 방향, 화면정의서 · IA, 일정 · 예산',
              '한국건설품질협의회 공식 사이트 — 제안서 · PT로 수주, 16개 건설사가 쓰는 웹과 어드민 기획',
              'Intertek 공식 사이트 고도화 — 기술 · 연구 콘텐츠 IA 재구조화로 정보 접근성 개선',
            ]} />
            <Block label="결과" strong lines={[
              '아마노코리아 리뉴얼로 웹어워드 코리아 금상 · 유지보수 계약 연장',
              '참여한 신규 제안 전건 수주',
            ]} />
          </div>
        </div>
        <div className="flex flex-col" style={{ gap: 14, minHeight: 0 }}>
          {posts.map((p) => (
            <div key={p.client} className="flex" style={{ gap: 16, flex: '1 1 0', minHeight: 0 }}>
              <FillImg src={p.thumb} />
              <div className="flex flex-col justify-center" style={{ width: 170, flexShrink: 0 }}>
                <p className="text-[13.5px] font-bold" style={{ color: INK }}>{p.title}</p>
                <p className="text-[11.5px] mt-1" style={{ color: INK_60 }}>{p.client}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

/* ══ 개인 출시 + AI 활용 ══ */
function SideAiSlide() {
  const all = [...APPS, LEAF];
  const work = AI_USAGE.groups.find((g) => g.label === '실무').items;
  const method = AI_USAGE.groups.find((g) => g.label === '방식').items[0];
  return (
    <Slide>
      <div className="grid flex-1" style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'minmax(0, 1fr)', gap: 56, paddingBottom: 36, minHeight: 0 }}>
        <div className="flex flex-col" style={{ minHeight: 0 }}>
          <Meta>개인 출시 · 2026 · 기획 · 개발 · 출시 단독</Meta>
          <Headline>퇴근 후 혼자 기획하고 출시한 앱 5종과 웹 3D 게임 1종</Headline>
          <div className="flex flex-col mt-5" style={{ gap: 0 }}>
            {all.map((a) => (
              <div key={a.id} className="grid items-center" style={{ gridTemplateColumns: '150px 1fr', gap: 14, padding: '9px 0', borderTop: `1px solid ${LINE}` }}>
                <div>
                  <p className="text-[13.5px] font-bold" style={{ color: INK }}>{a.name}</p>
                  <p className="text-[10.5px]" style={{ color: INK_35 }}>{a.category}</p>
                </div>
                <p className="text-[12px] leading-[1.5]" style={{ color: INK_60 }}>{a.summary}</p>
              </div>
            ))}
          </div>
          <p className="text-[12px] leading-[1.6] mt-auto" style={{ color: INK_60 }}>
            <b style={{ color: INK }}>회고</b>{'  '}5종 모두 출시했지만 유입 확보에 실패. 다음엔 채널부터 정하고 시작합니다 · 기획 판단 전문 → {CONTACT.site}/solo
          </p>
        </div>
        <div className="flex flex-col" style={{ minHeight: 0 }}>
          <Meta>AI 활용 · {AI_USAGE.period}</Meta>
          <Headline>구현을 맡기기 전에 룰과 제약을 먼저 씁니다</Headline>
          <div className="flex flex-col mt-auto" style={{ gap: 14 }}>
            <Block label="실무" lines={work} />
            <Block label="방식" strong lines={[method]} />
          </div>
        </div>
      </div>
    </Slide>
  );
}

/* ══ 마지막 ══ */
function ClosingSlide() {
  return (
    <Slide>
      <div className="flex flex-col flex-1 justify-between" style={{ paddingBottom: 36 }}>
        <Meta>Portfolio · 2026</Meta>
        <div>
          <h1 className="text-[44px] font-extrabold leading-[1.3]" style={{ letterSpacing: '-0.03em', wordBreak: 'keep-all' }}>
            화면 전후 비교 전체와 앱 5종 기획 내용,<br />ZING 기획 산출물은 {CONTACT.site}에 있습니다.
          </h1>
        </div>
        <div className="flex items-end justify-between">
          <p className="text-[20px] font-extrabold">{CONTACT.name} <span className="text-[13px] font-semibold" style={{ color: INK_60 }}>· {CONTACT.position}</span></p>
          <div className="text-right text-[13px] leading-[1.8]" style={{ color: INK_60 }}>
            <p>{CONTACT.email}</p>
            <p>{CONTACT.site} · {CONTACT.github}</p>
          </div>
        </div>
      </div>
    </Slide>
  );
}

export default function PrintV2() {
  return (
    <div style={{ background: '#3a3b40', counterReset: 'pn' }}>
      <title>유희수 포트폴리오 PDF (v2 시안)</title>
      <meta name="robots" content="noindex" />
      <style>{`
        @page { size: 1280px 720px; margin: 0; }
        .pp {
          width: 1280px; height: 720px;
          padding: 52px 64px 56px;
          overflow: hidden; box-sizing: border-box; position: relative;
          display: flex; flex-direction: column;
          break-after: page; counter-increment: pn;
          word-break: keep-all;
        }
        .pp .pn::after { content: counter(pn, decimal-leading-zero); }
        @media screen { .pp { margin: 24px auto; box-shadow: 0 12px 44px rgba(0,0,0,0.45); } }
        @media print { body { background: #fff !important; } .pp { margin: 0; box-shadow: none; } }
      `}</style>
      <CoverSlide />
      <KistiSlide />
      <KistiSpecSlide />
      <MrPocSlide />
      <ZingSlide />
      <ZingDocsSlide />
      <DreamSlide />
      <WebmindSlide />
      <SideAiSlide />
      <ClosingSlide />
    </div>
  );
}
