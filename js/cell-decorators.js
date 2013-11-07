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
CellDecorator.prototype.getNeighbourhood = function() { return this.innerCell.getNeighbourhood();};
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
	this.innerCell.update();
	this.innerCell.getProperties().calor = 500;
};