import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  username?: string;
  password: string;
  couple?: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String},
  password: { type: String, required: true },
  couple : {type: Schema.Types.ObjectId, ref: 'User', default: null}
});

export default mongoose.model<IUser>('User', UserSchema);
