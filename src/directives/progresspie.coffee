#'use strict'
###*
 # @ngdoc directive
 # @name ui-progresspie.directive:progresspie
 # @description
 # # progressPie
###



class Animal
    constructor: (@name) ->

    move: (meters) ->
        console.log @name + " moved #{meters}m."

snake = new Animal('snake')
snake.move(10)



angular.module 'ui-progresspie', []
    .directive 'progresspie', ->
        new ProgressPieX(220)


class ProgressPieX
    constructor: (@fooo) ->
        #console.log "Constructor called!"
        #radius = @size / 2
        #console.log "Radius set to #{@radius}."
        #@tau = 2 * Math.PI
        #@threshold = 0.1
        #@normalColor = "#78c000"
        #@dangerColor = "#f00"

    restrict: 'EA'

    link: (scope, element, attr) ->
        console.log "link called!"
        console.log "size is #{@fooo}"
        radius = @size / 2
        console.log "Radius set to #{@radius}."
        console.log @radius
        actualInner = @radius - (@radius * 0.10)
        actualOuter = @radius
        expectedInner = @radius - (@radius * 0.17)
        expectedOuter = actualInner - gap
        gap = @radius * 0.02
        circleRadius = @radius * 0.7
        danger = false
        actualVal = 0
        expectedVal = 0

        @elem = d3.select(element[0])

        fontSize = @radius * 0.4

        actualArc = d3.svg.arc()
            .innerRadius(actualInner)
            .outerRadius(actualOuter)
            .cornerRadius(90)
            .startAngle(0)

        expectedArc = d3.svg.arc()
            .innerRadius(expectedInner)
            .outerRadius(expectedOuter)
            .cornerRadius(90)
            .startAngle(0)

        svg = elem.append "svg"
            .attr "width", @size
            .attr "height", @size
            .append "g"
            .attr "transform", "translate(#{@radius},#{@radius})"

        centerCircle = svg.append "circle"
            .attr "cx", 0
            .attr "cy", 0
            .attr "r", circleRadius
            .style "fill", "#000"
            .style "opacity", "0.05"

        textGroup = svg.append "g"
            .attr "alignment-baseline", "middle"

        progressVal = textGroup.append "text"
            .attr "text-anchor", "middle"
            .append "tspan"
                .text "73"
                .attr "font-size", fontSize
            .append "tspan"
                .attr "font-size", fontSize / 2
                .text "%"

        progressLabel = textGroup.append "text"
            .attr "font-size", fontSize / 2
            .attr "transform", "translate(0, #{fontSize})"
            .attr "text-anchor", "middle"
            .text "Progress"

        meters = svg.append("g");

        actualPath = meters.append "path"
            .datum {endAngle: 0}
            .attr "d", this.actualArc

        expectedPath = meters.append "path"
            .datum {endAngle: 0}
            .attr "d", this.expectedArc
            .attr "opacity", "0.33"

        #@update scope, 0.5, 0.75

    update: (scope, expected, actual) ->
        scope.actualPath.transition().duration(1000).call(arcTween, actualVal * scope.tau, scope.actualArc)
        scope.expectedPath.transition().duration(1000).call(arcTween, expectedVal * scope.tau, scope.expectedArc)
        wasDanger = scope.danger
        scope.danger = Math.abs(expected - actual) >= scope.threshold

    
        #if (scope.danger != wasDanger) {
        #    startColor = this.danger ? this.normalColor : this.dangerColor;
        #    endColor = this.danger ? this.dangerColor : this.normalColor;
        #    this.meters.transition()
        #        .duration(1000)
        #        .tween("color", colorTween startColor, endColor)
        #}

    arcTween: (scope, transition, newAngle, arc) ->
        transition.attrTween "d", (d) ->
            interpolate = d3.interpolate(d.endAngle, newAngle);
            return (t) ->
                d.endAngle = interpolate t;
                return arc d
