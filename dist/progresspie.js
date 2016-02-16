
/**
  * @ngdoc directive
  * @name ui-progresspie.directive:progresspie
  * @description
  * # progressPie
 */

(function() {
  var ProgressPieX;

  angular.module('ui-progresspie', []).directive('progresspie', function() {
    return {
      controller: 'ProgressPieCtrl as ctrl',
      link: function(scope, element, attr, ctrl) {
        ctrl.draw(element);
        return ctrl.printValues;
      }
    };
  }).controller('ProgressPieCtrl', ProgressPieX = (function() {
    function ProgressPieX() {
      this.size = 220;
      console.log("Constructor called!");
      this.updateSpeed = 1000;
      this.radius = this.size / 2;
      console.log("Radius set to " + this.radius + ".");
      this.tau = 2 * Math.PI;
      this.threshold = 0.1;
      this.normalColor = "#78c000";
      this.dangerColor = "#f00";
    }

    ProgressPieX.prototype.draw = function(element) {
      var actualInner, actualOuter, centerCircle, circleRadius, danger, expectedInner, expectedOuter, fontSize, gap, lineGap, progressLabel, progressVal, radius, svg, textGroup;
      this.elem = d3.select(element[0]);
      console.log("draw called!");
      console.log("size is " + this.size);
      radius = this.size / 2;
      console.log("Radius set to " + this.radius + ".");
      console.log(this.radius);
      actualInner = this.radius - (this.radius * 0.10);
      actualOuter = this.radius;
      gap = this.radius * 0.02;
      expectedInner = this.radius - (this.radius * 0.17);
      expectedOuter = actualInner - gap;
      circleRadius = this.radius * 0.7;
      danger = false;
      this.actualVal = 0;
      this.expectedVal = 0;
      console.log("Actual Inner: " + actualInner);
      console.log("Actual Outer: " + actualOuter);
      console.log("Gap: " + gap);
      console.log("Expected Inner: " + expectedInner);
      console.log("Expected Outer: " + expectedOuter);
      console.log("Circle Radius: " + circleRadius);
      fontSize = this.radius * 0.4;
      lineGap = fontSize * 0.65;
      this.actualArc = d3.svg.arc().innerRadius(actualInner).outerRadius(actualOuter).cornerRadius(90).startAngle(0);
      this.expectedArc = d3.svg.arc().innerRadius(expectedInner).outerRadius(expectedOuter).cornerRadius(90).startAngle(0);
      svg = this.elem.append("svg").attr("width", this.size).attr("height", this.size).append("g").attr("transform", "translate(" + this.radius + "," + this.radius + ")");
      centerCircle = svg.append("circle").attr("cx", 0).attr("cy", 0).attr("r", circleRadius).style("fill", "#000").style("opacity", "0.05");
      textGroup = svg.append("g").attr("alignment-baseline", "middle");
      progressVal = textGroup.append("text").attr("text-anchor", "middle").append("tspan").text("73").attr("font-size", fontSize).append("tspan").attr("font-size", fontSize / 2).text("%");
      progressLabel = textGroup.append("text").attr("font-size", fontSize / 2).attr("transform", "translate(0, " + lineGap + ")").attr("text-anchor", "middle").text("Progress");
      this.meters = svg.append("g").attr("fill", this.normalColor);
      this.actualPath = this.meters.append("path").datum({
        endAngle: 0
      }).attr("d", this.actualArc);
      this.expectedPath = this.meters.append("path").datum({
        endAngle: 0
      }).attr("d", this.expectedArc).attr("opacity", "0.33");
      return this.update(0.5, 0.75);
    };

    ProgressPieX.prototype.isDanger = function() {
      return Math.abs(this.expectedVal - this.actualVal) >= this.threshold;
    };

    ProgressPieX.prototype.update = function(expected, actual) {
      var endColor, startColor;
      this.actualVal = actual;
      this.expectedVal = expected;
      this.actualPath.transition().duration(1000).call(this.arcTween, actual * this.tau, this.actualArc);
      this.expectedPath.transition().duration(1000).call(this.arcTween, expected * this.tau, this.expectedArc);
      startColor = this.meters.attr("fill");
      endColor = this.isDanger() ? this.dangerColor : this.normalColor;
      console.log("Transitioning to " + endColor);
      console.log("Danger? " + (this.isDanger()));
      console.log("Current color: " + startColor);
      return this.meters.transition().duration(1000).tween("color", function() {
        var i;
        i = d3.interpolate(startColor, endColor);
        return function(t) {
          return this.setAttribute("fill", i(t));
        };
      });
    };

    ProgressPieX.prototype.arcTween = function(transition, newAngle, arc) {
      return transition.attrTween("d", function(d) {
        var interpolate;
        interpolate = d3.interpolate(d.endAngle, newAngle);
        return function(t) {
          d.endAngle = interpolate(t);
          return arc(d);
        };
      });
    };

    ProgressPieX.prototype.printValues = function() {};

    return ProgressPieX;

  })());

}).call(this);
