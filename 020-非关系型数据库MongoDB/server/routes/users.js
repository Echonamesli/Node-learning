var express = require('express');
const UserModel = require('../model/UserModel');
const UserController = require('../controllers/UserController');
var router = express.Router();


/* GET users listing. */
router.get('/', function (req, res, next) {
  //读取前端的cookie值
  console.log(req.cookies);
  //设置前端的cookie值
  res.cookie('gender', 'female')
  res.send({ name: 'echo', work: '我在读取和设置你的cookie值' });
});

//统一按照restful接口规范————url地址中只包含名词表示资源，使用http动词表示进行操作资源
//get——获取列表 post——创建用户  put——修改用户信息  delete——删除用户信息

//响应前端的post请求——增加用户
router.post("/user", UserController.addUser)

//响应前端的put请求——更新用户
router.put("/user/:myid", UserController.updateUser)

//响应前端的delete请求——删除用户
router.delete("/user/:myid", UserController.deleteUser)

//响应前端的get请求——获取用户
router.get("/user", UserController.getUser)

module.exports = router;
