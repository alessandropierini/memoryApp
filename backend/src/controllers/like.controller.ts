import {json, Request, Response} from "express";
import like from "../models/like";

export const AddOrRemoveLike = async (req: Request, res: Response): Promise<Response> => {
    const result = await like.find({idPost:req.body.idPost, idUser:req.body.idUser});
    console.log(result.length)
    if (result.length==0) {
        const Newlike = new like(req.body)
        await Newlike.save();
        return res.status(201).json({msg: "Like" });
    }
    await like.deleteOne({idPost:req.body.idPost,idUser:req.body.idUser})
    return res.status(201).json({msg: "Not like "})
}

export const Getlikes = async (req: Request, res: Response): Promise<Response> => {
    const result = await like.find({idPost:req.body.idPost})
    return res.status(201).json(result.length)
}