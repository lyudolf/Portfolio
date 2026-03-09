# (Done)[2024_06_21]개발 WBS 정리

생성일: 2024년 6월 21일 오전 11:34
AI 사용자 지정 자동 채우기: 1. Server

1) Cloud Framework

1-1) Photon

Ensure to check the version of Photon first.

1-1-1) Define session-related data.

1-1-2) Define session protocol.

1-2) Agora

Confirm whether Agora will run simultaneously with the web (as it operates differently on the web).

It may be necessary to run it in Unity to track game status.

2) Node-based Server

2-1) Set up Express.

2-2) Create DB ERD.

2-3) Database (probably MySQL).

2-4) Develop API.

2-5) Separate DEV and PROD with DOCKER.

2-6) DB Scope → MySQL ⇒ MySQL Workbench.

2. Client

1) Client (Admin)

1-1) Main Lobby

1-1-1) Develop lobby system.

1-2) Cognitive Function

1-2-1) Monitoring system (Agora, game).

1-3) Cognitive Behavioral Function

1-3-1) Monitoring system.

2) Client (User Launcher)

1-1) Main Lobby

1-1-1) Develop lobby system.

1-2) Cognitive Function

1-2-1) Monitoring system.

1-3) Cognitive Behavioral Function

1-3-1) Monitoring system.

3) Client (User VR)

1-1) Main Lobby

1-2) Cognitive Function

1-2-1) Single mode.

1-2-2) Multi mode.

1-2-3) Competitive mode.

1-3) Cognitive Behavioral Function

1-3-1) Single mode.

1-3-2) Multi mode.

1-3-3) Competitive mode.
AI 요약: 서버와 클라이언트 개발을 위한 WBS 정리: 서버는 클라우드 프레임워크(포톤, 아고라)와 Node 기반 서버(Express, DB ERD, API 개발 등)로 구성되며, 클라이언트는 관리자, 유저런처, 유저VR로 나뉘어 각기 로비 시스템과 모니터링 시스템을 개발해야 함. 인지기능과 인지행동기능도 포함됨.

1. 서버
    
    1) 클라우드 프레임워크
    
    1-1) 포톤
    
     포톤의 Version 먼저 확인해야함
    
    1-1-1)세션 관련 데이터 정의
    
    1-1-2)세션 프로토콜 정의
    
    1-2) 아고라
    
    아고라를 웹과 동시에 돌릴 건지를 확인해야 함.(웹에서는 다르게 작동하기 때문)
    
    아마도 게임 현황 파악을 해야 하면 Unity에서 돌려야 할 수 있을 것 같음
    
    2) Node 기반 서버
    
    2-1) Express 세팅
    
    2-2) DB ERD 작성
    
    2-3) DB(아마도 MySQL??)
    
    2-4) API 개발
    
    2-5) DOCKER 로 DEV PROD 분리
    
    2-6) DB Scope → MySQL⇒MySQL workbench
    
2. 클라이언트
    
    1) 클라이언트(관리자)
    
    1-1) 메인 로비
    
    1-1-1) 로비 시스템 개발
    
    1-2) 인지기능
    
    1-2-1) 모니터링 시스템(아고라, 게임)
    
    1-3) 인지행동기능
    
    1-3-1)모니터링 시스템
    
    2) 클라이언트(유저런처)
    
    1-1) 메인 로비
    
    1-1-1)로비 시스템 개발
    
    1-2) 인지기능
    
    1-2-1) 모니터링 시스템 
    
    1-3) 인지행동기능
    
    1-3-1) 모니터링 시스템
    
    3) 클라이언트(유저VR)
    
    1-1) 메인 로비
    
    1-2) 인지기능
    
    1-2-1) 싱글모드
    
    1-2-2) 멀티모드
    
    1-2-3) 경쟁모드
    
    1-3) 인지행동기능
    
    1-3-1) 싱글모드
    
    1-3-2) 멀티모드
    
    1-3-3) 경쟁모드