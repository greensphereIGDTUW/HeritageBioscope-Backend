import Comments from '../models/comments.js'; 

export const fetchComments = async (req, res, next) => {
    try {
        const comments = await Comments.find({}); 
        res.status(200).json(comments); 
    } catch (error) {
        next(error); 
    }
}

export const fetchCommentsbyPost = async (req, res, next) => {
  try{
    const { id } = req.params; 
    const post = await Posts.findById(id); 
    if (!post){
      return res.status(404).json({message: "post not found"}); 
    }
    const comments = await Comments.find({ids: post._id}); 
    if (comments.length==0){
      return res.status(200).json({message: "No comments found"}); 
    }
    res.status(200).json(comments); 
  }
  catch (e) {
    next(e); 
  }
}

export const createComment = async (req, res, next) => {
  const newComment = new Comments(req.body); 
  try{
    const post = await Posts.findById(req.params.id);

    if (!post) {
      return res.send({ message: 'Post not found' });
    }

    post.comments.push({  });

    const result = await student.save();
    return res.send(result)
    const savedComment = await newComment.save();
    const { ids } = req.body; 
    const posti = Posts.findById(ids); 
    posti.comments.add()
    res.status(200).json(savedComment);
  }catch(e){
    next(e);
  }
}

export const editComment = async (req, res, next) => {
  try{
    const updatedComment = await Comments.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedComment);
  }
  catch(e){
    next(e); 
  }
}

export const deleteComment = async (req, res, next) => {
  try{
  const deletedComment = await Comments.findByIdAndDelete(req.params.id); 
    res.status(200).json({message: "Comment deleted successfully! "}); 
  }
  catch(e){
    next(e); 
  }
}