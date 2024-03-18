import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema(
    {
        name: {
            type: String, 
            required: true 
        }, 
        desc: {
            type: String, 
            required: true
        }, 
        social: {
            type: String, 
            required: true
        }, 
        photo: {
            type: String, 
            required: true
        }
    }, 
  {timestamps: true}
);

export default mongoose.model("Team", TeamSchema);