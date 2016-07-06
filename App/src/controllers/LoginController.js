app.controller('LoginController', function($scope,$http,$state,apiService,$rootScope, $stateParams) {
$scope.operation = $stateParams.operation;

    $scope.login = function ()
    {
	    if($scope.operation == "logout")
		{
		    alert("inside logout");
		    $rootScope.employee = {};
			$rootScope.loggedin = false;
			$rootScope.toState = "/login";
            $state.go("login");
		}
		else {
		    var data = {
               'username':$scope.username,
               'password':$scope.password
            }
		    alert(JSON.stringify(data));
		    $http({
            method: 'POST',
		    data:data,
            url: 'http://localhost:9095/employee/login'
            }).then(function successCallback(response) {
		        $rootScope.employee = response.data;
			    $rootScope.loggedin = true;
			    alert($rootScope.employee);
			    $rootScope.toState = "/groups";
                $state.go("master.groups");
            }, function errorCallback(response) {
		        console.log(err);
	            alert('failed');
  	        });
        }
	}
});
