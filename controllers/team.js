import Team from "../models/team.js";

export const fetchTeam = async (req, res, next) => {
  try {
    const members = await Team.find({});
    res.status(200).json(members);
  } catch (error) {
    next(error);
  }
};

export const fetchTeambyId = async (req, res, next) => {
  try {
    const member = await Team.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "post not found" });
    }
    res.status(200).json(member);
  } catch (e) {
    next(e);
  }
};

export const createTeam = async (req, res, next) => {
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
    const newTeam = new Team(req.body);
    const savedTeam = await newTeam.save();
    res.status(200).json(savedTeam);
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

