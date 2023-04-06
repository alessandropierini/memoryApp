import { json, Request, Response } from 'express';
import comment from '../models/comment';

export const NewComment = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.comment) {
        return res.status(400).json({msg: "The comment cannot be empty"});
    }
    const newComment = new comment(req.body)
    await newComment.save();
    return res.status(201).json(newComment)
}

export const getComments = async (req:Request, res:Response): Promise<Response> => {
    const comments = await comment.find({idPost:req.body.idPost}).sort({time:'desc'});
    return res.status(201).json(comments)
}

export const DeleteComment = async (req:Request, res:Response): Promise<Response> => {
    const description = await comment.findOne({_id:req.body.idPost});
    if (!description){
        return res.status(400).json({msg:'The comment does not exist'})
    }
    const descriptions = await comment.deleteOne({_id:req.body.idPost})
    console.log(descriptions)
    return res.status(201).json({msg: "Comment deleted succesfully!"});
}