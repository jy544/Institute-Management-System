const express = require('express')
const Router = express.Router()
const checkAuth = require('../middleware/checkAuth')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Fee = require('../models/Fees')
const { router } = require('../app')

Router.post('/add-fees', checkAuth, (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token, 'jyoti kumari 1234');

    const newfee = new Fee({
        _id: new mongoose.Types.ObjectId,
        fullName: req.body.fullName,
        phone: req.body.phone,
        remark: req.body.remark,
        amount: req.body.amount,
        courseId: req.body.courseId,
        uId: verify.uId
    })
    newfee.save()
        .then(result => {
            res.status(200).json({
                newfee: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})


Router.get('/payment-history', checkAuth, (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token, 'jyoti kumari 1234');

    Fee.find({ uId: verify.uId })
        .then(result => {
            res.status(200).json({
                paymentHistory: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})


Router.get('/all-payment', checkAuth, (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token, 'jyoti kumari 1234');

    Fee.find({ uId: verify.uId, courseId: req.query.courseId, phone: req.query.phone })
        .then(result => {
            res.status(200).json({
                fees: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})




module.exports = Router;