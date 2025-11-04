# 📘 교재 1권: Vibe Coding 개론

**Vite + React + Firebase + Vercel의 원리와 Vibe 철학**

---

## 📋 목차

1. **Vibe Coding이란?**
2. **핵심 기술 스택 이해**
3. **MVP 개발 철학**
4. **개발 환경 구축**
5. **첫 번째 프로젝트 만들기**

---

## 1. Vibe Coding이란? 🎯

### 정의
> **Vibe Coding**: AI 프롬프트 기반으로 1~2주 내에 실제 서비스 가능한 MVP를 완성하는 개발 방법론

### 핵심 원칙
- ⚡ **속도**: 아이디어 → 배포까지 2주 이내
- 🎨 **단순함**: 복잡한 설정 없이 바로 시작
- 🔄 **반복**: 빠른 피드백과 개선 사이클
- 🚀 **실용성**: 실제 사용자가 사용할 수 있는 완성도

### Vibe Coding의 탄생 배경
- 전통적 개발: 기획 → 설계 → 개발 → 테스트 → 배포 (2~6개월)
- Vibe Coding: 프롬프트 → 생성 → 배포 → 피드백 (1~2주)

---

## 2. 핵심 기술 스택 이해 🛠

### Frontend: Vite + React
```bash
# 프로젝트 생성
npm create vite@latest my-vibe-app -- --template react
cd my-vibe-app
npm install
```

**Vite를 선택한 이유:**
- ⚡ 빠른 개발 서버 (Hot Module Replacement)
- 📦 최적화된 빌드
- 🔧 간단한 설정

### Backend: Firebase
```javascript
// Firebase 설정 예시
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // 여기에 Firebase 프로젝트 설정
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

**Firebase를 선택한 이유:**
- 🔐 인증 시스템 내장
- 💾 실시간 데이터베이스
- 📁 파일 저장소
- 🔧 서버리스 함수

### Deployment: Vercel
```json
// vercel.json 예시
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**Vercel을 선택한 이유:**
- 🚀 Git 연동 자동 배포
- 🌐 글로벌 CDN
- 📊 성능 분석
- 💰 무료 플랜 충분

---

## 3. MVP 개발 철학 💡

### MVP란?
**Minimum Viable Product**: 최소한의 기능으로 사용자 가치를 제공하는 제품

### Vibe MVP의 특징
1. **1페이지 프롬프트**로 전체 기획 완성
2. **핵심 기능 1~3개**만 구현
3. **실제 배포**까지 완료
4. **사용자 피드백** 수집 가능

### 성공하는 MVP의 조건
- ✅ 명확한 문제 해결
- ✅ 간단한 사용자 플로우
- ✅ 즉시 사용 가능한 UI
- ✅ 확장 가능한 구조

---

## 4. 개발 환경 구축 ⚙️

### 필수 도구 설치
1. **Node.js** (v18 이상)
2. **VS Code** + 확장프로그램
3. **Git** + GitHub 계정
4. **Firebase CLI**

### VS Code 확장프로그램
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### 프로젝트 템플릿 구조
```
vibe-project/
├── src/
│   ├── components/          # 재사용 컴포넌트
│   ├── pages/              # 페이지 컴포넌트
│   ├── hooks/              # 커스텀 훅
│   ├── utils/              # 유틸리티 함수
│   └── firebase.js         # Firebase 설정
├── public/
├── package.json
└── README.md
```

---

## 5. 첫 번째 프로젝트 만들기 🚀

### 프로젝트: 간단한 Todo 앱

#### 1단계: 프로젝트 생성
```bash
npm create vite@latest vibe-todo -- --template react
cd vibe-todo
npm install
npm install firebase
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### 2단계: 기본 컴포넌트 구조
```jsx
// src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { 
        id: Date.now(), 
        text: input, 
        completed: false 
      }]);
      setInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Vibe Todo
        </h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-l-md"
            placeholder="할 일을 입력하세요"
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
          >
            추가
          </button>
        </div>
        <ul className="space-y-2">
          {todos.map(todo => (
            <li key={todo.id} className="flex items-center p-2 border rounded">
              <span className={todo.completed ? 'line-through' : ''}>
                {todo.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
```

#### 3단계: 배포하기
```bash
npm run build
# Vercel에 배포
npx vercel --prod
```

---

## 🎓 실습 과제

1. **환경 설정**: 개발환경 완전 구축
2. **첫 프로젝트**: Vibe Todo 앱 완성 및 배포
3. **커스터마이징**: 개인만의 기능 1개 추가

---

## 📚 추천 자료

- [Vite 공식 문서](https://vitejs.dev/)
- [React 공식 문서](https://react.dev/)
- [Firebase 공식 문서](https://firebase.google.com/docs)
- [Vercel 공식 문서](https://vercel.com/docs)
- [Tailwind CSS 공식 문서](https://tailwindcss.com/docs)

---

**다음 교재**: 📗 교재 2권 - MVP 기획 & 프롬프트 설계법