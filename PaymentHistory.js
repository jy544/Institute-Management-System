import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const PaymentHistory = () => {
  const [paymentList, setPaymentList] = useState([])

  useEffect(() => {
    getPaymentHistory();

  }, [])

  const getPaymentHistory = () => {
    axios.get('http://localhost:4200/fees/payment-history/', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(res => {
        console.log(res.data)
        setPaymentList(res.data.paymentHistory.reverse())

      })
      .catch(err => {
        console.log(err)
        toast.error('something went wrong')
      })
  }
  return (
    <div className='pay-cont'>
      <h4>Payment History</h4>
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

            paymentList.map((payment) => (
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

    </div>

  )
}

export default PaymentHistory