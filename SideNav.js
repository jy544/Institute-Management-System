import React from 'react'
import '../components/style.css'
import { Link, useLocation } from 'react-router-dom'

const SideNav = () => {
  const location = useLocation();
  return (
    <div className='Dashboard-nav'>
      <div className='brand-container'>
        <img className='logo-2' alt='institute logo' src={require('../assets/institute.png')} />
        <h2 className='institute-name'>XYZ Institute</h2>
      </div>
      <div className='menu-container'>
        <Link to='/dashboard/home' className={location.pathname === '/dashboard/home' ? 'menu-active-link' : 'menu-link'}><i className="fa-chisel fa-regular fa-house"></i> Home</Link>
        <Link to='/dashboard/Courses' className={location.pathname === '/dashboard/Courses' ? 'menu-active-link' : 'menu-link'}><i className="fa-etch fa-solid fa-book"></i> All Course</Link>
        <Link to='/dashboard/add-courses' className={location.pathname === '/dashboard/add-courses' ? 'menu-active-link' : 'menu-link'}><i className="fa-solid fa-plus"></i> Add Course</Link>
        <Link to='/dashboard/add-students' className={location.pathname === '/dashboard/add-students' ? 'menu-active-link' : 'menu-link'}><i className="fa-solid fa-users"></i> Add Student</Link>
        <Link to='/dashboard/students' className={location.pathname === '/dashboard/students' ? 'menu-active-link' : 'menu-link'}><i className="fa-solid fa-address-card"></i> All Student</Link>
        <Link to='/dashboard/collect-fees' className={location.pathname === '/dashboard/collect-fees' ? 'menu-active-link' : 'menu-link'}><i className="fa-brands fa-paypal"></i> Collect Fees</Link>
        <Link to='/dashboard/payement-history' className={location.pathname === '/dashboard/payement-history' ? 'menu-active-link' : 'menu-link'}><i className="fa-brands fa-cc-paypal"></i> Payment History</Link>

      </div>
      <div className='contact'>
        <p><i className="fa-jelly-duo fa-regular fa-address-card"></i> Contact Us</p>
        <p><i className="fa-notdog fa-solid fa-phone"></i> 9259642091</p>

      </div>

    </div>
  )
}

export default SideNav