# 🚨 문제 해결 및 FAQ

**Vibe Academy 학습 과정에서 자주 발생하는 문제들과 해결책**

---

## 📋 목차

1. [환경 설정 문제들](#1-환경-설정-문제들)
2. [Firebase 관련 문제](#2-firebase-관련-문제)
3. [Vercel 배포 문제](#3-vercel-배포-문제)
4. [개발 중 자주 발생하는 오류](#4-개발-중-자주-발생하는-오류)
5. [성능 및 최적화](#5-성능-및-최적화)
6. [FAQ](#6-faq)

---

## 🛠 1. 환경 설정 문제들

### 💻 Node.js 및 npm 문제

#### ❌ "node: command not found" 또는 "npm: command not found"

**증상**: 터미널에서 node나 npm 명령어가 인식되지 않음

**해결책**:
```bash
# Windows (PowerShell 관리자 권한)
# Chocolatey로 Node.js 재설치
choco uninstall nodejs
choco install nodejs

# 또는 NVM 사용
# https://github.com/coreybutler/nvm-windows/releases
# nvm-setup.zip 다운로드 후 설치
nvm install 18.18.0
nvm use 18.18.0

# macOS
# Homebrew로 재설치
brew uninstall node
brew install node

# 또는 NVM 사용
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.zshrc  # 또는 ~/.bashrc
nvm install 18.18.0
nvm use 18.18.0

# Linux (Ubuntu)
# 공식 NodeSource 저장소 사용
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**확인 방법**:
```bash
node --version  # v18.18.0 또는 유사
npm --version   # 9.8.1 또는 유사
which node      # 설치 경로 확인
```

#### ❌ "npm install" 권한 오류 (macOS/Linux)

**증상**: `EACCES: permission denied` 오류

**해결책**:
```bash
# 방법 1: npm 디렉토리 소유권 변경
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules

# 방법 2: nvm 사용 (권장)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install node
nvm use node
```

#### ❌ 패키지 설치 속도 느림

**해결책**:
```bash
# npm 캐시 정리
npm cache clean --force

# 레지스트리 확인/변경
npm config get registry
npm config set registry https://registry.npmjs.org/

# pnpm 사용 (권장)
npm install -g pnpm
pnpm install  # npm install 대신 사용

# 또는 yarn 사용
npm install -g yarn
yarn install
```

### 🔧 Git 관련 문제

#### ❌ Git 사용자 설정 오류

**증상**: 커밋 시 "Please tell me who you are" 오류

**해결책**:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 설정 확인
git config --list | grep user
```

#### ❌ SSH 키 연결 문제

**증상**: `Permission denied (publickey)` 오류

**해결책**:
```bash
# SSH 키 존재 확인
ls -la ~/.ssh/

# SSH 키 없으면 생성
ssh-keygen -t ed25519 -C "your.email@example.com"

# SSH 에이전트에 키 추가
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# 공개 키 복사 (GitHub에 등록)
# Windows
cat ~/.ssh/id_ed25519.pub | clip
# macOS
pbcopy < ~/.ssh/id_ed25519.pub
# Linux
xclip -selection clipboard < ~/.ssh/id_ed25519.pub

# 연결 테스트
ssh -T git@github.com
```

#### ❌ 라인 엔딩 문제 (Windows)

**증상**: Git에서 파일이 변경되었다고 표시되지만 실제로는 변경사항 없음

**해결책**:
```bash
# Windows
git config --global core.autocrlf true

# macOS/Linux
git config --global core.autocrlf input

# 기존 저장소에 적용
git rm --cached -r .
git reset --hard
```

### 📝 VS Code 관련 문제

#### ❌ 확장프로그램 설치 실패

**해결책**:
```bash
# VS Code 재시작 후 수동 설치
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss

# 또는 VS Code 설정 초기화
# Ctrl+Shift+P -> "Developer: Reload Window"
```

#### ❌ Prettier가 작동하지 않음

**해결책**:
```json
// VS Code settings.json에 추가
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

---

## 🔥 2. Firebase 관련 문제

### 🚫 Authentication 오류

#### ❌ "Firebase: Error (auth/configuration-not-found)"

**증상**: Firebase Auth 초기화 실패

**해결책**:
```javascript
// 1. Firebase 설정 확인
console.log('Firebase Config:', {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID
});

// 2. .env.local 파일 형식 확인
// 올바른 형식:
VITE_FIREBASE_API_KEY=AIzaSyC1234567890
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com

// 3. Vite 재시작
npm run dev
```

#### ❌ "Firebase: Error (auth/invalid-api-key)"

**해결책**:
```bash
# 1. Firebase Console에서 API 키 재확인
# 2. 환경변수 재설정
# 3. 브라우저 캐시 정리 (Ctrl+Shift+R)
```

#### ❌ Google 로그인 오류

**증상**: "This app domain is not authorized"

**해결책**:
1. Firebase Console > Authentication > Settings > Authorized domains
2. `localhost`, `127.0.0.1`, 배포 도메인 추가
3. Google Cloud Console에서 OAuth 동의 화면 설정 확인

### 🗄 Firestore 관련 문제

#### ❌ "Missing or insufficient permissions"

**해결책**:
```javascript
// 1. Firestore 보안 규칙 확인 (개발용)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2024, 12, 31);
    }
  }
}

// 2. 사용자 인증 상태 확인
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('User authenticated:', user.uid);
  } else {
    console.log('User not authenticated');
  }
});
```

#### ❌ Firestore 쿼리 오류

**증상**: 복합 쿼리에서 인덱스 오류

**해결책**:
```javascript
// 1. 단순 쿼리로 테스트
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';

