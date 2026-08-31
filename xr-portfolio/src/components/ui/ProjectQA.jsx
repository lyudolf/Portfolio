import { motion } from 'framer-motion';
import ScreenExplorer from './ScreenExplorer';
import InfiniteGallery from './InfiniteGallery';

/* ══════════════════════════════════════════
   ProjectQA — 프로젝트 상세 본문 공통 구조

   전 프로젝트가 같은 질문 4개를 반복한다 (상황 → 문제 → 판단 → 결과):
   Q1 어떤 프로젝트였나 · Q2 무엇이 막고 있었나
   Q3 무엇을 버리고, 무엇을 택했나 · Q4 그래서 무엇이 달라졌나
   두 번째 프로젝트부터는 보는 사람이 구조를 학습해 답만 스캔한다.
   "문제"로 시작하지 않는 이유: 판이 뭔지 모르는 채 문제부터 읽게 하지 않는다.

   각 답변 아래에는 그 답의 "증거"가 블록으로 붙는다:
   - photos: 사진 그리드 (src 없으면 placeholder)
   - gallery: 큰 이미지 + 무한 루프 썸네일 스트립 (실제 화면이 여러 장일 때)
   - cards:  카드 그리드 (문제 목록·결정 상세·세계관 등)
   - swaps:  before → after 판단 목록
   - stats:  정량 지표 스트립 (+ note 각주)

   items: [{ q, a: [문단...], blocks?: [{type, label?, note?, items}] }]
   답변 문단은 스캔용(10줄 이내), 깊이는 블록이 담당한다.
   ══════════════════════════════════════════ */

const INK = 'rgba(24,32,27,0.88)';
const INK_74 = 'rgba(24,32,27,0.74)';
const INK_55 = 'rgba(24,32,27,0.72)';   // 카드 본문 — 0.55는 3.78:1로 AA 미달이라 상향
const INK_40 = 'rgba(24,32,27,0.64)';   // 라벨·번호 — 0.4는 2.46:1로 거의 안 보였다
const BORDER = 'rgba(24,32,27,0.08)';
const CARD_BG = 'rgba(255,255,255,0.66)';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

/* 블록 제목. tools를 주면 오른쪽 끝에 작업 도구를 작게 병기한다 —
   "무엇을 만들었나"가 앞서고 "무엇으로 만들었나"는 그 옆에 붙는 순서. */
function BlockLabel({ children, tools, accent }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-5 mt-11">
      <p className="text-[15px] md:text-[16px] font-bold flex items-center gap-2.5"
        style={{ color: INK, letterSpacing: '-0.015em' }}>
        <span className="inline-block flex-shrink-0"
          style={{ width: 3, height: 15, borderRadius: 2, background: accent ?? INK_40 }} />
        {children}
      </p>
      {tools && (
        <p className="text-[10.5px] font-semibold" style={{ color: INK_40, fontFamily: MONO }}>
          {tools.join(' · ')}
        </p>
      )}
    </div>
  );
}

