var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

/* GET uber page */
router.get('/uber', function (req, res, next) {

});


module.exports = router;
