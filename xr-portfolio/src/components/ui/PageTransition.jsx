import { motion } from 'framer-motion';

/* instant(=custom)가 true면 전환 생략 — Work 3종처럼 픽셀 스왑이
   이어달리기를 하는 구간은 페이지 페이드가 끼면 덮어둔 패널이 깜빡인다.
   exit는 이미 렌더된 페이지라 props가 고정돼 있어서,
   AnimatePresence의 custom으로 내려받아야 나가는 쪽도 즉시가 된다. */
const pageVariants = {
  initial: (instant) => (instant ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }),
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
  exit: (instant) =>
    instant ? { opacity: 1, transition: { duration: 0 } } : { opacity: 0, transition: { duration: 0.15 } },
};

export default function PageTransition({ children, tabKey, instant = false }) {
  return (
    <motion.div
      key={tabKey}
      custom={instant}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}
