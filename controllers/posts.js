import Posts from "../models/posts.js";
import User from "../models/user.js"; 

export const fetchPosts = async (req, res, next) => {
  try {
    const posts = await Posts.find({});
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const fetchPostbyId = async (req, res, next) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }
    res.status(200).json(post);
  } catch (e) {
    next(e);
  }
};

export const createPost = async (req, res, next) => {
  // const { Author } = req.body; 
  // const newPost = new Posts(req.body);
  try {
  //   const user = await User.findById(Author); 
  //   if (!user) {
  //     return res.send({ message: 'User not found' });
  //   }
  //   const savedPost = await newPost.save();
  //   // post.Author = user_id save 
  //   user.posts.push({post_id: savedPost._id});
  //   console.log(user.posts.length);
  //   const something = await user.save();
  //   res.status(200).json(savedPost);
    const newPost = new Posts(req.body);
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } 
  catch (e) {
    next(e);
  }
};

//posts: [
//   {
//     post_id: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Posts",
//       // default: null,
//     },
//   },
// ],

export const editPost = async (req, res, next) => {
  const updatedPost = await Posts.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true },
  );
  res.status(200).json(updatedPost);
};

export const deletePost = async (req, res, next) => {
  const { Author } = req.body; 
  try {
     const user = await User.findById(Author); 
    if (!user) {
      return res.send({ message: 'User not found' });
    }
    const deletedPost = await Posts.findByIdAndDelete(req.params.id);

    // const updateUser = await User.posts.findOneAndDelete({post_id: req.params.id});
    const updateUser = await User.findOneAndUpdate(
      { _id: deletedPost.Author },
      { $pull: { posts: { post_id: deletedPost._id } } },
      { new: true }
    );
//  { _id: deletedPost.Author },
    // { $pull: { posts: { post_id: deletedPost._id } } },
    // { new: true }
    
    // await user.findByIdAndDelete(Photo);
    // From Author id delete the post_id 
    res.status(200).json({ message: "Post deleted successfully! " });
  } catch (e) {
    next(e);
  }

};


export const likePost = async (req, res) => {

  const post = await Posts.findById(req.params.id); 
  //send what is required to be updated as an object
  const updatedPost = await Posts.findByIdAndUpdate({_id: req.params.id}, {num_likes: post.num_likes+1}, {new: true})

  res.json(updatedPost); 
}

export const addComment = async (req, res) => {
  try {
      const postId = req.params.id;
      const { author, text } = req.body;
      const post = await Posts.findById(postId);

      if (!post) {
          return res.status(404).json({ error: 'Post not found' });
      }

      post.comments.push({ author: author, text: text });
      await post.save();

      res.json(post);
  } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const countPosts = async (req, res) => {
  try {
    const count = await Posts.countDocuments({}, { hint: "_id" }); 
    res.json({ count });
  } catch (error) {
    console.error('Error fetching document count:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
