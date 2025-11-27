const express =require('express');
const productcatgRoute= express.Router();
var ProductCatg=require('../models/productcatgmodel');

//save
productcatgRoute.route
('/addproductcatg/:pcatgid/:pcatgname').
post(function(req,res){
    var productcatg=new ProductCatg({pcatgid:req.params.pcatgid,pcatgname:req.params.pcatgname});
    productcatg.save().then(productcatg=>{
        res.send('product category added successfully');
        res.end();

    }).catch(err=>{
        res.send(err);
        res.end();
    });
});

//show all product category
productcatgRoute.route
('/showproductcatg').
get(function(req,res){
    
    ProductCatg.find().then(productcatg=>{
        res.send(productcatg);
        res.end();

    }).catch(err=>{
        res.send("Data not found something went wrong");
        res.end();
    });
});
//update
productcatgRoute.route
('/updateproductcatg/:pcatgid/:pcatgname').
put(function(req,res){
   
    ProductCatg.updateOne({"pcatgid":req.params.pcatgid},{"pcatgname":req.params.pcatgname}).then(productcatg=>{
        res.send('product category update successfully');
        res.end();

    }).catch(err=>{
        res.send(err);
        res.end();
    });
});

//-----------------------------------------------------------------------------------------------------------------------------
productcatgRoute.route
('/getall').get(function(req,res){
    ProductCatg.find()
    .then(productcatg=>{
        res.send(productcatg);
        res.end();

    }).catch(err=>{
        res.send(err);
        res.end();
    });
});

//search city
productcatgRoute.route
('/search/:pcatgid').get((req,res)=>{
    ProductCatg.findOne({"pcatgid":req.params.pcatgid})
    .then(productcatg=>{
        res.send(productcatg);
        res.end();

    }).catch(err=>{
        res.send(err);
        res.end();
    });
});
//search state by name to avoid duplicate entery
productcatgRoute.route
('/searchbyname/:pcatgname').get((req,res)=>{
    ProductCatg.findOne({"pcatgname":req.params.pcatgname})
    .then(productcatg=>{
        res.send(productcatg);
        res.end();

    }).catch(err=>{
        res.send(err);
        
    });
});
//update city
productcatgRoute.route
('/update').put((req,res)=>{
    ProductCatg.updateOne({"pcatgid":req.body.pcatgid},{"pcatgid":req.body.pcatgid,"pcatgname":req.body.pcatgname})
    .then(productcatg=>{
        res.send('product updated successfully');
        res.end();

    }).catch(err=>{
        res.send(err);
        res.end();
    });
});

//delete enable or disable
productcatgRoute.route
('/delete/:pcatgid').delete((req,res)=>{
    ProductCatg.updateOne({"pcatgid":req.params.pcatgid})
    .then(productcatg=>{
        res.send('product catagery disable successfully');
        res.end();

    }).catch(err=>{
        res.send(err);
        res.end();
    });
});
//---------------------------------------------------------------------------------------------------------------------------
module.exports=productcatgRoute;