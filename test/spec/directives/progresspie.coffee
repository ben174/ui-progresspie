'use strict'

describe 'Directive: progressPie', ->

  # load the directive's module
  beforeEach module 'angularProgresspieApp'

  scope = {}

  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()

  it 'should make hidden element visible', inject ($compile) ->
    element = angular.element '<progress-pie></progress-pie>'
    element = $compile(element) scope
    expect(element.text()).toBe 'this is the progressPie directive'
