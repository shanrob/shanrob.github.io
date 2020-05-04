
// Gonna try to get all this in one file for improved interactions... we'll see how it goes...


//////////////////////////////////// set up /////////////////////////////////////

var svg_width = $("#overview").width();
var svg_height = 210;
var xstart = svg_width * .01;
var ystart = svg_height * .1;
var ov_width = $("#overview").width() * .95;
var ov_height = $("#overview").height() - 100

var bar_info = d3.select("#overview").append("div")
							.attr("class", "tooltip")
							.style("opacity", 0)

var arc_info = d3.select("#donut").append("div")
							.attr("class", "tooltip")
							.style("opacity", 0)

var node_info = d3.select("#donut").append("div")
							.attr("class", "tooltip")
							.style("opacity", 0)

var y1 = d3.scaleBand()
			.domain(main_chars)
			.rangeRound([0, (svg_height-ystart)])
			.padding(0.1)

var x1 = d3.scaleLinear()
			.domain([0, 350])
			.range([0, ov_width])

var pie_width = $("#donut").width();
var pie_height = $("#donut").height()*.8;

var piesvg = d3.select("#donut").append("svg")
					.attr("class", "pievg")
					.attr("width", pie_width)
					.attr("height", pie_height)
						.append("g")
						.attr("transform", "translate(" + (pie_width/2) + ", " + (pie_height*.45) + ")")

var pie = d3.pie()
			.sort(null)
			.value(function(d) {
				return d.value;
			})

var radius = pie_width*.29;

var arc = d3.arc()
	.outerRadius(radius)
	.innerRadius(radius*.6);

var formatPercent = d3.format(",.0%");
var oldlinks = mygraph.links;

