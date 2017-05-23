angular.module('AngularApp').service('API', function($q, $http, $cookies) {
	
	var service = {
		
		sendRequest: function(url, method, params, data) {
			
			if ($cookies.token) { $http.defaults.headers.common.Authorization = 'Token ' + $cookies.token; }
			
			var deferred = $q.defer();
			
			$http({url: url, withCredentials: false, method: method, headers: {'X-CSRFToken': $cookies['csrftoken']}, params: params, data: data})
				.then(function successCallback(response) {
					
					deferred.resolve(response.data, response.status);
				}
				, function errorCallback(response) {
					
					console.log('Error calling ' + url);
				
					if (response.status == 0) {
						
							if (response.data == '') {
								
								data = {};
								data['status'] = 0;
								data['server_errors'] = ['Could not connect. Please try again.'];
							}
							
							if (response.data == null) {
								
								data = {};
								data['status'] = 0;
								data['server_errors'] = ['Server timed out. Please try again.'];
							}
					}
					
					deferred.reject(response.data, response.status, response.headers, response.config);
				});
			
			return deferred.promise;
		},
	};
	
	return service;
});