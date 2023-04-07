import {Model, Schema, Document, model} from "mongoose";

export interface Follow extends Document {
    FollowingUser: string,
    FollowedUser: string
}

const FollowSchema = new Schema ({
    FollowedUser: {
        type: String,
        unique:false,
        required: true,
        trim: true
    },
    FollowingUser: {
        type: String,
        unique:false,
        required:true,
        trim:true
    }
})

FollowSchema.pre<Follow>('save', async function(next){
    next();
})

export default model<Follow>('Follow', FollowSchema)
