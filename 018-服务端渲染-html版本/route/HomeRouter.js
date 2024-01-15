/* 路由级中间件
路由级中间件和应用级中间件一样，只是它绑定的对象为 express.Router()。
 */
var express = require('express')
var router = express.Router()

//二级路由 匹配除了/home剩下的路径
router.get('/', function (req, res) {
    var list = ['aaa', 'bbb', 'ccc']
    var myhtml = "<b>我是加粗标签</b>"
    res.render('home',{list:list,title:'摩登家庭',myhtml:myhtml});
});


router.get('/list', function (req, res) {
    res.send(['111','222','333']);
});

module.exports = router
