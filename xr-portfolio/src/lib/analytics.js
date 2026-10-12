/**
 * GA4(gtag) 최소 래퍼 — 방문자 수 확인용.
 * - VITE_GA_ID(G-XXXX)가 없으면 전부 no-op. 로컬 dev에서도 보내지 않는다.
 * - SPA라 자동 page_view는 끄고(send_page_view: false), 라우트가 바뀔 때마다
 *   App.jsx에서 trackPageView()를 호출한다. /print(PDF 조판)는 제외.
 */
const GA_ID = import.meta.env.VITE_GA_ID;
const ENABLED = Boolean(GA_ID) && !import.meta.env.DEV;

let loaded = false;

export function initAnalytics() {
  if (!ENABLED || loaded) return;
  loaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { send_page_view: false });
}

export function trackPageView(path, title) {
  if (!ENABLED) return;
  if (!loaded) initAnalytics();
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title ?? document.title,
    page_location: window.location.href,
  });
}
