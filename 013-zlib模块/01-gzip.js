const http = require("http")
var fs = require('fs');

const zlib = require('zlib')

const gzip = zlib.createGzip()


http.createServer((req, res) => {
    //res就是一个可写流
    //创建一个可读流readStream,通过管道送入可写流res
    const readStream = fs.createReadStream("./index.js")
    //readStream.pipe(res)
    //先压缩成gzip再传送
    readStream
        .pipe(gzip)
        .pipe(res)

}).listen(3000, () => {
    console.log('server start');
})