window.createGraphic = function (graphicSelector) {
  "use strict";
    var section1 = d3.select('.section1');
	var graphicEl = section1.select('.graphic');
	var graphicVisEl = graphicEl.select('.graphic__vis');
	var graphicProseEl = graphicEl.select('.graphic__prose');

	var margin = 40;
	var size = 450;
	var chartSize = size - margin * 2;
	var axis_bottom_height = chartSize + margin;
	var scaleX = null;
	var scaleY = null;

	var svg = graphicVisEl.append('svg')
			.attr('width', size + 'px')
			.attr('height', size + 'px');

	var parseDate = d3.timeParse("%Y-%m-%d");
	var formatDate = d3.timeFormat('%m');

	var csv_path = '../extra/notícias/news_count_week.csv';
	// update our chart
	function update(step) {

	    d3.csv(csv_path, function(error, data) {
		  if (error) throw error;

		  var data_length = d3.selectAll(data).size()

		  console.log(step)

		  if (step < 0) {
		  	  return
		  } else {//if (step < data_length) {

			  // format the data
			  data.forEach(function(d) {
			    d.quantity = +d.titulo;
			    d.date = formatDate(parseDate(d.data));
			  });

			  // Animation			  
			  svg.selectAll("rect")
			  	.filter(function (d) { return d.date == step;})
			    .transition()
			    .duration(800)
			    .attr("y", function(d) { return scaleY(d.quantity) + margin; })
			    .attr("height", function(d) { return axis_bottom_height - (scaleY(d.quantity) + margin); })
			    .delay(function(d,i){console.log(i) ; return(i*100)})

		  }

		});
	}
	
	// little helper for string concat if using es5
	function translate(x, y) {
		return 'translate(' + x + ',' + y + ')'
	}

	function setupCharts() {
		
		var chart = svg.append('g')
			.classed('chart', true)
			.attr("transform",
				  "translate(" + margin + "," + margin + ")")
      		
		scaleX = d3.scaleBand()
		scaleY = d3.scaleLinear()

		d3.csv(csv_path, function(error, data) {
			if (error) throw error;

			//format the data
			data.forEach(function(d) {
				d.quantity = +d.titulo;
				d.date = formatDate(parseDate(d.data));
			});

			// scale the range of the data in the domains
			var domainX = data.map(function(d) { return d.ticks; });
			var domainY = [0,d3.max(data,
									function(d) { return d.quantity; })];

			scaleX
				.domain(domainX)
				.range([0, chartSize])
          		.padding(0.1);

			scaleY
				.domain(domainY)
				.range([chartSize, 0]);


			svg.append("g")
				.attr("transform", "translate(" + margin + "," + axis_bottom_height + ")")
				.call(d3.axisBottom(scaleX));

			svg.append("g")
				.attr("transform", "translate(" + margin + "," + margin + ")")
				.call(d3.axisLeft(scaleY));

			// append the rectangles for the bar chart
			svg.selectAll(".bar")
		       .data(data)
	           .enter()
	           .append("rect")
	           .attr("class", "bar off")
	           .attr("x", function(d) { return margin + scaleX(d.ticks); })
	           .attr("width", scaleX.bandwidth())
	           // no bar at the beginning thus:
	           .attr("y", function(d) { return scaleY(0) + margin; })
	           .attr("height", function(d) { return axis_bottom_height - (scaleY(0) + margin); });

		})

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