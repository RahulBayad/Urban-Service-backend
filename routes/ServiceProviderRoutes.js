const router = require('express').Router()
const serviceprovidcontroller = require('./../controller/ServiceProviderController')
const multerF = require('./../middleware/multer')

router.post('/serviceprovider',multerF.upload, serviceprovidcontroller.createdata)
// router.post('/serviceprovider', serviceprovidcontroller.createdata)
router.get('/serviceprovider',serviceprovidcontroller.getdata)
router.post('/login',serviceprovidcontroller.loginValidation)
router.get('/serviceprovider/:id',serviceprovidcontroller.getdataById)
router.delete('/serviceprovider/:id',serviceprovidcontroller.deletedata)
router.put('/serviceprovider/:id',serviceprovidcontroller.updatedata)
router.put('/addservice/:id', serviceprovidcontroller.updateNestedData)
module.exports = router