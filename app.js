/* ==========================================
   KISTi Portfolio v3 — GNB/LNB App Logic
   ========================================== */

// ============================================================
// Feature Metadata
// ============================================================
const FEATURES = {
    "곤충잡기": {
        icon: "🦋", color: "#4ade80",
        title: "곤충잡기 — VR 인지-운동 복합 훈련",
        desc: "VR 환경에서 나비·잠자리·벌 등을 채집하며 인지-운동 능력을 복합적으로 훈련하는 콘텐츠입니다. 총 12단계 난이도 체계로, 1~4단계는 색깔·종류 구분, 5~8단계는 방향·반전 인지, 9~12단계는 장갑 색깔을 이용한 작업 기억 훈련까지 확장됩니다.",
        highlights: [
            "12단계 난이도: 1~4(색깔·종류), 5~8(방향·반전), 9~12(작업 기억+색깔장갑)",
            "협동/경쟁 모드: 채집자·조력자 역할 배분, 2인·4인 팀 구성",
            "VR 도구: 그물망장갑, 거미줄, 색깔장갑, 붓(질감 개선)",
            "곤충 스폰: 돌담 뒤 출현, 기억 → 유지 → 채집 3단계 시퀀스",
            "게이미피케이션: 공동 채집함, NPC 경쟁자, 점수 산정(속도·높이·경쟁)",
            "나레이션 스크립트: $Level, $Mode, $InsectType 변수 기반 음성 안내"
        ]
    },
    "공놀이": {
        icon: "⚽", color: "#60a5fa",
        title: "공놀이 — VR 인지-운동 훈련",
        desc: "2인 이상이 '던지기'와 '받기' 역할을 나누어 공·풍선 등 물건을 주고받으며 훈련하는 VR 콘텐츠입니다. 자판기 UI에서 물건을 선택하고 상대방에게 던지면, 받는 쪽은 힌트카드에 따라 올바른 바구니에 분류합니다.",
        highlights: [
            "역할 분담: 던지기(자판기에서 물건 선택·투척) / 받기(힌트카드 기반 분류)",
            "힌트카드 시스템: 색깔·무게·단어 3종 분류 기준 제공",
            "난이도 12단계 + 바구니 높이(상·중·하) 조절",
            "모드: 1:1 경쟁, 1:1 협동, 2:2 경쟁, 2:2 협동, 4인 협동/경쟁",
            "전광판 스코어보드: 팀별 점수, 순위, 승/패 실시간 표시",
            "보너스 메커닉: 바닥의 공 터치 시 추가 점수 획득"
        ]
    },
    "인지검사": {
        icon: "🧠", color: "#a78bfa",
        title: "인지검사 — VR 인지기능 종합 평가",
        desc: "VR 환경에서 수행하는 종합 인지기능 평가 도구입니다. 주의력(시각·촉각), 기억력(등록·인출), 시공간 기능, 언어 기능 4개 영역을 측정합니다. Set 1~3이 무작위 배정되어 학습 효과를 방지합니다.",
        highlights: [
            "4개 평가 영역: 주의력(시각·촉각), 기억력(등록·인출), 시공간(위치·방향·깊이), 언어",
            "Set 1~3 무작위 배정: 학습 효과 방지를 위한 3세트 교차 설계",
            "94슬라이드 상세 자료: 모든 객체의 크기·위치·정답이 px 단위로 명시",
            "촉각 검사: 햅틱 디바이스(HGP-01, HGP-02) 연계",
            "피드백 문서: UI 개선사항(점수 계산 수정, 정답·오답 피드백, Timer 추가)",
            "나레이션 스크립트: 점수 구간별 종합 의견 자동 생성"
        ]
    },
    "균형검사": {
        icon: "⚖️", color: "#2dd4bf",
        title: "균형검사 — Force Plate 균형기능 평가",
        desc: "Force Plate 센서를 활용하여 5가지 자세에서 신체 안정성을 측정하는 정량 평가 도구입니다. Stability Index(SI) 점수를 산출하고, Biodex Balance System 기준으로 연령대별 정상 범위와 비교합니다.",
        highlights: [
            "5가지 측정 자세: EOFS, ECFS, EOSS, ECSS, Tandem 등",
            "Stability Index(SI): (1 - 실제흔들림 / 최대흔들림) × 100",
            "연령대별 정상 범위: Biodex Balance System SD 기준",
            "스파이더 차트: 5축 방사형 시각화",
            "런처 통합: 검사 결과 조회 및 Excel export"
        ]
    },
    "운동성검사": {
        icon: "🏃", color: "#fb923c",
        title: "운동성검사 — MR 기반 운동 가이드 콘텐츠",
        desc: "MediaPipe 기반 Pose Estimation으로 학습자의 관절 위치를 실시간 추적하여, 교수자가 자세를 교정할 수 있는 MR 운동 가이드 콘텐츠입니다.",
        highlights: [
            "MediaPipe 포즈 추정: 골반·무릎·손 관절 실시간 추적",
            "교정 가이드 AR: 교수자 클릭 시 학습자 HMD에 투명 아바타·체크포인트 증강",
            "안전도 모니터링: Stable/Unstable 2단계, 실시간 감지",
            "동작 가이드: 동작1~4 자세별 정자세 기준 데이터",
            "캘리브레이션: 키(155~180cm)별 신체 스펙 자동 측정",
            "안전 모니터링 UI: 자세(빨/파)·영역(노/파) 시각화"
        ]
    },
    "런처": {
        icon: "🖥️", color: "#f472b6",
        title: "런처 — 교수자·학습자 통합 관리 시스템",
        desc: "교수자와 학습자를 위한 통합 런처 시스템입니다. 수업 준비·관리·학습자 관리·설정, VR 디바이스 매칭(REST API + WebSocket), 검사 결과 대시보드를 포함합니다.",
        highlights: [
            "교수자 런처: 수업 준비·관리·학습자 관리·설정 4개 탭",
            "실시간 모니터링: 학습자 CAM, VR 미러링, 안전도 표시",
            "디바이스 매칭: REST API + WebSocket 통신",
            "CCTV 배치: 공놀이 8개, 곤충채집 7개 카메라 구성안",
            "검사 결과 대시보드: 종합 결과 Excel export",
            "수업 관리: 멀티 Room, 알림, 프리셋 저장"
        ]
    },
    "공통/기타": {
        icon: "📁", color: "#94a3b8",
        title: "공통/기타 — 프로젝트 인프라 및 공통 자료",
        desc: "SSO 멀티룸 세션 아키텍처, API 명세서, 유저 플로우, 게이미피케이션, 나레이션 스크립트, 점수 산정 기준, 계약서류 등 프로젝트 전반에 걸친 공통 자료입니다.",
        highlights: [
            "SSO 아키텍처: XUM 포털 연계, 멀티룸 세션 관리",
            "API 명세서: 통합 로그인 8개 엔드포인트",
            "유저 플로우: 교수자·학습자별 전체 시나리오",
            "나레이션 통합: 변수($Level, $Score) 시스템",
            "게이미피케이션: 성취·약속·가속·도전 요소",
            "행정 문서: 계약서, 보험증권, 제안서"
        ]
    }
};

