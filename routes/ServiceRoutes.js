const router = require('express').Router()
const servicecontroller = require('./../controller/ServiceController')
const multerFile = require('./../middleware/multer')

router.post('/service',multerFile.upload ,servicecontroller.createdata)
router.get('/service',servicecontroller.getdata)
router.get('/getServiceBySearch',servicecontroller.getDataBySearch)
router.post('/service/services',servicecontroller.getdataById)
router.delete('/service/:id',servicecontroller.deletedata)
router.put('/service/:id',servicecontroller.updatedata)

module.exports = router
