const fs = require('fs')

//每次写都会覆盖掉之前的
fs.writeFile('./avatar/a.txt','hello world',err=>{
    console.log(err);
})