/*
 * ToDo: 
 * 
 * 		- Refactor MooreDispersion to Dispersion. It is know it needs a MooreNeighbourhood Strategy.
 *  
 * 
 * 
 */
 
/* ---------------------------------------------------------------------------------------------- */
//Cell Behaviour
function MooreDispersionBehaviour() {
	this.defaultProperties = {
		calor: 10
	};
}
MooreDispersionBehaviour.prototype = {
	setNewState: function(cell) {
		var ret = cell.getProperties();
		var neighbours = cell.getNeighbourhood();
		var neighboursValues = new Array(neighbours.length);
		
		for(var i=0; i<neighbours.length;i++) {
			neighboursValues[i] = neighbours[i].getPrevious() ? neighbours[i].getPrevious().calor : 10;
		}
		var avg = d3.mean(neighboursValues);
		var max = d3.max(neighboursValues);
		
		var calor = 4*(neighboursValues[8]+neighboursValues[10]+neighboursValues[12]+neighboursValues[14]);
		calor += (neighboursValues[15]+neighboursValues[9]+neighboursValues[11]+neighboursValues[13]);
		calor = calor / 20;
		
		
		ret.calor = calor; 
		
	},
	getDefaultProperties: function() {return jQuery.extend(true, {}, this.defaultProperties);},
	getCellNeighbours: function(cell) {
		var ret = null;
		
		var automata = cell.getParent();
		var cells = automata.getCells();
		
		var w = cells.length;
		var h = cells[0].length;
		var d = cells[0][0].length;
		
		var x = cell.getLocation().x;
		var y = cell.getLocation().y;
		var z = cell.getLocation().z;
		

		// [n,		ne,			e, 		se, 		s, 			sw, 	w, 		nw]
		// [y-1,	y-1 x+1,	x+1, 	y+1 x+1, 	y+1,	y+1	x-1, 	x-1,	y-1 x-1]
		ret = [
			(z-1<0) || (y-1<0) ? new BorderCell(x,y-1,z-1) : cells[x][y-1][z-1],
			(z-1<0) || (y-1<0) || (x+1>=w) ? new BorderCell(x+1,y-1,z-1) : cells[x+1][y-1][z-1],
			(z-1<0) || (x+1>=w) ? new BorderCell(x+1,y,z-1) : cells[x+1][y][z-1],
			(z-1<0) || (y+1>=h) || (x+1>=w) ? new BorderCell(x+1,y+1,z-1) : cells[x+1][y+1][z-1],
			(z-1<0) || (y+1>=h) ? new BorderCell(x,y+1,z-1) : cells[x][y+1][z+1],
			(z-1<0) || (y+1>=h) || (x-1<0) ? new BorderCell(x-1,y+1,z-1) : cells[x-1][y+1][z-1],
			(z-1<0) || (x-1<0) ? new BorderCell(x-1,y-1,z-1) : cells[x-1][y][z-1],
			(z-1<0) || (y-1<0) || (x-1<0) ? new BorderCell(x-1,y-1,z-1) : cells[x-1][y-1][z-1],

			(y-1<0) ? new BorderCell(x,y-1,z) : cells[x][y-1][z],
			(y-1<0) || (x+1>=w) ? new BorderCell(x+1,y-1,z) : cells[x+1][y-1][z],
			(x+1>=w) ? new BorderCell(x+1,y,z) : cells[x+1][y][z],
			(y+1>=h) || (x+1>=w) ? new BorderCell(x+1,y+1,z) : cells[x+1][y+1][z],
			(y+1>=h) ? new BorderCell(x,y+1,z) : cells[x][y+1][z],
			(y+1>=h) || (x-1<0) ? new BorderCell(x-1,y+1,z) : cells[x-1][y+1][z],
			(x-1<0) ? new BorderCell(x-1,y-1,z) : cells[x-1][y][z],
			(y-1<0) || (x-1<0) ? new BorderCell(x-1,y-1,z) : cells[x-1][y-1][z],

			(z+1>=d) || (y-1<0) ? new BorderCell(x,y-1,z+1) : cells[x][y-1][z+1],
			(z+1>=d) || (y-1<0) || (x+1>=w) ? new BorderCell(x+1,y-1,z+1) : cells[x+1][y-1][z+1],
			(z+1>=d) || (x+1>=w) ? new BorderCell(x+1,y,z+1) : cells[x+1][y][z+1],
			(z+1>=d) || (y+1>=h) || (x+1>=w) ? new BorderCell(x+1,y+1,z+1) : cells[x+1][y+1][z+1],
			(z+1>=d) || (y+1>=h) ? new BorderCell(x,y+1,z+1) : cells[x][y+1][z+1],
			(z+1>=d) || (y+1>=h) || (x-1<0) ? new BorderCell(x-1,y+1,z+1) : cells[x-1][y+1][z+1],
			(z+1>=d) || (x-1<0) ? new BorderCell(x-1,y-1,z+1) : cells[x-1][y][z+1],
			(z+1>=d) || (y-1<0) || (x-1<0) ? new BorderCell(x-1,y-1,z+1) : cells[x-1][y-1][z+1],
		];

		return ret;
	}
};	
