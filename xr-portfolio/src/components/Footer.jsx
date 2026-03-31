export default function Footer() {
  return (
    <footer className="relative py-16 px-6" style={{ background: '#060810', borderTop: '1px solid #263247' }}>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="text-sm font-semibold mb-1" style={{ color: 'rgba(243,246,251,0.4)' }}>유희수 · XR Service Planner</p>
          <p className="text-xs" style={{ color: '#546178' }}>이 포트폴리오는 두 개의 실제 프로젝트 경험을 기반으로 구성되었습니다.</p>
        </div>
        <div className="flex gap-6 text-xs" style={{ color: '#546178' }}>
          <a href="https://github.com/lyudolf" target="_blank" rel="noopener noreferrer" className="hover:text-[#98A4BA] transition-colors">GitHub</a>
          <span>© 2025</span>
        </div>
      </div>
    </footer>
  );
}
