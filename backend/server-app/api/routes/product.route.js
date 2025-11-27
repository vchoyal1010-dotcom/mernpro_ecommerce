const express=require('express');
const productRoute=express.Router();
let Product=require('../models/product.model');
const multer=require('multer');

//save Product
productRoute.route('/saveproduct').post((req,res)=>{
    let product=new Product(req.body);
    console.log(product)
    product.save().then(product=>{
        res.send('product added successfully');
        res.end();
    }).catch(err=>{
        res.send(err);
        res.end();
    });
});

//get product all
productRoute.route
('/showproduct').get(function(req,res){
    Product.find().then(product=>{
        console.log(product);
        res.send(product);
        res.end();
    }).catch(err=>{
        res.status(400).send("Data not found something went wrong");
    });
});

//get product all
productRoute.route('/showproductstatus/:pid').get(function(req,res){
    Product.findOne({"pid":req.params.pid}).then(product=>{
        console.log(product);
        res.send(product);
        res.end();
    }).catch(err=>{
        res.status(400).send("Data not found something went wrong");
    });
});

//get product count for id
productRoute.route('/getmaxpid').get(function(req,res){
    Product.find().then(product=>{
        console.log(product);
        res.send(product);
        res.end();
    }).catch(err=>{
        res.status(400).send("Data not found something went wrong");
    });
});

//save product image
const stv=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"C:/Users/vaishali choyal/Desktop/THOUGHT__BOX/backend/server-app/api/routes/productimage/")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    },
})

const upload=multer({storage:stv});
productRoute.post('/saveproductimage',upload.single('file'),(req,res)=>{
    res.send("upload success");
    res.end();
});

//get product image
productRoute.route('/getproductimage/:picname').get((req,res)=>{
    res.sendFile("C:/Users/vaishali choyal/Desktop/THOUGHT__BOX/backend/server-app/api/routes/productimage/"+req.params.picname);
});

//get product by vender
productRoute.route('/showproductbyvender/:vid').get(function(req,res){
    Product.find({"vid":req.params.vid}).then(product=>{
        console.log(product);
        res.send(product);
        res.end();
    }).catch(err=>{
        res.status(400).send("Data not found something went wrong");
    });
});

//get product by categary
productRoute.route('/showproductbycatgid/:pcatgid').get(function(req,res){
 Product.find({"pcatgid":req.params.pcatgid})
 .then(product=>{
    console.log(product);
    res.send(product);
    res.end();
 }).catch(err=>{
    res.send(err);
 });
});



//update state
productRoute.route('/updateproductstatus/:pid/:status').put((req,res)=>{
    Product.updateOne({"pid":req.params.pid},{"status":req.params.status}).then(state=>{
        res.send('product status updated successfully');
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });
});

module.exports=productRoute;