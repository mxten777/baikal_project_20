# 🚀 Vibe Academy MVP 프로토타입 개발 가이드

**2주 스프린트로 완성하는 동작하는 학습 플랫폼**

---

## 📋 목차

1. [MVP 범위 정의](#1-mvp-범위-정의)
2. [개발 환경 설정](#2-개발-환경-설정)
3. [프론트엔드 개발](#3-프론트엔드-개발)
4. [백엔드 API 개발](#4-백엔드-api-개발)
5. [데이터베이스 구축](#5-데이터베이스-구축)
6. [통합 테스트](#6-통합-테스트)
7. [배포 가이드](#7-배포-가이드)

---

## 🎯 1. MVP 범위 정의

### 🌟 MVP 핵심 기능

#### ✅ 포함할 기능 (Must Have)
```
👤 사용자 관리
- 이메일 회원가입/로그인
- Google OAuth 로그인
- 기본 프로필 관리

📚 강의 시스템
- 강의 목록 조회
- 강의 상세 정보
- 수강 신청
- 기본 진도 추적

📝 과제 시스템  
- 과제 목록 조회
- 과제 제출 (GitHub URL)
- 제출 내역 확인

📊 대시보드
- 개인 학습 현황
- 수강 중인 강의
- 제출한 과제 목록
```

#### ❌ 제외할 기능 (Nice to Have)
```
🚫 복잡한 평가 시스템
🚫 실시간 채팅
🚫 멘토링 매칭
🚫 인증서 발급
🚫 결제 시스템
🚫 고급 분석 기능
```

### 📅 2주 개발 일정

#### Week 1: 기반 구축
```
Day 1-2: 개발환경 설정 + 프로젝트 생성
Day 3-4: 인증 시스템 + 기본 UI
Day 5-7: 강의 시스템 + 데이터베이스
```

#### Week 2: 기능 완성
```
Day 8-10: 과제 시스템 + 대시보드
Day 11-12: 통합 테스트 + 버그 수정
Day 13-14: 배포 + 사용자 테스트
```

---

## ⚙️ 2. 개발 환경 설정

### 🛠 필수 도구 설치

#### 개발 도구 체크리스트
```bash
# Node.js 18+ 설치 확인
node --version  # v18.0.0+
npm --version   # 9.0.0+

# Git 설정 확인
git --version

# VS Code 확장프로그램
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Tailwind CSS IntelliSense
- Thunder Client (API 테스트용)
```

#### 프로젝트 폴더 구조 생성
```bash
# 프로젝트 루트 생성
mkdir vibe-academy-mvp
cd vibe-academy-mvp

# 서브 프로젝트 생성
mkdir frontend backend database docs

# 기본 파일 생성
touch README.md
touch .gitignore
touch docker-compose.yml
```

### 📁 최종 폴더 구조
```
vibe-academy-mvp/
├── frontend/                # Next.js 앱
│   ├── src/
│   │   ├── app/            # App Router
│   │   ├── components/     # 재사용 컴포넌트
│   │   ├── lib/           # 유틸리티, API 클라이언트
│   │   └── types/         # TypeScript 타입
│   ├── public/            # 정적 파일
│   └── package.json
├── backend/               # Node.js API
│   ├── src/
│   │   ├── routes/        # API 라우트
│   │   ├── models/        # 데이터 모델
│   │   ├── middleware/    # 미들웨어
│   │   └── utils/         # 유틸리티
│   └── package.json
├── database/              # DB 관련 파일
│   ├── migrations/        # DB 마이그레이션
│   ├── seeds/            # 초기 데이터
│   └── schema.sql        # DB 스키마
├── docs/                 # 문서
└── docker-compose.yml    # 개발환경 설정
```

---

## 🎨 3. 프론트엔드 개발

### 🚀 Next.js 프로젝트 생성

#### 프로젝트 초기화
```bash
# frontend 폴더로 이동
cd frontend

# Next.js 프로젝트 생성 (TypeScript + App Router)
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir

# 추가 패키지 설치
npm install @next-auth/prisma-adapter next-auth prisma @prisma/client
npm install @headlessui/react @heroicons/react
npm install axios react-query
npm install @hookform/resolvers react-hook-form zod
npm install sonner # 토스트 알림용

# 개발용 패키지
npm install -D @types/node
```

#### 기본 설정 파일들

**tailwind.config.js**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f0f9ff',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
        }
      }
    },
  },
  plugins: [],
}
```

**src/lib/auth.ts (NextAuth 설정)**
```typescript
import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "./prisma"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.fullName,
          image: user.avatarUrl,
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
      }
      return session
    }
  }
}
```

### 🎨 핵심 컴포넌트 개발

#### 1. 레이아웃 컴포넌트
```typescript
// src/components/layout/MainLayout.tsx
'use client'

