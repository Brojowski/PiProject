var express = require('express')
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var io = require("socket.io").listen(app.listen(8080));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.get('/',function(req,res)
{
   res.sendFile(__dirname + "\\public\\HTML\\Login.html")
});

app.use('/public',express.static(__dirname + '/public/'));


var dataAccess = require(__dirname + "/routes/database_access.js");

io.sockets.on('connection',function(socket)
{
    console.log("Connected to " + socket.handshake.address);
    console.log("Socket id: " + socket.id);
    dataAccess.logVisitor(socket.id,socket.handshake.address);

    var login = require(__dirname + "/routes/login.js")(socket,dataAccess);

});

module.exports = app;
