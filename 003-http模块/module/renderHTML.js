function renderHTML(url) {
    switch (url) {
        case "/home":
            return `
            <html>
                <div>当前访问路径是/home</div>
                <div>home页面</div>
            </html>
        `
        case "/list":
            return `
            <html>
                <div>当前访问路径是/list</div>
                <div>list页面</div>
            </html>
        `
        default:
            return `
            <html>
                <div>404 not found</div>
            </html>
        `
    }
}

//暴露出的是对象
module.exports = {renderHTML}