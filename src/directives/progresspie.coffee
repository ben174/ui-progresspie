#'use strict'
###*
 # @ngdoc directive
 # @name ui-progresspie.directive:progresspie
 # @description
 # # progressPie
###


angular.module 'ui-progresspie', []
    .directive 'progresspie', () ->
        controller: 'ProgressPieCtrl as ctrl',
        link: (scope, element, attr, ctrl) ->
            scope.$watch 'ctrl.actual', -> ctrl.update()
            scope.$watch 'ctrl.expected', -> ctrl.update()
            ctrl.draw element
        bindToController:
            actual: '='
            expected: '='

    .controller 'ProgressPieCtrl',
        class ProgressPie
            actual: 0
            expected: 0
            threshold: 0.1
            normalColor: "#78c000"
            dangerColor: "#f00"
            size: 240
            updateSpeed: 500

            constructor: () ->
                @radius = @size / 2
                @tau = 2 * Math.PI

            draw: (element) ->
                @elem = d3.select(element[0])
                radius = @size / 2
                actualInner = @radius - (@radius * 0.10)
                actualOuter = @radius
                gap = @radius * 0.02
                expectedInner = @radius - (@radius * 0.17)
                expectedOuter = actualInner - gap
                circleRadius = @radius * 0.7
                danger = false
                fontSize = @radius * 0.4
                lineGap = fontSize * 0.65

                @actualArc = d3.svg.arc()
                    .innerRadius(actualInner)
                    .outerRadius(actualOuter)
                    .cornerRadius(90)
                    .startAngle(0)

                @expectedArc = d3.svg.arc()
                    .innerRadius(expectedInner)
                    .outerRadius(expectedOuter)
                    .cornerRadius(90)
                    .startAngle(0)

                svg = @elem.append "svg"
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

                @progressNum = progressVal.append "tspan"
                    .text "0"
                    .attr "font-size", fontSize

                progressVal.append "tspan"
                    .attr "font-size", fontSize / 2
                    .text "%"

                progressLabel = textGroup.append "text"
                    .attr "font-size", fontSize / 2
                    .attr "transform", "translate(0, #{lineGap})"
                    .attr "text-anchor", "middle"
                    .text "Progress"

                meters = svg.append("g")
                    .attr("fill", @normalColor);

                @actualPath = meters.append "path"
                    .datum {endAngle: 0}
                    .attr "d", @actualArc

                @expectedPath = meters.append "path"
                    .datum {endAngle: 0}
                    .attr "d", @expectedArc
                    .attr "opacity", "0.33"


            isDanger: ->
                return @expected - @actual >= @threshold

            update: ->
                console.log "Update: #{@actual}, #{@expected}"
                @progressNum.text Math.round @actual * 100
                endColor = if @isDanger() then @dangerColor else @normalColor
                @actualPath.transition()
                    .duration @updateSpeed
                    .style "fill", endColor
                    .call @arcTween, @actual * @tau, @actualArc
                @expectedPath.transition()
                    .duration @updateSpeed
                    .style "fill", endColor
                    .call @arcTween, @expected * @tau, @expectedArc

            arcTween: (transition, newAngle, arc) ->
                transition.attrTween "d", (d) ->
                    interpolate = d3.interpolate(d.endAngle, newAngle);
                    return (t) ->
                        d.endAngle = interpolate t;
                        return arc d
            setRandom: ->
                console.log "Set random was called"
                @update Math.random(), Math.random()
