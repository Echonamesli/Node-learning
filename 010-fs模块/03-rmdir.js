const fs = require('fs')

//rmdir——删除文件夹，如果文件夹里面有内容需要先用unlink删除内容后，rmdir才能成功删除文件夹
fs.rmdir("./avatar2", (err)=>{
    if(err && err.code === "ENOENT"){
        console.log("目录不存在");
    }
})