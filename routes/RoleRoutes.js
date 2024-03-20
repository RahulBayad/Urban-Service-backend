const router = require('express').Router()
const rolecontroller = require('./../controller/RoleController')
router.post("/role",rolecontroller.createroledata)
router.get("/role",rolecontroller.getroledata)
router.delete("/role/:id",rolecontroller.deleteroledata)
router.put('/role/:id',rolecontroller.updateroledata)
module.exports = router