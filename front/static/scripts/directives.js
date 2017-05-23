angular.module('AngularApp').directive('pageTitle', function($rootScope, $filter, $timeout) {
	
	return {
		link: function(scope, element) {
		
			var listener = function(event, toState) {
			
				var title = 'Exile Reborn';
				if (toState.data && toState.data.labelKey) title = 'PoGoDex - ' + $filter('translate')(toState.data.labelKey);
				
				$timeout(function() { element.text(title); }, 0, false);
			};
			
			$rootScope.$on('$stateChangeSuccess', listener);
		}
	};
});