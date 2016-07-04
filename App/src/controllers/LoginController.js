app.controller('LoginController', ['$scope','$http','$state','apiService',function($scope,$http,$state,apiService) {
    
  /*  var dataToSend={
        username:'',
        password:''
    }*/
    console.log("hey");
    $scope.login = function (user)
    {
        console.log("hey");
        apiService.apiCalltoServer('employee/login','POST',user).then(function(response)
            {
                $state.go('master.groups');
               
            },function(err)
            {
                console.log(err);
            });
    }
}]);
