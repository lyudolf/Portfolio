/* ══════════════════════════════════════════
   /print/:variant — PDF 포트폴리오 조판 라우트

   설계서: memory plan-pdf-portfolio.md (A4 가로 · 12~15p · KISTI 고정 + 스왑)
   - /print/b2b : 스왑 슬롯 = 웹마인드 (엔카·원티드랩 등 B2B/SaaS 지원용)
   - /print/b2c : 스왑 슬롯 = Solo Work (토스·당근·컬리 등 B2C/플랫폼 지원용)

   원칙: 콘텐츠는 전부 기존 페이지의 export 데이터를 재사용한다.
   사이트 카피를 고치면 PDF도 같이 최신화되는 단일 원본 구조 —
   "포트폴리오를 코드로 만든 기획자" 자체가 증거라는 설계서 의도.

   PDF 추출: 브라우저 Ctrl+P(여백 없음·배경 그래픽 켜기) 또는
   playwright page.pdf() (링크 보존은 playwright 쪽만 됨). */

import { QA as KISTI_QA, SCREENS, FAQ as KISTI_FAQ } from './Kisti';
import { QA as WEBMIND_QA } from './Webmind';
import { APPS, LEARNED } from './SoloWork';
import { KEY_RESULTS, CAREERS, SKILLS } from './Resume';

/* ── 표지·직업관 확정본 (plan-pdf-portfolio.md 2026-09-01) ── */
const COVER_MAIN_1 = '도메인은 VR, 앱, 웹으로 계속 바뀌었지만,';
const COVER_MAIN_2 = '하는 일은 같았습니다.';
const COVER_SUB = '문제를 정의하고, 제약 안에서 구조를 잡고, 현장에서 검증합니다.';
const COVER_TAG = '해상도를 높이는 기획자';
const WORLDVIEW =
  '기획은 그럴듯한 문서가 아니라 실제로 굴러가는 결과로 끝난다고 생각합니다. ' +
  '그래서 화면 뒤에 숨은 리스크까지 미리 짚고, 만든 뒤에는 예상대로 움직이는지 확인될 때까지 손을 떼지 않습니다. ' +
  '깊게 파고들어 세운 가설이 현실에서 맞아떨어질 때의 희열 — 그게 저를 계속 움직이는 힘입니다.';

const CONTACT = {
  name: '유희수',
  position: '서비스 기획 · PM',
  email: 'iplay3473@gmail.com',
  site: 'lyuheesu.com',
  github: 'github.com/lyudolf',
};

/* ── 톤 ── */
const INK = 'rgba(20,26,22,0.92)';
const INK_70 = 'rgba(20,26,22,0.7)';
const INK_50 = 'rgba(20,26,22,0.5)';
const INK_35 = 'rgba(20,26,22,0.35)';
const LINE = 'rgba(20,26,22,0.1)';
const KISTI_ACCENT = '#1540c9';
const WEB_ACCENT = '#0d6b46';
const SOLO_ACCENT = '#6d4fd6';
const GREEN = '#0f8f74';

/* A4 가로 한 장. 화면에서는 세로로 쌓인 미리보기, 인쇄 시 페이지 단위로 넘어간다. */
function Page({ children, pad = true, style }) {
  return (
    <section className="pp" style={{ padding: pad ? '13mm 15mm' : 0, ...style }}>
      {children}
    </section>
  );
}

/* 페이지 상단 러닝 헤드 — 지금 어느 장인지 + 어느 문서인지 */
function RunningHead({ section, accent }) {
  return (
    <div className="flex items-baseline justify-between mb-[7mm] pb-[3mm]"
      style={{ borderBottom: `1px solid ${LINE}` }}>
      <p className="text-[10px] font-bold tracking-[0.22em] uppercase" style={{ color: accent ?? INK_35 }}>
        {section}
      </p>
      <p className="text-[9px] font-semibold" style={{ color: INK_35 }}>
        유희수 — 서비스 기획 · PM · {CONTACT.site}
      </p>
    </div>
  );
}

function H({ children, accent }) {
  return (
    <h2 className="text-[22px] font-extrabold leading-[1.3] mb-[5mm]"
      style={{ color: INK, letterSpacing: '-0.025em' }}>
      <span style={{ color: accent ?? INK }}>{children}</span>
    </h2>
  );
}

