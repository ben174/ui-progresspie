#'use strict'

###*
 # @ngdoc directive
 # @name ui-progresspie.directive:progresspie
 # @description
 # # progressPie
###
angular.module 'ui-progresspie', []
  .directive 'progresspie', ->
    restrict: 'EA'
    template: '<div></div>'
    link: (scope, element, attrs) ->
      element.text 'test'
