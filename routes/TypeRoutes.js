const router = require('express').Router()
const typecontroller = require('./../controller/TypeController')
const multerF = require('./../middleware/multer')

router.post('/type',multerF.upload,typecontroller.createdata)
router.post('/type/getBySubcategory',typecontroller.getdataBySubcategory)
router.get('/type',typecontroller.getdata)
router.delete('/type/:id',typecontroller.deletedata)
router.put('/type/:id',typecontroller.updatedata)
module.exports = router