import {model, Schema, Document } from 'mongoose'

export interface IPost extends Document {
    image: String,
    caption: String,
    time: String,
    owner: String,
    }
    
    const postSchema = new Schema ({
    image: {
    type: String,
    unique:false,
    required:true,
    trim:true,
    },
    caption: {
    type: String,
    unique:false,
    required:true,
    trim:true,
    },
    time: {
    type: String,
    unique:false,
    required:true,
    trim:true,
    },
    owner: {
    type: String,
    unique:true,
    required:true,
    trim:true,
    }
    });

    export default model<IPost>('Post', postSchema);