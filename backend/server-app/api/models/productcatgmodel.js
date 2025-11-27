var mongoose=require('mongoose');
//mongoose library used to provide mongodb schema class to manage structure of data for database.

const Schema=mongoose.Schema;
//Schema named class provides information about data types.
//productCatg is object and used to define files /columns of database with datatypes.

var ProductCatg=new Schema({
    pcatgid:{type:Number},  //integer like 1,2,3,
    pcatgname:{type:String} //text amit indore,india,electronics,
},
{
    collection:'productcatg'
});
module.exports=mongoose.model('ProductCatg',ProductCatg);