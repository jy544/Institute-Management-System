const mongoose = require('mongoose')
const feeSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    fullName: { type: String },
    phone: { type: String },
    remark: { type: String },
    amount: { type: Number },
    courseId: { type: String },
    uId: { type: String }
}, { timestamps: true })


module.exports = mongoose.model('Fee', feeSchema);