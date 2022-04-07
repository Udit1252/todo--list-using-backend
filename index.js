const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
var i="";
app.set('view engine','ejs');
mongoose.connect("mongodb://localhost:27017/todolistDB");
const itemSchema = {
    name:String
}
const Item=mongoose.model("item",itemSchema);
const item1 = new Item({
    name:"learn to code",
});
const item2 = new Item({
    name:"learn express",
});
const item3 = new Item({
    name:"sleep",
});
const d=[item1,item2,item3];

app.get('/',(req,res)=>{

    Item.find({},(err,f)=>{
        if(f.length===0){
            Item.insertMany(d,(err)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log("successfully saved items to database");
                }
            })
            res.redirect('/');
        }
        else{
            res.render("list",{newlist:f});

        }
  
    })
})
app.post('/',(req,res)=>{
     i=req.body.n;
    const item = new Item({
        name:i
    });
    item.save();
    res.redirect("/");
});
app.post('/delete',(req,res)=>{
    const id=req.body.checkbox;
    Item.findByIdAndRemove(id,(err)=>{
        if(!err)
        {
            console.log("deleted successfully");
            res.redirect('/');
        }
    })
})

app.listen(port,(req,res)=>{
    console.log("app connected at port");

})