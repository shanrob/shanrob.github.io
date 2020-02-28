
console.log("Generating the scatter plot/projection...");

// grab the dimensions of the div we want
var canvasW = $("#scatter").width();
var canvasH = $("#scatter").height();

// setting up dimensions for the scatter plot
var margin = {top:10, right:10, bottom: 20, left:20},
	width = canvasW - margin.left - margin.right;
	height = canvasH - margin.top - margin.bottom;

// ranges for the x and y axes on the screen
var x = d3.scaleLinear()
			.range([0, width-40]);

var y = d3.scaleLinear()
			.range([height-30, 0]);

// domains for the input from the data
// just using t1 and t2 as placeholders for x and y right now
x.domain(d3.extent(dummy, function(d) { return +(d.t1)}));
y.domain(d3.extent(dummy, function(d) { return +(d.t2)}));

//instantiate the axes for x and y
var xAxis = d3.axisBottom(x);
var yAxis = d3.axisLeft(y);

// create an svg for the scatter plot
var svg = d3.select("#scatter")
			.append("svg")
				.attr("width", width)
				.attr("height", height)
				.style("border", "2px solid #e8e8e8")
				.style("border-radius", "5px")
				.append("g")
					.attr("transform", "translate(" + (margin.left+10) + ", " + margin.top + ")");

	// draw a point for each data point
	svg.selectAll("circle")
			.data(dummy)
			.enter()
			.append("circle")
				.attr("id", function(d, i) {
					return i;
				})
				.attr("r", "4px")
				.attr("cx", function(d) {
					return (x(+(d.t1)));
				})
				.attr("cy", function(d) {
					return (y(+(d.t2)))
				})
				.style("fill", "gray")
				.on("mouseover", function(d) {   // mouseover effect to highlight
					d3.select(this).style("fill", "blue")
									.style("r", 7);

					// mouseover effect to highlight the rects in the barcode charts
					var currid = this.id;
					d3.selectAll("rect").style("fill", function(d) {
						if (this.id == currid) {
							return colorUp(d);
						} else {
							return "#e8e8e8"; 
						}
					})
				})
				.on("mouseout", function(d) {

					d3.select(this).style("fill", "gray")
									.style("r", 4);
					var currid = this.id;

					d3.selectAll("rect").style("fill", function(d) {
						return colorUp(d);
					})
				})


//I commented out these axes since it'll eventually be a projection, but keeping for now

	// svg.append("g")
	// 	.attr("class", "xaxis")
	// 	.attr("transform", "translate(0," + (height-30) + ")")
	// 	.call(xAxis)
	// 	.append("text")
	// 		.attr("class", "label")
	// 		.attr("x", width-40)
	// 		.attr("y", 0)
	// 		.style("text-anchor", "end")
	// 		.text("X Axis")
	// 		.style("color", "blue")

	//   svg.append("g")
	//       .attr("class", "yaxis")
	//       .attr("transform", "translate(-5,-5)")
	//       .call(yAxis)
	//     .append("text")
	//       .attr("class", "label")
	//       .attr("transform", "rotate(-90)")
	//       .attr("y", 0)
	//       .attr("dy", ".71em")
	//       .style("text-anchor", "end")


// update function. Anytime a change is made the data, the vis will get redrawn
// as long as you give it the updated data.

function updateScatter(data) {

	console.log("updating scatter plot");
	var svgCircles = d3.selectAll("circle")
						.data(data)

		svgCircles.enter()
			.append("circle")
			.attr("r", "4px")
				.attr("cx", function(d) {
					return (x(+(d.t1)));
				})
				.attr("cy", function(d) {
					return (y(+(d.t2)))
				})
				.style("fill", "blue");

		svgCircles.exit().remove();

}
