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
  await page.pdf({
    path: path.join(OUT, j.file),
    landscape: true,
    printBackground: true,
    preferCSSPageSize: true,  // @page A4 landscape 그대로
  });
  console.log(`${j.file} 생성`);
  await page.close();
}
await browser.close();
