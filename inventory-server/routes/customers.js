const express = require('express')
const { postCustomer } = require('../controllers/customers')
const router = express.Router()

router.post('/', postCustomer)

module.exports = router