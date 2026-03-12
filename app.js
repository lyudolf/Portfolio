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
    try {
        const resp = await fetch('data/content.json');
        const data = await resp.json();
        allDocs = data.documents.map((d, i) => ({ ...d, id: d.id || i + 1 }));

        // GNB tabs
        document.querySelectorAll('.gnb-tab').forEach(btn => {
            btn.addEventListener('click', () => switchPage(btn.dataset.page));
        });

        // Init 3D carousel
        initCarousel();

        // Render KISTi LNB tree
        renderLnbTree();

        // Default content: overview
        renderContentForKey('overview');

        // Modal
        document.getElementById('modalClose').addEventListener('click', closeModal);
        document.getElementById('modalOverlay').addEventListener('click', e => {
            if (e.target === e.currentTarget) closeModal();
        });
        document.getElementById('lightbox').addEventListener('click', () => {
            document.getElementById('lightbox').classList.remove('visible');
        });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                closeModal();
                document.getElementById('lightbox').classList.remove('visible');
            }
        });

    } catch (err) {
        console.error('Load failed:', err);
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
    // Modal 0: PM's Impact — 기획자로서의 문제 해결
    `<h3>기획자로서의 문제 해결</h3>
    <p>이 프로젝트는 처음부터 새로 설계하는 일이 아니었습니다. 레거시 구조를 인수받은 상태에서 일정은 이미 불안정했고, 기능은 많았으며, 클라이언트와의 신뢰도는 아직 형성되지 않은 상황이었습니다.</p>
    <p>저는 먼저 기존 자료를 전부 다시 읽고 구조화한 뒤, 다이어그램과 기획서를 새로 정리해 미팅에 들어갔습니다. 어디까지가 기존 합의인지, 어디부터 제가 개입해야 하는지를 명확히 질문했고, 기능 요청이 쌓일 때마다 최종적으로 무엇을 만들고 싶은지 엔드포인트를 다시 확인했습니다.</p>
    <p>"안 되는 이유"를 먼저 말하기보다, 어떻게 하면 구현 가능하게 만들 수 있는지 대안을 고민했습니다.</p>
    <h3>성과 및 회고</h3>
    <p>이 프로젝트는 단순 납품형 용역으로 끝나지 않았습니다. 임상은 현재 안정적으로 진행 중이며, 기술이전 논의도 이어지고 있습니다.</p>
    <p>클라이언트는 제가 계속 참여하는 조건으로 다음 연차와 예산 확대를 제안했습니다. 이 프로젝트는 저에게 "기획은 문서를 만드는 일이 아니라, 실제로 필요한 구조를 현실 안에서 작동하게 만드는 일"이라는 점을 더 분명하게 보여준 경험이었습니다.</p>`,

    // Modal 1: Project Overview — 왜 XR이어야 했는가
    `<h3>왜 XR이어야 했는가</h3>
    <p>이 프로젝트에서 XR은 보여주기 위한 기술이 아니라, 훈련 목적을 현실적으로 구현하기 위한 수단이었습니다. 공간 기반 상호작용을 통해 단순 클릭보다 풍부한 반응을 유도했고, 반응 시간, 위치, 선택 패턴 등 다양한 수행 데이터를 수집할 수 있어 임상 연구 목적과 자연스럽게 연결되었습니다.</p>
    <h3>사용자 이해와 설계 원칙</h3>
    <p>고령자는 일반 사용자와 달리 시인성, 조작 정확도, 피로도, 공간 적응, 실패 경험에 민감합니다.</p>
    <p>텍스트는 UI를 해치지 않는 선에서 충분히 크게 설계했고, 교수자가 전체 수치 조정과 UI 크기 변경을 제어할 수 있도록 구성했습니다. 조작 부담을 줄이기 위해 핸드트래킹 민감도를 높이고, 오브젝트 콜라이더를 크게 적용해 작은 오차에도 성공 경험으로 이어지도록 설계했습니다.</p>`,

    // Modal 2: Core Solutions — 운영 시스템, 훈련/검사 콘텐츠 상세
    `<h3>운영 시스템: 교수자 / 훈련자 런처</h3>
    <p>이 프로젝트에서 런처는 단순한 시작 화면이 아니라, 현장에서 반복적으로 세션을 운영하기 위한 핵심 시스템이었습니다. 기존 구조는 교수자와 훈련자가 분리되어 있었지만, depth가 지나치게 깊고 정보 구조가 정리되어 있지 않았습니다.</p>
    <p>저는 전체 구조를 1~2 depth 수준으로 과감하게 재정리했습니다. 대상자 선택, 초대, 방 입장, 설정, 진행, 결과 확인 흐름을 단순하게 재구성했습니다.</p>
    <h3>훈련 콘텐츠: 곤충잡기 &amp; 공놀이</h3>
    <p>'곤충잡기'는 색상, 종류, 방향, 위치, 기억 과제를 결합한 인지·운동 복합 훈련 콘텐츠입니다. '잡는다'는 행동은 직관적이며 반응속도를 유도하기 좋습니다. 3x5 그리드 기반의 기억 과제를 결합해 인출과 위치 재구성을 하나의 흐름에 담았습니다.</p>
    <p>'공놀이'는 던지기, 받기, 분류하기 흐름 안에서 협응과 지시 이해를 유도합니다. 발사 궤적에 베지어 커브를 적용해 고령자도 안정적으로 참여하도록 난이도를 튜닝했습니다.</p>
    <h3>검사 콘텐츠: 인지검사 &amp; 균형검사</h3>
    <p>인지검사는 재미보다 측정과 추적을 우선한 구조로, 시각·촉각 주의력 등 9가지 항목과 반응 시간을 수집합니다. 검사 도중 다운이 발생하면 데이터 신뢰도에 영향을 미치므로 실행 안정성을 품질의 일부로 보고 접근했습니다.</p>
    <p>균형검사는 Force Plate를 웹소켓으로 연동해 실시간 발 압력을 확인하며, 낙상 위험을 방지하는 안전 장치 역할을 합니다.</p>`
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

// Close PM modal on ESC or overlay click
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePmModal();
});

document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'pmModalOverlay') closePmModal();
});
