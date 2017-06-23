angular.module('AngularApp.directives', [])

angular.module('AngularApp.directives').directive('pageTitle', function($rootScope, $filter, $timeout) {
	
	return {
		
		link: function(scope, element) {
		
			var listener = function(event, toState) {
			
				var title = 'MyPoGoDex';
				if (toState.data && toState.data.title) title = 'MyPoGoDex - ' + $filter('translate')(toState.data.title);
				
				$timeout(function() { element.text(title); }, 0, false);
			};
			
			$rootScope.$on('$stateChangeSuccess', listener);
		}
	};
});

angular.module('AngularApp.directives').directive('selectList', function($filter) {
	
	return {
		
		restrict: 'EA',
		
		replace: true,
		
		scope: { id:'=id', model:'=model', label:'=label', list:'=list', img:'=img', placeholder:'=placeholder', callback:'=callback' },

		template:	'<div class="select-group">' +
						'<input id="{{id}}" class="form-control" placeholder="{{placeholder | translate}}" ng-class="{\'has-focus\': has_focus}" ng-model="model" ng-focus="has_focus = true; filterList();" ng-change="filterList();" ng-blur="has_focus = false; checkModel();">' +
						'<div class="select-list" ng-show="has_focus">' +
	                        '<div class="select-list-item" ng-repeat="item in filtered_list" ng-mousedown="selectItem(item)">' +
	                        	'<img ng-if="img" ng-src="/static/front/img/{{item}}.png" />' + 
	                            '{{item | translate}}' +
	                        '</div>' +
		                    '<div class="select-list-item text-danger" ng-show="filtered_list.length < 1">' +
		                       '{{\'error_NOELEMENT\' | translate}}' +
		                    '</div>' +
						'</div>' +
					'</div>',
				  
		link: function(scope, element, attrs) {
			
			scope.filtered_list = scope.list;
			
			scope.filterList = function() {
				
				scope.filtered_list = [];
				
				if (!scope.model) {
					
					scope.filtered_list = scope.list;
					return;
				}
				
				var inputValue = String(scope.model).toLowerCase();
					
				for (var i = 0; i < scope.list.length; i++) {
					
					var refValue = String($filter('translate')(scope.list[i])).toLowerCase();
					
					if (refValue.indexOf(inputValue) != -1) {
						scope.filtered_list.push(scope.list[i]);
					}
				}
			};
			
			scope.selectItem = function(item) {
				
				scope.model = $filter('translate')(item);
			};
			
			scope.checkModel= function() {
				
				if (scope.filtered_list.length < 1) {
					scope.model = null;
				}
				
				if (scope.callback) scope.callback(scope.model);
			}
		},
	};
});
