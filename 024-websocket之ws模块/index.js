const express = require("express")

const app = express()

app.use(express.static("./public")) //指定public为静态资源文件夹
//http响应
app.get("/", (req, res) => {
    res.send({ ok: 1 })
})

//websocket响应
const  WebSocket = require("ws")
WebSocketServer = WebSocket.WebSocketServer
const wss = new WebSocketServer({ port: 8080 });
wss.on('connection', function connection(ws) {

    ws.on('message', function message(data, isBinary) {
        console.log('received: %s', data);
        //abc三个客户端都与我建立了通信，把a发给我的消息转发给其余客户端（bc）
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });

    });

    ws.send('欢迎加入聊天室');   //服务端给客户端发消息
});
app.listen(3000)