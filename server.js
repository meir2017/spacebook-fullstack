var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const SERVER_PORT = 8710;

mongoose.connect('mongodb://localhost/spacebookDB', function() {
  console.log("DB connection established!!!");
})

var Post = require('./models/postModel');

var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// You will need to create 5 server routes
// These will define your API:

// 1) to handle getting all posts and their comments

app.get('/posts', function(request, response){
  Post.find(function(err,data){
    response.send(data);
  })
});
// 2) to handle adding a post
app.post('/addPost', function(request, response){
  console.log(request.body.thePost)
  post_1=new Post({
    text: request.body.thePost,
    comments: []
  })
  post_1.save(function(err,post){
    response.send(post.id);
  })

});
// 3) to handle deleting a post
app.post('/deletePost',function(request, response){
  Post.findOne({_id:request.body.idPost},function(err,reslt){
     reslt.remove();
     reslt.save(response.send("remove Post "+request.body.idPost));
  })
})
// 4) to handle adding a comment to a post
app.post('/AddComment',function(request, response){
  Post.findOne({_id:request.body.idPost},function(err,reslt){
    newComment={
      text:request.body.userName,
      user:request.body.commentText
    }
    var tempArryComment= reslt.comments;

    tempArryComment.push(newComment)
    reslt.comments=tempArryComment;
     reslt.save(function(err,comment){
      response.send(comment.id);
    });
  })
})

// 5) to handle deleting a comment from a post
app.post('/RemoveComment',function(request, response){
  Post.findOne({_id:request.body.idPost},function(err,reslt){

    // var tempArryComment= reslt.comments;
    // tempArryComment.splice(request.body.index, 1);
    // reslt.comments=tempArryComment;
    
    reslt.comments.splice(request.body.index, 1);
    reslt.save(response.send("remove Post "));

  })
})


app.listen(SERVER_PORT, () => {
  console.log("Server started on port " + SERVER_PORT);
});
