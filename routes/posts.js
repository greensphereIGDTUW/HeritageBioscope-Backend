import express from 'express'; 
import {fetchPosts, fetchPostbyId , createPost,editPost,deletePost} from '../controllers/posts.js'; 


const router = express.Router(); 

router.get('/', fetchPosts);
router.get('/:id', fetchPostbyId );
router.post('/', createPost);
router.put('/:id', editPost);
router.delete('/:id', deletePost);


export default router; 