var mongosse_gateway = require('mongoose');

//gateways schema

var gateway_schema = new mongosse_gateway.Schema({
  name:{
    type:String,
    required:true
  },
  serial_no:{
    type:String,
    required:true
  },
  street1:{
    type:String,
    required:true
  },
  street2:{
    type:String,
    required:true
  },
  city:{
    type:String,
    required:true
  },
  state:{
    type:String,
    required:true
  },
  pin_code:{
    type:Number,
    required:true
  },
  type:{
    type:String,
    required:true
  },
  model:{
    type:String,
    required:true
  },
  username:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  port:{
    type:Number,
    required:true
  },
  connected_devices:{
    type:Array
  }
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

var gateway_glob = module.exports = mongosse_gateway.model('gateways',gateway_schema);

// Get all gateways
module.exports.getGateways = function(callback){
  gateway_glob.find(callback);
}

// find gateway by id
module.exports.getGatewayById = function(id,callback){
  gateway_glob.findById(id,callback);
}

// Add gateway
module.exports.addGateway = function(Gateway,callback){
    console.log("into add gateway");
    console.log(JSON.stringify(Gateway));
    gateway_glob.create(Gateway,callback);
}

// Update gateway
module.exports.updateGateway = function(id,Gateway,option,callback){
  var query = {_id:id};
  var update_product = {
    name : Gateway.name,
    serial_no : Gateway.serial_no,
    street1 : Gateway.street1,
    street2 : Gateway.street2,
    city : Gateway.city,
    state : Gateway.state,
    pin_code : Gateway.pin_code,
    type : Gateway.type,
    model : Gateway.model,
    username : Gateway.username,
    password : Gateway.password,
    port : Gateway.port
  }
  gateway_glob.findOneAndUpdate(query,update_product,option,callback);
}

//delete gateway
module.exports.deleteGateway = function(id,callback){
  var query = {_id:id};
  gateway_glob.remove(query,callback)
}