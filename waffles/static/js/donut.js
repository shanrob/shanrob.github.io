
var ep_dict = {"Pilot": "s1e1",
"Canvassing": "s1e2",
"The Reporter": "s1e3",
"Boys' Club": "s1e4",
"The Banquet": "s1e5",
"Rock Show": "s1e6",
"Pawnee Zoo": "s2e1",
"Hunting Trip": "s2e10",
"Tom's Divorce": "s2e11",
"Christmas Scandal": "s2e12",
"The Set Up": "s2e13",
"Leslie's House": "s2e14",
"Sweetums": "s2e15",
"Galentine's Day": "s2e16",
"Woman of the Year": "s2e17",
"The Possum": "s2e18",
"Park Safety": "s2e19",
"The Stakeout": "s2e2",
"Summer Catalog": "s2e20",
"94 Meetings": "s2e21",
"Telethon": "s2e22",
"The Master Plan": "s2e23",
"Freddy Spaghetti": "s2e24",
"Beauty Pageant": "s2e3",
"Practice Date": "s2e4",
"Sister City": "s2e5",
"Kaboom": "s2e6",
"Greg Pikitis": "s2e7",
"Ron and Tammy": "s2e8",
"The Camel": "s2e9",
"Go Big or Go Home": "s3e1",
"Soulmates": "s3e10",
"Jerry's Painting": "s3e11",
"Eagleton": "s3e12",
"The Fight": "s3e13",
"Road Trip": "s3e14",
"The Bubble": "s3e15",
"Li'l Sebastian": "s3e16",
"Flu Season": "s3e2",
"Time Capsule": "s3e3",
"Ron & Tammy: Part Two": "s3e4",
"Media Blitz": "s3e5",
"Indianapolis": "s3e6",
"Harvest Festival": "s3e7",
"Camping": "s3e8",
"Andy and April's Fancy Party": "s3e9",
"I'm Leslie Knope ": "s4e1",
"Citizen Knope ": "s4e10",
"The Comeback Kid ": "s4e11",
"Campaign Ad": "s4e12",
"Bowling for Votes": "s4e13",
"Operation Ann ": "s4e14",
"Dave Returns": "s4e15",
"Sweet Sixteen": "s4e16",
"Campaign Shake-Up ": "s4e17",
"Lucky": "s4e18",
"Live Ammo ": "s4e19",
"Ron and Tammys ": "s4e2",
"The Debate": "s4e20",
"Bus Tour": "s4e21",
"Win": "s4e22",
"Born & Raised ": "s4e3",
"Pawnee Rangers ": "s4e4",
"Meet n Greet ": "s4e5",
"End of the World": "s4e6",
"The Treaty ": "s4e7",
"Smallest Park ": "s4e8",
"The Trial of Leslie Knope ": "s4e9",
"Ms. Knope Goes to Washington ": "s5e1",
"Two Parties": "s5e10",
"Women in Garbage": "s5e11",
"Ann's Decision": "s5e12",
"Emergency Response": "s5e13",
"Leslie and Ben": "s5e14",
"Correspondents' Lunch": "s5e15",
"Bailout": "s5e16",
"Partridge": "s5e17",
"Animal Control": "s5e18",
"Article Two": "s5e19",
"Soda Tax": "s5e2",
"Jerry's Retirement": "s5e20",
"London, Pt 2": "s5e21",
"Are You Better Off?": "s5e22",
"How a Bill Becomes a Law": "s5e3",
"Sex Education": "s5e4",
"Halloween Surprise": "s5e5",
"Ben's Parents": "s5e6",
"Leslie vs. April": "s5e7",
"Pawnee Commons": "s5e8",
"Ron and Diane": "s5e9",
"London": "s6e1",
"Second Chunce": "s6e10",
"New Beginnings": "s6e11",
"London, Pt 2": "s6e12",
"Ann and Chris": "s6e13",
"Anniversaries": "s6e14",
"The Wall": "s6e15",
"New Slogan": "s6e16",
"Galentine's Day": "s6e17",
"Prom": "s6e18",
"Flu Season 2": "s6e19",
"London, Pt 2": "s6e2",
"One in 8": "s6e20",
"Moving Up": "s6e21",
"The Pawnee-Eagleton Tip Off Classic": "s6e3",
"DoppelgÃ¤ngers": "s6e4",
"Gin It Up!": "s6e5",
"Filibuster": "s6e6",
"Recall Vote": "s6e7",
"Fluoride": "s6e8",
"The Cones of Dunshire": "s6e9",
"2017": "s7e1",
"The Johnny Karate Super Awesome Musical Explosion Show": "s7e10",
"Two Funerals": "s7e11",
"One Last Ride": "s7e12",
"Ron and Jammy": "s7e2",
"William Henry Harrison": "s7e3",
"Leslie and Ron": "s7e4",
"Gryzzlbox": "s7e5",
"Save JJ's": "s7e6",
"Donna and Joe": "s7e7",
"Ms. Ludgate-Dwyer Goes to Washington": "s7e8",
"Pie-Mary": "s7e9"}



