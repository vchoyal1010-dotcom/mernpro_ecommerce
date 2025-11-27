const express=require("express");
const customerRoute=express.Router();
const bodyparser=require("body-parser");
const Customer=require("../models/customer.model");

var fs=require("fs");
const multer=require('multer');
const nodemailer=require("nodemailer");


function sendGMail(mailto)
{
    console.log("mail:-"+mailto);

    res.status(200).json({response:"Mail Sent"});

    const transporter=nodemailer.createTransport({
        service:"gmail",
        port:465,
        secure:true,
        auth:{
            user:"bsmernwala@gmail.com",
            pass:"necc umnw wnpi bmzy",
        },
    });
      //console.log(req.body.email);
    const mailOptions={
        from:"bsmernwala@gmail.com",
        to:mailto,
        subject:"Registration Success",
        text:"Dear Customer, Your Registeration is successfully done but it is in under Admin Review after Admin Confirmation You Can Login",
    };

    transporter.sendMail(mailOptions,(error,info)=>{
        if(error)
        {
            console.error("Error sending email:",error);
        }
        else{
            console.log("Email sent:",info.response);
        }
    });

}

//customer registration code

customerRoute.route("/register").post((req,res)=>{
    var customer=new Customer(req.body);
    customer.save().then(customer=>{
        if(customer!=null)
        {
            //sendGMail(req.body.CEmail);
            res.send("Registration Successfull");
            res.end();
        }
        else{
            res.send("Registration Failled");
            res.end();
        }
    }).catch(err=>{
        res.send(err);
        res.end();
    });
});

//login

customerRoute.route("/login").post((req,res)=>{
    var id=req.body.CUserId;
    var pass=req.body.CUserPass;
    Customer.findOne({$and:[{"CUserId":id},{"CUserPass":pass}]}).then(customer=>{
        res.send(customer);
        res.end();

    }).catch(err=>{
        res.send("something went wrong");
        res.end();
    })
})
//get image
customerRoute.route
('/getimage/:cpicname').get((req,res)=>{
    res.sendFile("C:/Users/vaishali choyal/Desktop/THOUGHT__BOX/backend/server-app/api/routes/customerimage/"+req.params.cpicname);
});
//image save

const st= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"C:/Users/vaishali choyal/Desktop/THOUGHT__BOX/backend/server-app/api/routes/customerimage/")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    },
})

const upload=multer({storage:st});

customerRoute.post('/savecustomerimage',upload.single('file'),(req,res)=>{
    res.json({})
})

//get customer for count
customerRoute.route("/getcustomercount").get((req,res)=>{
    Customer.find().then(customer=>{
        res.send(customer);
        res.end();
    }).catch(err=>{
        res.send("something went erong");
        res.end();
    })
});

//get customer details by id

customerRoute.route("/getcustomerdetails/:cid").get((req,res)=>{
    var id=req.params.cid;
    Customer.findOne({"CId":id}).then(customer=>{
        console.log(customer);
        res.send(customer);
        res.end();
    }).catch(err=>{
        res.send("something went wrong");
        res.end();
    })
})

//get customer List
customerRoute.route("/getcustomerlist").get((req,res)=>{
    var id=req.params.cid;
    Customer.find().then(customer=>{
        console.log(customer);
        res.send(customer);
        res.end();
    }).catch(err=>{
        res.send("something went wrong");
        res.end();
    })
});

//enable disable vender by admin
customerRoute.route
('/customermanage/:cid/:status').put((req,res)=>{
    Customer.updateOne({"CId":req.params.cid},{"Status":req.params.status}).then(vender=>{
        res.send('Customer status updated successfully');
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });
});
module.exports=customerRoute;