// ============================================================
// State
// ============================================================
let allDocs = [];
let activeLnbKey = 'overview'; // current LNB selection

// ============================================================
// Boot
// ============================================================
window.addEventListener('DOMContentLoaded', async () => {
    // GNB tabs — must work regardless of data loading
    document.querySelectorAll('.gnb-tab').forEach(btn => {
        btn.addEventListener('click', () => switchPage(btn.dataset.page));
    });

    // Init 3D carousel
    initCarousel();

    // Modal close handlers
    const modalCloseBtn = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', e => {
        if (e.target === e.currentTarget) closeModal();
    });

    const lightbox = document.getElementById('lightbox');
    if (lightbox) lightbox.addEventListener('click', () => {
        lightbox.classList.remove('visible');
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closeModal();
            closePmModal();
            const lb = document.getElementById('lightbox');
            if (lb) lb.classList.remove('visible');
        }
    });

    // PM modal overlay click to close
    const pmOverlay = document.getElementById('pmModalOverlay');
    if (pmOverlay) pmOverlay.addEventListener('click', e => {
        if (e.target === e.currentTarget) closePmModal();
    });

    // Try to load content.json (may fail on file:// protocol)
    try {
        const resp = await fetch('data/content.json');
        const data = await resp.json();
        allDocs = data.documents.map((d, i) => ({ ...d, id: d.id || i + 1 }));

        // Render KISTi LNB tree (only if data loaded)
        renderLnbTree();

        // Default content: overview
        renderContentForKey('overview');
    } catch (err) {
        console.warn('Content data not loaded (OK for PM-only view):', err.message);
    }
});

// ============================================================
// Page Switching
// ============================================================
function switchPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.gnb-tab').forEach(t => t.classList.remove('active'));

    const el = document.getElementById(`page-${page}`);
    if (el) el.classList.add('active');

    const tab = document.querySelector(`.gnb-tab[data-page="${page}"]`);
    if (tab) tab.classList.add('active');

    if (page === 'kisti') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function goHome() {
    switchPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================
// Home: 3D Carousel
// ============================================================
let carouselIndex = 0;
let carouselTimer = null;

function initCarousel() {
    const cards = document.querySelectorAll('.carousel-card');
    const dots = document.querySelectorAll('.carousel-dot');
    if (!cards.length) return;

    // Set initial positions
    updateCarousel();

    // Click on cards to rotate
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const pos = card.getAttribute('data-pos');
            if (pos === 'left') {
                carouselIndex = (carouselIndex - 1 + cards.length) % cards.length;
            } else if (pos === 'right') {
                carouselIndex = (carouselIndex + 1) % cards.length;
            } else if (pos === 'center') {
                switchPage('kisti');
                return;
            }
            updateCarousel();
            resetCarouselTimer();
        });
    });

    // Click on dots
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            carouselIndex = parseInt(dot.dataset.i);
            updateCarousel();
            resetCarouselTimer();
        });
    });

    // Auto-rotate every 4 seconds
    startCarouselTimer();
}

