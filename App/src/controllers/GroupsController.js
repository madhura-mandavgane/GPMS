app.controller('GroupsController', function($scope,$http,$state,apiService) {

apiService.apiCalltoServer('Groups','GET').then(function(response)
{
    $scope.groupList = response.data.groups;
});

apiService.apiCalltoServer('Employess','GET').then(function(response)
{
    //	$scope.employees = response.data.employees;
});

$scope.deleteRecord = function(groupId)
{
    
      apiService.apiCalltoServer('Groups/'+groupId,'DELETE').then(function(response)
        {
            alert("Deleted");
        });
}

	/*$http({
		method : "GET",
		url : "http://10.44.67.84:8081/Groups"
		}).then(function successCall(response){
			$scope.groupList = response.data.groups;
		}, function failureCall(response){
			alert($scope.list);
		});*/
});