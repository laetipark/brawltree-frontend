![BrawlTree](https://brawltree.me/images/logo/brawltree/logo_horizontal.png)

# :deciduous_tree: BrawlTree Frontend

## :hash: 프로젝트 소개

`BrawlTree Frontend`는 브롤스타즈 전투/통계 데이터를 사용자에게 보여주는 웹 클라이언트입니다.  
`React + Vite + TypeScript` 기반으로 구성되어 있으며, `Backend API`를 호출해 화면을 렌더링합니다.

<br>

## :hammer_and_wrench: 기술 스택

<img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black">&nbsp;
<img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white">&nbsp;
<img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white">&nbsp;
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge">&nbsp;
<img src="https://img.shields.io/badge/Sass-1-CC6699?style=for-the-badge&logo=sass&logoColor=white">

<br>

## :bookmark_tabs: 목차

1. [:gear: 환경 설정 및 실행](#gear-환경-설정-및-실행)
2. [:open_file_folder: 디렉토리 구조](#open_file_folder-디렉토리-구조)
3. [:rocket: 스크립트](#rocket-스크립트)

<br>

## :gear: 환경 설정 및 실행

패키지 설치 후 개발 서버를 실행합니다.

```bash
cd frontend
npm install
npm run dev
```

환경 변수는 `frontend/.env.development.sample`을 기준으로 설정합니다.

```dotenv
VITE_BASE_URL=
VITE_PORT=
YOUTUBE_API_KEY=
```

<br>

## :open_file_folder: 디렉토리 구조

```text
frontend
|-- src
|   |-- components
|   |-- pages
|   |-- services
|   |-- hooks
|   |-- context
|   `-- utils
|-- public
`-- package.json
```

<br>

## :rocket: 스크립트

- `npm run dev`: 개발 서버 실행
- `npm run build`: 프로덕션 빌드
- `npm run preview`: 빌드 결과 미리보기
- `npm run test`: 테스트 실행
- `npm run start:pm2`: PM2 실행
