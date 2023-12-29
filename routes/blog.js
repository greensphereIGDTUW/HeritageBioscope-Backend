import express from 'express'; 
import {fetchBlogs, fetchBlogbyId, createBlog , editBlog, deleteBlog} from '../controllers/blog.js'; 


const router = express.Router(); 

router.get('/', fetchBlogs);
router.get('/:id', fetchBlogbyId );
router.post('/', createBlog);
router.put('/:id', editBlog);
router.delete('/:id', deleteBlog);


export default router; 