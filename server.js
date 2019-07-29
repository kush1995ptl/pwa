var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var cors = require('cors'); // CORS Support
var fs = require('fs');
var https = require('https');
var proxy = require('http-proxy-middleware');

app.options('*', cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'public/dist/sample')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/dist/sample/index.html'));
})

// const httpsOptions = {
//     cert: fs.readFileSync(path.join(__dirname, 'ssl', 'server.crt')),
//     key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key')),
//     ca: fs.readFileSync(path.join(__dirname, 'ssl', 'ca.crt'))
// }

// https.createServer(httpsOptions, app).listen(2002, function(){
//     console.log("Serving at https://localhost:2002");
// })

// https.createServer({
//     key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key')),
//     cert: fs.readFileSync(path.join(__dirname, 'ssl', 'server.crt'))
//   }, app)
//   .listen(2002, function () {
//     console.log('Example app listening on port 2002! Go to https://localhost:2002/')
//   })

mongoose.connect('mongodb://localhost/pwa_app',{
  useMongoClient : true
})

gateways_glob = require('./models/gateways');
user_glob = require('./models/users');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Default Link
app.get('/',function(req,res){
  res.send("Welcome to PWA App Database");
})

var db = mongoose.Connection;

//login
app.post('/api/login',function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    user_glob.login(email,password,function(err, response){
        if(err){
            console.log("In error")
            console.log(error);
            throw err;
        }
        console.log("Not in error")
        res.json(response);
    })

})

// https.get('https://localhost:2002/api/gateways', res => {
//     let body = "";
//     res.on('data', data => {
//         body += data;
//     })
//     res.on('end', () => console.log(body));
// })

//get all gateways
app.get('/api/gateways',function(req,res){
    gateways_glob.getGateways(function(err,Productss){
        if(err){
            throw err;
        }
        res.json(Productss);
    });
});

//get Products By Id
app.get('/api/gateways/:_id',function(req,res){
    gateways_glob.getGatewayById(req.params._id,function(err,Gateway){
        if(err){
            throw err;
        }
        res.json(Gateway);
    });
});

//add gateway
app.post('/api/gateways',function(req,res){
    var post = req.body;
    console.log(JSON.stringify(post));
    gateways_glob.addGateway(post,function(err){
        if(err){
            throw err;
        }
        console.log("Response ::: " + JSON.stringify(res.body));
        res.json("Gateway added....!!!");
    });
});

//update gateways
app.put('/api/gateways/:_id',function(req,res){
    var id = req.params._id;
    var Product = req.body;
    gateways_glob.updateGateway(id,Product,{},function(err,gateway){
        if(err){
            throw err;
        }
        res.json(gateway);
    });
});

//delete Product
app.delete('/api/gateways/:_id',function(req,res){
    var id = req.params._id;
 
    gateways_glob.deleteGateway(id,function(err){
        if(err){
            throw err;
        }
        res.json("Gateway with id "+id+" Deleted...!!!");
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
    var user = req.body;
    user_glob.addUsers(user,function(err,user){
        if(err){
            throw err;
        }
        res.json("User added....!!!");
    });
});

//update user
app.put('/api/users/:_id',function(req,res){
	console.log("Update");
    var id = req.params._id;
    var user = req.body;
    user_glob.updateUsers(id,user,{},function(err,user){
        if(err){
            throw err;
        }
        res.json("User with id "+id+" Updated...!!!");
    });
});

//delete user
app.delete('/api/users/:_id',function(req,res){
    var id = req.params._id;
    user_glob.deleteUsers(id,function(err){
        if(err){
            throw err;
        }
        res.json("User with id "+id+" Deleted...!!!");
    });
});

//scan device
app.get('/api/scandevices', function(req, res){
    var devices = [
        {
            "id": "D101",
            "serial_no": "D_101",
            "port": "1010",
            "city": "Ahmedabad",
            "state": "Gujarat",
            "username":"pratik",
            "password":"soni",
            "ip":"192.168.1.1",
            "type":"camera"
        },
        {
            "id": "D102",
            "serial_no": "D_102",
            "port": "1011",
            "city": "Ahmedabad",
            "state": "Gujarat",
            "username":"kushal",
            "password":"patel",
            "ip":"192.168.1.2",
            "type":"Temperature Sensor"
        }
    ]
    res.json(devices);
})

app.listen(2002);
console.log("Server is running on 2002........!!!!!");