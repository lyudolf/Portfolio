import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Nav from './components/Nav';
import InterestModal from './components/ui/InterestModal';
import PageTransition from './components/ui/PageTransition';
import About from './components/pages/About';
import Kisti from './components/pages/Kisti';
import Dream from './components/pages/Dream';
import Process from './components/pages/Process';
import WhyMe from './components/pages/WhyMe';
import WithAI from './components/pages/WithAI';
import EtribeDetail from './components/pages/EtribeDetail';
import LeafDetail from './components/pages/LeafDetail';

const PAGES = { about: About, kisti: Kisti, dream: Dream, process: Process, withai: WithAI, whyme: WhyMe, 'etribe-detail': EtribeDetail, 'leaf-detail': LeafDetail };

/* 하단 네비게이션을 숨길 페이지 */
const DETAIL_PAGES = new Set(['etribe-detail', 'leaf-detail']);

export default function App() {
  const [activeTab, setActiveTab] = useState('about');

  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const Page = PAGES[activeTab];
  const isDetailPage = DETAIL_PAGES.has(activeTab);

  return (
    <>
      {!isDetailPage && <Nav activeTab={activeTab} onTabChange={handleTabChange} />}
      <InterestModal />
      <main>
        <AnimatePresence mode="wait">
          <PageTransition tabKey={activeTab}>
            <Page onNavigate={handleTabChange} />
          </PageTransition>
        </AnimatePresence>
      </main>
    </>
  );
}
