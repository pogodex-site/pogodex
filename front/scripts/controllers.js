angular.module('AngularApp.controllers', [])

angular.module('AngularApp.controllers').controller('RootCtrl', function($scope, $stateParams, $translate, $window, UserService) {
	
	if ($stateParams.codelang) {
		
		$translate.use($stateParams.codelang);
		UserService.data.lang = $stateParams.codelang;
	}
	else {
		
		var lang = $window.navigator.language || $window.navigator.userLanguage;
		
		$translate.use(lang);
		UserService.data.lang = lang;
		
		$window.location.href = '/' + lang + '/home';
	}
	
	$scope.user = UserService.data;
	
	$scope.logout = UserService.logout;
});

angular.module('AngularApp.controllers').controller('HomeCtrl', function($scope, $filter, $state) {
	
	$scope.homeModel = {code: null, list: Array.from(data_pokemon.keys())};
	
	$scope.evaluate = function(form) {
		
		if (!form.$invalid) {
			
			for (var code of data_pokemon.keys()) {
	
				var refvalue = $filter('translate')(code);
				
				if (refvalue == $scope.homeModel.code) {
					
					$state.go('root.ivcalculator', {code: code, location: 'replace'});
					break;
				}
			}
		}
	}
});

angular.module('AngularApp.controllers').controller('LoginCtrl', function($scope, UserService) {
	
	$scope.loginModel = { username:null, password:null };
	
	$scope.localLogin = UserService.localLogin;
	$scope.socialLogin = UserService.socialLogin;
});

angular.module('AngularApp.controllers').controller('RegisterCtrl', function($scope, UserService) {
	
	$scope.registerModel = { username:null, password1:null, password2:null, email:null };
	
	$scope.register = UserService.register;
});

angular.module('AngularApp.controllers').controller('ProfileCtrl', function($scope, UserService, $timeout) {
	
	$scope.user = UserService.data;
	
	/* Name */
	
	$scope.editname = false;
	$scope.newname = UserService.data.name;
	
	$scope.nameClick = function() {
		
		$scope.editname = true;
			
		$timeout(function() {
			$('#input-name').focus();
		});
	}
	
	$scope.nameBlur = function() {
		
		$scope.editname = false;
		
		if ($scope.newname && $scope.newname != UserService.data.name) {
			
			$scope.loadingname = true;
			UserService.updateName($scope.newname).then(function() {
				$scope.loadingname = false;
			});
		}
	}
	
	/* Team */
	
	$scope.editteam = false;
	$scope.newteam = UserService.data.team;
	
	$scope.teamClick = function() {
		
		$scope.editteam = true;
	}
	
	$scope.teamBlur = function(newvalue) {
		
		$scope.editteam = false;
		
		if (newvalue && newvalue != UserService.data.team) {
			
			$scope.loadingteam = true;
			UserService.updateTeam(newvalue).then(function() {
				$scope.newteam = UserService.data.team;
				$scope.loadingteam = false;
			});
		}
	}
	
	/* Level */
	
	$scope.editlevel = false;
	$scope.newlevel = UserService.data.level;
	
	$scope.levellist = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];
	
	$scope.levelClick = function() {
		
		$scope.editlevel = true;
			
		$timeout(function() {
			$('#input-level').focus();
		});
	}
	
	$scope.levelBlur = function(newvalue) {
		
		$scope.editlevel = false;
		
		if (newvalue && newvalue != UserService.data.level) {
			
			$scope.loadinglevel = true;
			UserService.updateLevel(newvalue).then(function() {
				$scope.newlevel = UserService.data.level;
				$scope.loadinglevel = false;
			});
		}
	}
});

