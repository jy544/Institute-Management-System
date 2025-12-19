const express = require('express')
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload');

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload({
    useTempFiles: true,
}));


const userRoute = require('./routes/user.js')
const batchRoute = require('./routes/batch.js')
const studentRoute = require('./routes/student.js')
const feesRoute = require('./routes/fees.js');


mongoose.connect('mongodb+srv://Dps:1234@dps.ikzdxbv.mongodb.net/?appName=Dps')
    .then(() => {
        console.log('connected')
    })
    .catch(err => {
        console.log('err')
    })




app.use('/batch', batchRoute)
app.use('/user', userRoute)
app.use('/student', studentRoute)
app.use('/fees', feesRoute)

app.use((req, res) => {
    res.status(404).json({
        msg: 'Bad Request'
    })

})





module.exports = app;