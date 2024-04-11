var express = require('express')
var router = express.Router()

const roomController = require("../controller/roomController")


router.get('/:id', roomController.findOneById)
router.delete('/:id', roomController.delete)
router.get('/', roomController.findAll)
router.post('/', roomController.create)





module.exports = router 