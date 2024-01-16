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

# session-cookie鉴权认证

    Http协议是一个无状态的协议，cookie 就是这个管理服务器与客户端之间状态的标识
    session 是会话的意思，浏览器第一次访问服务端，服务端就会创建一次会话，在会话中保存标识该浏览器的信息
    它与 cookie 的区别就是 session 是缓存在服务端的，cookie 则是缓存在客户端，它们都由服务端生成

    1） 浏览器第一次向服务器发送请求时，服务端一上来就给浏览器在response头部设置字段          set-cookie:sessionId （当然了之后每次请求都会在此响应头加上此字段）
        浏览器收到响应就会设置 cookie 并存储，在下一次该浏览器向服务器发送请求时，就会在 request 头部自动带上 Cookie 字段，服务器端收到该 cookie 用以区分不同的浏览器

        服务器代码实现如下：

        app.use(
            session({
                name: "kerwinsystem", //给前端设置的cookie名称，注意浏览器控制台console通过document.cookie拿不到
                secret: "this is session", 
                resave: true,  
                saveUninitialized: t  rue, 
                cookie: {
                maxAge: 1000 * 60 * 60,
                secure: false, 
                },
                rolling: true,  //req.session.garbage = Date.now();的第二种方案，rolling为true标识每次在超时前刷新的话，浏览器的cookie都会重新计时
                //将服务器段的session保存在数据库中，而不是保存在内存中
                //好处：重启node服务器的时候sessio不会丢失，且不同的浏览器打开会在数据库中保存着不同的session
                store: MongoStore.create({
                    mongoUrl: 'mongodb://127.0.0.1:27017/kerwin_session',
                    ttl: 1000 * 60 * 10 // 过期时间
                    }),
            })
        );


    2）之后浏览器的每个请求接口都是带着cookie：sessionId

    3）浏览器一旦登录，服务器就校验数据库中是否有这个账号和密码，校验成功就在服务器端创建seesion会话，然后保存seesion(我们可以将seesion保存在内存中，也可以保存在redis中，推荐使用后者)，然后给这个session生成一个唯一的标识字符串比如user
        
        login:async (req, res) => {
            const {username, password} = req.body
            const data = await UserService.login(username, password)
            if(data.length === 0){
                res.send({
                    ok:0
                })
            }else{
                req.session.user = data[0]
                res.send({
                    ok:1
                })
            }
        }


    4）服务器在接受客户端请求时会去去找服务器端保存的该客户端的session，然后判断该请求是否合法。
        写一个用于session是否过期校验的应用级中间件，如果前端cookie删除了，则req.session就没了，req.session.user为flase——接口返回404&页面重定向到登录页

        //自己设置的用于session是否过期校验的应用级中间件
        app.use((req,res,next)=>{
        //排除login相关的路由和接口
        if(req.url.includes("login")){
            next()
            return;
        }
        if(req.session.user){   //前端一旦删除cookie，req.session就没了，就会失效
            //重新设置session garbage可以是任意字符，只有重新设置session了
            // resave: true, 才会生效，浏览器的cookie的max-age每次才会改变
            req.session.garbage = Date.now();  
            next();
        }else{
            //ajax发给服务端的，服务端不能直接让ajax直接重定向，只能让ajax自己跳
            //res.redirect("/login")  
            //正确做法：如果是接口，就返回错误码；如果不是接口，就重定向
            req.url.includes("api")
            ?res.status(401).json({ok:0}):res.redirect("/login")
        }
        })


    5）退出登录————服务端清除session
        router.get("/logout",  (req,res)=>{
        req.session.destroy(()=>{
            res.send({ok:1})
        })
        })