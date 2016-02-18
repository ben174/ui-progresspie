describe('progress-pie', function() {
  var elm, scope;

  beforeEach(module('ui-progresspie'));

  beforeEach(inject(function($rootScope, $compile) {
    elm = angular.element('<div progresspie expected="0" actual="0" threshold="0.1" size="240"></div>');
    scope = $rootScope;
    $compile(elm)(scope);
    scope.$digest();
  }));

  it('creates an svg node', inject(function($compile, $rootScope) {
    expect($(elm).find('svg').length).toEqual(1);
  }));

  it('defaults to a 240 pixel square', inject(function($compile, $rootScope) {
    expect($(elm).find('svg').attr('width')).toBe('240');
    expect($(elm).find('svg').attr('height')).toBe('240');
  }));

  it('displays a 0 in progress', inject(function($compile, $rootScope) {
    expect($(elm).find('text tspan:first').text()).toBe('0');
  }));

  it('updates actual progress number text', inject(function($compile, $rootScope) {
    scope.ctrl.actual = 0.5;
    scope.ctrl.update();
    expect($(elm).find('text tspan:first').text()).toBe('50');
  }));

  it('becomes in danger when it falls outside threshold', inject(function($compile, $rootScope) {
    scope.ctrl.actual = 0.1;
    scope.ctrl.threshold = 0.5;
    scope.ctrl.update();
    //TODO: Determine danger
  }));
});
