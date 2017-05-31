angular.module('AngularApp').controller('LangCtrl', function($scope, $translate, $auth, $http, $cookies, $location, API) {

	$scope.changeLanguage = function(key) {
	
		$translate.use(key);
	};
});

angular.module('AngularApp').controller('AccountCtrl', function($scope, $auth, $cookies, $location, $http, API) {
	
	$scope.loginModel = {username: '', password: ''};
	
	$scope.registerModel = {username: '', password1: '', password2: '', email: ''};
	
	$scope.socialLogin = function(provider) {
		
		API.sendRequest('/api/logout/', 'POST');
		
		delete $http.defaults.headers.common.Authorization;
    	delete $cookies.token;
		
		$auth.removeToken();
		
		$auth.authenticate(provider).then(function(response) {
			
			$auth.setToken(response.data.token);
			$cookies.token = response.data.token;
			$location.path('/pokedex');
			
		});
	};
	
	$scope.localLogin = function(form) {
		
		API.sendRequest('/api/logout/', 'POST');
		
		delete $http.defaults.headers.common.Authorization;
    	delete $cookies.token;
		
		$auth.removeToken();
		
		if (!form.$invalid) {
			
			var data = { 'username':$scope.loginModel.username, 'password':$scope.loginModel.password }
			API.sendRequest('/api/login/', 'POST', {}, data).then(function success(data) {
				
					$auth.setToken(data.token);
					$cookies.token = data.token;
					$location.path('/pokedex');
					
				},function error(data) {
				
					$scope.error = data;
			});
		}
	};

	$scope.register = function(form) {
		
		if (!form.$invalid) {
			
			var data = { 'username':$scope.registerModel.username, 'password1':$scope.registerModel.password1, 'password2':$scope.registerModel.password2, 'email':$scope.registerModel.email }
			API.sendRequest('/api/register/', 'POST', {}, data).then(function(data) {
				
					$auth.setToken(data.token);
					$cookies.token = data.token;
					$location.path('/pokedex');
					
				},function(data) {
				
					$scope.error = data;
			});
		}
	}

	$scope.logout = function() {
		
		API.sendRequest('/api/logout/', 'POST');
		
		delete $http.defaults.headers.common.Authorization;
    	delete $cookies.token;
		
		$auth.removeToken();
		
		$location.path('/');
	};
});

angular.module('AngularApp').controller('AppCtrl', function($rootScope, $filter, $auth, toastr, API) {
	
	if ($auth.isAuthenticated()) {
	
		$rootScope.isProfileLoading = true;
		
		API.sendRequest('/api/profile', 'GET').then(function success(data) {
			
			$rootScope.profile = data;
			
			$rootScope.$broadcast('profile-loaded');
			
			$rootScope.isProfileLoading = false;
			
		}, function error(data) {
			
			$rootScope.$broadcast('profile-loaded');
			
			$rootScope.isProfileLoading = false;
	
			toastr.error('<i class="fa fa-exclamation-triangle mr-2"></i> ' + $filter('translate')('notif_ERROR'), '', {allowHtml: true});
		});
	}
});

angular.module('AngularApp').controller('ProfileCtrl', function($rootScope, $scope, $location, $filter, toastr, API) {
	
	$scope.isLoading = true;
	
	API.sendRequest('/api/profile', 'GET').then(function success(data) {
		
		$rootScope.profile = data;
		
		$scope.editModel = {team: $rootScope.profile.team, level: $rootScope.profile.level};
		
		$scope.isLoading = false;
		
	}, function error(data) {
		
		$scope.isLoading = false;
	
		toastr.error('<i class="fa fa-exclamation-triangle mr-2"></i> ' + $filter('translate')('notif_ERROR'), '', {allowHtml: true});
	});
		
	$scope.level_list = [ 1,  2,  3,  4,  5,  6,  7,  8,  9, 10,
						 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
						 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
						 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
	];
	
	$scope.filtered_levellist = $scope.level_list;
	
	$scope.filterLevels = function() {

		$scope.filtered_levellist = [];
		
		for (var i = 0; i < $scope.level_list.length; i++) {
			
			var inputLevel = $scope.editModel.level;
			
			if (!inputLevel || inputLevel == $scope.level_list[i]) {
				$scope.filtered_levellist.push($scope.level_list[i]);
			}
		}
	}
	
	$scope.selectLevel = function(item) {
		
		$scope.editModel.level = item;
	}
	
	$scope.edit = function() {
			
		var data = { 'team':$scope.editModel.team, 'level':$scope.editModel.level }
		API.sendRequest('/api/profile/edit/', 'POST', {}, data).then(function(data) {
			
			$rootScope.profile.team = $scope.editModel.team
			$rootScope.profile.level = $scope.editModel.level
			
			$location.path('/profile');
			
			toastr.success('<i class="fa fa-check mr-2"></i> ' + $filter('translate')('notif_SUCCESS'), '', {allowHtml: true});
				
		}, function error(data) {
			
			toastr.error('<i class="fa fa-exclamation-triangle mr-2"></i> ' + $filter('translate')('notif_ERROR'), '', {allowHtml: true});
		});
	};
});

