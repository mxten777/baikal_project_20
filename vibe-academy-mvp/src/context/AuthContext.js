import { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 회원가입
  const signup = async (email, password, displayName) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Firestore에 사용자 정보 저장
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: displayName || email.split('@')[0],
        role: 'student',
        createdAt: new Date(),
        lastLoginAt: new Date(),
        enrolledCourses: [],
        completedCourses: [],
        progress: {}
      });
      
      return user;
    } catch (error) {
      throw error;
    }
  };

  // 로그인
  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // 마지막 로그인 시간 업데이트
      await setDoc(doc(db, 'users', result.user.uid), {
        lastLoginAt: new Date()
      }, { merge: true });
      
      return result;
    } catch (error) {
      throw error;
    }
  };

  // 구글 로그인
  const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      
      // 기존 사용자인지 확인
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        // 새 사용자라면 Firestore에 정보 저장
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: 'student',
          createdAt: new Date(),
          lastLoginAt: new Date(),
          enrolledCourses: [],
          completedCourses: [],
          progress: {}
        });
      } else {
        // 기존 사용자라면 마지막 로그인 시간만 업데이트
        await setDoc(doc(db, 'users', user.uid), {
          lastLoginAt: new Date()
        }, { merge: true });
      }
      
      return user;
    } catch (error) {
      throw error;
    }
  };

  // 로그아웃
  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // 사용자 추가 정보 가져오기
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setCurrentUser({ ...user, ...userDoc.data() });
          } else {
            setCurrentUser(user);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setCurrentUser(user);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    googleLogin,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};