function updateCarousel() {
    const cards = document.querySelectorAll('.carousel-card');
    const dots = document.querySelectorAll('.carousel-dot');
    const total = cards.length;
    const positions = ['center', 'right', 'left'];

    cards.forEach((card, i) => {
        const offset = (i - carouselIndex + total) % total;
        card.setAttribute('data-pos', positions[offset]);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === carouselIndex);
    });
}

function startCarouselTimer() {
    carouselTimer = setInterval(() => {
        const cards = document.querySelectorAll('.carousel-card');
        carouselIndex = (carouselIndex + 1) % cards.length;
        updateCarousel();
    }, 4000);
}

function resetCarouselTimer() {
    clearInterval(carouselTimer);
    startCarouselTimer();
}

// ============================================================
// LNB Tree
// ============================================================
function renderLnbTree() {
    const tree = document.getElementById('lnbTree');
    document.getElementById('lnbDocCount').textContent = allDocs.length;

    // Categories for features
    const cats = Object.keys(FEATURES);
    // Notion docs
    const notionDocs = allDocs.filter(d => d.category === '2024 작업현황');
    const notionFolders = {};
    notionDocs.forEach(d => {
        const folder = d.notion_folder || '';
        if (!notionFolders[folder]) notionFolders[folder] = [];
        notionFolders[folder].push(d);
    });

    let html = '';

    // Overview item
    html += lnbItem('overview', '📋', '프로젝트 개요');

    html += '<div class="lnb-sep"></div>';

    // Feature categories
    cats.forEach(cat => {
        const feat = FEATURES[cat];
        const docs = allDocs.filter(d => d.category === cat);
        if (docs.length === 0 && cat !== '공통/기타') return;
        html += lnbItem(`cat:${cat}`, feat.icon, cat, docs.length);
    });

    html += '<div class="lnb-sep"></div>';

    // Notion 2024 folder
    const rootNotionDocs = notionDocs.filter(d => !d.notion_folder);
    const subFolders = Object.keys(notionFolders).filter(f => f !== '');

    html += `<div class="lnb-folder${activeLnbKey.startsWith('notion') ? ' open' : ''}" id="lnb-notion-root">`;
    html += `<div class="lnb-folder-header" onclick="toggleLnbFolder('lnb-notion-root')">
      <span class="lnb-folder-icon">📝</span>
      <span class="lnb-folder-name">2024 작업현황</span>
      <span class="lnb-folder-count">${notionDocs.length}</span>
      <span class="lnb-folder-arrow">▸</span>
    </div>`;
    html += '<div class="lnb-children">';

    // Root-level notion docs (no subfolder)
    rootNotionDocs.forEach(d => {
        const title = d.title || cleanName(d.filename);
        html += lnbItem(`notion:${d.id}`, '📄', title);
    });

    // Sub-folders (e.g. Back_End)
    subFolders.forEach(folder => {
        const docs = notionFolders[folder];
        html += `<div class="lnb-folder" id="lnb-notion-${slug(folder)}">`;
        html += `<div class="lnb-folder-header" onclick="toggleLnbFolder('lnb-notion-${slug(folder)}')">
          <span class="lnb-folder-icon">📂</span>
          <span class="lnb-folder-name">${esc(folder)}</span>
          <span class="lnb-folder-count">${docs.length}</span>
          <span class="lnb-folder-arrow">▸</span>
        </div>`;
        html += '<div class="lnb-children">';
        docs.forEach(d => {
            const title = d.title || cleanName(d.filename);
            html += lnbItem(`notion:${d.id}`, '📄', title);
        });
        html += '</div></div>';
    });

    html += '</div></div>';

    tree.innerHTML = html;

    // Mark active
    updateLnbActive();
}

function lnbItem(key, icon, name, count) {
    const isActive = activeLnbKey === key;
    const countHtml = count !== undefined ? `<span class="lnb-folder-count">${count}</span>` : '';
    return `<div class="lnb-item${isActive ? ' active' : ''}" data-key="${esc(key)}" onclick="selectLnb('${esc(key)}')">
    <span class="lnb-item-icon">${icon}</span>
    <span class="lnb-item-name">${esc(name)}</span>
    ${countHtml}
  </div>`;
}

function toggleLnbFolder(id) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('open');
}

function selectLnb(key) {
    activeLnbKey = key;
    updateLnbActive();
    renderContentForKey(key);
}

function updateLnbActive() {
    document.querySelectorAll('.lnb-item, .lnb-folder-header').forEach(el => {
        el.classList.remove('active');
    });
    const active = document.querySelector(`.lnb-item[data-key="${activeLnbKey}"]`);
    if (active) active.classList.add('active');
}

// ============================================================
// Content Rendering (Main Area)
// ============================================================
function renderContentForKey(key) {
    const main = document.getElementById('kistiMain');

    if (key === 'overview') {
        renderOverview(main);
    } else if (key.startsWith('cat:')) {
        const cat = key.replace('cat:', '');
        renderFeaturePage(main, cat);
    } else if (key.startsWith('notion:')) {
        const docId = parseInt(key.replace('notion:', ''));
        const doc = allDocs.find(d => d.id === docId);
        if (doc) renderNotionPage(main, doc);
    }

    main.scrollTop = 0;
    window.scrollTo({ top: 0 });
}

