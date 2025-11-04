import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

// 임시 과제 데이터
const mockAssignments = [
  {
    id: 1,
    title: "React 기초 퀴즈",
    description: "React의 기본 개념을 확인하는 퀴즈입니다. 컴포넌트, JSX, Props에 대한 이해도를 점검해보세요.",
    courseTitle: "React로 MVP 만들기",
    courseId: 1,
    type: "quiz",
    difficulty: "초급",
    dueDate: "2024-12-01",
    submittedDate: "2024-11-20",
    status: "submitted", // submitted, graded, pending, overdue
    points: 10,
    maxPoints: 10,
    grade: 85,
    instructor: "김멘토",
    tags: ["React", "기초", "퀴즈"]
  },
  {
    id: 2,
    title: "To-Do List 만들기",
    description: "React Hook을 사용해서 할일 관리 앱을 만들어보세요. useState와 useEffect를 활용한 상태 관리가 핵심입니다.",
    courseTitle: "React로 MVP 만들기",
    courseId: 1,
    type: "project",
    difficulty: "중급",
    dueDate: "2024-12-08",
    submittedDate: null,
    status: "pending",
    points: 50,
    maxPoints: 50,
    grade: null,
    instructor: "김멘토",
    tags: ["React", "Hook", "프로젝트"],
    requirements: [
      "할일 추가/삭제 기능 구현",
      "완료 체크 기능",
      "로컬스토리지에 데이터 저장",
      "반응형 디자인 적용"
    ]
  },
  {
    id: 3,
    title: "Firebase 인증 구현",
    description: "Firebase Authentication을 활용해서 로그인/회원가입 기능을 구현해보세요.",
    courseTitle: "Firebase로 백엔드 구축하기",
    courseId: 2,
    type: "project",
    difficulty: "중급",
    dueDate: "2024-12-15",
    submittedDate: "2024-11-25",
    status: "graded",
    points: 80,
    maxPoints: 100,
    grade: 92,
    instructor: "박개발",
    tags: ["Firebase", "Authentication", "보안"],
    feedback: "전반적으로 잘 구현하셨습니다. 다만 에러 처리 부분을 더 세밀하게 해주시면 좋겠습니다."
  },
  {
    id: 4,
    title: "CSS 레이아웃 실습",
    description: "Flexbox와 Grid를 활용한 반응형 레이아웃을 만들어보세요.",
    courseTitle: "Tailwind CSS 마스터하기",
    courseId: 3,
    type: "practice",
    difficulty: "초급",
    dueDate: "2024-11-30",
    submittedDate: null,
    status: "overdue",
    points: 30,
    maxPoints: 30,
    grade: null,
    instructor: "이디자인",
    tags: ["CSS", "Layout", "반응형"]
  },
  {
    id: 5,
    title: "쇼핑몰 MVP 프로젝트",
    description: "지금까지 배운 내용으로 간단한 쇼핑몰을 만들어보세요. 상품 목록, 장바구니, 결제 페이지까지 구현해보세요.",
    courseTitle: "React로 MVP 만들기",
    courseId: 1,
    type: "project",
    difficulty: "고급",
    dueDate: "2024-12-22",
    submittedDate: null,
    status: "pending",
    points: 150,
    maxPoints: 150,
    grade: null,
    instructor: "김멘토",
    tags: ["React", "MVP", "E-commerce"],
    requirements: [
      "상품 목록 페이지",
      "상품 상세 페이지",
      "장바구니 기능",
      "주문 페이지",
      "반응형 디자인",
      "Firebase 연동"
    ]
  }
];

