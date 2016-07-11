app.controller('GroupsController', function($scope,$http,$state,apiService, $rootScope) {

var serverData = [];
var empData = [];

$scope.groupList = [];
apiService.apiCalltoServer('Groups','GET').then(function(response)
{
    serverData = response.data;
    for(var i=0;i<serverData.length;i++)
    {
       var ListEmployees = [];
       for(var j=0;j<serverData[i].members.length;j++)
       {
            var member = serverData[i].members[j].member_id;
            var pushMember = {
                "member" : member
            }
            ListEmployees.push(pushMember);
       }
       empData[i] = {
           "ListEmployees":ListEmployees
           }
       console.log(empData);    
      
    }
    
    async.forEachOf(empData,function(value,key,callback){
        apiService.apiCalltoServer('group/employees','POST',value).then(function(response)
        {
        
            console.log(response);
            serverData[key].names = response.data;
            console.log(serverData);
            callback();
        },function(err){
          if (err) 
            return callback(err);
            
          callback();  
        });
        
    });

async.forEachOf(serverData,function(value,key,callback){
    var data = {
        "createdBy":value.createdBy
    }
    apiService.apiCalltoServer('employee','POST',data).then(function(response)
    {
        
            console.log(response);
            serverData[key].first_name = response.data.first_name;
            serverData[key].last_name = response.data.last_name;
            console.log(serverData);
            callback();
     },function(err){
          if (err) 
            return callback(err);
            
          callback();  
        });
        
    });
    
  $scope.groupList = serverData;  
    
});

$scope.editRecord = function()
{
	$state.go('master.operationGroup',{operation:'edit'},{reload:true});
}

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