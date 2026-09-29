/* ══════════════════════════════════════════
   /print — PDF 포트폴리오 조판 라우트 (단일본)

   포맷: 원티드 제공 [PO] 포트폴리오 샘플(2026-09-16 본인 공유)을 따른다.
   - 16:9 슬라이드: 프로필 표지 / MAIN PROJECTS 요약 / 프로젝트별
     (문제정의 | 전략 → 결과 Key Result + 우측 표·배지 → 화면) / SIDE PROJECTS / THANK YOU
   - 밝은 회색 배경 + 흰 라운드 카드 + 네이비 제목 + 점선 2단 분할.

   2026-09-28 B2B/B2C 두 판을 하나로 합침(본인 결정). 옛 주소 /print/b2b · /print/b2c 도 같은 문서.

   2026-09-29 간결화(본인 결정): 16장 → 12장, 글자 수 절반 이하.
   - 이전엔 사이트 문단(QA)을 그대로 가져와 한 장에 700~940자였다. 원티드 샘플은 150~250자.
   - 그래서 PDF 문장은 이 파일 안에 따로 둔다(사이트와 단일 원본 아님).
     숫자·이미지·캡션처럼 사실 데이터만 사이트 export를 재사용한다.
   - 개요 장은 없애고 제목 아래 한 줄 + 메타 칩으로 흡수. 꿈키·Side는 한 장씩.
   - 문장 규칙: 불릿은 한 줄, 설명 문단 금지, 배경 설명은 사이트로.
   - 본인 확정 문장(표지, ZING "9개월 미뤄지던 구축을 6영업일에")은 토씨 그대로.

   PDF 추출: `npm run pdf` (scripts/make-pdf.mjs, 링크 보존) 또는 Ctrl+P. */

import { SCREENS } from './Kisti';
import { SHOTS as ZING_SHOTS, DOCS as ZING_DOCS } from './Zing';
import { SHOTS as DREAM_SHOTS } from './Dream';
import { QA as WEBMIND_QA } from './Webmind';
import { APPS, LEAF } from './SoloWork';
import { CAREERS, SKILLS, KEY_RESULTS } from './Resume';

/* ── 표지 확정본(2026-09-16 본인 문장) ── */
const COVER_MAIN = '몰입할 환경은 스스로 만들고, 결과로 증명합니다.';
const COVER_TAG = '몰입에서 즐거움을 찾는 기획자';
/* 2026-09-28 본인 수정(문체작업_2): #기술제약직접확인 → #기술제약확인 */
const HASHTAGS = ['#문제정의', '#가설검증', '#책임감', '#몰입', '#기술제약확인'];

const CONTACT = {
  name: '유희수',
  position: '서비스 기획 · PM',
  email: 'iplay3473@gmail.com',
  site: 'lyuheesu.com',
  github: 'github.com/lyudolf',
};

/* ── 톤 (원티드 샘플 기준) ── */
const BG = '#eef0f5';
const NAVY = '#1b2461';
const BLUE = '#2f6bff';
const INK = '#2a2f45';
const INK_65 = 'rgba(42,47,69,0.68)';
const INK_45 = 'rgba(42,47,69,0.45)';
const LINE = 'rgba(27,36,97,0.12)';
const SHADOW = '0 10px 34px rgba(27,36,97,0.10), 0 1px 2px rgba(27,36,97,0.06)';

const KISTI = '#1540c9';
const ZING = '#ff5a3c';
const DREAM = '#b07a1e';
const WEB = '#0d6b46';
const SOLO = '#6d4fd6';

const A = ({ href, children }) => (
  <a href={href} style={{ color: 'inherit', textDecoration: 'none' }}>{children}</a>
);

/* ══ 프리미티브 ══ */

function Slide({ children, dark = false, style }) {
  return (
    <section className="pp" style={{ background: dark ? NAVY : BG, color: dark ? '#fff' : INK, ...style }}>
      {children}
      <div className="absolute flex items-center justify-between" style={{ left: 56, right: 56, bottom: 18 }}>
        <p className="text-[10px] font-semibold" style={{ color: dark ? 'rgba(255,255,255,0.4)' : INK_45 }}>
          {CONTACT.name} · {CONTACT.position} · <A href={`https://${CONTACT.site}`}>{CONTACT.site}</A>
        </p>
        <p className="pn text-[10px] font-bold" style={{ color: dark ? 'rgba(255,255,255,0.4)' : INK_45 }} />
      </div>
    </section>
  );
}

/* 슬라이드 상단: 회사 칩 + 제목 + (선택) 한 줄 소개 */
function Head({ chip, kicker, title, sub, accent = BLUE, right }) {
  return (
    <div className="flex items-end justify-between" style={{ marginBottom: 18 }}>
      <div>
        {chip && (
          <span className="inline-block text-[10.5px] font-bold px-2.5 py-1 rounded-md mb-2"
            style={{ background: '#fff', color: accent, border: `1px solid ${accent}33`, letterSpacing: '0.02em' }}>
            {chip}
          </span>
        )}
        {kicker && (
          <p className="text-[15px] font-extrabold tracking-[0.04em] uppercase" style={{ color: accent }}>{kicker}</p>
        )}
        <h2 className="text-[30px] font-extrabold leading-[1.25]" style={{ color: NAVY, letterSpacing: '-0.02em' }}>{title}</h2>
        {sub && <p className="text-[14px] leading-[1.6] mt-2" style={{ color: INK_65, maxWidth: 900 }}>{sub}</p>}
      </div>
      {right}
    </div>
  );
}

