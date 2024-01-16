# 数据库使用
    1) 提前创建好db文件夹

    2） 执行以下命令行操作数据库

    >.\mongod.exe --dbpath=E:\FrontedLearning\Node_learning\db   ————服务端启动一个数据库服务，并且以dbpath作为根据地————这个cmd窗口不能关闭
    >.\mongo.exe    ————客户端启动，与数据库连接

    3）接下来都是在>.\mongo.exe  客户端下操作数据库

    > show dbs  默认有三个数据库
    admin   0.000GB
    config  0.000GB
    local   0.000GB 

    > use kervin_test 创建数据库并切换到此数据库

    > db.createCollection("products") 在数据库里创建一个名为products的集合

    > db.getCollectionNames()  获取所有集合的名字
    [ "news", "products", "users" ]

    > db.users.save({username:"echo",age:25})   ————新版本save不行，要用insert和replace
    WriteResult({ "nInserted" : 1 })
    > db.users.find()
    { "_id" : ObjectId("65a528ac3a8ae3a3e78628db"), "username" : "echo", "age" : 25 }

# nodejs利用Mongoose连接MongoDB数据库
    1）express项目：创建config文件夹下的db.config.js
    2）在入口文件 注意：  ./bin/www 才是入口文件  中引入db配置文件

# restful
//统一按照restful接口规范————url地址中只包含名词表示资源，使用http动词表示进行操作资源
//get——获取列表 post——创建用户  put——修改用户信息  delete——删除用户信息

# MVC架构
     controller： 负责处理请求业务逻辑（把数据model交给视图view,记住：只是获取数据和返回数据
     具体的操作数据是在model层） —— controller文件夹  ——本质就是routes里每个接口的回调函数
     model： 负责数据的增删改查   ———— services文件夹（负责操作model）
     view： html文件

