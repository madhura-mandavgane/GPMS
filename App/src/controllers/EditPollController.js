app.controller('EditPollController', function($scope, $location, $http, $filter, apiService, $stateParams, $rootScope) {
//$stateParams.id
$scope.answers = [];
$scope.answersCount = [];
$scope.correctAnswer = [];

alert("rootscope=" + JSON.stringify($rootScope.employee));

$scope.totalAnswerChanged = function(){
	var count = parseInt($scope.TotalAnswers);
	$scope.answersCount = [];
	for(i=0; i<count;i++){
		$scope.answersCount[i] = i;
	}
}

$scope.UpdatePoll = function() {
	$http({
           method: 'PUT',
		   data: JSON.stringify($scope.Poll),
           url: 'http://localhost:9095/polls/' + $scope.PollsList[0]["_id"]
         }).then(function successCallback(response) {

		 $scope.PollsList=response.data;
    }, function errorCallback(response) {
	alert('failed');
  	});
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
		 //alert('success');
		 $scope.groupList=response.data;
		 //alert("grouplist=" + JSON.stringify($scope.groupList) );
	     }, function errorCallback(response) {
	alert('failed');
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

