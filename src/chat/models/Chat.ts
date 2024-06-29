import mongoose, { Schema } from 'mongoose';

const Chat = new Schema({
    participants : [{ type: Schema.Types.ObjectId, ref: 'User' }],
    lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
});


export default mongoose.model('Chat', Chat);