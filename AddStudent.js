import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddStudent = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [courseId, setCourseId] = useState('');

  const [image, setImage] = useState(null);

  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setLoading] = useState('');

  const [courseList, setCourseList] = useState([]);

  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    getCourses();
    if (location.state) {
      setFullName(location.state.student.fullName)
      setPhone(location.state.student.phone)
      setEmail(location.state.student.email)
      setCourseId(location.state.student.courseId)
      setImageUrl(location.state.student.imageUrl)
      setAddress(location.state.student.address)
    }
    else {
      setFullName('')
      setPhone('')
      setEmail('')
      setCourseId('')
      setImageUrl('')
      setAddress('')
    }
  }, [location])

  const getCourses = () => {
    axios.get('http://localhost:4200/batch/all-course', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(res => {
        console.log(res.data.courses)
        setCourseList(res.data.courses)
      })
      .catch(err => {
        console.log(err)
        toast.error('something went wrong')
      })
  }

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('address', address);
    formData.append('courseId', courseId);

    if (image) {
      formData.append('image', image);
    }

    if (location.state) {
      axios.put('http://localhost:4200/student/' + location.state.student._id, formData, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then(res => {
          setLoading(false)
          console.log(res.data)
          toast.success('detail updated...')
          navigate('/dashboard/student-detail/' + location.state.student._id)
        })
        .catch(err => {
          setLoading(false)
          console.log(err)
          toast.error('something went wrong....')
        })

    }

    else {
      axios.post('http://localhost:4200/student/add-student', formData, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then(res => {
          setLoading(false)
          console.log(res.data)
          toast.success('Student added...')
          navigate('/dashboard/course-detail/'+courseId)
        })
        .catch(err => {
          setLoading(false)
          console.log(err)
          toast.error('something went wrong....')
        })

    }

  }

  const fileHandler = (e) => {
    setImage(e.target.files[0])
    setImageUrl(URL.createObjectURL(e.target.files[0]))
  }

  return (
    <div>
      <form onSubmit={submitHandler} className='form'>
        <h2>{location.state ? 'Edit Student Detail' : 'Add New Student'}</h2>
        <input value={fullName} onChange={(e) => { setFullName(e.target.value) }} required placeholder='student Name' />
        <input value={phone} onChange={(e) => { setPhone(e.target.value) }} required placeholder='phone Number' />
        <input value={email} onChange={(e) => { setEmail(e.target.value) }} required placeholder='Email' />
        <input value={address} onChange={(e) => { setAddress(e.target.value) }} required placeholder='full Address' />
        <select disabled={location.state} value={courseId} onChange={(e) => { setCourseId(e.target.value) }}>
          <option>Select Course</option>
          {
            courseList.map((course) => (
              <option key={course._id} value={course._id}>{course.courseName}</option>
            ))
          }
        </select>
        <input required={!location.state} onChange={fileHandler} type='file' />
        {imageUrl && <img className='your-logo' alt='student-pic' src={imageUrl} />}
        <button type='submit' className='submit-btn'>{isLoading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}submit</button>



      </form>
    </div>
  )
}

export default AddStudent