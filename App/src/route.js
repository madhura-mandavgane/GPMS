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
            url: '/groups/:action',
            templateUrl: 'views/OperationGroup.html', controller : 'OperationGroupController'
        });
			
	$stateProvider
		.state('master.polls', {
            url: '/polls',
            templateUrl: 'views/ListPolls.html', controller : 'ListPollsController'
        });	
		
	$stateProvider
		.state('master.createpoll', {
            url: '/poll',
            templateUrl: 'views/CreatePoll.html', controller : 'CreatePollController'
        });
	
	
	$stateProvider
		.state('master.editpoll', {
            url: '/poll/{id}',
            templateUrl: 'views/EditPoll.html', controller : 'EditPollController'
        });
		
	$stateProvider
		.state('master.openpolls', {
            url: '/open/polls',
            templateUrl: 'views/OpenPolls.html', controller : 'OpenPollsController'
        });
		
	$stateProvider
		.state('master.answerpoll', {
            url: "/answer/poll/:id",
            templateUrl: 'views/CommitPolls.html', controller : 'CommitPollsController'
        });
		
    $stateProvider
		.state('master.viewpollresult', {
            url: '/result/poll/:id',
            templateUrl: 'views/PollResult.html', controller : 'PollResultController'
        });	
});

app.run(function($rootScope, $location, $state){
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams,fromState,fromParams) {
				$rootScope.currentState = toState.name;
              
				  
                  if ($rootScope.loggedin)
				  { /* alert('logged in'); */
					 $location.path(toState.url);
				  }
				  else
				  {
				     /*alert('not logged in');*/
					 $location.path(toState.url);
				  }
              });
 });