var data_pokemon_list = [
	
	{ "dexnumber":  1,		"code":"bulbasaur",		"baseS": 90,	"baseA":118,	"baseD":118,		"maxcp": 981, },
	{ "dexnumber":  2,		"code":"ivysaur",			"baseS":120,	"baseA":151,	"baseD":151,		"maxcp":1552, },
	{ "dexnumber":  3,		"code":"venusaur",		"baseS":160,	"baseA":198,	"baseD":198,		"maxcp":2568, },
	{ "dexnumber":  4,		"code":"charmander",		"baseS": 78,	"baseA":116,	"baseD": 96,		"maxcp": 831, },
	{ "dexnumber":  5,		"code":"charmeleon",		"baseS":116,	"baseA":158,	"baseD":129,		"maxcp":1484, },
	{ "dexnumber":  6,		"code":"charizard",		"baseS":156,	"baseA":223,	"baseD":176,		"maxcp":2686, },
	{ "dexnumber":  7,		"code":"squirtle",		"baseS": 88,	"baseA": 94,	"baseD":122,		"maxcp": 808, },
	{ "dexnumber":  8,		"code":"wartortle",		"baseS":118,	"baseA":126,	"baseD":155,		"maxcp":1324, },
	{ "dexnumber":  9,		"code":"blastoise",		"baseS":158,	"baseA":171,	"baseD":210,		"maxcp":2291, },
	{ "dexnumber": 10,		"code":"caterpie",		"baseS": 90,	"baseA": 55,	"baseD": 62,		"maxcp": 393, },
	{ "dexnumber": 11,		"code":"metapod",			"baseS":100,	"baseA": 45,	"baseD": 94,		"maxcp": 419, },
	{ "dexnumber": 12,		"code":"butterfree",		"baseS":120,	"baseA":167,	"baseD":151,		"maxcp":1701, },
	{ "dexnumber": 13,		"code":"weedle",			"baseS": 80,	"baseA": 63,	"baseD": 55,		"maxcp": 397, },
	{ "dexnumber": 14,		"code":"kakuna",			"baseS": 90,	"baseA": 46,	"baseD": 86,		"maxcp": 392, },
	{ "dexnumber": 15,		"code":"beedrill",		"baseS":130,	"baseA":169,	"baseD":150,		"maxcp":1777, },
	{ "dexnumber": 16,		"code":"pidgey",			"baseS": 80,	"baseA": 85,	"baseD": 76,		"maxcp": 580, },
	{ "dexnumber": 17,		"code":"pidgeotto",		"baseS":126,	"baseA":117,	"baseD":108,		"maxcp":1085, },
	{ "dexnumber": 18,		"code":"pidgeot",			"baseS":166,	"baseA":166,	"baseD":157,		"maxcp":1994, },
	{ "dexnumber": 19,		"code":"rattata",			"baseS": 60,	"baseA":103,	"baseD": 70,		"maxcp": 588, },
	{ "dexnumber": 20,		"code":"raticate",		"baseS":110,	"baseA":161,	"baseD":144,		"maxcp":1549, },
	{ "dexnumber": 21,		"code":"spearow",			"baseS": 80,	"baseA":112,	"baseD": 61,		"maxcp": 673, },
	{ "dexnumber": 22,		"code":"fearow",			"baseS":130,	"baseA":182,	"baseD":135,		"maxcp":1814, },
	{ "dexnumber": 23,		"code":"ekans",			"baseS": 70,	"baseA":110,	"baseD":102,		"maxcp": 778, },
	{ "dexnumber": 24,		"code":"arbok",			"baseS":120,	"baseA":167,	"baseD":158,		"maxcp":1737, },
	{ "dexnumber": 25,		"code":"pikachu",			"baseS": 70,	"baseA":112,	"baseD":101,		"maxcp": 787, },
	{ "dexnumber": 26,		"code":"raichu",			"baseS":120,	"baseA":193,	"baseD":165,		"maxcp":2025, },
	{ "dexnumber": 27,		"code":"sandshrew",		"baseS":100,	"baseA":126,	"baseD":145,		"maxcp":1194, },
	{ "dexnumber": 28,		"code":"sandslash",		"baseS":150,	"baseA":182,	"baseD":202,		"maxcp":2328, },
	{ "dexnumber": 29,		"code":"nidoranfemale",	"baseS":110,	"baseA": 86,	"baseD": 94,		"maxcp": 736, },
	{ "dexnumber": 30,		"code":"nidorina",		"baseS":140,	"baseA":117,	"baseD":126,		"maxcp":1218, },
	{ "dexnumber": 31,		"code":"nidoqueen",		"baseS":180,	"baseA":180,	"baseD":174,		"maxcp":2338, },
	{ "dexnumber": 32,		"code":"nidoranmale",		"baseS": 92,	"baseA":105,	"baseD": 76,		"maxcp": 739, },
	{ "dexnumber": 33,		"code":"nidorino",		"baseS":122,	"baseA":137,	"baseD":112,		"maxcp":1252, },
	{ "dexnumber": 34,		"code":"nidoking",		"baseS":162,	"baseA":204,	"baseD":157,		"maxcp":2386, },
	{ "dexnumber": 35,		"code":"clefairy",		"baseS":140,	"baseA":107,	"baseD":116,		"maxcp":1085, },
	{ "dexnumber": 36,		"code":"clefable",		"baseS":190,	"baseA":178,	"baseD":171,		"maxcp":2353, },
	{ "dexnumber": 37,		"code":"vulpix",			"baseS": 76,	"baseA": 96,	"baseD":122,		"maxcp": 774, },
	{ "dexnumber": 38,		"code":"ninetales",		"baseS":146,	"baseA":169,	"baseD":204,		"maxcp":2157, },
	{ "dexnumber": 39,		"code":"jigglypuff",		"baseS":230,	"baseA": 80,	"baseD": 44,		"maxcp": 713, },
	{ "dexnumber": 40,		"code":"wigglytuff",		"baseS":280,	"baseA":156,	"baseD": 93,		"maxcp":1906, },
	{ "dexnumber": 41,		"code":"zubat",			"baseS": 80,	"baseA": 83,	"baseD": 76,		"maxcp": 569, },
	{ "dexnumber": 42,		"code":"golbat",			"baseS":150,	"baseA":161,	"baseD":153,		"maxcp":1830, },
	{ "dexnumber": 43,		"code":"oddish",			"baseS": 90,	"baseA":131,	"baseD":116,		"maxcp":1069, },
	{ "dexnumber": 44,		"code":"gloom",			"baseS":120,	"baseA":153,	"baseD":139,		"maxcp":1512, },
	{ "dexnumber": 45,		"code":"vileplume",		"baseS":150,	"baseA":202,	"baseD":170,		"maxcp":2367, },
	{ "dexnumber": 46,		"code":"paras",			"baseS": 70,	"baseA":121,	"baseD": 99,		"maxcp": 836, },
	{ "dexnumber": 47,		"code":"parasect",		"baseS":120,	"baseA":165,	"baseD":146,		"maxcp":1657, },
	{ "dexnumber": 48,		"code":"venonat",			"baseS":120,	"baseA":100,	"baseD":102,		"maxcp": 902, },
	{ "dexnumber": 49,		"code":"venomoth",		"baseS":140,	"baseA":179,	"baseD":150,		"maxcp":1937, },
	{ "dexnumber": 50,		"code":"diglett",			"baseS": 20,	"baseA":109,	"baseD": 88,		"maxcp": 465, },
	{ "dexnumber": 51,		"code":"dugtrio",			"baseS": 70,	"baseA":167,	"baseD":147,		"maxcp":1333, },
	{ "dexnumber": 52,		"code":"meowth",			"baseS": 80,	"baseA": 92,	"baseD": 81,		"maxcp": 638, },
	{ "dexnumber": 53,		"code":"persian",			"baseS":130,	"baseA":150,	"baseD":139,		"maxcp":1539, },
	{ "dexnumber": 54,		"code":"psyduck",			"baseS":100,	"baseA":122,	"baseD": 96,		"maxcp": 966, },
	{ "dexnumber": 55,		"code":"golduck",			"baseS":160,	"baseA":191,	"baseD":163,		"maxcp":2270, },
	{ "dexnumber": 56,		"code":"mankey",			"baseS": 80,	"baseA":148,	"baseD": 87,		"maxcp":1002, },
	{ "dexnumber": 57,		"code":"primeape",		"baseS":130,	"baseA":207,	"baseD":144,		"maxcp":2105, },
	{ "dexnumber": 58,		"code":"growlithe",		"baseS":110,	"baseA":136,	"baseD": 96,		"maxcp":1110, },
	{ "dexnumber": 59,		"code":"arcanine",		"baseS":180,	"baseA":227,	"baseD":166,		"maxcp":2839, },
	{ "dexnumber": 60,		"code":"poliwag",			"baseS": 80,	"baseA":101,	"baseD": 82,		"maxcp": 695, },
	{ "dexnumber": 61,		"code":"poliwhirl",		"baseS":130,	"baseA":130,	"baseD":130,		"maxcp":1313, },
	{ "dexnumber": 62,		"code":"poliwrath",		"baseS":180,	"baseA":182,	"baseD":187,		"maxcp":2441, },
	{ "dexnumber": 63,		"code":"abra",			"baseS": 50,	"baseA":195,	"baseD":103,		"maxcp":1148, },
	{ "dexnumber": 64,		"code":"kadabra",			"baseS": 80,	"baseA":232,	"baseD":138,		"maxcp":1859, },
	{ "dexnumber": 65,		"code":"alakazam",		"baseS":110,	"baseA":271,	"baseD":194,		"maxcp":2887, },
	{ "dexnumber": 66,		"code":"machop",			"baseS":140,	"baseA":137,	"baseD": 88,		"maxcp":1199, },
	{ "dexnumber": 67,		"code":"machoke",			"baseS":160,	"baseA":177,	"baseD":130,		"maxcp":1910, },
	{ "dexnumber": 68,		"code":"machamp",			"baseS":180,	"baseA":234,	"baseD":162,		"maxcp":2889, },
	{ "dexnumber": 69,		"code":"bellsprout",		"baseS":100,	"baseA":139,	"baseD": 64,		"maxcp": 916, },
	{ "dexnumber": 70,		"code":"weepinbell",		"baseS":130,	"baseA":172,	"baseD": 95,		"maxcp":1475, },
	{ "dexnumber": 71,		"code":"victreebel",		"baseS":160,	"baseA":207,	"baseD":138,		"maxcp":2268, },
	{ "dexnumber": 72,		"code":"tentacool",		"baseS": 80,	"baseA": 97,	"baseD":182,		"maxcp": 956, },
	{ "dexnumber": 73,		"code":"tentacruel",		"baseS":160,	"baseA":166,	"baseD":237,		"maxcp":2374, },
	{ "dexnumber": 74,		"code":"geodude",			"baseS": 80,	"baseA":132,	"baseD":163,		"maxcp":1193, },
	{ "dexnumber": 75,		"code":"graveler",		"baseS":110,	"baseA":164,	"baseD":196,		"maxcp":1815, },
	{ "dexnumber": 76,		"code":"golem",			"baseS":160,	"baseA":211,	"baseD":229,		"maxcp":2916, },
	{ "dexnumber": 77,		"code":"ponyta",			"baseS":100,	"baseA":170,	"baseD":132,		"maxcp":1502, },
	{ "dexnumber": 78,		"code":"rapidash",		"baseS":130,	"baseA":207,	"baseD":167,		"maxcp":2252, },
	{ "dexnumber": 79,		"code":"slowpoke",		"baseS":180,	"baseA":109,	"baseD":109,		"maxcp":1204, },
	{ "dexnumber": 80,		"code":"slowbro",			"baseS":190,	"baseA":177,	"baseD":194,		"maxcp":2482, },
	{ "dexnumber": 81,		"code":"magnemite",		"baseS": 50,	"baseA":165,	"baseD":128,		"maxcp":1083, },
	{ "dexnumber": 82,		"code":"magneton",		"baseS":100,	"baseA":223,	"baseD":182,		"maxcp":2237, },
	{ "dexnumber": 83,		"code":"farfetchd",		"baseS":104,	"baseA":124,	"baseD":118,		"maxcp":1092, },
	{ "dexnumber": 84,		"code":"doduo",			"baseS": 70,	"baseA":158,	"baseD": 88,		"maxcp":1011, },
	{ "dexnumber": 85,		"code":"dodrio",			"baseS":120,	"baseA":218,	"baseD":145,		"maxcp":2138, },
	{ "dexnumber": 86,		"code":"seel",			"baseS":130,	"baseA": 85,	"baseD":128,		"maxcp": 899, },
	{ "dexnumber": 87,		"code":"dewgong",			"baseS":180,	"baseA":139,	"baseD":184,		"maxcp":1894, },
	{ "dexnumber": 88,		"code":"grimer",			"baseS":160,	"baseA":135,	"baseD": 90,		"maxcp":1269, },
	{ "dexnumber": 89,		"code":"muk",				"baseS":210,	"baseA":190,	"baseD":184,		"maxcp":2709, },
	{ "dexnumber": 90,		"code":"shellder",		"baseS": 60,	"baseA":116,	"baseD":168,		"maxcp": 958, },
	{ "dexnumber": 91,		"code":"cloyster",		"baseS":100,	"baseA":186,	"baseD":323,		"maxcp":2475, },
	{ "dexnumber": 92,		"code":"gastly",			"baseS": 60,	"baseA":186,	"baseD": 70,		"maxcp":1002, },
	{ "dexnumber": 93,		"code":"haunter",			"baseS": 90,	"baseA":223,	"baseD":112,		"maxcp":1716, },
	{ "dexnumber": 94,		"code":"gengar",			"baseS":120,	"baseA":261,	"baseD":156,		"maxcp":2619, },
	{ "dexnumber": 95,		"code":"onix",			"baseS": 70,	"baseA": 85,	"baseD":288,		"maxcp":1002, },
	{ "dexnumber": 96,		"code":"drowzee",			"baseS":120,	"baseA": 89,	"baseD":158,		"maxcp": 992, },
	{ "dexnumber": 97,		"code":"hypno",			"baseS":170,	"baseA":144,	"baseD":215,		"maxcp":2048, },
	{ "dexnumber": 98,		"code":"krabby",			"baseS": 60,	"baseA":181,	"baseD":156,		"maxcp":1386, },
	{ "dexnumber": 99,		"code":"kingler",			"baseS":110,	"baseA":240,	"baseD":214,		"maxcp":2694, },
	{ "dexnumber":100,		"code":"voltorb",			"baseS": 80,	"baseA":109,	"baseD":114,		"maxcp": 857, },
	{ "dexnumber":101,		"code":"electrode",		"baseS":120,	"baseA":173,	"baseD":179,		"maxcp":1900, },
	{ "dexnumber":102,		"code":"exeggcute",		"baseS":120,	"baseA":107,	"baseD":140,		"maxcp":1102, },
	{ "dexnumber":103,		"code":"exeggutor",		"baseS":190,	"baseA":233,	"baseD":158,		"maxcp":2916, },
	{ "dexnumber":104,		"code":"cubone",			"baseS":100,	"baseA": 90,	"baseD":165,		"maxcp": 943, },
	{ "dexnumber":105,		"code":"marowak",			"baseS":120,	"baseA":144,	"baseD":200,		"maxcp":1691, },
	{ "dexnumber":106,		"code":"hitmonlee",		"baseS":100,	"baseA":224,	"baseD":211,		"maxcp":2406, },
	{ "dexnumber":107,		"code":"hitmonchan",		"baseS":100,	"baseA":193,	"baseD":212,		"maxcp":2098, },
	{ "dexnumber":108,		"code":"lickitung",		"baseS":180,	"baseA":108,	"baseD":137,		"maxcp":1322, },
	{ "dexnumber":109,		"code":"koffing",			"baseS": 80,	"baseA":119,	"baseD":164,		"maxcp":1091, },
	{ "dexnumber":110,		"code":"weezing",			"baseS":130,	"baseA":174,	"baseD":221,		"maxcp":2183, },
	{ "dexnumber":111,		"code":"rhyhorn",			"baseS":160,	"baseA":140,	"baseD":157,		"maxcp":1679, },
	{ "dexnumber":112,		"code":"rhydon",			"baseS":210,	"baseA":222,	"baseD":206,		"maxcp":3300, },
	{ "dexnumber":113,		"code":"chansey",			"baseS":500,	"baseA": 60,	"baseD":176,		"maxcp":1469, },
	{ "dexnumber":114,		"code":"tangela",			"baseS":130,	"baseA":183,	"baseD":205,		"maxcp":2208, },
	{ "dexnumber":115,		"code":"kangaskhan",		"baseS":210,	"baseA":181,	"baseD":165,		"maxcp":2463, },
	{ "dexnumber":116,		"code":"horsea",			"baseS": 60,	"baseA":129,	"baseD":125,		"maxcp": 921, },
	{ "dexnumber":117,		"code":"seadra",			"baseS":110,	"baseA":187,	"baseD":182,		"maxcp":1979, },
	{ "dexnumber":118,		"code":"goldeen",			"baseS": 90,	"baseA":123,	"baseD":115,		"maxcp":1006, },
	{ "dexnumber":119,		"code":"seaking",			"baseS":160,	"baseA":175,	"baseD":154,		"maxcp":2040, },
	{ "dexnumber":120,		"code":"staryu",			"baseS": 60,	"baseA":137,	"baseD":112,		"maxcp": 926, },
	{ "dexnumber":121,		"code":"starmie",			"baseS":120,	"baseA":210,	"baseD":184,		"maxcp":2303, },
	{ "dexnumber":122,		"code":"mrmime",			"baseS": 80,	"baseA":192,	"baseD":233,		"maxcp":1984, },
	{ "dexnumber":123,		"code":"scyther",			"baseS":140,	"baseA":218,	"baseD":170,		"maxcp":2464, },
	{ "dexnumber":124,		"code":"jynx",			"baseS":130,	"baseA":223,	"baseD":182,		"maxcp":2512, },
	{ "dexnumber":125,		"code":"electabuzz",		"baseS":130,	"baseA":198,	"baseD":173,		"maxcp":2196, },
	{ "dexnumber":126,		"code":"magmar",			"baseS":130,	"baseA":206,	"baseD":169,		"maxcp":2254, },
	{ "dexnumber":127,		"code":"pinsir",			"baseS":130,	"baseA":238,	"baseD":197,		"maxcp":2770, },
	{ "dexnumber":128,		"code":"tauros",			"baseS":150,	"baseA":198,	"baseD":197,		"maxcp":2488, },
	{ "dexnumber":129,		"code":"magikarp",		"baseS": 40,	"baseA": 29,	"baseD":102,		"maxcp": 220, },
	{ "dexnumber":130,		"code":"gyarados",		"baseS":190,	"baseA":237,	"baseD":197,		"maxcp":3281, },
	{ "dexnumber":131,		"code":"lapras",			"baseS":260,	"baseA":165,	"baseD":180,		"maxcp":2603, },
	{ "dexnumber":132,		"code":"ditto",			"baseS": 96,	"baseA": 91,	"baseD": 91,		"maxcp": 718, },
	{ "dexnumber":133,		"code":"eevee",			"baseS":110,	"baseA":104,	"baseD":121,		"maxcp": 969, },
	{ "dexnumber":134,		"code":"vaporeon",		"baseS":260,	"baseA":205,	"baseD":177,		"maxcp":3157, },
	{ "dexnumber":135,		"code":"jolteon",			"baseS":130,	"baseA":232,	"baseD":201,		"maxcp":2730, },
	{ "dexnumber":136,		"code":"flareon",			"baseS":130,	"baseA":246,	"baseD":204,		"maxcp":2904, },
	{ "dexnumber":137,		"code":"porygon",			"baseS":130,	"baseA":153,	"baseD":139,		"maxcp":1567, },
	{ "dexnumber":138,		"code":"omanyte",			"baseS": 70,	"baseA":155,	"baseD":174,		"maxcp":1345, },
	{ "dexnumber":139,		"code":"omastar",			"baseS":140,	"baseA":207,	"baseD":227,		"maxcp":2685, },
	{ "dexnumber":140,		"code":"kabuto",			"baseS": 60,	"baseA":148,	"baseD":162,		"maxcp":1172, },
	{ "dexnumber":141,		"code":"kabutops",		"baseS":120,	"baseA":220,	"baseD":203,		"maxcp":2517, },
	{ "dexnumber":142,		"code":"aerodactyl",		"baseS":160,	"baseA":221,	"baseD":164,		"maxcp":2608, },
	{ "dexnumber":143,		"code":"snorlax",			"baseS":320,	"baseA":190,	"baseD":190,		"maxcp":3355, },
	{ "dexnumber":147,		"code":"dratini",			"baseS": 82,	"baseA":119,	"baseD": 94,		"maxcp": 860, },
	{ "dexnumber":148,		"code":"dragonair",		"baseS":122,	"baseA":163,	"baseD":138,		"maxcp":1609, },
	{ "dexnumber":149,		"code":"dragonite",		"baseS":182,	"baseA":263,	"baseD":201,		"maxcp":3581, },
	{ "dexnumber":152,		"code":"chikorita",		"baseS": 90,	"baseA": 92,	"baseD":122,		"maxcp": 801, },
	{ "dexnumber":148,		"code":"bayleef",			"baseS":120,	"baseA":122,	"baseD":155,		"maxcp":1296, },
	{ "dexnumber":149,		"code":"meganium",		"baseS":160,	"baseA":168,	"baseD":202,		"maxcp":2227, },
	{ "dexnumber":150,		"code":"cyndaquil",		"baseS": 78,	"baseA":116,	"baseD": 96,		"maxcp": 831, },
	{ "dexnumber":151,		"code":"quilava",			"baseS":116,	"baseA":158,	"baseD":129,		"maxcp":1484, },
	{ "dexnumber":152,		"code":"typhlosion",		"baseS":156,	"baseA":223,	"baseD":176,		"maxcp":2686, },
	{ "dexnumber":153,		"code":"totodile",		"baseS":100,	"baseA":117,	"baseD":116,		"maxcp":1011, },
	{ "dexnumber":154,		"code":"croconaw",		"baseS":130,	"baseA":150,	"baseD":151,		"maxcp":1598, },
	{ "dexnumber":155,		"code":"feraligatr",		"baseS":170,	"baseA":205,	"baseD":197,		"maxcp":2721, },
	{ "dexnumber":156,		"code":"sentret",			"baseS": 70,	"baseA": 79,	"baseD": 77,		"maxcp": 519, },
	{ "dexnumber":157,		"code":"furret",			"baseS":170,	"baseA":148,	"baseD":130,		"maxcp":1667, },
	{ "dexnumber":158,		"code":"hoothoot",		"baseS":120,	"baseA": 67,	"baseD":101,		"maxcp": 640, },
	{ "dexnumber":159,		"code":"noctowl",			"baseS":200,	"baseA":145,	"baseD":179,		"maxcp":2040, },
	{ "dexnumber":160,		"code":"ledyba",			"baseS": 80,	"baseA": 72,	"baseD":142,		"maxcp": 663, },
	{ "dexnumber":161,		"code":"ledian",			"baseS":110,	"baseA":107,	"baseD":209,		"maxcp":1275, },
	{ "dexnumber":162,		"code":"spinarak",		"baseS": 80,	"baseA":105,	"baseD": 73,		"maxcp": 685, },
	{ "dexnumber":163,		"code":"ariados",			"baseS":140,	"baseA":161,	"baseD":128,		"maxcp":1636, },
	{ "dexnumber":164,		"code":"crobat",			"baseS":170,	"baseA":194,	"baseD":178,		"maxcp":2466, },
	{ "dexnumber":165,		"code":"chinchou",		"baseS":150,	"baseA":106,	"baseD":106,		"maxcp":1067, },
	{ "dexnumber":166,		"code":"lanturn",			"baseS":250,	"baseA":146,	"baseD":146,		"maxcp":2077, },
	{ "dexnumber":167,		"code":"pichu",			"baseS": 40,	"baseA": 77,	"baseD": 63,		"maxcp": 376, },
	{ "dexnumber":168,		"code":"cleffa",			"baseS":100,	"baseA": 75,	"baseD": 91,		"maxcp": 620, },
	{ "dexnumber":169,		"code":"igglybuff",		"baseS":180,	"baseA": 69,	"baseD": 34,		"maxcp": 512, },
	{ "dexnumber":170,		"code":"togepi",			"baseS": 70,	"baseA": 67,	"baseD":116,		"maxcp": 540, },
	{ "dexnumber":171,		"code":"togetic",			"baseS":110,	"baseA":139,	"baseD":191,		"maxcp":1543, },
	{ "dexnumber":172,		"code":"natu",			"baseS": 80,	"baseA":134,	"baseD": 89,		"maxcp": 925, },
	{ "dexnumber":173,		"code":"xatu",			"baseS":130,	"baseA":192,	"baseD":146,		"maxcp":1975, },
	{ "dexnumber":174,		"code":"mareep",			"baseS":110,	"baseA":114,	"baseD": 82,		"maxcp": 887, },
	{ "dexnumber":175,		"code":"flaaffy",			"baseS":140,	"baseA":145,	"baseD":112,		"maxcp":1402, },
	{ "dexnumber":176,		"code":"ampharos",		"baseS":180,	"baseA":211,	"baseD":172,		"maxcp":2695, },
	{ "dexnumber":177,		"code":"bellossom",		"baseS":150,	"baseA":169,	"baseD":189,		"maxcp":2108, },
	{ "dexnumber":178,		"code":"marill",			"baseS":140,	"baseA": 37,	"baseD": 93,		"maxcp": 420, },
	{ "dexnumber":179,		"code":"azumarill",		"baseS":200,	"baseA":112,	"baseD":152,		"maxcp":1503, },
	{ "dexnumber":180,		"code":"sudowoodo",		"baseS":140,	"baseA":167,	"baseD":198,		"maxcp":2065, },
	{ "dexnumber":181,		"code":"politoed",		"baseS":180,	"baseA":174,	"baseD":192,		"maxcp":2371, },
	{ "dexnumber":182,		"code":"hoppip",			"baseS": 70,	"baseA": 67,	"baseD":101,		"maxcp": 508, },
	{ "dexnumber":183,		"code":"skiploom",		"baseS":110,	"baseA": 91,	"baseD":127,		"maxcp": 882, },
	{ "dexnumber":184,		"code":"jumpluff",		"baseS":150,	"baseA":118,	"baseD":197,		"maxcp":1553, },
	{ "dexnumber":185,		"code":"aipom",			"baseS":110,	"baseA":136,	"baseD":112,		"maxcp":1188, },
	{ "dexnumber":186,		"code":"sunkern",			"baseS": 60,	"baseA": 55,	"baseD": 55,		"maxcp": 316, },
	{ "dexnumber":187,		"code":"sunflora",		"baseS":150,	"baseA":185,	"baseD":148,		"maxcp":2048, },
	{ "dexnumber":188,		"code":"yanma",			"baseS":130,	"baseA":154,	"baseD": 94,		"maxcp":1326, },
	{ "dexnumber":189,		"code":"wooper",			"baseS":110,	"baseA": 75,	"baseD": 75,		"maxcp": 596, },
	{ "dexnumber":190,		"code":"quagsire",		"baseS":190,	"baseA":152,	"baseD":152,		"maxcp":1929, },
	{ "dexnumber":191,		"code":"espeon",			"baseS":130,	"baseA":261,	"baseD":194,		"maxcp":3000, },
	{ "dexnumber":192,		"code":"umbreon",			"baseS":190,	"baseA":126,	"baseD":250,		"maxcp":2052, },
	{ "dexnumber":193,		"code":"murkrow",			"baseS":120,	"baseA":175,	"baseD": 87,		"maxcp":1392, },
	{ "dexnumber":194,		"code":"slowking",		"baseS":190,	"baseA":177,	"baseD":194,		"maxcp":2482, },
	{ "dexnumber":195,		"code":"misdreavus",		"baseS":120,	"baseA":167,	"baseD":167,		"maxcp":1781, },
	{ "dexnumber":196,		"code":"unown",			"baseS": 96,	"baseA":136,	"baseD": 91,		"maxcp":1022, },
	{ "dexnumber":197,		"code":"wobbuffet",		"baseS":380,	"baseA": 60,	"baseD":106,		"maxcp":1024, },
	{ "dexnumber":198,		"code":"girafarig",		"baseS":140,	"baseA":182,	"baseD":133,		"maxcp":1863, },
	{ "dexnumber":199,		"code":"pineco",			"baseS":100,	"baseA":108,	"baseD":146,		"maxcp":1045, },
	{ "dexnumber":200,		"code":"forretress",		"baseS":150,	"baseA":161,	"baseD":242,		"maxcp":2263, },
	{ "dexnumber":201,		"code":"dunsparce",		"baseS":200,	"baseA":131,	"baseD":131,		"maxcp":1615, },
	{ "dexnumber":202,		"code":"gligar",			"baseS":130,	"baseA":143,	"baseD":204,		"maxcp":1758, },
	{ "dexnumber":203,		"code":"steelix",			"baseS":150,	"baseA":148,	"baseD":333,		"maxcp":2439, },
	{ "dexnumber":204,		"code":"snubbull",		"baseS":120,	"baseA":137,	"baseD": 89,		"maxcp":1124, },
	{ "dexnumber":205,		"code":"granbull",		"baseS":180,	"baseA":212,	"baseD":137,		"maxcp":2440, },
	{ "dexnumber":206,		"code":"qwilfish",		"baseS":130,	"baseA":184,	"baseD":148,		"maxcp":1910, },
	{ "dexnumber":207,		"code":"scizor",			"baseS":140,	"baseA":236,	"baseD":191,		"maxcp":2801, },
	{ "dexnumber":208,		"code":"shuckle",			"baseS": 40,	"baseA": 17,	"baseD":396,		"maxcp": 300, },
	{ "dexnumber":209,		"code":"heracross",		"baseS":160,	"baseA":234,	"baseD":189,		"maxcp":2938, },
	{ "dexnumber":210,		"code":"sneasel",			"baseS":110,	"baseA":189,	"baseD":157,		"maxcp":1868, },
	{ "dexnumber":211,		"code":"teddiursa",		"baseS":120,	"baseA":142,	"baseD": 93,		"maxcp":1184, },
	{ "dexnumber":212,		"code":"ursaring",		"baseS":180,	"baseA":236,	"baseD":144,		"maxcp":2760, },
	{ "dexnumber":213,		"code":"slugma",			"baseS": 80,	"baseA":118,	"baseD": 71,		"maxcp": 750, },
	{ "dexnumber":214,		"code":"magcargo",		"baseS":100,	"baseA":139,	"baseD":209,		"maxcp":1543, },
	{ "dexnumber":215,		"code":"swinub",			"baseS":100,	"baseA": 90,	"baseD": 74,		"maxcp": 663, },
	{ "dexnumber":216,		"code":"piloswine",		"baseS":200,	"baseA":181,	"baseD":147,		"maxcp":2284, },
	{ "dexnumber":217,		"code":"corsola",			"baseS":110,	"baseA":118,	"baseD":156,		"maxcp":1214, },
	{ "dexnumber":218,		"code":"remoraid",		"baseS": 70,	"baseA":127,	"baseD": 69,		"maxcp": 749, },
	{ "dexnumber":219,		"code":"octillery",		"baseS":150,	"baseA":197,	"baseD":141,		"maxcp":2124, },
	{ "dexnumber":226,		"code":"mantine",			"baseS":130,	"baseA":148,	"baseD":260,		"maxcp":2032, },
	{ "dexnumber":221,		"code":"skarmory",		"baseS":130,	"baseA":148,	"baseD":260,		"maxcp":2032, },
	{ "dexnumber":222,		"code":"houndour",		"baseS": 90,	"baseA":152,	"baseD": 93,		"maxcp":1110, },
	{ "dexnumber":223,		"code":"houndoom",		"baseS":150,	"baseA":224,	"baseD":159,		"maxcp":2529, },
	{ "dexnumber":224,		"code":"kingdra",			"baseS":150,	"baseA":194,	"baseD":194,		"maxcp":2424, },
	{ "dexnumber":225,		"code":"phanpy",			"baseS":180,	"baseA":107,	"baseD":107,		"maxcp":1175, },
	{ "dexnumber":226,		"code":"donphan",			"baseS":180,	"baseA":214,	"baseD":214,		"maxcp":3022, },
	{ "dexnumber":227,		"code":"porygon2",		"baseS":170,	"baseA":198,	"baseD":183,		"maxcp":2546, },
	{ "dexnumber":228,		"code":"stantler",		"baseS":146,	"baseA":192,	"baseD":132,		"maxcp":1988, },
	{ "dexnumber":236,		"code":"tyrogue",			"baseS": 70,	"baseA": 64,	"baseD": 64,		"maxcp": 404, },
	{ "dexnumber":230,		"code":"hitmontop",		"baseS":100,	"baseA":173,	"baseD":214,		"maxcp":1905, },
	{ "dexnumber":231,		"code":"smoochum",		"baseS": 90,	"baseA":153,	"baseD":116,		"maxcp":1230, },
	{ "dexnumber":232,		"code":"elekid",			"baseS": 90,	"baseA":135,	"baseD":110,		"maxcp":1073, },
	{ "dexnumber":233,		"code":"magby",			"baseS": 90,	"baseA":151,	"baseD":108,		"maxcp":1178, },
	{ "dexnumber":234,		"code":"miltank",			"baseS":190,	"baseA":157,	"baseD":211,		"maxcp":2312, },
	{ "dexnumber":235,		"code":"blissey",			"baseS":510,	"baseA":129,	"baseD":229,		"maxcp":3219, },
	{ "dexnumber":246,		"code":"larvitar",		"baseS":100,	"baseA":115,	"baseD": 93,		"maxcp": 904, },
	{ "dexnumber":247,		"code":"pupitar",			"baseS":140,	"baseA":155,	"baseD":133,		"maxcp":1608, },
	{ "dexnumber":248,		"code":"tyranitar",		"baseS":200,	"baseA":251,	"baseD":212,		"maxcp":3670, },
];

