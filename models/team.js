import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema(
    {
        Name: {
            type: String, 
            required: true 
        }, 
        Desc: {
            type: String, 
            required: true
        }, 
        Social: {
            type: String, 
            required: true
        }, 
        Photo: {
            type: String, 
            required: true
        }
    }, 
  {timestamps: true}
);

export default mongoose.model("Team", TeamSchema);