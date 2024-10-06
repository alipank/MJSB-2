var express = require('express');
var router = express.Router();


router.use('/machines', require('./machines'))
router.use('/brands', require('./brands'))

router.get('/', (req, res, next) => {
  res.json({test: "hello bro"})
});


 

module.exports = router;
