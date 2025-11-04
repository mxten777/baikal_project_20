import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

// 임시 강의 데이터 (나중에 Firebase에서 가져올 예정)
const mockCourses = [
  {
    id: 1,
    title: "React로 MVP 만들기",
    description: "React 기초부터 실제 서비스 배포까지 완전 정복",
    instructor: "김멘토",
    thumbnail: "⚛️",
    category: "Frontend",
    level: "초급",
    duration: "8주",
    students: 45,
    rating: 4.8,
    price: "무료",
    tags: ["React", "JavaScript", "Frontend"]
  },
  {
    id: 2,
    title: "Firebase로 백엔드 구축하기",
    description: "서버 없이도 완전한 웹 서비스 만들기",
    instructor: "박개발",
    thumbnail: "🔥",
    category: "Backend",
    level: "중급",
    duration: "6주",
    students: 32,
    rating: 4.9,
    price: "무료",
    tags: ["Firebase", "NoSQL", "Backend"]
  },
  {
    id: 3,
    title: "Tailwind CSS 마스터하기",
    description: "빠르고 효율적인 스타일링 방법 배우기",
    instructor: "이디자인",
    thumbnail: "🎨",
    category: "CSS",
    level: "초급",
    duration: "4주",
    students: 67,
    rating: 4.7,
    price: "무료",
    tags: ["CSS", "Design", "UI/UX"]
  },
  {
    id: 4,
    title: "Vercel로 배포하기",
    description: "내 프로젝트를 세상에 공개하는 방법",
    instructor: "최배포",
    thumbnail: "🚀",
    category: "DevOps",
    level: "초급",
    duration: "2주",
    students: 89,
    rating: 4.6,
    price: "무료",
    tags: ["Deployment", "Vercel", "DevOps"]
  },
  {
    id: 5,
    title: "GitHub으로 협업하기",
    description: "Git과 GitHub을 활용한 효율적인 팀 개발",
    instructor: "정협업",
    thumbnail: "🐙",
    category: "Tools",
    level: "중급",
    duration: "3주",
    students: 54,
    rating: 4.5,
    price: "무료",
    tags: ["Git", "GitHub", "Collaboration"]
  },
  {
    id: 6,
    title: "MVP 기획과 설계",
    description: "성공하는 MVP를 만들기 위한 기획 방법론",
    instructor: "한기획",
    thumbnail: "📋",
    category: "Planning",
    level: "초급",
    duration: "5주",
    students: 78,
    rating: 4.9,
    price: "무료",
    tags: ["Planning", "Strategy", "MVP"]
  }
];

const categories = ["전체", "Frontend", "Backend", "CSS", "DevOps", "Tools", "Planning"];
const levels = ["전체", "초급", "중급", "고급"];

const CoursesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedLevel, setSelectedLevel] = useState("전체");
  const [searchTerm, setSearchTerm] = useState("");

  // 필터링 로직
  const filteredCourses = mockCourses.filter(course => {
    const matchesCategory = selectedCategory === "전체" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "전체" || course.level === selectedLevel;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesLevel && matchesSearch;
  });

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

      {/* Page Header */}
      <div className="relative z-10 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 overflow-hidden">
        {/* Header Background Pattern */}
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/20 text-white mb-6 backdrop-blur-sm">
              <span className="animate-pulse w-2 h-2 bg-white/60 rounded-full mr-2"></span>
              40+ MVP 개발 경험을 담은 실무 강의
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              📚 프리미엄 강의
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
              실무에서 바로 써먹을 수 있는 <span className="font-semibold">MVP 개발 노하우</span>를 배워보세요
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="어떤 기술을 배우고 싶나요? (React, Firebase, Tailwind...)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 pl-14 pr-6 text-gray-900 bg-white/95 backdrop-blur-sm border-0 rounded-2xl focus:outline-none focus:ring-4 focus:ring-white/30 focus:bg-white transition-all duration-300 text-lg shadow-2xl"
                />
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <svg className="h-6 w-6 text-gray-400 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                {/* Search suggestions could go here */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-100 p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Category Filter */}
            <div>
              <label className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                <span className="mr-2">🎯</span>
                카테고리
              </label>
              <div className="flex flex-wrap gap-3">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Level Filter */}
            <div>
              <label className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                <span className="mr-2">📊</span>
                난이도
              </label>
              <div className="flex flex-wrap gap-3">
                {levels.map(level => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                      selectedLevel === level
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100">
          <div className="flex items-center mb-2 sm:mb-0">
            <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-3 animate-pulse"></div>
            <p className="text-gray-700 text-lg">
              총 <span className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-2xl">{filteredCourses.length}개</span>의 강의를 찾았습니다
            </p>
          </div>
          {searchTerm && (
            <div className="flex items-center bg-indigo-50 px-4 py-2 rounded-xl">
              <svg className="w-4 h-4 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-sm text-indigo-700 font-medium">"{searchTerm}" 검색 결과</span>
            </div>
          )}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => (
            <div 
              key={course.id} 
              className="group bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 ease-out overflow-hidden border border-gray-100 hover:-translate-y-2 hover:rotate-1"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Course Thumbnail */}
              <div className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 h-52 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 via-purple-400/20 to-pink-400/20"></div>
                <div className="relative text-7xl group-hover:scale-110 transition-transform duration-500">
                  {course.thumbnail}
                </div>
                {/* Floating elements */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center">
                  <span className="text-xs">📚</span>
                </div>
                {/* Progress indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
              </div>

              {/* Course Content */}
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1.5 rounded-2xl text-xs font-bold backdrop-blur-sm ${
                    course.level === '초급' ? 'bg-green-100/80 text-green-700 border border-green-200' :
                    course.level === '중급' ? 'bg-amber-100/80 text-amber-700 border border-amber-200' :
                    'bg-red-100/80 text-red-700 border border-red-200'
                  }`}>
                    {course.level}
                  </span>
                  <div className="flex items-center text-xs text-gray-500 bg-gray-100/80 px-3 py-1.5 rounded-2xl">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {course.duration}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300">
                  {course.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>

                <div className="flex items-center mb-4 p-3 bg-gray-50/80 rounded-2xl">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs font-bold">{course.instructor.charAt(0)}</span>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-800">{course.instructor}</div>
                    <div className="text-gray-500 text-xs">강사</div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <div className="flex text-yellow-400 text-sm">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < Math.floor(course.rating) ? '' : 'opacity-30'}>★</span>
                        ))}
                      </div>
                      <span className="text-sm font-bold text-gray-700 ml-2">{course.rating}</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                      {course.students}명
                    </div>
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {course.price}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {course.tags.slice(0, 3).map(tag => (
                    <span 
                      key={tag} 
                      className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 text-xs font-medium rounded-xl border border-gray-200 hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-700 hover:border-indigo-200 transition-all duration-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <Link 
                  to={`/courses/${course.id}`}
                  className="group/button block w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold text-center shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 transform hover:scale-105"
                >
                  <div className="flex items-center justify-center">
                    <span>강의 시작하기</span>
                    <svg className="ml-2 w-5 h-5 group-hover/button:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-gray-100 max-w-md mx-auto">
              <div className="text-8xl mb-6 animate-bounce">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">찾는 강의가 없어요</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                다른 검색어나 필터를 사용해보세요.<br />
                더 많은 강의가 곧 추가될 예정입니다! 🚀
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("전체");
                  setSelectedLevel("전체");
                }}
                className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-xl transform hover:scale-105"
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  필터 초기화
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;