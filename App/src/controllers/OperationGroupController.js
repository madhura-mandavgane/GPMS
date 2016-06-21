app.controller('OperationGroupController', function($scope,$http,$state,apiService,$stateParams) {
 $scope.groupName = "";
 $scope.checkedEmp = [];
 
 if($stateParams.operation == "add")
 $scope.title = "New Group";
 else
 $scope.title = "Edit Group";
 
 
 apiService.apiCalltoServer('employees','GET').then(function(response)
            {
                $scope.employees = response.data;
            });
            
 $scope.submit = function()
  {
      var dataToSend = {
          "eid" : $scope.checkedEmp[0], //after login
          "groupName" : $scope.groupName,
          "members" : $scope.checkedEmp
      }
      if($stateParams.operation == "add")
      {
            apiService.apiCalltoServer('Groups','POST',dataToSend).then(function(response)
            {
                alert("Created");
            });
      }
      else
      {
            apiService.apiCalltoServer('Groups','PUT',dataToSend).then(function(response)
            {
                alert("Updated");
            });
      }
  }
});