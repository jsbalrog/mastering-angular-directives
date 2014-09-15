angular.module('myApp', []).controller('StopwatchCtrl', function($scope) {
	$scope.stopwatchOptions = { interval: 100 };
});

angular.module('myApp').factory('StopwatchFactory', function($interval) {

  // This returned function is used as the constructor (when you code "new StopwatchFactory()")
	return function(options) {
      var startTime = 0,
      currentTime = null,
      offset = 0,
      interval = null,
      self = this;
      
      if(!options.interval){
        options.interval = 100;
      
      }
      options.elapsedTime = new Date(0);
      self.running = false;
      
      function pushToLog(lap){
        if(options.log !== undefined){
          options.log.push(lap);
        }
      }
     
    self.updateTime = function(){
      currentTime = new Date().getTime();
      var timeElapsed = offset + (currentTime - startTime);
      options.elapsedTime.setTime(timeElapsed);
    };

    self.startTimer = function(){
      if(self.running === false){
        startTime = new Date().getTime();
        interval = $interval(self.updateTime,options.interval);
        self.running = true;
      }
    };

    self.stopTimer = function(){
      if( self.running === false) {
        return;
       }
       self.updateTime();
       offset = offset + currentTime - startTime;
       pushToLog(currentTime - startTime);
       $interval.cancel(interval);
       self.running = false;
    };

    self.resetTimer = function(){
      startTime = new Date().getTime();
      options.elapsedTime.setTime(0);
      timeElapsed = offset = 0;
    };

    return self;
  };

});

angular.module('myApp').directive('stopwatchDirective', function(StopwatchFactory) {
	return {
		restrict: 'EA',
		scope: true,
    compile: function(tElem, tAttrs) {
      if(!tAttrs.options) {
        throw new Error('Must pass an options object for the stopwatch to work correctly.');
      }
      return function(scope, elem, attrs, controller, transclude) {

        var stopwatchService = new StopwatchFactory(scope[attrs.options]);

        scope.startTimer = stopwatchService.startTimer;
        scope.stopTimer = stopwatchService.stopTimer;
        scope.resetTimer = stopwatchService.resetTimer;
      };
    }
  };
});
