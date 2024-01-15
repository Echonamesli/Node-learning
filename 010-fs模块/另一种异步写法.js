//异步有两种写法，之前都是基于回调函数的写法，现在是基于promise的写法
const fs = require("fs").promises
//fs是promise版本 也即fs的mkdir、rmdir、unlink等都是返回一个promise
//直接基于promise的.then写法 就不用写第二个回调函数参数了
fs.mkdir("./avatar4").then(data=>{
    console.log(data);
})