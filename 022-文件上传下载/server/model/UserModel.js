//创建模型——为了操作集合
const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserType = {
    username:String,
    password:String,
    avatar:String,
    age:Number
}

//利用mongoose.model创建模型  模型user——对应集合user
const UserModel = mongoose.model("user",new Schema(UserType))

module.exports  = UserModel 