# 📕 교재 4권: 배포 & DevOps 실무편

**GitHub, Vercel, Domain, Cloudflare 완전 자동화 구축**

---

## 📋 목차

1. **Git & GitHub 워크플로우**
2. **Vercel 배포 자동화**
3. **커스텀 도메인 설정**
4. **환경변수 관리**
5. **성능 최적화**
6. **모니터링 및 분석**

---

## 1. Git & GitHub 워크플로우 🌿

### 프로젝트 초기 설정

#### Git 초기화 및 연결
```bash
# 로컬 Git 저장소 초기화
git init

# .gitignore 파일 생성
echo "node_modules/
.env.local
.env
dist/
.DS_Store
*.log" > .gitignore

# 첫 커밋
git add .
git commit -m "feat: 초기 프로젝트 설정"

# GitHub 원격 저장소 연결
git remote add origin https://github.com/username/project-name.git
git branch -M main
git push -u origin main
```

#### GitHub Repository 템플릿
```markdown
# 📁 .github/templates/
├── ISSUE_TEMPLATE/
│   ├── bug_report.md
│   └── feature_request.md
├── PULL_REQUEST_TEMPLATE.md
└── workflows/
    ├── deploy.yml
    └── test.yml
```

### 브랜치 전략

#### Git Flow for MVP
```bash
# 메인 브랜치 구조
main        # 프로덕션 배포용
develop     # 개발 통합 브랜치  
feature/*   # 새 기능 개발
hotfix/*    # 긴급 수정

# 예시: 새 기능 개발
git checkout -b feature/user-authentication
# 개발 작업...
git add .
git commit -m "feat: 사용자 인증 시스템 구현"
git push origin feature/user-authentication
# Pull Request 생성
```

#### 커밋 메시지 규칙
```bash
# 커밋 타입
feat:     새로운 기능
fix:      버그 수정
docs:     문서 수정
style:    코드 스타일 변경
refactor: 코드 리팩토링
test:     테스트 추가
chore:    빌드 관련, 설정 변경

# 예시
feat: Firebase 인증 시스템 추가
fix: 로그인 페이지 리다이렉션 오류 수정
docs: README 파일 업데이트
```

---

## 2. Vercel 배포 자동화 🚀

### Vercel 프로젝트 설정

#### vercel.json 설정
```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "GET, POST, PUT, DELETE, OPTIONS" },
        { "key": "Access-Control-Allow-Headers", "value": "Content-Type, Authorization" }
      ]
    }
  ],
  "env": {
    "VITE_FIREBASE_API_KEY": "@firebase_api_key",
    "VITE_FIREBASE_AUTH_DOMAIN": "@firebase_auth_domain",
    "VITE_FIREBASE_PROJECT_ID": "@firebase_project_id"
  }
}
```

#### 자동 배포 설정
```bash
# Vercel CLI 설치
npm install -g vercel

# 프로젝트 연결
vercel

# 환경변수 설정
vercel env add VITE_FIREBASE_API_KEY production

# 수동 배포
vercel --prod

# 브랜치별 배포 확인
# main → Production
# develop → Preview
# feature/* → Development
```

### GitHub Actions 워크플로우

#### 자동 배포 워크플로우
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm run test
    
    - name: Build project
      run: npm run build
      env:
        VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
        VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
        VITE_FIREBASE_PROJECT_ID: ${{ secrets.VITE_FIREBASE_PROJECT_ID }}
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
        vercel-args: '--prod'
      if: github.ref == 'refs/heads/main'
```

#### 테스트 워크플로우
```yaml
# .github/workflows/test.yml
name: Run Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linting
      run: npm run lint
    
    - name: Run type checking
      run: npm run type-check
    
    - name: Run unit tests
      run: npm run test:unit
    
    - name: Upload coverage reports
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info
```

---

## 3. 커스텀 도메인 설정 🌐

### 도메인 구매 및 연결

#### 1단계: 도메인 구매
- **추천 서비스**: Namecheap, GoDaddy, Cloudflare Registrar
- **고려사항**: 
  - `.com` 도메인 우선 고려
  - 브랜드와 일치하는 간단한 이름
  - 연간 갱신 비용 확인

#### 2단계: Vercel 도메인 연결
```bash
# Vercel CLI로 도메인 추가
vercel domains add yourdomain.com

