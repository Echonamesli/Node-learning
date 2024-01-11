function test(){
    console.log('test-aaa')
}

function upper(str){
    _init()
    return str.substring(0,1).toUpperCase() + str.substring(1)
}

function _init(){
    console.log('init');
}

/* 
  完整写法
  module.exports = {test:test, upper:upper}

  也可以这样写
  exports.test = test
  exports.upper = upper

  */

//省略写法
module.exports = {test, upper}

