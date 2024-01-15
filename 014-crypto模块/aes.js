/* AES是一种常用的对称加密算法，加解密都用同一个密钥。crypto模块提供了AES支持，
但是需要自己封装好函数，便于使用 */

const crypto = require("crypto");

//key是用于加密的密钥，iv参数可选，是初始化向量，用于指定加密时所用的向量，从而增加加密算法强度，使用相同密钥进行多个数据块加密时，
//为每个数据块使用不同的初始化向量可以提高安全
function encrypt (key, iv, data) {
    //设置的是aes128位的加密算法
    let decipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    // decipher.setAutoPadding(true);
    return decipher.update(data, 'binary', 'hex') + decipher.final('hex');
}

function decrypt (key, iv, crypted) {
     crypted = Buffer.from(crypted, 'hex').toString('binary');
     let decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
     return decipher.update(crypted, 'binary', 'utf8') + decipher.final('utf8');
}

//可以看出，加密后的字符串通过解密又得到了原始内容。

// key,iv必须是16个字节 16*8=128
let key = 'abcdef1234567890'
let iv =  'fjyswg6453767890'
let data = 'aaa-kervin'
let cryted = encrypt(key,iv ,data)
console.log('加密结果： ',cryted);   //68a6f0cb39fb50f4a3dec0762253bf9c

let decrypted = decrypt(key, iv, cryted)

console.log('解密结果： ', decrypted);