# 또는 Vercel Dashboard에서:
# 1. 프로젝트 설정 → Domains
# 2. 도메인 이름 입력
# 3. DNS 레코드 설정 확인
```

#### 3단계: DNS 설정
```dns
# DNS 레코드 설정 (도메인 제공업체에서)
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A  
Name: @
Value: 76.76.19.61

# 또는 Cloudflare 사용시
Type: CNAME
Name: @
Value: yourdomain.vercel.app
Proxied: Yes (오렌지 구름 활성화)
```

### Cloudflare 통합

#### Cloudflare 설정
```javascript
// Cloudflare 최적화 설정
module.exports = {
  // 캐싱 규칙
  caching: {
    browserTTL: 86400,        // 1일
    edgeTTL: 86400,          // 1일
    alwaysOnline: true,       // Always Online
    developmentMode: false    // 개발 모드 비활성화
  },
  
  // 성능 최적화
  optimization: {
    minify: {
      css: true,
      html: true,
      js: true
    },
    polish: "lossy",          // 이미지 최적화
    mirage: true,            // 이미지 지연 로딩
    rocketLoader: true       // JavaScript 최적화
  },
  
  // 보안 설정
  security: {
    ssl: "strict",           // SSL 강제
    securityLevel: "medium", // 보안 레벨
    challengePassage: "jschallenge"
  }
};
```

#### SSL 인증서 자동 설정
```bash
# Cloudflare SSL 설정 확인
curl -X GET "https://api.cloudflare.com/client/v4/zones/{zone_id}/ssl/verification" \
  -H "X-Auth-Email: your-email@example.com" \
  -H "X-Auth-Key: your-api-key" \
  -H "Content-Type: application/json"

# Vercel에서 SSL 상태 확인
vercel certs ls
```

---

## 4. 환경변수 관리 🔐

### 환경별 설정 관리

#### 환경변수 파일 구조
```bash
# 로컬 환경
.env.local          # 로컬 개발용 (gitignore에 포함)
.env.example        # 예시 파일 (Git에 포함)

# Vercel 환경
# Development - feature/* 브랜치
# Preview - develop 브랜치  
# Production - main 브랜치
```

#### .env.example 템플릿
```bash
# Firebase 설정
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your_app_id

# 외부 API
VITE_OPENAI_API_KEY=sk-your_openai_key
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_key

# 앱 설정
VITE_APP_NAME=My Vibe App
VITE_APP_VERSION=1.0.0
VITE_APP_ENVIRONMENT=development
```

### Vercel 환경변수 설정

#### CLI를 통한 설정
```bash
# 프로덕션 환경변수 설정
vercel env add VITE_FIREBASE_API_KEY production

# 개발/프리뷰 환경변수 설정  
vercel env add VITE_FIREBASE_API_KEY development
vercel env env add VITE_FIREBASE_API_KEY preview

# 환경변수 목록 확인
vercel env ls

# 환경변수 제거
vercel env rm VITE_FIREBASE_API_KEY production
```

#### 환경변수 타입별 관리
```javascript
// src/config/env.js
export const config = {
  // Firebase 설정
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
  },
  
  // 앱 설정
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Vibe App',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    environment: import.meta.env.VITE_APP_ENVIRONMENT || 'development',
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD
  },
  
  // API 설정
  api: {
    openai: import.meta.env.VITE_OPENAI_API_KEY,
    stripe: import.meta.env.VITE_STRIPE_PUBLIC_KEY
  }
};

// 환경변수 검증
function validateConfig() {
  const required = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_PROJECT_ID'
  ];
  
  const missing = required.filter(key => !import.meta.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`필수 환경변수가 누락되었습니다: ${missing.join(', ')}`);
  }
}

