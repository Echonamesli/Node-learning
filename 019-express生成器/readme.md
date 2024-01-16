使用express生成器步骤：
1、npm i -g express-generator
2、express myapp --view=ejs   （不指定ejs的话 views文件夹下的渲染模板都是jade文件
3、cd myapp————npm i
4、可以在package.json中把
"scripts": {
    "start": "node ./bin/www"
  },
  改成
  "scripts": {
    "start": "node-dev ./bin/www"
  },  这样可以每次都自动重启
 注意：  ./bin/www 才是入口文件

 
5、npm run start /  npm start / node ./bin/www  启动项目
6、直接访问localhost: 3000就可以访问项目  
ps：因为bin下的www有一句：
var port = normalizePort(process.env.PORT || '3000');