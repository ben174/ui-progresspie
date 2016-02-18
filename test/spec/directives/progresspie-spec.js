describe('tabs', function() {
  var elm, scope;

  // load the tabs code
  beforeEach(module('ui-progresspie'));

  // load the templates
  // beforeEach(module('tpl/tabs.html', 'tpl/pane.html'));

  beforeEach(inject(function($rootScope, $compile) {
    elm = angular.element('<div progresspie></div>');
    scope = $rootScope;
    $compile(elm)(scope);
    scope.$digest();
  }));


  it('should create clickable titles', inject(function($compile, $rootScope) {
    // var titles = elm.find('ul.nav-tabs li a');

    // expect(titles.length).toBe(2);
    // expect(titles.eq(0).text()).toBe('First Tab');
    // expect(titles.eq(1).text()).toBe('Second Tab');
  }));
});