// 복합 쿼리 전에 단순 쿼리 먼저 테스트
const simpleQuery = query(
  collection(db, 'posts'),
  where('published', '==', true)
);

// 2. Firebase Console에서 제안된 인덱스 생성
// 3. 쿼리 조건 순서 변경 시도
```

---

## ⚡ 3. Vercel 배포 문제

### 🚨 빌드 오류

#### ❌ "Build failed with exit code 1"

**해결책**:
```bash
# 1. 로컬에서 빌드 테스트
npm run build

# 2. 빌드 오류 확인 후 수정
# 3. ESLint 오류 임시 무시 (권장하지 않음)
// eslint-disable-next-line
```

#### ❌ 환경변수 인식 안됨

**해결책**:
```bash
# 1. Vercel 환경변수 확인
vercel env ls

# 2. 환경변수 다시 설정
vercel env rm VITE_FIREBASE_API_KEY
vercel env add VITE_FIREBASE_API_KEY

# 3. 모든 환경(development, preview, production)에 설정 확인
```

#### ❌ "Function invocation failed"

**증상**: Vercel Functions 오류

**해결책**:
```javascript
// vercel.json 설정 확인
{
  "functions": {
    "app/api/**/*.js": {
      "runtime": "nodejs18.x"
    }
  }
}

// API 함수 형식 확인
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello World' });
}
```

### 🌐 도메인 및 라우팅 문제

#### ❌ SPA 라우팅 404 오류

**해결책**:
```json
// vercel.json에 추가
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

---

## 🐛 4. 개발 중 자주 발생하는 오류

### ⚛️ React 관련 오류

#### ❌ "Cannot read property of undefined"

**해결책**:
```javascript
// 안전한 접근 패턴 사용
// 잘못된 예:
const userName = user.profile.name;

// 올바른 예:
const userName = user?.profile?.name || 'Unknown';

// 또는 조건부 렌더링
{user && user.profile && (
  <div>{user.profile.name}</div>
)}
```

#### ❌ "Too many re-renders" 오류

**해결책**:
```javascript
// 잘못된 예:
useEffect(() => {
  setCount(count + 1);
});

// 올바른 예:
useEffect(() => {
  setCount(count + 1);
}, []); // 의존성 배열 추가

// 또는 함수형 업데이트 사용
useEffect(() => {
  setCount(prev => prev + 1);
}, []);
```

#### ❌ "Objects are not valid as React child"

**해결책**:
```javascript
// 잘못된 예:
return <div>{user}</div>;

// 올바른 예:
return <div>{user.name}</div>;
// 또는
return <div>{JSON.stringify(user)}</div>;
```

### 🎨 CSS/Tailwind 문제

#### ❌ Tailwind 클래스가 적용되지 않음

**해결책**:
```javascript
// 1. tailwind.config.js content 경로 확인
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // ...
}

// 2. CSS 파일에 @tailwind 지시어 확인
// src/index.css 또는 src/App.css
@tailwind base;
@tailwind components;
@tailwind utilities;

// 3. 빌드 시스템 재시작
npm run dev
```

#### ❌ CSS가 로드되지 않음

**해결책**:
```javascript
// main.jsx에서 CSS 파일 import 확인
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'  // 이 줄 확인

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

---

## 🚀 5. 성능 및 최적화

### 📱 느린 로딩 문제

#### 💡 이미지 최적화

**해결책**:
```javascript
// 이미지 지연 로딩
<img 
  src="image.jpg" 
  alt="description"
  loading="lazy"
  className="w-full h-auto"
/>

// 이미지 크기 최적화
// 1. WebP 형식 사용
// 2. 적절한 크기로 리사이즈
// 3. CDN 사용 (Vercel 자동 최적화)
```

#### 💡 번들 크기 최적화

**해결책**:
```javascript
// 동적 import 사용
const LazyComponent = React.lazy(() => import('./LazyComponent'));

// 사용하지 않는 import 제거
// import { specific } from 'library';  // 전체 라이브러리 대신 특정 함수만

