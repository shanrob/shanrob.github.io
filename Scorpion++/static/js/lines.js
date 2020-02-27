



var lineChartWidth = $("#sml-mpls").width() - 50;
var lineChartHeight = 100;

function makeLines(data) {
	console.log("makin lines at the line factory");

	//get list of reading types/target variables:
	var tvars = d3.map(data[0]);
		tvars.remove("readings");
	var tkeys = tvars.keys();
	var datamap = makeMap(data, tkeys);
		datamap = d3.map(datamap);

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

	var x = d3.scaleTime().range([0, lineChartWidth]);
	var y = d3.scaleLinear().range([lineChartHeight, 0]);

	var vline = d3.line()
					.x(function(d, i) {
						return x(i);
					})
					.y(function(d) {
						return y(d);
					})

		x.domain([0, 100]);

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