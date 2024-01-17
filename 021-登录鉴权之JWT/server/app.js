var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var JWT = require("./util/JWT")

const session = require("express-session");   //用于登录鉴权 Cookie&Session
const MongoStore = require("connect-mongo");  //将我们的session数据存到MongoStore模块中

var app = express();

//token过期校验中间件
app.use((req, res, next) => {
  // 如果token有效 ,next() 
  // 如果token过期了, 返回401错误
  if (req.url.includes("login")) {
    next()
    return;
  }
  const token = req.headers["authorization"]?.split(" ")[1]
  if (token) {
    var payload = JWT.verify(token)
    if (payload) {
      /* 第二步： 输入账号密码，发起登录接口请求时，服务端根据用户信息生成token放在响应头给前端，前端
      在axios的响应拦截器那里拿到token并localStorage，之后所有接口都有token都会走到这里放行 */
      const newToken = JWT.generate({   //每次重新生成一个新的token，过期时间重新计算 1d是一天才会过期
        _id:payload._id,
        username:payload.username
      },"1d")
      res.header("Authorization",newToken)
      next()
    } else {
      res.status(401).send({ errCode: "-1", errorInfo: "token过期" })
    }
  }else{
    /* 第一步：首页进来无token放行，渲染首页index.ejs，页面发请求获取全部列表，于是又来到这个中间件，
    此时虽然localStorage的token是undefined, 但是发请求前的拦截器使得请求头带有authorization字段,所以
    请求头是Authorization:Bearer null ，null是true，于是走到了payload为false, 返回401,
    前端axios响应拦截器对401进行拦截并重定向到login; 同理：前端删除localStorage的token也会走到payload为false那里
    */
    next()   
  }
})




// view engine setup 用于服务端渲染
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));  //用于接收json数据
app.use(cookieParser());   //用于拿到cookie
app.use(express.static(path.join(__dirname, 'public')));   //设置public文件夹下的为静态资源 可直接通过路径访问拿到

//注册路由中间件：通过app.js进入各自的二级路由
app.use('/', indexRouter);       //用来渲染首页
app.use('/api', usersRouter);    //专门用来处理接口
app.use('/login', loginRouter);  //用来渲染登录页

//前面都不匹配就会走到这里错误中间件 catch 404 and forward to error handler
app.use(function (req, res, next) {
  //带着createError(404)往下走，createError(404)作为第一个参数
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
