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
		temperature: 10
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
			neighboursValues[i] = neighbours[i].getPrevious() ? neighbours[i].getPrevious().temperature : 10;
		}
		
		var temperature = 4*(neighboursValues[8]+neighboursValues[10]+neighboursValues[12]+neighboursValues[14]);
		temperature += (neighboursValues[15]+neighboursValues[9]+neighboursValues[11]+neighboursValues[13]);
		temperature = temperature / 20;
		
		ret.temperature = temperature; 
		
	},
	getDefaultProperties: function() {return jQuery.extend(true, {}, this.defaultProperties);},
};	
