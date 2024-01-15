var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //读取前端的cookie值
  console.log(req.cookies);
  //设置前端的cookie值
  res.cookie('gender','female')
  res.send({name:'echo',work:'我在读取和设置你的cookie值'});
});

module.exports = router;
