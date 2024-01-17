import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res)=>{
    console.log(req.body);
    const {userName, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser  = new User({userName, email, password:hashedPassword});
    try{
        await newUser.save();
        res.status(201).json({message: "User Created Successfully"});
    }catch(error){
        res.status(500).json({Error: error.message});
    };
    
    
}