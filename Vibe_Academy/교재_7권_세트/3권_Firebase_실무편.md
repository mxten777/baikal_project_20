# 📙 교재 3권: Firebase 실무편

**Authentication, Firestore, Storage, Functions 완전 정복**

---

## 📋 목차

1. **Firebase 프로젝트 설정**
2. **Authentication 완전 가이드**
3. **Firestore 데이터베이스 실무**
4. **Storage 파일 관리**
5. **Cloud Functions 활용**
6. **보안 규칙 설정**

---

## 1. Firebase 프로젝트 설정 🔧

### Firebase 프로젝트 생성

#### 1단계: 프로젝트 생성
1. [Firebase Console](https://console.firebase.google.com/) 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름 입력 (예: `vibe-mvp-2024`)
4. Google Analytics 설정 (선택사항)

#### 2단계: 웹 앱 등록
```javascript
// Firebase 설정 객체 (firebase.js)
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// 서비스 초기화
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

export default app;
```

#### 3단계: 환경변수 설정
```bash
# .env.local
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
```

---

## 2. Authentication 완전 가이드 🔐

### 이메일/비밀번호 인증 구현

#### AuthContext 설정
```jsx
// src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { 
  auth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 회원가입
  async function signup(email, password, displayName) {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName });
    return result;
  }

  // 로그인
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // 로그아웃
  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
```

#### 로그인 컴포넌트
```jsx
// src/components/Login.jsx
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      setLoading(true);
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password, email.split('@')[0]);
      }
    } catch (error) {
      console.error('Auth error:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? '로그인' : '회원가입'}
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              required
              className="relative block w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <input
              type="password"
              required
              className="relative block w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? '처리중...' : (isLogin ? '로그인' : '회원가입')}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-indigo-600 hover:text-indigo-500"
            >
              {isLogin ? '회원가입하기' : '로그인하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

### 소셜 로그인 구현

#### Google 로그인
```jsx
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';

const provider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error('Google 로그인 실패:', error);
    throw error;
  }
}
```

---

## 3. Firestore 데이터베이스 실무 💾

### 데이터 구조 설계 원칙

#### 컬렉션 네이밍 규칙
```
users/              # 사용자 정보
  {userId}/
    profile         # 프로필 데이터
    settings        # 설정 데이터
    
projects/           # 프로젝트 정보
  {projectId}/
    tasks/          # 하위 컬렉션
      {taskId}
    
notifications/      # 알림
  {notificationId}
```

#### 문서 구조 예시
```javascript
// users 컬렉션 문서 구조
{
  uid: "user123",
  email: "user@example.com",
  displayName: "홍길동",
  photoURL: "https://...",
  createdAt: Timestamp,
  updatedAt: Timestamp,
  role: "user", // admin, user, premium
  settings: {
    theme: "light",
    notifications: true,
    language: "ko"
  }
}

// projects 컬렉션 문서 구조
{
  id: "project123",
  title: "나의 MVP 프로젝트",
  description: "설명...",
  ownerId: "user123",
  collaborators: ["user456", "user789"],
  status: "active", // active, completed, archived
  createdAt: Timestamp,
  updatedAt: Timestamp,
  tags: ["web", "react", "firebase"]
}
```

### CRUD 작업 구현

#### Create (생성)
```javascript
// src/hooks/useFirestore.js
import { 
  collection, 
  addDoc, 
  doc, 
  setDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

export function useFirestore() {
  
  // 새 문서 생성 (자동 ID)
  async function addDocument(collectionName, data) {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('문서 생성 실패:', error);
      throw error;
    }
  }

  // 새 문서 생성 (커스텀 ID)
  async function setDocument(collectionName, docId, data) {
    try {
      await setDoc(doc(db, collectionName, docId), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docId;
    } catch (error) {
      console.error('문서 설정 실패:', error);
      throw error;
    }
  }

  return { addDocument, setDocument };
}
```

#### Read (조회)
```javascript
import { 
  doc, 
  getDoc, 
  collection, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  onSnapshot
} from 'firebase/firestore';

// 단일 문서 조회
async function getDocument(collectionName, docId) {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('문서 조회 실패:', error);
    throw error;
  }
}

// 컬렉션 조회 (쿼리 포함)
async function getDocuments(collectionName, queryOptions = {}) {
  try {
    let q = collection(db, collectionName);
    
    // 조건 추가
    if (queryOptions.where) {
      q = query(q, where(...queryOptions.where));
    }
    
    // 정렬 추가
    if (queryOptions.orderBy) {
      q = query(q, orderBy(...queryOptions.orderBy));
    }
    
    // 제한 추가
    if (queryOptions.limit) {
      q = query(q, limit(queryOptions.limit));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('컬렉션 조회 실패:', error);
    throw error;
  }
}

// 실시간 리스너
function useRealtimeCollection(collectionName, queryOptions) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let q = collection(db, collectionName);
    
    if (queryOptions?.where) {
      q = query(q, where(...queryOptions.where));
    }

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDocuments(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [collectionName]);

  return { documents, loading };
}
```

#### Update (수정)
```javascript
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

async function updateDocument(collectionName, docId, data) {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('문서 수정 실패:', error);
    throw error;
  }
}
```

#### Delete (삭제)
```javascript
import { doc, deleteDoc } from 'firebase/firestore';

