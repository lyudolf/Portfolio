import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Wraps any element and applies a scroll-triggered float-up animation.
 * Uses a wrapper div so the inner element's own transforms are unaffected.
 */
export default function ScrollFloatWrapper({
  children,
  delay = 0,
  duration = 1,
  ease = 'back.out(1.4)',
  scrollStart = 'top bottom-=10%',
  scrollEnd = 'top center',
  yOffset = 80,
  className = '',
  style = {},
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: yOffset,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration,
        delay,
        ease,
        scrollTrigger: {
          trigger: el,
          start: scrollStart,
          end: scrollEnd,
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [delay, duration, ease, scrollStart, scrollEnd, yOffset]);

  return (
    <div ref={ref} className={className} style={{ willChange: 'opacity, transform', ...style }}>
      {children}
    </div>
  );
}
