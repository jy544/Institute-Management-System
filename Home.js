import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Home = () => {

  const [totalCourse, setTotalCourse] = useState(0)
  const [totalStudents, setTotalStudents] = useState(0)
  const [students, setStudents] = useState([])
  const [fees, setFees] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => {
    getHomeDetails();
  }, [])
  const getHomeDetails = () => {
    axios.get('http://localhost:4200/batch/home/', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(res => {
        console.log(res.data)
        setTotalCourse(res.data.totalCourse)
        setTotalStudents(res.data.totalStudent)
        setStudents(res.data.students)
        setFees(res.data.fees)
        setTotalAmount(res.data.totalAmount)

      })
      .catch(err => {
        console.log(err)
        toast.error('something went wrong')
      })
  }
  return (
    <div className='home-cont'>
      <div className='box-cont'>
        <div className='box box-1'>
          <h2>00{totalCourse}</h2>
          <p>Courses</p>
        </div>
        <div className='box box-2'>
          <h2>00{totalStudents}</h2>
          <p>Students</p>

        </div>
        <div className='box box-3'>
          <h2>Rs {totalAmount}</h2>
          <p>Total Transactions</p>

        </div>

      </div>
      <div className='list-cont'>
        <div className='tble-cont'>
          {
            students.length > 0
              ?
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
                  {students.map((student) => (
                    <tr key={student._id} className='student-row'>
                      <td><img className='stu-pic' src={student.imageUrl} alt='student' /></td>
                      <td><p>{student.fullName}</p></td>
                      <td><p>{student.phone}</p></td>
                      <td><p>{student.email}</p></td>
                    </tr>
                  ))}
                </tbody>

              </table>
              :
              <p>No Students is Here</p>


          }


        </div>
        <div className='tble-cont'>
          {
            fees.length > 0 ?
              <table>
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Date And Time</th>
                    <th>Amount</th>
                    <th>Remark</th>
                  </tr>

                </thead>
                <tbody>
                  {

                    fees.map((payment) => (
                      <tr key={payment._id}>
                        <td>{payment.fullName}</td>
                        <td>{payment.createdAt}</td>
                        <td>{payment.amount}</td>
                        <td>{payment.remark}</td>

                      </tr>
                    ))
                  }
                </tbody>
              </table>
              :
              <p>No Transactions Occur</p>

          }

        </div>

      </div>

    </div>
  )
}

export default Home