async function deleteDocument(collectionName, docId) {
  try {
    await deleteDoc(doc(db, collectionName, docId));
    return true;
  } catch (error) {
    console.error('문서 삭제 실패:', error);
    throw error;
  }
}
```

---

## 4. Storage 파일 관리 📁

### 파일 업로드 구현

#### 이미지 업로드 컴포넌트
```jsx
// src/components/ImageUpload.jsx
import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

export default function ImageUpload({ onUploadComplete }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // 파일 타입 검증
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    // 파일 크기 검증 (5MB 제한)
    if (file.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB 이하여야 합니다.');
      return;
    }

    try {
      setUploading(true);
      
      // 파일명 생성 (타임스탬프 + 랜덤)
      const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}_${file.name}`;
      const storageRef = ref(storage, `images/${fileName}`);
      
      // 파일 업로드
      const snapshot = await uploadBytes(storageRef, file);
      
      // 다운로드 URL 획득
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      // 업로드 완료 콜백
      onUploadComplete(downloadURL);
      
    } catch (error) {
      console.error('파일 업로드 실패:', error);
      alert('파일 업로드에 실패했습니다.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">클릭하여 업로드</span> 또는 드래그 앤 드롭
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF (최대 5MB)</p>
          </div>
          <input 
            type="file" 
            className="hidden" 
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
          />
        </label>
      </div>
      
      {uploading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}
```

### 프로그레스바와 함께 업로드
```javascript
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

async function uploadWithProgress(file, onProgress) {
  const fileName = `${Date.now()}_${file.name}`;
  const storageRef = ref(storage, `uploads/${fileName}`);
  
  const uploadTask = uploadBytesResumable(storageRef, file);
  
  return new Promise((resolve, reject) => {
    uploadTask.on('state_changed',
      (snapshot) => {
        // 진행률 계산
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress(progress);
      },
      (error) => {
        reject(error);
      },
      async () => {
        // 업로드 완료
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
}
```

---

## 5. Cloud Functions 활용 ⚡

### Functions 설정

#### 초기 설정
```bash
# Firebase CLI 설치
npm install -g firebase-tools

# 로그인
firebase login

# Functions 초기화
firebase init functions
```

#### 기본 함수 구조
```javascript
// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// HTTP 트리거 함수
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.json({ message: "Hello from Firebase!" });
});

// Firestore 트리거 함수
exports.onUserCreate = functions.firestore
  .document('users/{userId}')
  .onCreate((snap, context) => {
    const userData = snap.data();
    console.log('새 사용자 생성:', userData.email);
    
    // 환영 이메일 발송 로직
    return sendWelcomeEmail(userData.email);
  });

// 인증 트리거 함수
exports.onUserSignup = functions.auth.user().onCreate((user) => {
  // 새 사용자 프로필 생성
  return admin.firestore().collection('users').doc(user.uid).set({
    email: user.email,
    displayName: user.displayName || '익명',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    role: 'user'
  });
});
```

### 실용적인 Functions 예시

#### 이메일 발송 함수
```javascript
const nodemailer = require('nodemailer');

// 이메일 설정
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: functions.config().email.user,
    pass: functions.config().email.password
  }
});

exports.sendNotificationEmail = functions.https.onCall(async (data, context) => {
  // 인증 확인
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', '로그인이 필요합니다.');
  }

  const { to, subject, html } = data;

  const mailOptions = {
    from: functions.config().email.user,
    to: to,
    subject: subject,
    html: html
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: '이메일이 발송되었습니다.' };
  } catch (error) {
    console.error('이메일 발송 실패:', error);
    throw new functions.https.HttpsError('internal', '이메일 발송에 실패했습니다.');
  }
});
```

---

## 6. 보안 규칙 설정 🔒

### Firestore 보안 규칙

#### 기본 보안 규칙
```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // 사용자 문서 (본인만 읽기/쓰기 가능)
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // 공개 프로젝트 (모든 인증 사용자가 읽기 가능, 소유자만 쓰기 가능)  
    match /projects/{projectId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        (request.auth.uid == resource.data.ownerId || 
         request.auth.uid in resource.data.collaborators);
    }
    
    // 태스크 (프로젝트 멤버만 접근 가능)
    match /projects/{projectId}/tasks/{taskId} {
      allow read, write: if request.auth != null && 
        request.auth.uid in get(/databases/$(database)/documents/projects/$(projectId)).data.collaborators;
    }
  }
}
```

### Storage 보안 규칙
```javascript
// storage.rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    // 사용자별 폴더 (본인만 업로드 가능)
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // 공개 이미지 (인증된 사용자만 업로드, 모든 사용자 읽기 가능)
    match /images/{imageId} {
      allow read: if true;
      allow write: if request.auth != null && 
        request.resource.size < 5 * 1024 * 1024 && // 5MB 제한
        request.resource.contentType.matches('image/.*'); // 이미지만 허용
    }
  }
}
```

---

## 🎓 실습 과제

### 과제 1: 완전한 인증 시스템 구현
- 이메일/비밀번호 + Google 로그인
- 프로필 수정 기능
- 비밀번호 재설정

### 과제 2: 실시간 채팅 앱 만들기
- Firestore 실시간 리스너 활용
- 메시지 저장 및 조회
- 사용자별 채팅방

### 과제 3: 파일 공유 시스템
- Storage 파일 업로드
- 파일 목록 관리
- 공유 링크 생성

---

**이전 교재**: 📗 교재 2권 - MVP 기획 & 프롬프트 설계법  
**다음 교재**: 📕 교재 4권 - 배포 & DevOps 실무편