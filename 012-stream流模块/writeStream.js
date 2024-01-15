var fs = require('fs');
//要以流的形式写入文件，只需要不断调用write()方法，最后以end()结束：
var ws1 = fs.createWriteStream('output1.txt', 'utf-8');
ws1.write('开始使用Stream写入文本数据...\n');
ws1.write('1111111111111111111111');
ws1.write('22222222222222222222222');
ws1.write('33333333333333333333333333');
ws1.write('END.');
ws1.end();
