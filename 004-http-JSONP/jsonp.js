const { log } = require('console')
var http = require('http')
var url = require('url')

http.createServer((req,res)=>{
    var urlobj =url.parse(req.url,true)

    switch(urlobj.pathname){
        case "/api/aaa":
            res.end(`${urlobj.query.callback}(${JSON.stringify({
                name: 'viki',
                age:30
            })})`)
            break
        default:
            res.end('404')
    }
}).listen(3000)