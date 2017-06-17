angular.module('AngularApp', ['ui.router', 'pascalprecht.translate', 'satellizer', 'ngCookies', 'toastr',
							  'AngularApp.services', 'AngularApp.controllers', 'AngularApp.directives', ]);



/* Routing config */

angular.module('AngularApp').config(function($urlRouterProvider, $stateProvider, $locationProvider) {
	
	$urlRouterProvider.otherwise('/');
	
	$stateProvider
	
		.state('root', { url: '/:codelang', controller: 'RootCtrl', templateUrl: '/static/front/pages/root.html', resolve: {loadUser: function(UserService) { return UserService.init(); }, }, })

			.state('root.home',    		{ url: '/home',    				controller: 'HomeCtrl',			templateUrl: '/static/front/pages/home.html',  			data:{ title: 'home_TITLE', 		}})
			
			.state('root.login',    	{ url: '/login',    			controller: 'LoginCtrl',		templateUrl: '/static/front/pages/login.html',  		data:{ title: 'login_TITLE', 		}})
			.state('root.profile',		{ url: '/profile',				controller: 'ProfileCtrl',		templateUrl: '/static/front/pages/profile.html',		data:{ title: 'profile_TITLE',   	}})
			.state('root.register', 	{ url: '/register', 			controller: 'RegisterCtrl', 	templateUrl: '/static/front/pages/register.html',		data:{ title: 'register_TITLE',		}})

			.state('root.pokedex',		{ url: '/pokedex',				controller: 'PokedexCtrl',		templateUrl: '/static/front/pages/pokedex.html',		data:{ title: 'pokedex_TITLE',		}})
			
			.state('root.ivcalculator',	{ url: '/ivcalculator/:code',	controller: 'IVCalculatorCtrl',	templateUrl: '/static/front/pages/ivcalculator.html',	data:{ title: 'ivcalculator_TITLE',	}})
			
			.state('root.pogodex',		{ url: '/pogodex',				controller: 'PogodexCtrl',		templateUrl: '/static/front/pages/pogodex.html',		data:{ title: 'pogodex_TITLE',		}, resolve: {loadPogodex: function(UserService, PogodexService) { if (UserService.data.authenticated) {return PogodexService.init();} else {return} }, }, })
			.state('root.pokemon',		{ url: '/pokemon/:ref', 		controller: 'PokemonCtrl',		templateUrl: '/static/front/pages/pokemon.html',		data:{ title: 'pokemon_TITLE',		}})
			
	$locationProvider.html5Mode(true);
});



/* Translations config */

angular.module('AngularApp').config(function($translateProvider) {
	
	$translateProvider.useSanitizeValueStrategy(null);
	
	$translateProvider.preferredLanguage('en');
	
	$translateProvider.translations('en', en_translations);
	$translateProvider.translations('fr', fr_translations);
});



/* Satellizer config */

angular.module('AngularApp').config(function($authProvider) {
	
	$authProvider.facebook({
		
		url: '/login/social/token_user/facebook',
		clientId: '362521904117518'
	});

	$authProvider.authToken = 'Token';
	$authProvider.tokenType = 'Token';
});



/* Toastr config */

angular.module('AngularApp').config(function(toastrConfig) {
	
	angular.extend(toastrConfig, {
		
		target: '#toast-content',
		timeOut: 5000,
		positionClass: 'toast-bottom-center',
	});
});



/* Running */

angular.module('AngularApp').run(function($rootScope, $state, $stateParams) {
	
	$rootScope.state = $state;
	$rootScope.stateParams = $stateParams;
});
