import express from 'express';
import Post from '../models/post';

const router = express.Router();

//routes
router.get('/loadList', (req,res) => {
    Post.find({}, (err, list) => {
        if(err) {
            return res.json({success : false});
        } else {
            if(!list || list.length === 0 )
                list = [];
            return res.json({
                success : true,
                list
            });
        }
    });
});

/*
router.get('/load/:id', (req,res) => {
    Post.find({_id:req.params.id}, (err, data) => {
        if(data == undefined) {
            data = {
                username:'error',
                title:'error',
                content:'error'
            }
        }
        res.send(data[0]);
    });
});
*/

router.post('/write',(req,res) => {
    let post = new Post({
        title : req.body.title,
        content : req.body.content,
        time : new Date(),
        username : req.body.username
    });
    post.save((err,data) => {
        if(err) throw err;
        return res.json({
            success : true,
            _id : data._id
        });
    });
});

router.put('/modify', (req,res) => {
    Post.update({_id:req.body._id},{$set: {title:req.body.title,content:req.body.content}},(err) => {
        if(err) throw err;
        else
            return res.json({success : true});
    });
});

router.delete('/remove', (req,res) => {
    Post.remove({_id:req.body._id},(err) => {
        if(err) throw err;
        else
            return res.json({success : true})
    });
});

export default router;