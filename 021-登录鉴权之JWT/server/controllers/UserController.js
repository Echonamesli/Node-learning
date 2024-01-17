const UserService = require("../services/UserService")
const JWT = require("../util/JWT")
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
                //账号密码校验通过就设置token
                //生成token
                const token = JWT.generate({
                    _id: data[0]._id,
                    username: data[0].username
                }, "1d")
                //把token放在响应头中的Authorization字段返回给前端
                res.header("Authorization", token)
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