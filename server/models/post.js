/**
 * Created by 1nept on 2017-01-31.
 */
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Post = new Schema({
    title: String,
    content: String,
    time: Date,
    username: String
});

export default mongoose.model('post', Post);