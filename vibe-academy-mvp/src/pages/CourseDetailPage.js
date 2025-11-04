import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';

// 임시 강의 상세 데이터
const mockCourseDetail = {
  id: 1,
  title: "React로 MVP 만들기",
  description: "React 기초부터 실제 서비스 배포까지 완전 정복하는 실무 중심 강의입니다. 단순한 이론 설명이 아닌, 실제 프로젝트를 만들어가면서 배우는 방식으로 진행됩니다.",
  instructor: "김멘토",
  instructorBio: "5년차 풀스택 개발자로, 현재 스타트업에서 CTO로 근무 중입니다. 20개 이상의 MVP 프로젝트를 성공적으로 런칭한 경험이 있습니다.",
  thumbnail: "⚛️",
  category: "Frontend",
  level: "초급",
  duration: "8주",
  students: 45,
  rating: 4.8,
  reviews: 23,
  price: "무료",
  tags: ["React", "JavaScript", "Frontend", "MVP"],
  skills: ["React 기초", "Component 설계", "State 관리", "API 연동", "배포"],
  
  curriculum: [
    {
      week: 1,
      title: "React 기초 개념",
      description: "React의 핵심 개념과 개발 환경 설정",
      lessons: [
        { title: "React란 무엇인가?", duration: "15분", type: "video" },
        { title: "개발 환경 설정", duration: "20분", type: "video" },
        { title: "첫 번째 React 앱 만들기", duration: "30분", type: "practice" }
      ]
    },
    {
      week: 2,
      title: "컴포넌트와 JSX",
      description: "React 컴포넌트의 구조와 JSX 문법 이해",
      lessons: [
        { title: "컴포넌트 기초", duration: "25분", type: "video" },
        { title: "JSX 문법 완전 정복", duration: "30분", type: "video" },
        { title: "컴포넌트 실습", duration: "45분", type: "practice" }
      ]
    },
    {
      week: 3,
      title: "State와 Props",
      description: "React의 데이터 흐름과 상태 관리",
      lessons: [
        { title: "Props 이해하기", duration: "20분", type: "video" },
        { title: "State 관리", duration: "35분", type: "video" },
        { title: "할일 관리 앱 만들기", duration: "60분", type: "project" }
      ]
    },
    {
      week: 4,
      title: "이벤트 처리와 폼",
      description: "사용자 인터랙션 처리 방법",
      lessons: [
        { title: "이벤트 핸들링", duration: "25분", type: "video" },
        { title: "폼 처리하기", duration: "30분", type: "video" },
        { title: "로그인 폼 만들기", duration: "40분", type: "practice" }
      ]
    }
  ],

  assignments: [
    {
      id: 1,
      title: "React 기초 퀴즈",
      description: "React의 기본 개념을 확인하는 퀴즈",
      type: "quiz",
      dueDate: "2024-12-01",
      points: 10
    },
    {
      id: 2,
      title: "To-Do List 만들기",
      description: "React Hook을 사용해서 할일 관리 앱을 만들어보세요",
      type: "project",
      dueDate: "2024-12-08",
      points: 50
    },
    {
      id: 3,
      title: "쇼핑몰 MVP 프로젝트",
      description: "지금까지 배운 내용으로 간단한 쇼핑몰을 만들어보세요",
      type: "project",
      dueDate: "2024-12-15",
      points: 100
    }
  ]
};

const CourseDetailPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [enrolled, setEnrolled] = useState(false);

  const handleEnroll = () => {
    setEnrolled(true);
    // TODO: 실제 수강 신청 로직 추가
  };

  const getLessonIcon = (type) => {
    switch(type) {
      case 'video': return '🎥';
      case 'practice': return '💻';
      case 'project': return '🚀';
      case 'quiz': return '📝';
      default: return '📄';
    }
  };

  const getAssignmentIcon = (type) => {
    switch(type) {
      case 'quiz': return '📝';
      case 'project': return '🚀';
      default: return '📋';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Course Hero Section */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2">
              <div className="text-white">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-5xl">{mockCourseDetail.thumbnail}</span>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-white bg-opacity-20 px-2 py-1 rounded text-sm">
                        {mockCourseDetail.category}
                      </span>
                      <span className="bg-white bg-opacity-20 px-2 py-1 rounded text-sm">
                        {mockCourseDetail.level}
                      </span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">{mockCourseDetail.title}</h1>
                  </div>
                </div>
                
                <p className="text-lg text-primary-100 mb-6">
                  {mockCourseDetail.description}
                </p>
                
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-300">★</span>
                    <span>{mockCourseDetail.rating}</span>
                    <span className="text-primary-200">({mockCourseDetail.reviews}개 리뷰)</span>
                  </div>
                  <div>{mockCourseDetail.students}명 수강</div>
                  <div>{mockCourseDetail.duration}</div>
                </div>
              </div>
            </div>

            {/* Enrollment Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    {mockCourseDetail.price}
                  </div>
                  <p className="text-gray-600">평생 수강 가능</p>
                </div>
                
                {!enrolled ? (
                  <button
                    onClick={handleEnroll}
                    className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition duration-150 ease-in-out font-semibold text-lg"
                  >
                    🚀 수강 신청하기
                  </button>
                ) : (
                  <div className="text-center">
                    <div className="bg-green-100 text-green-800 py-3 px-4 rounded-lg mb-4">
                      ✅ 수강 신청 완료!
                    </div>
                    <button className="w-full bg-secondary-600 text-white py-3 px-4 rounded-lg hover:bg-secondary-700 transition duration-150 ease-in-out font-semibold">
                      강의 시작하기
                    </button>
                  </div>
                )}

                <div className="mt-6 space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">📱</span>
                    모바일, 태블릿에서도 수강 가능
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">💬</span>
                    질문답변 및 피드백 제공
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">🏆</span>
                    수료증 발급
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: '강의 소개', icon: '📋' },
              { id: 'curriculum', label: '커리큘럼', icon: '📚' },
              { id: 'assignments', label: '과제', icon: '📝' },
              { id: 'instructor', label: '강사 정보', icon: '👨‍🏫' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-6">🎯 강의 목표</h2>
                <div className="space-y-4 mb-8">
                  <p className="text-gray-700">
                    이 강의를 통해 React의 핵심 개념을 이해하고, 실제 프로젝트를 만들어볼 수 있습니다.
                  </p>
                  <p className="text-gray-700">
                    단순한 이론 학습이 아닌, 실무에서 바로 활용할 수 있는 실용적인 내용으로 구성되어 있습니다.
                  </p>
                </div>

                <h3 className="text-xl font-semibold mb-4">📈 학습할 수 있는 기술</h3>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {mockCourseDetail.skills.map((skill, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-green-500">✅</span>
                      <span className="text-gray-700">{skill}</span>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-4">🏷 태그</h3>
                <div className="flex flex-wrap gap-2">
                  {mockCourseDetail.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'curriculum' && (
              <div className="space-y-6">
                {mockCourseDetail.curriculum.map((week, index) => (
                  <div key={index} className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                        {week.week}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{week.title}</h3>
                        <p className="text-gray-600 text-sm">{week.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {week.lessons.map((lesson, lessonIndex) => (
                        <div key={lessonIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <span className="text-lg">{getLessonIcon(lesson.type)}</span>
                            <span className="font-medium">{lesson.title}</span>
                          </div>
                          <span className="text-sm text-gray-500">{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'assignments' && (
              <div className="space-y-4">
                {mockCourseDetail.assignments.map((assignment, index) => (
                  <div key={index} className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl">{getAssignmentIcon(assignment.type)}</span>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">{assignment.title}</h3>
                          <p className="text-gray-600 mb-3">{assignment.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>마감일: {assignment.dueDate}</span>
                            <span>배점: {assignment.points}점</span>
                          </div>
                        </div>
                      </div>
                      <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition duration-150 ease-in-out">
                        시작하기
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'instructor' && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {mockCourseDetail.instructor[0]}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{mockCourseDetail.instructor}</h2>
                    <p className="text-gray-600">{mockCourseDetail.instructorBio}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-primary-600">20+</div>
                    <div className="text-sm text-gray-600">런칭한 MVP</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-primary-600">5년</div>
                    <div className="text-sm text-gray-600">개발 경험</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-6">
              <h3 className="text-lg font-semibold mb-4">📊 강의 정보</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">총 강의 시간</span>
                  <span className="font-medium">12시간</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">강의 수</span>
                  <span className="font-medium">48개</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">과제</span>
                  <span className="font-medium">3개</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">수강 기간</span>
                  <span className="font-medium">평생</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">수료증</span>
                  <span className="font-medium">발급</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;