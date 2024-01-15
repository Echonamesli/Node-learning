const fs = require('fs')
try {
    fs.mkdirSync("./avatar3")
    //同步写法，会阻塞后面代码执行
} catch (error) {
    console.log(error);
}