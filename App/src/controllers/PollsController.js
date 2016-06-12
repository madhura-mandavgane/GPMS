app.controller('PollsController', function($scope, $location, $http, $filter) {

$scope.go = function (hash, id) { 
alert('id=' + id);
$location.path(hash).search({'id': id});
}

$scope.List = function(id){

function GetGroups() {
   var groups = [];
   groups.push("groupId:" +$scope.ParticipatingGroups.id);
   alert(JSON.stringify(groups));
   return JSON.stringify(groups);
}

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
		 $scope.Description = $scope.list.description;
		 $scope.CorrectOption = $scope.list.correctOption;
		 $scope.StartDate = new Date($scope.list.openingDate);
		 $scope.EndDate = new Date($scope.list.closingDate);
		 $scope.isResultVisibleToParticipants = $scope.list.isResultVisibleToParticipants;
		 $scope.pollStatus = $scope.list.pollStatus;
         $scope.groups = GetGroups(); 
		 alert(JSON.stringify(response.data));
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
		// $scope.Duration=response.data.closingDate - response.data.openingDate; 
    }, function errorCallback(response) {
	alert('failed');
  });

};
$scope.UpdatePoll = function() {
};
$scope.AddPoll = function(){

function GetAnswers() {
   var answersrange = [];
   for(var i=1 ; i<=$scope.TotalAnswers; i++) {
		
	  var answer = {
	     "option" : i,
		 "answer" : $scope.AnswerOption+''+1
	  };	  
      answersrange.push(answer);
   }
   
   alert(answersrange);
   return answersrange;
}

function GetGroups() {
   var groups = [];
    var group = {
	     "groupId" : $scope.ParticipatingGroups.id
    };
   groups.push(group);
   alert(groups);
   return groups;
}

function Poll() {
            this.Description = $scope.Description;
			this.createdBy = "8000";
		    this.pollStatus = "0";
		    this.creationDate = $filter('date')(new Date(), "yyyy-MM-dd");
		    this.openingDate  = $filter('date')(new Date($scope.StartDate), "yyyy-MM-dd");
		    this.closingDate  = $filter('date')(new Date($scope.EndDate), "yyyy-MM-dd");
		    this.question = $scope.Question;
		    this.answers = GetAnswers();
		    this.correctOption = $scope.CorrectOption;
			if($scope.visibility == "Public")
		       this.isResultVisibleToParticipants = "1";
			else
			   this.isResultVisibleToParticipants = "0";
		    this.ParticipantGroups = GetGroups();
        }

   var jsondata = new Poll();
   alert(JSON.stringify(jsondata));
   $http({
           method: 'POST',
           url: 'http://localhost:9095/polls',
		   data: JSON.stringify(jsondata)
         }).then(function successCallback(response) {
		 alert('success');
		 $scope.list=response.data;
		 alert(response.data._id);
    }, function errorCallback(response) {
	alert('failed');
  });
};
});

