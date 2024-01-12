var querystring = require('querystring')

var name = "name=echo&age=100&tv=fanhua&location=214"
var obj = querystring.parse(name)
console.log(obj)
// [Object: null prototype] {
//   name: 'echo',
//   age: '100',
//   tv: 'fanhua',
//   location: '214'
// }


var obj2 = {
    a:1,
    b:2,
    c:3
}

console.log(querystring.stringify(obj2))  //a=1&b=2&c=3