angular.module('AngularApp.controllers').controller('IVCalculatorCtrl', function($scope, UserService, $stateParams, $filter, PogodexService) {

	$scope.user = UserService.data
	
	$scope.ivModel = { team:UserService.data.team, level:UserService.data.level, code:$filter('translate')($stateParams.code), cp:null, hp:null, stardust:null, app1:null, app2A:false, app2D:false, app2S:false, app3:null };

	$scope.levellist = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];
	
	$scope.codelist = Array.from(data_pokemon.keys());
	$scope.stardustlist = Array.from(data_stardust.keys());
	
	$scope.compute = function(form) {
		
		$scope.results = [];
		
		if (!form.$invalid) {
			
			if (UserService.data.authenticated && !UserService.data.team) UserService.updateTeam($scope.ivModel.team);
			if (UserService.data.authenticated && !UserService.data.level) UserService.updateLevel($scope.ivModel.level);
			
			var pokemon = null;
			for (var code of data_pokemon.keys()) {
				
				if ($scope.ivModel.code == $filter('translate')(code)) {
					pokemon = data_pokemon.get(code);
					break;
				}
			}
			if (!pokemon) return;

			var baseS = pokemon.stigmata;
			var baseA = pokemon.attack;
			var baseD = pokemon.defense;
			
			var stardust = data_stardust.get(parseInt($scope.ivModel.stardust));
			if (!stardust) return;
			
			var highS = $scope.ivModel.app2S;
			var highA = $scope.ivModel.app2A;
			var highD = $scope.ivModel.app2D;
			
			var minS =  0, minA =  0, minD =  0;
			var maxS = 15, maxA = 15, maxD = 15;
			
			var appraisal3 = data_appraisal3.get(parseInt($scope.ivModel.app3));
			
			for (var i = 0; i < 4; i++) {
				
				var level = stardust.levels[i];
				var cpm = data_level.get(level).cpm;
				
				for (var ivS = minS; ivS <= maxS; ivS++) {
					
					var tempHP = Math.floor(cpm * (baseS + ivS));
					tempHP = tempHP < 10 ? 10 : tempHP;
					if (tempHP == $scope.ivModel.hp) {
						
						for (var ivA = minA; ivA <= maxA; ivA++) {
							for (var ivD = minD; ivD <= maxD; ivD++) {
								
								var tempCP = Math.floor((baseA + ivA) * Math.pow(baseD + ivD, 0.5) * Math.pow(baseS + ivS, 0.5) * Math.pow(cpm, 2) / 10);
								tempCP = tempCP < 10 ? 10 : tempCP;
								if (tempCP == $scope.ivModel.cp) {
									
									var result = {	code:pokemon.code,
													name:$filter('translate')(pokemon.code),
													level:level,
													stigmata:ivS,
													attack:ivA,
													defense:ivD,
													percent:((ivS + ivA + ivD) * 100.0 / 45.0).toFixed(1),
													cp:$scope.ivModel.cp,
													hp:$scope.ivModel.hp,
													stardust:$scope.ivModel.stardust,
													app1:parseInt($scope.ivModel.app1),
													app2S:$scope.ivModel.app2S,
													app2A:$scope.ivModel.app2A,
													app2D:$scope.ivModel.app2D,
													app3:parseInt($scope.ivModel.app3),
													team:$scope.ivModel.team,
									};
									
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
										
										if ((ivD  < result.ATK) || (ivD < ivS)) { valid = false; }
										if ((ivD == ivS) && !highS) { valid = false; }
										if ((ivD == ivA) && !highA) { valid = false; }
									}
									
									if (valid) $scope.results.push(result);
								}
							}
						}
					}
				}
			}
		}
	}

	$scope.save = function(form, item) {
		
		if (!form.$invalid) PogodexService.save(item);
	}
});

angular.module('AngularApp.controllers').controller('PogodexCtrl', function($scope, PogodexService) {
	
	$scope.pokemons = PogodexService.data.pokemons;
	$scope.sorttype = PogodexService.data.sortType;
	
	$scope.sort = PogodexService.setSort;
});

angular.module('AngularApp.controllers').controller('PokemonCtrl', function($scope, $stateParams, $timeout, PokemonService, PogodexService, UserService) {
	
	$scope.profile = UserService.data;
	
	$scope.isLoading = true;
	
	PokemonService.load($stateParams.ref).then(function(response) {
		
		$scope.data = PokemonService.data;
		
		$scope.newname = PokemonService.data.pokemon.name;
		
		$scope.isLoading = false;
		
	}, function(response) {
		
		$scope.isLoading = false;
	});

	$scope.selectShareLink = function() {
		
		$('#js-copytext').select();
	}
	
	$scope.copyToClipboard = function() {
		
		$('#js-copytext').select();
		
		var successful = document.execCommand('copy');
		var msg = successful ? 'successful' : 'unsuccessful';
		console.log('Copying text command was ' + msg);		
	}

	/* Name */
	
	$scope.editname = false;
	
	$scope.nameClick = function() {
		
		$scope.editname = true;
			
		$timeout(function() {
			$('#input-name').focus();
		});
	}
	
	$scope.nameBlur = function() {
		
		$scope.editname = false;
		
		if ($scope.newname && $scope.newname != PokemonService.data.pokemon.name) {
			
			$scope.loadingname = true;
			PokemonService.updateName($scope.newname).then(function() {
				$scope.loadingname = false;
			});
		}
	}
	
	$scope.delete = PogodexService.delete;
});

angular.module('AngularApp.controllers').controller('PokedexCtrl', function($auth, $state, $stateParams, $translate, $window) {
});
