
/**
  * @ngdoc directive
  * @name ui-progresspie.directive:progresspie
  * @description
  * # progressPie
 */

(function() {
  var ProgressPie;

  angular.module('ui-progresspie', []).directive('progresspie', function() {
    return {
      controller: 'ProgressPieCtrl as ctrl',
      link: function(scope, element, attr, ctrl) {
        scope.$watch('ctrl.actual', function() {
          return ctrl.update();
        });
        scope.$watch('ctrl.expected', function() {
          return ctrl.update();
        });
        return ctrl.draw(element);
      },
      bindToController: {
        actual: '=',
        expected: '='
      }
    };
  }).controller('ProgressPieCtrl', ProgressPie = (function() {
    ProgressPie.prototype.actual = 0;

    ProgressPie.prototype.expected = 0;

    function ProgressPie() {
      this.size = 240;
      this.updateSpeed = 500;
      this.radius = this.size / 2;
      this.tau = 2 * Math.PI;
      this.threshold = 0.1;
      this.normalColor = "#78c000";
      this.dangerColor = "#f00";
    }

    ProgressPie.prototype.draw = function(element) {
      var actualInner, actualOuter, centerCircle, circleRadius, danger, expectedInner, expectedOuter, fontSize, gap, lineGap, meters, progressLabel, progressVal, radius, svg, textGroup;
      this.elem = d3.select(element[0]);
      radius = this.size / 2;
      actualInner = this.radius - (this.radius * 0.10);
      actualOuter = this.radius;
      gap = this.radius * 0.02;
      expectedInner = this.radius - (this.radius * 0.17);
      expectedOuter = actualInner - gap;
      circleRadius = this.radius * 0.7;
      danger = false;
      fontSize = this.radius * 0.4;
      lineGap = fontSize * 0.65;
      this.actualArc = d3.svg.arc().innerRadius(actualInner).outerRadius(actualOuter).cornerRadius(90).startAngle(0);
      this.expectedArc = d3.svg.arc().innerRadius(expectedInner).outerRadius(expectedOuter).cornerRadius(90).startAngle(0);
      svg = this.elem.append("svg").attr("width", this.size).attr("height", this.size).append("g").attr("transform", "translate(" + this.radius + "," + this.radius + ")");
      centerCircle = svg.append("circle").attr("cx", 0).attr("cy", 0).attr("r", circleRadius).style("fill", "#000").style("opacity", "0.05");
      textGroup = svg.append("g").attr("alignment-baseline", "middle");
      progressVal = textGroup.append("text").attr("text-anchor", "middle");
      this.progressNum = progressVal.append("tspan").text("0").attr("font-size", fontSize);
      progressVal.append("tspan").attr("font-size", fontSize / 2).text("%");
      progressLabel = textGroup.append("text").attr("font-size", fontSize / 2).attr("transform", "translate(0, " + lineGap + ")").attr("text-anchor", "middle").text("Progress");
      meters = svg.append("g").attr("fill", this.normalColor);
      this.actualPath = meters.append("path").datum({
        endAngle: 0
      }).attr("d", this.actualArc);
      return this.expectedPath = meters.append("path").datum({
        endAngle: 0
      }).attr("d", this.expectedArc).attr("opacity", "0.33");
    };

    ProgressPie.prototype.isDanger = function() {
      return this.expected - this.actual >= this.threshold;
    };

    ProgressPie.prototype.update = function() {
      var endColor;
      console.log("Update: " + this.actual + ", " + this.expected);
      this.progressNum.text(Math.round(this.actual * 100));
      endColor = this.isDanger() ? this.dangerColor : this.normalColor;
      this.actualPath.transition().duration(this.updateSpeed).style("fill", endColor).call(this.arcTween, this.actual * this.tau, this.actualArc);
      return this.expectedPath.transition().duration(this.updateSpeed).style("fill", endColor).call(this.arcTween, this.expected * this.tau, this.expectedArc);
    };

    ProgressPie.prototype.arcTween = function(transition, newAngle, arc) {
      return transition.attrTween("d", function(d) {
        var interpolate;
        interpolate = d3.interpolate(d.endAngle, newAngle);
        return function(t) {
          d.endAngle = interpolate(t);
          return arc(d);
        };
      });
    };

    ProgressPie.prototype.setRandom = function() {
      console.log("Set random was called");
      return this.update(Math.random(), Math.random());
    };

    return ProgressPie;

  })());

}).call(this);