var data_pokemon_stats = new Map();
data_pokemon_stats.set('bulbasaur',		{ 'number':  1,	'stigmata': 90,	'attack':118,	'defense':118,	'maxcp': 981, });																
data_pokemon_stats.set('ivysaur',		{ 'number':  2,	'stigmata':120,	'attack':151,	'defense':151,	'maxcp':1552, });																
data_pokemon_stats.set('venusaur',		{ 'number':  3,	'stigmata':160,	'attack':198,	'defense':198,	'maxcp':2568, });																
data_pokemon_stats.set('charmander',	{ 'number':  4,	'stigmata': 78,	'attack':116,	'defense': 96,	'maxcp': 831, });																
data_pokemon_stats.set('charmeleon',	{ 'number':  5,	'stigmata':116,	'attack':158,	'defense':129,	'maxcp':1484, });																
data_pokemon_stats.set('charizard',		{ 'number':  6,	'stigmata':156,	'attack':223,	'defense':176,	'maxcp':2686, });																
data_pokemon_stats.set('squirtle',		{ 'number':  7,	'stigmata': 88,	'attack': 94,	'defense':122,	'maxcp': 808, });																
data_pokemon_stats.set('wartortle',		{ 'number':  8,	'stigmata':118,	'attack':126,	'defense':155,	'maxcp':1324, });																
data_pokemon_stats.set('blastoise',		{ 'number':  9,	'stigmata':158,	'attack':171,	'defense':210,	'maxcp':2291, });																
data_pokemon_stats.set('caterpie',		{ 'number': 10,	'stigmata': 90,	'attack': 55,	'defense': 62,	'maxcp': 393, });																
data_pokemon_stats.set('metapod',		{ 'number': 11,	'stigmata':100,	'attack': 45,	'defense': 94,	'maxcp': 419, });																
data_pokemon_stats.set('butterfree',	{ 'number': 12,	'stigmata':120,	'attack':167,	'defense':151,	'maxcp':1701, });																
data_pokemon_stats.set('weedle',		{ 'number': 13,	'stigmata': 80,	'attack': 63,	'defense': 55,	'maxcp': 397, });																
data_pokemon_stats.set('kakuna',		{ 'number': 14,	'stigmata': 90,	'attack': 46,	'defense': 86,	'maxcp': 392, });																
data_pokemon_stats.set('beedrill',		{ 'number': 15,	'stigmata':130,	'attack':169,	'defense':150,	'maxcp':1777, });																
data_pokemon_stats.set('pidgey',		{ 'number': 16,	'stigmata': 80,	'attack': 85,	'defense': 76,	'maxcp': 580, });																
data_pokemon_stats.set('pidgeotto',		{ 'number': 17,	'stigmata':126,	'attack':117,	'defense':108,	'maxcp':1085, });																
data_pokemon_stats.set('pidgeot',		{ 'number': 18,	'stigmata':166,	'attack':166,	'defense':157,	'maxcp':1994, });																
data_pokemon_stats.set('rattata',		{ 'number': 19,	'stigmata': 60,	'attack':103,	'defense': 70,	'maxcp': 588, });																
data_pokemon_stats.set('raticate',		{ 'number': 20,	'stigmata':110,	'attack':161,	'defense':144,	'maxcp':1549, });																
data_pokemon_stats.set('spearow',		{ 'number': 21,	'stigmata': 80,	'attack':112,	'defense': 61,	'maxcp': 673, });																
data_pokemon_stats.set('fearow',		{ 'number': 22,	'stigmata':130,	'attack':182,	'defense':135,	'maxcp':1814, });																
data_pokemon_stats.set('ekans',			{ 'number': 23,	'stigmata': 70,	'attack':110,	'defense':102,	'maxcp': 778, });																
data_pokemon_stats.set('arbok',			{ 'number': 24,	'stigmata':120,	'attack':167,	'defense':158,	'maxcp':1737, });																
data_pokemon_stats.set('pikachu',		{ 'number': 25,	'stigmata': 70,	'attack':112,	'defense':101,	'maxcp': 787, });																
data_pokemon_stats.set('raichu',		{ 'number': 26,	'stigmata':120,	'attack':193,	'defense':165,	'maxcp':2025, });																
data_pokemon_stats.set('sandshrew',		{ 'number': 27,	'stigmata':100,	'attack':126,	'defense':145,	'maxcp':1194, });																
data_pokemon_stats.set('sandslash',		{ 'number': 28,	'stigmata':150,	'attack':182,	'defense':202,	'maxcp':2328, });																
data_pokemon_stats.set('nidoranfemale',	{ 'number': 29,	'stigmata':110,	'attack': 86,	'defense': 94,	'maxcp': 736, });																
data_pokemon_stats.set('nidorina',		{ 'number': 30,	'stigmata':140,	'attack':117,	'defense':126,	'maxcp':1218, });																
data_pokemon_stats.set('nidoqueen',		{ 'number': 31,	'stigmata':180,	'attack':180,	'defense':174,	'maxcp':2338, });																
data_pokemon_stats.set('nidoranmale',	{ 'number': 32,	'stigmata': 92,	'attack':105,	'defense': 76,	'maxcp': 739, });																
data_pokemon_stats.set('nidorino',		{ 'number': 33,	'stigmata':122,	'attack':137,	'defense':112,	'maxcp':1252, });																
data_pokemon_stats.set('nidoking',		{ 'number': 34,	'stigmata':162,	'attack':204,	'defense':157,	'maxcp':2386, });																
data_pokemon_stats.set('clefairy',		{ 'number': 35,	'stigmata':140,	'attack':107,	'defense':116,	'maxcp':1085, });																
data_pokemon_stats.set('clefable',		{ 'number': 36,	'stigmata':190,	'attack':178,	'defense':171,	'maxcp':2353, });																
data_pokemon_stats.set('vulpix',		{ 'number': 37,	'stigmata': 76,	'attack': 96,	'defense':122,	'maxcp': 774, });																
data_pokemon_stats.set('ninetales',		{ 'number': 38,	'stigmata':146,	'attack':169,	'defense':204,	'maxcp':2157, });																
data_pokemon_stats.set('jigglypuff',	{ 'number': 39,	'stigmata':230,	'attack': 80,	'defense': 44,	'maxcp': 713, });																
data_pokemon_stats.set('wigglytuff',	{ 'number': 40,	'stigmata':280,	'attack':156,	'defense': 93,	'maxcp':1906, });																
data_pokemon_stats.set('zubat',			{ 'number': 41,	'stigmata': 80,	'attack': 83,	'defense': 76,	'maxcp': 569, });																
data_pokemon_stats.set('golbat',		{ 'number': 42,	'stigmata':150,	'attack':161,	'defense':153,	'maxcp':1830, });																
data_pokemon_stats.set('oddish',		{ 'number': 43,	'stigmata': 90,	'attack':131,	'defense':116,	'maxcp':1069, });																
data_pokemon_stats.set('gloom',			{ 'number': 44,	'stigmata':120,	'attack':153,	'defense':139,	'maxcp':1512, });																
data_pokemon_stats.set('vileplume',		{ 'number': 45,	'stigmata':150,	'attack':202,	'defense':170,	'maxcp':2367, });																
data_pokemon_stats.set('paras',			{ 'number': 46,	'stigmata': 70,	'attack':121,	'defense': 99,	'maxcp': 836, });																
data_pokemon_stats.set('parasect',		{ 'number': 47,	'stigmata':120,	'attack':165,	'defense':146,	'maxcp':1657, });																
data_pokemon_stats.set('venonat',		{ 'number': 48,	'stigmata':120,	'attack':100,	'defense':102,	'maxcp': 902, });																
data_pokemon_stats.set('venomoth',		{ 'number': 49,	'stigmata':140,	'attack':179,	'defense':150,	'maxcp':1937, });																
data_pokemon_stats.set('diglett',		{ 'number': 50,	'stigmata': 20,	'attack':109,	'defense': 88,	'maxcp': 465, });																
data_pokemon_stats.set('dugtrio',		{ 'number': 51,	'stigmata': 70,	'attack':167,	'defense':147,	'maxcp':1333, });																
data_pokemon_stats.set('meowth',		{ 'number': 52,	'stigmata': 80,	'attack': 92,	'defense': 81,	'maxcp': 638, });																
data_pokemon_stats.set('persian',		{ 'number': 53,	'stigmata':130,	'attack':150,	'defense':139,	'maxcp':1539, });																
data_pokemon_stats.set('psyduck',		{ 'number': 54,	'stigmata':100,	'attack':122,	'defense': 96,	'maxcp': 966, });																
data_pokemon_stats.set('golduck',		{ 'number': 55,	'stigmata':160,	'attack':191,	'defense':163,	'maxcp':2270, });																
data_pokemon_stats.set('mankey',		{ 'number': 56,	'stigmata': 80,	'attack':148,	'defense': 87,	'maxcp':1002, });																
data_pokemon_stats.set('primeape',		{ 'number': 57,	'stigmata':130,	'attack':207,	'defense':144,	'maxcp':2105, });																
data_pokemon_stats.set('growlithe',		{ 'number': 58,	'stigmata':110,	'attack':136,	'defense': 96,	'maxcp':1110, });																
data_pokemon_stats.set('arcanine',		{ 'number': 59,	'stigmata':180,	'attack':227,	'defense':166,	'maxcp':2839, });																
data_pokemon_stats.set('poliwag',		{ 'number': 60,	'stigmata': 80,	'attack':101,	'defense': 82,	'maxcp': 695, });																
data_pokemon_stats.set('poliwhirl',		{ 'number': 61,	'stigmata':130,	'attack':130,	'defense':130,	'maxcp':1313, });																
data_pokemon_stats.set('poliwrath',		{ 'number': 62,	'stigmata':180,	'attack':182,	'defense':187,	'maxcp':2441, });																
data_pokemon_stats.set('abra',			{ 'number': 63,	'stigmata': 50,	'attack':195,	'defense':103,	'maxcp':1148, });																
data_pokemon_stats.set('kadabra',		{ 'number': 64,	'stigmata': 80,	'attack':232,	'defense':138,	'maxcp':1859, });																
data_pokemon_stats.set('alakazam',		{ 'number': 65,	'stigmata':110,	'attack':271,	'defense':194,	'maxcp':2887, });																
data_pokemon_stats.set('machop',		{ 'number': 66,	'stigmata':140,	'attack':137,	'defense': 88,	'maxcp':1199, });																
data_pokemon_stats.set('machoke',		{ 'number': 67,	'stigmata':160,	'attack':177,	'defense':130,	'maxcp':1910, });																
data_pokemon_stats.set('machamp',		{ 'number': 68,	'stigmata':180,	'attack':234,	'defense':162,	'maxcp':2889, });																
data_pokemon_stats.set('bellsprout',	{ 'number': 69,	'stigmata':100,	'attack':139,	'defense': 64,	'maxcp': 916, });																
data_pokemon_stats.set('weepinbell',	{ 'number': 70,	'stigmata':130,	'attack':172,	'defense': 95,	'maxcp':1475, });																
data_pokemon_stats.set('victreebel',	{ 'number': 71,	'stigmata':160,	'attack':207,	'defense':138,	'maxcp':2268, });																
data_pokemon_stats.set('tentacool',		{ 'number': 72,	'stigmata': 80,	'attack': 97,	'defense':182,	'maxcp': 956, });																
data_pokemon_stats.set('tentacruel',	{ 'number': 73,	'stigmata':160,	'attack':166,	'defense':237,	'maxcp':2374, });																
data_pokemon_stats.set('geodude',		{ 'number': 74,	'stigmata': 80,	'attack':132,	'defense':163,	'maxcp':1193, });																
data_pokemon_stats.set('graveler',		{ 'number': 75,	'stigmata':110,	'attack':164,	'defense':196,	'maxcp':1815, });																
data_pokemon_stats.set('golem',			{ 'number': 76,	'stigmata':160,	'attack':211,	'defense':229,	'maxcp':2916, });																
data_pokemon_stats.set('ponyta',		{ 'number': 77,	'stigmata':100,	'attack':170,	'defense':132,	'maxcp':1502, });																
data_pokemon_stats.set('rapidash',		{ 'number': 78,	'stigmata':130,	'attack':207,	'defense':167,	'maxcp':2252, });																
data_pokemon_stats.set('slowpoke',		{ 'number': 79,	'stigmata':180,	'attack':109,	'defense':109,	'maxcp':1204, });																
data_pokemon_stats.set('slowbro',		{ 'number': 80,	'stigmata':190,	'attack':177,	'defense':194,	'maxcp':2482, });																
data_pokemon_stats.set('magnemite',		{ 'number': 81,	'stigmata': 50,	'attack':165,	'defense':128,	'maxcp':1083, });																
data_pokemon_stats.set('magneton',		{ 'number': 82,	'stigmata':100,	'attack':223,	'defense':182,	'maxcp':2237, });																
data_pokemon_stats.set('farfetchd',		{ 'number': 83,	'stigmata':104,	'attack':124,	'defense':118,	'maxcp':1092, });																
data_pokemon_stats.set('doduo',			{ 'number': 84,	'stigmata': 70,	'attack':158,	'defense': 88,	'maxcp':1011, });																
data_pokemon_stats.set('dodrio',		{ 'number': 85,	'stigmata':120,	'attack':218,	'defense':145,	'maxcp':2138, });																
data_pokemon_stats.set('seel',			{ 'number': 86,	'stigmata':130,	'attack': 85,	'defense':128,	'maxcp': 899, });																
data_pokemon_stats.set('dewgong',		{ 'number': 87,	'stigmata':180,	'attack':139,	'defense':184,	'maxcp':1894, });																
data_pokemon_stats.set('grimer',		{ 'number': 88,	'stigmata':160,	'attack':135,	'defense': 90,	'maxcp':1269, });																
data_pokemon_stats.set('muk',			{ 'number': 89,	'stigmata':210,	'attack':190,	'defense':184,	'maxcp':2709, });																
data_pokemon_stats.set('shellder',		{ 'number': 90,	'stigmata': 60,	'attack':116,	'defense':168,	'maxcp': 958, });																
data_pokemon_stats.set('cloyster',		{ 'number': 91,	'stigmata':100,	'attack':186,	'defense':323,	'maxcp':2475, });																
data_pokemon_stats.set('gastly',		{ 'number': 92,	'stigmata': 60,	'attack':186,	'defense': 70,	'maxcp':1002, });																
data_pokemon_stats.set('haunter',		{ 'number': 93,	'stigmata': 90,	'attack':223,	'defense':112,	'maxcp':1716, });																
data_pokemon_stats.set('gengar',		{ 'number': 94,	'stigmata':120,	'attack':261,	'defense':156,	'maxcp':2619, });																
data_pokemon_stats.set('onix',			{ 'number': 95,	'stigmata': 70,	'attack': 85,	'defense':288,	'maxcp':1002, });																
data_pokemon_stats.set('drowzee',		{ 'number': 96,	'stigmata':120,	'attack': 89,	'defense':158,	'maxcp': 992, });																
data_pokemon_stats.set('hypno',			{ 'number': 97,	'stigmata':170,	'attack':144,	'defense':215,	'maxcp':2048, });																
data_pokemon_stats.set('krabby',		{ 'number': 98,	'stigmata': 60,	'attack':181,	'defense':156,	'maxcp':1386, });																
data_pokemon_stats.set('kingler',		{ 'number': 99,	'stigmata':110,	'attack':240,	'defense':214,	'maxcp':2694, });																
data_pokemon_stats.set('voltorb',		{ 'number':100,	'stigmata': 80,	'attack':109,	'defense':114,	'maxcp': 857, });																
data_pokemon_stats.set('electrode',		{ 'number':101,	'stigmata':120,	'attack':173,	'defense':179,	'maxcp':1900, });																
data_pokemon_stats.set('exeggcute',		{ 'number':102,	'stigmata':120,	'attack':107,	'defense':140,	'maxcp':1102, });																
data_pokemon_stats.set('exeggutor',		{ 'number':103,	'stigmata':190,	'attack':233,	'defense':158,	'maxcp':2916, });																
data_pokemon_stats.set('cubone',		{ 'number':104,	'stigmata':100,	'attack': 90,	'defense':165,	'maxcp': 943, });																
data_pokemon_stats.set('marowak',		{ 'number':105,	'stigmata':120,	'attack':144,	'defense':200,	'maxcp':1691, });																
data_pokemon_stats.set('hitmonlee',		{ 'number':106,	'stigmata':100,	'attack':224,	'defense':211,	'maxcp':2406, });																
data_pokemon_stats.set('hitmonchan',	{ 'number':107,	'stigmata':100,	'attack':193,	'defense':212,	'maxcp':2098, });																
data_pokemon_stats.set('lickitung',		{ 'number':108,	'stigmata':180,	'attack':108,	'defense':137,	'maxcp':1322, });																
data_pokemon_stats.set('koffing',		{ 'number':109,	'stigmata': 80,	'attack':119,	'defense':164,	'maxcp':1091, });																
data_pokemon_stats.set('weezing',		{ 'number':110,	'stigmata':130,	'attack':174,	'defense':221,	'maxcp':2183, });																
data_pokemon_stats.set('rhyhorn',		{ 'number':111,	'stigmata':160,	'attack':140,	'defense':157,	'maxcp':1679, });																
data_pokemon_stats.set('rhydon',		{ 'number':112,	'stigmata':210,	'attack':222,	'defense':206,	'maxcp':3300, });																
data_pokemon_stats.set('chansey',		{ 'number':113,	'stigmata':500,	'attack': 60,	'defense':176,	'maxcp':1469, });																
data_pokemon_stats.set('tangela',		{ 'number':114,	'stigmata':130,	'attack':183,	'defense':205,	'maxcp':2208, });																
data_pokemon_stats.set('kangaskhan',	{ 'number':115,	'stigmata':210,	'attack':181,	'defense':165,	'maxcp':2463, });																
data_pokemon_stats.set('horsea',		{ 'number':116,	'stigmata': 60,	'attack':129,	'defense':125,	'maxcp': 921, });																
data_pokemon_stats.set('seadra',		{ 'number':117,	'stigmata':110,	'attack':187,	'defense':182,	'maxcp':1979, });																
data_pokemon_stats.set('goldeen',		{ 'number':118,	'stigmata': 90,	'attack':123,	'defense':115,	'maxcp':1006, });																
data_pokemon_stats.set('seaking',		{ 'number':119,	'stigmata':160,	'attack':175,	'defense':154,	'maxcp':2040, });																
data_pokemon_stats.set('staryu',		{ 'number':120,	'stigmata': 60,	'attack':137,	'defense':112,	'maxcp': 926, });																
data_pokemon_stats.set('starmie',		{ 'number':121,	'stigmata':120,	'attack':210,	'defense':184,	'maxcp':2303, });																
data_pokemon_stats.set('mrmime',		{ 'number':122,	'stigmata': 80,	'attack':192,	'defense':233,	'maxcp':1984, });																
data_pokemon_stats.set('scyther',		{ 'number':123,	'stigmata':140,	'attack':218,	'defense':170,	'maxcp':2464, });																
data_pokemon_stats.set('jynx',			{ 'number':124,	'stigmata':130,	'attack':223,	'defense':182,	'maxcp':2512, });																
data_pokemon_stats.set('electabuzz',	{ 'number':125,	'stigmata':130,	'attack':198,	'defense':173,	'maxcp':2196, });																
data_pokemon_stats.set('magmar',		{ 'number':126,	'stigmata':130,	'attack':206,	'defense':169,	'maxcp':2254, });																
data_pokemon_stats.set('pinsir',		{ 'number':127,	'stigmata':130,	'attack':238,	'defense':197,	'maxcp':2770, });																
data_pokemon_stats.set('tauros',		{ 'number':128,	'stigmata':150,	'attack':198,	'defense':197,	'maxcp':2488, });																
data_pokemon_stats.set('magikarp',		{ 'number':129,	'stigmata': 40,	'attack': 29,	'defense':102,	'maxcp': 220, });																
data_pokemon_stats.set('gyarados',		{ 'number':130,	'stigmata':190,	'attack':237,	'defense':197,	'maxcp':3281, });																
data_pokemon_stats.set('lapras',		{ 'number':131,	'stigmata':260,	'attack':165,	'defense':180,	'maxcp':2603, });																
data_pokemon_stats.set('ditto',			{ 'number':132,	'stigmata': 96,	'attack': 91,	'defense': 91,	'maxcp': 718, });																
data_pokemon_stats.set('eevee',			{ 'number':133,	'stigmata':110,	'attack':104,	'defense':121,	'maxcp': 969, });																
data_pokemon_stats.set('vaporeon',		{ 'number':134,	'stigmata':260,	'attack':205,	'defense':177,	'maxcp':3157, });																
data_pokemon_stats.set('jolteon',		{ 'number':135,	'stigmata':130,	'attack':232,	'defense':201,	'maxcp':2730, });																
data_pokemon_stats.set('flareon',		{ 'number':136,	'stigmata':130,	'attack':246,	'defense':204,	'maxcp':2904, });																
data_pokemon_stats.set('porygon',		{ 'number':137,	'stigmata':130,	'attack':153,	'defense':139,	'maxcp':1567, });																
data_pokemon_stats.set('omanyte',		{ 'number':138,	'stigmata': 70,	'attack':155,	'defense':174,	'maxcp':1345, });																
data_pokemon_stats.set('omastar',		{ 'number':139,	'stigmata':140,	'attack':207,	'defense':227,	'maxcp':2685, });																
data_pokemon_stats.set('kabuto',		{ 'number':140,	'stigmata': 60,	'attack':148,	'defense':162,	'maxcp':1172, });																
data_pokemon_stats.set('kabutops',		{ 'number':141,	'stigmata':120,	'attack':220,	'defense':203,	'maxcp':2517, });																
data_pokemon_stats.set('aerodactyl',	{ 'number':142,	'stigmata':160,	'attack':221,	'defense':164,	'maxcp':2608, });																
data_pokemon_stats.set('snorlax',		{ 'number':143,	'stigmata':320,	'attack':190,	'defense':190,	'maxcp':3355, });																
data_pokemon_stats.set('dratini',		{ 'number':147,	'stigmata': 82,	'attack':119,	'defense': 94,	'maxcp': 860, });																
data_pokemon_stats.set('dragonair',		{ 'number':148,	'stigmata':122,	'attack':163,	'defense':138,	'maxcp':1609, });																
data_pokemon_stats.set('dragonite',		{ 'number':149,	'stigmata':182,	'attack':263,	'defense':201,	'maxcp':3581, });																
data_pokemon_stats.set('chikorita',		{ 'number':152,	'stigmata': 90,	'attack': 92,	'defense':122,	'maxcp': 801, });																
data_pokemon_stats.set('bayleef',		{ 'number':148,	'stigmata':120,	'attack':122,	'defense':155,	'maxcp':3355, });																
data_pokemon_stats.set('meganium',		{ 'number':149,	'stigmata':160,	'attack':168,	'defense':202,	'maxcp':2227, });																
data_pokemon_stats.set('cyndaquil',		{ 'number':150,	'stigmata': 78,	'attack':116,	'defense': 96,	'maxcp': 831, });																
data_pokemon_stats.set('quilava',		{ 'number':151,	'stigmata':116,	'attack':158,	'defense':129,	'maxcp':1484, });																
data_pokemon_stats.set('typhlosion',	{ 'number':152,	'stigmata':156,	'attack':223,	'defense':176,	'maxcp':2686, });																
data_pokemon_stats.set('totodile',		{ 'number':153,	'stigmata':100,	'attack':117,	'defense':116,	'maxcp':1011, });																
data_pokemon_stats.set('croconaw',		{ 'number':154,	'stigmata':130,	'attack':150,	'defense':151,	'maxcp':1598, });																
data_pokemon_stats.set('feraligatr',	{ 'number':155,	'stigmata':170,	'attack':205,	'defense':197,	'maxcp':2721, });																
data_pokemon_stats.set('sentret',		{ 'number':156,	'stigmata': 70,	'attack': 79,	'defense': 77,	'maxcp': 519, });																
data_pokemon_stats.set('furret',		{ 'number':157,	'stigmata':170,	'attack':148,	'defense':130,	'maxcp':1667, });																
data_pokemon_stats.set('hoothoot',		{ 'number':158,	'stigmata':120,	'attack': 67,	'defense':101,	'maxcp': 640, });																
data_pokemon_stats.set('noctowl',		{ 'number':159,	'stigmata':200,	'attack':145,	'defense':179,	'maxcp':2040, });																
data_pokemon_stats.set('ledyba',		{ 'number':160,	'stigmata': 80,	'attack': 72,	'defense':142,	'maxcp': 663, });																
data_pokemon_stats.set('ledian',		{ 'number':161,	'stigmata':110,	'attack':107,	'defense':209,	'maxcp':1275, });																
data_pokemon_stats.set('spinarak',		{ 'number':162,	'stigmata': 80,	'attack':105,	'defense': 73,	'maxcp': 685, });																
data_pokemon_stats.set('ariados',		{ 'number':163,	'stigmata':140,	'attack':161,	'defense':128,	'maxcp':1636, });																
data_pokemon_stats.set('crobat',		{ 'number':164,	'stigmata':170,	'attack':194,	'defense':178,	'maxcp':2466, });																
data_pokemon_stats.set('chinchou',		{ 'number':165,	'stigmata':150,	'attack':106,	'defense':106,	'maxcp':1067, });																
data_pokemon_stats.set('lanturn',		{ 'number':166,	'stigmata':250,	'attack':146,	'defense':146,	'maxcp':2077, });																
data_pokemon_stats.set('pichu',			{ 'number':167,	'stigmata': 40,	'attack': 77,	'defense': 63,	'maxcp': 376, });																
data_pokemon_stats.set('cleffa',		{ 'number':168,	'stigmata':100,	'attack': 75,	'defense': 91,	'maxcp': 620, });																
data_pokemon_stats.set('igglybuff',		{ 'number':169,	'stigmata':180,	'attack': 69,	'defense': 34,	'maxcp': 512, });																
data_pokemon_stats.set('togepi',		{ 'number':170,	'stigmata': 70,	'attack': 67,	'defense':116,	'maxcp': 540, });																
data_pokemon_stats.set('togetic',		{ 'number':171,	'stigmata':110,	'attack':139,	'defense':191,	'maxcp':1543, });																
data_pokemon_stats.set('natu',			{ 'number':172,	'stigmata': 80,	'attack':134,	'defense': 89,	'maxcp': 925, });																
data_pokemon_stats.set('xatu',			{ 'number':173,	'stigmata':130,	'attack':192,	'defense':146,	'maxcp':1975, });																
data_pokemon_stats.set('mareep',		{ 'number':174,	'stigmata':110,	'attack':114,	'defense': 82,	'maxcp': 887, });																
data_pokemon_stats.set('flaaffy',		{ 'number':175,	'stigmata':140,	'attack':145,	'defense':112,	'maxcp':1402, });																
data_pokemon_stats.set('ampharos',		{ 'number':176,	'stigmata':180,	'attack':211,	'defense':172,	'maxcp':2695, });																
data_pokemon_stats.set('bellossom',		{ 'number':177,	'stigmata':150,	'attack':169,	'defense':189,	'maxcp':2108, });																
data_pokemon_stats.set('marill',		{ 'number':178,	'stigmata':140,	'attack': 37,	'defense': 93,	'maxcp': 420, });																
data_pokemon_stats.set('azumarill',		{ 'number':179,	'stigmata':200,	'attack':112,	'defense':152,	'maxcp':1503, });																
data_pokemon_stats.set('sudowoodo',		{ 'number':180,	'stigmata':140,	'attack':167,	'defense':198,	'maxcp':2065, });																
data_pokemon_stats.set('politoed',		{ 'number':181,	'stigmata':180,	'attack':174,	'defense':192,	'maxcp':2371, });																
data_pokemon_stats.set('hoppip',		{ 'number':182,	'stigmata': 70,	'attack': 67,	'defense':101,	'maxcp': 508, });																
data_pokemon_stats.set('skiploom',		{ 'number':183,	'stigmata':110,	'attack': 91,	'defense':127,	'maxcp': 882, });																
data_pokemon_stats.set('jumpluff',		{ 'number':184,	'stigmata':150,	'attack':118,	'defense':197,	'maxcp':1553, });																
data_pokemon_stats.set('aipom',			{ 'number':185,	'stigmata':110,	'attack':136,	'defense':112,	'maxcp':1188, });																
data_pokemon_stats.set('sunkern',		{ 'number':186,	'stigmata': 60,	'attack': 55,	'defense': 55,	'maxcp': 316, });																
data_pokemon_stats.set('sunflora',		{ 'number':187,	'stigmata':150,	'attack':185,	'defense':148,	'maxcp':2048, });																
data_pokemon_stats.set('yanma',			{ 'number':188,	'stigmata':130,	'attack':154,	'defense': 94,	'maxcp':1326, });																
data_pokemon_stats.set('wooper',		{ 'number':189,	'stigmata':110,	'attack': 75,	'defense': 75,	'maxcp': 596, });																
data_pokemon_stats.set('quagsire',		{ 'number':190,	'stigmata':190,	'attack':152,	'defense':152,	'maxcp':1929, });																
data_pokemon_stats.set('espeon',		{ 'number':191,	'stigmata':130,	'attack':261,	'defense':194,	'maxcp':3000, });																
data_pokemon_stats.set('umbreon',		{ 'number':192,	'stigmata':190,	'attack':126,	'defense':250,	'maxcp':2052, });																
data_pokemon_stats.set('murkrow',		{ 'number':193,	'stigmata':120,	'attack':175,	'defense': 87,	'maxcp':1392, });																
data_pokemon_stats.set('slowking',		{ 'number':194,	'stigmata':190,	'attack':177,	'defense':194,	'maxcp':2482, });																
data_pokemon_stats.set('misdreavus',	{ 'number':195,	'stigmata':120,	'attack':167,	'defense':167,	'maxcp':1781, });																
data_pokemon_stats.set('unown',			{ 'number':196,	'stigmata': 96,	'attack':136,	'defense': 91,	'maxcp':1022, });																
data_pokemon_stats.set('wobbuffet',		{ 'number':197,	'stigmata':380,	'attack': 60,	'defense':106,	'maxcp':1024, });																
data_pokemon_stats.set('girafarig',		{ 'number':198,	'stigmata':140,	'attack':182,	'defense':133,	'maxcp':1863, });																
data_pokemon_stats.set('pineco',		{ 'number':199,	'stigmata':100,	'attack':108,	'defense':146,	'maxcp':1045, });																
data_pokemon_stats.set('forretress',	{ 'number':200,	'stigmata':150,	'attack':161,	'defense':242,	'maxcp':2263, });																
data_pokemon_stats.set('dunsparce',		{ 'number':201,	'stigmata':200,	'attack':131,	'defense':131,	'maxcp':1615, });																
data_pokemon_stats.set('gligar',		{ 'number':202,	'stigmata':130,	'attack':143,	'defense':204,	'maxcp':1758, });																
data_pokemon_stats.set('steelix',		{ 'number':203,	'stigmata':150,	'attack':148,	'defense':333,	'maxcp':2439, });																
data_pokemon_stats.set('snubbull',		{ 'number':204,	'stigmata':120,	'attack':137,	'defense': 89,	'maxcp':1124, });																
data_pokemon_stats.set('granbull',		{ 'number':205,	'stigmata':180,	'attack':212,	'defense':137,	'maxcp':2440, });																
data_pokemon_stats.set('qwilfish',		{ 'number':206,	'stigmata':130,	'attack':184,	'defense':148,	'maxcp':1910, });																
data_pokemon_stats.set('scizor',		{ 'number':207,	'stigmata':140,	'attack':236,	'defense':191,	'maxcp':2801, });																
data_pokemon_stats.set('shuckle',		{ 'number':208,	'stigmata': 40,	'attack': 17,	'defense':396,	'maxcp': 300, });																
data_pokemon_stats.set('heracross',		{ 'number':209,	'stigmata':160,	'attack':234,	'defense':189,	'maxcp':2938, });																
data_pokemon_stats.set('sneasel',		{ 'number':210,	'stigmata':110,	'attack':189,	'defense':157,	'maxcp':1868, });																
data_pokemon_stats.set('teddiursa',		{ 'number':211,	'stigmata':120,	'attack':142,	'defense': 93,	'maxcp':1184, });																
data_pokemon_stats.set('ursaring',		{ 'number':212,	'stigmata':180,	'attack':236,	'defense':144,	'maxcp':2760, });																
data_pokemon_stats.set('slugma',		{ 'number':213,	'stigmata': 80,	'attack':118,	'defense': 71,	'maxcp': 750, });																
data_pokemon_stats.set('magcargo',		{ 'number':214,	'stigmata':100,	'attack':139,	'defense':209,	'maxcp':1543, });																
data_pokemon_stats.set('swinub',		{ 'number':215,	'stigmata':100,	'attack': 90,	'defense': 74,	'maxcp': 663, });																
data_pokemon_stats.set('piloswine',		{ 'number':216,	'stigmata':200,	'attack':181,	'defense':147,	'maxcp':2284, });																
data_pokemon_stats.set('corsola',		{ 'number':217,	'stigmata':110,	'attack':118,	'defense':156,	'maxcp':1214, });																
data_pokemon_stats.set('remoraid',		{ 'number':218,	'stigmata': 70,	'attack':127,	'defense': 69,	'maxcp': 749, });																
data_pokemon_stats.set('octillery',		{ 'number':219,	'stigmata':150,	'attack':197,	'defense':141,	'maxcp':2124, });																
data_pokemon_stats.set('mantine',		{ 'number':226,	'stigmata':130,	'attack':148,	'defense':260,	'maxcp':2032, });																
data_pokemon_stats.set('skarmory',		{ 'number':221,	'stigmata':130,	'attack':148,	'defense':260,	'maxcp':2032, });																
data_pokemon_stats.set('houndour',		{ 'number':222,	'stigmata': 90,	'attack':152,	'defense': 93,	'maxcp':1110, });																
data_pokemon_stats.set('houndoom',		{ 'number':223,	'stigmata':150,	'attack':224,	'defense':159,	'maxcp':2529, });																
data_pokemon_stats.set('kingdra',		{ 'number':224,	'stigmata':150,	'attack':194,	'defense':194,	'maxcp':2424, });																
data_pokemon_stats.set('phanpy',		{ 'number':225,	'stigmata':180,	'attack':107,	'defense':107,	'maxcp':1175, });																
data_pokemon_stats.set('donphan',		{ 'number':226,	'stigmata':180,	'attack':214,	'defense':214,	'maxcp':3022, });																
data_pokemon_stats.set('porygon2',		{ 'number':227,	'stigmata':170,	'attack':198,	'defense':183,	'maxcp':2546, });																
data_pokemon_stats.set('stantler',		{ 'number':228,	'stigmata':146,	'attack':192,	'defense':132,	'maxcp':1988, });																
data_pokemon_stats.set('tyrogue',		{ 'number':236,	'stigmata': 70,	'attack': 64,	'defense': 64,	'maxcp': 404, });																
data_pokemon_stats.set('hitmontop',		{ 'number':230,	'stigmata':100,	'attack':173,	'defense':214,	'maxcp':1905, });																
data_pokemon_stats.set('smoochum',		{ 'number':231,	'stigmata': 90,	'attack':153,	'defense':116,	'maxcp':1230, });																
data_pokemon_stats.set('elekid',		{ 'number':232,	'stigmata': 90,	'attack':135,	'defense':110,	'maxcp':1073, });																
data_pokemon_stats.set('magby',			{ 'number':233,	'stigmata': 90,	'attack':151,	'defense':108,	'maxcp':1178, });																
data_pokemon_stats.set('miltank',		{ 'number':234,	'stigmata':190,	'attack':157,	'defense':211,	'maxcp':2312, });																
data_pokemon_stats.set('blissey',		{ 'number':235,	'stigmata':510,	'attack':129,	'defense':229,	'maxcp':3219, });																
data_pokemon_stats.set('larvitar',		{ 'number':246,	'stigmata':100,	'attack':115,	'defense': 93,	'maxcp': 904, });																
data_pokemon_stats.set('pupitar',		{ 'number':247,	'stigmata':140,	'attack':155,	'defense':133,	'maxcp':1608, });																
data_pokemon_stats.set('tyranitar',		{ 'number':248,	'stigmata':200,	'attack':251,	'defense':212,	'maxcp':3670, });

