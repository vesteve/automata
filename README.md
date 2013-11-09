Cellular Automata Framework
========

## Synopsis

At the top of the file there should be a short introduction and/ or overview that explains **what** the project is. This description should match descriptions added for package managers (Gemspec, package.json, etc.)

## Code Example

### A simple Cellular Automata

	<script type="application/javascript" src="js/jquery/jquery-1.10.2.js"></script>
	<script type="application/javascript" src="js/automata.js"></script>
	<script type="application/javascript" src="js/cell-behaviours.js"></script>
	<script type="application/javascript" src="js/cell-decorators.js"></script>

	...

	<script type="application/javascript">
	
		// Create Cellular Automata, 20x20x1 - Cells to change using HeatDispersion
		var cellAuto = new AutomataFactory().build( 20, 20, 1, new HeatDispersionBehaviour() );
		
		// Cell 10,10,0 is set to a Heater
		cellAuto.setCell( [10], [10], [0], new HeaterCellDecorator(cellAuto.getCells()[10][10][0]) );
	
		...
	
		setInterval(function() {
			cellAuto.update();
		}, 100);
	</script>
	
### Cellular Automata and Visualization using d3js

	<style type="text/css">
		.chart rect {
			stroke: white;
		}
	</style>

	<script src="js/d3js/d3.v3.js" charset="utf-8"></script>
	<script type="application/javascript" src="js/jquery/jquery-1.10.2.js"></script>
	<script type="application/javascript" src="js/automata.js"></script>
	<script type="application/javascript" src="js/cell-behaviours.js"></script>
	<script type="application/javascript" src="js/cell-decorators.js"></script>

	...

	<script type="application/javascript">
	
		var cellAuto = null;
		var cells = null;
		var size = 20;
		var data = new Array();
		var chart;
		
		
		var color =  d3.scale.linear().domain([0,100]).range(['steelblue', 'red']);

		$( document ).ready(function() {
			
			cellAuto = new AutomataFactory().build( 20, 20,1, new HeatDispersionBehaviour());
			cells = cellAuto.getCells();
			
			for(var x = 0; x < cells.length; x++) {
				for(var y = 0; y < cells[x].length; y++) {
					for (var z = 0; z < cells[x][y].length; z++) data.push( cells[x][y][z] );
				}
			}
		
			chart = d3.select("body").append("svg")
				.attr("class", "chart")
				.attr("width", size*100 - 1)
				.attr("height", size*100 - 1);
				
			update();
			
			cellAuto.setCell(10, 10, 0, new HeaterCellDecorator(cellAuto.getCells()[10][10][0])); 
		
		});	
		
		function update() {
			
			// Cells
			var rect = chart.selectAll("rect")
				.data(data);
				
			rect.enter().append("rect")
				.attr("x", function(d, i) {	return d.getLocation().x * size; })
				.attr("y", function(d, i) { return d.getLocation().y * size; })
				.attr("width", size)
				.attr("height", size)
				.style("fill", function(d) {return color(d.getProperties().temperature); })
				.on("click", function(d) {
					
					var l = d.getLocation();
					
					if (cellAuto.getCells()[l.x][l.y][l.z] instanceof HeaterCellDecorator) {
						cellAuto.setCell([l.x], [l.y], [l.z], cellAuto.getCells()[l.x][l.y][l.z].getInner());
					}
					else cellAuto.setCell([l.x], [l.y], [l.z],new HeaterCellDecorator(cellAuto.getCells()[l.x][l.y][l.z]));		
				});
			
			rect.transition()
				.style("fill", function(d) { 
					return color(d.getProperties().temperature); 
					});
		
			rect.exit().transition()
				.remove();
		}
		
		setInterval(function() {
			cellAuto.update();
			update();	
		}, 100);

	</script>
	
## Motivation

A short description of the motivation behind the creation and maintenance of the project. This should explain **why** the project exists.

## Installation

Provide code examples and explanations of how to get the project.

## API Reference

Depending on the size of the project, if it is small and simple enough the reference docs can be added to the README. For medium size to larger projects it is important to at least provide a link to where the API reference docs live.

## Tests

Describe and show how to run the tests with code examples.

## Contributors

Let people know how they can dive into the project, include important links to things like issue trackers, irc, twitter accounts if applicable.

## License

	The MIT License (MIT)

	Copyright (c) 2013 Victor Emilio Esteve
	
	Permission is hereby granted, free of charge, to any person obtaining a copy of
	this software and associated documentation files (the "Software"), to deal in
	the Software without restriction, including without limitation the rights to
	use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
	the Software, and to permit persons to whom the Software is furnished to do so,
	subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
	FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
	COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
	IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
	CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
