const fs = require("fs")
//读取文件具体信息
fs.stat("./avatar", (err,data)=>{
    console.log(data);
    console.log(data.isFile());
    console.log(data.isDirectory());
})