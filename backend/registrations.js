const express = require('express');
const router1 = express.Router();
const sql = require('mysql');
const md5 = require('md5');
const multer = require('multer');



let storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'public/userImages');
    },
    filename : (req,file,cb)=>{

             cb(null,file.originalname);
    }
});
let upload = multer({storage : storage});

const connection = sql.createConnection({
    host : "localhost",
    user : "root",
    password : '',
    database : 'voters'
})

connection.connect((err)=>{
if(err){
    console.log(err);
}else{
    console.log('connection created');
}
})

router1.post('/register',upload.single('pic'),(req,res)=>{
    let file = req.file;
    if(!file){
        res.send({
            swal : {
                type : "error",
                text : "select a image file"
            }
        })
    }else{
        let userData = req.body;
        connection.query(`INSERT INTO register (name,fname,voterid,gender,address,pincode,city,state,pic,dob,password) VALUES ('${userData.name}','${userData.fatherName}','${userData.voterId}','${userData.gender}','${userData.address}','${userData.pincode}','${userData.city}','${userData.state}','${file.originalname}','${userData.dob}','${md5(userData.password)}')`,(err,res0)=>{
            if(err){
                console.log(err);
                res.send({
                    swal : {
                        type : "error",
                        text : "registration failed"
                    }
                })
            }else{
                res.send({
                    swal : {
                        type : "success",
                        text : "registration successful"
                    }
                })
            }
        })
 
    }
})