var data_pokemon_cpm = new Map();
data_pokemon_cpm.set( 1.0, 0.0940000000);
data_pokemon_cpm.set( 1.5, 0.1351374320);
data_pokemon_cpm.set( 2.0, 0.1663978700);
data_pokemon_cpm.set( 2.5, 0.1926509190);
data_pokemon_cpm.set( 3.0, 0.2157324700);
data_pokemon_cpm.set( 3.5, 0.2365726610);
data_pokemon_cpm.set( 4.0, 0.2557200500);
data_pokemon_cpm.set( 4.5, 0.2735303810);
data_pokemon_cpm.set( 5.0, 0.2902498800);
data_pokemon_cpm.set( 5.5, 0.3060573770);
data_pokemon_cpm.set( 6.0, 0.3210876000);
data_pokemon_cpm.set( 6.5, 0.3354450360);
data_pokemon_cpm.set( 7.0, 0.3492126800);
data_pokemon_cpm.set( 7.5, 0.3624577510);
data_pokemon_cpm.set( 8.0, 0.3752355900);
data_pokemon_cpm.set( 8.5, 0.3875924060);
data_pokemon_cpm.set( 9.0, 0.3995672800);
data_pokemon_cpm.set( 9.5, 0.4111935510);
data_pokemon_cpm.set(10.0, 0.4225000100);
data_pokemon_cpm.set(10.5, 0.4329264190);
data_pokemon_cpm.set(11.0, 0.4431075500);
data_pokemon_cpm.set(11.5, 0.4530599578);
data_pokemon_cpm.set(12.0, 0.4627983900);
data_pokemon_cpm.set(12.5, 0.4723360830);
data_pokemon_cpm.set(13.0, 0.4816849500);
data_pokemon_cpm.set(13.5, 0.4908558000);
data_pokemon_cpm.set(14.0, 0.4998584400);
data_pokemon_cpm.set(14.5, 0.5087017650);
data_pokemon_cpm.set(15.0, 0.5173939500);
data_pokemon_cpm.set(15.5, 0.5259425110);
data_pokemon_cpm.set(16.0, 0.5343543300);
data_pokemon_cpm.set(16.5, 0.5426357670);
data_pokemon_cpm.set(17.0, 0.5507926900);
data_pokemon_cpm.set(17.5, 0.5588305760);
data_pokemon_cpm.set(18.0, 0.5667545200);
data_pokemon_cpm.set(18.5, 0.5745691530);
data_pokemon_cpm.set(19.0, 0.5822789100);
data_pokemon_cpm.set(19.5, 0.5898879170);
data_pokemon_cpm.set(20.0, 0.5974000100);
data_pokemon_cpm.set(20.5, 0.6048188140);
data_pokemon_cpm.set(21.0, 0.6121572900);
data_pokemon_cpm.set(21.5, 0.6193993650);
data_pokemon_cpm.set(22.0, 0.6265671300);
data_pokemon_cpm.set(22.5, 0.6336445330);
data_pokemon_cpm.set(23.0, 0.6406529500);
data_pokemon_cpm.set(23.5, 0.6475764260);
data_pokemon_cpm.set(24.0, 0.6544356300);
data_pokemon_cpm.set(24.5, 0.6612148060);
data_pokemon_cpm.set(25.0, 0.6679340000);
data_pokemon_cpm.set(25.5, 0.6745775370);
data_pokemon_cpm.set(26.0, 0.6811649200);
data_pokemon_cpm.set(26.5, 0.6876806480);
data_pokemon_cpm.set(27.0, 0.6941436500);
data_pokemon_cpm.set(27.5, 0.7005386730);
data_pokemon_cpm.set(28.0, 0.7068842100);
data_pokemon_cpm.set(28.5, 0.7131649960);
data_pokemon_cpm.set(29.0, 0.7193990900);
data_pokemon_cpm.set(29.5, 0.7255715520);
data_pokemon_cpm.set(30.0, 0.7317000000);
data_pokemon_cpm.set(30.5, 0.7347410090);
data_pokemon_cpm.set(31.0, 0.7377694800);
data_pokemon_cpm.set(31.5, 0.7407855740);
data_pokemon_cpm.set(32.0, 0.7437894300);
data_pokemon_cpm.set(32.5, 0.7467812110);
data_pokemon_cpm.set(33.0, 0.7497610400);
data_pokemon_cpm.set(33.5, 0.7527290870);
data_pokemon_cpm.set(34.0, 0.7556855100);
data_pokemon_cpm.set(34.5, 0.7586303780);
data_pokemon_cpm.set(35.0, 0.7615638400);
data_pokemon_cpm.set(35.5, 0.7644860650);
data_pokemon_cpm.set(36.0, 0.7673971700);
data_pokemon_cpm.set(36.5, 0.7702972660);
data_pokemon_cpm.set(37.0, 0.7731865000);
data_pokemon_cpm.set(37.5, 0.7760649620);
data_pokemon_cpm.set(38.0, 0.7789327500);
data_pokemon_cpm.set(38.5, 0.7817900550);
data_pokemon_cpm.set(39.0, 0.7846369700);
data_pokemon_cpm.set(39.5, 0.7874735780);
data_pokemon_cpm.set(40.0, 0.7903000100);

