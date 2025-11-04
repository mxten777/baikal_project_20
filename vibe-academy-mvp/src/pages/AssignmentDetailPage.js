import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Header from '../components/Header';

// 임시 과제 상세 데이터
const mockAssignmentDetail = {
  id: 2,
  title: "To-Do List 만들기",
  description: `React Hook을 사용해서 할일 관리 앱을 만들어보세요. 
  
이 과제를 통해 다음과 같은 기술들을 학습할 수 있습니다:
- useState를 활용한 상태 관리
- useEffect를 활용한 사이드 이펙트 처리
- 로컬스토리지를 활용한 데이터 영속성
- 컴포넌트 간 props 전달
- 이벤트 핸들링

실무에서 자주 사용하는 패턴들을 직접 구현해보면서 React의 핵심 개념을 체득해보세요.`,
  
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
    {
      id: 1,
      title: "할일 추가 기능",
      description: "사용자가 새로운 할일을 입력하고 추가할 수 있어야 합니다.",
      points: 10,
      completed: false
    },
    {
      id: 2,
      title: "할일 삭제 기능",
      description: "각 할일 항목에 삭제 버튼이 있어야 하고, 클릭 시 해당 항목이 제거되어야 합니다.",
      points: 10,
      completed: false
    },
    {
      id: 3,
      title: "완료 체크 기능",
      description: "각 할일을 완료/미완료로 토글할 수 있는 체크박스가 있어야 합니다.",
      points: 10,
      completed: false
    },
    {
      id: 4,
      title: "로컬스토리지 저장",
      description: "페이지를 새로고침해도 데이터가 유지되도록 로컬스토리지에 저장해야 합니다.",
      points: 15,
      completed: false
    },
    {
      id: 5,
      title: "반응형 디자인",
      description: "모바일과 데스크톱에서 모두 잘 작동하는 반응형 디자인을 적용해야 합니다.",
      points: 5,
      completed: false
    }
  ],
  
  resources: [
    {
      title: "React Hook 공식 문서",
      url: "https://reactjs.org/docs/hooks-intro.html",
      type: "documentation"
    },
    {
      title: "로컬스토리지 사용법",
      url: "https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage",
      type: "documentation"
    },
    {
      title: "과제 시작 템플릿",
      url: "https://github.com/vibe-academy/todo-template",
      type: "template"
    }
  ],
  
  submissionGuidelines: [
    "GitHub 저장소 URL을 제출해주세요",
    "README.md 파일에 프로젝트 설명과 실행 방법을 작성해주세요",
    "완성된 애플리케이션의 스크린샷을 포함해주세요",
    "배포 링크가 있다면 함께 제출해주세요 (선택사항)"
  ]
};

const AssignmentDetailPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [submissionData, setSubmissionData] = useState({
    githubUrl: '',
    deployUrl: '',
    description: '',
    screenshots: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmission = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 간단한 유효성 검사
    if (!submissionData.githubUrl.trim()) {
      toast.error('GitHub URL을 입력해주세요!');
      setIsSubmitting(false);
      return;
    }

    if (!submissionData.githubUrl.includes('github.com')) {
      toast.error('올바른 GitHub URL을 입력해주세요!');
      setIsSubmitting(false);
      return;
    }

    try {
      // 실제로는 API 호출
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitted(true);
      toast.success('과제가 성공적으로 제출되었습니다! 🎉');
    } catch (error) {
      toast.error('제출 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
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

  const getResourceIcon = (type) => {
    switch(type) {
      case 'documentation': return '📚';
      case 'template': return '📄';
      case 'video': return '🎥';
      default: return '🔗';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <Header />

      {/* Enhanced Assignment Hero Section */}
      <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-200 rounded-full mix-blend-overlay filter blur-xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-white">
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
              {/* Assignment Icon with Animation */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-3xl backdrop-blur-sm animate-pulse"></div>
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
                    <span className="text-6xl block animate-bounce">
                      {getTypeIcon(mockAssignmentDetail.type)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Assignment Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-2xl text-sm font-medium border border-white/30">
                    📚 {mockAssignmentDetail.courseTitle}
                  </span>
                  <span className={`px-4 py-2 rounded-2xl text-sm font-medium border border-white/30 ${getDifficultyColor(mockAssignmentDetail.difficulty)} bg-white`}>
                    🎯 {mockAssignmentDetail.difficulty}
                  </span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  {mockAssignmentDetail.title}
                </h1>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">📅</span>
                      <div>
                        <div className="text-white/80">마감일</div>
                        <div className="font-semibold">{mockAssignmentDetail.dueDate}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">⭐</span>
                      <div>
                        <div className="text-white/80">배점</div>
                        <div className="font-semibold">{mockAssignmentDetail.points}점</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">👨‍🏫</span>
                      <div>
                        <div className="text-white/80">강사</div>
                        <div className="font-semibold">{mockAssignmentDetail.instructor}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Tabs */}
        <div className="mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-gray-100">
            <nav className="flex space-x-1">
              {[
                { id: 'overview', label: '과제 개요', icon: '📋' },
                { id: 'requirements', label: '요구사항', icon: '✅' },
                { id: 'resources', label: '참고 자료', icon: '📚' },
                { id: 'submit', label: '제출하기', icon: '📤' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 transform scale-105'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <span className="mr-2 text-lg">{tab.icon}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center mb-8">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-3 mr-4">
                    <span className="text-2xl">📋</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">과제 개요</h2>
                </div>
                
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 mb-8">
                  <div className="prose max-w-none">
                    <div className="whitespace-pre-line text-gray-700 leading-relaxed text-lg">
                      {mockAssignmentDetail.description}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-2 mr-3">
                      <span className="text-xl">🏷</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">기술 태그</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {mockAssignmentDetail.tags.map((tag, index) => (
                      <span 
                        key={tag} 
                        className="group px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 rounded-2xl text-sm font-medium border border-indigo-200 hover:from-indigo-200 hover:to-purple-200 transition-all duration-300 cursor-pointer transform hover:scale-105"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <span className="group-hover:animate-pulse">#</span>{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'requirements' && (
              <div className="space-y-6">
                <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-8">
                  <div className="flex items-center mb-8">
                    <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-3 mr-4">
                      <span className="text-2xl">✅</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">요구사항 체크리스트</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {mockAssignmentDetail.requirements.map((req, index) => (
                      <div 
                        key={req.id} 
                        className="group bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 transform hover:scale-[1.02]"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold shadow-lg group-hover:scale-110 transition-transform">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                                {req.title}
                              </h3>
                              <p className="text-gray-600 leading-relaxed">{req.description}</p>
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <div className="bg-gradient-to-r from-green-100 to-teal-100 text-green-800 px-3 py-1 rounded-xl text-sm font-bold border border-green-200">
                              {req.points}점
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-3xl p-8 shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-3 mr-4">
                      <span className="text-2xl">📝</span>
                    </div>
                    <h3 className="text-2xl font-bold text-blue-900">제출 가이드라인</h3>
                  </div>
                  <div className="grid gap-3">
                    {mockAssignmentDetail.submissionGuidelines.map((guideline, index) => (
                      <div 
                        key={index} 
                        className="flex items-start space-x-3 p-3 bg-white/50 rounded-xl hover:bg-white/70 transition-colors"
                        style={{ animationDelay: `${index * 150}ms` }}
                      >
                        <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <span className="text-blue-800 font-medium leading-relaxed">{guideline}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center mb-8">
                  <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl p-3 mr-4">
                    <span className="text-2xl">📚</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">참고 자료</h2>
                </div>
                
                <div className="grid gap-6">
                  {mockAssignmentDetail.resources.map((resource, index) => (
                    <div 
                      key={index} 
                      className="group bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:from-yellow-50 hover:to-orange-50 transition-all duration-300 transform hover:scale-[1.02]"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-4 group-hover:scale-110 transition-transform">
                            <span className="text-3xl">{getResourceIcon(resource.type)}</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                              {resource.title}
                            </h3>
                            <a 
                              href={resource.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-gray-600 hover:text-orange-600 text-sm font-medium transition-colors break-all"
                            >
                              {resource.url}
                            </a>
                          </div>
                        </div>
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-4 bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-2xl hover:from-yellow-700 hover:to-orange-700 transition-all duration-300 font-semibold shadow-lg shadow-yellow-500/25 hover:shadow-xl transform hover:scale-105 flex items-center"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          열기
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Additional Resources Tip */}
                <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-6">
                  <div className="flex items-start space-x-3">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-2 flex-shrink-0">
                      <span className="text-xl">💡</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-indigo-900 mb-2">학습 팁</h4>
                      <p className="text-indigo-800 text-sm leading-relaxed">
                        참고 자료를 순서대로 학습하시면 더 효과적입니다. 
                        이해가 안 되는 부분이 있다면 강사에게 언제든지 질문해주세요! 🙋‍♂️
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'submit' && (
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center mb-8">
                  <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-3 mr-4">
                    <span className="text-2xl">📤</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">과제 제출</h2>
                </div>
                
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-12 border-2 border-green-200">
                      <div className="text-8xl mb-6 animate-bounce">🎉</div>
                      <h3 className="text-3xl font-bold text-green-600 mb-4">제출 완료!</h3>
                      <p className="text-gray-600 mb-8 text-lg leading-relaxed max-w-md mx-auto">
                        과제가 성공적으로 제출되었습니다.<br />
                        강사의 피드백을 기다려주세요. 📝
                      </p>
                      <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                          to="/assignments"
                          className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-xl transform hover:scale-105"
                        >
                          <div className="flex items-center justify-center">
                            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                            과제 목록으로
                          </div>
                        </Link>
                        <Link
                          to={`/courses/${mockAssignmentDetail.courseId}`}
                          className="group bg-white text-gray-700 px-8 py-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 font-semibold border-2 border-gray-200 hover:border-gray-300 transform hover:scale-105"
                        >
                          <div className="flex items-center justify-center">
                            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            강의로 돌아가기
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmission} className="space-y-8">
                    {/* GitHub URL Input */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6">
                      <label className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                        <div className="bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl p-2 mr-3">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </div>
                        GitHub 저장소 URL *
                      </label>
                      <input
                        type="url"
                        required
                        value={submissionData.githubUrl}
                        onChange={(e) => setSubmissionData({...submissionData, githubUrl: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-lg"
                        placeholder="https://github.com/username/repository"
                      />
                      <p className="text-sm text-gray-600 mt-2 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        완성된 프로젝트의 GitHub 저장소 URL을 입력해주세요
                      </p>
                    </div>

                    {/* Deploy URL Input */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
                      <label className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-2 mr-3">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                          </svg>
                        </div>
                        배포 URL (선택사항)
                      </label>
                      <input
                        type="url"
                        value={submissionData.deployUrl}
                        onChange={(e) => setSubmissionData({...submissionData, deployUrl: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg"
                        placeholder="https://your-app.vercel.app"
                      />
                      <p className="text-sm text-blue-600 mt-2 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        Vercel, Netlify 등에 배포한 링크가 있다면 입력해주세요
                      </p>
                    </div>

                    {/* Description Input */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
                      <label className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-2 mr-3">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </div>
                        설명 및 특이사항
                      </label>
                      <textarea
                        rows={5}
                        value={submissionData.description}
                        onChange={(e) => setSubmissionData({...submissionData, description: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 text-lg resize-none"
                        placeholder="구현한 기능이나 어려웠던 점, 추가로 구현한 기능 등을 자유롭게 작성해주세요"
                      />
                      <p className="text-sm text-purple-600 mt-2 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        강사에게 전달하고 싶은 내용을 자유롭게 작성해주세요
                      </p>
                    </div>

                    {/* Submit Section */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex items-start space-x-3">
                          <div className="bg-amber-100 rounded-xl p-2 flex-shrink-0">
                            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">제출 전 확인사항</h4>
                            <p className="text-sm text-gray-600">
                              제출 후에는 수정할 수 없습니다. 신중하게 확인 후 제출해주세요.
                            </p>
                          </div>
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="group bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-bold shadow-lg shadow-green-500/25 hover:shadow-xl transform hover:scale-105"
                        >
                          {isSubmitting ? (
                            <div className="flex items-center">
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                              제출 중...
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                              </svg>
                              과제 제출하기
                            </div>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-6 sticky top-6">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-2 mr-3">
                  <span className="text-xl">📊</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">과제 정보</h3>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">과제 유형</span>
                    <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-xl text-sm font-semibold">
                      {mockAssignmentDetail.type}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">난이도</span>
                    <div className={`px-3 py-1 rounded-xl text-sm font-semibold ${getDifficultyColor(mockAssignmentDetail.difficulty)}`}>
                      {mockAssignmentDetail.difficulty}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">배점</span>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-xl text-sm font-semibold">
                      {mockAssignmentDetail.points}점
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">마감일</span>
                    <div className="bg-red-100 text-red-800 px-3 py-1 rounded-xl text-sm font-semibold">
                      {mockAssignmentDetail.dueDate}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">상태</span>
                    <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-xl text-sm font-semibold flex items-center">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></div>
                      진행 중
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200">
                <div className="flex items-center mb-2">
                  <span className="text-indigo-600 font-semibold text-sm">진행률</span>
                  <span className="ml-auto text-indigo-800 font-bold">0%</span>
                </div>
                <div className="w-full bg-indigo-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-3 rounded-full transition-all duration-500" style={{width: '0%'}}></div>
                </div>
                <p className="text-xs text-indigo-600 mt-2">아직 제출하지 않았습니다</p>
              </div>

              {/* Action Button */}
              <div className="mt-6">
                <Link
                  to={`/courses/${mockAssignmentDetail.courseId}`}
                  className="group block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-semibold text-center shadow-lg shadow-purple-500/25 hover:shadow-xl transform hover:scale-105"
                >
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    관련 강의 보기
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetailPage;