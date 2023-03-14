const feeModel = require('../feeModel/feesModel');
const sendEmail = require('../utils/email')

exports.newFees = async(req, res)=>{
    try {
        const {studentName,regNumber,tutionFee,studentClass, payerEmail} = (req.body)
        const data={
            studentName,
            regNumber,
            tutionFee,
            studentClass,
            payerEmail
        }
        const createfee = await feeModel.create(data)
        const verifyFee = `${req.protocol}://${req.get("host")}/api/changeIsPaid/${createfee._id}`;
        const message = `Your payment of fee was sucessful, Click this link to verify your payment ${verifyFee}`;

        sendEmail({
       email: createfee.payerEmail,
       subject:  "successfully paid.",
       message
   })
        res.status(201).json({
            message: "successfully paid.",
            data:createfee
        })
    } catch (e) {
       res.status(400).json({
        message: e.message
       });
    }
}

exports.changeIsPaid = async (req, res) => {
    try{    
        const userid = req.params.userid
        const user = await feeModel.findById(userid)
        await feeModel.findByIdAndUpdate(
            user._id,
            {
                isPaid: true
            },
            {
                new : true
            }
        )

        res.status(200).json({
            message: " Sucessfully paid fee."
        })

    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
}

exports.allPaidFees = async(req, res)=>{
    try{
        const paidFees = await feeModel.find();
        if(paidFees.length === 0) {
            res.status(404).json({
                message: 'No record in the database',
            })
        }else{
            res.status(201).json({
                paidFeeslength: paidFees.length,
                message: "All Fees paid.",
                data: paidFees
            })
        }

    }catch(e){
        res.status(400).json({
            message: e.message
        })
    }
}