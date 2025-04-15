# 🏕️ Camp Bears - 종합 캠핑 플랫폼

<p align="center">
  <img src="public/assets/image/logo.png" alt="Camp Bears Logo" width="200" />
</p>

<p align="center">
  <strong>"캠핑의 모든 것, Camp Bears에서"</strong>
</p>

<p align="center">
  <a href="#-주요-기능">주요 기능</a> •
  <a href="#기술-스택">기술 스택</a> •
  <a href="#-외부-api">외부 API</a> •
  <a href="#-시작하기">시작하기</a> •
  <a href="#-개발-규칙">개발 규칙</a>
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

## 🛠️기술 스택

### 프론트엔드
<p>
  <img src="https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white" alt="Vue.js"/>
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/Vue_Router-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue Router"/>
  <img src="https://img.shields.io/badge/Vuex-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vuex"/>
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios"/>
  <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" alt="SCSS/CSS"/>
</p>

### 백엔드
<p>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white" alt="Nodemon"/>
  <img src="https://img.shields.io/badge/Concurrently-blue?style=for-the-badge" alt="Concurrently"/>
</p>

## 🔌 외부 API
<p>
  <img src="https://img.shields.io/badge/GoCamping_API-F15F37?style=for-the-badge" alt="GoCamping API"/>
  <img src="https://img.shields.io/badge/Kakao_Maps-FFCD00?style=for-the-badge&logo=kakao&logoColor=black" alt="Kakao Maps API"/>
</p>


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

<!-- 1. Bears 로고 -->
<p align="center">
  <img src="https://github.com/user-attachments/assets/92263786-3557-49fd-812a-27bb2b8a1b5c" alt="Bears" height="150px"/><br>
  🐻 Bears
</p>

<!-- 2. 메인페이지 -->
<p align="center">
  <img src="https://github.com/user-attachments/assets/4e0b5ec8-e5de-459f-a83e-18d0be4279ac" alt="메인페이지" height="300px"/><br>
  🏠 메인페이지
</p>

<table align="center">
  <tr>
    <!-- 로그인 -->
    <td align="center">
      <img src="https://github.com/user-attachments/assets/03625d96-1cda-477d-98ec-274e184644c9" alt="로그인" height="250px"/><br>
      🔑 로그인
    </td>
    <!-- 회원가입 -->
    <td align="center">
      <img src="https://github.com/user-attachments/assets/71322c3e-5b17-46e6-8ad9-ba42c504a3fa" alt="회원가입" height="250px"/><br>
      📝 회원가입
    </td>
  </tr>
</table>

<table align="center">
  <tr>
    <!-- 캠핑장 정보 -->
    <td align="center">
      <img src="https://github.com/user-attachments/assets/89b24eac-c1e8-410b-944e-b33ebf623a92" alt="캠핑장정보" height="250px"/><br>
      🏕️ 캠핑장 정보
    </td>
    <!-- 상세페이지 -->
    <td align="center">
      <img src="https://github.com/user-attachments/assets/91a6060a-a8e9-4116-be91-858ddfd94139" alt="캠핑장 상세페이지" height="250px"/><br>
      📄 캠핑장 상세페이지
    </td>
  </tr>
</table>



## 📄 라이센스

이 프로젝트는 MIT 라이센스에 따라 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---

<p align="center">Made with ❤️ by Camp Bears Team</p>

## 환경 변수 설정

프로젝트를 실행하기 위해서는 다음과 같은 환경 변수가 필요합니다:

1. `.env` 파일을 프로젝트 루트 디렉토리에 생성합니다.
2. `.env.example` 파일을 참고하여 필요한 환경 변수를 설정합니다.

```
# 서버 설정
PORT=4001

# GoCamping API 설정
GOCAMPING_API_KEY=your_gocamping_api_key_here

# 카카오 API 설정
KAKAO_MAP_API_KEY=your_kakao_map_api_key_here
```

## 주의사항

- API 키는 `.env` 파일에 안전하게 보관하고, 절대 Git에 커밋하지 마세요.
