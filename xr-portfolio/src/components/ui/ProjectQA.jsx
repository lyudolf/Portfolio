import { motion } from 'framer-motion';
import ScreenExplorer from './ScreenExplorer';

/* ══════════════════════════════════════════
   ProjectQA — 프로젝트 상세 본문 공통 구조

   전 프로젝트가 같은 질문 3개를 반복한다:
   Q1 어떤 문제였나 · Q2 무엇을 결정했나 · Q3 결과가 어땠나
   두 번째 프로젝트부터는 보는 사람이 구조를 학습해 답만 스캔한다.

   각 답변 아래에는 그 답의 "증거"가 블록으로 붙는다:
   - photos: 사진 그리드 (src 없으면 placeholder)
   - cards:  카드 그리드 (문제 목록·결정 상세·세계관 등)
   - swaps:  before → after 판단 목록
   - stats:  정량 지표 스트립 (+ note 각주)

   items: [{ q, a: [문단...], blocks?: [{type, label?, note?, items}] }]
   답변 문단은 스캔용(10줄 이내), 깊이는 블록이 담당한다.
   ══════════════════════════════════════════ */

const INK = 'rgba(24,32,27,0.88)';
const INK_74 = 'rgba(24,32,27,0.74)';
const INK_55 = 'rgba(24,32,27,0.55)';
const INK_40 = 'rgba(24,32,27,0.4)';
const BORDER = 'rgba(24,32,27,0.08)';
const CARD_BG = 'rgba(255,255,255,0.66)';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

/* 블록 제목. tools를 주면 오른쪽 끝에 작업 도구를 작게 병기한다 —
   "무엇을 만들었나"가 앞서고 "무엇으로 만들었나"는 그 옆에 붙는 순서. */
function BlockLabel({ children, tools }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-4 mt-9">
      <p className="text-[10.5px] font-bold tracking-[0.18em] uppercase" style={{ color: INK_40 }}>
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
            <p className="text-[13px] leading-[1.85]" style={{ color: INK_55 }}>{c.body}</p>
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
        {block.items.map((post) => (
          <div key={post.title} className="overflow-hidden rounded-2xl"
            style={{ background: '#fff', border: `1px solid ${BORDER}`, boxShadow: '0 6px 18px rgba(24,32,27,0.05)' }}>
            {/* 썸네일 */}
            <div className="w-full"
              style={{
                aspectRatio: '16 / 10',
                background: post.thumb ? '#fff' : 'rgba(24,32,27,0.045)',
                borderBottom: `1px solid ${BORDER}`,
              }}>
              {post.thumb ? (
                <img src={post.thumb} alt={post.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
              <p className="text-[14px] font-bold mb-1.5" style={{ color: INK }}>{post.title}</p>
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
          </div>
        ))}
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
  photos: Photos, cards: Cards, swaps: Swaps, stats: Stats,
  posts: Posts, loops: Loops, explorer: Explorer,
};

export default function ProjectQA({ items }) {
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
          {/* 질문 — 작은 캡션 (회색) */}
          <p className="text-[11.5px] font-bold tracking-[0.12em] uppercase mb-4"
            style={{ color: INK_40 }}>
            Q{i + 1}. {it.q}
          </p>
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
    </section>
  );
}
