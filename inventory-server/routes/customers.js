const express = require('express')
const { postCustomer, deleteCustomer } = require('../controllers/customers')
const router = express.Router()

router.post('/', postCustomer)

router.delete('/', deleteCustomer)

module.exports = router