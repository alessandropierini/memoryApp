import { Schema, model, Document } from 'mongoose'

export interface IPhoto extends Document {
    image: string;
    time: string;
    caption: string;
    owner: string;
};

const PhotoSchema = new Schema({
    image: {
        type: String,
        unique: false,
        required: true,
        trim: true,
    },
    time: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    caption: {
        type: String,
        unique: false,
        required: true,
        trim: true,
    },
    owner : {
        type: String,
        unique: true,
        required: true,
        trim: true,
    }
});



PhotoSchema.index({'$**': 'text'});

PhotoSchema.pre<IPhoto>('save', async function(next){
    next()
})

export default model<IPhoto>('Photo', PhotoSchema);