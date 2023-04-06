import {Model, Schema, Document, model} from 'mongoose';

export interface comment extends Document {
    idPost:string,
    comment:string,
    time:Date,
    idUser:string,
}

const commentSchema = new Schema ({
    idPost: {
        type:String,
        unique:false,
        required:true,
        trim:true,
    },
    comment: {
        type: String,
        unique:false,
        required:false,
        trim:true
    },
    time: Date,
    idUser: {
        type: String,
        unique:false,
        required:true,
        trim:true,
    }
});

commentSchema.pre<comment>('save', async function(next){
    next()
});

export default model<comment>('comment', commentSchema)
    
