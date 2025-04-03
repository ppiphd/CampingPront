# 🏕️ Camp Bears - 종합 캠핑 플랫폼

<p align="center">
  <img src="/assets/image/logo.png" alt="Camp Bears Logo" width="200" />
</p>

<p align="center">
  <strong>"캠핑의 모든 것, Camp Bears에서"</strong>
</p>

<p align="center">
  <a href="#주요-기능">주요 기능</a> •
  <a href="#기술-스택">기술 스택</a> •
  <a href="#외부-api">외부 API</a> •
  <a href="#시작하기">시작하기</a> •
  <a href="#개발-규칙">개발 규칙</a>
</p>

## ✨ 주요 기능

### 🔍 캠핑장 정보

- 전국 캠핑장 검색 및 필터링
- 캠핑장 상세 정보 조회
- 카카오맵 기반 위치 정보 제공
- 캠핑장 비교 기능

### 🛒 캠핑용품 중고거래

- 사용자 간 캠핑용품 거래 플랫폼
- 카테고리별 상품 검색
- 직거래/택배거래 지원

### 💬 캠핑 SNS

- 캠핑 경험 및 팁 공유
- 이미지 및 동영상 업로드
- 좋아요, 댓글 기능

## 🛠️ 기술 스택

### 프론트엔드

- **Vue.js**: 메인 프론트엔드 프레임워크
- **Vite**: 빠른 빌드 및 개발 서버 도구
- **Vue Router**: 페이지 라우팅 관리
- **Vuex**: 상태 관리 라이브러리
- **Axios**: HTTP 클라이언트, API 요청 처리
- **SCSS/CSS**: 스타일링

### 백엔드

- **Node.js**: 서버 런타임 환경
- **Express**: 백엔드 웹 프레임워크
- **Nodemon**: 개발 시 자동 서버 재시작 도구
- **Concurrently**: 프론트엔드와 백엔드 동시 실행 도구

## 🔌 외부 API

- **GoCamping API**: 한국관광공사 캠핑장 정보 API
- **Kakao Maps API**: 지도 표시 및 위치 정보

## 🚀 시작하기

### 요구사항

- Node.js 14.x 이상
- Yarn 패키지 매니저

### 설치

```bash
# 저장소 클론
git clone https://github.com/ppiphd/CampingPront.git
cd CampingPront

# 의존성 설치
yarn install
```

### 개발 서버 실행

```bash
# 프론트엔드 + 백엔드 동시 실행
yarn dev
```

### 프로덕션 빌드

```bash
# 프로젝트 빌드
yarn build
```

## 📝 개발 규칙

### 코드 스타일

- **변수명**: Camel Case (예: `userName`, `campingInfo`)
- **CSS 클래스**: Kebab Case (예: `user-profile`, `camping-detail`)

### 폴더 구조

```
CampingPront/
├── server/           # 백엔드 서버 코드
├── src/              # 프론트엔드 소스 코드
│   ├── assets/       # 이미지, 폰트 등 정적 파일
│   ├── components/   # 재사용 가능한 컴포넌트
│   ├── router/       # Vue Router 설정
│   ├── store/        # Vuex 상태 관리
│   ├── utils/        # 유틸리티 함수
│   └── views/        # 페이지 컴포넌트
└── public/           # 정적 파일 (favicon 등)
```

## 🔜 개발 예정 기능

- **회원 시스템**: 로그인/회원가입, 마이페이지
- **캠핑장 예약**: 실시간 예약 및 결제 시스템
- **커뮤니티**: 질문/답변 기능, 캠핑 팁 공유
- **날씨 정보**: 캠핑장 주변 날씨 예보 제공

## 📷 스크린샷

<p align="center">
  <em>여기에 앱 스크린샷이 추가될 예정입니다.</em>
</p>

## 📄 라이센스

이 프로젝트는 MIT 라이센스에 따라 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---

<p align="center">Made with ❤️ by Camp Bears Team</p>
