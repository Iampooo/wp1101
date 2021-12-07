import express from 'express'
import Post from '../models/post'
import moment from 'moment'
import { createChainedFunction } from '@material-ui/core'

const router = express.Router()

// TODO 2-(1): create the 1st API (/api/allPosts)
router.get('/', async (req, res) => {
    try{
        let posts = await Post.find().sort({createdAt: 'desc'});
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json({message: "error", data: null})
    }

})

// TODO 3-(1): create the 2nd API (/api/postDetail)
router.get('api/postDetail', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json({message: "success", post: post});
    }catch(err){
        res.status(403).json({message: "error", post: null});
    }
})

// TODO 4-(1): create the 3rd API (/api/newPost)
router.post('/api/newPost', async (req, res) => {
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err);
    }
})
// TODO 5-(1): create the 4th API (/api/post)
router.put('/api/post', async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        try {const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new: true}
        );
        res.status(200).json(updatedPost);
        }catch(err){
            res.status(500).json(err);
        }
    }catch(err){
        res.status(500).json(err);
    }
})

export default router