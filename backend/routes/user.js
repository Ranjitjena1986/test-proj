const express = require("express");
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('Express RESTful API');
});


module.exports = router;