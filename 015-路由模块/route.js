
var fs = require("fs")
var path = require("path")
const mime = require('mime')

function render(res, path, type="") {
    //看有没有传递type，没有的话统一返回text/html
    res.writeHead(200, { "Content-Type": `${type?type:"text/html"};charset=utf8` })
    res.write(fs.readFileSync(path), "utf-8")
    res.end()
}

const route = {
    "/login": (req, res) => {
        render(res, "./static/login.html")
    },

    "/home": (req, res) => {
        render(res, "./static/home.html")
    },
    "/": (req, res) => {
        render(res, "./static/home.html")
    },
    "/404": (req, res) => {
        //判断是不是要请求静态资源
        if(readStaticFile(req,res)){
            return
        }
        res.writeHead(404, { "Content-Type": "text/html;charset=utf8" })
        res.write(fs.readFileSync("./static/404.html", "utf-8"))
        res.end()
    }
}

//处理静态资源  
//localhost:3000/login.html   localhost:3000/css/login.css  localhost:3000/favicon.ico等都可以通过这里拿到
function readStaticFile(req, res) {
    const myURL = new URL(req.url, 'http://127.0.0.1:3000')

    //拼成绝对路径
    var filePathname = path.join(__dirname, "/static", myURL.pathname);
    if(myURL.pathname === '/') return false
    if (fs.existsSync(filePathname)) {
        //console.log(myURL.pathname)  //   /css/login.css
        //指定返回的type为css类型
        res.writeHead(200, { "Content-Type": `${mime.getType(myURL.pathname.split(".")[1])};charset=utf8` })
        res.write(fs.readFileSync(filePathname, "utf8"))
        res.end()
        return true
    } else {
        return false
    }
}

module.exports = route