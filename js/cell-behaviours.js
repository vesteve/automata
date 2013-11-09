/*
 * ToDo: 
 * 	Refactor borders
 * 		
 *  
 * 
 * 
 */
 
/* ---------------------------------------------------------------------------------------------- */
//Cell Behaviour
function HeatDispersionBehaviour() {
	
	this.defaultProperties = {
		calor: 10
	};
}
HeatDispersionBehaviour.prototype = {
	setNewState: function(cell) {
		var ret = cell.getProperties();
		
		// It uses a Moore Neighbourhood 
		var neighbours = MooreNeighbourhood.getNeighbourhood(cell);
		var neighboursValues = new Array(neighbours.length);
		
		// REFACTOR THIS PART
		for(var i=0; i<neighbours.length;i++) {
			neighboursValues[i] = neighbours[i].getPrevious() ? neighbours[i].getPrevious().calor : 10;
		}
		
		var calor = 4*(neighboursValues[8]+neighboursValues[10]+neighboursValues[12]+neighboursValues[14]);
		calor += (neighboursValues[15]+neighboursValues[9]+neighboursValues[11]+neighboursValues[13]);
		calor = calor / 20;
		
		ret.calor = calor; 
		
	},
	getDefaultProperties: function() {return jQuery.extend(true, {}, this.defaultProperties);},
};	
