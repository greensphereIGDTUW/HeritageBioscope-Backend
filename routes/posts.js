import express from 'express'; 
import {fetchPosts, fetchPostbyId , createPost,editPost,deletePost, likePost} from '../controllers/posts.js'; 


const router = express.Router(); 

router.get('/', fetchPosts);
router.get('/:id', fetchPostbyId );
router.post('/', createPost);
router.put('/:id', editPost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost)


export default router; 