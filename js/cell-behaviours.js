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
function DispersionBehaviour() {
	
	this.defaultProperties = {
		calor: 10
	};
}
DispersionBehaviour.prototype = {
	setNewState: function(cell) {
		var ret = cell.getProperties();
		var neighbours = MooreNeighbourhood.getNeighbourhood(cell);
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
};	
