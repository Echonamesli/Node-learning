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
    它与 cookie 的区别就是 session 是缓存在服务端的，cookie(也就是sessionId) 则是缓存在客户端，它们都由服务端生成

    1） 浏览器第一次向服务器发送请求时，服务端一上来就给浏览器在response头部设置字段    set-cookie:sessionId （当然了之后每次请求都会在此响应头加上此字段）
        浏览器收到响应就会设置 cookie 并存储，在下一次该浏览器向服务器发送请求时，就会在 request 头部自动带上 Cookie 字段，服务器端收到该 cookie 用以区分不同的浏览器

        服务器代码实现如下：
        const session = require("express-session"); 
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
                //好处：重启node服务器的时候session不会丢失，且不同的浏览器打开会在数据库中保存着不同的session
                //浏览器每拿到一个重新设置的cookie，数据库就存着此cookie对应的session，且数据库中的过期时间与浏览器端保持一致
                //浏览器端删除cookie后，app.js的session中间件就会马上给浏览器端设置一个新的cookie，同时数据库保存着这个新cookie对应的新session，但是该新session还没激活，只有账号密码登录通过，给session.user=true，session才是激活的
                //如果你在数据库删除了session，则你每次浏览器刷新或者发请求——app.js的session中间件就会给数据库再次添加session，但是此session还没激活，把你弹到登录页面让你激活
                store: MongoStore.create({
                    mongoUrl: 'mongodb://127.0.0.1:27017/kerwin_session',
                    ttl: 1000 * 60 * 10 // 过期时间
                    }),
            })
        );


    2）之后浏览器的每个请求接口都是带着cookie：sessionId

    3）浏览器一旦登录，服务器就校验数据库中是否有这个账号和密码，校验成功就在服务器端创建seesion会话，然后保存seesion(我们可以将seesion保存在内存中，也可以保存在redis中，推荐使用后者)，因为保存在内存中的话node一旦重新启动，内存就消失了，然后给这个session生成一个唯一的标识字符串比如user  ——————也就是种下session！！！！！！
        
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
        if(req.session.user){   //前端一旦删除cookie，session就没了，就会失效
            //重新设置session garbage可以是任意字符，只有重新设置session了
            // resave: true, 才会生效，浏览器的cookie的max-age每次才会改变
            req.session.garbage = Date.now();  
            next();
        }else{
            //如果是接口，就返回错误码；如果不是接口，就重定向
            req.url.includes("api")
            ?res.status(401).json({ok:0}):res.redirect("/login")
        }
        })


    5）退出登录————清除session————则服务器种下的session的user字段就会消失
        router.get("/logout",  (req,res)=>{
        req.session.destroy(()=>{
            res.send({ok:1})
        })
        })


# COOKIE-SESSION弊端
  1） session存储问题：每个用户的登录信息都保存在服务器的session中，随着用户的增多，服务器开销会明显上升，存在数据库里会占用空间；
  2） 只能在 web 场景下使用，如果是 APP 的情况，不能使用 cookie 的情况下就不能用了
  3） 如果是分布式服务，需要考虑不同机器间 Session 的共享同步问题，实现方法可将session存储到数据库中或者redis中
  4)  cookie很容易被跨站请求伪造 CSRF

跨站请求伪造CSRF: 访问a.com网站——有cookie——带着cookie访问b.com——在b.com里有一个链接：http://a.com?from=aaaa&to=vvv&money=100
        （该链接本来是属于a网站的合法链接,链接的意思是从谁的账户往另一个人的账户转了100）—— a网站不知道这是b网站伪造的请求，于是带着cookie就发了

改造COOKIE-SESSION：
    a) 如果把cookie存在localStorage，CSRF不存在，安全性得到解决 （同源策略：每个域名（即不同的网站）都有其独立的 localStorage 存储空间。因此，a.com 和 b.com 的 localStorage 是相互隔离的，它们不能直接共享数据）
    b) session不要存在服务端，加密后存在localStorage
        ————这两点引出了Token！！！

