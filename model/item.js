const mongoose=require('mongoose');
const {Schema,model}=mongoose;

const itemSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    CoverImage:{
        ImageUrl:{type:String},
        filename:{type:String}
    },
    additionalImage:[
        {ImageUrl:String,
         filename:String
        }
    ]
})

const Item=model('Item',itemSchema);

module.exports=Item;