if (import.meta.env.PROD) {
  validateConfig();
}
```

---

## 5. 성능 최적화 ⚡

### 빌드 최적화

#### Vite 설정 최적화
```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    // 번들 크기 분석
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true
    })
  ],
  
  build: {
    // 청크 분할 전략
    rollupOptions: {
      output: {
        manualChunks: {
          // 벤더 라이브러리 분리
          vendor: ['react', 'react-dom'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          ui: ['@headlessui/react', 'framer-motion']
        }
      }
    },
    
    // 압축 최적화
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,  // 콘솔 로그 제거
        drop_debugger: true  // 디버거 제거
      }
    },
    
    // 소스맵 설정
    sourcemap: false,  // 프로덕션에서는 소스맵 비활성화
    
    // 청크 크기 경고 임계값
    chunkSizeWarningLimit: 1000
  },
  
  // 개발 서버 최적화
  server: {
    hmr: {
      overlay: false  // 에러 오버레이 비활성화
    }
  }
});
```

### 코드 분할 및 지연 로딩

#### React Lazy Loading
```jsx
// src/App.jsx
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';

// 지연 로딩 컴포넌트
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
```

#### 이미지 최적화
```jsx
// src/components/OptimizedImage.jsx
import { useState } from 'react';

export default function OptimizedImage({ src, alt, className, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      
      <img
        src={src}
        alt={alt}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        loading="lazy"  // 지연 로딩
        {...props}
      />
      
      {error && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-500">이미지 로딩 실패</span>
        </div>
      )}
    </div>
  );
}
```

---

## 6. 모니터링 및 분석 📊

### Vercel Analytics 설정

#### Web Vitals 모니터링
```jsx
// src/main.jsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

// Web Vitals 리포팅 함수
function sendToAnalytics(metric) {
  // Vercel Analytics로 전송
  if (window.va) {
    window.va('track', 'Web Vital', {
      name: metric.name,
      value: metric.value,
      id: metric.id
    });
  }
  
  // 콘솔 로그 (개발 환경)
  if (import.meta.env.DEV) {
    console.log('Web Vital:', metric);
  }
}

// 모든 Web Vitals 수집
getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

#### 커스텀 이벤트 추적
```javascript
// src/utils/analytics.js
export function trackEvent(eventName, properties = {}) {
  // Vercel Analytics
  if (window.va) {
    window.va('track', eventName, properties);
  }
  
  // Google Analytics (선택사항)
  if (window.gtag) {
    window.gtag('event', eventName, properties);
  }
  
  // 개발 환경 로깅
  if (import.meta.env.DEV) {
    console.log('Analytics Event:', eventName, properties);
  }
}

// 사용 예시
trackEvent('Button Click', {
  button_name: 'signup',
  page: '/landing'
});

trackEvent('User Signup', {
  method: 'email',
  source: 'landing_page'
});
```

### 에러 모니터링

#### 에러 경계 컴포넌트
```jsx
// src/components/ErrorBoundary.jsx
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // 에러 로깅 서비스로 전송
    this.logErrorToService(error, errorInfo);
  }

  logErrorToService(error, errorInfo) {
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // 에러 추적 서비스로 전송 (예: Sentry, LogRocket)
    if (window.Sentry) {
      window.Sentry.captureException(error, {
        extra: errorData
      });
    }
    
    // 개발 환경에서는 콘솔에 출력
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', errorData);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              앗! 문제가 발생했습니다
            </h1>
            <p className="text-gray-600 mb-6">
              페이지를 새로고침하거나 잠시 후 다시 시도해주세요.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
            >
              페이지 새로고침
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

---

## 🎓 실습 과제

### 과제 1: 완전한 CI/CD 파이프라인 구축
- GitHub Actions 워크플로우 설정
- 자동 테스트 및 배포
- 환경별 배포 전략

### 과제 2: 성능 최적화 적용
- 번들 크기 분석 및 최적화
- 지연 로딩 구현
- Web Vitals 모니터링

### 과제 3: 커스텀 도메인 연결
- 도메인 구매 및 연결
- SSL 인증서 설정
- Cloudflare 최적화 적용

---

**이전 교재**: 📙 교재 3권 - Firebase 실무편  
**다음 교재**: 📚 교재 5권 - 실전 프로젝트 10선