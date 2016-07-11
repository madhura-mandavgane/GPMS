app.controller('ListPollsController', function($scope, $location, $http, $filter, apiService, $stateParams, $rootScope) {

alert("rootscope=" + JSON.stringify($rootScope.employee));

var id=$rootScope.employee._id;
   $http({
           method: 'GET',
           url: 'http://localhost:9095/employee/' + id + "/polls",
         }).then(function successCallback(response) {
	
		 $scope.PollsList=response.data;
         alert(JSON.stringify($scope.PollsList));  		 
    }, function errorCallback(response) {
	alert('failed');
  });


$scope.DeletePoll = function(id){
    alert(id);
	$http({
           method: 'DELETE',
           url: 'http://localhost:9095/polls/' + id,
         }).then(function successCallback(response) {
		 alert('success');
		 $scope.load();
    }, function errorCallback(response) {
	alert('failed');
  });
}
});