const bcrypt = require('bcrypt');
const usersModel = require('./users')

const jwt = require('jsonwebtoken')
const secretKey = 'mdpjwt'

const login = (login, password)=>{
    password = bcrypt.hashSync(password, usersModel.salt)
    
    usersFound = usersModel.users.filter(user => (user.login === login) && (user.password === password))
     
    if(usersFound.length === 1){
        return {access_token : jwt.sign({login : login},secretKey, { expiresIn: '7d' }),
            expirity : "100"}
    }
    return undefined;
}

const checkToken = (req, res, next)=>{
    if(req.url === "/v1/auth/login"){
        next()
    } else {
    if(req.headers['authorization'] === undefined){
        return res.status(401).json({code : 0,type : "credential error", message : "Auth token is not supplied"})
    }
    let token = req.headers['authorization'];
    //console.log(req.url)
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }else {
      return res.status(401).json({code : 0,type : "credential error", message : "Auth token is not supplied"})
    }
    if (token) {
        jwt.verify(token, secretKey, (err, decoded) => {
          if (err) {
            return res.status(401).json({code : 0,type : "credential error", message : "Auth token is not valid"})
          } else {
            req.decoded = decoded;
            next();
          }
        });
    } else {
      return res.status(401).json({code : 0,type : "credential error", message : "Auth token is not supplied"})
    }
}
}

exports.checkToken = checkToken
exports.login = login
