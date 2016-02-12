'use strict'

###*
 # @ngdoc directive
 # @name angularProgresspieApp.directive:progressPie
 # @description
 # # progressPie
###
angular.module 'angularProgresspieApp'
  .directive 'progressPie', ->
    restrict: 'EA'
    template: '<div></div>'
    link: (scope, element, attrs) ->
      element.text 'this is the progressPie directive'
