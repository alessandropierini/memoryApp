import { Request, Response } from 'express';
import fs from 'fs-extra'
import path from 'path'

// Models
import Photo, { IPhoto } from '../models/Photo';
import Seguir from '../models/Seguir';

export const newPhoto = async (req: Request, res: Response) => {


    const Newphoto = new Photo(req.body);
    await Newphoto.save();
    return res.status(201).json({Newphoto, msg:'Photo saved succesfully'});
}



/*
export async function getPhotos(req: Request, res: Response): Promise<Response> {
    const photos = await Photo.find();
    return res.json(photos);
};

export const newPhoto = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.description&&req.body.imagePath=='undefined') {
        return res.status(400).json({ msg: "The user dont post any image"});
    }
    const newPhoto = new Photo(req.body);
    await newPhoto.save();
    return res.status(201).json(newPhoto)
    const { title, description } = req.body;
    const newPhoto = { title, description, imagePath: req.file.path };
    const photo = new Photo(newPhoto);
    await photo.save();
    return res.json({
        message: 'Photo Saved Successfully',
        photo
    });
};

export async function getPhoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const photo = await Photo.findById(id);
    return res.json(photo);
}

export async function deletePhoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const photo = await Photo.findByIdAndRemove(id) as IPhoto;
    if (photo) {
        await fs.unlink(path.resolve(photo.imagePath));
    }
    return res.json({ message: 'Photo Deleted' });
};

export async function updatePhoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedPhoto = await Photo.findByIdAndUpdate(id, {
        title,
        description
    });
    return res.json({
        message: 'Successfully updated',
        updatedPhoto
    });
}
*/