function Photos({ block }) {
  return (
    <div className="grid gap-4 mt-7"
      style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))' }}>
      {block.items.map((ph) => (
        <figure key={ph.caption}>
          <div className="w-full overflow-hidden"
            style={{
              aspectRatio: '16 / 9',
              borderRadius: 14,
              background: ph.src ? '#fff' : 'rgba(24,32,27,0.04)',
              border: ph.src ? `1px solid ${BORDER}` : '1.5px dashed rgba(24,32,27,0.18)',
            }}>
            {ph.src ? (
              <img src={ph.src} alt={ph.caption}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-[11px] font-semibold" style={{ color: INK_40 }}>
                  이미지 준비 중
                </span>
              </div>
            )}
          </div>
          <figcaption className="text-[11.5px] mt-2" style={{ color: INK_40 }}>
            {ph.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/* 실제 화면이 여러 장일 때. 그리드로 늘어놓으면 한 장도 제대로 안 보여서,
   한 장을 크게 보여주고 나머지는 썸네일로 넘기는 구버전 갤러리 형식을 그대로 쓴다. */
function Gallery({ block }) {
  return (
    <>
      {block.label && <BlockLabel tools={block.tools} accent={block.accent}>{block.label}</BlockLabel>}
      <div className={block.label ? '' : 'mt-7'}>
        <InfiniteGallery items={block.items} accent={block.accent} />
      </div>
    </>
  );
}

function Cards({ block }) {
  return (
    <>
      {block.label && <BlockLabel tools={block.tools}>{block.label}</BlockLabel>}
      <div className={`grid gap-3.5 ${block.label ? '' : 'mt-7'}`}
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
        {block.items.map((c) => (
          <div key={c.title} className="p-5 rounded-2xl"
            style={{ background: CARD_BG, border: `1px solid ${BORDER}` }}>
            {(c.num || c.badge) && (
              <p className="text-[10.5px] font-bold mb-2"
                style={{ color: INK_40, fontFamily: c.num ? MONO : undefined, letterSpacing: c.badge ? '0.08em' : 0 }}>
                {c.num ?? c.badge}
              </p>
            )}
            <p className="text-[14.5px] font-bold mb-2" style={{ color: INK }}>{c.title}</p>
            <p className="text-[13.5px] leading-[1.85]" style={{ color: INK_55 }}>{c.body}</p>
            {c.foot && (
              <p className="text-[12px] font-semibold mt-3 pt-3"
                style={{ color: INK_74, borderTop: `1px solid ${BORDER}` }}>
                → {c.foot}
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

/* issues — 문제와 그 대응을 한 행에서 좌우로 대비시킨다.
   카드 4장을 균등 나열하면 다 비슷해 보여서, 행 단위로 쌓고 대응을 강조 블록으로 뺐다.
   items는 cards와 같은 모양({num, title, body, foot})을 쓴다. */
function Issues({ block }) {
  const accent = block.accent ?? '#1540c9';
  return (
    <>
      {block.label && <BlockLabel tools={block.tools} accent={accent}>{block.label}</BlockLabel>}
      <div className={block.label ? '' : 'mt-7'} style={{ borderTop: `1px solid ${BORDER}` }}>
        {block.items.map((c) => (
          <div key={c.title}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 py-9"
            style={{ borderBottom: `1px solid ${BORDER}` }}>

            {/* 문제 — 번호를 큰 앵커로 세워 4개가 각각의 항목으로 보이게 */}
            <div className="flex gap-4 md:gap-5">
              {c.num && (
                <span className="text-[30px] md:text-[38px] font-extrabold flex-shrink-0 leading-none"
                  style={{ color: accent, opacity: 0.28, letterSpacing: '-0.04em', marginTop: -2 }}>
                  {c.num}
                </span>
              )}
              <div>
                <p className="text-[19px] md:text-[21px] font-bold mb-2.5"
                  style={{ color: INK, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                  {c.title}
                </p>
                <p className="text-[14px] leading-[1.85]" style={{ color: INK_55 }}>{c.body}</p>
              </div>
            </div>

            {/* 대응 — 이 행의 결론. 문제보다 눈에 먼저 들어와야 한다. */}
            {c.foot && (
              <div className="px-6 py-5 rounded-2xl self-start"
                style={{ background: `${accent}14`, borderLeft: `3px solid ${accent}` }}>
                <p className="text-[11px] font-bold tracking-[0.18em] uppercase mb-2.5" style={{ color: accent }}>
                  대응
                </p>
                <p className="text-[16px] font-bold leading-[1.6]"
                  style={{ color: INK, letterSpacing: '-0.015em' }}>
                  {c.foot}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

function Swaps({ block }) {
  return (
    <>
      {block.label && <BlockLabel tools={block.tools}>{block.label}</BlockLabel>}
      <div className="flex flex-col gap-3">
        {block.items.map((s) => (
          <div key={s.title} className="p-5 rounded-2xl"
            style={{ background: CARD_BG, border: `1px solid ${BORDER}` }}>
            <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(24,32,27,0.06)', color: INK_55 }}>
                {s.tag}
              </span>
              <span className="text-[14px] font-bold" style={{ color: INK }}>{s.title}</span>
            </div>
            <p className="text-[12.5px] mb-2" style={{ color: INK_55, fontFamily: MONO }}>
              {s.before} <span style={{ color: INK_40 }}>→</span> {s.after}
            </p>
            <p className="text-[13px] leading-[1.8]" style={{ color: INK_74 }}>{s.verdict}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function Stats({ block }) {
  return (
    <>
      {block.label && <BlockLabel tools={block.tools}>{block.label}</BlockLabel>}
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 ${block.label ? '' : 'mt-7'}`}>
        {block.items.map((s) => (
          <div key={s.label} className="p-4 rounded-2xl"
            style={{ background: CARD_BG, border: `1px solid ${BORDER}` }}>
            <p className="text-[22px] md:text-[25px] font-extrabold leading-none mb-1.5" style={{ color: INK }}>
              {s.num}
            </p>
            <p className="text-[12px] font-semibold mb-0.5" style={{ color: INK_74 }}>{s.label}</p>
            {s.sub && <p className="text-[10.5px] leading-snug" style={{ color: INK_40 }}>{s.sub}</p>}
          </div>
        ))}
      </div>
      {block.note && (
        <p className="text-[12px] leading-relaxed mt-3" style={{ color: INK_40 }}>{block.note}</p>
      )}
    </>
  );
}

/* 노션 갤러리 카드 — 썸네일 + 클라이언트명 + 제목 + 태그.
   웹 구축처럼 결과물이 "사이트 화면"인 프로젝트 묶음에 쓴다. */
function Posts({ block }) {
  return (
    <>
      {block.label && <BlockLabel tools={block.tools}>{block.label}</BlockLabel>}
      <div className={`grid gap-4 ${block.label ? '' : 'mt-7'}`}
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        {block.items.map((post) => {
          const Tag = post.href ? 'a' : 'div';
          return (
          <Tag key={post.title}
            {...(post.href ? { href: post.href, target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="block overflow-hidden rounded-2xl transition-all duration-200"
            style={{ background: '#fff', border: `1px solid ${BORDER}`, boxShadow: '0 6px 18px rgba(24,32,27,0.05)' }}
            onMouseEnter={post.href ? (e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 14px 30px rgba(24,32,27,0.12)';
            } : undefined}
            onMouseLeave={post.href ? (e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(24,32,27,0.05)';
            } : undefined}>
            {/* 썸네일 — 캡처의 흰 영역이 카드 배경과 섞이지 않게 이미지에 직접 테두리 */}
            <div className="w-full"
              style={{
                aspectRatio: '16 / 10',
                background: post.thumb ? '#fff' : 'rgba(24,32,27,0.045)',
                borderBottom: `1px solid ${BORDER}`,
              }}>
              {post.thumb ? (
                <img src={post.thumb} alt={post.title}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    boxSizing: 'border-box', border: '1px solid rgba(24,32,27,0.1)',
                    borderBottom: 'none', borderRadius: '16px 16px 0 0',
                  }} />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-[11px] font-semibold" style={{ color: INK_40 }}>
                    썸네일 준비 중
                  </span>
                </div>
              )}
            </div>
            <div className="p-4">
              <p className="text-[10px] font-bold tracking-[0.14em] uppercase mb-1.5" style={{ color: INK_40 }}>
                {post.client}
              </p>
              <p className="text-[14px] font-bold mb-1.5" style={{ color: INK }}>
                {post.title}
                {post.href && <span style={{ marginLeft: 6, fontSize: 11.5, color: INK_40 }}>↗</span>}
              </p>
              <p className="text-[12.5px] leading-[1.8] mb-3" style={{ color: INK_55 }}>{post.body}</p>
              {post.tags && (
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((t) => (
                    <span key={t} className="text-[10.5px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(24,32,27,0.06)', color: INK_55 }}>
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Tag>
          );
        })}
      </div>
    </>
  );
}

/* 관측 → 조치 루프.
   "설계했습니다"(조치만)가 아니라 "무엇을 보고 바꿨는지"를 드러낸다.
   숫자가 없는 곳에 숫자를 만들지 않고, 조치들이 쌓여 만든 결과는 note로 한 줄. */
function Loops({ block }) {
  return (
    <>
      {block.label && <BlockLabel tools={block.tools}>{block.label}</BlockLabel>}
      <div className="flex flex-col gap-2.5">
        {block.items.map((it) => (
          <div key={it.saw} className="grid gap-3 p-4 rounded-2xl"
            style={{
              background: CARD_BG,
              border: `1px solid ${BORDER}`,
              gridTemplateColumns: 'minmax(0,1fr) 18px minmax(0,1fr)',
              alignItems: 'center',
            }}>
            <div>
              <p className="text-[10px] font-bold tracking-[0.16em] uppercase mb-1.5" style={{ color: INK_40 }}>
                관측
              </p>
              <p className="text-[13.5px] leading-[1.75]" style={{ color: INK_55 }}>{it.saw}</p>
            </div>
            <span className="text-[15px] text-center" style={{ color: INK_40 }}>→</span>
            <div>
              <p className="text-[10px] font-bold tracking-[0.16em] uppercase mb-1.5" style={{ color: INK_40 }}>
                조치
              </p>
              <p className="text-[13.5px] leading-[1.75] font-medium" style={{ color: INK }}>{it.did}</p>
            </div>
          </div>
        ))}
      </div>
      {block.note && (
        <p className="text-[13.5px] leading-[1.9] mt-4" style={{ color: INK_74, maxWidth: 720 }}>
          {block.note}
        </p>
      )}
    </>
  );
}

/* 화면별 개선 전/후 탐색기 — 답변 아래 증거로 붙는다.
   ScreenExplorer가 자체 폭을 갖지 않아 이 섹션 폭에 딱 맞는다. */
function Explorer({ block }) {
  return (
    <>
      {block.label && <BlockLabel tools={block.tools}>{block.label}</BlockLabel>}
      <ScreenExplorer screens={block.items} accent={block.accent} />
    </>
  );
}

const BLOCK_RENDERERS = {
  photos: Photos, gallery: Gallery, cards: Cards, swaps: Swaps, stats: Stats,
  posts: Posts, loops: Loops, explorer: Explorer, issues: Issues,
};

/* 본문 맨 아래 붙는 보충 설명.
   Q1~Q3 본문은 "무엇을 판단했나"를 다루느라, 정작 "이게 뭐 하는 프로젝트냐"는
   질문이 비어 있다. 그걸 읽는 사람 눈높이로 받아주는 자리.
   접는 아코디언은 쓰지 않는다 — 훑고 지나가는 독자에게 접힌 내용은 없는 내용이다. */
function Faq({ items, accent }) {
  return (
    <div className="pt-10 md:pt-14" style={{ borderTop: `1px solid ${BORDER}` }}>
      <p className="text-[11px] font-bold tracking-[0.28em] uppercase mb-7"
        style={{ color: accent ?? INK_40 }}>
        더 궁금할 만한 것
      </p>
      <div className="flex flex-col gap-8">
        {items.map((f) => (
          <div key={f.q} style={{ maxWidth: 760 }}>
            <h3 className="text-[16px] md:text-[17.5px] font-bold mb-2.5 leading-snug"
              style={{ color: INK, letterSpacing: '-0.02em' }}>
              {f.q}
            </h3>
            <div className="flex flex-col gap-2.5">
              {f.a.map((line) => (
                <p key={line.slice(0, 24)} className="text-[14px] md:text-[14.5px] leading-[1.95]"
                  style={{ color: INK_74 }}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProjectQA({ items, faq, accent }) {
  return (
    <section className="px-6 md:px-8 pb-24" style={{ maxWidth: 980, margin: '0 auto' }}>
      {items.map((it, i) => (
        <motion.div
          key={it.q}
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="py-10 md:py-14"
          style={{ borderTop: i > 0 ? `1px solid ${BORDER}` : 'none' }}
        >
          {/* 질문 — 이 섹션의 제목. 본문보다 작으면 구조가 안 읽혀서 헤딩 크기로 세운다. */}
          <div className="flex items-baseline gap-3 mb-5">
            <span className="text-[21px] md:text-[26px] font-extrabold flex-shrink-0"
              style={{ color: INK_40, fontFamily: MONO, letterSpacing: '-0.02em' }}>
              Q{i + 1}
            </span>
            <h2 className="text-[23px] md:text-[29px] font-bold leading-tight"
              style={{ color: INK, letterSpacing: '-0.025em' }}>
              {it.q}
            </h2>
          </div>
          {/* 답변 — 스캔용 본문 */}
          <div className="flex flex-col gap-3.5">
            {it.a.map((line) => (
              <p key={line.slice(0, 24)}
                className="text-[15px] md:text-[16px] leading-[1.95]"
                style={{ color: INK_74, maxWidth: 720 }}>
                {line}
              </p>
            ))}
          </div>
          {/* 증거 블록 */}
          {it.blocks?.map((b, bi) => {
            const Render = BLOCK_RENDERERS[b.type];
            return Render ? <Render key={bi} block={b} /> : null;
          })}
        </motion.div>
      ))}
      {faq?.length > 0 && <Faq items={faq} accent={accent} />}
    </section>
  );
}
