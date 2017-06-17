angular.module('AngularApp.services', [])

angular.module('AngularApp.services').service('API', function($q, $http, $cookies, $filter, toastr) {
	
	var service = {
		
		sendRequest: function(url, method, params, data) {
			
			if ($cookies.token) { $http.defaults.headers.common.Authorization = 'Token ' + $cookies.token; }
			
			var deferred = $q.defer();
			
			$http({url: url, withCredentials: false, method: method, headers: {'X-CSRFToken': $cookies['csrftoken']}, params: params, data: data})
				.then(function successCallback(response) {
					
					deferred.resolve(response.data, response.status);
				}
				, function errorCallback(response) {

					if (response.status == 0) {
						
						if (response.data == '') response.data = 'error_TIMEOUT';
						if (response.data == null) response.data = 'error_NOCONNECTION';
					}
					
					toastr.error($filter('translate')(response.data));

					deferred.reject(response.data, response.status, response.headers, response.config);
				});
			
			return deferred.promise;
		},
	};
	
	return service;
});

angular.module('AngularApp.services').service('UserService', function($auth, $http, $cookies, $state, API) {
	
	var service = {

		data: {

			name: null,
			team: null,
			level: null,
			
			authenticated: false,
		},

		init: function() {

			if (!$auth.isAuthenticated()) return;
			
			service.data.authenticated = true;
			
			return API.sendRequest('/api/profile/', 'GET').then(function(response) {
				
				service.data.name = response.name;
				service.data.team = response.team;
				service.data.level = response.level;
			});
		},

		logout: function() {
			
			delete $http.defaults.headers.common.Authorization;
	    	delete $cookies.token;
			
			$auth.removeToken();
			
			service.data.name = null;
			service.data.team = null;
			service.data.level = null;
			
			service.data.authenticated = false;
			
			return API.sendRequest('/api/logout/', 'POST').then(function(response) {
				
				$state.go('root.home', {location: 'replace'});
			});
		},
		
		socialLogin: function(provider) {
			
			return $auth.authenticate(provider).then(function(response) {
				
				$auth.setToken(response.data.token);
				$cookies.token = response.data.token;
				
				service.init();
				
				$state.go('root.pogodex', {location: 'replace'});
			});
		},
		
		localLogin: function(username, password) {
			
			var data = { 'username':username, 'password':password }
			return API.sendRequest('/api/login/', 'POST', {}, data).then(function(response) {
				
				$auth.setToken(response.token);
				$cookies.token = response.token;
			
				service.init();
				
				$state.go('root.pogodex', {location: 'replace'});
			});
		},
		
		register: function(username, password1, password2, email) {
			
			var data = { 'username':username, 'password1':password1, 'password2':password2, 'email':email }
			return API.sendRequest('/api/register/', 'POST', {}, data).then(function(response) {
				
				$auth.setToken(response.token);
				$cookies.token = response.token;
				
				service.init();
				
				$state.go('root.pogodex', {location: 'replace'});
			});
		},
		
		updateName: function(newvalue) {
			
			var data = { 'name':newvalue };
			return API.sendRequest('/api/profile/name/', 'POST', {}, data).then(function(response) {
				
				service.data.name = newvalue;
			});
		},
		
		updateTeam: function(newvalue) {
			
			var data = { 'team':newvalue };
			return API.sendRequest('/api/profile/team/', 'POST', {}, data).then(function(response) {
				
				service.data.team = newvalue;
			});
		},
		
		updateLevel: function(newvalue) {
			
			var data = { 'level':newvalue };
			return API.sendRequest('/api/profile/level/', 'POST', {}, data).then(function(response) {
				
				service.data.level = newvalue;
			});
		},
	};
	
	return service;
});

