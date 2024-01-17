//node利用mongoose连接数据库mongodb   127.0.0.1就是localhost——本机端口号
const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/kerwin_project")

//插入集合和数据， 数据库kerwin_project就会自动创建,并与此项目连接



