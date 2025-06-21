const cloudinary=require('cloudinary').v2;

const {CloudinaryStorage}=require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:process.env.Cloud_Name,
    api_key:process.env.Cloud_Api_Key,
    api_secret:process.env.Cloud_Api_Secret
})

const storage= new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'StoreBoard',
        allowed_formats:['png','jpeg','jpg'],
    }
})


module.exports=storage;