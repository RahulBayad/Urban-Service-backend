const router = require('express').Router()
const servProHistoryController = require('./../controller/ServProHistoryController')

router.post('/addservice/:email',servProHistoryController.addOrder)
router.get('/servprohistory',servProHistoryController.getServProHistory)
router.get('/servprohistory/:email',servProHistoryController.getServProHistoryById)
router.put('/service/:id',servProHistoryController.updateServiceStatus)
router.put('/cancelOrder/:email',servProHistoryController.cancelOrder)
router.put('/completeOrder/:email',servProHistoryController.completeOrder)
module.exports = router