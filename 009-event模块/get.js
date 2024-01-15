const { log } = require('console')
var http = require('http')
var https = require('https')
const { EventEmitter } = require('events')
var url = require('url')
var event = null

http.createServer((req,res)=>{
    var urlobj =url.parse(req.url,true)

    res.writeHead(200, {
        "Content-Type" : "application/json;charset=utf-8",
        //cors头（后端解决跨域） 允许哪些域通过
        "access-control-allow-origin": "*"

    })

    switch(urlobj.pathname){
        case "/api/aaa":
            //帮助客户端要去猫眼要数据

            event = new EventEmitter()
            event.on('play', (data)=>{
                console.log(data);
                res.end(data)
            })
            httpsget()
            break
        default:
            res.end('404')
    }
}).listen(3000)

function httpsget(callback){
    var data = ""
    https.get(`https://i.maoyan.com/api/mmdb/movie/v3/list/hot.json?ct=%E5%8c%97%E4%BA%ACE&ci=1&channelId=4`, (res)=>{
        res.on("data", (chunk) => {
            data+=chunk
            //不断收集
        })
        res.on("end", () => {
            //收集完毕
            //返回给客户端
            event.emit('play',data)
        })
    })
}