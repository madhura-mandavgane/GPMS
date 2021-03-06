app.controller('PollsController', function($scope, $location, $http, $filter, apiService, $stateParams, $rootScope) {
//$stateParams.id
$scope.answers = [];
$scope.answersCount = [];
$scope.correctAnswer = [];

alert("rootscope=" + JSON.stringify($rootScope.employee));

$scope.go = function (hash, id) { 
//alert('id=' + id);
$location.path(hash).search({'id': id});
}

$scope.totalAnswerChanged = function(){
	var count = parseInt($scope.TotalAnswers);
	$scope.answersCount = [];
	for(i=0; i<count;i++){
		$scope.answersCount[i] = i;
	}
}
/*
apiService.apiCalltoServer('Groups','GET').then(function(response)
{
    $scope.groupList = response.data;
});
*/
$http({
           method: 'GET',
           url: 'http://localhost:9095/groups',
         }).then(function successCallback(response) {
		 alert('success');
		 $scope.PollsList=response.data;
    
	     alert("stateparam.id=" + $stateParams.id);
	     if($stateParams.id)
		 {
	       $http({
              method: 'GET',
              url: 'http://localhost:9095/polls/' + $stateParams.id
            }).then(function successCallback(response) {

            $scope.PollsList   =response.data;
		    $scope.Description = $scope.PollsList[0]["description"];
		    $scope.Question    = $scope.PollsList[0]["question"];		 
		    $scope.answers     = $scope.PollsList[0]["answers"];

            $scope.StartDate   = new Date($scope.PollsList[0]["openingDate"]);
		    $scope.EndDate     = new Date($scope.PollsList[0]["closingDate"]);
		    $scope.isResultVisibleToParticipants = $scope.PollsList[0]["isResultVisibleToParticipants"];
            $scope.pollStatus = $scope.PollsList[0]["pollStatus"];
            $scope.ParticipatingGroups = $scope.PollsList[0]["ParticipantGroups"];

            $scope.Poll = $scope.PollsList[0];   
	    	for(var i=0; i<$scope.answers.length; i++)
		    {
               $scope.answerObj.push({ans:$scope.answers[i].ans,
                             		   optionNo:$scope.answers[i].optionNo,
  				                       correct:$scope.answers[i].correct,
			                           answeredCount:$scope.answers[i].answeredCount
								   });		 
 		    }
		
		    $stateParams.id = 0;
         }, function errorCallback(response) {
	        alert('failed');
  	     });
		}
    }, function errorCallback(response) {
	alert('failed');
  });


$scope.ListAllPolls = function(){
   $http({
           method: 'GET',
           url: 'http://localhost:9095/polls'
         }).then(function successCallback(response) {
		 //alert('success');
		 $scope.list=response.data;
		 alert(response.data);
    }, function errorCallback(response) {
	alert('failed');
  });

};

$scope.ListByEmployee = function(){
//var id=$scope.EmployeeID;
var id=$rootScope.employee._id;
   $http({
           method: 'GET',
           url: 'http://localhost:9095/employee/' + id + "/polls",
         }).then(function successCallback(response) {
		 alert('success');
		 $scope.PollsList=response.data;		
    }, function errorCallback(response) {
	alert('failed');
  });

};

});

