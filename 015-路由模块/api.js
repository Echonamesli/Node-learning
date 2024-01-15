function render(res, data) {
    res.writeHead(200, { "Content-Type": "application/json;charset=utf8" })
    res.write(data)
    res.end()
}

//node处理前端发过来的get和post请求
const apiRouter = {
    "/api/login": (req, res) => {
        //获取query参数
        const myURL = new URL(req.url, 'http://127.0.0.1:3000');
        if (myURL.searchParams.get("username") === 'echo' && myURL.searchParams.get("password") === '666666') {
            render(res, `{"ok": 1}`)
        } else {
            render(res, `{"ok": 0}`)
        }
    },
    "/api/loginpost": (req, res) => {
        var post = '';
        // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
        req.on('data', function (chunk) {
            post += chunk;
        });

        // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
        req.on('end', function () {
            post = JSON.parse(post);
            console.log(post);
            render(res, `{ok:1}`)
        });
    }
}

module.exports = apiRouter