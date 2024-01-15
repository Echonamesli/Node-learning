var express = require('express');
var app = express();


// 匹配根路径的请求
app.get('/', function (req, res) {
    //express做了封装 可以直接返回hmtl、对象、字符串(原生的http模块需要自己写响应头)
    res.send(`
    <html>
        <h1>hello world</h1>
    </html>
    `);
});

// 匹配 /about 路径的请求
app.get('/about', function (req, res) {
    res.send({
        name: 'kervin',
        age: 1000
    });
});

// 匹配 /random.text 路径的请求
app.get('/random.text', function (req, res) {
    res.send('random.text');
});


// 匹配 acd 和 abcd  （b后面加？代表b值是可选的）
app.get('/ab?cd', function (req, res) {
    res.send('ab?cd');
});

// 匹配 /ab/******  (:id是占位符)
app.get('/ab/:id', function (req, res) {
    res.send('aaaaaaa');
});

// 匹配 abcd、abbcd、abbbcd等（b可以有多个）
app.get('/ab+cd', function (req, res) {
    res.send('ab+cd');
});

// 匹配 abcd、abxcd、abRABDOMcd、ab123cd等 （b后面可以有任意字符）
app.get('/ab*cd', function (req, res) {
    res.send('ab*cd');
});

// 匹配 /abe 和 /abcde
app.get('/ab(cd)?e', function (req, res) {
    res.send('ab(cd)?e');
});


//使用正则表达式的路由路径示例

// 匹配任何路径中含有 a 的路径：
app.get(/a/, function (req, res) {
    res.send('/a/');
});

// 匹配 butterfly、dragonfly，不匹配 butterflyman、dragonfly man等
app.get(/.*fly$/, function (req, res) {
    res.send('/.*fly$/');
});

/* 可以为请求处理提供多个回调函数，其行为类似 中间件。唯一的区别是这些回调函数有可能
调用 next('route') 方法而略过其他路由回调函数。可以利用该机制为路由定义前提条件，如果
在现有路径上继续执行没有意义，则可将控制权交给剩下的路径。 */
app.get('/example/b', function (req, res, next) {
    console.log('response will be sent by the next function ...');
    next();
  }, function (req, res) {
    res.send('Hello from B!');
  });

//使用回调函数数组处理路由： 
var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

var cb2 = function (req, res) {
  res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])


app.listen(3000, () => {
    console.log('server start');
})