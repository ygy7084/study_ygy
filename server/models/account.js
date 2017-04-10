import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Account = new Schema({
    _id : String,
    displayName : String,
    email: String,
    time : Date
});

export default mongoose.model('account', Account);