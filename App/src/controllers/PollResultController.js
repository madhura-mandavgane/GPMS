app.controller('PollResultController', function($scope, $location, $http, $filter, apiService, $stateParams) {
$scope.answers=[];
$scope.answerObj = [];
$scope.Poll={};

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
		 for(var i=0; i<$scope.answers.length; i++)
		 {
            $scope.answerObj.push({ans:$scope.answers[i].ans,
                   			optionNo:$scope.answers[i].optionNo,
  							correct:$scope.answers[i].correct,
							answeredCount:$scope.answers[i].answeredCount});		 
 		 }
		 
		 $scope.Pollid = $scope.PollsList[0]["_id"];
		 alert(JSON.stringify($scope.PollsList));
		 $stateParams.id = 0;
    }, function errorCallback(response) {
	alert('failed');
  	});
};
});