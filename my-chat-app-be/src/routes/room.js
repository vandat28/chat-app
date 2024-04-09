var express = require('express')
var router = express.Router()

const roomController = require("../controller/roomController")


router.get('/', roomController.findAll)
router.post('/', roomController.create)
router.delete('/:id', roomController.delete)





module.exports = router 