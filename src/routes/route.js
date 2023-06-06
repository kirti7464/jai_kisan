const express= require('express')
const router =express.Router()
const cardController = require("../controller/cardController")
const custController = require("../controller/custController")

router.get('/test',function(req,res){
    res.send("connection made")
})
router.post("/create",custController.newCust)
router.get("/get",custController.getCust)
router.delete("/del/:id",custController.delCust)
module.exports = router