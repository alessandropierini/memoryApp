import {model, Schema, Document } from 'mongoose'

export interface Stories extends Document {
    idUser: String,
    time: Date,
    image:String
}

const storiesSchema = new Schema ({
    idUser: {
        type: String,
        unique:false,
        required: true,
        trim: true,
    },
    time: Date,
    image: {
        type: String,
        unique: false,
        required: true,
        trim: true,
    },
});

export default model<Stories>('Stories', storiesSchema);