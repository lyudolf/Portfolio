import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Nav from './components/Nav';
import PageTransition from './components/ui/PageTransition';
import About from './components/pages/About';
import Kisti from './components/pages/Kisti';
import Dream from './components/pages/Dream';
import Process from './components/pages/Process';
import WhyMe from './components/pages/WhyMe';

const PAGES = { about: About, kisti: Kisti, dream: Dream, process: Process, whyme: WhyMe };

export default function App() {
  const [activeTab, setActiveTab] = useState('about');

  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const Page = PAGES[activeTab];

  return (
    <>
      <Nav activeTab={activeTab} onTabChange={handleTabChange} />
      <main>
        <AnimatePresence mode="wait">
          <PageTransition tabKey={activeTab}>
            <Page />
          </PageTransition>
        </AnimatePresence>
      </main>
    </>
  );
}