const AssignmentsPage = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // 필터링 로직
  const filteredAssignments = mockAssignments.filter(assignment => {
    const matchesStatus = filterStatus === "all" || assignment.status === filterStatus;
    const matchesType = filterType === "all" || assignment.type === filterType;
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.courseTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesType && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'graded': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'submitted': return '제출 완료';
      case 'graded': return '채점 완료';
      case 'pending': return '진행 중';
      case 'overdue': return '기한 초과';
      default: return '알 수 없음';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'quiz': return '📝';
      case 'project': return '🚀';
      case 'practice': return '💻';
      default: return '📋';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case '초급': return 'bg-green-100 text-green-800';
      case '중급': return 'bg-yellow-100 text-yellow-800';
      case '고급': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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

      {/* Enhanced Page Header */}
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
              실무 중심의 프로젝트 과제로 성장하세요
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              📝 과제 대시보드
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto px-4">
              GitHub 기반 제출 시스템으로 <span className="font-semibold">실제 협업 경험</span>을 쌓아보세요
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="과제 제목이나 키워드로 검색해보세요... (React, 프로젝트, 퀴즈)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 pl-14 pr-6 text-gray-900 bg-white/95 backdrop-blur-sm border-0 rounded-2xl focus:outline-none focus:ring-4 focus:ring-white/30 focus:bg-white transition-all duration-300 text-lg shadow-2xl"
                />
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <svg className="h-6 w-6 text-gray-400 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Filters */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-100 p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Status Filter */}
            <div>
              <label className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                <span className="mr-2">📊</span>
                진행 상태
              </label>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {[
                  { value: 'all', label: '전체', color: 'gray', icon: '📋' },
                  { value: 'pending', label: '진행 중', color: 'blue', icon: '⏳' },
                  { value: 'submitted', label: '제출 완료', color: 'green', icon: '✅' },
                  { value: 'graded', label: '채점 완료', color: 'purple', icon: '🎯' },
                  { value: 'overdue', label: '기한 초과', color: 'red', icon: '⏰' }
                ].map(status => (
                  <button
                    key={status.value}
                    onClick={() => setFilterStatus(status.value)}
                    className={`flex items-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                      filterStatus === status.value
                        ? `bg-gradient-to-r from-${status.color}-500 to-${status.color}-600 text-white shadow-lg shadow-${status.color}-500/25`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                    }`}
                  >
                    <span className="mr-1 sm:mr-2">{status.icon}</span>
                    <span className="hidden sm:inline">{status.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <label className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                <span className="mr-2">🎭</span>
                과제 유형
              </label>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {[
                  { value: 'all', label: '전체', icon: '📁' },
                  { value: 'quiz', label: '퀴즈', icon: '❓' },
                  { value: 'project', label: '프로젝트', icon: '🚀' },
                  { value: 'practice', label: '실습', icon: '💻' }
                ].map(type => (
                  <button
                    key={type.value}
                    onClick={() => setFilterType(type.value)}
                    className={`flex items-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                      filterType === type.value
                        ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                    }`}
                  >
                    <span className="mr-1 sm:mr-2">{type.icon}</span>
                    <span className="hidden sm:inline">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Results Info */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100">
          <div className="flex items-center mb-2 sm:mb-0">
            <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-3 animate-pulse"></div>
            <p className="text-gray-700 text-lg">
              총 <span className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-2xl">{filteredAssignments.length}개</span>의 과제를 찾았습니다
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

        {/* Enhanced Assignment Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {filteredAssignments.map((assignment, index) => (
            <div 
              key={assignment.id} 
              className="group bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 ease-out overflow-hidden border border-gray-100 hover:-translate-y-2 hover:rotate-1"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Timeline Progress Bar */}
              <div className="h-2 bg-gradient-to-r from-gray-200 to-gray-300">
                <div 
                  className={`h-full transition-all duration-1000 ${
                    assignment.status === 'graded' ? 'bg-gradient-to-r from-green-500 to-emerald-600 w-full' :
                    assignment.status === 'submitted' ? 'bg-gradient-to-r from-blue-500 to-indigo-600 w-3/4' :
                    assignment.status === 'pending' ? 'bg-gradient-to-r from-yellow-500 to-orange-600 w-1/2' :
                    'bg-gradient-to-r from-red-500 to-pink-600 w-1/4'
                  }`}
                ></div>
              </div>

              {/* Assignment Content */}
              <div className="p-4 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-4">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl sm:text-3xl">{getTypeIcon(assignment.type)}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                        {assignment.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 font-medium">
                        📚 {assignment.courseTitle}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-row sm:flex-col items-center sm:items-end space-x-2 sm:space-x-0 sm:space-y-3">
                    <span className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl text-xs sm:text-sm font-bold backdrop-blur-sm ${getStatusColor(assignment.status)}`}>
                      {getStatusText(assignment.status)}
                    </span>
                    <span className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-2xl text-xs font-bold ${getDifficultyColor(assignment.difficulty)}`}>
                      {assignment.difficulty}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">
                  {assignment.description}
                </p>

                {/* Enhanced Assignment Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-medium">마감일</div>
                      <div className={`text-sm font-bold ${
                        new Date(assignment.dueDate) < new Date() && assignment.status === 'pending' 
                          ? 'text-red-600' 
                          : 'text-gray-900'
                      }`}>
                        {assignment.dueDate}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-medium">배점</div>
                      <div className="text-sm font-bold text-gray-900">
                        {assignment.points}점
                      </div>
                    </div>
                  </div>
                </div>

                {/* Instructor & Grade Info */}
                <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">{assignment.instructor.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-medium">강사</div>
                      <div className="text-sm font-bold text-gray-900">{assignment.instructor}</div>
                    </div>
                  </div>
                  {assignment.grade !== null && (
                    <div className="text-right">
                      <div className="text-xs text-gray-500 font-medium">획득 점수</div>
                      <div className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        {assignment.grade}점
                      </div>
                    </div>
                  )}
                </div>

                {/* Enhanced Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {assignment.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 text-xs font-medium rounded-xl border border-gray-200 hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-700 hover:border-indigo-200 transition-all duration-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Enhanced Feedback */}
                {assignment.feedback && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-blue-900 mb-2">💡 강사 피드백</p>
                        <p className="text-sm text-blue-800 leading-relaxed">{assignment.feedback}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Enhanced Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to={`/assignments/${assignment.id}`}
                    className="group flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold text-center shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 transform hover:scale-105"
                  >
                    <div className="flex items-center justify-center">
                      <span className="text-sm sm:text-base">{assignment.status === 'pending' ? '🚀 과제 시작하기' : '📋 과제 확인하기'}</span>
                      <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </Link>
                  
                  <Link
                    to={`/courses/${assignment.courseId}`}
                    className="group bg-white border-2 border-indigo-200 text-indigo-600 py-3 sm:py-4 px-4 sm:px-6 rounded-2xl hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-300 font-semibold text-center shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <div className="flex items-center justify-center">
                      <span className="text-sm sm:text-base">📚 강의 보기</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Empty State */}
        {filteredAssignments.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-gray-100 max-w-md mx-auto">
              <div className="text-8xl mb-6 animate-bounce">📝</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">과제를 찾을 수 없어요</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                다른 검색어나 필터를 사용해보세요.<br />
                새로운 과제가 곧 추가될 예정입니다! 🚀
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterStatus("all");
                  setFilterType("all");
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

export default AssignmentsPage;