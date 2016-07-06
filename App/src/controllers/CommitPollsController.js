app.controller('CommitPollsController', function($scope, $location, $http, $filter, apiService, $stateParams, $rootScope) {
$scope.answers=[];
$scope.answerObj = [];
$scope.Poll={};

alert("rootscope=" + JSON.stringify($rootScope.employee));

if($stateParams.id){
	$http({
           method: 'GET',
           url: 'http://localhost:9095/polls/' + $stateParams.id
         }).then(function successCallback(response) {
		 $scope.PollsList=response.data;
		 $scope.Description = $scope.PollsList[0]["description"];
		 $scope.Question = $scope.PollsList[0]["question"];
		 
		 $scope.answers = $scope.PollsList[0]["answers"];
         $scope.Poll = $scope.PollsList[0];   
		 $scope.answerObj = $scope.answers;
		 /*
		 for(var i=0; i<$scope.answers.length; i++)
		 {
            $scope.answerObj.push({ans:$scope.answers[i].ans,
                   			optionNo:$scope.answers[i].optionNo,
  							correct:$scope.answers[i].correct,
							answeredCount:$scope.answers[i].answeredCount});		 
 		 }
		 */
		 $scope.Pollid = $scope.PollsList[0]["_id"];
		 alert(JSON.stringify($scope.PollsList));
		 $stateParams.id = 0;
		 $scope.answers =[];
    }, function errorCallback(response) {
	alert('failed');
  	});
};

$scope.CommitPoll = function() {
 
    alert(JSON.stringify($scope.answerObj));
/*
	for(var i=0; i<$scope.answerObj; i++)
	{
	   alert($scope.answerObj[i]["answer"]);
	   if($scope.answerObj[i]["answer"] == $scope.answers[0])
	   {
	      alert($scope.answerObj[i]["answer"]);
		  var count =  parseInt($scope.answerObj[i]["answeredCount"]);
		  $scope.answerObj[i]["answeredCount"] = count + 1;
	   }
	}

	alert(JSON.stringify($scope.answerObj));
	
    $scope.Poll.answers = $scope.answerObj;
	alert(JSON.stringify($scope.answers));
	
    alert(JSON.stringify($scope.Poll));
   
	$http({
           method: 'PUT',
		   data: JSON.stringify($scope.Poll),
           url: 'http://localhost:9095/polls/' + $scope.Pollid
         }).then(function successCallback(response) {

		 $scope.PollsList=response.data;
    }, function errorCallback(response) {
	alert('failed');
  	});
	*/
};
});