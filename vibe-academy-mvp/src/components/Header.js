import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('로그아웃되었습니다! 👋');
      navigate('/');
    } catch (error) {
      toast.error('로그아웃 중 오류가 발생했습니다.');
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="relative z-10 bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl font-bold">V</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Vibe Academy
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/') 
                  ? 'bg-indigo-100 text-indigo-600' 
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              🏠 홈
            </Link>
            <Link
              to="/courses"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/courses') 
                  ? 'bg-indigo-100 text-indigo-600' 
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              📚 강의
            </Link>
            <Link
              to="/assignments"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/assignments') 
                  ? 'bg-indigo-100 text-indigo-600' 
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              📝 과제
            </Link>
            <Link
              to="/dashboard"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/dashboard') 
                  ? 'bg-indigo-100 text-indigo-600' 
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              📊 대시보드
            </Link>
          </nav>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <div className="hidden sm:flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-xl px-4 py-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {(currentUser?.displayName || currentUser?.email || 'U').charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 max-w-32 truncate">
                    {currentUser?.displayName || currentUser?.email || '게스트'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-gray-100/80 backdrop-blur-sm hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:shadow-md"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                로그인
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-indigo-600 p-2 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                isActive('/') 
                  ? 'bg-indigo-100 text-indigo-600' 
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              🏠 홈
            </Link>
            <Link
              to="/courses"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                isActive('/courses') 
                  ? 'bg-indigo-100 text-indigo-600' 
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              📚 강의
            </Link>
            <Link
              to="/assignments"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                isActive('/assignments') 
                  ? 'bg-indigo-100 text-indigo-600' 
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              📝 과제
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                isActive('/dashboard') 
                  ? 'bg-indigo-100 text-indigo-600' 
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              📊 대시보드
            </Link>
            
            {/* Mobile User Section */}
            <div className="border-t border-gray-200 pt-4">
              {currentUser ? (
                <>
                  <div className="flex items-center px-3 py-2 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">
                        {(currentUser?.displayName || currentUser?.email || 'U').charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="text-base font-medium text-gray-800">
                        {currentUser?.displayName || '게스트'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {currentUser?.email}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    🚪 로그아웃
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-3 rounded-lg text-base font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
                >
                  로그인
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;