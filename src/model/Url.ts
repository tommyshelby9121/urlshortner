import { model, Schema, Document } from "mongoose";

export interface IUrl extends Document {
    urlCode: string,
    longUrl: string,
    shortUrl: string,
    createdAt: any,
}

const UrlSchema = new Schema({
    urlCode: {
        type: String,
        required: true,
        unique: true,
    },
    longUrl: {
        type: String,
        required: true,
        unique: true,
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

export default model<IUrl>("Url", UrlSchema);