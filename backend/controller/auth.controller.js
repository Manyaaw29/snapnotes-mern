import User from '../model/user.model.js';
import { errorHandler } from '../utils/errorHandler.js';

export const signup=async(req,res,next)=>{
    const {username,email,password}=req.body;

    const isValidUser =  await User.findOne({email});

    if(isValidUser){
        return next(errorHandler(400,"User already exists"));
}

}