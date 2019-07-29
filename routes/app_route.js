'use strict';
module.exports = function(app) {

// Default Link
app.get('/',function(req,res){
  res.send("Welcome to Api-tool");
})

//get all posts
app.get('/api/posts',function(req,res){
    posts_glob.getPosts(function(err,posts){
        if(err){
            throw err;
        }
        res.json(posts);
    });
});

//get Posts By Id
app.get('/api/posts/:_id',function(req,res){
    posts_glob.getPostById(req.params._id,function(err,post){
        if(err){
            throw err;
        }
        res.json(post);
    });
});

//add Post
app.post('/api/posts',function(req,res){
    var post = req.body;
    console.log(post);
    posts_glob.addPost(post,function(err,post){
        if(err){
            throw err;
        }
        res.json("Post Information is Uploaded....!!!");
    });
});

//update Post
app.put('/api/posts/:_id',function(req,res){
    var id = req.params._id;
    var post = req.body;
    posts_glob.updatePost(id,post,{},function(err,post){
        if(err){
            throw err;
        }
        res.json("Post with id "+id+" Updated...!!!");
    });
});

//delete Post
app.delete('/api/posts/:_id',function(req,res){
    var id = req.params._id;
 
    posts_glob.deletePost(id,function(err){
        if(err){
            throw err;
        }
        res.json("Post with id "+id+" Deleted...!!!");
    });
});

//get all users
app.get('/api/users',function(req,res){
    user_glob.getUsers(function(err,users){
        if(err){
            throw err;
        }
        res.json(users);
    });
});

//get user By Id
app.get('/api/users/:_id',function(req,res){
    user_glob.getUsersById(req.params._id,function(err,user){
        if(err){
            throw err;
        }
        res.json(user);
    });
});

//add user
app.post('/api/users',function(req,res){
    var user1 = req.body;
	console.log(user1);
    user_glob.addUsers(user,function(err,user){
        if(err){
            throw err;
        }
        res.json("Manufacturer Information is Uploaded....!!!"+user);
    });
});
app.post('/api/posts',function(req,res){
    var post = req.body;
    console.log(post);
    posts_glob.addPost(post,function(err,post){
        if(err){
            throw err;
        }
        res.json("Post Information is Uploaded....!!!");
    });
});
//update user
app.put('/api/users/:_id',function(req,res){
    var id = req.params._id;
    var user = req.body;
    user_glob.updateUsers(id,user,{},function(err,user){
        if(err){
            throw err;
        }
        res.json("Manufacturer with id "+id+" Updated...!!!");
    });
});

//delete user
app.delete('/api/users/:_id',function(req,res){
    var id = req.params._id;
    user_glob.deleteUsers(id,function(err){
        if(err){
            throw err;
        }
        res.json("Manufacturer with id "+id+" Deleted...!!!");
    });
});

}