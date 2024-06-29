import { Schema, model } from "mongoose";
import mongoose from "mongoose";


export interface IMessage {
    content: string;
    sender: string;
    timestamp: Date;
    chat: mongoose.Types.ObjectId;
    isRead: boolean;
  }
  
export interface MessageModel extends IMessage, mongoose.Document {}

const Message = new Schema({
    chat: { type: Schema.Types.ObjectId, ref: 'Chat', required: true},
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    isRead : {type: Boolean, default: false}
});

export default model('Message', Message);