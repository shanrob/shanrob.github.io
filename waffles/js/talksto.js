

var talksto_data = {
			"Tom Haverford": 24,
			"Ron Swanson": 20,
			"Ben Wyatt": 12,
			"Andy Dwyer": 16,
			"Ann Perkins": 21,
			"April Ludgate": 17,
			"Chris Traeger": 33,
			"Donna Meagle": 1,
			"Jerry Gergich":14
};

var data = []
for (var key in talksto_data) {
	var currdata = new Object()
	currdata["key"] = key;
	currdata["value"] = talksto_data[key];
	data.push(currdata)
}

console.log(data)

var talksto_width = $("#talksto").width();
var talksto_height = $("#talksto").height();

var talksto_svg = d3.select("#talksto").append("svg")
					.attr("class", "talkvis")
					.attr("width", talksto_width)
					.attr("height", talksto_height)
					.append("g")



// var x2 = d3.scaleBand()
// 			.domain(d3.keys(talksto_data))
// 			.rangeRound([0, talksto_width])
// 			.padding(0.1)

// var y2 = d3.scaleLinear()
// 			.domain([0, 200])
// 			.range([talksto_height, 0])


// var barcharts = talksto_svg.selectAll("rect")
// 					.data(data)
						
// 					barcharts.enter().append("rect")
// 							.attr("id", function(d) {
// 								console.log(d.key)
// 								return d.key;
// 							})
// 							.attr("class", "talkbar")
// 							.attr("width", function(d) {
// 								return x2.bandwidth();
// 							})
// 							.attr("height", function(d) {
// 								console.log(d.value)
// 								return (talksto_height - y2(d.value));
// 							})	
// 							.attr("y", function(d) {
// 								return y2(d.value)
// 							})
// 							.attr("x", function(d) {
// 								return x2(d.key);
// 							})
// 							.attr("rx", "10px")
// 							.style("fill", function(d) {
// 								return colors[d.key]
// 							})

