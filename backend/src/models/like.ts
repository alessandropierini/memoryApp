import { Model, Schema, Document, model } from "mongoose";

export interface Like extends Document {
    idPost: string,
    idUser: string,
}

const LikeSchema = new Schema ({
    idPost: {
        type: String,
        unique: false,
        required: true,
        trim: true
    },
    idUser: {
        type: String,
        unique: false,
        required: true,
        trim: true
    }
});

LikeSchema.pre<Like>('save', async function(next){
    next();
})

export default model<Like>('Like', LikeSchema)