const express=require("express");
const venderRoute=express.Router();
const bodyParser=require("body-parser");
const Vender=require('../models/Vendermodel');
var fs=require("fs");
const multer=require('multer');

//vender registration code 
venderRoute.route("/register").post((req,res)=>{
    var vender=new Vender(req.body);
    vender.save().then(vender=>{
        if(vender!=null)
        {
            res.send("Registration Successfull");
        }
        else{
            res.send("Registration Failled");
        }
    }).catch(err=>{
        res.status(400).send("Registration failled");

    });
})

//login 
venderRoute.route("/login").post((req,res)=>{
    var id=req.body.vuid;
    var pass=req.body.vupass;
    console.log("userid="+id+"password="+pass);
    Vender.findOne({$and:[{"VUserId":id},{"VUserPass":pass}]}).then(vender=>{
        res.send(vender);
        res.end();
    }).catch(err=>{
        res.send("something went wrong");
        res.end();
    })
})

//get image
venderRoute.route
('/getimage/:vpicname').get((req,res)=>{
    res.sendFile("C:/Users/vaishali choyal/Desktop/THOUGHT__BOX/backend/server-app/api/routes/venderimage/"+req.params.vpicname);
});

//image save
const st=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'C:/Users/vaishali choyal/Desktop/THOUGHT__BOX/backend/server-app/api/routes/venderimage/')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    },
})
const upload=multer({storage:st});

venderRoute.post('/savevenderimage',upload.single('file'),(req,res)=>{       //savevenderimage
    res.json({})
})

//get vender for count

venderRoute.route("/getvendercount").get((req,res)=>{
    Vender.find().then(vender=>{
        res.send(vender);
        res.end();
    }).catch(err=>{
        res.send("somthing went wrong");
        res.end();
    })
})

//enable disable vender by admin
venderRoute.route('/vendermanage/:vid/:status').put((req,res)=>{
    Vender.updateOne({"VId":req.params.vid},{"Status":req.params.status}).then(vender=>{
        res.send('Vender Status Updated successfully');
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });
});
module.exports=venderRoute;
