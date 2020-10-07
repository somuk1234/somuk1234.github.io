var express=require('express');
var bodyParser=require('body-parser');
var path=require('path');
var app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/page.html'));
});
app.listen(9000,function(){
 console.log("Expess app running on port number 9000....");
});
module.exports=app;