// --- Overview ---
function renderOverview(container) {
    const pptx = allDocs.filter(d => d.file_type === 'pptx').length;
    const xlsx = allDocs.filter(d => d.file_type === 'xlsx').length;
    const pdf = allDocs.filter(d => d.file_type === 'pdf').length;
    const md = allDocs.filter(d => d.file_type === 'md').length;
    const cats = new Set(allDocs.map(d => d.category)).size;

    container.innerHTML = `
    <div class="content-header">
      <div class="content-header-icon">🥽</div>
      <h1>고령자용 비대면 XR 인지훈련 콘텐츠</h1>
      <p>KISTi 국가과학기술연구회 과제로 개발한 VR 기반 인지-운동 훈련 및 평가 콘텐츠 프로젝트입니다. 2024~2025년에 걸쳐 기획·개발·테스트를 진행했습니다.</p>
      <div class="content-stats">
        <div class="content-stat"><strong>${allDocs.length}</strong> 문서</div>
        <div class="content-stat"><strong>${cats}</strong> 카테고리</div>
        <div class="content-stat"><strong>${pptx}</strong> PPT</div>
        <div class="content-stat"><strong>${xlsx + pdf}</strong> Excel·PDF</div>
        <div class="content-stat"><strong>${md}</strong> Notion MD</div>
      </div>
    </div>
    <div class="overview-grid">
      <div class="overview-card">
        <div class="overview-icon">🎯</div>
        <h3>목적</h3>
        <p>고령자의 인지기능 저하를 조기에 발견하고, VR 기반 훈련을 통해 인지-운동 능력을 향상시키는 비대면 콘텐츠 개발</p>
      </div>
      <div class="overview-card">
        <div class="overview-icon">🥽</div>
        <h3>기술 스택</h3>
        <p>Meta Quest VR · Unity · SSO 멀티룸 세션 · 실시간 모니터링 · 교수자-학습자 런처 시스템</p>
      </div>
      <div class="overview-card">
        <div class="overview-icon">👥</div>
        <h3>운영 구조</h3>
        <p>교수자가 런처를 통해 세션을 생성하고, 다수의 학습자가 VR 내에서 동시에 훈련 참여 · 실시간 CCTV 모니터링</p>
      </div>
      <div class="overview-card">
        <div class="overview-icon">📊</div>
        <h3>평가 체계</h3>
        <p>인지검사 · 균형기능검사 · 운동성검사 · 심혈관검사를 통한 종합 신체기능 평가 및 결과 리포트</p>
      </div>
    </div>`;
}

// --- Feature Category Page ---
function renderFeaturePage(container, cat) {
    const feat = FEATURES[cat];
    if (!feat) return;
    const docs = allDocs.filter(d => d.category === cat);

    let highlightsHtml = '';
    if (feat.highlights && feat.highlights.length) {
        highlightsHtml = `
      <div class="highlights-section">
        <h3>핵심 특징</h3>
        <div class="highlight-grid">
          ${feat.highlights.map(h => {
            const [label, ...rest] = h.split(': ');
            const detail = rest.join(': ');
            return `<div class="highlight-item">
              <div class="hl-dot" style="background:${feat.color}"></div>
              <div class="hl-content">
                <span class="hl-label">${esc(label)}</span>
                ${detail ? `<span class="hl-detail">${esc(detail)}</span>` : ''}
              </div>
            </div>`;
        }).join('')}
        </div>
      </div>`;
    }

    let docsHtml = '';
    docs.forEach(doc => {
        const typeLabel = { pptx: 'PPT', xlsx: 'XLS', pdf: 'PDF', md: 'MD' }[doc.file_type] || doc.file_type.toUpperCase();
        docsHtml += `
      <div class="doc-item" onclick="openModal(${doc.id})">
        <span class="doc-badge ${doc.file_type}">${typeLabel}</span>
        <span class="doc-name" title="${esc(doc.filename)}">${cleanName(doc.filename)}</span>
        ${doc.date ? `<span class="doc-date">${doc.date}</span>` : ''}
        <span class="doc-year">${doc.year}</span>
      </div>`;
    });

    container.innerHTML = `
    <div class="content-header">
      <div class="content-header-icon">${feat.icon}</div>
      <h1>${feat.title}</h1>
      <p>${feat.desc}</p>
      <div class="content-stats">
        <div class="content-stat"><strong>${docs.length}</strong> 문서</div>
        <div class="content-stat"><strong>${docs.filter(d => d.file_type === 'pptx').length}</strong> PPT</div>
        <div class="content-stat"><strong>${docs.filter(d => d.file_type === 'xlsx').length}</strong> Excel</div>
        <div class="content-stat"><strong>${docs.filter(d => d.file_type === 'pdf').length}</strong> PDF</div>
      </div>
    </div>
    ${highlightsHtml}
    <div class="doc-list-section">
      <div class="doc-list-title">관련 기획 문서 (${docs.length})</div>
      <div class="doc-list">${docsHtml || '<p style="color:var(--text-muted);font-size:13px;padding:16px">관련 문서 없음</p>'}</div>
    </div>`;
}

