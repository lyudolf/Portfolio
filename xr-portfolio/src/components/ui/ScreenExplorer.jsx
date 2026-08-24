import { useState } from 'react';

/* ══════════════════════════════════════════
   ScreenExplorer — 화면별 개선 전/후 탐색기

   좌: 화면 카테고리 세로 목록
   중: OLD / NEW 토글 + 해당 이미지
   우: 그 화면에서 무엇을 봤고 무엇을 바꿨는지

   12장을 한 번에 늘어놓는 대신 한 화면씩 보게 해서,
   "관측 → 조치"가 화면 단위로 읽히도록 한다.

   screens: [{ id, label, old, new, saw, did, note? }]
   old/new가 같은 파일이면 토글은 비활성.
   ══════════════════════════════════════════ */

const INK = 'rgba(24,32,27,0.88)';
const INK_70 = 'rgba(24,32,27,0.7)';
const INK_45 = 'rgba(24,32,27,0.45)';
const INK_34 = 'rgba(24,32,27,0.34)';
const BORDER = 'rgba(24,32,27,0.09)';
const CARD = 'rgba(255,255,255,0.7)';

/* 부모(ProjectQA 섹션)의 폭을 그대로 채운다 — 자체 maxWidth·좌우 패딩 없음.
   그래야 Q&A 본문과 좌우 끝이 딱 맞는다. */
export default function ScreenExplorer({ screens, accent = '#1540c9', label }) {
  const [idx, setIdx] = useState(0);
  const [ver, setVer] = useState('new');
  const s = screens[idx];
  const src = ver === 'old' ? s.old : s.new;

  const pick = (i) => { setIdx(i); setVer('new'); };

  return (
    <div className="w-full">
      {label && (
        <p className="text-[10.5px] font-bold tracking-[0.18em] uppercase mb-4 mt-9"
          style={{ color: INK_34 }}>
          {label}
        </p>
      )}

      <div className="grid gap-4" style={{ gridTemplateColumns: 'minmax(0,1fr)' }}>
        <div className="grid gap-4 lg:grid-cols-[132px_minmax(0,1fr)_212px]">

          {/* 좌 — 화면 목록 (모바일에선 가로 스크롤 칩) */}
          <nav className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0"
            style={{ scrollbarWidth: 'none' }}>
            {screens.map((it, i) => {
              const on = i === idx;
              return (
                <button key={it.id} onClick={() => pick(i)}
                  className="text-left text-[13px] font-semibold rounded-xl px-3.5 py-2.5 whitespace-nowrap transition-all cursor-pointer flex-shrink-0"
                  style={{
                    background: on ? accent : CARD,
                    color: on ? '#fff' : INK_70,
                    border: `1px solid ${on ? accent : BORDER}`,
                  }}
                  onMouseEnter={(e) => { if (!on) e.currentTarget.style.background = '#fff'; }}
                  onMouseLeave={(e) => { if (!on) e.currentTarget.style.background = CARD; }}>
                  {it.label}
                </button>
              );
            })}
          </nav>

          {/* 중 — 토글 + 이미지 */}
          <div className="flex flex-col gap-3 min-w-0">
            <div className="flex items-center gap-1 p-1 rounded-full self-start"
              style={{ background: 'rgba(24,32,27,0.055)', border: `1px solid ${BORDER}` }}>
              {['old', 'new'].map((v) => {
                const on = ver === v;
                return (
                  <button key={v} onClick={() => setVer(v)}
                    className="px-4 py-1 rounded-full text-[11.5px] font-bold uppercase tracking-[0.08em] cursor-pointer transition-all"
                    style={{
                      background: on ? '#fff' : 'transparent',
                      color: on ? (v === 'new' ? accent : INK) : INK_45,
                      boxShadow: on ? '0 1px 4px rgba(24,32,27,0.1)' : 'none',
                    }}>
                    {v === 'old' ? '인수 시점' : '재설계 후'}
                  </button>
                );
              })}
            </div>

            <div className="w-full overflow-hidden rounded-2xl"
              style={{ border: `1px solid ${BORDER}`, background: '#fff' }}>
              <img src={src} alt={`${s.label} — ${ver === 'old' ? '인수 시점' : '재설계 후'}`}
                style={{ width: '100%', display: 'block' }} />
            </div>
          </div>

          {/* 우 — 관측 / 조치 */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-[10px] font-bold tracking-[0.16em] uppercase mb-1.5" style={{ color: INK_34 }}>
                관측
              </p>
              <p className="text-[13px] leading-[1.8]" style={{ color: INK_45 }}>{s.saw}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-[0.16em] uppercase mb-1.5" style={{ color: accent }}>
                조치
              </p>
              <p className="text-[13.5px] leading-[1.8] font-medium" style={{ color: INK }}>{s.did}</p>
            </div>
            {s.note && (
              <p className="text-[12px] leading-[1.75] pt-3.5" style={{ color: INK_34, borderTop: `1px solid ${BORDER}` }}>
                {s.note}
              </p>
            )}
          </div>

        </div>
      </div>

      <p className="text-[11.5px] mt-4" style={{ color: INK_34 }}>
        ※ 화면 속 이름·영상은 개인정보 보호를 위해 가렸습니다.
      </p>
    </div>
  );
}
