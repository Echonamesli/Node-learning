var express = require('express')
var app = express()
var HomeRouter = require('./route/HomeRouter')
var LoginRouter = require('./route/LoginRouter')

//配置静态资源
/* 通过 Express 内置的 express.static 可以方便地托管静态文件，例如图片、CSS、JavaScript 文件等。
将静态资源文件所在的目录作为参数传递给 express.static 中间件就可以提供静态资源文件的访问了。
例如，假设在 public 目录放置了图片、CSS 和 JavaScript 文件，你就可以：
ps: 所有文件的路径都是相对于存放目录的，因此，存放静态文件的目录名(public、static)不会出现在 URL 中。
访问静态资源文件时，express.static 中间件会根据目录添加的顺序查找所需的文件。
如果你希望所有通过 express.static 访问的文件都存放在一个“虚拟（virtual）”目录（即目录根本不存在）下面，可以通过为静态资源目录指定一个挂载路径的方式来实现，如下所示：
app.use('/static', express.static('public'))
*/
app.use(express.static('public'))   //现在，public 目录下面的文件就可以访问了
app.use(express.static('static'))   //现在，static 目录下面的文件就可以访问了



//配置解析post请求的中间件——不用下载第三方，内置
app.use(express.urlencoded({extended:false}))  //post参数：a=1&b=2
app.use(express.json())        // post参数：{"username":"echo", "password":"666"}


// 应用级别中间件  有/home就匹配到HomeRouter，HomeRouter里面有路由级别的中间件；同理有/login就匹配到LoginRouter
app.use('/home', HomeRouter)
app.use('/login', LoginRouter)

// 应用级别的中间件——全都走一遍——一般放最后
app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

//错误处理中间件和其他中间件定义类似，只是要使用 4 个参数，而不是 3 个，其签名如下： (err, req, res, next)。
app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(3000, () => {
  console.log('server start');
})