// --- Notion Markdown Page ---
function renderNotionPage(container, doc) {
    const title = doc.title || cleanName(doc.filename);
    const mdText = doc.content?.text || '';

    container.innerHTML = `
    <div class="content-header">
      <div class="content-header-icon">📝</div>
      <h1>${esc(title)}</h1>
      <div class="content-stats">
        ${doc.date ? `<div class="content-stat">📅 ${doc.date}</div>` : ''}
        <div class="content-stat">📄 ${(doc.file_size / 1024).toFixed(1)} KB</div>
        ${doc.notion_folder ? `<div class="content-stat">📂 ${esc(doc.notion_folder)}</div>` : ''}
      </div>
    </div>
    <div class="md-content">${renderMarkdown(mdText)}</div>`;
}

// ============================================================
// Markdown → HTML Renderer
// ============================================================
function renderMarkdown(md) {
    if (!md) return '<p style="color:var(--text-muted)">내용 없음</p>';

    let html = md;

    // Escape HTML but preserve markdown
    html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // Notion aside blocks → callout (before other processing)
    html = html.replace(/&lt;aside&gt;\s*([\s\S]*?)&lt;\/aside&gt;/g, (_, content) => {
        const iconMatch = content.match(/^([^\n]*)\n/);
        const icon = iconMatch ? iconMatch[1].trim() : '';
        const body = iconMatch ? content.slice(iconMatch[0].length) : content;
        return `<div class="md-callout"><span class="md-callout-icon">${icon}</span>${body.trim()}</div>`;
    });

    // Code blocks
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
        return `<pre><code class="lang-${lang}">${code.trim()}</code></pre>`;
    });

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Tables
    html = html.replace(/((?:\|[^\n]+\|\n)+)/g, (tableBlock) => {
        const rows = tableBlock.trim().split('\n').filter(r => r.trim());
        if (rows.length < 2) return tableBlock;

        // Check if second row is separator
        const isSep = /^\|[\s\-:|]+\|$/.test(rows[1]);
        const dataRows = isSep ? [rows[0], ...rows.slice(2)] : rows;

        let tbl = '<table class="md-content">';
        dataRows.forEach((row, ri) => {
            const cells = row.split('|').filter((_, i, a) => i > 0 && i < a.length - 1);
            const tag = ri === 0 && isSep ? 'th' : 'td';
            tbl += '<tr>' + cells.map(c => `<${tag}>${c.trim()}</${tag}>`).join('') + '</tr>';
        });
        tbl += '</table>';
        return tbl;
    });

    // Headings
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

    // Horizontal rules
    html = html.replace(/^---+$/gm, '<hr>');

    // Bold & italic
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Links (Notion-style with URL-encoded paths)
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text) => {
        return `<span style="color:var(--accent)">${text}</span>`;
    });

    // Unordered lists
    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
    html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');

    // Ordered lists
    html = html.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>');

    // Paragraphs (double newline)
    html = html.replace(/\n\n+/g, '</p><p>');
    html = '<p>' + html + '</p>';

    // Clean up empty paragraphs
    html = html.replace(/<p>\s*<\/p>/g, '');
    html = html.replace(/<p>\s*(<h[123])/g, '$1');
    html = html.replace(/(<\/h[123]>)\s*<\/p>/g, '$1');
    html = html.replace(/<p>\s*(<table)/g, '$1');
    html = html.replace(/(<\/table>)\s*<\/p>/g, '$1');
    html = html.replace(/<p>\s*(<pre)/g, '$1');
    html = html.replace(/(<\/pre>)\s*<\/p>/g, '$1');
    html = html.replace(/<p>\s*(<div)/g, '$1');
    html = html.replace(/(<\/div>)\s*<\/p>/g, '$1');
    html = html.replace(/<p>\s*(<hr)/g, '$1');
    html = html.replace(/(<hr>)\s*<\/p>/g, '$1');
    html = html.replace(/<p>\s*(<ul)/g, '$1');
    html = html.replace(/(<\/ul>)\s*<\/p>/g, '$1');

    return html;
}

