import React, { useState } from 'react'
import '../components/style.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';


const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setLoading] = useState(false);


  const navigate = useNavigate();



  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('password', password);
    formData.append('image', image)
    axios.post('http://localhost:4200/user/signup', formData)
      .then(res => {
        setLoading(false);
        navigate('/login')
        toast.success('login succesfully')
        console.log(res)
      })
      .catch(err => {
        setLoading(false);
        toast.error('something went wrong')
        console.log(err)
      })
  }

  const fileHandler = (e) => {
    setImage(e.target.files[0])
    setImageUrl(URL.createObjectURL(e.target.files[0]))
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
            <h1>Create Your Account</h1>
            <input required onChange={e => { setFullName(e.target.value) }} type='text' placeholder='Institute Name'></input>
            <input required onChange={e => { setEmail(e.target.value) }} type='email' placeholder='Email'></input>
            <input required onChange={e => { setPhone(e.target.value) }} type='text' placeholder='Phone'></input>
            <input required onChange={e => { setPassword(e.target.value) }} type='password' placeholder='Password'></input>
            <input required onChange={fileHandler} type='file' />
            {imageUrl && <img className='your-logo' alt='your logo' src={imageUrl} />}
            <button type='submit'>{isLoading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}submit</button>
            <Link className='link' to='/login'>SignIn with Account</Link>


          </form>

        </div>

      </div>
    </div>
  )
}

export default Signup