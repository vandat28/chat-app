var express = require('express')
var router = express.Router()

const userController = require("../controller/userController")


router.get('/:slug', userController.findOneById)






module.exports = router 