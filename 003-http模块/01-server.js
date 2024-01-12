var http = require('http')
var url = require('url')

//commonJS导入的是对象
var moduleRenderHMTL = require('./module/renderHTML')
var moduleRenderStatus = require('./module/renderStatus')


//创建服务器
http.createServer((req, res) => {
    // req 接受浏览器换的参数 
    // res 返回渲染内容

    // res.write('hello world')
    if (req.url === '/favicon.ico') {
        return
    }

    // 截除掉路径中的query参数
    var pathname = url.parse(req.url).pathname

    // 获取路径中的query参数, 加了true会转成对象形式
    var urlobj = url.parse(req.url,true)
    var query = urlobj.query

    //通过new URL构建一个完整的url
    const myURL = new URL(req.url, 'http://127.0.0.1:3000')  // http://127.0.0.1:3000/home?a=1
    for(var [key, value] of myURL.searchParams){
        console.log(key, value);
    }

    res.writeHead(moduleRenderStatus.renderStatus(pathname), { "Content-Type": "text/html;charset=utf-8" })

    res.write(moduleRenderHMTL.renderHTML(pathname))

    // res.write(`
    //     <html>
    //         <b>teacher</b>
    //         <div>追风筝的人</div>
    //     </html>
    // `)

    // res.end("[1,2,3]")
    res.end()
}).listen(3000, () => {
    //一直处在监听3000端口号的状态(浏览器地址栏可以去访问：localhost:3000)
    console.log('server start');
})

