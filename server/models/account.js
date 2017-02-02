/**
 * Created by 1nept on 2017-01-31.
 */
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Account = new Schema({
    username:String,
    password:String,
    salt:String
});

export default mongoose.model('account', Account);