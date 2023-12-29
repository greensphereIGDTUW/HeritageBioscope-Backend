import express from 'express'; 
import {fetchComments, fetchCommentsbyPost , createComment,editComment,deleteComment} from '../controllers/comments.js'; 


const router = express.Router(); 

router.get('/', fetchComments);
router.get('/:id', fetchCommentsbyPost);
router.post('/id', createComment);
router.put('/:id', editComment);
router.delete('/:id', deleteComment);


export default router; 