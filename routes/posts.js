import express from 'express';
import { title } from 'process';
const router = express.Router();

let posts = [
    {id: 1, title: "Post One"},
    {id: 2, title: "Post Two"},
    {id: 3, title: "Post Three"}
];

const logger = (req, res, next) => {
    console.log(`${req.method}`);
    next();
}

// Get all post
router.get('/', logger, (req, res) => {
    const limit = parseInt(req.query.limit);

    if(!isNaN(limit) && limit > 0){
        res.status(200).json(posts.slice(0, limit));
    } else {
        res.status(200).json(posts);
    }
})

// Get single post
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);
    
    if(!post) {
        res.status(404).json({msg: `A post with the id of ${id} was not found`});
    } else {
        res.status(200).json(post);
    }
});

// Create new post
router.post('/', (req, res) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title
    };
    if(!newPost.title){
        return res.status(400).json({ msg: 'Please include a title'});
    }
    posts.push(newPost);
    res.status(201).json(posts);
})

// Update Post
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);
    
    if(!post) {
        res.status(404).json({msg: `A post with the id of ${id} was not found`});
    }

    post.title = req.body.title;
    res.status(200).json(posts);
});

// Deleted Post
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);
    
    if(!post) {
        res.status(404).json({msg: `A post with the id of ${id} was not found`});
    }

    posts = posts.filter((post) => post.id !== id);
    res.status(200).json(posts);
});

export default router;