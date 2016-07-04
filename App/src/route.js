app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/login');
    $stateProvider
		.state('login', {
            url:'/login',
            templateUrl: 'views/Login.html', controller : 'LoginController'
        });
		
	$stateProvider
		.state('master', {
			abstract:true,
            templateUrl: 'views/Master.html', controller : 'MasterController'
        });
	
   $stateProvider
		.state('master.groups', {
            url: '/groups',
            templateUrl: 'views/Groups.html', controller : 'GroupsController'
        });

	$stateProvider
		.state('master.operationGroup', {
            url: '/groups/:operation?groupID',
            templateUrl: 'views/OperationGroup.html', controller : 'OperationGroupController'
        });
			
	$stateProvider
		.state('master.polls', {
            url: '/polls',
            templateUrl: 'views/ListPolls.html', controller : 'PollsController'
        });	
		
	$stateProvider
		.state('master.createpoll', {
            url: '/poll',
            templateUrl: 'views/CreatePoll.html', controller : 'PollsController'
        });
	
	
	$stateProvider
		.state('master.editpoll', {
            url: '/poll/{id}',
            templateUrl: 'views/EditPoll.html', controller : 'EditPollController'
        });
		
	$stateProvider
		.state('master.openpolls', {
            url: '/open/polls',
			params: { id:null, operation:null},
            templateUrl: 'views/OpenPolls.html', controller : 'OpenPollsController'
        });
		
	$stateProvider
		.state('master.answerpoll', {
            url: '/answer/poll/{id}',
            templateUrl: 'views/CommitPolls.html', controller : 'CommitPollsController'
        });
		
    $stateProvider
		.state('master.viewpollresult', {
            url: '/result/poll/{id}',
            templateUrl: 'views/PollResult.html', controller : 'PollResultController'
        });	
});

app.run(['$rootScope', '$state',function($rootScope, $state){

  $rootScope.$on('$stateChangeStart',function(a,b,c,d,e){
      $rootScope.currentState = b.eid;
 });

}]);