// var pie_width = $("#donut").width();
// var pie_height = $("#donut").height();

// var piesvg = d3.select("#donut").append("svg")
// 					.attr("width", pie_width)
// 					.attr("height", pie_height)
// 						.append("g")
// 						.attr("transform", "translate(" + (pie_width/2) + ", " + (pie_height/3) + ")")

// var pie = d3.pie()
// 			.sort(null)
// 			.value(function(d) {
// 				return d.value;
// 			})

// var radius = pie_width*.29;

// var arc = d3.arc()
// 	.outerRadius(radius)
// 	.innerRadius(radius*.6);

// var formatPercent = d3.format(",.0%");

d3.json("data/csvjson.json", function(data) {

	// function makeDonut(data, season, character, episode) {
	// 	console.log(season, character, episode)

	// 	var filtered = data.filter(function(d) {
	// 		return (main_chars.includes(d.character) && d.season == season && d.ep == episode);
	// 	})

	// 	var label = d3.arc()
	// 	    .outerRadius(radius - 20)
	// 	    .innerRadius((radius*.8));

	// 	var pie_data = d3.nest()
	// 					.key(function(d) {return d.character})
	// 					.rollup(function(leaves) {return leaves.length})
	// 					.entries(filtered)

	// 	var denom = d3.sum(pie_data, function(d) {
	// 		return d.value;
	// 	})


	// 	var arcs = piesvg.selectAll("arc")
	// 				.data(pie(pie_data))

	// 		arcs.enter()
	// 			.append("g")
	// 				.attr("class", "arc")
	// 				.append("path")
	// 					.attr("d", arc)
	// 					.attr("class", "slice")
	// 					.style("fill", function(d) {
	// 						if (d.data.key == character) {
	// 							return colors[character];
	// 						} else {
	// 							return "#ebebeb";
	// 						}
	// 					})
	// 					.attr("stroke", "white")
	// 					.attr("stroke-width", "2px")

	// 		d3.selectAll(".arc").append("text")
	// 					.attr("text-anchor", "middle")
	// 					.attr("transform", function(d, i) { 
	// 						return "translate(" + label.centroid(d) + ")"; 
	// 					})
	// 					.attr("dy", "0.35em")
	// 					.attr("class", "pienum")
	// 					.text(function(d) {
	// 						var labelnum = (d.data.value / denom);
	// 						return formatPercent(labelnum);
	// 					})

	// }

	// makeDonut(data, "s1", "Leslie Knope", "s1e1");

	// $(".mug").on("click", function() {

	// 	var name = this.id
	// 	var epi = main_episode
	// 	var season = $("#season").val();

	// 	console.log("mug:", season, name, epi)

	// 	makeDonut(data, season, name, epi);


	// })


	// d3.selectAll("#epbar").on("click", function(d) {
	// 	console.log("WHYYY")

	// 	main_episode = ep_dict[$(this).attr("class")]

	// 	var name = main_peep;
	// 	var season = $("#season").val();
	// 	var epi = d.key;

	// 	console.log("epbar:", season, name, epi)

	// 	makeDonut(data, season, name, epi);

		
	// 	var szn = $("#season").val()
	// 	$("#info").html("Season: " + szn + " Episode: " + main_episode)

	// })




})


