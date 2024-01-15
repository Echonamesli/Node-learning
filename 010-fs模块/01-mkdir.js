const fs = require("fs")

fs.mkdir("./avatar", (err)=>{
    if(err && err.code === "EEXIST"){
        console.log("目录已经存在");
    }
})