# JSON Web Token(JWT)
   利用jsonwebtoken生成的token是由三部分组成的：

        Header（一个Json对象，描述JWT的元数据）——该JSON 对象会使用 Base64URL 算法转成字符串

        Payload（也是一个Json对象，用来存放实际需要传输的数据） ——这个Json对象也要用Base64URL算法转成字符串

        Signature（是对前面的两部分的数据进行签名，防止数据篡改；服务器先定义一个秘钥，这个秘钥不能泄露给用户，然后使用Header中指定的签名算法(默认情况是HMAC SHA256)，算出签名以后将Header、Payload、Signature三部分拼成一个token字符串，每个部分用.分割开来，就可以返给用户）

    JWT弊端：
    1）占带宽，正常情况下token比sessionId更大
    2） 无法在服务端注销token

    JWT优点：
    CSRF攻击的原因是浏览器会自动带上cookie，但不会带上token，即使别的网站发了伪造请求，但没有带上token，后端的token验证不会通过。

    实现：
    1） 在util/JWT.js封装：

    //Nodejs中使用jsonwebtoken生成token
    const jsonwebtoken = require("jsonwebtoken")
    const secret = "kerwin"   
    const JWT = {
        //加密:  value是需要加密的数据；secret是密钥；expiresIn是过期时间,单位为秒，超过时间jsonwebtoken就过期就不能解密
        generate(value,exprires){
            return jsonwebtoken.sign(value,secret,{expiresIn:exprires})
        },
        //验证/解密:  对token进行解密； secret：加密时的密钥
        verify(token){
            try{
                return jsonwebtoken.verify(token,secret)
            }catch(e){
                return false
            }
        }
    }

    module.exports = JWT

    2） //账号密码校验通过就设置token
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

    3）前端借助axios拦截器——响应拦截器拿到token并localStorage——在请求拦截器设置每次请求都要带上token

    <!-- 这是在浏览器渲染的登录网页，在浏览器发的接口，所以不能用require和import -->
    <script src="https://cdn.jsdelivr.net/npm/axios@1.1.2/dist/axios.min.js"></script>
    <!-- axios拦截器 -->
    <script>
        // 请求拦截器
        axios.interceptors.request.use(function (config) {
            const token = localStorage.getItem("token")
            config.headers.Authorization = `Bearer ${token}`

            return config;
        }, function (error) {
            return Promise.reject(error);
        });

        //响应拦截器
        axios.interceptors.response.use(function (response) {

            const { authorization } = response.headers
            authorization && localStorage.setItem("token", authorization)
            return response;
        }, function (error) {

            const { status } = error.response
            if (status === 401) {
                localStorage.removeItem("token")
                window.location.href = "/login"
            }
            return Promise.reject(error);
        });
    </script>

    4) token过期校验中间件
        app.use((req, res, next) => {
        // 如果token有效 ,next() 
        // 如果token过期了, 返回401错误
        if (req.url.includes("login")) {
            next()
            return;
        }
        const token = req.headers["authorization"]?.split(" ")[1]
        if (token) {
            var payload = JWT.verify(token)
            if (payload) {
            /* 第二步： 输入账号密码，发起登录接口请求时，服务端根据用户信息生成token放在响应头给前端，前端
            在axios的响应拦截器那里拿到token并localStorage，之后所有接口都有token都会走到这里放行 */
            const newToken = JWT.generate({   //每次重新生成一个新的token，过期时间重新计算 1d是一天才会过期
                _id:payload._id,
                username:payload.username
            },"1d")
            res.header("Authorization",newToken)
            next()
            } else {
            res.status(401).send({ errCode: "-1", errorInfo: "token过期" })
            }
        }else{
            /* 第一步：首页进来无token放行，渲染首页index.ejs，页面发请求获取全部列表，于是又来到这个中间件，
            此时虽然localStorage的token是undefined, 但是发请求前的拦截器使得请求头带有authorization字段,所以
            请求头是Authorization:Bearer null ，null是true，于是走到了payload为false, 返回401,
            前端axios响应拦截器对401进行拦截并重定向到login；同理：前端删除localStorage的token也会走到payload为false那里
            */
            next()   
        }
        })


# express处理文件上传下载————multer模块

Multer 是一个 node.js 中间件，用于处理 multipart/form-data 类型的表单数据，它主要用于上传文件。

注意: Multer 不会处理任何非 multipart/form-data 类型的表单数据。
npm install --save multer
