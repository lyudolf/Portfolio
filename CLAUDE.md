# CLAUDE.md

XR 서비스 기획자 **유희수** 개인 포트폴리오 웹사이트.

## ⚠️ 가장 먼저 알아야 할 것

- **실제 앱은 `xr-portfolio/` 하위에 있습니다.** 모든 개발/빌드/실행 명령은 이 디렉토리에서 실행하세요.
- 레포 **루트의 `index.html` / `app.js` / `style.css` / `openxr-launcher.html`** 는 프레임워크 없이 만든 **구버전(폐기 예정)** 입니다. 현행 작업과 무관하니 참고/수정하지 마세요.

## 기술 스택 (xr-portfolio/)

- **React 19** + **Vite 8** (라우터 라이브러리 없음 — `App.jsx`의 `useState` 탭 전환 방식)
- **Tailwind CSS 4** (`@tailwindcss/vite` 플러그인, 별도 config 파일 없음)
- **Framer Motion** — 페이지 전환(`PageTransition`), 애니메이션
- **GSAP** — `ScrollFloat` 등 스크롤 기반 모션
- **OGL** — WebGL `Orb` 배경
- **Mermaid** — 다이어그램 렌더링(`MermaidDiagram`)
- **Supabase** — 관심표명 폼 데이터 저장
- 배포: **Vercel** (`xr-portfolio/vercel.json` 에 SPA rewrite 설정)

## 명령어 (반드시 `xr-portfolio/` 에서)

```bash
cd xr-portfolio
npm install      # 최초 1회
npm run dev      # 개발 서버 (Vite)
npm run build    # 프로덕션 빌드
npm run preview  # 빌드 결과 미리보기
npm run lint     # ESLint
```

## 구조 (xr-portfolio/src/)

- `main.jsx` → `App.jsx` 진입.
- **라우팅**: `App.jsx`의 `PAGES` 맵 + `activeTab` 상태로 페이지를 교체. URL 라우팅이 아니라 클라이언트 상태 기반.
  - 일반 탭: `about` / `kisti` / `dream` / `process` / `withai` / `whyme` (하단 `Nav` 표시)
  - 상세 페이지: `etribe-detail` / `leaf-detail` (`DETAIL_PAGES` — `Nav` 숨김)
  - 페이지 이동은 각 컴포넌트에 내려주는 `onNavigate(tab)` 콜백으로 처리.
- `components/pages/` — 각 페이지 컴포넌트
- `components/ui/` — 재사용 UI (MagicBento, Orb, ScrollFloat, InfiniteGallery, InterestModal, PageTransition, MermaidDiagram 등)
- `components/` 루트 — 섹션/존 컴포넌트(Hero, Nav, Footer, Philosophy, WhyMe, KistiZone, DreamZone, ZoneTransition)
- `lib/supabase.js` — Supabase 클라이언트 (env 변수에서 URL/anon key 로드)
- `public/` — 정적 자산(favicon, icons.svg, images/, withai/)

## 환경 변수

`xr-portfolio/.env` 필요 (git에 커밋하지 않음 — `.gitignore` 처리됨). `.env.example` 참고.

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

Vite 규칙상 클라이언트에 노출하려면 변수명이 반드시 `VITE_` 로 시작해야 함.

## Supabase

- 관심표명 모달(`InterestModal.jsx`)이 `interests` 테이블에 INSERT.
- 컬럼: `company`(text), `portfolio_score`(int), `person_score`(int).
- anon key는 클라이언트에 공개되므로, **데이터 보호는 테이블의 Row Level Security(RLS) 정책에 의존함.** 스키마/정책 변경 시 RLS를 반드시 함께 점검할 것.

## 컨벤션

- 컴포넌트는 함수형 + 기본 export. 파일명 PascalCase(`.jsx`).
- 주석/UI 텍스트는 한국어.
- 커밋 메시지: `feat:` / `chore:` 등 Conventional Commits 접두사 사용.

## 작업 이어하기 (다른 PC에서 시작할 때)

- **2026-09-01 main 머지 완료 — 이제 main이 최신.** feat/hero-redesign은 main과 동일 커밋. 새 작업은 어느 쪽이든 시작 전 `git pull` 필수.

```bash
cd xr-portfolio && npm install && npm run dev
```

- 남은 작업 목록·프로젝트 배경 자료는 **별도 비공개 저장소 `claude-memory-backup`의 `TODO.md`** 참고 (Claude 메모리 폴더에 clone해서 사용).
- 알려진 미완: `public/resume-profile.jpg`가 임시 이미지라 실사진 교체 필요.
