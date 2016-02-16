
/**
  * @ngdoc directive
  * @name ui-progresspie.directive:progresspie
  * @description
  * # progressPie
 */

(function() {
  var Animal, ProgressPieX, snake;

  Animal = (function() {
    function Animal(name) {
      this.name = name;
    }

    Animal.prototype.move = function(meters) {
      return console.log(this.name + (" moved " + meters + "m."));
    };

    return Animal;

  })();

  snake = new Animal('snake');

  snake.move(10);

  angular.module('ui-progresspie', []).directive('progresspie', function() {
    return new ProgressPieX(220);
  });

  ProgressPieX = (function() {
    function ProgressPieX(fooo) {
      this.fooo = fooo;
    }

    ProgressPieX.prototype.restrict = 'EA';

    ProgressPieX.prototype.link = function(scope, element, attr) {
      var actualArc, actualInner, actualOuter, actualPath, actualVal, centerCircle, circleRadius, danger, expectedArc, expectedInner, expectedOuter, expectedPath, expectedVal, fontSize, gap, meters, progressLabel, progressVal, radius, svg, textGroup;
      console.log("link called!");
      console.log("size is " + this.fooo);
      radius = this.size / 2;
      console.log("Radius set to " + this.radius + ".");
      console.log(this.radius);
      actualInner = this.radius - (this.radius * 0.10);
      actualOuter = this.radius;
      expectedInner = this.radius - (this.radius * 0.17);
      expectedOuter = actualInner - gap;
      gap = this.radius * 0.02;
      circleRadius = this.radius * 0.7;
      danger = false;
      actualVal = 0;
      expectedVal = 0;
      this.elem = d3.select(element[0]);
      fontSize = this.radius * 0.4;
      actualArc = d3.svg.arc().innerRadius(actualInner).outerRadius(actualOuter).cornerRadius(90).startAngle(0);
      expectedArc = d3.svg.arc().innerRadius(expectedInner).outerRadius(expectedOuter).cornerRadius(90).startAngle(0);
      svg = elem.append("svg").attr("width", this.size).attr("height", this.size).append("g").attr("transform", "translate(" + this.radius + "," + this.radius + ")");
      centerCircle = svg.append("circle").attr("cx", 0).attr("cy", 0).attr("r", circleRadius).style("fill", "#000").style("opacity", "0.05");
      textGroup = svg.append("g").attr("alignment-baseline", "middle");
      progressVal = textGroup.append("text").attr("text-anchor", "middle").append("tspan").text("73").attr("font-size", fontSize).append("tspan").attr("font-size", fontSize / 2).text("%");
      progressLabel = textGroup.append("text").attr("font-size", fontSize / 2).attr("transform", "translate(0, " + fontSize + ")").attr("text-anchor", "middle").text("Progress");
      meters = svg.append("g");
      actualPath = meters.append("path").datum({
        endAngle: 0
      }).attr("d", this.actualArc);
      return expectedPath = meters.append("path").datum({
        endAngle: 0
      }).attr("d", this.expectedArc).attr("opacity", "0.33");
    };

    ProgressPieX.prototype.update = function(scope, expected, actual) {
      var wasDanger;
      scope.actualPath.transition().duration(1000).call(arcTween, actualVal * scope.tau, scope.actualArc);
      scope.expectedPath.transition().duration(1000).call(arcTween, expectedVal * scope.tau, scope.expectedArc);
      wasDanger = scope.danger;
      return scope.danger = Math.abs(expected - actual) >= scope.threshold;
    };

    ProgressPieX.prototype.arcTween = function(scope, transition, newAngle, arc) {
      return transition.attrTween("d", function(d) {
        var interpolate;
        interpolate = d3.interpolate(d.endAngle, newAngle);
        return function(t) {
          d.endAngle = interpolate(t);
          return arc(d);
        };
      });
    };

    return ProgressPieX;

  })();

}).call(this);