import { useSession } from "next-auth/react"
import Navigation from "./Navigation"
import Sidebar from "./Sidebar"
import { Toaster } from "sonner"

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main>{children}</main>
        <Toaster position="top-right" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
      <Toaster position="top-right" />
    </div>
  )
}
```

#### 2. 네비게이션 컴포넌트
```typescript
// src/components/layout/Navigation.tsx
'use client'

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { UserIcon, BookOpenIcon } from "@heroicons/react/24/outline"

export default function Navigation() {
  const { data: session } = useSession()

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpenIcon className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">
                Vibe Academy
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  대시보드
                </Link>
                <Link
                  href="/courses"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  강의
                </Link>
                <div className="relative">
                  <button
                    onClick={() => signOut()}
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    <UserIcon className="h-5 w-5" />
                    <span>{session.user?.name}</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  로그인
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-primary-600 text-white hover:bg-primary-700 px-4 py-2 rounded-md text-sm font-medium"
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
```

#### 3. 로그인 페이지
```typescript
// src/app/auth/signin/page.tsx
'use client'

import { useState } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        toast.error("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.")
      } else {
        toast.success("로그인 성공!")
        router.push("/dashboard")
      }
    } catch (error) {
      toast.error("로그인 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Vibe Academy 로그인
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            또는{' '}
            <Link href="/auth/signup" className="font-medium text-primary-600 hover:text-primary-500">
              새 계정 만들기
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">이메일</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="이메일 주소"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="sr-only">비밀번호</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="비밀번호"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
              {isLoading ? "로그인 중..." : "로그인"}
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
                onClick={handleGoogleSignIn}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="ml-2">Google로 로그인</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
```

### 📱 환경변수 설정

**.env.local**
```bash
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/vibe_academy

# API
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 🔌 4. 백엔드 API 개발

### 🚀 Express 서버 설정

#### 프로젝트 초기화
```bash
# backend 폴더로 이동
cd backend

# package.json 생성
npm init -y

# 필수 패키지 설치
npm install express cors helmet morgan dotenv
npm install jsonwebtoken bcryptjs
npm install pg prisma @prisma/client
npm install express-rate-limit express-validator

# 개발용 패키지
npm install -D @types/node @types/express @types/cors
npm install -D @types/jsonwebtoken @types/bcryptjs
npm install -D nodemon ts-node typescript
npm install -D jest @types/jest supertest @types/supertest
```

#### 기본 서버 설정
```typescript
// src/server.ts
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'

// Routes
import authRoutes from './routes/auth'
import courseRoutes from './routes/courses'
import assignmentRoutes from './routes/assignments'
import userRoutes from './routes/users'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000

// Security middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 100 // 100 requests per windowMs
})
app.use('/api', limiter)

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Logging
app.use(morgan('combined'))

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/assignments', assignmentRoutes)
app.use('/api/users', userRoutes)

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
})

export default app
```

#### 인증 미들웨어
```typescript
// src/middleware/auth.ts
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

interface AuthRequest extends Request {
  user?: {
    id: string
    email: string
    role: string
  }
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Access token required' })
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' })
    }
    
    req.user = user
    next()
  })
}

export const requireRole = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' })
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' })
    }

    next()
  }
}
```

---

## 🎯 다음 단계

현재까지 완성된 부분:
- ✅ 프론트엔드 기본 구조 (Next.js + TypeScript)
- ✅ 인증 시스템 (로그인/회원가입)
- ✅ 기본 대시보드
- ✅ 백엔드 API 기본 구조
- ✅ 강의 시스템 API

다음으로 진행할 부분을 선택해주세요:

1. **📊 데이터베이스 스키마 구축** - Prisma로 실제 DB 설정
2. **📝 과제 시스템 완성** - 과제 제출/조회 기능
3. **🐳 개발환경 Docker 설정** - 전체 시스템 컨테이너화
4. **🧪 테스트 및 디버깅** - 기능 테스트 및 버그 수정

어떤 부분을 먼저 완성하시겠습니까? 🚀