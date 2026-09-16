/* ══════════════════════════════════════════
   /print/:variant — PDF 포트폴리오 조판 라우트

   포맷: 원티드 제공 [PO] 포트폴리오 샘플(2026-09-16 본인 공유)을 따른다.
   - 16:9 슬라이드 24p 구조 → 프로필 표지 / MAIN PROJECTS 요약 / 프로젝트별
     (개요 → 문제정의 | 전략 → 결과 Key Result + 우측 표·배지 → 화면) / SIDE PROJECTS / THANK YOU
   - 밝은 회색 배경 + 흰 라운드 카드 + 네이비 제목 + 점선 2단 분할.

   - /print/b2b : 웹마인드를 ZING 바로 뒤에, Side Projects 1p
   - /print/b2c : 꿈키올래·Side Projects 2p를 앞에, 웹마인드는 마지막

   원칙: 콘텐츠는 전부 기존 페이지의 export 데이터를 재사용한다(단일 원본).
   PDF 추출: `npm run pdf` (scripts/make-pdf.mjs, 링크 보존) 또는 Ctrl+P. */

import { QA as KISTI_QA, SCREENS, FAQ as KISTI_FAQ } from './Kisti';
import { QA as ZING_QA, SHOTS as ZING_SHOTS, DOCS as ZING_DOCS } from './Zing';
import { QA as DREAM_QA, SHOTS as DREAM_SHOTS } from './Dream';
import { QA as WEBMIND_QA } from './Webmind';
import { APPS, LEAF, LEARNED } from './SoloWork';
import { CAREERS, SKILLS, KEY_RESULTS } from './Resume';

/* ── 표지 확정본(2026-09-16 본인 문장) ── */
const COVER_MAIN = '몰입할 환경은 스스로 만들고, 결과로 증명합니다.';
const COVER_TAG = '몰입에서 즐거움을 찾는 기획자';
const HASHTAGS = ['#문제정의', '#가설검증', '#책임감', '#몰입', '#기술제약직접확인'];

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

