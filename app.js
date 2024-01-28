import express from 'express';
import mongoose from 'mongoose'; 
import dotenv from 'dotenv'; 
import cors from "cors";

dotenv.config(); 

import userRoute from './routes/user.js'; 
import postsRoute from './routes/posts.js'; 
import commentsRoute from './routes/comments.js'; 
import blogRoute from './routes/blog.js'; 

const app = express();
app.use(express.json()); 

app.use(
  cors({
    origin: "https://heritagebioscope.netlify.app",
    credential: true,
  })
);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    console.log(error); 
  }
};

connect();

app.use('/api/user' ,userRoute); 
app.use('/api/posts', postsRoute); 
app.use('/api/comments', commentsRoute); 
app.use('/api/blog', blogRoute); 

app.listen(5500, () => {
  console.log('Connected to backend, listening on port 5500');
});

