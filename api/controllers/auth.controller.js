import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next)=>{
    console.log(req.body);
    const {userName, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser  = new User({userName, email, password:hashedPassword});
    try{
        await newUser.save();
        res.status(201).json({message: "User Created Successfully"});
    }catch(error){
        next(error);
    };
    
    
}

export const signin = async (req, res, next)=>{
    console.log(req.body);
    const {email, password} = req.body;
    try{
        const validUser = await User.findOne({email});  //Query user based on email
        if(!validUser){
            return next(errorHandler(401, 'User not found'));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword){
            return next(errorHandler(401, 'wrong credentials'));  //show custom error
        }
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET); //create access token

        const {password: hashedPassword, ...restUser} = validUser._doc; //remove password from validUser

        const expiryDate = new Date(Date.now() + 3600000); //1 hr
        res
        .cookie('access_token', token, {httpOnly : true, expires : expiryDate}) //store access token in cookie
        .status(200)
        .json(restUser);

    }catch(error){
        next(error);
    };
    
    
}

signin