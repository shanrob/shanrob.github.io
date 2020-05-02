
// Dimensions for vis area
var svg_width = $("#overview").width();
var svg_height = 210;

var xstart = svg_width * .01;
var ystart = svg_height * .1;
// Dimensions for grouped bar chart
var ov_width = $("#overview").width() * .95;
var ov_height = $("#overview").height() - 100

var valuediv = d3.select("#overview").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

//axes with the X domain hard coded yes I know this is cheating but EH
var y1 = d3.scaleBand()
			.domain(main_chars)
			.rangeRound([0, (svg_height-ystart)])
			.padding(0.1)

var x1 = d3.scaleLinear()
			.domain([0, 350])
			.range([0, ov_width])

// tooltip div
var bar_info = d3.select("#overview").append("div")
							.attr("class", "tooltip")
							.style("opacity", 0)

d3.json("waffles/data/csvjson.json", function(data) {

	//populate the drop downs with data
	function makeBars(season){

		// Process the data for the right season
		var filtered = data.filter(function(d) {
			return (main_chars.includes(d.character) && d.season == season);
		})

		var episode_names = d3.map(filtered, function(d){return(d.epname)}).keys()

		var ov_data = d3.nest()
					.key(function(d) {return d.episode;})
					.key(function(d) {return d.character;})
					.rollup(function(leaves) {return (leaves.length);})
					.entries(filtered);

		// small multiple svgs
		var svgs = d3.select("#overview")
				.selectAll("svg")
					.data(ov_data, function(d, i) {
						return d.values;
					})

		svgs.enter()
			.append("svg")
				.attr("id", "epbar")
				.attr("class", function(d, i) {
					return episode_names[i]
				})
				.attr("width", (ov_width) - (ov_width*0.02))
				.attr("height", svg_height)
				.style("opacity", 1)
				.attr("transform", "translate(" + (ov_width*0.02) + ", 0)")
				.on("mouseover", function(d) {
					d3.select(this).transition().duration(200).attr("transform", "scale(1.01)")
				})
				.on("mouseout", function(d) {
					d3.select(this).transition().duration(200).attr("transform", "scale(.99)")
				})
				.append("g")
				.append("text")
				.attr("class", "episode_title")
				.attr("text-anchor", "middle")
				.attr("x", (svg_width/2))
				.attr("y", ystart-2)
				.text(function(d, i) {
					return episode_names[i];
				})

		svgs.exit().remove();

		// Create bars for bar charts
		var barcharts = d3.selectAll("#epbar").selectAll("rect")
					.data(function(d) {

					var sorted = (d.values).sort(function(x, y) {
							return d3.ascending(x.key, y.key);
						})

						return sorted;
					})

			barcharts.enter()
				.append("rect")
					.attr("id", function(d) {
						return d.key;
					})
					.attr("class", "lilbar")
					.attr("width", function(d) {
						return 0;
					})
					.attr("height", y1.bandwidth())	
					.attr("y", function(d, i) {
						return y1(d.key)
					})
					.attr("x", xstart)
					.attr("rx", "9px")
					.style("fill", function(d) {
						return colors[d.key]
					})
					.attr("stroke", function(d) {
						return "white"
					})
					.attr("transform", "translate(0, " + ystart + ")")
					.on("mouseover", function(d) {
						// console.log(d.key, d.value, y1(d.key))


						bar_info.transition()
									.duration(300)
									.style("opacity", 1);

						var name = d.key;
						var num = d.value;
						if (num == 1) { 
							num == 0
						}

						bar_info.html(name + ": " + num)
			                .style("left", (x1(num)+12) + "px")		
			                .style("top", (d3.event.pageY + 5) + "px");

			        })
					.on("mouseout", function(d) {
						bar_info.transition()		
			                .duration(300)	
			                .style("opacity", 0);
					})

		// Grow and shrink animation for the bars"
		d3.selectAll(".lilbar").transition()
							.duration(500)
							.attr("width", function(d) {
								return x1(d.value);
							})

		barcharts.exit().remove();
	}

	makeBars("s1");

	$("#season").on("change", function() {
		var selectedVal = this.value;
		makeBars(selectedVal);
	})


});