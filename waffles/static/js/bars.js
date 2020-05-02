
// bounds for the bars
var sznbars_xstart = 35;
var sznbars_xend = 10;
var sznbars_yend = 35;
var bottomAxis = 20;

// Dimensions for season vis
var season_width = $("#season").width();
var season_height = $("#season").height();

var episode_width = $("#episode").width();
var episode_height = $("#episode").height();

// Append svg to the season div
var seasonVis = d3.select("#season")
					.append("svg")
						.attr("class", "szn")
						.attr("width", season_width)
						.attr("height", season_height)

// Append svg to the episode div
var episodeVis = d3.select("#season")
					.append("svg")
						.attr("class", "epz")
						.attr("width", episode_width)
						.attr("height", episode_height)

// get data from the csv
d3.csv("/data/total.csv", function(data) {

	//create data for season vis
	var nested__season_data = d3.nest()
				.key(function(d) {return d.character; })
				.key(function(d) {return d.season;})
				.rollup(function(leaves) {
					return (leaves.length);
				})
				.entries(data);

	//create data for episode vis
	var nested_episode_data = d3.nest()
				.key(function(d) {return d.character; })
				.key(function(d) {return d.season;})
				.key(function(d) {return d.episode;})
				.rollup(function(leaves) {return leaves.length;})
				.entries(data);

	// Start the vis with a vis on Leslie episode 1 season 1
	drawSeasonVis(nested__season_data, "Leslie Knope");
	drawEpisodeVis(nested_episode_data, "Leslie Knope");

});

// Draw the bar chart for seasons
function drawSeasonVis(season, name) {

	var filtered = season.filter(function(d) {
		return name == d.key;
	});

	var season_data = filtered[0].values;

	var sy = d3.scaleBand()
	          .rangeRound([0, (season_height-sznbars_yend)])
	          .padding(0.1);

	var sx = d3.scaleLinear()
			.range([0, season_width - (sznbars_xstart + sznbars_xend)]);

	sy.domain(season_data.map(function(d) { return d.key; }));
	sx.domain([0, d3.max(season_data, function(d){ 
		return d.value; })]);

	var szn_bars = seasonVis.selectAll("rect")
					.data(season_data, function(d) {
						return d.values;
					})

		szn_bars.enter().append("rect")
							.attr("class", "barz")
							.attr("x", sznbars_xstart)
							.attr("y", function(d) {
								return sy(d.key);
							})
							.attr("width", 0)
							.attr("height", sy.bandwidth())
							.attr("rx", "4px")
							.style("fill", colors[name])

		d3.selectAll(".barz").transition().duration(500)
										.attr("width", function(d) {
											return sx(+d.value);
										})

  	seasonVis.append("g")
  		.attr("class", "xaxis")
  		.attr("transform", "translate(" + sznbars_xstart + ", " + (season_height-bottomAxis) + ")")
    	.call(d3.axisBottom(sx)).call(plotx=>plotx.select(".domain").remove());

    seasonVis.append("g")
    	.attr("class", "yaxis")
    	.attr("transform", "translate(" + sznbars_xstart + ", 0)")
    	.call(d3.axisLeft(sy).tickSize(0).tickPadding(7)).call(plotx=>plotx.select(".domain").remove());;

   	seasonVis.append("g")
   		.append("text")
   		.attr("class", "chart-title")
   		.attr("text-anchor", "middle")
   		.attr("y", 60)
   		.attr("x", 30)
   		.text("Lines per season")
}

function drawEpisodeVis(episode, name) {

	var episode_data = episode.filter(function(d) {
		return name == d.key;
	});

}


