app.controller('OperationGroupController', function($scope,$http,$state,apiService,$stateParams) {
 $scope.groupName = "";
 $scope.checkedEmp = [];
 
 if($stateParams.action == "add")
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
          "createdBy" : $scope.checkedEmp[0], //after login
          "groupName" : $scope.groupName,
          "members" : $scope.checkedEmp
      }
      if($stateParams.action == "add")
      {
            apiService.apiCalltoServer('Groups','POST',dataToSend).then(function(response)
            {
                alert("Created");
				$state.go('master.groups');
            });
      }
      else
      {
            apiService.apiCalltoServer('Groups','PUT',dataToSend).then(function(response)
            {
                alert("Updated");
				$state.go('master.groups');
            });
      }
  }
});