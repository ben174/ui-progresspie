# ui-progresspie


An Angular directive which renders a circular progress meter with two values: Expected and Actual progress (0.0 - 1.0)


## Usage

Include the `ui-progresspie` dependency on your Angular module:
```
var app = angular.module('demoapp', ['ui-progresspie']);
```


Then embed the progress meter in your page:

```html
<div progresspie actual="0.5" expected="0.1" size="240" threshold="0.1"></div>
```

#TODO:

* Ensure multiple can be on the same page
* Write unit tests
* What if it's placed on a non-white document?
* Think about backwards compatibility (Sizzle?)  
* Coffee lint
* Travis?
* Error handling - invalid values currently break it
* More tests!
