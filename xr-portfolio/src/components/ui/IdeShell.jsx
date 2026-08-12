import { useState, useMemo, useCallback, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IDE } from './ideTokens';

/* ══════════════════════════════════════════
   IdeShell — 코드 에디터 형태의 콘텐츠 셸
   with AI 페이지가 "작업 환경 그 자체"로 읽히도록,
   탐색기 · 탭 · 에디터 · 터미널 · 상태바 구조를 그대로 차용한다.

   tree: [{ type:'folder'|'file', ... }]  — 페이지가 콘텐츠 소유
   file: { id, name, kind, render(), terminal? }
   ══════════════════════════════════════════ */

const KIND_META = {
  md: { glyph: 'M↓', color: '#519aba' },
  json: { glyph: '{ }', color: '#cbcb41' },
  app: { glyph: '▲', color: '#a074c4' },
  log: { glyph: '≡', color: '#8bc34a' },
};

function useMedia(query) {
  const subscribe = useCallback((cb) => {
    const m = window.matchMedia(query);
    m.addEventListener('change', cb);
    return () => m.removeEventListener('change', cb);
  }, [query]);
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/* 트리에서 모든 파일을 평탄화 */
function flatten(nodes, path = []) {
  return nodes.flatMap((n) =>
    n.type === 'folder'
      ? flatten(n.children, [...path, n.name])
      : [{ ...n, path }]
  );
}

/* ── 파일 아이콘 ── */
function FileGlyph({ kind }) {
  const m = KIND_META[kind] ?? KIND_META.md;
  return (
    <span style={{
      width: 15, fontSize: 9.5, fontWeight: 700, color: m.color,
      flexShrink: 0, textAlign: 'center', lineHeight: 1,
    }}>
      {m.glyph}
    </span>
  );
}

/* ── 탐색기 트리 ── */
function TreeNode({ node, depth, activeId, onOpen }) {
  const [open, setOpen] = useState(true);

  if (node.type === 'folder') {
    return (
      <div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center gap-1 cursor-pointer"
          style={{ padding: `3px 8px 3px ${8 + depth * 12}px`, color: IDE.textDim, fontSize: 12.5 }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
        >
          <span style={{ fontSize: 8, width: 10, color: IDE.muted }}>{open ? '▼' : '▶'}</span>
          <span style={{ fontWeight: 600 }}>{node.name}</span>
        </button>
        {open && node.children.map((c) => (
          <TreeNode key={c.id ?? c.name} node={c} depth={depth + 1} activeId={activeId} onOpen={onOpen} />
        ))}
      </div>
    );
  }

  const active = node.id === activeId;
  return (
    <button
      onClick={() => onOpen(node.id)}
      className="w-full flex items-center gap-2 cursor-pointer text-left"
      style={{
        padding: `3px 8px 3px ${10 + depth * 12}px`,
        background: active ? 'rgba(255,255,255,0.09)' : 'transparent',
        color: active ? '#fff' : IDE.textDim,
        fontSize: 12.5,
      }}
      onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}
    >
      <FileGlyph kind={node.kind} />
      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{node.name}</span>
    </button>
  );
}

/* ── 액티비티 바 (장식) ── */
const ACTIVITY_ICONS = [
  { id: 'explorer', d: 'M3 4h6l2 2h10v12H3z' },
  { id: 'search', d: 'M10 4a6 6 0 104 10.5L20 20' },
  { id: 'git', d: 'M6 3v12M6 21a3 3 0 100-6 3 3 0 000 6zM18 9a3 3 0 100-6 3 3 0 000 6zm0 0c0 6-12 3-12 6' },
  { id: 'ext', d: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z' },
];

export default function IdeShell({ tree, initialFileId, windowTitle = 'with-ai', statusText }) {
  const isMobile = useMedia('(max-width: 767px)');
  const files = useMemo(() => flatten(tree), [tree]);
  const first = initialFileId ?? files[0]?.id;

  const [openIds, setOpenIds] = useState([first]);
  const [activeId, setActiveId] = useState(first);
  const [sidebarOpen, setSidebarOpen] = useState(true);   // 데스크톱: 패널 형태
  const [mobileNavOpen, setMobileNavOpen] = useState(false); // 모바일: 오버레이 드로어
  const [terminalOpen, setTerminalOpen] = useState(false);

  const active = files.find((f) => f.id === activeId) ?? files[0];

  const openFile = (id) => {
    setOpenIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setActiveId(id);
    setMobileNavOpen(false);
  };

  const closeTab = (id, e) => {
    e.stopPropagation();
    setOpenIds((prev) => {
      const next = prev.filter((x) => x !== id);
      if (id === activeId && next.length) setActiveId(next[next.length - 1]);
      return next.length ? next : prev; // 마지막 탭은 유지
    });
  };

  /* 모바일에서는 본문을 밀어내지 않도록 오버레이로 띄운다 */
  const showSidebar = isMobile ? mobileNavOpen : sidebarOpen;

  return (
    /* 흰 프레임 — 사이트의 다른 페이지와 같은 문법 */
    <div style={{
      background: '#fff',
      borderRadius: isMobile ? 24 : 34,
      padding: isMobile ? 8 : 12,
      boxShadow: '0 18px 50px rgba(20,28,24,0.14)',
    }}>
      <div style={{
        borderRadius: isMobile ? 18 : 24,
        overflow: 'hidden',
        background: IDE.editor,
        border: `1px solid ${IDE.line}`,
        display: 'flex',
        flexDirection: 'column',
        height: isMobile ? 620 : 'min(78vh, 780px)',
        minHeight: isMobile ? 620 : 660,
      }}>
        {/* ── 타이틀 바 ── */}
        <div className="flex items-center px-4 flex-shrink-0"
          style={{ height: 38, background: IDE.chrome, borderBottom: `1px solid ${IDE.line}` }}>
          <div className="flex items-center gap-2">
            {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
              <span key={c} style={{ width: 11, height: 11, borderRadius: 99, background: c }} />
            ))}
          </div>
          <p className="flex-1 text-center" style={{ fontSize: 11.5, color: IDE.muted, letterSpacing: '0.02em' }}>
            {active ? `${active.name} — ${windowTitle}` : windowTitle}
          </p>
          <div style={{ width: 54 }} />
        </div>

        {/* ── 본체 ── */}
        <div className="flex flex-1 relative" style={{ minHeight: 0 }}>
          {/* 액티비티 바 */}
          {!isMobile && (
            <div className="flex flex-col items-center flex-shrink-0"
              style={{ width: 46, background: IDE.activity, paddingTop: 8 }}>
              {ACTIVITY_ICONS.map((ic, i) => (
                <button key={ic.id}
                  onClick={() => i === 0 && setSidebarOpen((v) => !v)}
                  className="flex items-center justify-center cursor-pointer"
                  style={{
                    width: 46, height: 44,
                    borderLeft: `2px solid ${i === 0 && sidebarOpen ? '#fff' : 'transparent'}`,
                    opacity: i === 0 ? 1 : 0.4,
                  }}>
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
                    stroke={i === 0 && sidebarOpen ? '#fff' : IDE.muted} strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path d={ic.d} />
                  </svg>
                </button>
              ))}
            </div>
          )}

          {/* 탐색기 */}
          <AnimatePresence initial={false}>
            {showSidebar && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: isMobile ? 200 : 228, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="flex-shrink-0 overflow-hidden"
                style={{
                  background: IDE.sidebar,
                  borderRight: `1px solid ${IDE.line}`,
                  ...(isMobile && {
                    position: 'absolute', top: 0, bottom: 0, left: 0, zIndex: 20,
                    boxShadow: '8px 0 24px rgba(0,0,0,0.4)',
                  }),
                }}>
                <p style={{
                  padding: '10px 14px 8px', fontSize: 10.5, letterSpacing: '0.12em',
                  color: IDE.muted, textTransform: 'uppercase',
                }}>
                  탐색기
                </p>
                <div style={{ paddingBottom: 12 }}>
                  {tree.map((n) => (
                    <TreeNode key={n.id ?? n.name} node={n} depth={0} activeId={activeId} onOpen={openFile} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 에디터 영역 */}
          <div className="flex flex-col flex-1" style={{ minWidth: 0 }}>
            {/* 탭 바 */}
            <div className="flex items-stretch flex-shrink-0 overflow-x-auto"
              style={{ background: IDE.tabIdle, borderBottom: `1px solid ${IDE.line}` }}>
              {isMobile && (
                <button onClick={() => setMobileNavOpen((v) => !v)}
                  aria-label="파일 탐색기 열기"
                  className="flex items-center justify-center cursor-pointer flex-shrink-0"
                  style={{ width: 40, borderRight: `1px solid ${IDE.line}`, color: IDE.textDim }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
                  </svg>
                </button>
              )}
              {openIds.map((id) => {
                const f = files.find((x) => x.id === id);
                if (!f) return null;
                const on = id === activeId;
                return (
                  <div key={id} onClick={() => setActiveId(id)}
                    className="flex items-center gap-2 cursor-pointer flex-shrink-0"
                    style={{
                      padding: '0 12px', height: 36,
                      background: on ? IDE.editor : 'transparent',
                      color: on ? '#fff' : IDE.muted,
                      borderRight: `1px solid ${IDE.line}`,
                      borderTop: `1px solid ${on ? IDE.accent : 'transparent'}`,
                      fontSize: 12.5, whiteSpace: 'nowrap',
                    }}>
                    <FileGlyph kind={f.kind} />
                    {f.name}
                    <button onClick={(e) => closeTab(id, e)} aria-label={`${f.name} 닫기`}
                      className="cursor-pointer"
                      style={{ marginLeft: 2, fontSize: 13, lineHeight: 1, color: IDE.muted, opacity: on ? 1 : 0.5 }}>
                      ×
                    </button>
                  </div>
                );
              })}
            </div>

            {/* 브레드크럼 */}
            {active && (
              <div className="flex items-center gap-1.5 flex-shrink-0"
                style={{ padding: '6px 16px', fontSize: 11, color: IDE.muted, borderBottom: `1px solid ${IDE.lineSoft}` }}>
                {[...active.path, active.name].map((seg, i, arr) => (
                  <span key={seg} style={{ color: i === arr.length - 1 ? IDE.textDim : IDE.muted }}>
                    {seg}{i < arr.length - 1 && <span style={{ margin: '0 6px', opacity: 0.6 }}>›</span>}
                  </span>
                ))}
              </div>
            )}

            {/* 에디터 본문 */}
            {/* 파일 전환은 즉시 — 에디터에서 탭 전환에 애니메이션이 끼면 굼떠 보인다 */}
            <div key={activeId} className="flex-1 overflow-y-auto"
              style={{ background: IDE.editor, color: IDE.text }}>
              <div style={{ padding: isMobile ? '20px 18px 40px' : '30px 40px 56px' }}>
                {active?.render?.()}
              </div>
            </div>

            {/* 터미널 */}
            <div className="flex-shrink-0" style={{ borderTop: `1px solid ${IDE.line}`, background: IDE.terminal }}>
              <button onClick={() => setTerminalOpen((v) => !v)}
                className="w-full flex items-center gap-3 cursor-pointer"
                style={{ padding: '7px 16px', fontSize: 10.5, letterSpacing: '0.1em', color: IDE.muted }}>
                <span style={{ fontSize: 8 }}>{terminalOpen ? '▼' : '▶'}</span>
                <span style={{ color: terminalOpen ? '#fff' : IDE.muted }}>TERMINAL</span>
                <span style={{ marginLeft: 'auto', opacity: 0.7 }}>
                  {active?.terminal ? `${active.terminal.length} lines` : 'idle'}
                </span>
              </button>
              {terminalOpen && (
                <div style={{
                  padding: '4px 16px 14px', maxHeight: 150, overflowY: 'auto',
                  fontFamily: '"JetBrains Mono", "Fira Code", monospace', fontSize: 11.5, lineHeight: 1.85,
                }}>
                  {(active?.terminal ?? ['$ 파일을 선택하면 실행 로그가 표시됩니다']).map((ln, i) => (
                    <p key={i} style={{
                      color: ln.startsWith('$') ? IDE.accent
                        : ln.startsWith('✓') ? IDE.green
                          : ln.startsWith('!') ? IDE.amber : IDE.textDim,
                    }}>
                      {ln}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── 상태 바 ── */}
        <div className="flex items-center flex-shrink-0"
          style={{ height: 26, background: IDE.status, color: '#fff', fontSize: 11, padding: '0 12px' }}>
          <span className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 3v12M6 21a3 3 0 100-6 3 3 0 000 6zM18 9a3 3 0 100-6 3 3 0 000 6zm0 0c0 6-12 3-12 6" />
            </svg>
            human-in-the-loop
          </span>
          <span style={{ marginLeft: 14, opacity: 0.9 }}>⊗ 0  ⚠ 0</span>
          <span className="ml-auto hidden md:inline" style={{ opacity: 0.9 }}>{statusText}</span>
          <span className="ml-3 hidden md:inline" style={{ opacity: 0.9 }}>UTF-8</span>
        </div>
      </div>
    </div>
  );
}
