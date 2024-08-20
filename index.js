const express = require("express");
const app = express();
const port =8080;
app.use(express.urlencoded({extended :true})); 
const path = require("path");
const { v4 : uuidv4} = require ('uuid');
const methodOverride = require("method-override");
app.use(methodOverride('_method'));
uuidv4();
app.set("view engine" ,"ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname ,"public")));
let posts = [
   {id:uuidv4(),
    username : "apnacollege",
    content  : " i love coding "

   },
   {id : uuidv4(),
    username : "shradhdhakhapra",
    content  : " hard work is key of success"
   }, 
   {id:uuidv4(), 
    username : " rahulkumar",
    content  : " i love coding"
   },
]
app.get("/",(req,res)=>
{
    res.send("server working well");
})
app.get("/posts",(req,res)=>
{
    res.render("index.ejs",{posts});
})
app.patch("/posts/:id" ,(req,res)=>
{
     let {id} = req.params;
     let newcontent = req.body.content;
     let post = posts.find((p)=>id===p.id);
     post.content = newcontent;
     console.log(newcontent);
     console.log(id);
     res.redirect("/posts");
})
app.get("/posts/:id/edit",(req,res)=>
{
    let {id} = req.params;
    let post = posts.find((p)=> id == p.id);
    res.render("edit.ejs" ,{post});
})
app.listen(port,()=>
{console.log("app is listening on port :8080")});
app.get("/posts" ,(req,res)=>
{
    console.log(req.body);
    res.send("post req is working ");
})
app.get("/posts/new",(req,res)=>
{
    res.render("new.ejs");
})
app.get("/posts/:id" ,(req,res)=>
{
    let {id} = req.params ;
    let post =  posts.find((p)=> id === p.id);
    res.render("show.ejs" ,{post});
    console.log(id);
    res.send("request working");
})

app.delete("/posts/:id",(req,res)=>
{
    let {id} = req.params;
     posts = posts.filter((p)=>id!=p.id);
    res.redirect("/posts");
})
app.post("/posts" ,(req,res)=>
{    let id = uuidv4(); 
    let {username ,content }  = req.body;
    posts.push({ id,username,content}); 
     res.redirect("/posts");
    console.log(req.body);
})
