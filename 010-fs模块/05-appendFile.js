const fs = require('fs')

//每次写都会覆盖掉之前的
fs.appendFile('./avatar/a.txt','happy every day',err=>{
    console.log(err);
})