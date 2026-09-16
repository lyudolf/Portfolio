/* PDF 포트폴리오 생성 — /print 조판을 링크 살아있는 PDF로.
   사용법: npm run dev 켜둔 상태에서 `npm run pdf`
   요구사항: 시스템 Chrome 설치 (playwright-core가 channel:'chrome'으로 사용)
   출력: ../pdf/유희수_서비스기획PM_포트폴리오_{B2B,B2C}.pdf */
import { chromium } from 'playwright-core';
import { fileURLToPath } from 'url';
import path from 'path';

const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../pdf');
const BASE = process.env.PRINT_BASE ?? 'http://localhost:5173';
const JOBS = [
  { variant: 'b2b', file: '유희수_서비스기획PM_포트폴리오_B2B.pdf' },
  { variant: 'b2c', file: '유희수_서비스기획PM_포트폴리오_B2C.pdf' },
];

const { mkdirSync } = await import('fs');
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const ctx = await browser.newContext();
for (const j of JOBS) {
  const page = await ctx.newPage();
  try { await page.goto(`${BASE}/print/${j.variant}`, { waitUntil: 'networkidle', timeout: 60000 }); } catch { /* 로드된 만큼 진행 */ }
  await page.evaluate(() => document.fonts.ready);  // Pretendard 임베드 보장
  await page.waitForTimeout(2500);                  // 이미지 지연 로드 여유

  /* 이미지 다운스케일 — Chrome은 원본 PNG(2880px 등)를 그대로 PDF에 넣어 20MB가 넘는다.
     표시 폭의 2배(인쇄 여유)로 캔버스 리샘플 후 JPEG data URL로 바꿔 3~5MB로 줄인다.
     PyMuPDF rewrite_images는 Chrome PDF의 Pattern/ExtGState 리소스를 깨뜨려서 쓰지 않는다. */
  await page.evaluate(async () => {
    const SCALE = 2;
    for (const img of Array.from(document.images)) {
      if (!img.complete) await new Promise((r) => { img.onload = r; img.onerror = r; });
      const w = img.getBoundingClientRect().width;
      if (!w || !img.naturalWidth) continue;
      const targetW = Math.min(img.naturalWidth, Math.ceil(w * SCALE));
      const ratio = targetW / img.naturalWidth;
      const c = document.createElement('canvas');
      c.width = targetW;
      c.height = Math.ceil(img.naturalHeight * ratio);
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, c.width, c.height);   // PNG 투명 영역은 흰 배경으로
      ctx.drawImage(img, 0, 0, c.width, c.height);
      img.src = c.toDataURL('image/jpeg', 0.86);
      await new Promise((r) => { img.onload = r; img.onerror = r; });
    }
  });
  await page.pdf({
    path: path.join(OUT, j.file),
    printBackground: true,
    preferCSSPageSize: true,  // @page 1280×720px (16:9 슬라이드) 그대로
  });
  console.log(`${j.file} 생성`);
  await page.close();
}
await browser.close();