// 트리 쉐이킹 확인
npm run build
npm run preview
```

### 🔥 Firebase 성능 최적화

#### 💡 Firestore 쿼리 최적화

**해결책**:
```javascript
// 필요한 필드만 선택
import { query, collection, where, limit, orderBy } from 'firebase/firestore';

// 효율적인 쿼리
const efficientQuery = query(
  collection(db, 'posts'),
  where('published', '==', true),
  orderBy('createdAt', 'desc'),
  limit(10)  // 페이지네이션 사용
);

// 실시간 리스너 정리
useEffect(() => {
  const unsubscribe = onSnapshot(query, (snapshot) => {
    // 데이터 처리
  });
  
  return () => unsubscribe(); // 컴포넌트 언마운트 시 정리
}, []);
```

---

## ❓ 6. FAQ

### 🤔 일반적인 질문들

#### Q: Vite를 사용하는 이유는?
**A**: Create React App보다 빠른 개발 서버, 더 빠른 빌드, 현대적인 ES 모듈 지원, 더 나은 개발 경험을 제공합니다.

#### Q: Firebase 무료 요금제로 충분한가요?
**A**: MVP 개발에는 충분합니다. Spark(무료) 플랜으로 시작하고 필요시 Blaze(종량제) 플랜으로 업그레이드하세요.

#### Q: TypeScript를 사용해야 하나요?
**A**: 선택사항입니다. 초보자는 JavaScript로 시작하고, 프로젝트가 커지면 TypeScript로 마이그레이션을 고려하세요.

#### Q: 어떤 CSS 프레임워크를 사용해야 하나요?
**A**: TailwindCSS를 권장합니다. 빠른 프로토타이핑에 최적화되어 있고 커스터마이징이 쉽습니다.

### 🛠 기술적 질문들

#### Q: Firebase와 Supabase 중 어떤 것을 선택해야 하나요?
**A**: 
- **Firebase**: Google 생태계, 실시간 기능, 많은 커뮤니티
- **Supabase**: PostgreSQL, 오픈소스, SQL 쿼리
MVP에는 Firebase가 더 빠른 개발을 지원합니다.

#### Q: 상태 관리는 어떻게 해야 하나요?
**A**: 
- **간단한 앱**: useState, useContext
- **복잡한 앱**: Zustand (가벼움) 또는 Redux Toolkit
- **서버 상태**: React Query/TanStack Query

#### Q: 인증 구현이 어렵습니다.
**A**: Firebase Authentication을 사용하세요. 복잡한 인증 로직을 Firebase가 처리해줍니다.

```javascript
// 간단한 인증 구현 예시
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

#### Q: 배포 후 사이트가 느립니다.
**A**: 
1. **이미지 최적화**: WebP 형식, 적절한 크기
2. **코드 분할**: React.lazy() 사용
3. **CDN 활용**: Vercel은 자동으로 CDN 사용
4. **불필요한 라이브러리 제거**: 번들 크기 확인

### 🚨 문제 해결 프로세스

#### 1단계: 오류 메시지 정확히 읽기
```bash
# 개발자 도구 콘솔 확인
# 터미널 오류 메시지 복사
# 브라우저 네트워크 탭 확인
```

#### 2단계: 기본적인 디버깅
```javascript
// console.log로 변수 확인
console.log('Current user:', user);
console.log('Firebase config:', firebaseConfig);

// 브라우저 개발자 도구 활용
// Network 탭에서 요청 상태 확인
// Console 탭에서 JavaScript 오류 확인
```

#### 3단계: 커뮤니티 도움 요청
- **Stack Overflow**: 기술적 문제
- **GitHub Issues**: 라이브러리 관련 문제
- **Discord/커뮤니티**: 프로젝트별 도움

---

## 📞 추가 지원

### 🔗 유용한 링크들

- **React 공식 문서**: https://react.dev/
- **Vite 공식 문서**: https://vitejs.dev/
- **Firebase 공식 문서**: https://firebase.google.com/docs
- **TailwindCSS 공식 문서**: https://tailwindcss.com/
- **Vercel 공식 문서**: https://vercel.com/docs

### 💬 커뮤니티 지원

- **Vibe Academy Discord**: [링크]
- **GitHub Discussions**: [링크]
- **YouTube 댓글**: 각 영상별 질의응답
- **카카오톡 오픈채팅**: [링크]

### 📧 직접 문의

문제가 해결되지 않으면 다음 정보와 함께 문의해주세요:

1. **운영체제**: Windows/macOS/Linux
2. **Node.js 버전**: `node --version`
3. **오류 메시지**: 전체 오류 로그
4. **재현 단계**: 문제가 발생하는 정확한 단계
5. **코드 샘플**: 문제가 있는 코드 부분

---

**🎯 기억하세요**: 모든 개발자는 오류를 겪습니다. 포기하지 말고 차근차근 해결해나가세요!