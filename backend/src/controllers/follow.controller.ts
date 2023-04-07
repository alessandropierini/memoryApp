import {json,Request,Response } from "express";
import follow from "../models/follow";

export const FolloworUnfollow = async (req:Request, res:Response): Promise<Response> =>{
    const result = await follow.find({FollowedUser:req.body.FollowedUser, FollowingUser:req.body.FollowingUser});
    console.log(result.length)
    if(result.length==0) {
        const Newlike = new follow(req.body);
        await Newlike.save();
        return res.status(201).json({msg: "You follow this user"})
    }
    await follow.deleteOne({FollowedUser:req.body.FollowedUser,FollowingUser:req.body.FollowingUser});
    return res.status(201).json({msg: 'You unfollow this user'})
}

export const GetFollowers = async (req: Request, res: Response): Promise<Response>=>{
    const result = await follow.find({FollowedUser:req.body.FollowedUser});
    return res.status(201).json(result)
}

export const GetFollowing = async (req: Request, res: Response): Promise<Response>=> {
    const result = await follow.find({FollowingUser:req.body.FollowingUser})
    return res.status(201).json(result)
}