// ============================================================
// Modal
// ============================================================
function openModal(docId) {
    const doc = allDocs.find(d => d.id === docId);
    if (!doc) return;

    const overlay = document.getElementById('modalOverlay');
    const badge = document.getElementById('modalBadge');
    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');

    const typeLabel = { pptx: 'PPT', xlsx: 'XLS', pdf: 'PDF', md: 'MD' }[doc.file_type] || '?';
    badge.textContent = typeLabel;
    badge.className = `modal-badge ${doc.file_type}`;
    badge.style.background = `var(--${doc.file_type}-bg)`;
    badge.style.color = `var(--${doc.file_type}-text)`;
    title.textContent = cleanName(doc.filename);

    let html = '';

    if (doc.file_type === 'pptx' && doc.content?.slides) {
        doc.content.slides.forEach(slide => {
            html += `<div class="modal-slide">
          <div class="modal-slide-header">Slide ${slide.index}</div>`;

            if (slide.images?.length) {
                html += '<div class="modal-slide-imgs">';
                slide.images.forEach(img => {
                    html += `<img src="data/images/${img.filename}" alt="Slide ${slide.index}" onclick="openLightbox(this.src)">`;
                });
                html += '</div>';
            }

            if (slide.texts?.length) {
                slide.texts.forEach(t => {
                    html += t.is_heading
                        ? `<div class="modal-text-heading">${esc(t.content)}</div>`
                        : `<div class="modal-text-block">${esc(t.content)}</div>`;
                });
            }

            if (slide.tables?.length) {
                slide.tables.forEach(tbl => {
                    html += '<table class="modal-table">';
                    tbl.forEach((row, ri) => {
                        html += '<tr>';
                        row.forEach(cell => {
                            const tag = ri === 0 ? 'th' : 'td';
                            html += `<${tag}>${esc(cell)}</${tag}>`;
                        });
                        html += '</tr>';
                    });
                    html += '</table>';
                });
            }

            html += '</div>';
        });
    } else if (doc.file_type === 'xlsx' && doc.content?.sheets) {
        doc.content.sheets.forEach(sheet => {
            html += `<div class="modal-slide">
          <div class="modal-slide-header">${esc(sheet.name)}</div>
          <div style="overflow-x:auto">
            <table class="modal-table">`;
            sheet.rows.forEach((row, ri) => {
                html += '<tr>';
                row.forEach(cell => {
                    const tag = ri === 0 ? 'th' : 'td';
                    html += `<${tag}>${esc(cell)}</${tag}>`;
                });
                html += '</tr>';
            });
            html += '</table></div></div>';
        });
    } else if (doc.file_type === 'pdf' && doc.content?.pages) {
        doc.content.pages.forEach(page => {
            html += `<div class="modal-slide">
          <div class="modal-slide-header">Page ${page.index}</div>`;

            if (page.images?.length) {
                html += '<div class="modal-slide-imgs">';
                page.images.forEach(img => {
                    html += `<img src="data/images/${img.filename}" alt="Page ${page.index}" onclick="openLightbox(this.src)">`;
                });
                html += '</div>';
            }

            if (page.text) {
                // Format PDF text nicely like manually typed
                html += `<div class="md-content">${formatPdfText(page.text)}</div>`;
            }

            html += '</div>';
        });
    } else if (doc.file_type === 'md' && doc.content?.text) {
        html = `<div class="md-content">${renderMarkdown(doc.content.text)}</div>`;
    }

    body.innerHTML = html || '<p style="color:var(--text-muted);padding:40px;text-align:center">내용 없음</p>';
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('visible');
    document.body.style.overflow = '';
}

function openLightbox(src) {
    const lb = document.getElementById('lightbox');
    document.getElementById('lightboxImg').src = src;
    lb.classList.add('visible');
}

// ============================================================
// PDF Text Formatting
// ============================================================
function formatPdfText(text) {
    if (!text) return '';

    let lines = text.split('\n');
    let html = '';
    let inList = false;

    lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) {
            if (inList) { html += '</ul>'; inList = false; }
            return;
        }

        // Detect headings (short lines ending without period, likely bold/large in original)
        if (trimmed.length < 60 && !trimmed.endsWith('.') && !trimmed.endsWith(',') && !trimmed.match(/^\d/) && trimmed.match(/^[가-힣A-Za-z]/)) {
            if (inList) { html += '</ul>'; inList = false; }
            html += `<h3>${esc(trimmed)}</h3>`;
        }
        // Detect list items
        else if (trimmed.match(/^[\-•·◦▪▸►]/) || trimmed.match(/^\d+[\.\)]/)) {
            if (!inList) { html += '<ul>'; inList = true; }
            html += `<li>${esc(trimmed.replace(/^[\-•·◦▪▸►]\s*/, '').replace(/^\d+[\.\)]\s*/, ''))}</li>`;
        }
        // Regular paragraph
        else {
            if (inList) { html += '</ul>'; inList = false; }
            html += `<p>${esc(trimmed)}</p>`;
        }
    });

    if (inList) html += '</ul>';
    return html;
}

