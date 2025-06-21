require('dotenv').config();
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
const storeboard=require('./router/storeboard');

const port=2004;
const DatabaseUrl=process.env.ATLASDB_URL;

const main=async ()=>{
     try{
          await mongoose.connect(DatabaseUrl);
     }catch(err){
          console.log("Error Ocuured in Database",err);
     }
}

main().then(()=>{console.log("DataBase Connection Successfully")});

app.use(cors());
app.use(express.json());

app.use('/storeboard',storeboard);

app.listen(port,(req,res)=>{
     console.log("Server is perfect working");
})