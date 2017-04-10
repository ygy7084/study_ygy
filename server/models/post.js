import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Post = new Schema({
    content : String,
    time : Date,
    writer : Object,
    coords : Object
});

export default mongoose.model('post', Post);