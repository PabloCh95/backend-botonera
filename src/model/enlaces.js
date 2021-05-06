import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const linksSchema = Schema({
    url:{type:String,require:true,unique:true},
    name:{type:String,require:true,unique:true},
    icon:{type:String,require:true,unique:true}
})

export default mongoose.model('Link',LinksSchema);