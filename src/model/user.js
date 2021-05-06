import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = Schema({
    email:{type:String,require:true,unique:true},
    password:{type:String}
})

export default mongoose.model('User',userSchema);