var data_pokemon_stardust = new Map();
data_pokemon_stardust.set(  200, [ 1.0,  1.5,  2.0,  2.5]);
data_pokemon_stardust.set(  400, [ 3.0,  3.5,  4.0,  4.5]);
data_pokemon_stardust.set(  600, [ 5.0,  5.5,  6.0,  6.5]);
data_pokemon_stardust.set(  800, [ 7.0,  7.5,  8.0,  8.5]);
data_pokemon_stardust.set( 1000, [ 9.0,  9.5, 10.0, 10.5]);
data_pokemon_stardust.set( 1300, [11.0, 11.5, 12.0, 12.5]);
data_pokemon_stardust.set( 1600, [13.0, 13.5, 14.0, 14.5]);
data_pokemon_stardust.set( 1900, [15.0, 15.5, 16.0, 16.5]);
data_pokemon_stardust.set( 2200, [17.0, 17.5, 18.0, 18.5]);
data_pokemon_stardust.set( 2500, [19.0, 19.5, 20.0, 20.5]);
data_pokemon_stardust.set( 3000, [21.0, 21.5, 22.0, 22.5]);
data_pokemon_stardust.set( 3500, [23.0, 23.5, 24.0, 24.5]);
data_pokemon_stardust.set( 4000, [25.0, 25.5, 26.0, 26.5]);
data_pokemon_stardust.set( 4500, [27.0, 27.5, 28.0, 28.5]);
data_pokemon_stardust.set( 5000, [29.0, 29.5, 30.0, 30.5]);
data_pokemon_stardust.set( 6000, [31.0, 31.5, 32.0, 32.5]);
data_pokemon_stardust.set( 7000, [33.0, 33.5, 34.0, 34.5]);
data_pokemon_stardust.set( 8000, [35.0, 35.5, 36.0, 36.5]);
data_pokemon_stardust.set( 9000, [37.0, 37.5, 38.0, 38.5]);
data_pokemon_stardust.set(10000, [39.0, 39.5, 40.0, 40.5]);

