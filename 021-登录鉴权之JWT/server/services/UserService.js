const UserModel = require("../model/UserModel")

const UserService = {
    addUser: (username, password, age) => {
        //通过user模型对数据进行增加  对模型的操作都是返回一个promise
        return UserModel.create({ username, password, age })
    },
    updateUser:
        (myid, username, password, age) => {
            //通过user模型对数据进行更新
            return UserModel.updateOne({ _id: myid }, {
                username, password, age
            })
        },
    deleteUser: (myid) => {
        return UserModel.deleteOne({ _id: myid })
    },
    getUser: (page, limit) => {
        //通过user模型对数据进行查找
        //UserModel.find().then(data=>{ 
        //按照age正序查找
        //UserModel.find().sort({ age: 1 }).then(data => {
        //按照指定的第几页和每页几个进行查找
        return UserModel.find().skip((page - 1) * limit).limit(limit)
            //只查找部分内容
            //UserModel.find({}, ["username", "age"]).then(data=>{      
    },
    login: (username, password) => {
        //查找具有指定name和age的数据
        return UserModel.find({username,password})
    }
}

module.exports = UserService