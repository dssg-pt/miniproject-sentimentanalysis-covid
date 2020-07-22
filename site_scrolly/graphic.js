/* 
	I've created a function here that is a simple d3 chart.
	This could be anthing that has discrete steps, as simple as changing
	the background color, or playing/pausing a video.
	The important part is that it exposes and update function that
	calls a new thing on a scroll trigger.
*/
window.createGraphic = function(graphicSelector) {
	var graphicEl = d3.select('.graphic')
	var graphicVisEl = graphicEl.select('.graphic__vis')
	var graphicProseEl = graphicEl.select('.graphic__prose')

	var margin = 20
	var size = 400
	var chartSize = size - margin * 2
	var scaleX = null
	var scaleY = null
	//var dataX = [1, 2, 3, 4, 5, 6]
	//var dataY = [79, 237, 2484, 2849, 2128, 1072]
	//var extent = d3.extent(dataY)
	var minR = 10
	var maxR = 24
	
	// actions to take on each step of our scroll-driven story
	var steps = [
		function step0() {
			// circles are centered and small
			var t = d3.transition()
				.duration(800)
				.ease(d3.easeQuadInOut)
			    



		},
	]

	// update our chart
	function update(step) {
		steps[step].call()
	}
	
	// little helper for string concat if using es5
	function translate(x, y) {
		return 'translate(' + x + ',' + y + ')'
	}

	function setupCharts() {
		var svg = graphicVisEl.append('svg')
			.attr('width', size + 'px')
			.attr('height', size + 'px')
		
		//var chart = svg.append('g')
		//	.classed('chart', true)
		//	.attr('transform', 'translate(' + margin + ',' + margin + ')')

		scaleX = d3.scaleLinear().range([0, chartSize])
		scaleY = d3.scaleLinear().range([chartSize, 0])

	    var valueline = d3.line()
    		.x(function(d) { return scaleX(d.mes); })
    		.y(function(d) { return scaleY(d.titulo); });

    	// Get the data
		d3.csv("num_noticias.csv", function(error, data) {
			if (error) throw error;

		    data.forEach(function(d) {
		        d.mes = d.Mes;
		        d.titulo = d.Titulo;
		    });

		    // Scale the range of the data
		    scaleX.domain(d3.extent(data, function(d) { return d.mes; }));
		    scaleY.domain([0, d3.max(data, function(d) { return d.titulo; })]);

		    // Add the valueline path.
		    svg.append("path")
		    	.data([data])
		        .attr("class", "line")
		        .attr("d", valueline(data));

		    // Add the X Axis
		    svg.append("g")
		        .attr("class", "x axis")
		        .attr("transform", "translate(0," + size + ")")
		        .call(xAxis);

		    // Add the Y Axis
		    svg.append("g")
		        .attr("class", "y axis")
		        .call(yAxis);

});
	}

	function setupProse() {
		var height = window.innerHeight * 0.5
		graphicProseEl.selectAll('.trigger')
			.style('height', height + 'px')
	}

	function init() {
		setupCharts()
		setupProse()
		update(0)
	}
	
	init()
	
	return {
		update: update,
	}
}