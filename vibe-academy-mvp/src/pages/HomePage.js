import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';

const HomePage = () => {
  const { currentUser } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <main className="relative z-10">
        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 mb-6">
                <span className="animate-pulse w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
                6개월간 40+ MVP 제작 경험을 교육으로
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                학습의 새로운
              </span>
              <br />
              <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                경험을 만나보세요
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              실무 중심의 MVP 개발 교육 플랫폼에서 <br />
              <span className="text-indigo-600 font-semibold">이론과 실습을 동시에</span> 경험하세요
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                to="/courses"
                className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 flex items-center"
              >
                <span>🚀 강의 시작하기</span>
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              <Link
                to="/dashboard"
                className="group bg-white text-gray-700 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 border border-gray-200 flex items-center"
              >
                <span>📊 대시보드 보기</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className={`group transform transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">🎯</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">실무 중심 학습</h3>
                <p className="text-gray-600 leading-relaxed">
                  40개 이상의 실제 MVP 제작 경험을 바탕으로 한 실무 중심의 커리큘럼으로 학습하세요.
                </p>
                <div className="mt-6">
                  <span className="text-sm text-indigo-600 font-semibold">MVP 개발 → 실무 적용</span>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className={`group transform transition-all duration-700 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">⚡</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">빠른 프로토타이핑</h3>
                <p className="text-gray-600 leading-relaxed">
                  React, Tailwind, Firebase를 활용한 빠른 MVP 개발 방법론을 익히고 실습해보세요.
                </p>
                <div className="mt-6">
                  <span className="text-sm text-purple-600 font-semibold">아이디어 → MVP → 론칭</span>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className={`group transform transition-all duration-700 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">🤝</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">협업 중심 환경</h3>
                <p className="text-gray-600 leading-relaxed">
                  GitHub 기반의 과제 제출과 피드백 시스템으로 실제 협업 환경을 경험하세요.
                </p>
                <div className="mt-6">
                  <span className="text-sm text-green-600 font-semibold">코드 리뷰 → 피드백 → 성장</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className={`bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">경험으로 검증된 교육</h2>
              <p className="text-xl opacity-90 mb-12">6개월간의 치열한 개발 경험을 교육으로 전달합니다</p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2">40+</div>
                  <div className="text-lg opacity-90">개발한 MVP</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2">6</div>
                  <div className="text-lg opacity-90">개월 경험</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2">100%</div>
                  <div className="text-lg opacity-90">실무 기반</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2">∞</div>
                  <div className="text-lg opacity-90">성장 가능성</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;