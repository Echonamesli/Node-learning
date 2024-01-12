const { log } = require('console')
var http = require('http')
var https = require('https')
var url = require('url')

http.createServer((req, res) => {
    var urlobj = url.parse(req.url, true)

    res.writeHead(200, {
        "Content-Type": "application/json;charset=utf-8",
        //cors头（后端解决跨域） 允许哪些域通过
        "access-control-allow-origin": "*"
    })

    switch (urlobj.pathname) {
        case "/api/aaa":
            //帮助客户端要去猫眼要数据
            httpspost((data) => {
                res.end(data)
            })
            break
        default:
            res.end('404')
    }
}).listen(3000)

function httpspost(callback) {
    var data = ""
    //我帮助前端，严格按照小米有品的要求模拟一个post请求向小米有品要数据
    var options = {
        hostname: 'm.xiaomiyoupin.com',
        port: '443',
        path: '/mtop/market/search/placeHolder',
        method: 'post',
        header: {
            "Content-Type": "application/json"
        }
    }

    //没有https.post!! 只有https.get 和 https.request
    var req = https.request(options, (res) => {
        res.on("data", chunk => {
            data += chunk
        })
        //数据异步收集完毕就执行回调函数
        res.on("end", () => {
            callback(data)
        })
    })
    //post请求携带的JSON数据
    req.write(JSON.stringify([{}, { baseParam: { ypClient: 1 } }]))
    req.end()
}