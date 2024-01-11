function test(){
    console.log('test-bbb')
}
var moduleA = require('./a')
console.log(moduleA.upper('wangjiaer'));

module.exports = test

