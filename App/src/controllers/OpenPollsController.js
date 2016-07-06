app.controller('OpenPollsController', function($scope, $location, $http, $filter, apiService, $stateParams, $rootScope) {

$scope.operation = $stateParams.operation;
$scope.id        = $stateParams.id;
alert("rootscope=" + JSON.stringify($rootScope.employee));

$scope.ListPolls = function() {
    alert($scope.operation);
    if($scope.operation == 'TakeSurvey')
	{
	   $http({
           method: 'GET',
           url: 'http://localhost:9095/employee/' + $scope.id + '/open/polls'  
         }).then(function successCallback(response) {

		 $scope.PollsList=response.data;
    }, function errorCallback(response) {
	alert('failed');
  	});
	}
};
});