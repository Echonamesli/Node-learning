const fs = require("fs")
// fs.readdir("./avatar", (err, data)=>{
//     data.forEach(item=>{
//         fs.unlink( `./avatar/${item}`, (err)=>{})
//     })
//     //foreach瞬间执行完就跑到这里，但是unlink还没执行完，文件夹里面内容没删除完毕的情况下不能删除文件夹
//     fs.rmdir('./avatar', (err)=>{
//         console.log(err);
//     })
// })


fs.readdir("./avatar", (err, data)=>{
    data.forEach(item=>{
        //unlinkSync是unlink的同步版本，同步意味着卡在这里，每个文件都删除完了才会执行下一步,
        fs.unlinkSync( `./avatar/${item}`, (err)=>{})
    })
    fs.rmdir('./avatar', (err)=>{
        console.log(err);
    })
})