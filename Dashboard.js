import React from 'react'
import '../components/style.css'
import SideNav from '../components/SideNav'
import { Outlet, useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    navigate('/login');
  }
  return (
    <div className='Dashboard'>
      <div className='Dashboard-container'>
        <SideNav />
        <div className='Dashboard-main'>
          <div className='top-bar'>
            <div className='logo-c'>
              <img alt='profile logo' className='profile' src={localStorage.getItem('imageUrl')} />

            </div>
            <div className='profile-con'>
              <h3 className='profile-name'>{localStorage.getItem('fullName')}</h3>
              <button className='logout-btn' onClick={logoutHandler}>Logout</button>

            </div>

          </div>

          <Outlet />

        </div>
      </div>

    </div>
  )
}

export default Dashboard