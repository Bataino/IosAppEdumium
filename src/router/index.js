import { createRouter, createWebHistory } from '@ionic/vue-router';
import Tabs from '@/layout/Tabs.vue'
import Profile from '@/views/profile/Profile.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },


  // TABS
  {
    path: '/',
    component: Tabs,
    children: [
      {
        path: '/',
        redirect: 'home'
      },
      {
        path: 'home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: 'homework',
        component: () => import('@/views/homework/HomeWork.vue')
      },
      {
        path: 'fees',
        component: () => import('@/views/Fees.vue')
      },
      {
        path: 'notice',
        component: () => import('@/views/Notice.vue')
      },
      {
        path: 'exam',
        component: () => import('@/views/exam/Exam.vue')
      }
    ]
  },
  {
    path: '/login',
    name:"Login",
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/profile',
    redirect: '/profile/personal',
  },
  {
    path: '/tasks',
    component: () => import('@/views/Tasks.vue')
  },

  // PROFILE TABS
  {
    path: '/profile',
    component: Profile,
    children: [
      {
        path: 'parent',
        component: () => import('@/views/profile/Parent.vue')
      },
      {
        path: ':tab',
        component: () => import('@/views/profile/Other.vue')
      },
    ]
  },
  {
    path: '/courses',
    component: () => import('@/views/course/OnlineCourses.vue')
  },
  {
    path: '/classes',
    component: () => import('@/views/class/LiveClasses.vue')
  },
  {
    path: '/webview',
    name:'WebView',
    component: () => import('@/views/WebView.vue')
  },
  {
    path: '/timetable',
    component: () => import('@/views/TimeTable.vue')
  },
  {
    path: '/lessons',
    component: () => import('@/views/LessonPlan.vue')
  },
  {
    path: '/syllabus',
    component: () => import('@/views/syllabus/SyllabusStatus.vue')
  },
  {
    path: '/syllabus/subject',
    name:"SubjectSyllabus",
    component: () => import('@/views/syllabus/SubjectSyllabus.vue')
  },

  // Exam Components
  {
    path: '/onlineexam',
    component: () => import('@/views/exam/OnlineExam.vue')
  },
  {
    path: '/onlineexam/result',
    name:"OnlineExamResult",
    component: () => import('@/views/exam/OnlineExamResult.vue')
  },
  {
    path: '/exam/result',
    name:"ExamResult",
    component: () => import('@/views/exam/Result.vue')
  },
  {
    path: '/exam/schedule',
    name: "ExamSchedule",
    component: () => import('@/views/exam/Schedule.vue')
  },

  // 

  {
    path: '/leave',
    component: () => import('@/views/ApplyLeave.vue')
  },
  {
    path: '/download',
    redirect: '/download/assignment'
  },
  {
    path: '/download/:tab',
    component: () => import('@/views/DownloadCenter.vue'),
  },
  {
    path: '/attendance',
    component: () => import('@/views/Attendance.vue')
  },
  {
    path: '/timeline',
    component: () => import('@/views/Timeline.vue')
  },
  {
    path: '/documents',
    component: () => import('@/views/MyDocuments.vue')
  },
  {
    path: '/reviews',
    component: () => import('@/views/TeacherReview.vue')
  },
  {
    path: '/library',
    component: () => import('@/views/library/Library.vue')
  },
  {
    path: '/library/issued',
    component: () => import('@/views/library/LibraryIssued.vue')
  },
  {
    path: '/routes',
    component: () => import('@/views/TransportRoute.vue')
  },
  {
  path: '/hostels',
  component: () => import('@/views/Hostel.vue')
  },
  {
    path: '/about',
    component: () => import('@/views/About.vue')
  },

  // Upload Stuffs
  {
    path: '/homework/upload',
    name:"UploadHomeWork",
    component: () => import('@/views/homework/UploadHomeWork.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// --eslint-disable-next-line
// router.beforeEach((to, from, next) => {
//   // console.log(to)
//   if(!localStorage.getItem('token') && from.name !== "Login"){
//     next({})
//     return true;
//   }
//   else{
//     next()
//     return
//   }
// })

export default router
