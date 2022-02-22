const jwt = require('jsonwebtoken');
require('dotenv').config();
const authenticateToken=(req,res,next)=>{
    const authHeader=req.headers['authorization']
    if(authHeader)
    {
        const token=authHeader.split(' ')[1]
        jwt.verify(token,process.env.strForJWT,(err,user)=>{
            if(err)
            {
                res.status(403).send('invalid token- problem occured in jwt.verify in authenticateToken: ',err)
            }
            req.user=user
            next()
        })
    }
    else{
        res.status(401).send('401- no token was sent')
    }
}


module.exports={authenticateToken}