angular.module('AngularApp.services').service('PokemonService', function($state, API) {
	
	var service = {

		data: {
		},
		
		create: function(data) {
		
			return API.sendRequest('/api/pokemon/add/', 'POST', {}, data);	
		},
		
		load: function(ref) {
			
			return API.sendRequest('/api/pokemon/' + ref + '/', 'GET').then(function(response) {
				
				service.data = response;
				
				service.data.db = {};
				angular.extend(service.data.db, data_pokemon.get(service.data.pokemon.code));
				
				service.computeLevel();
				service.computeFinalData();
				service.computeRequiredData();
			});
		},
		
		computeLevel: function() {

			var pokemon = null;
			for (var code of data_pokemon.keys()) {
				
				if (service.data.pokemon.code == code) {
					pokemon = data_pokemon.get(code);
					break;
				}
			}
			if (!pokemon) return;

			var baseS = pokemon.stigmata;
			var baseA = pokemon.attack;
			var baseD = pokemon.defense;
			
			var stardust = data_stardust.get(parseInt(service.data.pokemon.stardust));
			if (!stardust) return;
			
			var highS = service.data.pokemon.app2S;
			var highA = service.data.pokemon.app2A;
			var highD = service.data.pokemon.app2D;
			
			var minS =  0, minA =  0, minD =  0;
			var maxS = 15, maxA = 15, maxD = 15;
			
			var appraisal3 = data_appraisal3.get(parseInt(service.data.pokemon.app3));
			
			for (var i = 0; i < 4; i++) {
				
				var level = stardust.levels[i];
				var cpm = data_level.get(level).cpm;
				
				for (var ivS = minS; ivS <= maxS; ivS++) {
					
					var tempHP = Math.floor(cpm * (baseS + ivS));
					tempHP = tempHP < 10 ? 10 : tempHP;
					if (tempHP == service.data.pokemon.hp) {
						
						for (var ivA = minA; ivA <= maxA; ivA++) {
							for (var ivD = minD; ivD <= maxD; ivD++) {
								
								var tempCP = Math.floor((baseA + ivA) * Math.pow(baseD + ivD, 0.5) * Math.pow(baseS + ivS, 0.5) * Math.pow(cpm, 2) / 10);
								tempCP = tempCP < 10 ? 10 : tempCP;
								if (tempCP == service.data.pokemon.cp) {
									
									var valid = true;
									
									if (highS) {
										
										if ((ivS  < ivA) || (ivS < ivD)) { valid = false; }
										if ((ivS == ivA) && !highA) { valid = false; }
										if ((ivS == ivD) && !highD) { valid = false; }
									}
									
									if (highA) {
										
										if ((ivA  < ivS) || (ivA < ivD)) { valid = false; }
										if ((ivA == ivS) && !highS) { valid = false; }
										if ((ivA == ivD) && !highD) { valid = false; }
									}
									
									if (highD) {
										
										if ((ivD  < ivA) || (ivD < ivS)) { valid = false; }
										if ((ivD == ivS) && !highS) { valid = false; }
										if ((ivD == ivA) && !highA) { valid = false; }
									}
									
									if (valid) {
										
										service.data.pokemon.level = level;
										break;
									}
								}
							}
						}
					}
				}
			}
		},
		
		computeFinalData: function() {
	
			var stats = data_pokemon.get(service.data.pokemon.code);
		
			if (service.data.owner.level) {
				
				service.data.pokemon.finalLevel = service.data.owner.level + 1.5;
				service.data.pokemon.finalLevel = service.data.pokemon.finalLevel > 40 ? 40 : service.data.pokemon.finalLevel;
				
				var finalCpm = data_level.get(service.data.pokemon.finalLevel).cpm;
				
				service.data.pokemon.finalCP = Math.floor((finalCpm * finalCpm * (stats.attack + service.data.pokemon.attack) * Math.sqrt(stats.defense + service.data.pokemon.defense) * Math.sqrt(stats.stigmata + service.data.pokemon.stigmata)) / 10);
				service.data.pokemon.finalHP = Math.floor(finalCpm * (stats.stigmata + service.data.pokemon.stigmata));
			}
			else {
			
				service.data.pokemon.finalCP = null;
				service.data.pokemon.finalHP = null;
				service.data.pokemon.finalLevel = null;
			}
		},
		
		computeRequiredData: function() {

			var startingStardust = 0;
			var targetStardust = 0;
			var startingCandy = 0;
			var targetCandy = 0;
			
			startingStardust = data_level.get(service.data.pokemon.level).cumul_stardust;
			startingCandy = data_level.get(service.data.pokemon.level).cumul_candy;
			
			targetStardust = data_level.get(service.data.pokemon.finalLevel).cumul_stardust;
			targetCandy = data_level.get(service.data.pokemon.finalLevel).cumul_candy;
	
			service.data.pokemon.requiredStardust = targetStardust - startingStardust;
			service.data.pokemon.requiredCandy = targetCandy - startingCandy;
		},
		
		updateName: function(newvalue) {
			
			var data = { 'name':newvalue };
			return API.sendRequest('/api/pokemon/' + service.data.pokemon.ref + '/name/', 'POST', {}, data).then(function(response) {
				
				service.data.pokemon.name = newvalue;
			});
		},
	};
	
	return service;
});

