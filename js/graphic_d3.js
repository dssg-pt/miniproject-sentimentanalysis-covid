window.createGraphic = function(graphicSelector){
		// set the dimensions and margins of the graph
		var margin = {top: 20, right: 20, bottom: 30, left: 40},
		    width = 400 - margin.left - margin.right,
		    height = 300 - margin.top - margin.bottom;

		// set the ranges
		var x = d3.scaleBand()
		          .range([0, width])
		          .padding(0.1);
		var y = d3.scaleLinear()
		          .range([height, 0]);
		          
		// append the svg object to the body of the page
		// append a 'group' element to 'svg'
		// moves the 'group' element to the top left margin
		var svg = d3.select('.graphic').select(".graphic__vis").append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		  .append("g")
		    .attr("transform", 
		          "translate(" + margin.left + "," + margin.top + ")");

		// keep track of data
		var dataOn = 0;

		// get the data
		d3.csv("num_noticias.csv", function(error, data) {
		  if (error) throw error;

		  // format the data
		  data.forEach(function(d) {
		    d.quantity = +d.Titulo;
		  });

		  // Scale the range of the data in the domains
		  x.domain(data.map(function(d) { return d.Mes; }));
		  y.domain([0, d3.max(data, function(d) { return d.quantity; })]);

		  // add the x Axis
		  svg.append("g")
		      .attr("transform", "translate(0," + height + ")")
		      .call(d3.axisBottom(x));

		  // add the y Axis
		  svg.append("g")
		      .call(d3.axisLeft(y));

		  // append the rectangles for the bar chart
		  svg.selectAll(".bar")
		      .data(data)
		      .enter()
		      .append("rect")
		      .attr("class", "bar off")
		      .attr("x", function(d) { return x(d.Mes); })
		      .attr("width", x.bandwidth())
		      // no bar at the beginning thus:
		      .attr("y", function(d) { return y(0); })
		      .attr("height", function(d) { return height - y(0); });

		  

		});

		function update() {

		    d3.csv("num_noticias.csv", function(error, data) {
			  if (error) throw error;

			  var data_length = d3.selectAll(data).size()

			  if (dataOn < data_length) {

				  // format the data
				  data.forEach(function(d) {
				    d.quantity = +d.Titulo;
				  });

				  // Animation
				  svg.selectAll("rect")
				  	.filter(function (d, i) { return i === dataOn;})
				    .transition()
				    .duration(800)
				    .attr("y", function(d) { return y(d.quantity); })
				    .attr("height", function(d) { return height - y(d.quantity); })
				    .delay(function(d,i){console.log(i) ; return(i*100)})

				  dataOn = dataOn + 1

			  } else {
			  	dataOn = 0
			  		// Animation
				  svg.selectAll("rect")
				    .transition()
				    .duration(800)
				    .attr("y", function(d) { return y(0); })
				    .attr("height", function(d) { return height - y(0); })
				    .delay(function(d,i){console.log(i) ; return(i*100)})
			}

		});
	}
	return {
		update: update,
	}
}