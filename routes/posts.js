import express from 'express';
import { title } from 'process';
import { 
    createPost, 
    deletePost, 
    getPost, 
    getPosts, 
    updatePost 
} from '../controllers/postController.js';
const router = express.Router();



// Get all post
router.get('/', getPosts)

// Get single post
router.get('/:id', getPost);

// Create new post
router.post('/', createPost)

// Update Post
router.put('/:id', updatePost);

// Deleted Post
router.delete('/:id', deletePost);

export default router;