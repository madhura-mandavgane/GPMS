app.controller('CreatePollController', function($scope, $location, $http, $filter, apiService, $stateParams, $rootScope) {
//$stateParams.id
$scope.answers = [];
$scope.answersCount = [];
$scope.correctAnswer = [];

alert("rootscope=" + JSON.stringify($rootScope.employee));

$scope.totalAnswerChanged = function(){
	var count = parseInt($scope.TotalAnswers);
	$scope.answersCount = [];
	for(i=0; i<count;i++){
		$scope.answersCount[i] = i;
	}
}

$http({
           method: 'GET',
           url: 'http://localhost:9095/groups',
         }).then(function successCallback(response) {
		 alert('success');
		 $scope.groupList=response.data;
		 alert("grouplist=" + JSON.stringify($scope.groupList) );
	     }, function errorCallback(response) {
	alert('failed');
  });
 	
$scope.AddPoll = function(){

    var count = parseInt($scope.TotalAnswers);
	$scope.AnswerObjs = [];
	alert(count);
	for(i=0; i<count;i++){
	    alert($scope.answers[i]);
		
/*		var correct = 'false';
		if($scope.correctAnswer[i] == "true")
		  {
		     correct = 'true';
		  }
		alert($scope.correctAnswer[i]); */
		$scope.AnswerObjs[i] = {'ans': $scope.answers[i], 'optionNo': i+1, 'correct': $scope.correctAnswer[i], 'answeredCount':'0'};
``	}
	
	function Poll() {
			
            this.description = $scope.Description;
			this.createdBy = $rootScope.employee._id;
		    this.pollStatus = "";
		    this.creationDate = new Date();
		    this.openingDate  = new Date($scope.StartDate);
			this.closingDate  = new Date($scope.EndDate);
		    this.question = $scope.Question;
		    this.answers = $scope.AnswerObjs;
		   
			if($scope.visibility == "Public")
		       this.isResultVisibleToParticipants = "1";
			else
			   this.isResultVisibleToParticipants = "0";
			
			var participatingGroups = [];
            for (var grp in $scope.groupList)
			{
			    participatingGroups.push({groupId:$scope.groupList[grp]["_id"]});
			}
		    this.ParticipantGroups = participatingGroups;
        }

   var jsondata = new Poll();
   alert(JSON.stringify(jsondata));
   $http({
           method: 'POST',
           url: 'http://localhost:9095/polls',
		   data: JSON.stringify(jsondata)
         }).then(function successCallback(response) {
		 alert('success');
		 $scope.list=response.data;
		 alert(response.data._id);
    }, function errorCallback(response) {
	alert('failed');
  });
};

});
              
	    