import { Model, Schema, Document, model } from "mongoose"

export interface Seguir extends Document {
    idSeguido: string,
    idSeguidor: string,
}

const SeguirSchema = new Schema ({
    idSeguido: {
        type: String,
        unique: false,
        required: true,
        trim: true
    },
    idSeguidor: {
        type: String,
        unique: false,
        required: true,
        trim: true
    }
});

SeguirSchema.pre<Seguir>('save', async function(next) {
    next()
})

export default model<Seguir>('Seguir', SeguirSchema)