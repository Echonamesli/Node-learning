/* 路由级中间件
路由级中间件和应用级中间件一样，只是它绑定的对象为 express.Router()。
 */
var express = require('express')
var router = express.Router()

//路由级别中间件——响应前端的get请求
router.get('/', function (req, res) {
    //res.send('login-success');
    //res.send('<b>www</b>')
    //res.json([1,2,3])
    //渲染模板后返回给前端，自动去找views文件夹下的login.ejs
    //客户端渲染——访问路径：http://localhost:3000/login.html
    //服务端渲染——访问路径：http://localhost:3000/login
    res.render("login",{title:'唐顿庄园'})  
});


module.exports = router
