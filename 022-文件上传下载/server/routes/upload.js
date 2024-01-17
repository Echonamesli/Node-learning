var express = require('express');
var router = express.Router();

/* 文件上传下载界面 */
router.get('/', function(req, res, next) {
    res.render('upload');
});



module.exports = router;
