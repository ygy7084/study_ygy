import express from 'express';
import Post from '../models/post';

const router = express.Router();

function _idToid(obj) {
    if(obj && obj._id) {
        obj.id = obj._id;
        delete obj._id;
    }
    return obj;
}

router.get('/loadList', (req,res) => {
    Post.find({}).lean().exec((err, list) => {
        if(err) {
            throw err;
        } else {
            if(list && Array.isArray(list)) {
                list.map((obj) => {
                    _idToid(obj);
                    _idToid(obj.writer);
                    return obj;
                });
            } else
                list = [];
            return res.json({
                success : true,
                list
            });
        }
    });
});

router.get('/load/:id', (req,res) => {
    Post.find({_id:req.params.id}).lean().exec((err, post) => {
        if(err) {
            throw err;
        } else {
            if(!post)
                post = [];
            if(!Array.isArray(post))
                post = [post];
            post.map((obj) => {
                _idToid(obj);
                _idToid(obj.writer);
                return obj;
            });
            return res.json({
                success : true,
                post
            })
        }
    });
});

router.post('/write',(req,res) => {
    let post = new Post({
        content : req.body.content,
        time : new Date(),
        writer : {
            _id : req.body.writer.id,
            displayName : req.body.writer.displayName
        },
        coords : req.body.coords
    });
    post.save((err,post) => {
        if(err) throw err;

        post = JSON.parse(JSON.stringify(post));
        //because function lean is not available at 'post.save()'
        _idToid(post);
        _idToid(post.writer);
        return res.json({
            success : true,
            post
        })
    });
});

router.put('/modify/:mode', (req,res) => {
    let mode = req.params.mode;
    let body = {};

    if(mode === 'coords')
        body = {
            coords : req.body.coords
        };
    else if(mode === 'content')
        body = {
            content : req.body.content
        };

    Post.update({_id:req.body.id}, {$set: body}, (err) => {
        if(err) throw err;
        else
            return res.json({success:true});

    });
});

router.delete('/remove', (req,res) => {
    Post.remove({_id:req.body.id},(err) => {
        if(err) throw err;
        else
            return res.json({success : true})
    });
});

export default router;