function Stat({ s, accent }) {
  return (
    <div className="rounded-xl px-3 py-3 text-center"
      style={{ background: `${accent}0a`, border: `1px solid ${accent}22` }}>
      <p className="text-[19px] font-extrabold leading-none" style={{ color: accent }}>{s.num}</p>
      <p className="text-[10.5px] font-semibold mt-1.5" style={{ color: INK_70 }}>{s.label}</p>
      {s.sub && <p className="text-[9.5px] mt-0.5" style={{ color: INK_35 }}>{s.sub}</p>}
    </div>
  );
}

/* ══ 1. 표지 ══ */
function CoverPage() {
  return (
    <Page pad={false} style={{ background: '#12211a', color: '#fff' }}>
      <div className="h-full flex flex-col justify-between" style={{ padding: '16mm 18mm' }}>
        <div className="flex items-baseline justify-between">
          <p className="text-[11px] font-bold tracking-[0.26em] uppercase" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Portfolio · 2026
          </p>
          <p className="text-[11px] font-semibold" style={{ color: 'rgba(255,255,255,0.45)' }}>{CONTACT.site}</p>
        </div>

        <div>
          <h1 className="text-[34px] font-extrabold leading-[1.4]" style={{ letterSpacing: '-0.03em' }}>
            {COVER_MAIN_1}<br />{COVER_MAIN_2}
          </h1>
          <p className="text-[15px] leading-[1.9] mt-[6mm]" style={{ color: 'rgba(255,255,255,0.72)' }}>
            {COVER_SUB}
          </p>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-[12px] font-bold tracking-[0.08em] mb-1" style={{ color: '#7ef1d6' }}>{COVER_TAG}</p>
            <p className="text-[21px] font-extrabold">{CONTACT.name} <span className="text-[13px] font-semibold" style={{ color: 'rgba(255,255,255,0.55)' }}>— {CONTACT.position}</span></p>
          </div>
          <div className="text-right text-[11px] leading-[1.9]" style={{ color: 'rgba(255,255,255,0.6)' }}>
            <p>{CONTACT.email}</p>
            <p>{CONTACT.site} · {CONTACT.github}</p>
          </div>
        </div>
      </div>
    </Page>
  );
}

