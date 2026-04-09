import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

let _initialized = false;

function ensureInit() {
  if (_initialized) return;
  _initialized = true;
  // 최소한의 전역 설정만 — 나머지는 %%{init} 블록에서 제어
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
  });
}

export default function MermaidDiagram({ chart, className = '' }) {
  const containerRef = useRef(null);
  const uid = useRef(`mg-${Math.random().toString(36).slice(2, 9)}`);

  useEffect(() => {
    ensureInit();
    const el = containerRef.current;
    if (!el || !chart) return;

    let cancelled = false;

    (async () => {
      try {
        const { svg } = await mermaid.render(uid.current, chart);
        if (cancelled) return;
        el.innerHTML = svg;
        const svgEl = el.querySelector('svg');
        if (svgEl) {
          svgEl.style.width = '100%';
          svgEl.style.height = 'auto';
          svgEl.removeAttribute('height');
          svgEl.style.maxWidth = '100%';
        }
      } catch (err) {
        if (cancelled) return;
        console.error('[MermaidDiagram] render error:', err);
        el.innerHTML = `<pre style="color:#ef4444;font-size:11px;padding:12px;white-space:pre-wrap;overflow:auto">[Mermaid Error]\n${err?.message ?? err}</pre>`;
      }
    })();

    return () => {
      cancelled = true;
      const ghost = document.getElementById(uid.current);
      if (ghost) ghost.remove();
    };
  }, [chart]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: '100%', overflowX: 'auto' }}
    />
  );
}
