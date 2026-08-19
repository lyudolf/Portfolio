import { useCallback, useSyncExternalStore } from 'react';

/* 미디어 쿼리 구독 훅.
   resize도 함께 구독한다 — matchMedia의 change 이벤트가 구독 이전에 지나가면
   좁은 폭에서 뜬 페이지가 모바일 레이아웃에 고착되는 문제가 있었다. */
export function useMedia(query) {
  const subscribe = useCallback((cb) => {
    const m = window.matchMedia(query);
    m.addEventListener('change', cb);
    window.addEventListener('resize', cb);
    return () => {
      m.removeEventListener('change', cb);
      window.removeEventListener('resize', cb);
    };
  }, [query]);
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/* FrameCard 계열이 공유하는 프레임 치수 */
export function useFrameMetrics() {
  const isMobile = useMedia('(max-width: 767px)');
  return {
    isMobile,
    NOTCH: isMobile ? 28 : 34,
    TAB_H: isMobile ? 38 : 46,
    FILLET: isMobile ? 14 : 20,
  };
}
