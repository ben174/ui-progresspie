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
            ctrl.draw element
            ctrl.printValues

    .controller 'ProgressPieCtrl',
        class ProgressPieX
            constructor: () ->
                @size = 220
                console.log "Constructor called!"
                @updateSpeed = 1000
                @radius = @size / 2
                console.log "Radius set to #{@radius}."
                @tau = 2 * Math.PI
                @threshold = 0.1
                @normalColor = "#78c000"
                @dangerColor = "#f00"

            draw: (element) ->
                @elem = d3.select(element[0])
                console.log "draw called!"
                console.log "size is #{@size}"
                radius = @size / 2
                console.log "Radius set to #{@radius}."
                console.log @radius
                actualInner = @radius - (@radius * 0.10)
                actualOuter = @radius
                gap = @radius * 0.02
                expectedInner = @radius - (@radius * 0.17)
                expectedOuter = actualInner - gap
                circleRadius = @radius * 0.7
                danger = false
                @actualVal = 0
                @expectedVal = 0

                console.log "Actual Inner: #{actualInner}"
                console.log "Actual Outer: #{actualOuter}"
                console.log "Gap: #{gap}"
                console.log "Expected Inner: #{expectedInner}"
                console.log "Expected Outer: #{expectedOuter}"
                console.log "Circle Radius: #{circleRadius}"


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
                    .append "tspan"
                        .text "73"
                        .attr "font-size", fontSize
                    .append "tspan"
                        .attr "font-size", fontSize / 2
                        .text "%"

                progressLabel = textGroup.append "text"
                    .attr "font-size", fontSize / 2
                    .attr "transform", "translate(0, #{lineGap})"
                    .attr "text-anchor", "middle"
                    .text "Progress"

                @meters = svg.append("g")
                    .attr("fill", @normalColor);

                @actualPath = @meters.append "path"
                    .datum {endAngle: 0}
                    .attr "d", @actualArc

                @expectedPath = @meters.append "path"
                    .datum {endAngle: 0}
                    .attr "d", @expectedArc
                    .attr "opacity", "0.33"

                @update 0.5, 0.75

            isDanger: ->
                return Math.abs(@expectedVal - @actualVal) >= @threshold

            update: (expected, actual) ->
                @actualVal = actual
                @expectedVal = expected
                @actualPath.transition()
                    .duration(1000)
                    .call(@arcTween, actual * @tau, @actualArc)
                @expectedPath.transition()
                    .duration(1000)
                    .call(@arcTween, expected * @tau, @expectedArc)
                startColor = @meters.attr "fill"
                endColor = if @isDanger() then @dangerColor else @normalColor
                console.log "Transitioning to #{endColor}"
                console.log "Danger? #{@isDanger()}"
                console.log "Current color: #{startColor}"
                @meters.transition()
                    .duration 1000
                    .tween "color", () ->
                        i = d3.interpolate(startColor, endColor)
                        return (t) ->
                            this.setAttribute "fill", i(t)

            arcTween: (transition, newAngle, arc) ->
                transition.attrTween "d", (d) ->
                    interpolate = d3.interpolate(d.endAngle, newAngle);
                    return (t) ->
                        d.endAngle = interpolate t;
                        return arc d
            printValues: ->
