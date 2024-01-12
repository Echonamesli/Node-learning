
function renderStatus(url){
    var arr = ['/home', '/list']
    return arr.includes(url) ? 200: 404
}

//暴露出的是exports这个对象，然后这个对象的renderStatus属性是renderStatus函数
exports.renderStatus = renderStatus