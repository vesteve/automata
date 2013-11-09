/*
 * ToDo: 
 *   
 * 
 * 
 */
 
/* ---------------------------------------------------------------------------------------------- */
//Cell Transparent Decorator 
function CellDecorator(cell) {
	this.innerCell = cell;
}
CellDecorator.prototype.setInner = function(cell) { this.innerCell = cell;};
CellDecorator.prototype.getInner = function() { return this.innerCell; };
CellDecorator.prototype.getLocation = function() { return this.innerCell.getLocation();};
CellDecorator.prototype.getProperties = function() { return this.innerCell.getProperties();};
CellDecorator.prototype.getPrevious = function() { return this.innerCell.getPrevious();};
CellDecorator.prototype.getParent = function() { return this.innerCell.getParent();};
CellDecorator.prototype.update = function() {	this.innerCell.update(); };
CellDecorator.prototype.persist = function() { this.innerCell.persist(); };

/* ---------------------------------------------------------------------------------------------- */
//Cell Heater Decorator
function HeaterCellDecorator(cell) {
		this.innerCell = cell;
}
HeaterCellDecorator.prototype = new CellDecorator();
HeaterCellDecorator.prototype.update = function() { 
	// Update cell as usual
	this.innerCell.update();
	
	// re-set the heat property.
	this.innerCell.getProperties().temperature = 500;
};

/* ---------------------------------------------------------------------------------------------- */
//Cell Performance Decorator
function CellPerformanceDecorator(cell, performanceLogger) {
		this.innerCell = cell;
		this.logger = performanceLogger;
}
CellPerformanceDecorator.prototype = new CellDecorator();
CellPerformanceDecorator.prototype.update = function() {
	
	var time = window.performance.now();
	
	// Update cell as usual
	this.innerCell.update();
	
	time = window.performance.now() - time;
	
	return time;
	//console.log("Update took: " + time + " milliseconds");
};