/* 역할 · 팀 · 사용자 · 기간 한 줄 칩 (개요 장 대신) */
function MetaRow({ items, accent }) {
  return (
    <div className="flex flex-wrap gap-2" style={{ marginBottom: 16 }}>
      {items.map(([k, v]) => (
        <span key={k} className="text-[12px] font-semibold px-3 py-1.5 rounded-full"
          style={{ background: '#fff', border: `1px solid ${LINE}`, color: INK_65 }}>
          <b style={{ color: accent, marginRight: 6 }}>{k}</b>{v}
        </span>
      ))}
    </div>
  );
}

function Card({ children, className = '', style }) {
  return (
    <div className={`rounded-[22px] ${className}`}
      style={{ background: '#fff', boxShadow: SHADOW, padding: '28px 36px', ...style }}>
      {children}
    </div>
  );
}

function CardTitle({ children, accent = NAVY, style }) {
  return (
    <p className="text-[21px] font-extrabold mb-5" style={{ color: accent, letterSpacing: '-0.01em', ...style }}>{children}</p>
  );
}

/* 2단 카드 — 점선 분할 (샘플 p10 구조) */
function Split({ left, right, ratio = '1fr 1fr', gap = 44 }) {
  return (
    <Card className="flex-1" style={{ display: 'grid', gridTemplateColumns: ratio, gap, minHeight: 0 }}>
      <div className="min-w-0">{left}</div>
      <div className="min-w-0" style={{ borderLeft: `2px dashed ${LINE}`, paddingLeft: gap }}>{right}</div>
    </Card>
  );
}

/* 불릿 — 한 줄짜리 문자열 */
function Bullets({ items, size = 16, gap = 16, marker = '❑', accent = BLUE }) {
  return (
    <ul className="flex flex-col" style={{ gap }}>
      {items.map((d, i) => (
        <li key={i} className="flex gap-2.5" style={{ fontSize: size, lineHeight: 1.6, color: INK }}>
          <span style={{ color: accent, flexShrink: 0, fontSize: size - 2, lineHeight: `${size * 1.6}px` }}>{marker}</span>
          <span>{d}</span>
        </li>
      ))}
    </ul>
  );
}

/* 우측 패널 — 제목 밑줄 + 표 (샘플 p18·p23) */
function Panel({ title, children, accent = NAVY }) {
  return (
    <Card style={{ padding: '22px 26px' }}>
      <p className="text-[15px] font-extrabold text-center pb-2 mb-3 mx-auto"
        style={{ color: accent, borderBottom: `2px solid ${accent}55`, width: 'fit-content', minWidth: 160 }}>
        {title}
      </p>
      {children}
    </Card>
  );
}

