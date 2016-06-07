var express = require('express');
var cors = require('cors');
var bodyParser = require("body-parser");
var http = require('http');
var path = require('path');

var groups = require('./API/routes/groups');
var polls  = require('./API/routes/polls');

var app = express();

//Handles post requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'App')));

// Configure our HTTP server to respond with Hello World to all requests.

http.createServer(app).listen(9095, function () {
    console.log("Express server listening on port 9095");
});

app.get('/', function(req, res)
{
    res.sendFile(path.join(__dirname + '/index.html'));
}
);
app.post('/groups',         groups.Add);
app.get ('/groups',         groups.ListAll);
app.get ('/groups/:id',     groups.List);
app.put ('/groups/:id',     groups.Update);
app.delete('/groups/:id',   groups.Delete);

app.post('/polls',         polls.Add);
app.get ('/polls',         polls.ListAll);
app.get ('/polls/:id',     polls.List);
app.get ('/polls/employee/:id',  polls.ListByEmployee);
app.put ('/polls/:id',     polls.Update);
app.delete('/polls/:id',   polls.Delete);
