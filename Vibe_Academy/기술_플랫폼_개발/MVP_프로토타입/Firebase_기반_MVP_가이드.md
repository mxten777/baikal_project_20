# 🔥 Firebase 기반 Vibe Academy MVP 개발 가이드

**기존 스택 활용: React + Tailwind + Firebase + Vercel + GitHub**

---

## 🎯 기존 스택으로 MVP 재설계

### ✅ 사용할 기술 스택
```
🎨 프론트엔드: React + Tailwind CSS
🔥 백엔드: Firebase (Authentication + Firestore + Storage)
🚀 배포: Vercel
📝 버전관리: GitHub
📱 라우팅: React Router
🎪 상태관리: React Context API (또는 기존 사용하던 것)
```

### 🏗 Firebase 서비스 활용법
```
🔐 Firebase Auth: 구글 로그인, 이메일 회원가입
📊 Firestore: 강의, 과제, 사용자 데이터 저장
📁 Storage: 과제 파일, 이미지 업로드
🌐 Hosting: 정적 파일 서빙 (Vercel과 함께 사용)
```

---

## 🚀 프로젝트 구조

### 📁 폴더 구조
```
vibe-academy-mvp/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/          # 재사용 컴포넌트
│   │   ├── Layout/
│   │   ├── Auth/
│   │   ├── Course/
│   │   └── Assignment/
│   ├── pages/              # 페이지 컴포넌트
│   │   ├── Dashboard.jsx
│   │   ├── Courses.jsx
│   │   ├── Login.jsx
│   │   └── Profile.jsx
│   ├── hooks/              # 커스텀 훅
│   │   ├── useAuth.js
│   │   ├── useCourses.js
│   │   └── useAssignments.js
│   ├── services/           # Firebase 설정
│   │   ├── firebase.js
│   │   ├── auth.js
│   │   └── firestore.js
│   ├── context/            # 상태 관리
│   │   └── AuthContext.js
│   └── utils/              # 유틸리티
│       └── constants.js
├── package.json
└── tailwind.config.js
```

---

## ⚙️ 개발 환경 설정

### 📦 패키지 설치
```bash
# React 앱 생성
npx create-react-app vibe-academy-mvp
cd vibe-academy-mvp

# 필수 패키지 설치
npm install firebase
npm install react-router-dom
npm install react-hook-form
npm install react-hot-toast  # 알림용

# Tailwind CSS 설정 (이미 아시는 방법대로)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 🔥 Firebase 설정

#### 1. Firebase 프로젝트 생성
```bash
# Firebase CLI 설치 (처음이라면)
npm install -g firebase-tools

# Firebase 로그인
firebase login

# 프로젝트 초기화
firebase init
```

#### 2. Firebase 설정 파일
```javascript
// src/services/firebase.js
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  // Firebase Console에서 복사
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
}

// Firebase 초기화
const app = initializeApp(firebaseConfig)

// 서비스 초기화
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app
```

#### 3. 환경변수 설정
```bash
# .env 파일 생성
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

---

## 🔐 인증 시스템 구현

### 1. AuthContext 생성
```javascript
// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react'
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '../services/firebase'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // 회원가입
  const signup = async (email, password, displayName) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    
    // Firestore에 사용자 정보 저장
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: displayName,
      role: 'student',
      createdAt: new Date(),
      progress: {},
      enrolledCourses: []
    })
    
    return user
  }

  // 로그인
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  // 구글 로그인
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider()
    const { user } = await signInWithPopup(auth, provider)
    
    // 기존 사용자인지 확인
    const userDoc = await getDoc(doc(db, 'users', user.uid))
    if (!userDoc.exists()) {
      // 새 사용자라면 Firestore에 정보 저장
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: 'student',
        createdAt: new Date(),
        progress: {},
        enrolledCourses: []
      })
    }
    
    return user
  }

  // 로그아웃
  const logout = () => {
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // 사용자 추가 정보 가져오기
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        if (userDoc.exists()) {
          setCurrentUser({ ...user, ...userDoc.data() })
        } else {
          setCurrentUser(user)
        }
      } else {
        setCurrentUser(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup,
    login,
    googleLogin,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
```

### 2. 로그인 컴포넌트
```javascript
// src/pages/Login.jsx
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  
  const { login, signup, googleLogin } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isLogin) {
        await login(email, password)
        toast.success('로그인 성공!')
      } else {
        await signup(email, password, email.split('@')[0])
        toast.success('회원가입 성공!')
      }
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await googleLogin()
      toast.success('구글 로그인 성공!')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Vibe Academy 로그인' : 'Vibe Academy 회원가입'}
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="이메일 주소"
            />
          </div>
          
          <div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="비밀번호"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? '처리중...' : (isLogin ? '로그인' : '회원가입')}
            </button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">또는</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google로 로그인
              </button>
            </div>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:text-blue-500"
            >
              {isLogin ? '계정이 없으세요? 회원가입' : '이미 계정이 있으세요? 로그인'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
```

---

## 📊 Firestore 데이터 구조

### 🗃 컬렉션 구조
```javascript
// users 컬렉션
{
  uid: "user123",
  email: "user@example.com",
  displayName: "김개발",
  photoURL: "https://...",
  role: "student", // student, instructor, admin
  createdAt: timestamp,
  enrolledCourses: ["course1", "course2"],
  progress: {
    "course1": {
      completedLessons: ["lesson1", "lesson2"],
      progress: 60,
      lastAccessed: timestamp
    }
  }
}

// courses 컬렉션
{
  id: "course1",
  title: "React로 MVP 만들기",
  description: "React 기초부터 실제 배포까지",
  instructor: "김멘토",
  thumbnail: "https://...",
  lessons: [
    {
      id: "lesson1",
      title: "React 기초",
      videoUrl: "https://...",
      duration: 1800, // 초
      order: 1
    }
  ],
  assignments: ["assignment1", "assignment2"],
  enrolledStudents: ["user123", "user456"],
  createdAt: timestamp,
  isPublished: true
}

// assignments 컬렉션
{
  id: "assignment1",
  courseId: "course1",
  title: "To-Do List 만들기",
  description: "React Hook을 사용해서 할일 관리 앱을 만들어보세요",
  requirements: [
    "할일 추가/삭제 기능",
    "완료 체크 기능",
    "로컬스토리지 저장"
  ],
  dueDate: timestamp,
  submissions: {
    "user123": {
      githubUrl: "https://github.com/user/todo-app",
      submittedAt: timestamp,
      status: "submitted", // submitted, graded
      grade: null,
      feedback: ""
    }
  }
}
```

---

## 🎯 다음 단계

이제 **기존에 익숙한 스택**으로 편안하게 개발할 수 있습니다!

### 🚀 즉시 시작 가능한 작업:

1. **📦 프로젝트 생성** - `create-react-app` + Firebase 설정
2. **🔐 인증 구현** - 위의 코드로 로그인/회원가입
3. **📊 대시보드** - Firestore에서 데이터 가져와 표시
4. **📚 강의 목록** - 기존 React 패턴으로 구현
5. **🚀 Vercel 배포** - 기존 방식 그대로!

**어떤 부분부터 시작하시겠어요?** 
- 바로 코딩 시작하기
- Firebase 프로젝트 설정부터
- 전체 프로젝트 구조 먼저 만들기

**편안한 기술 스택으로 빠르게 MVP를 완성해봅시다!** 🔥