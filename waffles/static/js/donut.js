
var ep_dict = {"2017": "1",
"Go Big or Go Home": "1",
"I'm Leslie Knope ": "1",
"London": "1",
"Ms. Knope Goes to Washington ": "1",
"Pawnee Zoo": "1",
"Pilot": "1",
"Canvassing": "2",
"Flu Season": "2",
"Ron and Jammy": "2",
"Ron and Tammys ": "2",
"Soda Tax": "2",
"The Stakeout": "2",
"Beauty Pageant": "3",
"Born & Raised ": "3",
"How a Bill Becomes a Law": "3",
"The Pawnee-Eagleton Tip Off Classic": "3",
"The Reporter": "3",
"Time Capsule": "3",
"William Henry Harrison": "3",
"Boys' Club": "4",
"DoppelgÃ¤ngers": "4",
"Leslie and Ron": "4",
"Pawnee Rangers ": "4",
"Practice Date": "4",
"Ron & Tammy: Part Two": "4",
"Sex Education": "4",
"Gin It Up!": "5",
"Gryzzlbox": "5",
"Halloween Surprise": "5",
"Media Blitz": "5",
"Meet n Greet ": "5",
"Sister City": "5",
"The Banquet": "5",
"Ben's Parents": "6",
"End of the World": "6",
"Filibuster": "6",
"Indianapolis": "6",
"Kaboom": "6",
"Rock Show": "6",
"Save JJ's": "6",
"Donna and Joe": "7",
"Greg Pikitis": "7",
"Harvest Festival": "7",
"Leslie vs. April": "7",
"Recall Vote": "7",
"The Treaty ": "7",
"Camping": "8",
"Fluoride": "8",
"Ms. Ludgate-Dwyer Goes to Washington": "8",
"Pawnee Commons": "8",
"Ron and Tammy": "8",
"Smallest Park ": "8",
"Andy and April's Fancy Party": "9",
"Pie-Mary": "9",
"Ron and Diane": "9",
"The Camel": "9",
"The Cones of Dunshire": "9",
"The Trial of Leslie Knope ": "9",
"Citizen Knope ": "10",
"Hunting Trip": "10",
"Second Chunce": "10",
"Soulmates": "10",
"The Johnny Karate Super Awesome Musical Explosion Show": "10",
"Two Parties": "10",
"Jerry's Painting": "11",
"New Beginnings": "11",
"The Comeback Kid ": "11",
"Tom's Divorce": "11",
"Two Funerals": "11",
"Women in Garbage": "11",
"Ann's Decision": "12",
"Campaign Ad": "12",
"Christmas Scandal": "12",
"Eagleton": "12",
"One Last Ride": "12",
"Ann and Chris": "13",
"Bowling for Votes": "13",
"Emergency Response": "13",
"The Fight": "13",
"The Set Up": "13",
"Anniversaries": "14",
"Leslie and Ben": "14",
"Leslie's House": "14",
"Operation Ann ": "14",
"Road Trip": "14",
"Correspondents' Lunch": "15",
"Dave Returns": "15",
"Sweetums": "15",
"The Bubble": "15",
"The Wall": "15",
"Bailout": "16",
"Li'l Sebastian": "16",
"New Slogan": "16",
"Sweet Sixteen": "16",
"Galentine's Day": "16.5",
"Campaign Shake-Up ": "17",
"Partridge": "17",
"Woman of the Year": "17",
"Animal Control": "18",
"Lucky": "18",
"Prom": "18",
"The Possum": "18",
"Article Two": "19",
"Flu Season 2": "19",
"Live Ammo ": "19",
"Park Safety": "19",
"Jerry's Retirement": "20",
"One in 8": "20",
"Summer Catalog": "20",
"The Debate": "20",
"94 Meetings": "21",
"Bus Tour": "21",
"Moving Up": "21",
"Are You Better Off?": "22",
"Telethon": "22",
"Win": "22",
"The Master Plan": "23",
"Freddy Spaghetti": "24"}




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
		var epi = main_episode
		var season = $("#season").val();

		console.log("mug:", season, name, epi)

		makeDonut(data, season, name, epi);


	})


	d3.selectAll("#epbar").on("click", function(d) {
		console.log("WHYYY")

		main_episode = ep_dict[$(this).attr("class")]

		var name = main_peep;
		var season = $("#season").val();
		var epi = d.key;

		console.log("epbar:", season, name, epi)

		makeDonut(data, season, name, epi);

		
		var szn = $("#season").val()
		$("#info").html("Season: " + szn + " Episode: " + main_episode)

	})




})


