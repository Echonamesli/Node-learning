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