var express = require('express')
var router = express.Router()

const userController = require("../controller/userController")



router.get('/find-in-room/:id', userController.findAllUserInRoom)
router.get('/room-member', userController.findRoomMember)
router.get('/:slug', userController.findOneById)
router.post('/add-to-room', userController.createRoomMember)
router.put('/status/:id', userController.updateStatus)





module.exports = router 