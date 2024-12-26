const express = require('express')
const { putQrBatch, deleteQrBatch, getQrBatch } = require('../controllers/qrBatch')
const { generateQr } = require('../controllers/qrGenerate')
const router = express.Router()

router.get('/', getQrBatch)

router.put('/', putQrBatch)

router.delete('/', deleteQrBatch)

router.post('/generate', generateQr)

module.exports = router