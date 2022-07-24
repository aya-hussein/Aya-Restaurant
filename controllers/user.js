import User from '../models/User.js';
import bcrypt  from 'bcrypt';
import {createTokens} from '../middlewares/jwt.js';

export const register = (req,res)=>{
    bcrypt.hash(req.body.password ,10).then((hash)=>{
        User.create({
            username : req.body.username,
            email : req.body.email,
            password : hash,
        }).then(()=>{
            login(req,res);
        }).catch((err)=>{
            res.status(500).json("The Username or Email is repeated");
        })
    })
}

export const login = async(req,res)=>{
    const {email,password} =req.body;
    const user = await User.findOne({email : email});
    !user && res.status(401).json("Please enter your Email Correctly")
    const dbpassword = user.password
    bcrypt.compare(password,dbpassword)
    .then((match)=>{
        if(!match){
            res.status(401).json("Your Password is Wrong, please try again")
        }
        else{
            const accessToken = createTokens(user)
            const {password,...others} = user._doc;
            res.status(200).json({...others,auth:true,token:accessToken});
        }
    })
}

export const getUserById = async(req,res)=>{
    try {
        const user = await User.findById(req.params.userId);
        //to hide password
        const {password,...others} = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
}