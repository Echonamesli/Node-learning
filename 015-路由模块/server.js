const http = require('http')
const route = require('./route')

const api = require("./api")

//前后端分离返回的是json
//不分离返回的是html服务端渲染
const Router = {}
// Object.assign(Router, route) // 把返回html的route和返回json的api整合起来
// Object.assign(Router, api)

function use(obj){
    Object.assign(Router, obj)
}
function start(){
    http.createServer((req,res)=>{
        const myURL = new URL(req.url, 'http://127.0.0.1')
        try {
            //注意：这是动态匹配route中的属性，要用[]
            Router[myURL.pathname](req, res)
        } catch (error) {
            //如果没有匹配的路径 则统一导到404
            Router["/404"](req, res)
        }
        res.end()
    }).listen(3000, ()=>{
        console.log('server start');
    })
}

exports.start = start
exports.use = use