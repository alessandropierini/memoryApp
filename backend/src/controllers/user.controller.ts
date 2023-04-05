import { Request, Response} from 'express'
import User, { IUser } from '../models/user'
import jwt from 'jsonwebtoken'
import config from '../config/config'
import bcrypt from "bcrypt"
import Post from '../models/Post'

function createToken(user: IUser) {
    return jwt.sign({id: user.id, email: user.email}, config.jwtSecret, {
        expiresIn: 86400 //24 horas o 1 dia
    });
}

//controlador de registro

export const signUp = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({msg: 'Please, send your username and password'})
    }
    
    const user = await User.findOne({username: req.body.username});
    console.log(req.body)
    if(user) {
        return res.status(400).json({msg: 'The user already exist'});
    }
    //guardar usuario
    const Newuser = new User(req.body);
    await Newuser.save();
    return res.status(201).json({Newuser, msg:'User registered succesfully', token: createToken(Newuser)});
}

//controlador de login

export const signIn = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({msg: 'Please, send your username and password'})
    }

    const user = await User.findOne({username: req.body.username})
    if(!user) {
        return res.status(400).json({msg: 'The user dont exist'});
    }
    const isMatch = await user.comparePassword(req.body.password)
    if (isMatch) {
        return res.status(200).json({token: createToken(user), user})
    }
    return res.status(400).json({
        msg: 'The user or password are incorrect'
    });
}

//controlador de busqueda

export const SearchUser = async (req: Request, res: Response): Promise<Response> => {
    const user:any = await User.find({});
    console.log(req.body)
    if (!user) {
        return res.status(400).json({ msg: "The user dont exists"});
    }
    return res.status(200).json(user);
};

//controlador de editar usuario
export const EditUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await User.updateOne({_id:req.body._id},{username:req.body.username, name:req.body.name, email:req.body.email});
    if(!user) {
        return res.status(400).json({msg: "Error updating profile"})
    }
    //const posts = await post.updateMany({owner:req.body._id, username:req.body.username})
    return res.status(201).json({user, msg:"Saved Succesfully!"})
}

//controlador para encontrar usuario
export const SpecificUser = async (req: Request, res: Response) => {
    const user:any = await User.findOne({_id:req.body._id});
    const post:any = await Post.find({owner:req.body._id})
    console.log(req.body)
    if (!user) {
        return res.status(400).json({msg: "The user dont exists"});
    }
    res.status(200).json({user,post});
}

//editar password

export const EditPassword = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.actual || !req.body.new) {
        return res.status(400).json({msg: "Please add the fields"});
    }

    const user = await User.findOne({_id:req.body._id});
    if(!user) {
        return res.status(400).json({msg: "The user dont exist"});
    }

    const isMatch = await user.comparePassword(req.body.actual);
    if (!isMatch) {
        return res.status(400).json({msg: "The current password does not match"})
    }

    if (req.body.actual==req.body.new) {
        return res.status(400).json({ msg: "The new password cannot be the same as the current one"})
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.new,salt)
    const pass = await User.updateOne({_id:req.body._id},{password:hash});

    return res.status(201).json({msg: "Change made successfully!"});

}

//controlador de eliminar usuario

export const DeleteUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await User.findOne({_id:req.body._id});
    const post = await Post.find({owner:req.body._id});
    if(!user) {
        return res.status(400).json({ msg: 'The user dont exists'});
    }
    await User.deleteOne({_id:req.body._id})
    await Post.deleteMany({owner:req.body._id})
    
    return res.status(201).json({ msg: 'User and post deleted succesfully'});
}