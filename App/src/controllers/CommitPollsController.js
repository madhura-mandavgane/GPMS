app.controller('CommitPollsController', function($scope, $location, $http, $filter, apiService, $stateParams) {

if($stateParams.id){
	$http({
           method: 'GET',
           url: 'http://localhost:9095/polls/' + $stateParams.id
         }).then(function successCallback(response) {
		 alert('success');
		 $scope.Poll=response.data;
		 alert(JSON.stringify($scope.Poll));
		 $stateParams.id = 0;
    }, function errorCallback(response) {
	alert('failed');
  	});
};

$scope.answers=[];


$scope.CommitPoll = function() {

	for(var i=0 ; i<$scope.answers.length; i++) {
	    alert($scope.answers[i]);
	    if ($scope.answers[i]) {
		      
		}
	}
	/*
    if($scope.operation == 'commit')
	{
       $scope.answerChecked
	   
	   $http({
           method: 'PUT',
           url: 'http://localhost:9095/polls/' + $scope.poll_id
         }).then(function successCallback(response) {

		 $scope.PollsList=response.data;
    }, function errorCallback(response) {
	alert('failed');
  	});
	}*/
};
});