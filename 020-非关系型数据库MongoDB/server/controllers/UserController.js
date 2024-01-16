const UserService = require("../services/UserService")
const UserController = {
    addUser:
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
            const data = await UserService.getUser(page,limit)
            res.send(data)
        }

}

module.exports = UserController