app.controller('CommitPollsController', function($rootScope, $scope, $location, $http, $filter, apiService, $stateParams) {
$scope.answers=[];
$scope.answerObj = [];
$scope.Poll={};

alert("rootscope=" + JSON.stringify($rootScope.employee));
alert("$stateParams.id" + $stateParams.id);
if($stateParams.id){	
	$http({
           method: 'GET',
           url: 'http://localhost:9095/polls/' + $stateParams.id
         }).then(function successCallback(response) {
		 $scope.PollsList=response.data;
		 $scope.Description = $scope.PollsList[0]["description"];
		 $scope.Question = $scope.PollsList[0]["question"];
		 
		 $scope.answers = $scope.PollsList[0]["answers"];
		 //alert("answers=" + $scope.answers);
         $scope.Poll = $scope.PollsList[0];   
		 $scope.answerObj = $scope.answers;
		 /*
		 for(var i=0; i<$scope.answers.length; i++)
		 {
            $scope.answerObj.push({ans:$scope.answers[i].ans,
                   			optionNo:$scope.answers[i].optionNo,
  							correct:$scope.answers[i].correct,
							answeredCount:$scope.answers[i].answeredCount});		 
 		 }
		 */
		 $scope.Pollid = $scope.PollsList[0]["_id"];
		 alert(JSON.stringify($scope.PollsList));
		 $stateParams.id = 0;
		 $scope.answers =[];
    }, function errorCallback(response) {
	alert('failed');
  	});
};

$scope.CommitPoll = function() {
 
    //alert("answerObj = " + JSON.stringify($scope.answerObj));

	//alert("answers = " + JSON.stringify($scope.answers));
	for(var i=0; i<$scope.answers.length; i++)
	{
	   //alert("ans = " + $scope.answers[i]);
	   for(var j=0; j<$scope.answerObj.length; j++)
	   {
	      //alert("ansobj = " + $scope.answerObj[j]["ans"]);
	      if($scope.answers[i] == $scope.answerObj[j]["ans"])
	      {
	        //alert($scope.answerObj[j]["ans"]);
		    var count =  parseInt($scope.answerObj[j]["answeredCount"]);
			//alert(count);
		    $scope.answerObj[j]["answeredCount"] = count + 1;
			//alert('$scope.answerObj[j]["answeredCount"] = '  +  $scope.answerObj[j]["answeredCount"]);
			break;
		  }
	   }
	   
	}

	//alert("JSON put=" + JSON.stringify($scope.answerObj));
    $scope.Poll.answers = $scope.answerObj;
    alert(JSON.stringify($scope.Poll));
   
	$http({
           method: 'PUT',
		   data: JSON.stringify($scope.Poll),
           url: 'http://localhost:9095/polls/' + $scope.Pollid + '/answer'
         }).then(function successCallback(response) {

		 $scope.PollsList=response.data;
    }, function errorCallback(response) {
	alert('failed');
  	});
	
};
});