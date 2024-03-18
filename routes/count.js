import express from 'express';
import {getPostsCount, getBlogCount} from '../controllers/count.js';

const router = express.Router();

router.get('/posts', getPostsCount); 
router.get('/blog', getBlogCount); 

export default router; 