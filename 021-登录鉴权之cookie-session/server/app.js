var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');

const session = require("express-session");   //用于登录鉴权 Cookie&Session
const MongoStore = require("connect-mongo");  //将我们的session数据存到MongoStore模块中

var app = express();

//注册session中间件
app.use(
  session({
    name: "kerwinsystem",   //给前端设置的cookie名称，注意前端通过document.cookie拿不到
    secret: "this is session", // 服务器生成 session 的签名
    resave: true,   //重新设置服务端的session之后则浏览器端的cookie过期时间会重新计算
    saveUninitialized: true, //强制将为初始化的 session 存储
    cookie: {
      maxAge: 1000 * 60 * 60,// 过期时间一个小时
      secure: false, // 为 true 时候表示只有 https 协议才能访问cookie
    },
    rolling: true, //为 true 表示 超时前刷新，cookie 会重新计时； 为 false 表示在超时前刷新多少次，都是按照第一次刷新开始计时。
    //将服务器段的session保存在数据库中，而不是保存在内存中
    //好处：重启node服务器的时候sessio不会丢失，且不同的浏览器打开会在数据库中保存着不同的session
    store: MongoStore.create({
      mongoUrl: 'mongodb://127.0.0.1:27017/kerwin_session',  //新创建一个名为kerwin_session的数据库
      ttl: 1000 * 60 * 60 // 过期时间
  }),
  })
);

//自己设置的用于session是否过期校验的应用级中间件
app.use((req,res,next)=>{
  //排除login相关的路由和接口
  if(req.url.includes("login")){
    next()
    return;
  }
  if(req.session.user){   //前端一旦删除cookie，req.session就没了，就会失效
      //重新设置session garbage可以是任意字符，只有重新设置session了
      // resave: true, 才会生效，浏览器的cookie的max-age每次才会改变
      req.session.garbage = Date.now();  
      next();
  }else{
    //ajax发给服务端的，服务端不能直接让ajax直接重定向，只能让ajax自己跳
   	//res.redirect("/login")  
    //正确做法：如果是接口，就返回错误码；如果不是接口，就重定向
    req.url.includes("api")
    ?res.status(401).json({ok:0}):res.redirect("/login")
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

// 前面都不匹配就会走到这里错误中间件 catch 404 and forward to error handler
app.use(function(req, res, next) {
  //带着createError(404)往下走，createError(404)作为第一个参数
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
