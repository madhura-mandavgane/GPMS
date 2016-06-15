var pollConfig ={
	url:"http://localhost:9095/",
	ajaxTimeout:5000
};
var app = angular.module('GroupPollManagementSystem',['ui.router','checklist-model']);
app.constant('pollConfig',pollConfig);