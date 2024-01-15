var express = require('express');
var app = express();
/* Express 应用可使用如下几种中间件：
    应用级中间件
    路由级中间件
    错误处理中间件
    内置中间件
    第三方中间件
 */


/* 
应用级中间件绑定到 app 对象 使用 app.use() 和 app.METHOD()， 
其中， METHOD 是需要处理的 HTTP 请求的方法，例如 GET, PUT, POST 等等，全部小写。
例如： 
*/

// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})


app.listen(3000, () => {
    console.log('server start');
})