angular.module('AngularApp.services').service('PogodexService', function($state, $cookies, API, PokemonService) {

	function _compareByName(a, b) {
		
		if (a.name > b.name) return 1;
		if (a.name < b.name) return -1;
		return 0;
	}
	
	function _compareByPercent(a, b) {
		
		if (a.percent > b.percent) return -1;
		if (a.percent < b.percent) return 1;
		return 0;
	}
	
	function _compareByAttack(a, b) {
		
		if (a.attack > b.attack) return -1;
		if (a.attack < b.attack) return 1;
		return 0;
	}
	
	function _compareByDefense(a, b) {
		
		if (a.defense > b.defense) return -1;
		if (a.defense < b.defense) return 1;
		return 0;
	}
	
	function _compareByStigmata(a, b) {
		
		if (a.stigmata > b.stigmata) return -1;
		if (a.stigmata < b.stigmata) return 1;
		return 0;
	}
	
	function _compareByDexnumber(a, b) {
		
		if (a.number > b.number) return 1;
		if (a.number < b.number) return -1;
		return 0;
	}
	
	var service = {

		data: {
			
			sortType: '',
			
			pokemons: [],
		},
		
		init: function() {
			
			service.data.sortType = 'percent';
			
			var sortTypeCookie = $cookies.get('sortType');
			if (sortTypeCookie) service.data.sortType = sortTypeCookie;
			
			return API.sendRequest('/api/pokemon/list/', 'POST').then(function(response) {
				
				service.data.pokemons = response;
				service.sort();
			});
		},
		
		setSort: function(type) {
			
			service.data.sortType = type;
			$cookies.put('sortType', service.data.sortType);
			
			service.sort();
		},
		
		sort: function() {
			
			switch(service.data.sortType) {
				
				case 'name': service.data.pokemons = service.data.pokemons.sort(_compareByName); break;
				case 'percent': service.data.pokemons = service.data.pokemons.sort(_compareByPercent); break;
				case 'attack': service.data.pokemons = service.data.pokemons.sort(_compareByAttack); break;
				case 'defense': service.data.pokemons = service.data.pokemons.sort(_compareByDefense); break;
				case 'stigmata': service.data.pokemons = service.data.pokemons.sort(_compareByStigmata); break;
				case 'dexnumber': service.data.pokemons = service.data.pokemons.sort(_compareByDexnumber); break;
			}
		},
		
		save: function(item) {
			
			return PokemonService.create(item).then(function() {
				
				service.data.pokemons.push(item);
				service.sort();
				
				$state.go('root.pogodex', {location: 'replace'});
			})
		},
		
		delete: function(ref) {
			
			return API.sendRequest('/api/pokemon/' + ref + '/delete/', 'POST').then(function(response) {
				
				service.init();
				
				$state.go('root.pogodex', {location: 'replace'});
			});
		},
	};
	
	return service;
});