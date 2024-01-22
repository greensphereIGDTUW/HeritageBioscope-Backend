import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true 
  },
  password: {
    type: String,
    required: true,
  },
  profile_photo: {
    type: String,
  },
  Bio: {
    type: String,
    required: false,
  },
  Number_Of_Posts: {
    type: String,
  },
  posts: [
    {
      post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts",
        // default: null,
      },
    },
  ],
  blogs: [
    {
      blog_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        // default: null,
      },
    },
  ],
});

export default mongoose.model("User", UserSchema);
