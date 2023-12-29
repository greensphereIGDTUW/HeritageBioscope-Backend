import Blog from "../models/blog.js";
import User from "../models/user.js"; 

export const fetchBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({});
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
};

export const fetchBlogbyId = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(blog);
  } catch (e) {
    next(e);
  }
};

export const createBlog = async (req, res, next) => {
  const { Author } = req.body; 
  const newBlog = new Blog(req.body);
  try {
    const user = await User.findById(Author); 
    if (!user) {
      return res.send({ message: 'User not found' });
    }
    const savedBlog = await newBlog.save();
    // Blog.Author = user_id save 
    user.blogs.push({blog_id: savedBlog._id});
    const something = await user.save();
    res.status(200).json(savedBlog);
  } 
  catch (e) {
    next(e);
  }
};

//Blogs: [
//   {
//     Blog_id: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Blogs",
//       // default: null,
//     },
//   },
// ],

export const editBlog = async (req, res, next) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true },
  );
  res.status(200).json(updatedBlog);
};

export const deleteBlog = async (req, res, next) => {
  const { Author } = req.body; 
  try {
     const user = await User.findById(Author); 
    if (!user) {
      return res.send({ message: 'User not found' });
    }
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

    // const updateUser = await User.Blogs.findOneAndDelete({Blog_id: req.params.id});
    const updateUser = await User.findOneAndUpdate(
      { _id: deletedBlog.Author },
      { $pull: { blogs: { blog_id: deletedBlog._id } } },
      { new: true }
    );
//  { _id: deletedBlog.Author },
    // { $pull: { Blogs: { Blog_id: deletedBlog._id } } },
    // { new: true }

    // await user.findByIdAndDelete(Photo);
    // From Author id delete the Blog_id 
    res.status(200).json({ message: "Blog deleted successfully! " });
  } catch (e) {
    next(e);
  }

};
