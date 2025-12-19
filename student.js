const express = require('express')
const Router = express.Router()
const checkAuth = require('../middleware/checkAuth')
const Student = require('../models/Student')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary').v2;
const Fees = require('../models/Fees')
const Course = require('../models/Courses')


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})



Router.post('/add-student', checkAuth, (req, res) => {

    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token, 'jyoti kumari 1234');
    cloudinary.uploader.upload(req.files.image.tempFilePath, (err, result) => {
        const newStudent = new Student({
            _id: new mongoose.Types.ObjectId,
            fullName: req.body.fullName,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
            courseId: req.body.courseId,
            uId: verify.uId,
            imageUrl: result.secure_url,
            imageId: result.public_id
        })
        newStudent.save()
            .then(result => {
                res.status(200).json({
                    newStudent: result
                })
            })



    })


})


Router.get('/all-student', checkAuth, (req, res) => {

    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token, 'jyoti kumari 1234');


    Student.find({ uId: verify.uId })
        .then(result => {
            res.status(200).json({
                newStudent: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})


Router.get('/all-student/:courseId', checkAuth, (req, res) => {

    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token, 'jyoti kumari 1234');


    Student.find({ uId: verify.uId, courseId: req.params.courseId })
        .then(result => {
            res.status(200).json({
                newStudent: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})


Router.delete('/:id', checkAuth, (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token, 'jyoti kumari 1234');



    Student.findById(req.params.id)
        .then(student => {
            console.log(student)
            if (student.uId == verify.uId) {
                Student.findByIdAndDelete(req.params.id)
                    .then(result => {
                        cloudinary.uploader.destroy(student.imageId, (deletedImage) => {
                            res.status(200).json({
                                result: result
                            })
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            msg: err
                        })
                    })
            }
            else {
                res.status(500).json({
                    msg: 'bad request'
                })
            }
        })
})




Router.put('/:id', checkAuth, (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token, 'jyoti kumari 1234');
    console.log(verify.uId)

    Student.findById(req.params.id)
        .then(student => {
            if (verify.uId != student.uId) {
                return res.status(500).json({
                    error: 'you are not eligible to update this data'
                })
            }
            if (req.files) {
                cloudinary.uploader.destroy(student.imageId, (deletedImage) => {
                    cloudinary.uploader.upload(req.files.image.tempFilePath, (err, result) => {
                        const updatedStudent = {
                            fullName: req.body.fullName,
                            phone: req.body.phone,
                            email: req.body.email,
                            address: req.body.address,
                            courseId: req.body.courseId,
                            uId: verify.uId,
                            imageUrl: result.secure_url,
                            imageId: result.public_id
                        }

                        Student.findByIdAndUpdate(req.params.id, updatedStudent, { new: true })
                            .then(data => {
                                res.status(200).json({
                                    updatedStudent: data
                                })
                            })
                            .catch(err => {
                                console.log(err)
                                res.status(500).json({
                                    error: err
                                })
                            })



                    })

                })
            }
            else {
                const updatedData = {
                    fullName: req.body.fullName,
                    phone: req.body.phone,
                    email: req.body.email,
                    address: req.body.address,
                    courseId: req.body.courseId,
                    uId: verify.uId,
                    imageUrl: student.imageUrl,
                    imageId: student.imageId
                }
                Student.findByIdAndUpdate(req.params.id, updatedData, { new: true })
                    .then(data => {
                        res.status(200).json({
                            updatedData: data
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({
                            error: err
                        })
                    })
            }

        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })


})


Router.get('/recent-students', checkAuth, (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token, 'jyoti kumari 1234');


    Student.find({ uId: verify.uId })
        .sort({ $natural: -1 }).limit(5)
        .then(result => {
            res.status(200).json({
                students: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})


Router.get('/student-detail/:id', checkAuth, (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token, 'jyoti kumari 1234');


    Student.findById(req.params.id)
        .select('_id uId fullName phone email courseId imageUrl imageId address')
        .then(result => {
            Fees.find({ uId: verify.uId, courseId: result.courseId, phone: result.phone })
                .then(feesData => {
                    Course.findById(result.courseId)
                        .then(courseDetail => {
                            res.status(200).json({
                                StudentDetail: result,
                                feeDetail: feesData,
                                courseDetail:courseDetail
                            })
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            })
                        })

                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    })
                })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})





module.exports = Router;