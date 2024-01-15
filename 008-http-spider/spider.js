
var http = require('http')
var https = require('https')
var url = require('url')
var cheerio = require('cheerio')

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
            httpsget((data) => {
                res.end(spider(data))
            })
            break
        default:
            res.end('404')
    }
}).listen(3000)

function httpsget(callback){
    var data = ""
    https.get(`https://i.maoyan.com/`, (res)=>{
        res.on("data", (chunk) => {
            data+=chunk
            //不断收集
        })
        res.on("end", () => {
            //收集完毕
            //console.log(data);
            //返回给客户端
            callback(data)
        })
    })
}

function spider(data){
    //爬虫  npm i cheerio
    let $ = cheerio.load(data)
    let $movielist = $('.column.content')
    // console.log($movielist);
    let movies = []
    $movielist.each((index,value)=>{
        movies.push({
            title:$(value).find('.title').text(),
            grade:$(value).find('.grade').text(),
            actor:$(value).find('.actor').text(),
        })
    })
    console.log(movies);
    return JSON.stringify(movies)
}