import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const StudentDetail = () => {

    const [student, setStudent] = useState({})
    const [paymentList, setPaymentList] = useState([])
    const [course, setCourse] = useState('')

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getStudentDetail();

    }, [])


    const getStudentDetail = () => {
        axios.get('http://localhost:4200/student/student-detail/' + params.id, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                console.log(res.data)
                setStudent(res.data.StudentDetail)
                setPaymentList(res.data.feeDetail)
                setCourse(res.data.courseDetail)

            })
            .catch(err => {
                console.log(err)
                toast.error('something went wrong')
            })
    }

    const deleteStudent = (studentId) => {
        if (window.confirm('Are you sure want to delete')) {
            axios.delete('http://localhost:4200/student/' + studentId, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(res => {
                    console.log(res.data)
                    navigate('/dashboard/course-detail/' + course._id)
                    toast.success('Delete Succesfully')

                })
                .catch(err => {
                    console.log(err)
                    toast.error('something went wrong')
                })

        }
    }

    return (
        <div className='student-detail'>
            <div className='detail-cont'>
                <div className='student-header'>
                    <h2>Student Detail</h2>
                    <div className='btn-3'>
                        <button className='btn-1' onClick={() => { navigate('/dashboard/update-student/' + student._id, { state: { student } }) }}>Edit</button>
                        <button className='btn-2 ' onClick={() => { deleteStudent(student._id) }}>Delete</button>
                    </div>
                </div>
                <div className='sd-pic'>
                    <img alt='stu-pic' src={student.imageUrl} />
                    <div className='emg-1'>
                        <h3>{student.fullName}</h3>
                        <p>Phone :- {student.phone}</p>
                        <p>Email :- {student.email}</p>
                        <p>Address :- {student.address}</p>
                        <h4>Course Name :- {course.courseName}</h4>
                    </div>

                </div>
            </div>
            <br />
            <div className='fees-cont'>
                <h4>Payment History</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Date And Time</th>
                            <th>Amount</th>
                            <th>Remark</th>
                        </tr>

                    </thead>
                    <tbody>
                        {

                            paymentList.map((payment) => (
                                <tr key={payment._id}>
                                    <td>{payment.createdAt}</td>
                                    <td>{payment.amount}</td>
                                    <td>{payment.remark}</td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default StudentDetail