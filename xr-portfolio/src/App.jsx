import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Nav from './components/Nav';
import Footer from './components/Footer';
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
import Resume from './components/pages/Resume';
import RlDetail from './components/pages/RlDetail';
import KoccaDetail from './components/pages/KoccaDetail';
import { TAB_PATHS, PATH_TABS, PAGE_META, SITE_URL } from './lib/site';

const PAGES = { about: About, kisti: Kisti, dream: Dream, 'kocca-detail': KoccaDetail, process: Process, withai: WithAI, whyme: WhyMe, 'etribe-detail': EtribeDetail, 'leaf-detail': LeafDetail, 'rl-detail': RlDetail, resume: Resume };

/* 하단 네비게이션을 숨길 페이지 */
const DETAIL_PAGES = new Set(['etribe-detail', 'leaf-detail', 'rl-detail', 'resume']);

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  /* 경로 → 탭 (매칭 실패 시 about으로 폴백) */
  const activeTab = PATH_TABS[location.pathname] ?? 'about';

  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    navigate(TAB_PATHS[tab] ?? '/');
  };

  /* 라우트 변경 시 스크롤 최상단 */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  const Page = PAGES[activeTab];
  const isDetailPage = DETAIL_PAGES.has(activeTab);
  const meta = PAGE_META[activeTab];
  const canonical = `${SITE_URL}${TAB_PATHS[activeTab]}`;

  return (
    <>
      {/* React 19가 head로 호이스팅하는 페이지별 SEO 메타 */}
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={canonical} />
      <link rel="canonical" href={canonical} />

      {!isDetailPage && <Nav activeTab={activeTab} onTabChange={handleTabChange} />}
      <InterestModal />
      <main>
        <AnimatePresence mode="wait">
          <PageTransition tabKey={activeTab}>
            <Page onNavigate={handleTabChange} />
          </PageTransition>
        </AnimatePresence>
      </main>
      {!isDetailPage && <Footer />}
    </>
  );
}
