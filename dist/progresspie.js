
/**
  * @ngdoc directive
  * @name ui-progresspie.directive:progresspie
  * @description
  * # progressPie
 */

(function() {
  angular.module('ui-progresspie', []).directive('progresspie', function() {
    return {
      restrict: 'EA',
      template: '<div></div>',
      link: function(scope, element, attrs) {
        return element.text('test');
      }
    };
  });

}).call(this);
