app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
	$stateProvider
		.state('master', {
            templateUrl: 'views/master.html', controller : 'MasterController'
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
		.state('master.creategroup', {
            url: '/creategroup',
            templateUrl: 'views/CreateGroup.html', controller : 'CreateGroupController'
        });
		
	$stateProvider
		.state('master.createpoll', {
            url: '/createpoll',
            templateUrl: 'views/CreatePoll.html', controller : 'PollsController'
        });
	
	$stateProvider
		.state('master.editpoll', {
            url: '/editpoll',
            templateUrl: 'views/EditPoll.html', controller : 'PollsController'
        });
});
