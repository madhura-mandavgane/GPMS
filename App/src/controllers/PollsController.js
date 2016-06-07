app.controller('PollsController', function($scope, $location, $http) {

$scope.go = function (hash, id) { 
alert('id=' + id);
$location.path(hash).search({'id': id});
}

$scope.List = function(id){
if($location.search())
{
   id = $location.search().id;
}
   $http({
           method: 'GET',
           url: 'http://localhost:9095/polls/' + id
         }).then(function successCallback(response) {
		 alert('success');
		 $scope.list=response.data;
		 $scope.PollID = $scope.list.id;
		 $scope.Description = $scope.list.sescription;
		 $scope.CorrectOption = $scope.list.dorrectOption;
		 $scope.StartDate = $scope.list.openingDate;
		 $scope.EndDate = $scope.list.closingDate;
		 $scope.isResultVisibleToParticipants = $scope.list.isResultVisibleToParticipants;
		 alert(response.data);
    }, function errorCallback(response) {
	alert('failed');
  });

};

$scope.ListAllPolls = function(){
   $http({
           method: 'GET',
           url: 'http://localhost:9095/polls'
         }).then(function successCallback(response) {
		 alert('success');
		 $scope.list=response.data;
		 alert(response.data);
    }, function errorCallback(response) {
	alert('failed');
  });

};

$scope.ListByEmployee = function(){
alert($scope.EmployeeID);
var id=$scope.EmployeeID;
   $http({
           method: 'GET',
           url: 'http://localhost:9095/polls/employee/' + id,
         }).then(function successCallback(response) {
		 alert('success');
		 $scope.PollsList=response.data;
    }, function errorCallback(response) {
	alert('failed');
  });

};

$scope.AddPoll = function(){

function GetAnswers() {
   var answersrange = [];
   for(var i=1 ; i<=$scope.TotalAnswers; i++) {
      var answeroption = "AnswerOption"+i;
      answersrange.push("option:" + i + ", answer:" + $scope.AnswerOption1);
   }
   
   alert(JSON.stringify(answersrange));
   return JSON.stringify(answersrange);
}

function GetGroups() {
   var groups = [];
   groups.push("groupId:" +$scope.ParticipatingGroups.id);
   alert(JSON.stringify(groups));
   return JSON.stringify(groups);
}

function Poll() {
            this.id = "2010";
			this.createdBy = "8000";
		    this.pollStatus = "0";
		    this.creationDate = "06/06/2016";
		    this.openingDate = $scope.StartDate;
		    this.closingDate = $scope.EndDate;
		    this.question = $scope.Question;
		    this.answers = GetAnswers();
		    this.correctOption = $scope.CorrectOption;
		    this.isResultVisibleToParticipants = $scope.visibility;
		    this.ParticipantGroups = GetGroups();
        }

/*
  var answersrange = [];
   for(var i=1 ; i<=$scope.TotalAnswers; i++) {
      var answeroption = "AnswerOption"+i;
      answersrange.push("option:" + i + "answer:" + $scope.("AnswerOption"+i));
   }
   alert(JSON.stringify(answeroption));
   */

   var jsondata = new Poll();
   alert(JSON.stringify(jsondata));
   $http({
           method: 'POST',
           url: 'http://localhost:9095/polls',
		   data: JSON.stringify(jsondata)
         }).then(function successCallback(response) {
		 alert('success');
		 $scope.list=response.data;
		 alert(response.data);
    }, function errorCallback(response) {
	alert('failed');
  });

};
});

