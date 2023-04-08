import { Request, Response} from 'express'
import stories from '../models/stories'
import User from '../models/user';

export const newStory = async (req: Request, res: Response): Promise<Response> => {
    const NewStory = new stories (req.body)
    await NewStory.save();
    return res.status(201).json({NewStory, msg: 'Story posted successfully'})
}

export const allStories = async (req: Request, res: Response): Promise<Response> => {
    const storie:any = await stories.find({});
    const user:any = await User.find({});
    console.log(req.body)
    if (!stories) {
        return res.status(400).json({ msg: "The storie dont exists"});
    }
    return res.status(200).json({storie,user});
};