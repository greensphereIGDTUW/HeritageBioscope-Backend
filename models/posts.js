import mongoose from "mongoose";

const PostsSchema = new mongoose.Schema(
    {
        Title: {
            type: String,
            required: true
        },
        // Author: {
        //   type: mongoose.Schema.Types.ObjectId,
        //   ref: 'User',
        // },
        Author: {
          type: String, 
          required: true, 
        },
        Content: {
            type: String,
            required: true,
        }, 
        Photo: {
            type: String,
        },
        num_likes: {
            type: Number, 
            default: 0
        },
        num_dislikes: {
          type: Number,

        }, 
        comments: [
          { 
            author: String, 
            text: String 
          }
        ]
      // comments: [
      //     {
      //       comment_id:{
      //       type: mongoose.Schema.Types.ObjectId,
      //       ref: 'Comments',
      //       default: null
      //       }
      //   }
      //   ],
    }, 
  {timestamps: true}
);

export default mongoose.model("Posts", PostsSchema);