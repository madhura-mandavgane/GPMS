app.controller('GroupsController', function($scope,$http) {

$scope.ListGroups = function(){
   $http({
           method: 'GET',
           url: 'http://localhost:9095/groups'
         }).then(function successCallback(response) {
		 alert('success');
		 $scope.list=response.data;
		 alert(response.data);
    }, function errorCallback(response) {
	alert('failed');
  });

}});

