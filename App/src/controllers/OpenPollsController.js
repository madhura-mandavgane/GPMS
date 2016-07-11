app.controller('OpenPollsController', function( $rootScope, $scope, $location, $http, $filter, apiService, $stateParams) {

alert("rootscope=" + JSON.stringify($rootScope.employee));
$scope.groups= [];

	// get all groups of this employee
	$http({
           method: 'GET',
           url: 'http://localhost:9095/employee/' + $rootScope.employee._id + '/groups'
         }).then(function successCallback(response) {

		 $scope.groups=response.data;		 
		 //alert(	"scope.groups = " + JSON.stringify($scope.groups));
		 
		 var queryString="";
	     for (var i=0; i<$scope.groups.length; i++)
    	 {
		    var j=i+1;
	        queryString +=  "g" + j + "=" + $scope.groups[i]["_id"];
	        if(i < $scope.groups.length-1)
	           queryString += "&";
	     }
	
	     //alert("querystr=" + queryString);
	     
	     $http({
             method: 'GET',
		     url: 'http://localhost:9095/open/polls/employee/' + $rootScope.employee._id + '?' + queryString
         }).then(function successCallback(response) {

		 var responseArray =response.data;
		 $scope.PollsList = responseArray;
         }, function errorCallback(response) {
	        alert('failed');
  	     });
	    
    }, function errorCallback(response) {
	alert('failed');
  	});
});