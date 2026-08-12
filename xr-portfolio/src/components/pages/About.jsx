import HeroLanding from '../HeroLanding';

/* 랜딩 = 히어로(첫 화면 요약) + 연락 블록.
   히어로가 지표·역량·대표작·CTA를 모두 담게 되면서,
   그 아래 있던 스크롤 모프 섹션과 벤토/Key Results/Profile은
   내용이 그대로 중복돼 전부 제거했다.
   깊은 내용은 Work · AI-lab · Process · Why Me · 이력서가 담당한다. */

const CHANNELS = [
  {
    id: 'email',
    label: '이메일',
    value: 'iplay3473@gmail.com',
    href: 'mailto:iplay3473@gmail.com',
    hint: '가장 빠른 연락 수단입니다',
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'github.com/lyudolf',
    href: 'https://github.com/lyudolf',
    hint: '직접 만든 것들이 올라가 있습니다',
  },
];

function ContactSection({ onNavigate }) {
  return (
    <section className="px-6 md:px-10 py-24 md:py-32" style={{ maxWidth: 1080, margin: '0 auto' }}>
      <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-5"
        style={{ color: 'rgba(126,241,214,0.75)' }}>
        Let&apos;s talk
      </p>
      <h2 className="text-[30px] md:text-[42px] font-extrabold leading-[1.2] mb-5"
        style={{ color: 'rgba(255,255,255,0.95)', letterSpacing: '-0.025em' }}>
        서비스 기획 · PO 포지션을<br />찾고 있습니다
      </h2>
      <p className="text-[14px] md:text-[15px] leading-[1.9] mb-12"
        style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 560 }}>
        궁금한 점이나 함께 볼 만한 자리가 있으면 편하게 연락 주세요.
        이력서는 아래에서 바로 보실 수 있습니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10" style={{ maxWidth: 760 }}>
        {CHANNELS.map((c) => (
          <a key={c.id} href={c.href}
            target={c.id === 'github' ? '_blank' : undefined}
            rel={c.id === 'github' ? 'noopener noreferrer' : undefined}
            className="block p-6 rounded-2xl transition-all"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.borderColor = 'rgba(126,241,214,0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
            }}>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2"
              style={{ color: 'rgba(126,241,214,0.7)' }}>
              {c.label}
            </p>
            <p className="text-[16px] font-semibold mb-1.5" style={{ color: 'rgba(255,255,255,0.92)' }}>
              {c.value}
            </p>
            <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.4)' }}>{c.hint}</p>
          </a>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <button onClick={() => onNavigate?.('resume')}
          className="px-6 py-3 rounded-full text-[13px] font-bold cursor-pointer transition-transform"
          style={{ background: 'rgba(255,255,255,0.95)', color: '#12211a' }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}>
          이력서 보기
        </button>
        <button onClick={() => onNavigate?.('kisti')}
          className="px-6 py-3 rounded-full text-[13px] font-semibold cursor-pointer transition-all"
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.22)',
            color: 'rgba(255,255,255,0.9)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}>
          작업 보기
        </button>
      </div>
    </section>
  );
}

export default function About({ onNavigate }) {
  return (
    <div style={{
      /* 이끼 배경은 히어로에서만 쓰이고, 그 아래로는 빠르게 단색으로 넘어간다. */
      backgroundColor: '#080A0F',
      backgroundImage:
        "linear-gradient(180deg, rgba(8,10,15,0) 0%, rgba(8,10,15,0.35) 78vh, rgba(8,10,15,0.9) 105vh, #080A0F 125vh), url('/hero-bg.jpg')",
      backgroundSize: 'auto, 100% auto',
      backgroundPosition: 'top center',
      backgroundRepeat: 'no-repeat',
    }}>
      <HeroLanding onNavigate={onNavigate} />
      <ContactSection onNavigate={onNavigate} />
    </div>
  );
}
