(function() {
  'use strict';

  /**
    * @ngdoc directive
    * @name angularProgresspieApp.directive:progressPie
    * @description
    * # progressPie
   */
  angular.module('angularProgresspieApp').directive('progressPie', function() {
    return {
      restrict: 'EA',
      template: '<div></div>',
      link: function(scope, element, attrs) {
        return element.text('this is the progressPie directive');
      }
    };
  });

}).call(this);
