var express = require('express');
var bodyParser = require('body-parser')
var DataStorage = require("./DataStorage");
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = 3000;
var dataStorage = new DataStorage("todoItems.json");

app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});

server.listen(port);