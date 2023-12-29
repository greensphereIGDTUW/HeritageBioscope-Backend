import mongoose from "mongoose";

const CommentsSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        ids: {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Post'
        },
        content: {
          type: String, 
          required: true
        },
    },
  { timestamps: true }
);

export default mongoose.model("Comments", CommentsSchema);