//////////////////////////////////// data drawing /////////////////////////////////////
d3.json("data/csvjson.json", function(data) {

	makeBars("s1");
	dropDownChanged();
	// faceWasClicked();


	var piefilter = data.filter(function(d) {
			return (main_chars.includes(d.character) && d.season == "s1" && d.episode == "1");
		})
	var donut_data = d3.nest()
				.key(function(d) {return d.character})
				.rollup(function(leaves) {return leaves.length})
				.entries(piefilter)

	makeDonut(donut_data, "Leslie Knope");


///////////////////////////////////////////////////////////////////////////////////////////

	function makeBars(season){

		// Process the data for the right season
		var filtered = data.filter(function(d) {
			return (main_chars.includes(d.character) && d.season == season);
		})

		var episode_names = d3.map(filtered, function(d){return(d.epname)}).keys()

		var ov_data = d3.nest()
					.key(function(d) {return d.ep;})
					.key(function(d) {return d.character;})
					.rollup(function(leaves) {return (leaves.length);})
					.entries(filtered);

		var svgs = d3.select("#overview")
					.selectAll("svg")
					.data(ov_data, function(d, i) {
						return d.key
					})

		svgs.enter()
			.append("svg")
				.attr("id", "epbar")
				.attr("class", function(d, i) {
					return d.key;
				})
				.attr("width", (ov_width) - (ov_width*0.02))
				.attr("height", svg_height)
				.attr("transform", "translate(" + (ov_width*0.02) + ", 0)")
				.on("mouseover", function(d) {
					d3.select(this).transition().duration(200).attr("transform", "scale(1.01)")
				})
				.on("mouseout", function(d) {
					d3.select(this).transition().duration(200).attr("transform", "scale(.99)")
				})
				.on("click", function(d) {

					makeDonut(d.values, main_peep);
					main_episode = d.key;
					var epinfo = main_episode.split("e")
					var sznsubstring = main_episode.substring(
					    main_episode.lastIndexOf("s") + 1, 
					    main_episode.lastIndexOf("e")
					);
					updateLineInfo(sznsubstring, epinfo[1]);
					updateNodes(mygraph.links, sznsubstring, epinfo[1], main_peep);

				})
				.append("g")
				.append("text")
				.attr("class", "episode_title")
				.attr("text-anchor", "middle")
				.attr("x", (svg_width/2))
				.attr("y", ystart-2)
				.text(function(d, i) {
					return (i+1) + ": " +[episode_names[i]]
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

	// function makeDonut(data, season, character, episode) {
	function makeDonut(pie_data, character) {

		var label = d3.arc()
		    .outerRadius(radius - 20)
		    .innerRadius((radius*.8));

		var denom = d3.sum(pie_data, function(d) {
			return d.value;
		})

		var arcs = piesvg.selectAll("arc")
					.data(pie(pie_data))

			arcs.enter()
				.append("g")
					.attr("class", "arc")
					.append("path")
						.attr("d", arc)
						.attr("class", "slice")
						.style("fill", function(d) {
							if (d.data.key == character) {
								return colors[character];
							} else {
								return "#ebebeb";
							}
						})
						.attr("stroke", "white")
						.attr("stroke-width", "2px")
						.on("mouseover", function(d) {
							var thisname = d.data.key;
							arc_info.transition()
									.duration(300)
									.style("opacity", 1);

							arc_info.html(d.data.key)
				                .style("left", (d3.event.pageX + 55) + "px")		
				                .style("top", (d3.event.pageY + 55) + "px");

				            d3.selectAll(".lilbar").transition().duration(100).style("opacity", function(d) {
				            	if (d.key == thisname) {
				            		return 1;
				            	} else {
				            		return 0.25;
				            	}
				            })
						})
						.on("mouseout", function(d) {
							arc_info.transition()
									.duration(100)
									.style("opacity", 0);

							d3.selectAll(".lilbar").transition().duration(100).style("opacity", function(d) {
				            	return 1;
				            })
						})

			d3.selectAll(".arc").append("text")
						.attr("text-anchor", "middle")
						.attr("transform", function(d, i) { 
							return "translate(" + label.centroid(d) + ")"; 
						})
						.attr("dy", "0.35em")
						.attr("class", "pienum")
						.text(function(d) {
							var labelnum = (d.data.value / denom);

							if (labelnum > 0.01) {
								return formatPercent(labelnum);
							} else {
								return "";
							}

						})

	}

	function upDateDonut(season, episode, character) {
		var piefilter = data.filter(function(d) {
				return (main_chars.includes(d.character) && d.season == season && d.episode == main_episode);
			})

			var donut_data = d3.nest()
						.key(function(d) {return d.character})
						.rollup(function(leaves) {return leaves.length})
						.entries(piefilter)
			makeDonut(donut_data, main_peep);
	}

	function updateUnderlines(d) {
			var currid = d;
			d3.selectAll(".underline").style("opacity", function(d) {
				if(currid == d) {
					return 1;
				}
				return 0;
			})
			d3.selectAll(".underline").style("fill", function(d) {
				if(currid == d) {
					return colors[d];
				}
				return "#ccc";
			})
	}

	function updateLineInfo(season, episode) {
		$(".othertitle").html("Season: " + season + " Episode: " + episode);
	}

	function dropDownChanged() {
		$("#season").on("change", function() {

			var selectedVal = this.value;

			if (main_episode.length > 1) {
				var temp = main_episode.split("e")
				main_episode = temp[1]
			}

			makeBars(selectedVal);
			updateLineInfo(selectedVal[1], main_episode)
			upDateDonut(selectedVal, main_episode, main_peep)
			updateNodes(mygraph.links, (selectedVal.split("s"))[1], main_episode, main_peep);
		})
	}

	d3.selectAll(".mug").on("click", function(d) {

		main_peep = d;
		var season = $("#season").val();

		if (main_episode.length > 1) {
			var temp = main_episode.split("e")
			main_episode = temp[1]
		}

		updateUnderlines(d);
		upDateDonut(season, main_episode, main_peep)
		updateNodes(mygraph.links, (season.split("s"))[1], main_episode, this.id)

	})
});