var data_pokemon_costs = [
	{'level': 1.0, 'stardust':   200, 'candy':  1},
	{'level': 1.5, 'stardust':   400, 'candy':  2},
	{'level': 2.0, 'stardust':   600, 'candy':  3},
	{'level': 2.5, 'stardust':   800, 'candy':  4},
	{'level': 3.0, 'stardust':  1200, 'candy':  5},
	{'level': 3.5, 'stardust':  1600, 'candy':  6},
	{'level': 4.0, 'stardust':  2000, 'candy':  7},
	{'level': 4.5, 'stardust':  2400, 'candy':  8},
	{'level': 5.0, 'stardust':  3000, 'candy':  9},
	{'level': 5.5, 'stardust':  3600, 'candy': 10},
	{'level': 6.0, 'stardust':  4200, 'candy': 11},
	{'level': 6.5, 'stardust':  4800, 'candy': 12},
	{'level': 7.0, 'stardust':  5600, 'candy': 13},
	{'level': 7.5, 'stardust':  6400, 'candy': 14},
	{'level': 8.0, 'stardust':  7200, 'candy': 15},
	{'level': 8.5, 'stardust':  8000, 'candy': 16},
	{'level': 9.0, 'stardust':  9000, 'candy': 17},
	{'level': 9.5, 'stardust': 10000, 'candy': 18},
	{'level':10.0, 'stardust': 11000, 'candy': 19},
	{'level':10.5, 'stardust': 12000, 'candy': 20},
	{'level':11.0, 'stardust': 13300, 'candy': 22},
	{'level':11.5, 'stardust': 14600, 'candy': 24},
	{'level':12.0, 'stardust': 15900, 'candy': 26},
	{'level':12.5, 'stardust': 17200, 'candy': 28},
	{'level':13.0, 'stardust': 18800, 'candy': 30},
	{'level':13.5, 'stardust': 20400, 'candy': 32},
	{'level':14.0, 'stardust': 22000, 'candy': 34},
	{'level':14.5, 'stardust': 23600, 'candy': 36},
	{'level':15.0, 'stardust': 25500, 'candy': 38},
	{'level':15.5, 'stardust': 27400, 'candy': 40},
	{'level':16.0, 'stardust': 29300, 'candy': 42},
	{'level':16.5, 'stardust': 31200, 'candy': 44},
	{'level':17.0, 'stardust': 33400, 'candy': 46},
	{'level':17.5, 'stardust': 35600, 'candy': 48},
	{'level':18.0, 'stardust': 37800, 'candy': 50},
	{'level':18.5, 'stardust': 40000, 'candy': 52},
	{'level':19.0, 'stardust': 42500, 'candy': 54},
	{'level':19.5, 'stardust': 45000, 'candy': 56},
	{'level':20.0, 'stardust': 47500, 'candy': 58},
	{'level':20.5, 'stardust': 50000, 'candy': 60},
	{'level':21.0, 'stardust': 53000, 'candy': 63},
	{'level':21.5, 'stardust': 56000, 'candy': 66},
	{'level':22.0, 'stardust': 59000, 'candy': 69},
	{'level':22.5, 'stardust': 62000, 'candy': 72},
	{'level':23.0, 'stardust': 65500, 'candy': 75},
	{'level':23.5, 'stardust': 69000, 'candy': 78},
	{'level':24.0, 'stardust': 72500, 'candy': 81},
	{'level':24.5, 'stardust': 76000, 'candy': 84},
	{'level':25.0, 'stardust': 80000, 'candy': 87},
	{'level':25.5, 'stardust': 84000, 'candy': 90},
	{'level':26.0, 'stardust': 88000, 'candy': 94},
	{'level':26.5, 'stardust': 92000, 'candy': 98},
	{'level':27.0, 'stardust': 96500, 'candy':102},
	{'level':27.5, 'stardust':101000, 'candy':106},
	{'level':28.0, 'stardust':105500, 'candy':110},
	{'level':28.5, 'stardust':110000, 'candy':114},
	{'level':29.0, 'stardust':115000, 'candy':118},
	{'level':29.5, 'stardust':120000, 'candy':122},
	{'level':30.0, 'stardust':125000, 'candy':126},
	{'level':30.5, 'stardust':130000, 'candy':130},
	{'level':31.0, 'stardust':136000, 'candy':136},
	{'level':31.5, 'stardust':142000, 'candy':142},
	{'level':32.0, 'stardust':148000, 'candy':148},
	{'level':32.5, 'stardust':154000, 'candy':154},
	{'level':33.0, 'stardust':161000, 'candy':162},
	{'level':33.5, 'stardust':168000, 'candy':170},
	{'level':34.0, 'stardust':175000, 'candy':178},
	{'level':34.5, 'stardust':182000, 'candy':186},
	{'level':35.0, 'stardust':190000, 'candy':196},
	{'level':35.5, 'stardust':198000, 'candy':206},
	{'level':36.0, 'stardust':206000, 'candy':216},
	{'level':36.5, 'stardust':214000, 'candy':226},
	{'level':37.0, 'stardust':223000, 'candy':238},
	{'level':37.5, 'stardust':232000, 'candy':250},
	{'level':38.0, 'stardust':241000, 'candy':262},
	{'level':38.5, 'stardust':250000, 'candy':274},
	{'level':39.0, 'stardust':260000, 'candy':289},
	{'level':39.5, 'stardust':270000, 'candy':304},
	{'level':40.0, 'stardust':280000, 'candy':319},
];

