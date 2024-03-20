const router = require('express').Router()
const subcategorycontroller = require('./../controller/SubCategoryController')
router.post('/subcategory',subcategorycontroller.createdata)
router.get('/subcategory',subcategorycontroller.getdata)
router.get('/subcategory/:id',subcategorycontroller.getdataById)
router.delete('/subcategory/:id',subcategorycontroller.deletedata)
router.put('/subcategory/:id',subcategorycontroller.updatedata)

module.exports = router