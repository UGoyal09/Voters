const express = require('express');
const router = express.Router();
const sql = require('mysql');
const md5 = require('md5');
const multer = require('multer');
const registration = require('./registrations');


// let storage = multer.diskStorage({
//     destination : (req,file,cb)=>{
//         cb(null,'public/userImages');
//     },
//     filename : (req,file,cb)=>{

//              cb(null,file.originalname);
//     }
// });
// let upload = multer({storage : storage});

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
router.use('',registration);
// router.post('/register',upload.single('pic'),(req,res)=>{
//     let file = req.file;
//     if(!file){
//         res.send({
//             swal : {
//                 type : "error",
//                 text : "select a image file"
//             }
//         })
//     }else{
//         let userData = req.body;
//         connection.query(`INSERT INTO register (name,fname,voterid,gender,address,pincode,city,state,pic,dob,password) VALUES ('${userData.name}','${userData.fatherName}','${userData.voterId}','${userData.gender}','${userData.address}','${userData.pincode}','${userData.city}','${userData.state}','${file.originalname}','${userData.dob}','${md5(userData.password)}')`,(err,res0)=>{
//             if(err){
//                 console.log(err);
//                 res.send({
//                     swal : {
//                         type : "error",
//                         text : "registration failed"
//                     }
//                 })
//             }else{
//                 res.send({
//                     swal : {
//                         type : "success",
//                         text : "registration successful"
//                     }
//                 })
//             }
//         })
 
//     }
// })

router.post('/login',(req,res)=>{
    let logDetails = req.body;
    console.log(logDetails)
    if(logDetails.username == '' || logDetails.password == ''){
        res.send({
            type : false,
            text : 'username or password is incorrect'
        })
    }else{

        connection.query(`SELECT voterid,password FROM register WHERE voterid='${logDetails.username}' && password='${md5(logDetails.password)}'`,(err,res0)=>{
            if(err){
            console.log(err);
            res.send({
                type : false,
                text : 'username or password is incorrect'
            })
        }else{
            if(logDetails.username == res0[0].voterid && md5(logDetails.password) == res0[0].password){
                let sess = req.session;
                sess['voterid'] = res0[0].voterid;
                res.send({type : true});
            }else{
                res.send({
                    type : false,
                    text : 'username or password is incorrect'
                })
            }
        }
    })
}

})

router.get('/details',(req,res)=>{
    let sess = req.session;
    let id = sess.voterid;
    connection.query(`SELECT * FROM register WHERE voterid= '${id}'`,(err,res1)=>{
        if(err){
            console.log(err);
        }else{
            res.send(res1);
        }
    })
})

router.get('/sessCheck',(req,res)=>{
    let sess = req.session;
    if(sess.id){
        res.send({
        type : true
    })
    }else{
        res.send({type : false})
    }
})

module.exports = router ;