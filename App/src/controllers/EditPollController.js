app.controller('EditPollController', function($scope, $location, $http, $filter, apiService, $stateParams) {
//$stateParams.id
$scope.answers = [];
$scope.answersCount = [];
$scope.correctAnswer = [];


$scope.totalAnswerChanged = function(){
	var count = parseInt($scope.TotalAnswers);
	$scope.answersCount = [];
	for(i=0; i<count;i++){
		$scope.answersCount[i] = i;
	}
}

apiService.apiCalltoServer('Groups','GET').then(function(response)
{
    $scope.groupList = response.data;
});

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

    });
});

