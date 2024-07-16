import mongoose from "mongoose";

const Girlfriend = new mongoose.Schema({
    name: { type: String, required: true },
    image : { type: String, required: true },
    description: { type: String, required: true },
});


export default mongoose.model('Girlfriend', Girlfriend);