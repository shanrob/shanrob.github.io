
console.log("Generating the line charts...");

// grab the dimensions of the div we want (right panel)
var lineChartWidth = $("#sml-mpls").width() - 50;
var lineChartHeight = 100;

// draws the line charts. 
// will act as an update function. If you give it new data it will redraw
function makeLines(data) {

	// a bit of data processing here:
	// basically just a dictionary for the tvars and their data
	var tvars = d3.map(data[0]);
		tvars.remove("readings");
	var tkeys = tvars.keys();
	var datamap = makeMap(data, tkeys);
		datamap = d3.map(datamap);

	// add an svg for each line chart we want
	var lsvgs = d3.select("#sml-mpls")
			.selectAll("svg")
				.data(datamap.values())

		lsvgs.enter()
			.append("svg")
				.attr("class", "linez")
				.attr("width", lineChartWidth)
				.attr("height", lineChartHeight)
				.style("background-color", "#e8e8e8")
				.append("g")

		lsvgs.exit().remove();

	// create the ranges for x and y on the screen for each line chart.
	var x = d3.scaleTime().range([0, lineChartWidth]);
	var y = d3.scaleLinear().range([lineChartHeight, 0]);

	// instantiate the line object
	// note that I'm using index (d) for the x axis here as a placeholder.
	var vline = d3.line()
					.x(function(d, i) {
						return x(i); 
					}) 
					.y(function(d) {
						return y(d);
					})

		// hard coding the domain for x input because I know my data is 
		// just a random number from 1-100. Will need to dynamically generate
		// once you get your data in here
		x.domain([0, 100]);

	// append lines to each svg,
	// note that y domain is dynamically generated here.
	var vlines = d3.selectAll(".linez").selectAll("g")
						.append("path")
						.attr("d", function(d) {
					y.domain([0, d3.max(d)]);
					return vline(d);
				})
				.style("fill", "none")
				.style("stroke", "gray")
				.style("stroke-width", "1.5px")



}

makeLines(dummy);