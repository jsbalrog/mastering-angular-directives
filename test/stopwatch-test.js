describe('Stopwatch', function() {
	'use strict';

	var scope, $compile, $interval;

	// Set the context of the tests by getting the module instance
	beforeEach(module('myApp'));

	// Find services to be used to perform the tests.
	beforeEach(inject(function(_$rootScope_, _$compile_, _$controller_, _$interval_) {
		scope = _$rootScope_.$new();
		$compile = _$compile_;
		$interval = _$interval_;
		scope.options = {
			interval: 100,
			log: []
		};
		scope.newObject = {};
	}));

	describe('Creating a stopwatch-directive', function() {

		it('should throw an error if there are no options set on the element', function() {
			expect(function() {
				var stopwatch = $compile('<div stopwatch-directive></div>') (scope);
				scope.$apply();
			}).toThrow('Must pass an options object for the stopwatch to work correctly.');
		});

		it('should not throw an error with an empty options object', function() {
			expect(function() {
				scope.emptyObject = {};
				var stopwatch = $compile('<div stopwatch-directive options="emptyObject"></div>') (scope);
				scope.$apply();
			}).not.toThrow();
		});

		it('should set the default interval value to 100 milliseconds', function() {
			var stopwatch = $compile('<div stopwatch-directive options="newObject"></div>') (scope);
			scope.$apply();
			expect(stopwatch.scope().options.interval).toBe(100);
		});

		it('should contain all relative functions', function() {
			var stopwatch = $compile('<div stopwatch-directive options="options"></div>') (scope);
			scope.$apply();
			expect(stopwatch.scope().stopTimer).not.toBe(undefined);
			expect(stopwatch.scope().startTimer).not.toBe(undefined);
			expect(stopwatch.scope().resetTimer).not.toBe(undefined);
		});

	});
});
