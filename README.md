# ui-progresspie

![](https://raw.githubusercontent.com/ben174/ui-progresspie/master/logo.svg)

An Angular directive which renders a circular progress meter with two values: Expected and Actual progress (0.0 - 1.0)

#TODO:

* Ensure multiple can be on the same page

* Write unit tests

* What if it's placed on a non-white document?

* coffee - 2 spaces vs 4?

* Think about backwards compatibility (Sizzle?)  

* Coffee lint


## Usage

Include the `ui-progresspie` dependency on your Angular module:
```
var app = angular.module('demoapp', ['','ui-progresspie']);
```

Override default settings:

```javascript
angular.extend($scope, {
    defaults: {
        threshold: 0.1,  // goes red when actual is 10% behind expected
        normalColor: "#0F0",
        dangerColor: "#F00"
    }
});
```

Or use extend...
```javascript
angular.extend($scope, {
    threshold: 0.1,  // goes red when actual is 10% behind expected
    normalColor: "#0F0",
    dangerColor: "#F00"
});
```


Then embed the progress meter in your page:

```html
<div progresspie actual="0.5" expected="0.1"></div>
```

If you'd like to embed multiple meters on your page, assign them an *id* attribute:

```html
<div progresspie id="progress1" actual="0.5" expected="0.1"></div>
```
