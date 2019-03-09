var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.locals.socket_to=req.param('listen_to');
    res.render('index', { title: 'Socket Connection ',listen_to:req.param('listen_to') });
});

module.exports = router;
