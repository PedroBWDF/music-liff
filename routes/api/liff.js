const express = require('express')
const router = express.Router()
const liffController = require('../../controllers/liff-controller')

router.get('/uuid', liffController.getUuid)
router.post('/update', liffController.updateDisplayName)

module.exports = router