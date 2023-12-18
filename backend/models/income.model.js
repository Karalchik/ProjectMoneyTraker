const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const incomeSchema=new Schema({
    upByMonth:{
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

const Income=mongoose.model('Income',incomeSchema);

module.exports=Income;