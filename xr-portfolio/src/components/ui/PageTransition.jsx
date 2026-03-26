import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

export default function PageTransition({ children, tabKey }) {
  return (
    <motion.div
      key={tabKey}
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
