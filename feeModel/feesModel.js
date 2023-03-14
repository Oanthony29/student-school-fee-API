const mongoose = require('mongoose')

const AddfeeSchema = new mongoose.Schema({
    studentName: {
        type: String,
        require: [true, "studentName place must be filled"]
    },
    regNumber: {
        type: String,
    },
    tutionFee: {
        type: String
    },
    studentClass: {
        type: String,
        require: [true, "studentClass place must be filled"],
    },
    payerEmail: {
        type: String,
        require: [true, "payerEmail must be filled"],
        unique: true
    },
    isPaid: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
})

const feeModel = mongoose.model('feeModel', AddfeeSchema)
module.exports= feeModel