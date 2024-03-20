const router = require('express').Router()
const categorycontroller = require('./../controller/CategoryController')

router.post("/category",categorycontroller.createcategorydata)
router.get("/category",categorycontroller.getcategorydata)
router.put("/category/:id",categorycontroller.updatecategorydata)


// router.post("/imagePractice",multerImage.upload,multerImage.uploadImage);

router.delete("/category/:id",categorycontroller.deletecategorydata)
module.exports = router