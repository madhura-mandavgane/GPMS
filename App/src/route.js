app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
	$stateProvider
		.state('master', {
            templateUrl: 'views/Master.html', controller : 'MasterController'
        });
	
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('master.home', {
            url: '/home',
            templateUrl: 'views/Home.html', controller : 'HomeController'
        });
		
	$stateProvider
		.state('master.groups', {
            url: '/groups',
            templateUrl: 'views/Groups.html', controller : 'GroupsController'
        });
		
	$stateProvider
		.state('master.polls', {
            url: '/polls',
            templateUrl: 'views/ListPolls.html', controller : 'PollsController'
        });	

	$stateProvider
		.state('master.operationGroup', {
            url: '/groups/:operation?groupID',
            templateUrl: 'views/OperationGroup.html', controller : 'OperationGroupController'
        });
	
	$stateProvider
		.state('master.createpoll', {
            url: '/poll',
            templateUrl: 'views/CreatePoll.html', controller : 'PollsController'
        });
	
	
	$stateProvider
		.state('master.editpoll', {
            url: '/poll/{id}',
            templateUrl: 'views/CreatePoll.html', controller : 'PollsController'
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
});
