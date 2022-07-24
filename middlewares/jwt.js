import jwt from 'jsonwebtoken';

export const createTokens = (user)=>{
    const accessToken = jwt.sign({id:user._id,username:user.username,isAdmin:user.isAdmin}
    ,process.env.TOKEN
    ,{expiresIn:"1h"} 
    )
    return accessToken;
}

export const validateToken = (req,res,next)=>{
    const authHeader = req.headers.token // to take access token from headers
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.TOKEN,(err,decoded)=>{
            if(err){
                req.authenticated = false;
                req.decoded = null;
                return res.status(401).json("Sorry your session is expired , Please try to Login again")
            }else{
                req.authenticated = true;
                req.decoded = decoded;
                next();
            }
        })
    }else{
        return res.status(403).json("Token is not valid")
    }
}

export const verifyTokenAndAuthorization = (req,res,next)=>{
    validateToken(req,res,()=>{
        if(req.authenticated || req.decoded.isAdmin){
            next();
        }else{
            res.status(403).json("You are not allowed to do that")
        }
    })
}

export const verifyTokenAndAdmin = (req,res,next)=>{
    validateToken(req,res,()=>{
        if(req.decoded.isAdmin){
            next();
        }else{
            res.status(403).json("You are not allowed to do that")
        }
    })
}