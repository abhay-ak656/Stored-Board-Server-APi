const express=require('express');
const router=express.Router();
const multer=require('multer');
const storage=require('../storage');
const uplaod=multer({storage})
const Item=require('../model/item');
const nodemailer=require('nodemailer');

const transport=nodemailer.createTransport({
  service:'gmail',
  auth:{
    user:'abhay.ak201@gmail.com',
    pass:process.env.APP_Password
  },

})

router.post('/additem',uplaod.fields([
    {name:'coverimage',maxCount:1},
     {name:'additionalImage',maxCount:10}
]),async (req,res)=>{
    
    try{
       let {name,type,description}=req.body;
       let coverimage=req.files.coverimage[0];
       let additionalImage=req.files.additionalImage;
      
       let item=new Item({name,type,description,
          CoverImage:{
            ImageUrl:coverimage.path,
            filename:coverimage.originalname
          },
          additionalImage:additionalImage.map(file =>{
            return {
                ImageUrl:file.path,
                filename:file.originalname
            }
          })
        })
        console.log(item);
        await item.save();
    }catch(err){
        console.log(err);
    }

    res.status(200).json("Suceessfully added");
})

router.get('/viewitem',async (req,res)=>{
  const items=await Item.find();
  res.status(200).json(items);
})

router.get('/viewitem/:id',async (req,res)=>{
  let {id}=req.params;
  const item=await Item.findById(id);
 
  res.status(200).json(item);
})


router.post('/viewitem/:id',async (req,res)=>{
  console.log('enter');
  let {id}=req.params;
  const item=await Item.findById(id); 
   await transport.sendMail({
    from:'abhay.ak201@gmail.com',
    to:'patelrandhir873@gmail.com',
    subject:`Enquiry about ${item.name}`,
    text:`A user is interested in:\n\nItem: ${item.name}\nType: ${item.type}\nDescription: ${item.description}`
   })
    res.status(200).json("Email sent successfully");
})
module.exports=router