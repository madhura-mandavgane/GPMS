var express = require('express');
var cors = require('cors');
var bodyParser = require("body-parser");
var http = require('http');
var path = require('path');

var employees  = require('./API/routes/employees');
var groups     = require('./API/routes/groups');
var polls      = require('./API/routes/polls');

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

app.post('/polls',              polls.Add);
app.get ('/polls',              polls.ListAll);
app.get ('/polls/:id',          polls.List);
app.get ('/employee/:id/polls', polls.ListByEmployee);
//app.get ('/employee/:id/open/polls',         polls.ListOpenPollsForUser);
app.get ('/open/polls/employee/:id', polls.ListOpenPollsForUser);
app.put ('/polls/:id/answer',          polls.UpdateAnswer);
app.put ('/polls/:id',          polls.Update);
app.delete('/polls/:id',        polls.Delete);

app.get ('/groups',             groups.ListAll);
app.post('/groups',             groups.createNewGroup);
app.post('/group/employees',    groups.getEmployeesForGroup);
app.post('/groupAvailability',  groups.groupAvailable);
app.get('/employee/:id/groups', groups.GetGroupsOfEmployee);

app.get ('/employees',          employees.getAllEmployees);
app.post('/employee',           employees.getEmployeesById);
app.post('/employee/login',     employees.login);