/* ══ 2. 이력서 1p + 직업관 ══ */
function ResumePage() {
  return (
    <Page>
      <RunningHead section="Resume" accent={GREEN} />
      <div className="grid grid-cols-[1.5fr_1fr] gap-[10mm] h-[164mm]">
        {/* 좌: 경력 */}
        <div>
          <H>경력 — 총 3년 4개월</H>
          <div className="flex flex-col gap-[5mm]">
            {CAREERS.map((c) => (
              <div key={c.company}>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-[13.5px] font-bold" style={{ color: INK }}>{c.company}</h3>
                  <span className="text-[10px] font-semibold" style={{ color: INK_35 }}>{c.period}</span>
                </div>
                <p className="text-[10.5px] font-semibold mb-1" style={{ color: INK_50 }}>{c.role}</p>
                {c.intro && <p className="text-[11px] leading-[1.7] mb-1" style={{ color: INK_70 }}>{c.intro}</p>}
                <ul className="flex flex-col gap-0.5">
                  {c.bullets.slice(0, 3).map((b) => (
                    <li key={b.slice(0, 16)} className="flex gap-1.5 text-[10.5px] leading-[1.65]" style={{ color: INK_70 }}>
                      <span style={{ color: INK_35 }}>·</span><span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 우: 성과·스킬·직업관 */}
        <div className="flex flex-col gap-[6mm]">
          <div>
            <p className="text-[11px] font-bold tracking-[0.16em] uppercase mb-2" style={{ color: GREEN }}>Key Results</p>
            <div className="grid grid-cols-2 gap-2">
              {KEY_RESULTS.map((s) => <Stat key={s.label} s={s} accent={GREEN} />)}
            </div>
          </div>
          <div>
            <p className="text-[11px] font-bold tracking-[0.16em] uppercase mb-2" style={{ color: GREEN }}>Skills</p>
            <div className="flex flex-col gap-1.5">
              {Object.entries(SKILLS).map(([group, items]) => (
                <div key={group} className="flex flex-wrap gap-1 items-baseline">
                  <span className="text-[9.5px] font-bold w-full" style={{ color: INK_50 }}>{group}</span>
                  {items.map((s) => (
                    <span key={s} className="text-[9px] font-medium px-1.5 py-0.5 rounded-full"
                      style={{ background: 'rgba(20,26,22,0.045)', border: `1px solid ${LINE}`, color: INK_70 }}>
                      {s}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-auto rounded-xl p-4" style={{ background: `${GREEN}08`, border: `1px solid ${GREEN}22` }}>
            <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-2" style={{ color: GREEN }}>일하는 방식</p>
            <p className="text-[10.5px] leading-[1.85]" style={{ color: INK_70 }}>{WORLDVIEW}</p>
          </div>
        </div>
      </div>
    </Page>
  );
}

/* ══ 3. KISTI (고정 앵커 · 4p) ══ */
function KistiPages() {
  const [q1, q2, q3, q4] = KISTI_QA;
  const issues = q2.blocks.find((b) => b.type === 'issues').items;
  const opCards = q3.blocks.filter((b) => b.type === 'cards');
  const stats = q4.blocks.find((b) => b.type === 'stats').items;
  const whyVr = KISTI_FAQ.find((f) => f.q.includes('VR'));
  const pairA = SCREENS.find((s) => s.id === 'prepare');
  const pairB = SCREENS.find((s) => s.id === 'class');

  return (
    <>
      {/* p1 개요 + 문제 */}
      <Page>
        <RunningHead section="Project 01 — KISTI 고령자 XR 훈련 시스템" accent={KISTI_ACCENT} />
        <div className="grid grid-cols-2 gap-[12mm]">
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: KISTI_ACCENT }}>{q1.q}</p>
            {q1.a.map((p) => (
              <p key={p.slice(0, 16)} className="text-[11.5px] leading-[1.85] mb-2.5" style={{ color: INK_70 }}>{p}</p>
            ))}
            {whyVr && (
              <div className="rounded-xl p-3.5 mt-1" style={{ background: `${KISTI_ACCENT}08`, border: `1px solid ${KISTI_ACCENT}20` }}>
                <p className="text-[10px] font-bold mb-1" style={{ color: KISTI_ACCENT }}>왜 VR이어야 했나</p>
                <p className="text-[10px] leading-[1.75]" style={{ color: INK_70 }}>{whyVr.a[1]}</p>
              </div>
            )}
          </div>
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: KISTI_ACCENT }}>{q2.q}</p>
            {q2.a.map((p) => (
              <p key={p.slice(0, 16)} className="text-[11.5px] leading-[1.85] mb-2.5" style={{ color: INK_70 }}>{p}</p>
            ))}
          </div>
        </div>
      </Page>

      {/* p2 인수 시점 문제 4 + 대응 */}
      <Page>
        <RunningHead section="Project 01 — KISTI" accent={KISTI_ACCENT} />
        <H accent={KISTI_ACCENT}>인수 시점의 문제와 대응</H>
        <div className="grid grid-cols-2 gap-[6mm]">
          {issues.map((c) => (
            <div key={c.title} className="rounded-xl p-4" style={{ border: `1px solid ${LINE}` }}>
              <div className="flex gap-3 items-start">
                <span className="text-[24px] font-extrabold leading-none" style={{ color: KISTI_ACCENT, opacity: 0.3 }}>{c.num}</span>
                <div>
                  <p className="text-[13px] font-bold mb-1" style={{ color: INK }}>{c.title}</p>
                  <p className="text-[10.5px] leading-[1.7] mb-2" style={{ color: INK_70 }}>{c.body}</p>
                  <p className="text-[10.5px] font-bold px-2.5 py-1.5 rounded-lg inline-block"
                    style={{ background: `${KISTI_ACCENT}10`, color: INK }}>
                    → {c.foot}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Page>

      {/* p3 판단 — 운영 설계 + 협업 재정비 */}
      <Page>
        <RunningHead section="Project 01 — KISTI" accent={KISTI_ACCENT} />
        <H accent={KISTI_ACCENT}>{q3.q}</H>
        <p className="text-[11.5px] leading-[1.85] mb-[5mm]" style={{ color: INK_70, maxWidth: '190mm' }}>{q3.a[1]}</p>
        <div className="grid grid-cols-2 gap-[8mm]">
          {opCards.map((block) => (
            <div key={block.label}>
              <p className="text-[11px] font-bold mb-2.5" style={{ color: KISTI_ACCENT }}>{block.label}</p>
              <div className="flex flex-col gap-2">
                {block.items.map((c) => (
                  <div key={c.title} className="rounded-lg px-3.5 py-2.5" style={{ border: `1px solid ${LINE}` }}>
                    <p className="text-[11px] font-bold mb-0.5" style={{ color: INK }}>{c.title}</p>
                    <p className="text-[9.8px] leading-[1.65]" style={{ color: INK_70 }}>{c.body}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Page>

      {/* p4 전후 비교 2세트 + 결과 */}
      <Page>
        <RunningHead section="Project 01 — KISTI" accent={KISTI_ACCENT} />
        <div className="grid grid-cols-[1.6fr_1fr] gap-[10mm] h-[164mm]">
          <div>
            <H accent={KISTI_ACCENT}>화면 재설계 — 인수 시점과 개선 후</H>
            {[pairA, pairB].map((s) => (
              <div key={s.id} className="mb-[5mm]">
                <div className="grid grid-cols-2 gap-2 mb-1.5">
                  {[['인수 시점', s.old], ['재설계 후', s.new]].map(([tag, src]) => (
                    <figure key={tag}>
                      <img src={src} alt={`${s.label} — ${tag}`} className="w-full rounded-lg"
                        style={{ border: `1px solid ${LINE}`, aspectRatio: '16/10', objectFit: 'cover' }} />
                      <figcaption className="text-[8.5px] mt-0.5 font-semibold" style={{ color: INK_35 }}>
                        {s.label} · {tag}
                      </figcaption>
                    </figure>
                  ))}
                </div>
                <p className="text-[9.8px] leading-[1.65]" style={{ color: INK_70 }}>{s.did}</p>
              </div>
            ))}
            <p className="text-[9px]" style={{ color: INK_35 }}>
              ※ 7개 화면 전체의 전후 비교는 {CONTACT.site}/kisti 에서 볼 수 있습니다. 화면 속 이름·영상은 개인정보 보호를 위해 가렸습니다.
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: KISTI_ACCENT }}>{q4.q}</p>
            {q4.a.map((p) => (
              <p key={p.slice(0, 16)} className="text-[10.5px] leading-[1.8] mb-2" style={{ color: INK_70 }}>{p}</p>
            ))}
            <div className="grid grid-cols-2 gap-2 mt-auto">
              {stats.map((s) => <Stat key={s.label} s={s} accent={KISTI_ACCENT} />)}
            </div>
          </div>
        </div>
      </Page>
    </>
  );
}

/* ══ 4a. 스왑 — 웹마인드 (B2B) ══ */
function WebmindPage({ sub = false, order = 'Project 02' }) {
  const [q1, q2, q3, q4] = WEBMIND_QA;
  const posts = q3.blocks.find((b) => b.type === 'posts').items;
  const stats = q4.blocks.find((b) => b.type === 'stats').items;
  return (
    <Page>
      <RunningHead section={`${order} — 웹마인드 · B2B 웹 구축`} accent={WEB_ACCENT} />
      <div className="grid grid-cols-[1fr_1.5fr] gap-[10mm] h-[164mm]">
        <div className="flex flex-col">
          <H accent={WEB_ACCENT}>발주사의 추상적 요구를<br />서비스 구조로 번역하기</H>
          <p className="text-[11px] leading-[1.85] mb-2.5" style={{ color: INK_70 }}>{q1.a[0]}</p>
          <p className="text-[11px] leading-[1.85] mb-2.5" style={{ color: INK_70 }}>{q2.a[0]}</p>
          {!sub && <p className="text-[11px] leading-[1.85]" style={{ color: INK_70 }}>{q3.a[0]}</p>}
          <div className="grid grid-cols-2 gap-2 mt-auto">
            {stats.map((s) => <Stat key={s.label} s={s} accent={WEB_ACCENT} />)}
          </div>
        </div>
        <div className="flex flex-col gap-[4mm]">
          {posts.map((p) => (
            <div key={p.client} className="grid grid-cols-[52mm_1fr] gap-[4mm] rounded-xl overflow-hidden"
              style={{ border: `1px solid ${LINE}` }}>
              <img src={p.thumb} alt={p.client} className="w-full h-full object-cover" style={{ minHeight: '30mm' }} />
              <div className="py-2.5 pr-3">
                <p className="text-[9.5px] font-semibold" style={{ color: WEB_ACCENT }}>{p.client}</p>
                <p className="text-[12px] font-bold mb-1" style={{ color: INK }}>{p.title}</p>
                <p className="text-[9.8px] leading-[1.65]" style={{ color: INK_70 }}>{p.body}</p>
                <p className="text-[8.5px] mt-1 font-semibold" style={{ color: INK_35 }}>{p.tags.join(' · ')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}

/* ══ 4b. 스왑 — Solo Work (B2C) ══ */
function SoloPages({ sub = false, order = 'Project 02' }) {
  const quiz = APPS.find((a) => a.id === 'quizking');
  const funnel = quiz.decisions.find((d) => d.t.includes('거리'));

  const overview = (
    <Page>
      <RunningHead section={`${order} — Solo Work · 혼자 기획하고 출시한 앱 5종`} accent={SOLO_ACCENT} />
      <H accent={SOLO_ACCENT}>기획서가 아니라 출시로 검증했습니다</H>
      <p className="text-[11px] leading-[1.85] mb-[5mm]" style={{ color: INK_70, maxWidth: '190mm' }}>
        토스 앱인토스 미니앱 4종과 Google Play 앱 1종을 기획 · 개발 · 심사 대응 · 출시까지 단독으로
        수행했습니다. 수익 모델과 스토어 심사, 공공데이터 연동까지 B2C 제품이 실제로 세상에 나가는
        전 과정을 직접 통과한 기록입니다.
      </p>
      <div className="grid grid-cols-5 gap-[4mm]">
        {APPS.map((a) => (
          <div key={a.id} className="rounded-xl p-3 flex flex-col" style={{ border: `1px solid ${LINE}`, borderTop: `3px solid ${a.color}` }}>
            <p className="text-[11.5px] font-extrabold leading-tight mb-0.5" style={{ color: INK }}>{a.name}</p>
            <p className="text-[8.5px] font-semibold mb-1.5" style={{ color: INK_35 }}>{a.category} · {a.released}</p>
            <p className="text-[9.3px] leading-[1.6]" style={{ color: INK_70 }}>{a.summary}</p>
            <p className="text-[8.5px] mt-auto pt-2 font-bold" style={{ color: a.color }}>
              기획 판단 {a.decisions.length}건 → {CONTACT.site}/solo
            </p>
          </div>
        ))}
      </div>
    </Page>
  );

  if (sub) return overview;

  return (
    <>
      {overview}
      <Page>
        <RunningHead section={`${order} — Solo Work`} accent={SOLO_ACCENT} />
        <div className="grid grid-cols-2 gap-[10mm] h-[164mm]">
          <div className="flex flex-col">
            <H accent={SOLO_ACCENT}>관측 → 가설 → 조치 → 확인</H>
            <p className="text-[11px] font-bold mb-1.5" style={{ color: INK }}>{quiz.name} — {funnel.t}</p>
            <p className="text-[11px] leading-[1.85]" style={{ color: INK_70 }}>{funnel.d}</p>
            <div className="rounded-xl p-3.5 mt-auto" style={{ background: `${SOLO_ACCENT}08`, border: `1px solid ${SOLO_ACCENT}20` }}>
              <p className="text-[10px] leading-[1.75]" style={{ color: INK_70 }}>
                표본이 작아 지표로 단정하지 않습니다 — 다만 유저 행동을 관측해 가설을 세우고,
                제품을 바꾸고, 결과를 확인하는 루프를 실제 출시작에서 돌려본 기록입니다.
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <H>다섯 개 다 출시했지만,<br />유저는 만들지 못했습니다</H>
            <div className="flex flex-col gap-2.5">
              {LEARNED.map((l) => (
                <div key={l.t} className="rounded-lg px-3.5 py-2.5" style={{ border: `1px solid ${LINE}` }}>
                  <p className="text-[11px] font-bold mb-0.5" style={{ color: INK }}>{l.t}</p>
                  <p className="text-[9.8px] leading-[1.65]" style={{ color: INK_70 }}>{l.d}</p>
                </div>
              ))}
            </div>
            <p className="text-[9px] mt-auto" style={{ color: INK_35 }}>
              실패를 지우지 않고 적었습니다 — 다음 제품에서 무엇부터 다르게 할지가 여기서 나왔기 때문입니다.
            </p>
          </div>
        </div>
      </Page>
    </>
  );
}

/* ══ 5. 클로징 ══ */
function ClosingPage() {
  return (
    <Page pad={false} style={{ background: '#12211a', color: '#fff' }}>
      <div className="h-full flex flex-col justify-between" style={{ padding: '16mm 18mm' }}>
        <p className="text-[11px] font-bold tracking-[0.26em] uppercase" style={{ color: 'rgba(255,255,255,0.45)' }}>
          More
        </p>
        <div>
          <h1 className="text-[28px] font-extrabold leading-[1.45]" style={{ letterSpacing: '-0.03em' }}>
            여기 실린 것은 일부입니다.<br />
            화면별 전후 비교, 앱 5종의 기획 판단 전문,<br />
            AI 실험 기록까지 — <span style={{ color: '#7ef1d6' }}>{CONTACT.site}</span>
          </h1>
          <p className="text-[13px] leading-[1.9] mt-[6mm]" style={{ color: 'rgba(255,255,255,0.65)' }}>
            이 문서와 웹사이트는 같은 코드에서 생성됩니다. 사이트의 문장을 고치면 이 PDF도 함께
            바뀝니다 — 산출물을 하나의 원본으로 관리하는 것도 기획의 일부라고 생각합니다.
          </p>
        </div>
        <div className="flex items-end justify-between">
          <p className="text-[19px] font-extrabold">{CONTACT.name} <span className="text-[12px] font-semibold" style={{ color: 'rgba(255,255,255,0.55)' }}>— {CONTACT.position}</span></p>
          <div className="text-right text-[11px] leading-[1.9]" style={{ color: 'rgba(255,255,255,0.6)' }}>
            <p>{CONTACT.email}</p>
            <p>{CONTACT.site} · {CONTACT.github}</p>
          </div>
        </div>
      </div>
    </Page>
  );
}

/* ═══ 메인 ═══ */
export default function Print({ variant = 'b2b' }) {
  const isB2c = variant === 'b2c';
  return (
    <div style={{ background: '#3a3f3c' }}>
      <title>{`유희수 — 포트폴리오 PDF (${isB2c ? 'B2C' : 'B2B'})`}</title>
      <meta name="robots" content="noindex" />
      <style>{`
        @page { size: A4 landscape; margin: 0; }
        .pp {
          width: 297mm; height: 210mm;
          background: #fff; overflow: hidden;
          box-sizing: border-box;
          break-after: page;
        }
        @media screen {
          .pp { margin: 10mm auto; box-shadow: 0 10px 40px rgba(0,0,0,0.4); }
        }
        @media print {
          body { background: #fff !important; }
          .pp { margin: 0; box-shadow: none; }
          .print-toolbar { display: none; }
        }
      `}</style>

      {/* 화면 전용 툴바 */}
      <div className="print-toolbar sticky top-0 z-40 flex items-center justify-between px-5 py-2.5"
        style={{ background: 'rgba(18,33,26,0.92)', backdropFilter: 'blur(10px)' }}>
        <p className="text-[12px] font-bold" style={{ color: 'rgba(255,255,255,0.85)' }}>
          PDF 조판 미리보기 — {isB2c ? 'B2C/플랫폼용 (Solo Work 스왑)' : 'B2B/SaaS용 (웹마인드 스왑)'}
        </p>
        <div className="flex gap-2">
          <a href={isB2c ? '/print/b2b' : '/print/b2c'}
            className="px-3.5 py-1.5 rounded-full text-[11.5px] font-bold"
            style={{ background: 'rgba(255,255,255,0.12)', color: '#fff' }}>
            {isB2c ? 'B2B판 보기' : 'B2C판 보기'}
          </a>
          <button onClick={() => window.print()}
            className="px-3.5 py-1.5 rounded-full text-[11.5px] font-bold cursor-pointer"
            style={{ background: '#7ef1d6', color: '#12211a' }}>
            PDF로 저장
          </button>
        </div>
      </div>

      <CoverPage />
      <ResumePage />
      <KistiPages />
      {isB2c ? <SoloPages /> : <WebmindPage />}
      {/* 서브 요약 — 스왑에서 빠진 쪽을 1p로 압축 */}
      {isB2c ? <WebmindPage sub order="Also" /> : <SoloPages sub order="Also" />}
      <ClosingPage />
    </div>
  );
}
