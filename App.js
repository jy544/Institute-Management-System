import React from 'react'
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home'
import Courses from './components/Courses'
import AddCourses from './components/AddCourses'
import Student from './components/Student'
import AddStudent from './components/AddStudent'
import CollectFees from './components/CollectFees'
import PaymentHistory from './components/PaymentHistory'
import CourseDetail from './components/CourseDetail'
import StudentDetail from './components/StudentDetail'

const App = () => {
  const myRouter = createBrowserRouter([
    { path: '', Component: Login },
    { path: 'Signup', Component: Signup },
    { path: 'Login', Component: Login },
    {
      path: 'Dashboard', Component: Dashboard, children: [
        { path: '', Component: Home },
        { path: 'home', Component: Home },
        { path: 'courses', Component: Courses },
        { path: 'add-courses', Component: AddCourses },
        { path: 'students', Component: Student },
        { path: 'add-students', Component: AddStudent },
        { path: 'collect-fees', Component: CollectFees },
        { path: 'payement-history', Component: PaymentHistory },
        { path: 'course-detail/:id', Component: CourseDetail },
        {path:'update-course/:id',Component:AddCourses},
        { path: 'student-detail/:id', Component: StudentDetail },
        {path:'update-student/:id',Component:AddStudent},


      ]
    }
  ])
  return (
    <>
      <RouterProvider router={myRouter} />
      <ToastContainer />
    </>
  )
}

export default App
