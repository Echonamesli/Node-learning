const { log } = require('console')
var http = require('http')
var url = require('url')

http.createServer((req,res)=>{
    var urlobj =url.parse(req.url,true)

    res.writeHead(200, {
        "Content-Type" : "application/json;charset=utf-8",
        //cors头（后端解决跨域） 允许哪些域通过
        "access-control-allow-origin": "*"

    })

    switch(urlobj.pathname){
        case "/api/aaa":
            res.end(`${JSON.stringify({
                name: 'viki',
                age:30
            })}`)
            break
        default:
            res.end('404')
    }
}).listen(3000)