// ============================================================
// Utilities
// ============================================================
function esc(s) {
    if (!s) return '';
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function cleanName(filename) {
    return filename
        .replace(/\.[^.]+$/, '')
        .replace(/\s+[0-9a-f]{32}$/, '')
        .replace(/_/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function slug(s) {
    return s.replace(/[^a-zA-Z0-9가-힣]/g, '_').toLowerCase();
}

// ============================================================
// PM Detail Modals
// ============================================================
const pmModalContents = [
    // Modal 0: 곤충잡기
    `<h3>곤충잡기 — 설계 상세</h3>
    <p>곤충잡기는 색상, 종류, 방향, 위치, 기억 과제를 결합한 인지·운동 복합 훈련 콘텐츠입니다. 손으로 곤충을 잡아 채집함에 넣는 직관적인 상호작용을 기반으로 하되, 단계가 올라갈수록 협동, 규칙 이해, 기억 재구성까지 확장되도록 설계했습니다.</p>
    <h3>기획 의도</h3>
    <p>이 콘텐츠를 기획할 때 가장 중요하게 본 것은 복잡한 설명 없이 바로 이해되는 상호작용이었습니다. '잡는다'는 행동은 고령자에게도 매우 직관적이고, 시각 탐색, 반응속도, 상지 움직임을 자연스럽게 유도할 수 있습니다.</p>
    <p>또한 색상, 곤충 종류, 방향, 위치, 기억 과제를 조합하면 같은 틀 안에서도 다양한 난이도 설계가 가능해 임상적 정량 지표와도 연결하기 좋았습니다.</p>
    <h3>설계 포인트</h3>
    <p>초기 단계는 특정 색상의 곤충을 잡아 넣는 단순 구조로 시작해 진입장벽을 낮췄습니다. 이후에는 요술봉이나 붓 같은 도구를 활용해 역할을 분리하고, 조력자와 채집자가 협력하도록 설계해 상호작용 밀도를 높였습니다.</p>
    <p>후반부에는 3×5 그리드 기반의 기억 과제를 결합해, 곤충의 종류·색상·위치를 짧게 기억한 뒤 다시 재배치하도록 구성했습니다.</p>
    <p>이 과정에서 특히 많은 시간을 쓴 부분은 곤충 속도와 딜레이 조정이었습니다. 너무 빠르면 실패 경험이 누적되고, 너무 느리면 훈련 효과가 떨어지기 때문에 고령자 기준에서 반복적으로 조율해야 했습니다. 또한 색상 구분에서도 실제 사용성을 기준으로 판단해, 혼동 가능성이 있는 색상은 과감히 교체했습니다.</p>
    <p style="color:var(--accent); font-weight:600; margin-top:20px;">곤충잡기는 단순한 반응형 게임이 아니라, 주의집중, 선택적 주의, 협동, 기억등록과 인출, 위치 재구성을 하나의 흐름 안에 담아낸 고령자용 인지·운동 복합 훈련 콘텐츠입니다.</p>`,

    // Modal 1: 공놀이
    `<h3>공놀이 — 설계 상세</h3>
    <p>공놀이는 던지기, 받기, 분류하기의 흐름 안에서 협응, 상지 움직임, 타이밍 반응, 지시 이해를 유도하는 협동형 콘텐츠입니다. 익숙한 오브젝트를 활용해 심리적 진입장벽을 낮추면서도, 단계별로 난이도를 확장할 수 있도록 설계했습니다.</p>
    <h3>기획 의도</h3>
    <p>공은 고령자에게도 매우 익숙한 물체이기 때문에, VR 안에서도 비교적 빠르게 규칙을 이해할 수 있다는 장점이 있습니다. 또한 던지는 사람과 받는 사람의 역할을 나누면, 단순한 개인 과제가 아니라 상호작용 기반의 협동 구조를 만들 수 있습니다.</p>
    <p>저는 이 콘텐츠를 단순한 공 주고받기가 아니라, 오브젝트를 선택하고, 지시에 따라 던지고, 공중에서 받고, 다시 분류하는 복합적 수행 구조로 설계했습니다. 이를 통해 반응속도뿐 아니라 협응, 음성 지시 이해, 분류 능력, 움직임 조절까지 함께 드러나도록 했습니다.</p>
    <h3>설계 포인트</h3>
    <p>1~3단계는 풍선 색상 구분으로 시작해 비교적 쉬운 수행을 유도했고, 이후 인형과 오브젝트, 크기 구분, 음성 지시, 범주 분류까지 점차 인지적 난이도를 높였습니다.</p>
    <p>특히 역할이 한쪽에 고정되지 않도록 1사이클마다 역할을 교체해, 모든 사용자가 던지기와 받기를 모두 경험할 수 있도록 설계했습니다.</p>
    <p>실제 플레이에서 가장 많이 조정한 부분은 공중에서 받기 난이도였습니다. 초기에는 오브젝트 낙하가 부담스럽다는 문제가 있었고, 이를 완화하기 위해 발사 궤적에 베지어 커브를 적용하고 중력값을 조정했습니다. 그 결과 사용자가 예측 가능한 흐름 안에서 오브젝트를 받을 수 있게 되었고, 실패보다 성공 경험이 더 많이 축적되도록 개선할 수 있었습니다.</p>
    <p style="color:var(--accent); font-weight:600; margin-top:20px;">공놀이는 익숙한 상호작용을 바탕으로 협응과 반응을 유도하되, 실제 플레이 난이도를 세밀하게 조정해 고령자도 안정적으로 참여할 수 있도록 설계한 협동형 인지·운동 훈련 콘텐츠입니다.</p>`,

    // Modal 2: 인지검사
    `<h3>인지검사 — 설계 상세</h3>
    <p>인지검사는 훈련 콘텐츠와 분리된 1인용 검사형 콘텐츠로, 반복 방문을 통해 사용자의 인지 기능 변화를 추적하기 위한 구조로 설계했습니다.</p>
    <h3>기획 의도</h3>
    <p>훈련 콘텐츠가 몰입과 수행 경험을 중심으로 설계되었다면, 검사 콘텐츠는 일관성, 측정 가능성, 데이터 정합성이 가장 중요했습니다. 그래서 검사에서는 재미 요소를 강화하기보다, 사용자가 과제를 정확히 이해하고 안정적으로 수행할 수 있는 흐름을 만드는 데 집중했습니다.</p>
    <h3>설계 포인트</h3>
    <p>시각·촉각 주의력, 기억등록과 기억인출, 위치·방향·깊이 기반의 시공간 기능, 이름대기와 이해력 등 총 9가지 항목과 반응 시간을 수집할 수 있도록 구성했습니다. 모든 검사는 튜토리얼을 먼저 제공한 뒤, 유사한 유형의 문제를 난이도만 높여가며 제시하는 방식으로 설계했습니다.</p>
    <p>특히 이 파트에서는 프로그램 안정성을 매우 중요하게 봤습니다. 임상 환경에서는 검사 도중 다운이 발생하면 사용자는 처음부터 다시 수행해야 하고, 이는 데이터 신뢰도와 운영 효율 모두에 큰 영향을 미칩니다. 그래서 검사 콘텐츠는 UX뿐 아니라 실행 안정성 자체가 품질의 일부라고 보고 접근했습니다.</p>
    <p style="color:var(--accent); font-weight:600; margin-top:20px;">인지검사는 재미보다 측정과 추적을 우선한 구조로, 고령자가 과제를 이해하고 안정적으로 수행할 수 있도록 설계한 1인용 임상형 콘텐츠입니다.</p>`,

    // Modal 3: 균형검사
    `<h3>균형검사 — 설계 상세</h3>
    <p>균형검사는 Force Plate를 웹소켓으로 연동해, 실시간 발 압력 분포와 자세 안정성을 확인하는 검사 콘텐츠입니다. 단순한 평가 항목을 넘어, 전체 XR 훈련 환경에서의 안전도를 보완하는 역할까지 함께 수행했습니다.</p>
    <h3>기획 의도</h3>
    <p>이 프로젝트는 상지만 움직이는 콘텐츠로 끝나지 않았습니다. 고령자 대상 훈련에서는 하지 안정성과 낙상 위험까지 함께 고려해야 하고, 특히 비대면 XR 환경에서는 사용자의 이상 행동이나 넘어짐 가능성을 사전에 감지하는 구조가 중요했습니다.</p>
    <p>그래서 균형검사는 별도의 검사 콘텐츠인 동시에, 곤충잡기와 공놀이 같은 주요 훈련 콘텐츠에도 상시 적용되는 안전 장치로 설계했습니다.</p>
    <h3>설계 포인트</h3>
    <p>30초 동안 서 있는 절차를 반복하는 구조였지만, 초기의 "눈을 감고 숫자를 세는 방식"은 실제 사용자에게 위험할 수 있다고 판단했습니다. 그래서 눈을 완전히 감게 하는 대신, 씬 내부를 어둡게 조정하는 방식으로 난이도를 대체했습니다. 검사의 목적은 유지하되, 실제 낙상 위험은 낮추는 방향으로 설계를 수정한 것입니다.</p>
    <p style="color:var(--accent); font-weight:600; margin-top:20px;">균형검사는 고령자의 신체 안정성을 측정하는 검사이자, XR 훈련 전반의 안전도를 보완하는 장치로 설계된 핵심 기능입니다.</p>`,

    // Modal 4: 운동성 검사
    `<h3>운동성 검사 — 설계 상세</h3>
    <p>운동성 검사는 화상 기반 자세 수업과 MR 오브젝트 상호작용을 연결한 1:1 구조의 PoC 성격 콘텐츠입니다. 사용자가 오브젝트에 맞춰 자세를 취하도록 유도하며, 향후 실제 프로덕트로 확장 가능한 가능성을 검토하는 방향으로 기획했습니다.</p>
    <h3>기획 의도</h3>
    <p>이 콘텐츠는 주 훈련 축과는 별개였지만, 단순 시연용 PoC로 끝나지 않도록 설계하는 것이 중요했습니다. 그래서 "보여주기 위한 기능"이 아니라, 실제 서비스로 이어질 수 있는 구조인지에 초점을 두고 접근했습니다.</p>
    <p style="color:var(--accent); font-weight:600; margin-top:20px;">운동성 검사는 화상 기반 수업과 XR 상호작용을 연결해, 향후 실사용 가능한 방향성을 검토한 프로덕트 관점의 PoC 콘텐츠입니다.</p>`
];

function openPmModal(index) {
    const overlay = document.getElementById('pmModalOverlay');
    const body = document.getElementById('pmModalBody');
    if (!overlay || !body) return;
    body.innerHTML = pmModalContents[index] || '';
    // Small delay to trigger CSS transition
    requestAnimationFrame(() => {
        overlay.classList.add('visible');
    });
    document.body.style.overflow = 'hidden';
}

function closePmModal() {
    const overlay = document.getElementById('pmModalOverlay');
    if (!overlay) return;
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
}

