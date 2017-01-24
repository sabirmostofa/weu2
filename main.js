var express = require('express');
var bodyParser = require('body-parser')
var DataStorage = require("./DataStorage");
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = 3000;
var dataStorage = new DataStorage("todoItems.json");
var fs = require("fs");

app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));

//app.get('/', (req, res) = > {
//    res.sendFile(__dirname + '/client/index.html');
//});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});



//api

app.get('/api/technologies', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "technologies.json", 'utf8', function (err, data) {
        techs = JSON.parse(data);

        res.end(JSON.stringify(techs));
    });
});

app.get('/api/fluids', function (req, res) {
    // First read existing users.
    if (req.query.fluidType == "liquid") {
        fs.readFile(__dirname + "/" + "liquid.json", 'utf8', function (err, data) {
            liquids = JSON.parse(data);

            res.end(JSON.stringify(liquids));
        });
    } else if (req.query.fluidType == "gas") {
        fs.readFile(__dirname + "/" + "gas.json", 'utf8', function (err, data) {
            gases = JSON.parse(data);

            res.end(JSON.stringify(gases));
        });

    }
});


server.listen(port);