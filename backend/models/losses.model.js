const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const lossesSchema=new Schema({
    downByMonth:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:2
    },
    type:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:2
    }
},{
    timestamps:true,

});

const Loosses=mongoose.model('Losses',lossesSchema);

module.exports=Loosses;