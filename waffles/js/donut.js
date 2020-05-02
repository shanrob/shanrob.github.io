

var pie_width = $("#donut").width();
var pie_height = $("#donut").height();

var piesvg = d3.select("#donut").append("svg")
					.attr("width", pie_width)
					.attr("height", pie_height)
						.append("g")
						.attr("transform", "translate(" + (pie_width/2) + ", " + (pie_height/3) + ")")

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

d3.csv("/data/total.csv", function(data) {

	function makeDonut(data, season, character, episode) {

		var filtered = data.filter(function(d) {
			return (main_chars.includes(d.character) && d.season == season && d.episode == episode);
		})

		var label = d3.arc()
		    .outerRadius(radius - 20)
		    .innerRadius((radius*.8));

		var pie_data = d3.nest()
						.key(function(d) {return d.character})
						.rollup(function(leaves) {return leaves.length})
						.entries(filtered)

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

			d3.selectAll(".arc").append("text")
						.attr("text-anchor", "middle")
						.attr("transform", function(d, i) { 
							return "translate(" + label.centroid(d) + ")"; 
						})
						.attr("dy", "0.35em")
						.attr("class", "pienum")
						.text(function(d) {
							var labelnum = (d.data.value / denom);
							return formatPercent(labelnum);
						})

	}

	makeDonut(data, "s1", "Leslie Knope", "1");

	$(".mug").on("click", function() {

		var name = this.id
		var epi = d3.selectAll("#epbar").attr("class")
		var season = $("#season").val();
		makeDonut(data, season, name, epi);

	})


	d3.selectAll("#epbar").on("click", function(d) {
		var name = main_peep;
		var season = $("#season").val();
		var epi = d.key;
		makeDonut(data, season, name, epi);
	})




})


