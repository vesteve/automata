/*
 * ToDo: 
 * 
 * 		- Refactor and create another Strategy for Neighbourhood.
 * 			- This strategy has to caché the neighbourhood.
 * 
 * 		- Change name for MooreCellsAutomataFactory
 * 
 * 
 */


/* ---------------------------------------------------------------------------------------------- */
// Cellular Automata
function CellularAutomata(w, h, d) {
	this.cells = new Array(w);
	
	for(var i =0; i< w; i++) {
		this.cells[i] = new Array(h);
		
		for(var j=0; j<h;j++) {
			this.cells[i][j] = new Array(d);
		}
	}
}
CellularAutomata.prototype = {
	constructor: CellularAutomata,
	getCells: function() {return this.cells;},
	update: function() {
		
		for(var x = 0; x < this.cells.length; x++) {
			for(var y = 0; y < this.cells[x].length; y++) {
				for (var z = 0; z < this.cells[x][y].length; z++) this.cells[x][y][z].update();
			}
		}
		
		for(var x = 0; x < this.cells.length; x++) {
			for(var y = 0; y < this.cells[x].length; y++) {
				for (var z = 0; z < this.cells[x][y].length; z++) this.cells[x][y][z].persist();
			}
		}
	}
};

/* ---------------------------------------------------------------------------------------------- */	
// Factory
function MooreCellsAutomataFactory() {
	
}
MooreCellsAutomataFactory.prototype = {
	constructor: MooreCellsAutomataFactory,
	build: function(w, h, d, changeBehaviour) {
		
		var ret = new CellularAutomata(w,h,d);
		
		var cells = ret.getCells();
		// Add cells
		for(var i = 0; i < w; i++) {
			for(var j = 0; j < h ;j++) {
				for (var k = 0; k < d; k++) {
					cells[i][j][k] = new AutomataCell(changeBehaviour, i, j, k, ret);
				}
			}
		}
		return ret;
	}
};

/* ---------------------------------------------------------------------------------------------- */
// Cell
function AutomataCell(changeBehaviour, x, y, z, automata) {
	this.location = { x: x, y: y, z: z};
	
	this.properties = changeBehaviour ? changeBehaviour.getDefaultProperties() : null;
	this.previousProperties = changeBehaviour ? jQuery.extend(true, {}, this.properties) : null;
	this.behaviour = changeBehaviour;
	this.neighbours = null;
	this.automata = automata;
}
AutomataCell.prototype = {
	constructor: AutomataCell,
	getLocation: function() {return this.location; },
	getProperties: function() {return this.properties;},
	getPrevious: function() {return this.previousProperties;},
	getNeighbourhood: function() {return this.behaviour.getCellNeighbours(this);},
	getParent: function() { return this.automata;},
	update: function() {
		this.behaviour.setNewState(this);
	},
	persist: function() { this.previousProperties = jQuery.extend(true, {}, this.properties);}
};

/* ---------------------------------------------------------------------------------------------- */
// Border Cell
function BorderCell(changeBehaviour, x, y, z) {
	
}
BorderCell.prototype = new AutomataCell();
BorderCell.prototype.getNeighbourhood = function(cell) {
	return null;
};
// OVERRIDE GET VALUE BEHAVIOUR!!!!
//BorderCell.prototype


/* ---------------------------------------------------------------------------------------------- */
// Neighbourhood Strategies
function MooreNeighbourhood() {};
MooreNeighbourhood.prototype = {
	getNeighbourhood: function(cell) {}
};
