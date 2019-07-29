var mongosse_users = require('mongoose');

//posts schema

var users_schema = new mongosse_users.Schema({
  name:{
    type:String,
    required:false
  },
  email:{
    type:String,
    required:false
  },
  username:{
    type:String,
    required:false
  },
  password:{
    type:String,
    required:false
  },
  type:{
    type:String,
    required:false
  }
},{
    versionKey: false // You should be aware of the outcome after set to false
});

var user_glob = module.exports = mongosse_users.model('users',users_schema);

// login
module.exports.login = function(email, password, callback){
  user_glob.find({ $and: [ {'email':email, 'password':password } ] }, callback);
}

// Get Post Schema
module.exports.getUsers = function(callback){
  user_glob.find(callback);
}

// find post by id
module.exports.getUsersById = function(id,callback){
  user_glob.findById(id,callback);
}

// Add post
module.exports.addUsers = function(post,callback){
  user_glob.create(post,callback);
}

// Update Post
module.exports.updateUsers = function(id,user,option,callback){
  var query = {_id:id};
  var update_post = {
    name : user.name,
    email : user.email,
    username : user.username,
    password : user.password,
    type:user.type
  }
  user_glob.findOneAndUpdate(query,update_post,option,callback);
}

//delete post
module.exports.deleteUsers = function(id,callback){
  var query = {_id:id};
  user_glob.remove(query,callback)
}