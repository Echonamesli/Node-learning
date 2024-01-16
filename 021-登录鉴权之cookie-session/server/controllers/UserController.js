const UserService = require("../services/UserService")
const UserController = {
    addUser:
        //接口的回调函数自带req和res参数
        async (req, res) => {
            const { username, password, age } = req.body
            await UserService.addUser(username, password, age)
            res.send({
                ok: 1
            })
        },
    updateUser:
        async (req, res) => {
            const { username, password, age } = req.body
            const myid = req.params.myid
            await UserService.updateUser(myid, username, password, age)
            res.send({
                ok: 1
            })
        },
    deleteUser:
        async (req, res) => {
            //通过user模型对数据进行删除
            const myid = req.params.myid
            await UserService.deleteUser(myid)
            res.send({
                ok: 1
            })
        },
    getUser:
        async (req, res) => {
            const { page, limit } = req.query
            const data = await UserService.getUser(page, limit)
            res.send(data)
        },
    login:
        async (req, res) => {
            const { username, password } = req.body
            const data = await UserService.login(username, password)
            if (data.length === 0) {
                res.send({
                    ok: 0
                })
            } else {
                //设置session对象——不同网页访问我的话则req.session都是不一样的
                //理解：这个user字段是与浏览器的cookie字段相对应的一个标记，作为一个标识
                //如果username:admin,password:123————也就是数据库有这个账户，就会走到这里，就给session对象赋予user标记
                //之后在去往首页的路由那里做判断：req.session.user有值才会放行
                //session对象是存在内存中的，每次node重启(nodemon/node-dev)都会释放之前node服务器占的内存，然后重新启动
                //所以这个user需要？
                req.session.user = data[0]
                res.send({
                    ok: 1
                })
            }
        },
    logout:
        (req, res) => {
            req.session.destroy(() => {
                res.send({ ok: 1 })
            })
        }

}

module.exports = UserController