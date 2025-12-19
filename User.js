const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    fullName: { type: String },
    email: { type: String },
    password: { type: String },
    phone: { type: String },
    imageUrl: { type: String },
    imageId: { type: String }
})


module.exports = mongoose.model('User', userSchema);