import { json, Request, Response } from 'express';
import comment from '../models/comment';
import Post from '../models/Post';
import like from '../models/like';

export const NewComment = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.comment) {
        return res.status(400).json({msg: "The comment cannot be empty"});
    }
    const newComment = new comment(req.body)
    await newComment.save();
    return res.status(201).json(newComment)
}

export const AddOrRemoveLikecomment = async (req: Request, res: Response): Promise<Response> => {
    const result = await like.find({_id:req.body._id, idPost:req.body.idPost, idUser:req.body.idUser});
    console.log(result.length)
    if (result.length==0) {
        const Newlike = new like(req.body)
        await Newlike.save();
        return res.status(201).json({msg: "Like comment" });
    }
    await like.deleteOne({idPost:req.body.idPost,idUser:req.body.idUser})
    return res.status(201).json({msg: "Not like comment "})
}
export const Getlikescomments = async (req: Request, res: Response): Promise<Response> => {
    const result = await like.find({_id:req.body._id})
    return res.status(201).json(result)
}

export const getComments = async (req:Request, res:Response): Promise<Response> => {
    const comments = await comment.find({idPost:req.body.idPost}).sort({time:'desc'});
    const post:any = await Post.findOne({});
    return res.status(201).json({comments, post})
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