const router = require('express').Router()
const userHistoryController = require('./../controller/UserHistoryController')

router.post('/addorder',userHistoryController.addOrder)
router.get('/userhistory',userHistoryController.getUserHistory)
router.get('/userhistory/:id',userHistoryController.getUserHistoryById)
router.put('/order/:id',userHistoryController.updateOrderStatus)
module.exports = router