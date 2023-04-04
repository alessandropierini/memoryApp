import { Request, Response} from 'express'
import Post, { IPost } from '../models/post'

export const newPost = async (req: Request, res: Response): Promise<Response> => {


    const Newpost = new Post (req.body);
    await Newpost.save();
    return res.status(201).json({Newpost, msg:'Post registered succesfully'})

}