angular.module('AngularApp').controller('PokedexCtrl', function($scope, $rootScope, $filter, $location, $cookies, toastr, API) {
	
	$scope.stardust_list = [
		{ "count":  200, "levels":[{"level": 1, "cpm":0.09400000}, {"level": 1.5, "cpm":0.1351374320}, {"level": 2, "cpm":0.16639787}, {"level": 2.5, "cpm":0.192650919}] },
		{ "count":  400, "levels":[{"level": 3, "cpm":0.21573247}, {"level": 3.5, "cpm":0.2365726610}, {"level": 4, "cpm":0.25572005}, {"level": 4.5, "cpm":0.273530381}] },
		{ "count":  600, "levels":[{"level": 5, "cpm":0.29024988}, {"level": 5.5, "cpm":0.3060573770}, {"level": 6, "cpm":0.32108760}, {"level": 6.5, "cpm":0.335445036}] },
		{ "count":  800, "levels":[{"level": 7, "cpm":0.34921268}, {"level": 7.5, "cpm":0.3624577510}, {"level": 8, "cpm":0.37523559}, {"level": 8.5, "cpm":0.387592406}] },
		{ "count": 1000, "levels":[{"level": 9, "cpm":0.39956728}, {"level": 9.5, "cpm":0.4111935510}, {"level":10, "cpm":0.42250001}, {"level":10.5, "cpm":0.432926419}] },
		{ "count": 1300, "levels":[{"level":11, "cpm":0.44310755}, {"level":11.5, "cpm":0.4530599578}, {"level":12, "cpm":0.46279839}, {"level":12.5, "cpm":0.472336083}] },
		{ "count": 1600, "levels":[{"level":13, "cpm":0.48168495}, {"level":13.5, "cpm":0.4908558000}, {"level":14, "cpm":0.49985844}, {"level":14.5, "cpm":0.508701765}] },
		{ "count": 1900, "levels":[{"level":15, "cpm":0.51739395}, {"level":15.5, "cpm":0.5259425110}, {"level":16, "cpm":0.53435433}, {"level":16.5, "cpm":0.542635767}] },
		{ "count": 2200, "levels":[{"level":17, "cpm":0.55079269}, {"level":17.5, "cpm":0.5588305760}, {"level":18, "cpm":0.56675452}, {"level":18.5, "cpm":0.574569153}] },
		{ "count": 2500, "levels":[{"level":19, "cpm":0.58227891}, {"level":19.5, "cpm":0.5898879170}, {"level":20, "cpm":0.59740001}, {"level":20.5, "cpm":0.604818814}] },
		{ "count": 3000, "levels":[{"level":21, "cpm":0.61215729}, {"level":21.5, "cpm":0.6193993650}, {"level":22, "cpm":0.62656713}, {"level":22.5, "cpm":0.633644533}] },
		{ "count": 3500, "levels":[{"level":23, "cpm":0.64065295}, {"level":23.5, "cpm":0.6475764260}, {"level":24, "cpm":0.65443563}, {"level":24.5, "cpm":0.661214806}] },
		{ "count": 4000, "levels":[{"level":25, "cpm":0.66793400}, {"level":25.5, "cpm":0.6745775370}, {"level":26, "cpm":0.68116492}, {"level":26.5, "cpm":0.687680648}] },
		{ "count": 4500, "levels":[{"level":27, "cpm":0.69414365}, {"level":27.5, "cpm":0.7005386730}, {"level":28, "cpm":0.70688421}, {"level":28.5, "cpm":0.713164996}] },
		{ "count": 5000, "levels":[{"level":29, "cpm":0.71939909}, {"level":29.5, "cpm":0.7255715520}, {"level":30, "cpm":0.73170000}, {"level":30.5, "cpm":0.734741009}] },
		{ "count": 6000, "levels":[{"level":31, "cpm":0.73776948}, {"level":31.5, "cpm":0.7407855740}, {"level":32, "cpm":0.74378943}, {"level":32.5, "cpm":0.746781211}] },
		{ "count": 7000, "levels":[{"level":33, "cpm":0.74976104}, {"level":33.5, "cpm":0.7527290870}, {"level":34, "cpm":0.75568551}, {"level":34.5, "cpm":0.758630378}] },
		{ "count": 8000, "levels":[{"level":35, "cpm":0.76156384}, {"level":35.5, "cpm":0.7644860650}, {"level":36, "cpm":0.76739717}, {"level":36.5, "cpm":0.770297266}] },
		{ "count": 9000, "levels":[{"level":37, "cpm":0.77318650}, {"level":37.5, "cpm":0.7760649620}, {"level":38, "cpm":0.77893275}, {"level":38.5, "cpm":0.781790055}] },
		{ "count":10000, "levels":[{"level":39, "cpm":0.78463697}, {"level":39.5, "cpm":0.7874735780}, {"level":40, "cpm":0.79030001}, {"level":40.5, "cpm":0.790300010}] },
	];
	
	$scope.appraisal1_list = [
		{ "label":"label4" },
		{ "label":"label3" },
		{ "label":"label2" },
		{ "label":"label1" },
	];
	
	$scope.appraisal3_list = [
		{ "label":"label4", "min":15, "max":15 },
		{ "label":"label3", "min":13, "max":14 },
		{ "label":"label2", "min": 8, "max":12 },
		{ "label":"label1", "min": 0, "max": 7 },
	];
	
	$scope.isLoading = true;
	
	API.sendRequest('/api/pokemon/list/', 'POST').then(function success(data) {
		
		$scope.pokemons = data;
		
		for (var i = 0; i < $scope.pokemons.length; i++) {
			
			data = null
			
			for (var j = 0; j < data_pokemon_list.length; j++) {
				if (data_pokemon_list.code == $scope.pokemons[i].code) {
					
					data = data_pokemon_list[j];
					break;
				}
			}
			
			if (data) angular.extend($scope.pokemons[i], data);
		}
		
		$scope.computeModel = {image:'pokeball', pokemon:'', cp:null, hp:null, stardust:'', team:null, app1:null, app2S:false, app2A:false, app2D:false, app3:null};
		
		if ($rootScope.profile && $rootScope.profile.team) {
			
			$scope.computeModel.team = $rootScope.profile.team;
			$scope.updateTeam($scope.computeModel.team);
		}
		
		$scope.addModel = {name:'', code:'', attack:null, defense:null, stigmata:null, percent:null, level:null, cp:null, hp:null, stardust:'', team:null, app1:null, app2S:false, app2A:false, app2D:false, app3:null};
		
		$scope.sortType = 'percent';
		
		var sortTypeCookie = $cookies.get('sortType');
		if (sortTypeCookie) $scope.sortType = sortTypeCookie;
		
		$scope.sort($scope.sortType);
		
		$scope.isLoading = false;
		
	}, function error(data) {
		
		$scope.isLoading = false;
	
		toastr.error('<i class="fa fa-exclamation-triangle mr-2"></i> ' + $filter('translate')('notif_ERROR'), '', {allowHtml: true});
	});
	
	$rootScope.$on('$stateChangeStart', function(event, toState) {
		
		if (toState.name == 'app.pokedex.add') {
			
			$scope.computeModel = {image:'pokeball', pokemon:'', cp:null, hp:null, stardust:'', team:null, app1:null, app2S:false, app2A:false, app2D:false, app3:null};
			
			if ($rootScope.profile && $rootScope.profile.team && $rootScope.profile.level) {
				
				$scope.computeModel.team = $rootScope.profile.team;
				$scope.updateTeam($scope.computeModel.team);
				
				$scope.computeModel.level = $rootScope.profile.level;
			}
		
			$scope.addModel = {name:'', code:'', attack:null, defense:null, stigmata:null, percent:null, level:null, cp:null, hp:null, stardust:'', team:null, app1:null, app2S:false, app2A:false, app2D:false, app3:null};
			
			$scope.results = null;
		}
	});

	$scope.filterPokemons = function() {

		$scope.filtered_pokemonlist = [];
		
		for (var i = 0; i < data_pokemon_list.length; i++) {
			
			var gameName = $filter('translate')('pokemon_' + data_pokemon_list[i].code + '_LABEL');
			gameName = gameName.toLowerCase();
			
			var inputName = $scope.computeModel.pokemon.toLowerCase();
			
			if (gameName.indexOf(inputName) != -1) {
				$scope.filtered_pokemonlist.push(data_pokemon_list[i]);
			}
		}
		
	}
	
	$scope.selectPokemon = function(item) {
		
		$scope.computeModel.pokemon = $filter('translate')('pokemon_' + item.code + '_LABEL');
		$scope.computeModel.image = item.code;
	}
	
	$scope.filterStardust = function(name) {

		$scope.filtered_stardustlist = [];
		
		$scope.show_stardustlist = true;
		
		for (var i = 0; i < $scope.stardust_list.length; i++) {
			
			var gameName = String($scope.stardust_list[i].count);
			gameName = gameName.toLowerCase();
			
			var inputName = String(name).toLowerCase();
			
			if (!name || gameName.indexOf(inputName) != -1) {
				$scope.filtered_stardustlist.push($scope.stardust_list[i]);
			}
		}
	}
	
	$scope.updateTeam = function(team) {
		
		if (team) {
			for (var i = 0; i < 4; i++) {
			
				$scope.appraisal1_list[i].label = "pokemon_app1_CHOICE" + i + "_" + team;
				$scope.appraisal3_list[i].label = "pokemon_app3_CHOICE" + i + "_" + team;
			}
		}
	}
	
	$scope.compute = function() {
		
		var updateProfile = false;
		
		if ($scope.computeModel.team && !$rootScope.profile.team) { updateProfile = true; }
		if ($scope.computeModel.level && !$rootScope.profile.level) { updateProfile = true; }
		
		if (updateProfile == true) {
			
			var data = { 'team':$scope.computeModel.team, 'level':$scope.computeModel.level }
			API.sendRequest('/api/profile/edit/', 'POST', {}, data).then(function(data) {
				
				$rootScope.profile.team = $scope.computeModel.team
				$rootScope.profile.level = $scope.computeModel.level

			}, function error(data) {
				
				toastr.error('<i class="fa fa-exclamation-triangle mr-2"></i> ' + $filter('translate')('notif_ERROR'), '', {allowHtml: true});
			});
		}
		
		$scope.results = [];
		
		var pokemon = null;
		for (var i = 0; i < data_pokemon_list.length; i++) {
			
			if ($scope.computeModel.pokemon == $filter('translate')('pokemon_' + data_pokemon_list[i].code + '_LABEL')) {
				pokemon = data_pokemon_list[i];
				break;
			}
		}
		
		if (!pokemon) return;
		
		var baseS = pokemon.baseS;
		var baseA = pokemon.baseA;
		var baseD = pokemon.baseD;
		
		var stardust = $scope.stardust_list[$scope.computeModel.stardust];
		for (var i = 0; i < $scope.stardust_list.length; i++) {
			
			if ($scope.computeModel.stardust == String($scope.stardust_list[i].count)) {
				stardust = $scope.stardust_list[i];
				break;
			}
		}
		
		if (!stardust) return;
		
		var highS = $scope.computeModel.app2S;
		var highA = $scope.computeModel.app2A;
		var highD = $scope.computeModel.app2D;
		
		var appraisal3 = $scope.appraisal3_list[$scope.computeModel.app3];
		
		var minS =  0, minA =  0, minD =  0;
		var maxS = 16, maxA = 15, maxD = 15;
		
		if (highS) { minS = appraisal3.min; maxS = appraisal3.max; }
		if (highA) { minA = appraisal3.min; maxA = appraisal3.max; }
		if (highD) { minD = appraisal3.min; maxD = appraisal3.max; }
		
		for (var i = 0; i < 4; i++) {
			
			var cpm = stardust.levels[i].cpm;
			var level = stardust.levels[i].level;
			
			for (var ivS = minS; ivS <= maxS; ivS++) {
				
				var tempHP = Math.floor(cpm * (baseS + ivS));
				tempHP = tempHP < 10 ? 10 : tempHP;
				if (tempHP == $scope.computeModel.hp) {
					
					for (var ivA = minA; ivA <= maxA; ivA++) {
						for (var ivD = minD; ivD <= maxD; ivD++) {
							
							var tempCP = Math.floor((baseA + ivA) * Math.pow(baseD + ivD, 0.5) * Math.pow(baseS + ivS, 0.5) * Math.pow(cpm, 2) / 10);
							tempCP = tempCP < 10 ? 10 : tempCP;
							if (tempCP == $scope.computeModel.cp) {
								
								var result = {	code:pokemon.code,
												name:$filter('translate')('pokemon_' + pokemon.code + '_LABEL'),
												level:level,
												ivS:ivS,
												ivA:ivA,
												ivD:ivD,
												percent:0.0,
												cp:$scope.computeModel.cp,
												hp:$scope.computeModel.hp,
												stardust:$scope.computeModel.stardust,
												app1:parseInt($scope.computeModel.app1),
												app2S:$scope.computeModel.app2S,
												app2A:$scope.computeModel.app2A,
												app2D:$scope.computeModel.app2D,
												app3:parseInt($scope.computeModel.app3),
												team:$scope.computeModel.team,
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
								
								if (valid) {
									
									result.percent = ((ivS + ivA + ivD) * 100.0 / 45.0).toFixed(1);
									
									$scope.results.push(result);
								}
							}
						}
					}
				}
			}
		}
	}
	
	$scope.add = function() {
		
		$scope.isLoading = true;
		
		API.sendRequest('/api/pokemon/add/', 'POST', {}, $scope.addModel).then(function(data) {
			
			angular.extend($scope.addModel, data);
			$scope.pokemons.push($scope.addModel);
			
			$scope.sort($scope.sortType);

			$location.path('/pokedex');
			
			$scope.isLoading = false;
			
			toastr.success('<i class="fa fa-check mr-2"></i> ' + $filter('translate')('notif_SUCCESS'), '', {allowHtml: true});
			
		}, function error(data) {
			
			$scope.isLoading = false;
		
			toastr.error('<i class="fa fa-exclamation-triangle mr-2"></i> ' + $filter('translate')('notif_ERROR'), '', {allowHtml: true});
		});
	};
	
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
		
		if (a.dexnumber > b.dexnumber) return 1;
		if (a.dexnumber < b.dexnumber) return -1;
		return 0;
	}
	
	$scope.sort = function(sortType) {
		
		$cookies.put('sortType', sortType);
		
		switch(sortType) {
			
			case 'name': $scope.pokemons = $scope.pokemons.sort(_compareByName); break;
			case 'percent': $scope.pokemons = $scope.pokemons.sort(_compareByPercent); break;
			case 'attack': $scope.pokemons = $scope.pokemons.sort(_compareByAttack); break;
			case 'defense': $scope.pokemons = $scope.pokemons.sort(_compareByDefense); break;
			case 'stigmata': $scope.pokemons = $scope.pokemons.sort(_compareByStigmata); break;
			case 'dexnumber': $scope.pokemons = $scope.pokemons.sort(_compareByDexnumber); break;
		}
	}
});

