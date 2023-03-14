const express = require('express');
const {newFees, allPaidFees, changeIsPaid} = require('../controllers/fee')
const adminRouter = express.Router();

adminRouter.post('/fee', newFees)
adminRouter.get('/fees', allPaidFees)
adminRouter.post('/confirmfee/:userid', changeIsPaid)

module.exports = adminRouter;