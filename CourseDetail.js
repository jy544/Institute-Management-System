import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

const CourseDetail = () => {
    const params = useParams();
    const [course, setCourse] = useState({})
    const [studentList, setStudentList] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        getCourseDetail();
    }, [])

    const getCourseDetail = () => {
        axios.get('http://localhost:4200/batch/course-detail/' + params.id, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                console.log(res.data)
                setCourse(res.data.course);
                setStudentList(res.data.studentList)
            })
            .catch(err => {
                console.log(err)
                toast.error('something went wrong')
            })
    }

    const deleteCourse = (courseId) => {
        if (window.confirm('Are you sure want to delete')) {
            axios.delete('http://localhost:4200/batch/' + courseId, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(res => {
                    console.log(res.data)
                    navigate('/dashboard/courses')

                })
                .catch(err => {
                    console.log(err)
                    toast.error('something went wrong')
                })

        }
    }
    return (
        <div className='detail-main-wrapper'>
            {course && <div>
                <div className='detail-wrapper'>
                    <img src={course.imageUrl} alt='detail' />
                    <div className='course-cont'>
                        <h1>{course.courseName}</h1>
                        <p>price :- {course.price}</p>
                        <p>start Date :- {course.startingDate}</p>
                        <p>end Date :- {course.endDate}</p>
                    </div>
                    <div className='btn-container'>
                        <div className='btn-set'>
                            <button className='btn-1' onClick={() => { navigate('/dashboard/update-course/' + course._id, { state: { course } }) }}>Edit</button>
                            <button className='btn-2' onClick={() => { deleteCourse(course._id) }}>Delete</button>
                        </div>
                        <h3>Course Description</h3>
                        <div className='description'>
                            <p>{course.description}</p>
                        </div>
                    </div>



                </div>

            </div>
            }

            {studentList && studentList.length > 0 &&
                <div className='student-container'>
                    <table>
                        <thead>
                            <tr>
                                <th>student-pic</th>
                                <th>student Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentList.map((student) => (
                                <tr onClick={() => { navigate('/dashboard/student-detail/' + student._id) }} key={student._id} className='student-row'>
                                    <img className='stu-pic' src={student.imageUrl} alt='student' />
                                    <td><p>{student.fullName}</p></td>
                                    <td><p>{student.phone}</p></td>
                                    <td><p>{student.email}</p></td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>

            }
        </div>
    )
}

export default CourseDetail