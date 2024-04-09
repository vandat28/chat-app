var express = require('express')
var router = express.Router()

const inboxController = require("../controller/inboxController")


router.get('/:id', inboxController.findOneById)
router.post('/', inboxController.create)
router.put('/:id', inboxController.update)
router.delete('/:id', inboxController.delete)






module.exports = router 