/* 슬라이드 상단: 회사 칩 + 제목 (샘플의 흐린 로고 칩 + 큰 네이비 제목) */
function Head({ chip, kicker, title, accent = BLUE, right }) {
  return (
    <div className="flex items-end justify-between" style={{ marginBottom: 22 }}>
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
      </div>
      {right}
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

function CardTitle({ children, accent = NAVY }) {
  return (
    <p className="text-[19px] font-extrabold mb-4" style={{ color: accent, letterSpacing: '-0.01em' }}>{children}</p>
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

/* 불릿 — 문자열 또는 { t, d } */
function Bullets({ items, size = 12.5, gap = 10, marker = '❑', accent = BLUE }) {
  return (
    <ul className="flex flex-col" style={{ gap }}>
      {items.map((it, i) => {
        const t = typeof it === 'string' ? null : it.t;
        const d = typeof it === 'string' ? it : it.d;
        return (
          <li key={i} className="flex gap-2.5" style={{ fontSize: size, lineHeight: 1.7, color: INK_65 }}>
            <span style={{ color: accent, flexShrink: 0, fontSize: size - 2, lineHeight: `${size * 1.7}px` }}>{marker}</span>
            <span>
              {t && <b style={{ color: INK, fontWeight: 700 }}>{t}</b>}
              {t && d && <br />}
              {d}
            </span>
          </li>
        );
      })}
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
    <table className="w-full" style={{ borderCollapse: 'collapse', fontSize: 11.5 }}>
      {head && (
        <thead>
          <tr>
            {head.map((h, i) => (
              <th key={i} className="font-bold py-1.5 px-2 text-center"
                style={{ color: accent, borderBottom: `1px solid ${LINE}`, fontSize: 11 }}>{h}</th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((c, j) => (
              <td key={j} className="py-1.5 px-2 text-center"
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
function Badges({ items, accent = BLUE }) {
  return (
    <Card style={{ padding: '18px 26px', display: 'grid', gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: 16 }}>
      {items.map((b) => (
        <div key={b.label} className="flex items-center gap-3">
          <span className="rounded-full flex-shrink-0"
            style={{ width: 44, height: 44, background: `radial-gradient(circle at 35% 30%, #fff 0%, ${accent}aa 25%, ${accent} 70%)`, boxShadow: `0 6px 14px ${accent}55` }} />
          <div>
            <p className="text-[19px] font-extrabold leading-none" style={{ color: accent }}>{b.num}</p>
            <p className="text-[11px] font-bold mt-1" style={{ color: INK_65 }}>{b.label}</p>
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
      {title && <figcaption className="text-[10px] font-semibold mt-1.5 leading-snug" style={{ color: INK_45 }}>{title}</figcaption>}
    </figure>
  );
}

function Meta({ rows, accent }) {
  return (
    <dl className="grid gap-y-2" style={{ gridTemplateColumns: '64px 1fr', fontSize: 12, lineHeight: 1.6 }}>
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="font-bold" style={{ color: accent }}>{k}</dt>
          <dd style={{ color: INK_65 }}>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ══ 1. 프로필 표지 (샘플 p1) ══ */
function CoverSlide() {
  const sideProjects = [...APPS.map((a) => `${a.name} (기획·개발·출시)`), `${LEAF.name} (웹 3D 게임 · 7일 단독 개발)`];
  const tools = [...SKILLS['데이터·도구'], ...SKILLS['AI·기술']];
  return (
    <Slide>
      <div className="grid h-full" style={{ gridTemplateColumns: '440px 1fr', gap: 48, paddingBottom: 30 }}>
        {/* 좌: 이름 · 한 문장 · 해시태그 · 연락처 */}
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

        {/* 우: Work / Others / Side Projects / Tools */}
        <div className="grid" style={{ gridTemplateColumns: '1.15fr 1fr', gap: 28 }}>
          <Card style={{ padding: '24px 28px' }}>
            <CardTitle accent={NAVY}>Work</CardTitle>
            <div className="flex flex-col" style={{ gap: 14 }}>
              {CAREERS.map((c) => (
                <div key={c.company} className="flex gap-3">
                  <span className="rounded-full flex-shrink-0 mt-1.5" style={{ width: 9, height: 9, background: BLUE, boxShadow: `0 0 0 3px ${BLUE}22` }} />
                  <div>
                    <p className="text-[13px] font-extrabold" style={{ color: INK }}>{c.company}</p>
                    <p className="text-[10.5px] font-bold" style={{ color: BLUE }}>{c.period}</p>
                    <p className="text-[11px] font-semibold" style={{ color: INK_65 }}>{c.role}</p>
                    {c.intro && <p className="text-[10.5px] leading-[1.6] mt-0.5" style={{ color: INK_45 }}>{c.intro}</p>}
                  </div>
                </div>
              ))}
            </div>
            <CardTitle accent={NAVY}><span className="block mt-6">Others</span></CardTitle>
            <Bullets size={11.5} gap={4} marker="-" accent={INK_45} items={[
              '강남대학교 컴퓨터공학 전공 · 미디어공학 복수전공 (2020.02 졸업)',
              '정보처리기사 (2021.06) · 웹어워드 코리아 금상 (리뉴얼 프로젝트 기획)',
            ]} />
          </Card>

          <div className="flex flex-col" style={{ gap: 28 }}>
            <Card style={{ padding: '24px 28px' }}>
              <CardTitle accent={NAVY}>Side Projects</CardTitle>
              <Bullets size={11.5} gap={4} marker="-" accent={INK_45} items={sideProjects} />
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

/* ══ 2. MAIN PROJECTS 요약 (샘플 p2) ══ */
const MAIN = [
  {
    key: 'KI', name: 'KISTI 고령자 XR 훈련 시스템', role: '기획 · PM (단독)', accent: KISTI, period: '2024.07 — 재직 중 · 국가과제',
    bullets: ['인수 콘텐츠 재설계 — 진입 6단계 → 1~2 depth', '교수자 중앙 제어 운영 구조 확립', '1차 임상 60명 무이슈 · 1년 용역 → 3년차 연장'],
  },
  {
    key: 'ZI', name: 'ZING 캠페인 매칭 플랫폼', role: '기획 · 설계 · 개발 (1인)', accent: ZING, period: '2026.09 · 사내 신사업',
    bullets: ['9개월 미뤄진 구축을 6영업일에 완료', '프로토타입 → 실서비스 구조 (화면 73 · 테이블 47)', '상태 4축 통합 · 자동화 8종 · QA 96항목 설계'],
  },
  {
    key: 'DR', name: '꿈키올래 Vision Pro 직업체험 9종', role: 'PM · 기획 · QA', accent: DREAM, period: '2025 · 서귀포 진로직업체험센터',
    bullets: ['"불가능" 판정을 프레임워크 기획서로 뒤집음', '3 세계관 × 3 직업, 실개발 2개월 납품', '클라이언트 후속 제안 → 한콘진 국가과제로 연결'],
  },
  {
    key: 'WM', name: '웹마인드 B2B 웹 구축 3건', role: '기획 · 주임', accent: WEB, period: '2023.04 — 2024.07',
    bullets: ['제안 PT → 수주 → IA · 화면정의서 → 유지보수', '아마노코리아 리뉴얼 — 웹어워드 코리아 금상', '참여 신규 제안 수주 100%'],
  },
];

function MainProjectsSlide() {
  return (
    <Slide>
      <Head kicker="Main Projects" title="주요 프로젝트 4건 — 역할과 한 일" />
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
                <li key={b} className="text-[11.5px] leading-[1.6]" style={{ color: INK_65 }}>- {b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Slide>
  );
}

/* ══ 3. KISTI (4p) ══ */
function KistiSlides() {
  const [q1, q2, q3, q4] = KISTI_QA;
  const issues = q2.blocks.find((b) => b.type === 'issues').items;
  const [ops, collab] = q3.blocks.filter((b) => b.type === 'cards');
  const stats = q4.blocks.find((b) => b.type === 'stats').items;
  const whyVr = KISTI_FAQ.find((f) => f.q.includes('VR'));
  const team = KISTI_FAQ.find((f) => f.q.includes('몇 명'));
  const chip = 'ETRIBE · 2024.07 — 재직 중 · 국가과제 XR';
  const pairs = ['prepare', 'class', 'monitor'].map((id) => SCREENS.find((s) => s.id === id));

  return (
    <>
      {/* 개요 */}
      <Slide>
        <Head chip={chip} accent={KISTI} title="KISTI 고령자 XR 인지 · 운동 훈련 시스템" />
        <div className="flex flex-col" style={{ flex: 1, minHeight: 0 }}>
          <Split ratio="1.15fr 1fr" left={
            <>
              <CardTitle>프로젝트 개요</CardTitle>
              <Bullets accent={KISTI} items={q1.a} />
              <div className="rounded-xl mt-5 px-4 py-3" style={{ background: `${KISTI}0a`, border: `1px solid ${KISTI}22` }}>
                <p className="text-[11px] font-bold mb-1" style={{ color: KISTI }}>왜 VR이어야 했나 — 몰입이 아니라 측정</p>
                <p className="text-[11px] leading-[1.7]" style={{ color: INK_65 }}>{whyVr.a[1]}</p>
              </div>
            </>
          } right={
            <>
              <Shot src="/images/kisti/prepare-new.png" title="교수자 런처 — 수업 준비 (재설계 후)" />
              <div className="mt-5">
                <Meta accent={KISTI} rows={[
                  ['역할', '기획 → PM. 제안 · 일정 · 기획 · 매니징 · QA · 클라이언트 응대'],
                  ['팀', team.a[0].split(' — ')[0]],
                  ['사용자', '50세 이상 훈련자 · 진행을 주관하는 교수자 (병원)'],
                  ['기간', '6년 사업의 3년차 투입 → 1년 용역이 3년차 운영까지 연장'],
                ]} />
              </div>
            </>
          } />
        </div>
      </Slide>

      {/* 문제정의 | 전략 */}
      <Slide>
        <Head chip={chip} accent={KISTI} title="인수받은 콘텐츠를 고령자가 쓸 수 있게" />
        <div className="flex flex-col" style={{ flex: 1, minHeight: 0 }}>
          <Split left={
            <>
              <CardTitle>문제정의</CardTitle>
              <p className="text-[12px] leading-[1.7] mb-4" style={{ color: INK_65 }}>{q2.a[0]}</p>
              <Bullets accent={KISTI} gap={8} size={12} items={issues.map((c) => ({ t: `${c.num} ${c.title}`, d: c.body }))} />
              <div className="rounded-xl mt-5 px-4 py-3" style={{ background: `${KISTI}0a`, border: `1px solid ${KISTI}22` }}>
                <p className="text-[11px] font-bold mb-1" style={{ color: KISTI }}>가장 막막했던 것 — 어디까지가 확정된 결정인가</p>
                <p className="text-[11px] leading-[1.7]" style={{ color: INK_65 }}>{q2.a[1]}</p>
              </div>
            </>
          } right={
            <>
              <CardTitle>전략 Strategies / Objectives</CardTitle>
              <p className="text-[12px] leading-[1.7] mb-4" style={{ color: INK }}>
                <b>고령자에게 조작을 요구하지 않는다</b> — 계정 연결 · 세션 생성 · 진행 제어를 전부 교수자 PC로 옮기고, 훈련자는 쓰고 움직이기만 하면 되게.
              </p>
              <Bullets accent={KISTI} gap={6} size={12} marker="➤" items={issues.map((c) => c.foot)} />
              <p className="text-[11px] font-bold mt-5 mb-2" style={{ color: KISTI }}>{ops.label}</p>
              <Bullets accent={KISTI} gap={6} size={11.5} marker="▪" items={ops.items.map((c) => ({ t: c.title, d: c.body }))} />
            </>
          } />
        </div>
      </Slide>

      {/* 결과 Key Result */}
      <Slide>
        <Head chip={chip} accent={KISTI} title="임상 60명 무이슈 · 1년 용역이 3년차 운영으로" />
        <div className="grid" style={{ gridTemplateColumns: '1.35fr 1fr', gap: 28, flex: 1, minHeight: 0 }}>
          <Card>
            <CardTitle>결과 Key Result</CardTitle>
            <Bullets accent={KISTI} marker="➤" size={12.5} items={q4.a} />
            <p className="text-[11px] font-bold mt-6 mb-2" style={{ color: KISTI }}>{collab.label}</p>
            <Bullets accent={KISTI} gap={6} size={11.5} marker="▪" items={collab.items.map((c) => ({ t: c.title, d: c.body }))} />
          </Card>
          <div className="flex flex-col" style={{ gap: 20 }}>
            <Panel title="인수 시점 → 현재" accent={KISTI}>
              <Table accent={KISTI} head={['', '인수 시점', '현재']} rows={[
                ['운영 depth', '진입 6단계', '1~2 depth'],
                ['임상', '—', '1차 60명 완료 · 2차 진행'],
                ['계약', '1년 용역', '3년차 운영 · 6년차 논의'],
                ['다음 단계', '—', '기술이전 준비 (클라이언트)'],
              ]} />
            </Panel>
            <Badges accent={KISTI} items={[stats[0], stats[1]].map((s) => ({ num: s.num, label: s.label }))} />
          </div>
        </div>
      </Slide>

      {/* 화면 재설계 */}
      <Slide>
        <Head chip={chip} accent={KISTI} title="화면 재설계 — 인수 시점과 개선 후"
          right={<p className="text-[10.5px] font-semibold text-right" style={{ color: INK_45 }}>7개 화면 전체 비교 → {CONTACT.site}/kisti<br />화면 속 이름 · 영상은 개인정보 보호를 위해 가렸습니다</p>} />
        <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 22, flex: 1, minHeight: 0 }}>
          {pairs.map((s) => (
            <Card key={s.id} style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column' }}>
              <p className="text-[14px] font-extrabold mb-2.5" style={{ color: NAVY }}>{s.label}</p>
              <Shot src={s.old} title="인수 시점" aspect="16 / 8" />
              <Shot src={s.new} title="재설계 후" aspect="16 / 8" style={{ marginTop: 8 }} />
              <p className="text-[10.5px] leading-[1.6] mt-2.5" style={{ color: INK_65 }}>{s.did}</p>
            </Card>
          ))}
        </div>
      </Slide>
    </>
  );
}

/* ══ 4. ZING (4p) ══ */
function ZingSlides() {
  const [q1, q2, q3, q4] = ZING_QA;
  const issues = q2.blocks.find((b) => b.type === 'issues').items;
  const swaps = q3.blocks.find((b) => b.type === 'swaps').items;
  const steps = q3.blocks.find((b) => b.type === 'steps').items;
  const autos = q3.blocks.find((b) => b.type === 'cards');
  const stats = q4.blocks.find((b) => b.type === 'stats').items;
  const chip = 'ETRIBE 사내 신사업 · 2026.09 · 캠페인 플랫폼';
  /* 세로로 긴 문서(IA 트리)는 상단만 잘라 보여주고, 가로형(상태 4축·ERD)은 전체를 담는다 */
  const docs = [['doc-01', 'cover'], ['doc-03', 'contain'], ['doc-04', 'contain']]
    .map(([k, fit]) => ({ ...ZING_DOCS.find((d) => d.src.includes(k)), fit }));
  const shots = ['01-home', '03-campaign', '07-influencer'].map((k) => ZING_SHOTS.find((d) => d.src.includes(k)));

  return (
    <>
      <Slide>
        <Head chip={chip} accent={ZING} title="ZING — 한국 광고주 × 중국 인플루언서 캠페인 매칭 플랫폼" />
        <div className="flex flex-col" style={{ flex: 1, minHeight: 0 }}>
          <Split ratio="1.15fr 1fr" left={
            <>
              <CardTitle>프로젝트 개요</CardTitle>
              <Bullets accent={ZING} items={q1.a} size={12} />
            </>
          } right={
            <>
              <Shot src="/images/zing/01-home.png" title={ZING_SHOTS[0].title} />
              <div className="mt-5">
                <Meta accent={ZING} rows={[
                  ['역할', '기획 · 설계 · 개발 · 문서화 · QA 설계 (1인)'],
                  ['입력', '디자인 시안 · 사업 개요 · 마케터 요건 · Figma Make 프로토타입'],
                  ['사용자', '광고주 · 인플루언서 · ZING 관리자 — 세 콘솔'],
                  ['기간', '6영업일 67커밋 → 비공개 테스트 환경. 다음: 클로즈드 베타'],
                ]} />
              </div>
            </>
          } />
        </div>
      </Slide>

      <Slide>
        <Head chip={chip} accent={ZING} title="완성돼 보이는 프로토타입을 실서비스 구조로" />
        <div className="flex flex-col" style={{ flex: 1, minHeight: 0 }}>
          <Split left={
            <>
              <CardTitle>문제정의</CardTitle>
              <p className="text-[12px] leading-[1.7] mb-4" style={{ color: INK_65 }}>{q2.a[0]}</p>
              <Bullets accent={ZING} gap={8} size={12} items={issues.map((c) => ({ t: `${c.num} ${c.title}`, d: c.body }))} />
            </>
          } right={
            <>
              <CardTitle>전략 Strategies / Objectives</CardTitle>
              <p className="text-[12px] leading-[1.7] mb-3" style={{ color: INK }}>
                <b>설계 원칙 네 개</b> — 돈을 움직이지 않는다 · 기본값은 진행 · 상태는 네 축 · 규칙은 DB 설정값
              </p>
              <p className="text-[12px] leading-[1.7] mb-4" style={{ color: INK_65 }}>{q3.a[1]}</p>
              <p className="text-[11px] font-bold mb-2" style={{ color: ZING }}>버린 것 → 택한 것</p>
              <Bullets accent={ZING} gap={5} size={11.5} marker="➤" items={swaps.slice(0, 5).map((s) => ({ t: s.title, d: `${s.before} → ${s.after}` }))} />
            </>
          } />
        </div>
      </Slide>

      <Slide>
        <Head chip={chip} accent={ZING} title="9개월 미뤄지던 구축을 6영업일에" />
        <div className="grid" style={{ gridTemplateColumns: '1.35fr 1fr', gap: 28, flex: 1, minHeight: 0 }}>
          <Card style={{ display: 'flex', flexDirection: 'column' }}>
            <CardTitle>결과 Key Result</CardTitle>
            <Bullets accent={ZING} marker="➤" size={12.5} items={q4.a} />
            <p className="text-[11px] font-bold mt-5 mb-2" style={{ color: ZING }}>{autos.label}</p>
            <Bullets accent={ZING} gap={6} size={11.5} marker="▪" items={autos.items.map((c) => ({ t: c.title, d: c.body }))} />
            <p className="text-[11px] font-bold mt-auto mb-2" style={{ color: ZING }}>만든 순서 — 6영업일</p>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
              {steps.map((s) => (
                <div key={s.num} className="rounded-lg px-2.5 py-2" style={{ background: `${ZING}0c`, border: `1px solid ${ZING}22` }}>
                  <p className="text-[10px] font-extrabold" style={{ color: ZING }}>{s.num}</p>
                  <p className="text-[11px] font-bold leading-tight" style={{ color: INK }}>{s.title}</p>
                </div>
              ))}
            </div>
          </Card>
          <div className="flex flex-col" style={{ gap: 20 }}>
            <Panel title="설계 → 문서 → QA" accent={ZING}>
              <Table accent={ZING} head={['', '인수 시점', '6영업일 후']} rows={[
                ['화면', '라우팅 41 · 미연결 40', '73 (문서화)'],
                ['상태 모델', 'enum 6벌 이상', '4축 통합'],
                ['데이터', 'mock · localStorage', '테이블 47 · 자동화 8종'],
                ['QA', '—', '96항목 · 1차 13건 반영'],
              ]} />
            </Panel>
            <Badges accent={ZING} items={[stats[0], stats[2]].map((s) => ({ num: s.num, label: s.label }))} />
          </div>
        </div>
      </Slide>

      <Slide>
        <Head chip={chip} accent={ZING} title="기획 산출물과 실제 화면"
          right={<p className="text-[10.5px] font-semibold text-right" style={{ color: INK_45 }}>산출물 6종 · 화면 6종 전체 → {CONTACT.site}/zing<br />내부 정책 수치는 가렸습니다</p>} />
        <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: '1fr 1fr', gap: 18, flex: 1, minHeight: 0 }}>
          {docs.map((d) => <Shot key={d.src} src={d.src} title={d.title} aspect="16 / 8.6" fit={d.fit} />)}
          {shots.map((d) => <Shot key={d.src} src={d.src} title={d.title} aspect="16 / 8.6" />)}
        </div>
      </Slide>
    </>
  );
}

/* ══ 5. 꿈키올래 (2p) ══ */
function DreamSlides() {
  const [, q2, q3, q4] = DREAM_QA;
  const limits = q2.blocks.find((b) => b.type === 'cards').items;
  const worlds = q3.blocks.find((b) => b.type === 'cards').items;
  const stats = q4.blocks.find((b) => b.type === 'stats').items;
  const chip = 'ETRIBE · 서귀포 진로직업체험센터 납품 · Apple Vision Pro';
  const shots = [0, 3, 6, 7].map((i) => DREAM_SHOTS[i]);

  return (
    <>
      <Slide>
        <Head chip={chip} accent={DREAM} title="꿈키올래 — Vision Pro 직업체험 9종, 실개발 2개월" />
        <div className="flex flex-col" style={{ flex: 1, minHeight: 0 }}>
          <Split left={
            <>
              <CardTitle>문제정의</CardTitle>
              <p className="text-[12px] leading-[1.7] mb-4" style={{ color: INK_65 }}>{q2.a[0]}</p>
              <Bullets accent={DREAM} gap={8} size={12} items={limits.map((c) => ({ t: `${c.num} ${c.title}`, d: c.body }))} />
            </>
          } right={
            <>
              <CardTitle>전략 Strategies / Objectives</CardTitle>
              <p className="text-[12px] leading-[1.7] mb-4" style={{ color: INK_65 }}>{q3.a[0]}</p>
              <Bullets accent={DREAM} gap={8} size={12} marker="➤" items={[
                { t: '수주 판단을 미루고 기획서를 먼저', d: '주말 · 연휴에 모든 직업이 같은 절차(인트로 · 메인 미션 · 미니게임 · 진로 정보)를 공유하는 프레임워크 기획서를 썼고, 개발자의 판단이 "불가능"에서 "가능"으로 바뀌었습니다.' },
                { t: '한 달치 상세 기획을 스스로 폐기', d: '"이 분량이면 2종에 두 달" — 직업당 30분 깊이를 버리고 전체 40~50분으로 조정했습니다.' },
                { t: '폭포수 대신 병렬 파이프라인', d: '1종을 기획하는 즉시 개발로 넘겨 기획 · 개발 · 검수를 반복. 외주 없이 9종이 일정 안에 들어왔습니다.' },
              ]} />
              <p className="text-[11px] font-bold mt-4 mb-2" style={{ color: DREAM }}>3 세계관 × 3 직업</p>
              <Bullets accent={DREAM} gap={3} size={11.5} marker="▪" items={worlds.map((w) => `${w.title} — ${w.foot}`)} />
            </>
          } />
        </div>
      </Slide>

      <Slide>
        <Head chip={chip} accent={DREAM} title="9종 기한 내 납품 · 후속 제안 → 국가과제로" />
        <div className="grid" style={{ gridTemplateColumns: '1fr 1.3fr', gap: 28, flex: 1, minHeight: 0 }}>
          <div className="flex flex-col" style={{ gap: 20 }}>
            <Card className="flex-1">
              <CardTitle>결과 Key Result</CardTitle>
              <Bullets accent={DREAM} marker="➤" size={12.5} items={q4.a} />
              <div className="grid grid-cols-2 gap-2 mt-5">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-xl px-3 py-2.5" style={{ background: `${DREAM}0c`, border: `1px solid ${DREAM}22` }}>
                    <p className="text-[17px] font-extrabold leading-none" style={{ color: DREAM }}>{s.num}</p>
                    <p className="text-[10.5px] font-bold mt-1" style={{ color: INK_65 }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <Card style={{ padding: 22, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 14 }}>
            {shots.map((s) => <Shot key={s.src} src={s.src} title={s.title} aspect="16 / 9.4" />)}
          </Card>
        </div>
      </Slide>
    </>
  );
}

/* ══ 6. 웹마인드 (1p) ══ */
function WebmindSlide() {
  const [q1, , q3, q4] = WEBMIND_QA;
  const posts = q3.blocks.find((b) => b.type === 'posts').items;
  const stats = q4.blocks.find((b) => b.type === 'stats').items;
  return (
    <Slide>
      <Head chip="웹마인드 · 2023.04 — 2024.07 · B2B 웹 구축" accent={WEB} title="B2B 웹 구축 3건 — 제안 PT부터 유지보수까지" />
      <div className="grid" style={{ gridTemplateColumns: '1.35fr 1fr', gap: 28, flex: 1, minHeight: 0 }}>
        <Card style={{ display: 'flex', flexDirection: 'column' }}>
          <CardTitle>결과 Key Result</CardTitle>
          <Bullets accent={WEB} marker="➤" size={12} items={[q1.a[0], q3.a[0], q4.a[0]]} />
          <div className="grid mt-auto" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {posts.map((p) => (
              <div key={p.client}>
                <Shot src={p.thumb} aspect="16 / 9" />
                <p className="text-[11px] font-extrabold mt-2" style={{ color: INK }}>{p.title}</p>
                <p className="text-[10px] font-semibold" style={{ color: WEB }}>{p.client}</p>
              </div>
            ))}
          </div>
        </Card>
        <div className="flex flex-col" style={{ gap: 20 }}>
          <Panel title="프로젝트별 성과" accent={WEB}>
            <Table accent={WEB} head={['클라이언트', '한 일', '결과']} rows={posts.map((p) => [p.client.split(' — ')[0], p.title, p.tags.slice(-1)[0]])} />
          </Panel>
          <Badges accent={WEB} items={[stats[1], stats[0]].map((s) => ({ num: s.num, label: s.label }))} />
        </div>
      </div>
    </Slide>
  );
}

/* ══ 7. SIDE PROJECTS (1~2p) ══ */
function SideSlides({ full }) {
  const all = [...APPS, LEAF];
  const quiz = APPS.find((a) => a.id === 'quizking');
  const funnel = quiz.decisions.find((d) => d.t.includes('거리'));
  const pill = APPS.find((a) => a.id === 'pillstack');
  const judge = pill.decisions[0];

  return (
    <>
      <Slide>
        <Head kicker="Side Projects" accent={SOLO} title="혼자 기획하고 출시한 앱 5종 + 웹 3D 게임 1종"
          right={<p className="text-[10.5px] font-semibold text-right" style={{ color: INK_45 }}>앱인토스 미니앱 4종 · Google Play 1종 · 웹 게임 1종<br />기획 판단 전문 → {CONTACT.site}/solo</p>} />
        <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: '1fr 1fr', gap: 18, flex: 1, minHeight: 0 }}>
          {all.map((a) => (
            <Card key={a.id} style={{ padding: '18px 20px', display: 'grid', gridTemplateColumns: a.shots ? '78px 1fr' : '1fr', gap: 16, borderTop: `4px solid ${a.color}` }}>
              {a.shots && (
                <div className="overflow-hidden rounded-xl" style={{ aspectRatio: '390 / 844', border: `1px solid ${LINE}`, background: BG }}>
                  <img src={a.shots[0].src} alt={a.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                </div>
              )}
              <div className="min-w-0 flex flex-col">
                <p className="text-[14px] font-extrabold leading-tight" style={{ color: NAVY }}>{a.name}</p>
                <p className="text-[10px] font-bold mt-0.5" style={{ color: a.color }}>{a.category} · {a.released}</p>
                <p className="text-[11px] leading-[1.6] mt-2" style={{ color: INK_65 }}>{a.summary}</p>
                <p className="text-[10.5px] font-bold mt-auto pt-2 leading-snug" style={{ color: INK }}>“{a.why.question}”</p>
              </div>
            </Card>
          ))}
        </div>
      </Slide>

      {full && (
        <Slide>
          <Head kicker="Side Projects" accent={SOLO} title="출시작에서 돌려본 것 — 관측 → 가설 → 조치 → 확인" />
          <div className="grid" style={{ gridTemplateColumns: '1.2fr 1fr', gap: 28, flex: 1, minHeight: 0 }}>
            <Split ratio="1fr 118px" gap={24} left={
              <>
                <CardTitle>기획 판단</CardTitle>
                <Bullets accent={SOLO} gap={12} size={12} marker="➤" items={[
                  { t: `${quiz.name} — ${funnel.t}`, d: funnel.d },
                  { t: `${pill.name} — ${judge.t}`, d: judge.d },
                ]} />
              </>
            } right={
              <div className="flex flex-col" style={{ gap: 10 }}>
                {quiz.shots.map((s) => (
                  <div key={s.src} className="overflow-hidden rounded-lg" style={{ aspectRatio: '390 / 640', border: `1px solid ${LINE}`, background: BG }}>
                    <img src={s.src} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                  </div>
                ))}
              </div>
            } />
            <Card>
              <CardTitle>회고 — 다섯 개 다 출시했지만, 유저는 만들지 못했습니다</CardTitle>
              <Bullets accent={SOLO} gap={12} size={12} items={LEARNED} />
              <p className="text-[10.5px] leading-[1.7] mt-5 rounded-xl px-3.5 py-3" style={{ background: `${SOLO}0a`, border: `1px solid ${SOLO}22`, color: INK_65 }}>
                표본이 작아 지표로 단정하지 않습니다. 유저 행동을 관측해 가설을 세우고, 제품을 바꾸고, 결과를 확인하는 루프를 실제 출시작에서 돌려본 기록입니다.
              </p>
            </Card>
          </div>
        </Slide>
      )}
    </>
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
            화면별 전후 비교 전체, 앱 5종의 기획 판단 전문, ZING 기획 산출물 6종은{' '}
            <A href={`https://${CONTACT.site}`}><span style={{ color: '#9db4ff', fontWeight: 700 }}>{CONTACT.site}</span></A>에 있습니다.
            이 문서와 웹사이트는 같은 코드에서 생성됩니다.
          </p>
        </div>
        <div className="flex items-end justify-between">
          <p className="text-[22px] font-extrabold">{CONTACT.name} <span className="text-[13px] font-semibold" style={{ color: 'rgba(255,255,255,0.55)' }}>— {CONTACT.position}</span></p>
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
export default function Print({ variant = 'b2b' }) {
  const isB2c = variant === 'b2c';
  return (
    <div style={{ background: '#2c3040', counterReset: 'pn' }}>
      <title>{`유희수 — 포트폴리오 PDF (${isB2c ? 'B2C' : 'B2B'})`}</title>
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
          PDF 조판 미리보기 (16:9) — {isB2c ? 'B2C/플랫폼용' : 'B2B/SaaS용'}
        </p>
        <div className="flex gap-2">
          <a href={isB2c ? '/print/b2b' : '/print/b2c'}
            className="px-3.5 py-1.5 rounded-full text-[11.5px] font-bold"
            style={{ background: 'rgba(255,255,255,0.12)', color: '#fff' }}>
            {isB2c ? 'B2B판 보기' : 'B2C판 보기'}
          </a>
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
      {isB2c ? (
        <>
          <DreamSlides />
          <SideSlides full />
          <WebmindSlide />
        </>
      ) : (
        <>
          <WebmindSlide />
          <DreamSlides />
          <SideSlides full={false} />
        </>
      )}
      <ClosingSlide />
    </div>
  );
}