angular.module('AngularApp').controller('PokemonCtrl', function($scope, $rootScope, $filter, $location, $cookies, $stateParams, toastr, API) {

	$scope.isLoading = true;
	
	$scope.data = null;
	
	var _computeLevel = function() {

		if (!$scope.data || !$scope.data.pokemon) return;

		var stats = data_pokemon_stats.get($scope.data.pokemon.code);
		
		var levels = data_pokemon_stardust.get($scope.data.pokemon.stardust);
		for (var i = 0; i < 4; i++) {
			
			var level = levels[i];
			var cpm = data_pokemon_cpm.get(level);
			
			var tempHP = Math.floor(cpm * (stats.stigmata + $scope.data.pokemon.stigmata));
			tempHP = tempHP < 10 ? 10 : tempHP;
			
			var tempCP = Math.floor((stats.attack + $scope.data.pokemon.attack) * Math.pow(stats.defense + $scope.data.pokemon.defense, 0.5) * Math.pow(stats.stigmata + $scope.data.pokemon.stigmata, 0.5) * Math.pow(cpm, 2) / 10);
			tempCP = tempCP < 10 ? 10 : tempCP;
			
			if ((tempHP == $scope.data.pokemon.hp) && (tempCP == $scope.data.pokemon.cp)) {
				
				$scope.data.pokemon.level = level;
				break;
			}
		}
	}
	
	var _computeFinalData = function() {

		if (!$scope.data || !$scope.data.pokemon) return;
		
		var stats = data_pokemon_stats.get($scope.data.pokemon.code);
		
		if ($scope.data.owner.level) {
			
			$scope.data.pokemon.finalLevel = $scope.data.owner.level + 1.5;
			$scope.data.pokemon.finalLevel = $scope.data.pokemon.finalLevel > 40 ? 40 : $scope.data.pokemon.finalLevel;
			
			var finalCpm = data_pokemon_cpm.get($scope.data.pokemon.finalLevel);
			
			$scope.data.pokemon.finalCP = Math.floor((finalCpm * finalCpm * (stats.attack + $scope.data.pokemon.attack) * Math.sqrt(stats.defense + $scope.data.pokemon.defense) * Math.sqrt(stats.stigmata + $scope.data.pokemon.stigmata)) / 10);
			$scope.data.pokemon.finalHP = Math.floor(finalCpm * (stats.stigmata + $scope.data.pokemon.stigmata));
		}
		else {
		
			$scope.data.pokemon.finalCP = null;
			$scope.data.pokemon.finalHP = null;
			$scope.data.pokemon.finalLevel = null;
		}
	}
	
	var _computeRequiredData = function() {

		if (!$scope.data || !$scope.data.pokemon) return;
		
		var startingStardust = 0;
		var targetStardust = 0;
		var startingCandy = 0;
		var targetCandy = 0;
		
		for (var i = 0; i < data_pokemon_costs.length; i++) {
			
			if (data_pokemon_costs[i].level == $scope.data.pokemon.level) {
				
				startingStardust = data_pokemon_costs[i].stardust;
				startingCandy = data_pokemon_costs[i].candy;
			}
			
			if (data_pokemon_costs[i].level == $scope.data.pokemon.finalLevel) {
				
				targetStardust = data_pokemon_costs[i].stardust;
				targetCandy = data_pokemon_costs[i].candy;
				break;
			}
		}
		
		$scope.data.pokemon.requiredStardust = targetStardust - startingStardust;
		$scope.data.pokemon.requiredCandy = targetCandy - startingCandy;
	}
	
	var _setEditModel = function() {
		
		$scope.editModel = {
			
			cp:$scope.data.pokemon.cp,
			hp:$scope.data.pokemon.hp,
			name:$scope.data.pokemon.name,
			stardust:$scope.data.pokemon.stardust
		};
	}
	
	$scope.selectShareLink = function() {
		
		$('#js-copytext').select();
	}
	
	$scope.copyToClipboard = function() {
		
		$('#js-copytext').select();
		
		var successful = document.execCommand('copy');
		var msg = successful ? 'successful' : 'unsuccessful';
		console.log('Copying text command was ' + msg);		
	}
	
	API.sendRequest('/api/pokemon/' + $stateParams.ref, 'GET').then(function success(data) {
		
		$scope.data = data;
		
		_computeLevel();
		_computeFinalData();
		_computeRequiredData();
		
		_setEditModel();
		
		$scope.isLoading = false;
		
	}, function error(data) {
	
		$scope.isLoading = false;
	
		toastr.error('<i class="fa fa-exclamation-triangle mr-2"></i> ' + $filter('translate')('notif_ERROR'), '', {allowHtml: true});
	});
	
	$scope.$on('profile-loaded', function(event, args) {
		
		_computeLevel();
		_computeFinalData();
		_computeRequiredData();
	});

	$rootScope.$on('$stateChangeStart', function(event, toState) {
		
		if (toState.name == 'app.pokemon.view') {
		
			_computeLevel();
			_computeFinalData();
			_computeRequiredData();
		}
		
		if (toState.name == 'app.pokemon.edit') {
		
			_setEditModel();
		}
	});
	
	$scope.edit = function(form) {
		
		if (!form.$invalid) {
				
			var tempPokemon = $scope.data.pokemon;
		
			tempPokemon.cp = $scope.editModel.cp;
			tempPokemon.hp = $scope.editModel.hp;
			tempPokemon.name = $scope.editModel.name;
			tempPokemon.stardust = $scope.editModel.stardust;
		
			API.sendRequest('/api/pokemon/' + $scope.data.pokemon.ref + '/edit/', 'POST', {}, tempPokemon).then(function success(data) {
				
				$scope.pokemon = tempPokemon;
				
				$location.path('/pokemon/' + $scope.data.pokemon.ref);
				
				toastr.success('<i class="fa fa-check mr-2"></i> ' + $filter('translate')('notif_SUCCESS'), '', {allowHtml: true});
				
			}, function error(data) {
				
				toastr.error('<i class="fa fa-exclamation-triangle mr-2"></i> ' + $filter('translate')('notif_ERROR'), '', {allowHtml: true});
			});
		}
	}
	
	$scope.delete = function() {
		
		API.sendRequest('/api/pokemon/' + $scope.data.pokemon.ref + '/delete/', 'POST', {}, $scope.data.pokemon).then(function success(data) {
			
			$location.path('/pokedex');
			
			toastr.success('<i class="fa fa-check mr-2"></i> ' + $filter('translate')('notif_SUCCESS'), '', {allowHtml: true});
			
		}, function error(data) {
			
			toastr.error('<i class="fa fa-exclamation-triangle mr-2"></i> ' + $filter('translate')('notif_ERROR'), '', {allowHtml: true});
		});
	}
});