import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════
   /resume — "해상도를 높이는 기획자"
   인트로: 씨앗 노드 → click me! → 옵시디언식 그래프 증식(노드+연결선) →
   노드들이 재배치되며 프로필 초상 형성(별자리) → 실사진 리빌 → 이력서
   ═══════════════════════════════════════════ */

const PROFILE_IMG = '/resume-profile.jpg'; // TODO: 실제 프로필 사진으로 교체 (현재 임시)
const INTRO_SEEN_KEY = 'resumeIntroSeen';

/* ── 옵시디언식 그래프 → 초상 형성 캔버스 ── */
function GraphPortrait({ src, size = 400, onDone }) {
  const ref = useRef(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = size * dpr;
    cv.height = size * dpr;
    const ctx = cv.getContext('2d');
    ctx.scale(dpr, dpr);

    let raf, t0, done = false;
    let nodes = [], edges = [];
    const N = 230;
    const img = new Image();
    img.src = src;

    /* 타임라인(ms): 성장 → 초상으로 모핑 → 실사진 리빌 */
    const MORPH0 = 2600, MORPH1 = 4400, REVEAL0 = 4800, REVEAL1 = 5900, END = 6400;
    const ease = (t) => (t < 0.5 ? 4 * t ** 3 : 1 - Math.pow(-2 * t + 2, 3) / 2);

    img.onload = () => {
      /* 1) 밝기 기반 스티플 샘플링 — 밝은 픽셀 위치에 노드 배치(흑백 실루엣) */
      const S = 96;
      const s = Math.min(img.width, img.height);
      const sx = (img.width - s) / 2, sy = (img.height - s) / 2 * 0.6;
      const oc = document.createElement('canvas');
      oc.width = S; oc.height = S;
      const octx = oc.getContext('2d');
      octx.drawImage(img, sx, sy, s, s, 0, 0, S, S);
      const d = octx.getImageData(0, 0, S, S).data;
      const cand = [];
      for (let y = 0; y < S; y++) {
        for (let x = 0; x < S; x++) {
          const i = (y * S + x) * 4;
          const b = (d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114) / 255;
          if (b > 0.28) cand.push({ x, y, b });
        }
      }
      const picked = [];
      while (picked.length < N && cand.length) {
        const idx = Math.floor(Math.random() * cand.length);
        if (Math.random() < cand[idx].b) picked.push(cand.splice(idx, 1)[0]);
      }
      const pad = 16;
      nodes = picked.map((c, i) => ({
        /* 최종(초상) 위치 */
        tx: pad + (c.x + Math.random()) / S * (size - pad * 2),
        ty: pad + (c.y + Math.random()) / S * (size - pad * 2),
        /* 성장기(유기적 산개) 위치 */
        gx: size / 2 + (Math.random() - 0.5) * size * 1.15,
        gy: size / 2 + (Math.random() - 0.5) * size * 1.15,
        r: 1.2 + c.b * 2.2,
        spawn: 2400 * Math.pow(i / N, 0.5), // 가속 스폰 — 톡..톡..토도도독
        stagger: (i % 40) * 9,
      }));

      /* 2) 초상 좌표 기준 최근접 2개 연결 — 별자리/옵시디언 링크 */
      for (let i = 0; i < nodes.length; i++) {
        const dists = [];
        for (let j = 0; j < nodes.length; j++) {
          if (j === i) continue;
          const dx = nodes[i].tx - nodes[j].tx, dy = nodes[i].ty - nodes[j].ty;
          dists.push({ j, d2: dx * dx + dy * dy });
        }
        dists.sort((a, b) => a.d2 - b.d2);
        for (let k = 0; k < 2; k++) {
          const a = Math.min(i, dists[k].j), b = Math.max(i, dists[k].j);
          if (!edges.some((e) => e[0] === a && e[1] === b)) edges.push([a, b]);
        }
      }

      t0 = performance.now();
      raf = requestAnimationFrame(tick);
    };

    const tick = (now) => {
      const t = now - t0;
      ctx.clearRect(0, 0, size, size);
      const gAlpha = t < REVEAL0 ? 1 : Math.max(0.1, 1 - (t - REVEAL0) / (REVEAL1 - REVEAL0));

      /* 노드 현재 위치 (성장 위치 → 초상 위치로 이징) */
      const pos = nodes.map((n) => {
        if (t < n.spawn) return null;
        const m = Math.min(1, Math.max(0, (t - MORPH0 - n.stagger) / (MORPH1 - MORPH0)));
        const e = ease(m);
        return {
          x: n.gx + (n.tx - n.gx) * e,
          y: n.gy + (n.ty - n.gy) * e,
          r: n.r,
          pop: Math.min(1, (t - n.spawn) / 260),
        };
      });

      /* 연결선 */
      ctx.lineWidth = 1;
      for (const [a, b] of edges) {
        const pa = pos[a], pb = pos[b];
        if (!pa || !pb) continue;
        ctx.strokeStyle = `rgba(255,255,255,${0.22 * gAlpha * Math.min(pa.pop, pb.pop)})`;
        ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y); ctx.stroke();
      }
      /* 노드 */
      for (const p of pos) {
        if (!p) continue;
        const sc = 0.4 + 0.6 * p.pop;
        ctx.fillStyle = `rgba(255,255,255,${0.85 * gAlpha * p.pop})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * sc, 0, Math.PI * 2); ctx.fill();
      }

      /* 실사진 리빌 (원형 클립 크로스페이드) */
      if (t > REVEAL0) {
        const a = Math.min(1, (t - REVEAL0) / (REVEAL1 - REVEAL0));
        ctx.save();
        ctx.globalAlpha = a;
        ctx.beginPath(); ctx.arc(size / 2, size / 2, size / 2 - 6, 0, Math.PI * 2); ctx.clip();
        const s3 = Math.min(img.width, img.height);
        ctx.drawImage(img, (img.width - s3) / 2, (img.height - s3) / 2 * 0.6, s3, s3, 0, 0, size, size);
        ctx.restore();
      }

      if (t > END) {
        if (!done) { done = true; doneRef.current?.(); }
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    return () => cancelAnimationFrame(raf);
  }, [src, size]);

  return <canvas ref={ref} style={{ width: size, height: size }} />;
}

/* ── 유리 필 ── */
function GlassPill({ children, big = false, onClick, style }) {
  return (
    <button onClick={onClick}
      className={`rounded-full font-semibold cursor-pointer ${big ? 'px-8 py-4 text-[18px]' : 'px-4 py-2 text-[13px]'}`}
      style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.08) 100%)',
        backdropFilter: 'blur(14px) saturate(1.15)',
        WebkitBackdropFilter: 'blur(14px) saturate(1.15)',
        border: '1px solid rgba(255,255,255,0.4)',
        color: 'rgba(255,255,255,0.92)',
        boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
        ...style,
      }}>
      {children}
    </button>
  );
}

/* ── 이력서 본문 데이터 ── */
const CAREERS = [
  {
    company: '㈜이트라이브', role: 'PM · 서비스 기획', period: '2024.07 — 현재',
    bullets: [
      'XR·기능성 게임 B2G 프로젝트 제안→기획→개발→검증→납품 전 사이클 총괄',
      'KISTI 고령자 XR 훈련: 1차 임상 60명 무이슈 완료, 1년 용역 → 3년차 연장(5·6년차 논의)',
      '꿈키올래(Vision Pro 직업체험 9종): 기획 전면 재설계로 2개월 실개발 납품, 후속 제안 획득',
      '전년 대비 팀 매출 3배+ 성장 견인 (3.8억 → 11.5억)',
    ],
  },
  {
    company: '웹마인드', role: '웹/앱 서비스 기획', period: '2023.04 — 2024.07',
    bullets: [
      'B2B 웹 서비스 구축 전 과정 주도 (IA·요구사항 정의·화면설계·일정/예산)',
      '주차 솔루션 기업 리뉴얼: 웹어워드 코리아 금상 수상, 유지보수 계약 연장',
      '제안서·PT 참여로 신규 프로젝트 수주 100% 기여, GA 트래킹 환경 구축',
    ],
  },
  {
    company: '캐파(CAPA)', role: '프론트·백엔드 인턴', period: '2023.01 — 2023.02',
    bullets: ['React·Spring Boot 웹 서비스 파일첨부 UI 구현 및 API 연동'],
  },
];

const SIDE_PROJECTS = [
  { name: 'Leaf It Alone', desc: '웹 3D 게임 7일 단독 개발·배포 — React Three Fiber, ONNX 딥러닝 AI, 8,000개 객체 최적화' },
  { name: '토스 앱인토스 미니앱 3종', desc: '기획→개발→심사→출시 단독 수행 — 리워드 광고 BM·랭킹 설계 (출시·심사 진행)' },
  { name: 'AI 영상 프로덕션', desc: 'Midjourney·Runway 기반 사내 공모전 1위, 외주 대비 약 70% 리소스 절감' },
];

const SKILLS = ['서비스 기획', 'PM/WBS', 'IA 설계', 'Figma', 'GA', 'SQL', 'Agile', 'Notion', 'React', 'Unity', '프롬프트 엔지니어링', 'AI 프로토타이핑'];

/* ═══ 메인 페이지 ═══ */
export default function Resume() {
  const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const seen = typeof window !== 'undefined' && sessionStorage.getItem(INTRO_SEEN_KEY);
  const [stage, setStage] = useState(seen || reduced ? 'resume' : 'seed'); // seed → graph → resume
  const [clickMe, setClickMe] = useState(false);

  useEffect(() => {
    if (stage === 'seed') { const t = setTimeout(() => setClickMe(true), 1100); return () => clearTimeout(t); }
    if (stage === 'resume') sessionStorage.setItem(INTRO_SEEN_KEY, '1');
  }, [stage]);

  const onGraphDone = useCallback(() => { setTimeout(() => setStage('resume'), 350); }, []);
  const skip = () => setStage('resume');

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: '#080A0F' }}>

      {/* ── 이력서 본문 ── */}
      <div className="relative z-10 transition-opacity duration-700"
        style={{
          opacity: stage === 'resume' ? 1 : 0,
          pointerEvents: stage === 'resume' ? 'auto' : 'none',
        }}>
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-20">

          {/* 헤더 */}
          <motion.div className="flex flex-col md:flex-row md:items-end gap-6 mb-14"
            initial={false}
            animate={stage === 'resume' ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}>
            <img src={PROFILE_IMG} alt="유희수 프로필"
              className="w-28 h-28 rounded-full object-cover flex-shrink-0"
              style={{ objectPosition: '50% 30%', border: '1px solid rgba(255,255,255,0.25)', boxShadow: '0 12px 40px rgba(0,0,0,0.4)' }} />
            <div>
              <p className="text-[12px] font-semibold tracking-[0.3em] uppercase mb-2" style={{ color: 'rgba(126,241,214,0.7)' }}>
                Resume
              </p>
              <h1 className="text-[32px] md:text-[40px] font-extrabold leading-tight" style={{ color: 'rgba(255,255,255,0.95)' }}>
                해상도를 높이는 기획자, 유희수
              </h1>
              <p className="mt-2 text-[15px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
                모호한 문제(Why)를 선명한 실행(How)으로. — Service Planner · PM
              </p>
              <div className="mt-3 flex flex-wrap gap-4 text-[13px]" style={{ color: 'rgba(255,255,255,0.55)' }}>
                <a href="mailto:iplay3473@gmail.com" className="hover:text-white transition-colors">iplay3473@gmail.com</a>
                <a href="https://github.com/lyudolf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">github.com/lyudolf</a>
                <a href="https://lyuheesu.com" className="hover:text-white transition-colors">lyuheesu.com</a>
              </div>
            </div>
          </motion.div>

          {/* Key Results */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-14">
            {[
              { num: '3배+', label: '팀 매출 성장 (3.8→11.5억)' },
              { num: '60명', label: '1차 임상 무이슈 완료' },
              { num: '3년차', label: '1년 용역 → 계속 연장' },
              { num: '금상', label: '웹어워드 코리아' },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl p-4 text-center"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <p className="text-[24px] font-extrabold" style={{ color: 'rgba(126,241,214,0.9)' }}>{s.num}</p>
                <p className="text-[12px] mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* 경력 */}
          <SectionTitle>경력 <span className="text-[13px] font-normal" style={{ color: 'rgba(255,255,255,0.45)' }}>— 총 3년 4개월</span></SectionTitle>
          <div className="flex flex-col gap-8 mb-14">
            {CAREERS.map((c) => (
              <div key={c.company} className="rounded-2xl p-6"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                  <h3 className="text-[17px] font-bold" style={{ color: 'rgba(255,255,255,0.92)' }}>
                    {c.company} <span className="text-[13px] font-medium ml-2" style={{ color: 'rgba(126,241,214,0.7)' }}>{c.role}</span>
                  </h3>
                  <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.45)' }}>{c.period}</span>
                </div>
                <ul className="flex flex-col gap-2">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
                      <span className="mt-[8px] w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'rgba(126,241,214,0.6)' }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 사이드 프로젝트 */}
          <SectionTitle>사이드 프로젝트 <span className="text-[13px] font-normal" style={{ color: 'rgba(255,255,255,0.45)' }}>— 기획서가 아닌, 출시된 제품으로</span></SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-14">
            {SIDE_PROJECTS.map((p) => (
              <div key={p.name} className="rounded-2xl p-5"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h4 className="text-[14px] font-bold mb-2" style={{ color: 'rgba(255,255,255,0.9)' }}>{p.name}</h4>
                <p className="text-[12.5px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{p.desc}</p>
              </div>
            ))}
          </div>

          {/* 스킬 & 학력 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
            <div>
              <SectionTitle>스킬</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((s) => (
                  <span key={s} className="rounded-full px-3.5 py-1.5 text-[12px] font-medium"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.75)' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <SectionTitle>학력 · 자격</SectionTitle>
              <ul className="flex flex-col gap-2 text-[13.5px]" style={{ color: 'rgba(255,255,255,0.72)' }}>
                <li>강남대학교 — 컴퓨터공학 전공 · 미디어공학 복수전공 (2020 졸업)</li>
                <li>정보처리기사 (2021)</li>
                <li>컴퓨터활용능력 1급 필기 · ICDL</li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* ── 인트로 오버레이 ── */}
      <AnimatePresence>
        {stage !== 'resume' && (
          <motion.div key="intro" className="fixed inset-0 z-40" style={{ background: '#080A0F' }}
            exit={{ opacity: 0, transition: { duration: 0.7 } }}>

            {/* 스킵 */}
            <button onClick={skip}
              className="absolute top-6 right-7 z-50 text-[13px] font-semibold rounded-full px-4 py-2 cursor-pointer transition-colors"
              style={{ color: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.25)' }}
              onMouseOver={(e) => { e.currentTarget.style.color = '#fff'; }}
              onMouseOut={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}>
              바로 보기 →
            </button>

            {/* 씨앗 노드 + click me */}
            {stage === 'seed' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}>
                  <GlassPill big onClick={() => setStage('graph')}>#서비스기획</GlassPill>
                </motion.div>
                <AnimatePresence>
                  {clickMe && (
                    <motion.p key="cm" className="mt-5 text-[13px] tracking-widest uppercase"
                      style={{ color: 'rgba(126,241,214,0.85)' }}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: [0.4, 1, 0.4], y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ opacity: { repeat: Infinity, duration: 1.6 }, y: { duration: 0.4 } }}>
                      click me!
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* 그래프 증식 → 초상 → 실사진 */}
            {stage === 'graph' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <GraphPortrait src={PROFILE_IMG} onDone={onGraphDone} />
                <motion.p className="mt-7 text-[15px] font-medium tracking-wide"
                  style={{ color: 'rgba(255,255,255,0.75)' }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.2, duration: 0.9 }}>
                  흩어진 점들을 연결하면, 하나의 그림이 됩니다.
                </motion.p>
              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="text-[18px] font-bold mb-5 pb-2.5"
      style={{ color: 'rgba(255,255,255,0.92)', borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
      {children}
    </h2>
  );
}
