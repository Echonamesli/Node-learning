/* 路由级中间件
路由级中间件和应用级中间件一样，只是它绑定的对象为 express.Router()。
 */
var express = require('express')
var router = express.Router()

//路由级别中间件——响应前端的get请求
router.get('/', function (req, res) {
    //路由级中间件可以获取get请求参数
    console.log(req.query);
    res.send('login');
});

//路由级别中间件——响应前端的post请求
router.post('/', function (req, res) {
    //路由级中间件可以获取post请求参数
    console.log(req.body);   //必须配置中间件
    const {username, password} = req.body
    res.send({ok:1});
});


module.exports = router
