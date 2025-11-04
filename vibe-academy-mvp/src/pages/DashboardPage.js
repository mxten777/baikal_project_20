import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock data for demo
  const [stats] = useState({
    coursesEnrolled: 3,
    completedAssignments: 12,
    learningProgress: 68,
    earnedPoints: 1240,
    weeklyGoal: 20,
    currentStreak: 7
  });

  const [achievements] = useState([
    { id: 1, name: '첫 걸음', description: '첫 강의 수강 완료', icon: '🎯', earned: true, date: '2024-10-15' },
    { id: 2, name: '과제 마스터', description: '10개 과제 완료', icon: '📝', earned: true, date: '2024-10-20' },
    { id: 3, name: '꾸준히', description: '7일 연속 학습', icon: '🔥', earned: true, date: '2024-11-01' },
    { id: 4, name: 'MVP 개발자', description: '첫 MVP 완성', icon: '🚀', earned: false },
    { id: 5, name: '멘토', description: '다른 학생 도움', icon: '🤝', earned: false },
    { id: 6, name: '전문가', description: '모든 강의 완료', icon: '👑', earned: false }
  ]);

  const [recentActivity] = useState([
    { id: 1, type: 'course', title: 'React로 MVP 만들기', action: '강의 완료', time: '2시간 전', icon: '⚛️' },
    { id: 2, type: 'assignment', title: 'Todo 앱 만들기', action: '과제 제출', time: '5시간 전', icon: '📝' },
    { id: 3, type: 'achievement', title: '꾸준히', action: '배지 획득', time: '1일 전', icon: '🏆' },
    { id: 4, type: 'course', title: 'Firebase로 백엔드 구축하기', action: '강의 시작', time: '2일 전', icon: '🔥' }
  ]);

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const CircularProgress = ({ percentage, size = 120, strokeWidth = 8, color = "indigo" }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = `${circumference} ${circumference}`;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-gray-200"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className={`text-${color}-500 transition-all duration-1000 ease-out`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-2xl font-bold text-${color}-600`}>{percentage}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-32 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          {/* Welcome Message */}
          <div className={`bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 mb-8 relative overflow-hidden transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
            
            <div className="relative flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">👋</div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                      안녕하세요, {currentUser?.displayName || '학습자'}님!
                    </h2>
                    <p className="text-white/90 text-lg">
                      오늘도 새로운 것을 배워보세요 ✨
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-white/80 text-sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {currentTime.toLocaleString('ko-KR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="text-white/90 text-sm mb-2">연속 학습</div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3">
                  <span className="text-3xl mr-2">🔥</span>
                  <span className="text-2xl font-bold text-white">{stats.currentStreak}일</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {/* Course Stats */}
            <div className={`group bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-6 border border-gray-100 hover:-translate-y-2 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ animationDelay: '200ms' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">📚</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{stats.coursesEnrolled}</div>
                  <div className="text-sm text-gray-500">개</div>
                </div>
              </div>
              <div className="mb-3">
                <div className="text-sm font-semibold text-gray-700 mb-1">수강 중인 강의</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-1000" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div className="text-xs text-blue-600 font-medium">이번 주 +1개 추가</div>
            </div>

            {/* Assignment Stats */}
            <div className={`group bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-6 border border-gray-100 hover:-translate-y-2 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ animationDelay: '400ms' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">✅</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{stats.completedAssignments}</div>
                  <div className="text-sm text-gray-500">개</div>
                </div>
              </div>
              <div className="mb-3">
                <div className="text-sm font-semibold text-gray-700 mb-1">완료한 과제</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-1000" style={{ width: '80%' }}></div>
                </div>
              </div>
              <div className="text-xs text-green-600 font-medium">목표 달성률 80%</div>
            </div>

            {/* Progress Stats */}
            <div className={`group bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-6 border border-gray-100 hover:-translate-y-2 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ animationDelay: '600ms' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">📈</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{stats.learningProgress}%</div>
                  <div className="text-sm text-gray-500">진도</div>
                </div>
              </div>
              <div className="mb-3">
                <div className="text-sm font-semibold text-gray-700 mb-1">학습 진도</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all duration-1000" style={{ width: `${stats.learningProgress}%` }}></div>
                </div>
              </div>
              <div className="text-xs text-purple-600 font-medium">평균보다 +15% 빠름</div>
            </div>

            {/* Points Stats */}
            <div className={`group bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-6 border border-gray-100 hover:-translate-y-2 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ animationDelay: '800ms' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🏆</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{stats.earnedPoints.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">점</div>
                </div>
              </div>
              <div className="mb-3">
                <div className="text-sm font-semibold text-gray-700 mb-1">획득 포인트</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-600 h-2 rounded-full transition-all duration-1000" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div className="text-xs text-orange-600 font-medium">상위 10% 달성</div>
            </div>
          </div>

          {/* Learning Progress & Achievements */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {/* Circular Progress */}
            <div className={`bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ animationDelay: '1000ms' }}>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="mr-3">🎯</span>
                주간 학습 목표
              </h3>
              <div className="flex flex-col items-center">
                <CircularProgress percentage={stats.learningProgress} />
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600 mb-2">이번 주 완료한 강의</p>
                  <p className="text-2xl font-bold text-indigo-600">{Math.floor(stats.weeklyGoal * stats.learningProgress / 100)} / {stats.weeklyGoal}</p>
                  <p className="text-xs text-gray-500 mt-1">목표까지 {stats.weeklyGoal - Math.floor(stats.weeklyGoal * stats.learningProgress / 100)}개 남음</p>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className={`xl:col-span-2 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ animationDelay: '1200ms' }}>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="mr-3">🏅</span>
                성취 배지
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={achievement.id}
                    className={`group relative p-4 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1 ${
                      achievement.earned
                        ? 'border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 hover:shadow-lg'
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`text-4xl mb-2 ${!achievement.earned && 'grayscale'}`}>
                        {achievement.icon}
                      </div>
                      <h4 className={`font-semibold text-sm mb-1 ${achievement.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                        {achievement.name}
                      </h4>
                      <p className={`text-xs ${achievement.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                        {achievement.description}
                      </p>
                      {achievement.earned && (
                        <div className="mt-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                            달성
                          </span>
                        </div>
                      )}
                    </div>
                    {achievement.earned && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity & Recommended Courses */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <div className={`bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ animationDelay: '1400ms' }}>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="mr-3">🕒</span>
                최근 활동
              </h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div 
                    key={activity.id} 
                    className="group flex items-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 hover:bg-white/80 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-xl">{activity.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-600 truncate">
                        {activity.action}
                      </p>
                    </div>
                    <div className="text-xs text-gray-500 bg-gray-100/80 px-3 py-1 rounded-xl">
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link 
                  to="/dashboard/activity" 
                  className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                >
                  모든 활동 보기
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Recommended Courses */}
            <div className={`bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ animationDelay: '1600ms' }}>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="mr-3">⭐</span>
                추천 강의
              </h3>
              <div className="space-y-4">
                <Link to="/courses/1" className="group block p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">⚛️</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                        React로 MVP 만들기
                      </h4>
                      <p className="text-gray-600 mt-1 text-sm">
                        React 기초부터 실제 서비스 배포까지 완전 정복
                      </p>
                      <div className="flex items-center mt-3 space-x-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-2xl text-xs font-semibold bg-green-100 text-green-700">
                          초급
                        </span>
                        <span className="text-yellow-400 text-sm">★★★★★</span>
                        <span className="text-xs text-gray-500">4.8 (45명)</span>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link to="/courses/2" className="group block p-5 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">🔥</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                        Firebase로 백엔드 구축하기
                      </h4>
                      <p className="text-gray-600 mt-1 text-sm">
                        서버 없이도 완전한 웹 서비스 만들기
                      </p>
                      <div className="flex items-center mt-3 space-x-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-2xl text-xs font-semibold bg-amber-100 text-amber-700">
                          중급
                        </span>
                        <span className="text-yellow-400 text-sm">★★★★★</span>
                        <span className="text-xs text-gray-500">4.9 (32명)</span>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link to="/courses/4" className="group block p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                        Vercel로 배포하기
                      </h4>
                      <p className="text-gray-600 mt-1 text-sm">
                        내 프로젝트를 세상에 공개하는 방법
                      </p>
                      <div className="flex items-center mt-3 space-x-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-2xl text-xs font-semibold bg-green-100 text-green-700">
                          초급
                        </span>
                        <span className="text-yellow-400 text-sm">★★★★☆</span>
                        <span className="text-xs text-gray-500">4.6 (89명)</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="mt-6">
                <Link 
                  to="/courses" 
                  className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                >
                  모든 강의 보기
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className={`bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ animationDelay: '1800ms' }}>
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="mr-3">🎯</span>
              빠른 시작
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Link 
                to="/courses"
                className="group flex items-center justify-center px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 transform hover:scale-105"
              >
                <span className="mr-2">📚</span>
                강의 둘러보기
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              <Link 
                to="/assignments"
                className="group flex items-center justify-center px-6 py-4 bg-white border-2 border-indigo-200 text-indigo-600 rounded-2xl hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span className="mr-2">📝</span>
                과제 확인하기
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              <button className="group flex items-center justify-center px-6 py-4 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-2xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                <span className="mr-2">👤</span>
                프로필 설정
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;