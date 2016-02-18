describe('Directive: progress-pie', function() {
  var elm, scope;

  beforeEach(module('ui-progresspie'));

  var $rootScope, element;
  beforeEach(inject(function (_$rootScope_) {
    $rootScope = _$rootScope_;
  });

  function compileDirective(tpl) {
    inject(function ($compile) {
      element = $compile(tpl || '<div progresspie ></div>')($rootScope);
    });
    $rootScope.$digest();
  }

  beforeEach(function() {
    compileDirective();
  });

  it('creates an svg node', function() {
    angular.element(element)
    expect(angular.element(elm).find('svg').length).toEqual(1);
  });

  it('should default to a 240 pixel square', function() {
    expect($(elm).find('svg').attr('width')).toBe('240');
    expect($(elm).find('svg').attr('height')).toBe('240');
  });

  it('should display a 0 in progress', function() {
    expect($(elm).find('text tspan:first').text()).toBe('0');
  });

  it('should update actual progress number text', function() {
    scope.ctrl.actual = 0.5;
    scope.ctrl.update();
    expect($(elm).find('text tspan:first').text()).toBe('50');
  });

  it('should be in danger when it falls outside threshold', function() {
    scope.ctrl.actual = 0.5;
    scope.ctrl.update();
    expect($(elm).find('text tspan:first').text()).toBe('50');
  });


});
