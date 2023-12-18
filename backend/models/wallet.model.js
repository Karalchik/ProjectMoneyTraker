const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const walletSchema=new Schema({
    currency_type:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:2
    },
    name:{
        type:String,
        required:true,
        unique:true,
        minlength:3
    },
    incomeId:{type:String,requred:true},
    loosesId:{type:Boolean,requred:true}
},{
    timestamps:true,

});

const Wallet=mongoose.model('Wallet',walletSchema);

module.exports=Wallet;