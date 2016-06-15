app.service('apiService',['$http','pollConfig','$rootScope',function ($http,pollConfig,$rootScope){
    
    
    this.url = pollConfig.url;
    var that = this;
    this.apiCalltoServer = function(signature,methodCalled,data)
    {
        
        var config ={
				url:that.url+signature+'?dont=' + Math.random() * (15000 - 1) + 1,
				method:methodCalled,
				data:data || '',
				timeout:pollConfig.ajaxTimeout,
                cache:false
			};
            
         return $http(config)
    }
}]);