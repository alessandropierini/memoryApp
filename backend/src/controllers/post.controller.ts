import { Request, Response} from 'express'
import Post, {IPost} from '../models/Post'


export const newPost = async (req: Request, res: Response): Promise<Response> => {
    const Newpost = new Post (req.body);
    await Newpost.save();
    return res.status(201).json({Newpost, msg:'Post registered succesfully'})
}

export const allPosts = async (req: Request, res: Response): Promise<Response> => {
    const post:any = await Post.find({});
    console.log(req.body)
    if (!post) {
        return res.status(400).json({ msg: "The post dont exists"});
    }
    return res.status(200).json(post);
};