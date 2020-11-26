//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose=require("mongoose");


const homeStartingContent = "Welcome!!! You can compose and post your blogs here...";
const contactContent ="anuragdiwedi78@gmail.com";
const aboutContent="Blog Website....";

mongoose.connect("mongodb+srv://admin-anurag:20675256@cluster0.ndeft.mongodb.net/blogDB", {useNewUrlParser: true});
const postSchema={
  title:String,
  content:String
};

const Post=mongoose.model("Post",postSchema);




const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/home",function(req,res){
  res.redirect("/");
})
app.get("/compose",function(req,res){
  res.render("compose",{title:"compose"});

})

app.get("/",function(req,res){

Post.find({},function(err,foundPosts){
  if(foundPosts.length!==0)
  {
  res.render("home",{homeText:homeStartingContent,title:"Home",posts:foundPosts});
}else
{
  res.render("home1",{homeText:homeStartingContent,title:"Home",postHead:"Home"});
}
});



})


app.get("/about",function(req,res){
  res.render("about",{aboutText:aboutContent,title:"About"});
})

app.get("/contact",function(req,res){
  res.render("contact",{contactText:contactContent,title:"Contact"});
})


app.post("/compose",function(req,res){
  const post=new Post({
    title:req.body.postTitle,
    content:req.body.postContent

  });
post.save(function(err){
  if(!err){
    res.redirect("/");

  }
});
  })

app.get("/posts/:postId",function(req,res){
  var some= _.lowerCase(req.params.postName);
const requestedPostId=req.params.postId;
Post.findOne({_id: requestedPostId}, function(err, post){

   res.render("post", {

     postHead: post.title,

     postContent: post.content,

     title: "Post"

   });

 });




});




app.listen(process.env.port||3000, function() {
  console.log("Server started on port 3000");
});
