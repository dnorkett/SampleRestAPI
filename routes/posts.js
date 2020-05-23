const express = require('express');
const router = express.Router();
const Post = require('../models/Post');


//ROUTES
//First parameter is route, second is callback function
router.get('/', async (req,res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err) {
        res.json({message:err});
    }
});


//Gets back a specific post
router.get('/:postId', async (req,res) => {
    try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
    }catch(err){
        res.json({message:err});
    }
});


//Submits a post
router.post('/', (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    post.save()        
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({message: err});
        });
});


//Delete a post
router.delete('/:postId', async (req,res) => {
    try {
    const removedPost = await Post.remove({_id: req.params.postId});
    res.json(removedPost);
    } catch(err){
        res.json({message:err});
    }
});


//Update a post
router.patch('/:postId', async (req, res) => {
    try{
        const updatedPost = await Post.updateOne({_id: req.params.postId }, {$set: 
            {title: req.body.title}}
            );
            res.json(updatedPost)        ;
    }catch(err) {
        res.json({message: err});
    }
});



module.exports = router;