function Table({ head, rows, accent = NAVY }) {
  return (
    <table className="w-full" style={{ borderCollapse: 'collapse', fontSize: 12 }}>
      {head && (
        <thead>
          <tr>
            {head.map((h, i) => (
              <th key={i} className="font-bold py-1.5 px-2 text-center"
                style={{ color: accent, borderBottom: `1px solid ${LINE}`, fontSize: 11.5 }}>{h}</th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((c, j) => (
              <td key={j} className="py-2 px-2 text-center"
                style={{ borderBottom: i < rows.length - 1 ? `1px solid ${LINE}` : 'none',
                  color: j === 0 ? INK : INK_65, fontWeight: j === 0 ? 700 : 500, lineHeight: 1.45 }}>{c}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* 큰 숫자 배지 (샘플 우하단 "5→25명 팀 증원") */
function Badges({ items, accent = BLUE, vertical = false, style }) {
  return (
    <Card style={{ padding: '18px 26px', display: 'grid', gridTemplateColumns: vertical ? '1fr' : `repeat(${items.length}, 1fr)`, gap: 16, alignContent: 'center', ...style }}>
      {items.map((b) => (
        <div key={b.label} className="flex items-center gap-3">
          <span className="rounded-full flex-shrink-0"
            style={{ width: 44, height: 44, background: `radial-gradient(circle at 35% 30%, #fff 0%, ${accent}aa 25%, ${accent} 70%)`, boxShadow: `0 6px 14px ${accent}55` }} />
          <div>
            <p className="text-[21px] font-extrabold leading-none" style={{ color: accent }}>{b.num}</p>
            <p className="text-[11.5px] font-bold mt-1" style={{ color: INK_65 }}>{b.label}</p>
          </div>
        </div>
      ))}
    </Card>
  );
}

function Shot({ src, title, aspect = '16 / 10', fit = 'cover', style }) {
  return (
    <figure className="min-w-0" style={style}>
      <div className="w-full overflow-hidden rounded-xl"
        style={{ aspectRatio: aspect, background: '#f4f5f9', border: `1px solid ${LINE}`, boxShadow: '0 4px 14px rgba(27,36,97,0.08)' }}>
        <img src={src} alt={title} style={{ width: '100%', height: '100%', objectFit: fit, objectPosition: 'top center' }} />
      </div>
      {title && <figcaption className="text-[10.5px] font-semibold mt-1.5 leading-snug" style={{ color: INK_45 }}>{title}</figcaption>}
    </figure>
  );
}

/* 칸을 꽉 채우는 이미지 (그리드 셀 높이에 맞춤) */
function FillShot({ src, title, fit = 'cover', style }) {
  return (
    <figure className="min-w-0 flex flex-col" style={{ minHeight: 0, flex: 1, ...style }}>
      <div className="w-full flex-1 overflow-hidden rounded-xl"
        style={{ minHeight: 0, background: '#f4f5f9', border: `1px solid ${LINE}`, boxShadow: '0 4px 14px rgba(27,36,97,0.08)' }}>
        <img src={src} alt={title} style={{ width: '100%', height: '100%', objectFit: fit, objectPosition: 'top center' }} />
      </div>
      {title && <figcaption className="text-[10.5px] font-semibold mt-1.5 leading-snug" style={{ color: INK_45 }}>{title}</figcaption>}
    </figure>
  );
}

/* 작은 소제목 (카드 안 두 번째 묶음) */
function SubLabel({ children, accent }) {
  return <p className="text-[14px] font-extrabold mt-8 mb-3" style={{ color: accent }}>{children}</p>;
}

/* ══ 1. 프로필 표지 (샘플 p1) ══ */
function CoverSlide() {
  const sideProjects = [...APPS.map((a) => `${a.name} (기획·개발·출시)`), `${LEAF.name} (웹 3D 게임 · 7일 단독 개발)`];
  const tools = [...SKILLS['데이터·도구'], ...SKILLS['AI·기술']];
  return (
    <Slide>
      <div className="grid h-full" style={{ gridTemplateColumns: '440px 1fr', gap: 48, paddingBottom: 30 }}>
        {/* 좌: 이름 · 한 문장 · 해시태그 · 숫자 · 연락처 */}
        <div className="flex flex-col">
          <p className="text-[13px] font-extrabold tracking-[0.2em] uppercase" style={{ color: BLUE }}>Portfolio · 2026</p>
          <h1 className="text-[52px] font-extrabold leading-none mt-5" style={{ color: NAVY, letterSpacing: '-0.03em' }}>{CONTACT.name}</h1>
          <p className="text-[16px] font-bold mt-2" style={{ color: INK_65 }}>{CONTACT.position}</p>

          <p className="text-[22px] font-extrabold leading-[1.5] mt-9" style={{ color: NAVY, letterSpacing: '-0.02em', wordBreak: 'keep-all' }}>
            {COVER_MAIN}
          </p>
          <p className="text-[12.5px] font-bold mt-2" style={{ color: BLUE }}>{COVER_TAG}</p>
          <p className="text-[14px] font-bold leading-[1.9] mt-6" style={{ color: BLUE, opacity: 0.85 }}>
            {HASHTAGS.join(' ')}
          </p>

          <div className="grid grid-cols-2 gap-2.5 mt-9">
            {KEY_RESULTS.map((s) => (
              <div key={s.label} className="rounded-xl px-4 py-3" style={{ background: '#fff', boxShadow: SHADOW }}>
                <p className="text-[20px] font-extrabold leading-none" style={{ color: BLUE }}>{s.num}</p>
                <p className="text-[11px] font-bold mt-1.5" style={{ color: INK }}>{s.label}</p>
                {s.sub && <p className="text-[10px] mt-0.5" style={{ color: INK_45 }}>{s.sub}</p>}
              </div>
            ))}
          </div>

          <div className="mt-auto text-[12px] leading-[1.9]" style={{ color: INK_65 }}>
            <p><A href={`mailto:${CONTACT.email}`}>{CONTACT.email}</A></p>
            <p><A href={`https://${CONTACT.site}`}>{CONTACT.site}</A> · <A href={`https://${CONTACT.github}`}>{CONTACT.github}</A></p>
          </div>
        </div>

        {/* 우: Work / Others / Side Projects / Tools — 샘플처럼 회사·기간·직책만 */}
        <div className="grid" style={{ gridTemplateColumns: '1.15fr 1fr', gap: 28 }}>
          <Card style={{ padding: '24px 28px' }}>
            <CardTitle accent={NAVY}>Work</CardTitle>
            <div className="flex flex-col" style={{ gap: 18 }}>
              {CAREERS.map((c) => (
                <div key={c.company} className="flex gap-3">
                  <span className="rounded-full flex-shrink-0 mt-1.5" style={{ width: 9, height: 9, background: BLUE, boxShadow: `0 0 0 3px ${BLUE}22` }} />
                  <div>
                    <p className="text-[14px] font-extrabold" style={{ color: INK }}>{c.company}</p>
                    <p className="text-[11px] font-bold" style={{ color: BLUE }}>{c.period}</p>
                    <p className="text-[11.5px] font-semibold" style={{ color: INK_65 }}>{c.role}</p>
                  </div>
                </div>
              ))}
            </div>
            <CardTitle accent={NAVY} style={{ marginTop: 28 }}>Others</CardTitle>
            <ul className="flex flex-col gap-1.5 text-[12px] leading-[1.6]" style={{ color: INK_65 }}>
              <li>- 강남대학교 컴퓨터공학 · 미디어공학 복수전공</li>
              <li>- 정보처리기사</li>
              <li>- 웹어워드 코리아 금상</li>
            </ul>
          </Card>

          <div className="flex flex-col" style={{ gap: 28 }}>
            <Card style={{ padding: '24px 28px' }}>
              <CardTitle accent={NAVY}>Side Projects</CardTitle>
              <ul className="flex flex-col gap-1.5 text-[12px] leading-[1.6]" style={{ color: INK_65 }}>
                {sideProjects.map((s) => <li key={s}>- {s}</li>)}
              </ul>
            </Card>
            <Card className="flex-1" style={{ padding: '24px 28px' }}>
              <CardTitle accent={NAVY}>Tools</CardTitle>
              <div className="flex flex-wrap gap-1.5">
                {tools.map((t) => (
                  <span key={t} className="text-[10.5px] font-bold px-2 py-1 rounded-md"
                    style={{ background: BG, color: INK_65, border: `1px solid ${LINE}` }}>{t}</span>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Slide>
  );
}

/* ══ 2. MAIN PROJECTS 요약 (샘플 p2) ══
   꿈키·웹마인드 문구는 2026-09-28 본인 수정(문체작업_2) 반영.
   ⚠️ 본인이 웹마인드 직책을 "매니저"로 적었으나 이력서·사람인 기록은 "주임" → 확인 전까지 주임 유지. */
const MAIN = [
  {
    key: 'KI', name: 'KISTI 고령자 XR 훈련 시스템', role: '기획 · PM (단독)', accent: KISTI, period: '2024.07 ~ 재직 중 · 국가과제',
    bullets: ['인수 콘텐츠 재설계 (진입 6단계 → 1~2 depth)', '교수자 중앙 제어 운영 구조 확립', '1차 임상 60명 무이슈 · 1년 용역 → 3년차 연장'],
  },
  {
    key: 'ZI', name: 'ZING 캠페인 매칭 플랫폼', role: '기획 · 설계 · 개발 (1인)', accent: ZING, period: '2026.09 · 사내 신사업',
    bullets: ['9개월 미뤄진 구축을 6영업일에 완료', '프로토타입 → 실서비스 구조 (화면 73 · 테이블 47)', '상태 4축 통합 · 자동화 8종 · QA 96항목 설계'],
  },
  {
    key: 'DR', name: '꿈키올래 Vision Pro 직업체험 9종', role: 'PM · 기획 · QA', accent: DREAM, period: '2025 · 서귀포 진로직업체험센터',
    bullets: ['개발 단의 일정 내 불가능 판정을 기획 프레임워크화로 문제 해결', '3 세계관 × 3 직업, 실개발 2개월 납품', '클라이언트 후속 제안 → 한국콘텐츠진흥원 국가과제로 연결'],
  },
  {
    key: 'WM', name: '웹마인드 B2B 웹 구축 및 운영', role: '기획 · 주임', accent: WEB, period: '2023.04 ~ 2024.07',
    bullets: ['제안 PT → 수주 → IA · 화면정의서 → 유지보수', '아마노코리아 홈페이지 재구축으로 웹어워드 코리아 금상', '인터텍 테스팅 서비스 리뉴얼 IA 재구조화', '한국건설품질협의회 홈페이지 구축 및 유지보수'],
  },
];

function MainProjectsSlide() {
  return (
    <Slide>
      <Head kicker="Main Projects" title="주요 프로젝트 4건과 역할" />
      <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, flex: 1, alignContent: 'center', paddingBottom: 40 }}>
        {MAIN.map((m, i) => (
          <div key={m.key} className="flex flex-col items-center text-center"
            style={{ borderLeft: i > 0 ? `2px dashed ${LINE}` : 'none', padding: '8px 18px' }}>
            <div className="rounded-full flex items-center justify-center"
              style={{ width: 128, height: 128, background: '#fff', boxShadow: SHADOW }}>
              <div className="rounded-full flex items-center justify-center text-[26px] font-extrabold text-white"
                style={{ width: 96, height: 96, background: `linear-gradient(135deg, ${m.accent}, ${NAVY})` }}>
                {m.key}
              </div>
            </div>
            <p className="text-[17px] font-extrabold leading-[1.3] mt-7" style={{ color: NAVY, wordBreak: 'keep-all' }}>{m.name}</p>
            <p className="text-[12px] font-bold mt-1.5" style={{ color: m.accent }}>{m.role}</p>
            <p className="text-[10.5px] font-semibold mt-0.5" style={{ color: INK_45 }}>{m.period}</p>
            <ul className="mt-4 flex flex-col gap-1">
              {m.bullets.map((b) => (
                <li key={b} className="text-[12px] leading-[1.6]" style={{ color: INK_65 }}>- {b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Slide>
  );
}

/* ══ 3. KISTI (3p) ══ */
const KISTI_CHIP = 'ETRIBE · 2024.07 ~ 재직 중 · 국가과제 XR';

function KistiSlides() {
  const pairs = [
    ['prepare', '대상 선택부터 시작까지 한 화면으로'],
    ['class', '상시 좌측 메뉴로 뒤로가기 제거'],
    ['monitor', '자세 · 이탈 안전 지표 상시 표시'],
  ].map(([id, cap]) => ({ ...SCREENS.find((s) => s.id === id), cap }));

  return (
    <>
      {/* 문제정의 | 전략 (개요는 한 줄 + 칩으로) */}
      <Slide>
        <Head chip={KISTI_CHIP} accent={KISTI} title="KISTI 고령자 XR 인지 · 운동 훈련 시스템"
          sub="병원에서 50세 이상 훈련자와 교수자가 함께 쓰는 임상 XR 훈련 시스템입니다. 6년 사업의 3년차에 투입됐습니다." />
        <MetaRow accent={KISTI} items={[
          ['역할', '기획 · PM (단독)'], ['팀', '개발 2 · 디자인 1 · 기획 1'], ['사용자', '훈련자 · 교수자'], ['목표', '기술이전까지 가는 제품'],
        ]} />
        <div className="grid" style={{ gridTemplateColumns: '1fr 360px', gridTemplateRows: 'minmax(0, 1fr)', gap: 22, flex: 1, minHeight: 0 }}>
        <Split gap={32} left={
          <>
            <CardTitle>문제정의</CardTitle>
            <Bullets accent={KISTI} items={[
              '지평선까지 펼쳐진 씬, 고령자에게 시각 부하 과다',
              '카메라 이동으로 멀미 · 적응 부담',
              '진입 6단계 메뉴, 교수자 · 훈련자 모두 혼란',
              '매년 바뀐 구축 업체, 확정된 기획이 불분명',
            ]} />
          </>
        } right={
          <>
            <CardTitle>전략 Strategies / Objectives</CardTitle>
            <Bullets accent={KISTI} marker="➤" items={[
              '조작은 전부 교수자 PC로, 훈련자는 쓰고 움직이기만',
              '시점 고정 · 핵심 오브젝트 중심으로 씬 재설계',
              '진입 6단계 → 1~2 depth 단일 흐름',
              '인계 2주 만에 새 기획서를 들고 선제 미팅',
            ]} />
          </>
        } />
        <Card style={{ padding: 18, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16, minHeight: 0 }}>
          <Shot src="/images/kisti/start-new.png" title="교수자 런처: 시작 화면 (재설계 후)" aspect="16 / 8.6" />
          <Shot src="/images/kisti/learner-new.png" title="교수자 런처: 훈련자 관리 (재설계 후)" aspect="16 / 8.6" />
        </Card>
        </div>
      </Slide>

      {/* 결과 */}
      <Slide>
        <Head chip={KISTI_CHIP} accent={KISTI} title="임상 60명 무이슈 · 1년 용역이 3년차 운영으로" />
        <div className="grid" style={{ gridTemplateColumns: '1.3fr 1fr', gridTemplateRows: 'minmax(0, 1fr)', gap: 28, flex: 1, minHeight: 0 }}>
          <Card>
            <CardTitle>결과 Key Result</CardTitle>
            <Bullets accent={KISTI} marker="➤" items={[
              '1차 임상 60명 무이슈 완료, 2차 60명 진행 중',
              '1년 용역 → 3년차 운영, 마지막 6년차 연장 논의',
              '클라이언트 기술이전 준비, 아키텍처 전환 진행 중',
            ]} />
            <SubLabel accent={KISTI}>어떻게 풀었나</SubLabel>
            <Bullets accent={KISTI} marker="▪" size={15} gap={13} items={[
              '클라이언트 세 분의 요구를 모아 우선순위화, 1순위는 안정성',
              '기획서 맨 앞에 유저 플로우, 기능마다 엣지 케이스 병기',
              '임상지에 직접 내려가 가시성 · 멀미 · 그랩 난이도 즉시 수정',
            ]} />
          </Card>
          <div className="flex flex-col" style={{ gap: 20 }}>
            <Panel title="인수 시점 → 현재" accent={KISTI}>
              <Table accent={KISTI} head={['', '인수 시점', '현재']} rows={[
                ['운영 depth', '진입 6단계', '1~2 depth'],
                ['임상', '-', '1차 60명 완료 · 2차 진행'],
                ['계약', '1년 용역', '3년차 운영 · 6년차 논의'],
              ]} />
            </Panel>
            <Badges accent={KISTI} items={[
              { num: '60명', label: '1차 임상 무이슈' },
              { num: '3년차', label: '1년 용역 → 연장' },
            ]} />
            <Card style={{ padding: 16, flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
              <FillShot src="/images/kisti/cognitive-new.png" title="인지검사 결과: 회차별 표 · 추이 그래프 · 내보내기" />
            </Card>
          </div>
        </div>
      </Slide>

      {/* 화면 전후 */}
      <Slide>
        <Head chip={KISTI_CHIP} accent={KISTI} title="화면 재설계: 인수 시점과 개선 후"
          right={<p className="text-[10.5px] font-semibold text-right" style={{ color: INK_45 }}>7개 화면 전체 비교 → {CONTACT.site}/kisti<br />화면 속 이름 · 영상은 개인정보 보호를 위해 가렸습니다</p>} />
        <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 22, flex: 1, minHeight: 0 }}>
          {pairs.map((s) => (
            <Card key={s.id} style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column' }}>
              <p className="text-[15px] font-extrabold" style={{ color: NAVY }}>{s.label}</p>
              <p className="text-[12.5px] font-semibold mb-3" style={{ color: KISTI }}>{s.cap}</p>
              <Shot src={s.old} title="인수 시점" aspect="16 / 8.4" />
              <Shot src={s.new} title="재설계 후" aspect="16 / 8.4" style={{ marginTop: 10 }} />
            </Card>
          ))}
        </div>
      </Slide>
    </>
  );
}

/* ══ 4. ZING (3p) ══ */
const ZING_CHIP = 'ETRIBE 사내 신사업 · 2026.09 · 캠페인 플랫폼';

function ZingSlides() {
  const steps = ['설계 · 기반', '프로세스 콘솔', '공개 사이트', '운영 규칙', '문서 · QA', '반영'];
  /* 세로로 긴 문서(IA 트리)는 상단만 잘라 보여주고, 가로형(상태 4축·ERD)은 전체를 담는다 */
  const docs = [['doc-01', 'cover'], ['doc-03', 'contain'], ['doc-04', 'contain']]
    .map(([k, fit]) => ({ ...ZING_DOCS.find((d) => d.src.includes(k)), fit }));
  /* 01-home은 문제정의 장, 08-admin은 결과 장에 썼으니 여기선 나머지 화면 */
  const shots = ['02-campaigns', '03-campaign', '07-influencer'].map((k) => ZING_SHOTS.find((d) => d.src.includes(k)));

  return (
    <>
      {/* 문제정의 | 전략 */}
      <Slide>
        <Head chip={ZING_CHIP} accent={ZING} title="ZING: 한국 광고주 × 중국 인플루언서 캠페인 매칭 플랫폼"
          sub="광고주 · 인플루언서 · 관리자 세 콘솔이 캠페인 요청부터 정산까지 한 흐름으로 움직이는 플랫폼입니다." />
        <MetaRow accent={ZING} items={[
          ['역할', '기획 · 설계 · 개발 (1인)'], ['입력', 'Figma Make 프로토타입 · 디자인 시안'], ['사용자', '광고주 · 인플루언서 · 관리자'], ['기간', '6영업일'],
        ]} />
        <div className="grid" style={{ gridTemplateColumns: '1fr 360px', gridTemplateRows: 'minmax(0, 1fr)', gap: 22, flex: 1, minHeight: 0 }}>
        <Split gap={32} left={
          <>
            <CardTitle>문제정의</CardTitle>
            <Bullets accent={ZING} items={[
              '화면만 있는 프로토타입, 백엔드 없이 데이터는 전부 mock',
              '연결 안 된 페이지 40개, 끊긴 링크 14개',
              '캠페인 · 콘텐츠 · 정산 상태가 화면마다 따로 정의',
              '수수료율 등 정책값이 코드 곳곳에 하드코딩',
            ]} />
          </>
        } right={
          <>
            <CardTitle>전략 Strategies / Objectives</CardTitle>
            <Bullets accent={ZING} marker="➤" items={[
              '상태는 캠페인 · 지원 · 참여 · 정산 네 축으로 통합',
              '규칙은 DB 설정값으로, 화면은 보여주기만',
              'MVP는 문의 → 관리자 등록 → 진행, 한 사이클만',
              '결제 · 직접 채팅은 제외, 기한이 지나면 자동 진행',
            ]} />
          </>
        } />
        <Card style={{ padding: 18, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16, minHeight: 0 }}>
          <Shot src="/images/zing/01-home.png" title={ZING_SHOTS[0].title} aspect="16 / 8.6" />
          <Shot src="/images/zing/04-advertiser-dashboard.png" title="광고주 콘솔: 대시보드" aspect="16 / 8.6" />
        </Card>
        </div>
      </Slide>

      {/* 결과 */}
      <Slide>
        <Head chip={ZING_CHIP} accent={ZING} title="9개월 미뤄지던 구축을 6영업일에" />
        <div className="grid" style={{ gridTemplateColumns: '1.3fr 1fr', gridTemplateRows: 'minmax(0, 1fr)', gap: 28, flex: 1, minHeight: 0 }}>
          <Card style={{ display: 'flex', flexDirection: 'column' }}>
            <CardTitle>결과 Key Result</CardTitle>
            <Bullets accent={ZING} marker="➤" items={[
              '6영업일 67커밋, 비공개 테스트 환경까지 오픈',
              '화면 73 · 테이블 47 · 자동화 8종 문서화',
              'QA 96항목 설계, 1차 회신 13건 반영',
              '다음 단계: 클로즈드 베타',
            ]} />
            <p className="text-[12px] font-extrabold mt-auto mb-2.5" style={{ color: ZING }}>만든 순서 (6영업일)</p>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
              {steps.map((t, i) => (
                <div key={t} className="rounded-lg px-2.5 py-2" style={{ background: `${ZING}0c`, border: `1px solid ${ZING}22` }}>
                  <p className="text-[10.5px] font-extrabold" style={{ color: ZING }}>{i + 1}일</p>
                  <p className="text-[11.5px] font-bold leading-tight" style={{ color: INK }}>{t}</p>
                </div>
              ))}
            </div>
          </Card>
          <div className="flex flex-col" style={{ gap: 20 }}>
            <Panel title="넘겨받은 것 → 6영업일 후" accent={ZING}>
              <Table accent={ZING} head={['', '인수 시점', '6영업일 후']} rows={[
                ['화면', '미연결 40 · 끊긴 링크 14', '73 (문서화)'],
                ['상태 모델', '화면마다 6벌 이상', '4축 통합'],
                ['데이터', 'mock', '테이블 47 · 자동화 8종'],
              ]} />
            </Panel>
            <Badges accent={ZING} items={[
              { num: '6영업일', label: '프로토타입 → 실서비스' },
              { num: '96', label: 'QA 항목 설계' },
            ]} />
            <Card style={{ padding: 16, flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
              <FillShot src="/images/zing/08-admin-requests.png" title="관리자 콘솔: 캠페인 요청 큐" />
            </Card>
          </div>
        </div>
      </Slide>

      {/* 산출물 · 화면 */}
      <Slide>
        <Head chip={ZING_CHIP} accent={ZING} title="기획 산출물과 실제 화면"
          right={<p className="text-[10.5px] font-semibold text-right" style={{ color: INK_45 }}>산출물 6종 · 화면 6종 전체 → {CONTACT.site}/zing<br />내부 정책 수치는 가렸습니다</p>} />
        <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: '1fr 1fr', gap: 18, flex: 1, minHeight: 0 }}>
          {docs.map((d) => <Shot key={d.src} src={d.src} title={d.title} aspect="16 / 8.6" fit={d.fit} />)}
          {shots.map((d) => <Shot key={d.src} src={d.src} title={d.title} aspect="16 / 8.6" />)}
        </div>
      </Slide>
    </>
  );
}

/* ══ 5. 꿈키올래 (1p) ══ */
function DreamSlide() {
  const shots = [0, 3, 6, 7].map((i) => DREAM_SHOTS[i]);
  return (
    <Slide>
      <Head chip="ETRIBE · 서귀포 진로직업체험센터 납품 · Apple Vision Pro" accent={DREAM}
        title="꿈키올래: Vision Pro 직업체험 9종, 실개발 2개월"
        sub="3개 세계관 × 3개 직업을 40~50분 동안 이어서 체험하는 콘텐츠입니다. PM · 기획 · QA를 맡았습니다." />
      <div className="grid" style={{ gridTemplateColumns: '1.1fr 1fr', gridTemplateRows: 'minmax(0, 1fr)', gap: 28, flex: 1, minHeight: 0 }}>
        <Card>
          <CardTitle>문제정의</CardTitle>
          <Bullets accent={DREAM} size={15} gap={12} items={[
            '9종을 따로 만들면 9개월, 실개발 기간은 2개월',
            '팀 전원이 처음 쓰는 Vision Pro, 참고 사례 없음',
            '진행 중 타깃이 초등 고학년까지 확대',
          ]} />
          <CardTitle style={{ marginTop: 30 }}>전략 Strategies / Objectives</CardTitle>
          <Bullets accent={DREAM} marker="➤" size={15} gap={12} items={[
            '수주 판단 전에 프레임워크 기획서 먼저, "불가능" → "가능"',
            '직업당 30분 기획을 스스로 폐기, 전체 40~50분으로',
            '1종 기획 즉시 개발로 넘기는 병렬 진행, 외주 없이 완료',
          ]} />
        </Card>
        <div className="flex flex-col" style={{ gap: 18 }}>
          <Card style={{ padding: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 12, flex: 1, minHeight: 0 }}>
            {shots.map((s) => <FillShot key={s.src} src={s.src} />)}
          </Card>
          <Badges accent={DREAM} items={[
            { num: '9종', label: '기한 내 납품' },
            { num: '후속 제안', label: '→ 한콘진 국가과제' },
          ]} />
        </div>
      </div>
    </Slide>
  );
}

/* ══ 6. SIDE PROJECTS (1p) ══ */
function SideSlide() {
  const all = [...APPS, LEAF];
  return (
    <Slide>
      <Head kicker="Side Projects" accent={SOLO} title="혼자 기획하고 출시한 앱 5종 + 웹 3D 게임 1종"
        right={<p className="text-[10.5px] font-semibold text-right" style={{ color: INK_45 }}>앱인토스 미니앱 4종 · Google Play 1종 · 웹 게임 1종<br />기획 판단 전문 → {CONTACT.site}/solo</p>} />
      <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 16, flex: 1, minHeight: 0 }}>
        {all.map((a) => (
          <Card key={a.id} style={{ padding: '16px 18px', display: 'grid', gridTemplateColumns: a.shots ? '104px 1fr' : '1fr', gap: 16, borderTop: `4px solid ${a.color}`, minHeight: 0 }}>
            {a.shots && (
              <div className="overflow-hidden rounded-lg" style={{ height: '100%', minHeight: 0, border: `1px solid ${LINE}`, background: BG }}>
                <img src={a.shots[0].src} alt={a.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
              </div>
            )}
            <div className="min-w-0 flex flex-col justify-center">
              <p className="text-[16px] font-extrabold leading-tight" style={{ color: NAVY }}>{a.name}</p>
              <p className="text-[11px] font-bold mt-1" style={{ color: a.color }}>{a.category} · {a.released}</p>
              <p className="text-[12.5px] leading-[1.65] mt-2.5" style={{ color: INK_65 }}>{a.summary}</p>
            </div>
          </Card>
        ))}
      </div>
      <Card style={{ padding: '14px 24px', marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        <p className="text-[12.5px] leading-[1.6]" style={{ color: INK }}>
          <b style={{ color: SOLO }}>판단</b>{'  '}퀴즈왕: 시작까지의 단계를 줄이자 풀이 비율 · 재방문이 근소하게 상승 (표본 작음)
        </p>
        <p className="text-[12.5px] leading-[1.6]" style={{ color: INK }}>
          <b style={{ color: SOLO }}>회고</b>{'  '}5종 모두 출시했지만 유입 확보에 실패. 다음엔 채널부터 정하고 시작합니다
        </p>
      </Card>
    </Slide>
  );
}

/* ══ 7. 웹마인드 (1p) ══ */
function WebmindSlide() {
  const posts = WEBMIND_QA[2].blocks.find((b) => b.type === 'posts').items;
  return (
    <Slide>
      <Head chip="웹마인드 · 2023.04 ~ 2024.07 · B2B 웹 구축" accent={WEB} title="B2B 웹 구축 3건, 제안 PT부터 유지보수까지" />
      {/* 위: 결과 불릿 | 성과 표 / 아래: 사이트 3건 썸네일 | 숫자 배지 */}
      <div className="grid" style={{ gridTemplateColumns: '1.2fr 1fr', gap: 22, marginBottom: 22 }}>
        <Card>
          <CardTitle>결과 Key Result</CardTitle>
          <Bullets accent={WEB} marker="➤" items={[
            '제안 PT부터 참여, 참여한 신규 제안 전건 수주',
            '경쟁사 분석 → IA · 요구사항 정의 → 화면정의서',
            '아마노코리아 리뉴얼로 웹어워드 코리아 금상',
          ]} />
        </Card>
        <Panel title="프로젝트별 성과" accent={WEB}>
          <Table accent={WEB} head={['클라이언트', '한 일', '결과']} rows={[
            ['Intertek', 'IA 재구조화', '정보 접근성 개선'],
            ['아마노코리아', '브랜드 사이트 리뉴얼', '금상 · 유지보수 연장'],
            ['한국건설품질협의회', '공식 사이트 구축', '제안 수주'],
          ]} />
        </Panel>
      </div>
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr 1fr 240px', gridTemplateRows: 'minmax(0, 1fr)', gap: 22, flex: 1, minHeight: 0 }}>
        {posts.map((p) => (
          <Card key={p.client} style={{ padding: 14, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <FillShot src={p.thumb} />
            <p className="text-[12.5px] font-extrabold mt-2.5" style={{ color: INK }}>{p.title}</p>
            <p className="text-[11px] font-semibold" style={{ color: WEB }}>{p.client}</p>
          </Card>
        ))}
        <Badges accent={WEB} vertical items={[
          { num: '금상', label: '웹어워드 코리아' },
          { num: '100%', label: '신규 제안 수주' },
        ]} />
      </div>
    </Slide>
  );
}

/* ══ 8. THANK YOU ══ */
function ClosingSlide() {
  return (
    <Slide dark>
      <div className="h-full flex flex-col justify-between" style={{ paddingBottom: 30 }}>
        <p className="text-[12px] font-bold tracking-[0.26em] uppercase" style={{ color: 'rgba(255,255,255,0.45)' }}>Portfolio · 2026</p>
        <div>
          <h1 className="text-[64px] font-extrabold leading-none" style={{ letterSpacing: '-0.03em' }}>THANK YOU</h1>
          <p className="text-[15px] leading-[1.9] mt-8" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 760 }}>
            화면 전후 비교 전체와 앱 5종 기획 내용, ZING 기획 산출물은{' '}
            <A href={`https://${CONTACT.site}`}><span style={{ color: '#9db4ff', fontWeight: 700 }}>{CONTACT.site}</span></A>에 있습니다.
          </p>
        </div>
        <div className="flex items-end justify-between">
          <p className="text-[22px] font-extrabold">{CONTACT.name} <span className="text-[13px] font-semibold" style={{ color: 'rgba(255,255,255,0.55)' }}>· {CONTACT.position}</span></p>
          <div className="text-right text-[12px] leading-[1.9]" style={{ color: 'rgba(255,255,255,0.65)' }}>
            <p><A href={`mailto:${CONTACT.email}`}>{CONTACT.email}</A></p>
            <p><A href={`https://${CONTACT.site}`}>{CONTACT.site}</A> · <A href={`https://${CONTACT.github}`}>{CONTACT.github}</A></p>
          </div>
        </div>
      </div>
    </Slide>
  );
}

/* ═══ 메인 ═══ */
export default function Print() {
  return (
    <div style={{ background: '#2c3040', counterReset: 'pn' }}>
      <title>유희수 포트폴리오 PDF</title>
      <meta name="robots" content="noindex" />
      <style>{`
        @page { size: 1280px 720px; margin: 0; }
        .pp {
          width: 1280px; height: 720px;
          padding: 40px 56px 44px;
          overflow: hidden; box-sizing: border-box; position: relative;
          display: flex; flex-direction: column;
          break-after: page; counter-increment: pn;
          word-break: keep-all;
        }
        .pp .pn::after { content: counter(pn, decimal-leading-zero); }
        @media screen {
          .pp { margin: 24px auto; box-shadow: 0 12px 44px rgba(0,0,0,0.45); }
        }
        @media print {
          body { background: #fff !important; }
          .pp { margin: 0; box-shadow: none; }
          .print-toolbar { display: none; }
        }
      `}</style>

      <div className="print-toolbar sticky top-0 z-40 flex items-center justify-between px-5 py-2.5"
        style={{ background: 'rgba(27,36,97,0.94)', backdropFilter: 'blur(10px)' }}>
        <p className="text-[12px] font-bold" style={{ color: 'rgba(255,255,255,0.85)' }}>
          PDF 조판 미리보기 (16:9)
        </p>
        <div className="flex gap-2">
          <button onClick={() => window.print()}
            className="px-3.5 py-1.5 rounded-full text-[11.5px] font-bold cursor-pointer"
            style={{ background: '#9db4ff', color: NAVY }}>
            PDF로 저장
          </button>
        </div>
      </div>

      <CoverSlide />
      <MainProjectsSlide />
      <KistiSlides />
      <ZingSlides />
      <DreamSlide />
      <SideSlide />
      <WebmindSlide />
      <ClosingSlide />
    </div>
  );
}
