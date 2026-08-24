/* compact — 페이지가 자체 연락 블록을 가진 경우(랜딩) 하단 바만 남긴다.
   라이트 테마 통일: 포슬린 위 잉크 텍스트, 다크 띠 제거. */
const INK = 'rgba(24,32,27,0.85)';
const INK_55 = 'rgba(24,32,27,0.55)';
const INK_40 = 'rgba(24,32,27,0.4)';
const LINE = 'rgba(24,32,27,0.1)';
const ACCENT = '#0f8f74';

export default function Footer({ compact = false }) {
  return (
    <footer className={`relative px-6 ${compact ? 'py-10' : 'py-20'}`}
      style={{ background: 'transparent', borderTop: `1px solid ${LINE}` }}>
      <div className="max-w-5xl mx-auto">
        {/* Contact CTA */}
        {!compact && (
          <div className="text-center mb-14">
            <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-5" style={{ color: ACCENT }}>
              Contact
            </p>
            <h2
              className="text-[26px] md:text-[32px] font-bold leading-snug mb-4"
              style={{ color: INK, letterSpacing: '-0.02em' }}
            >
              서비스 기획 · PO 포지션을 찾고 있습니다
            </h2>
            <p className="text-[14px] leading-relaxed mb-9" style={{ color: INK_55 }}>
              문제 정의부터 실행까지 함께 만들 팀이라면, 도메인을 가리지 않고 이야기 나누고 싶습니다.
            </p>
            <a
              href="mailto:iplay3473@gmail.com"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-[14px] font-semibold transition-all duration-200"
              style={{
                background: '#12211a',
                color: '#fff',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-10 5L2 7" />
              </svg>
              iplay3473@gmail.com
            </a>
          </div>
        )}

        {/* Bottom bar */}
        <div className={`flex flex-col md:flex-row items-center justify-between gap-6 ${compact ? '' : 'pt-8'}`}
          style={compact ? undefined : { borderTop: `1px solid ${LINE}` }}>
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold mb-1" style={{ color: INK_55 }}>유희수 · Service Planner / PM</p>
            <p className="text-xs" style={{ color: INK_40 }}>이 포트폴리오는 실제 프로젝트 경험을 기반으로 구성되었습니다.</p>
          </div>
          <div className="flex gap-6 text-xs" style={{ color: INK_40 }}>
            <a href="https://github.com/lyudolf" target="_blank" rel="noopener noreferrer"
              className="transition-colors"
              onMouseEnter={(e) => { e.currentTarget.style.color = INK; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = INK_40; }}>
              GitHub
            </a>
            <span>© 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
