app.controller('OperationGroupController', function($scope,$http,$state,apiService,$stateParams) {
 $scope.groupName = "";
 $scope.checkedEmp = [];
 
 if($stateParams.operation == "add")
 $scope.title = "New Group";
 else
 $scope.title = "Edit Group";
 
 $scope.submit = function()
  {
      var dataToSend = {
          "groupName" : $scope.groupName,
          "memebers" : $scope.checkedEmp
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