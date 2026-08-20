import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Nav from './components/Nav';
import Footer from './components/Footer';
import InterestModal from './components/ui/InterestModal';
import PageTransition from './components/ui/PageTransition';
import About from './components/pages/About';
import Kisti from './components/pages/Kisti';
import Dream from './components/pages/Dream';
import SoloWork from './components/pages/SoloWork';
import WhyMe from './components/pages/WhyMe';
import WithAI from './components/pages/WithAI';
import EtribeDetail from './components/pages/EtribeDetail';
import LeafDetail from './components/pages/LeafDetail';
import Resume from './components/pages/Resume';
import RlDetail from './components/pages/RlDetail';
import KoccaDetail from './components/pages/KoccaDetail';
import { TAB_PATHS, PATH_TABS, PAGE_META, SITE_URL } from './lib/site';

const PAGES = { about: About, kisti: Kisti, dream: Dream, 'kocca-detail': KoccaDetail, solo: SoloWork, withai: WithAI, whyme: WhyMe, 'etribe-detail': EtribeDetail, 'leaf-detail': LeafDetail, 'rl-detail': RlDetail, resume: Resume };

/* 하단 네비게이션을 숨길 페이지 */
/* 하단 네비·푸터를 숨길 페이지 (AI-lab은 전체화면 IDE라 자체 메뉴바를 씀) */
const DETAIL_PAGES = new Set(['etribe-detail', 'leaf-detail', 'rl-detail', 'resume', 'withai']);

/* Work 3종끼리 이동할 때는 페이지 페이드를 생략 —
   픽셀 스왑이 패널을 덮은 채 이어지므로 페이드가 끼면 깜빡인다.
   세 페이지가 같은 흰 프레임·상단 탭을 쓰기 때문에 즉시 스왑해도 이어져 보인다. */
const WORK_GROUP = new Set(['kisti', 'dream', 'kocca-detail']);

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  /* 경로 → 탭 (매칭 실패 시 about으로 폴백) */
  const activeTab = PATH_TABS[location.pathname] ?? 'about';

  /* 직전 탭 추적 — 렌더 중 상태 보정 패턴(공식 derived state 방식).
     탭이 바뀐 그 렌더에서 tabs[1]이 직전 탭이다. */
  const [tabs, setTabs] = useState([activeTab, activeTab]);
  if (tabs[1] !== activeTab) setTabs([tabs[1], activeTab]);
  const prevTab = tabs[1] !== activeTab ? tabs[1] : tabs[0];
  const instantSwap = prevTab !== activeTab
    ? WORK_GROUP.has(prevTab) && WORK_GROUP.has(activeTab)
    : WORK_GROUP.has(tabs[0]) && WORK_GROUP.has(activeTab);

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
        <AnimatePresence mode="wait" custom={instantSwap}>
          <PageTransition tabKey={activeTab} instant={instantSwap}>
            <Page onNavigate={handleTabChange} />
          </PageTransition>
        </AnimatePresence>
      </main>
      {/* 랜딩은 자체 연락 블록이 있어 푸터는 하단 바만 */}
      {!isDetailPage && <Footer compact={activeTab === 'about'} />}
    </>
  );
}
