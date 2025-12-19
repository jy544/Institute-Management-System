import React, { useState } from 'react'
import '../components/style.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);


  const navigate = useNavigate();



  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    axios.post('http://localhost:4200/user/login', {
      email: email,
      password: password
    })
      .then(res => {
        setLoading(false);
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('fullName', res.data.fullName)
        localStorage.setItem('imageUrl', res.data.imageUrl)
        localStorage.setItem('imageId', res.data.imageId)
        localStorage.setItem('email', res.data.email)
        navigate('/dashboard')
        toast.success('login succesfully')
        console.log(res.data)
      })
      .catch(err => {
        setLoading(false);
        toast.error('something went wrong')
        console.log(err)
      })
  }



  return (
    <div className='signup-wrapper'>
      <div className='signup-box'>
        <div className='signup-left'>
          <img alt='logo' src={require('../assets/graduated.png')} className='picture'></img>
          <h1 className='heading1'>XYZ Institute</h1>
          <p className='para1'>learn faster earn faster...</p>
        </div>
        <div className='signup-right'>
          <form onSubmit={submitHandler} className='form'>
            <h1>Login</h1>
            <input required onChange={e => { setEmail(e.target.value) }} type='email' placeholder='Email'></input>
            <input required onChange={e => { setPassword(e.target.value) }} type='password' placeholder='Password'></input>
            <button type='submit'>{isLoading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}submit</button>
            <Link className='link' to='/signup'>Create Your Account</Link>


          </form>

        </div>

      </div>
    </div>
  )
}

export default Login