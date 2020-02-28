
console.log("Generating the barcode charts...");

// This part just sets up the slider, no need to mess with this I don't think
var stdSlider = document.getElementById('controls');

noUiSlider.create(stdSlider, {
	start: [5, 95],
	connect: false,
	tooltips: true,
	range: {
		'min': 0,
		'max': 100
	},
	format: wNumb({
		decimals: 0
	})
});

// ---------------------------------------------------
// bar code chart starts here:
// getting dimensions of the div we want
var barcodeWidth = $("#bars").width() - 30;
var barcodeHeight = 30;

// setting up domain and range for x and y of the chart
// hard coding the domain for x input because I know my data is 
// just a random number from 1-100. Will need to dynamically generate
// once you get your data in here
var chartScale = d3.scaleLinear()
		.domain([0, 100])
		.range([0, barcodeWidth]) 

// same note as above re: the 100
var barscale = d3.scaleLinear()
	.domain([0, 100])

// data processing function here: returns a
// dictionary of tvars and their respective data
function makeMap(data, tkeys) {
	var barcodeMap = {};
	for (j = 0; j < tkeys.length; j++) {
		var tvar = tkeys[j];
		var datalist = [];
		for (i = 0; i < data.length; i++) {
			var curritem = data[i];
			datalist.push(curritem[tvar]);
		}
		barcodeMap[tvar] = datalist;
	}
	return barcodeMap;	
}

// this function color the little bar marks based on the
// values of the slider
function colorUp(d) {
	var values = stdSlider.noUiSlider.get();
	var left = values[0];
	var right = values[1];
		if (((+d) <=left) || ((+d)>=right)) {
			return "orange";
		} else {
			return "gray";
		}
}

// draws the barchart. will act as an update function
// and will redraw the bars if you call it with new data
function makeBars(data) {

	// a bit of data processing here:
	// basically just a dictionary for the tvars and their data
	var tvars = d3.map(data[0]);
	tvars.remove("readings");
	var tkeys = tvars.keys();
	var datamap = makeMap(data, tkeys);
	datamap = d3.map(datamap);

	// Add an svg for each element
	var svgs = d3.select("#bars")
				.selectAll("svg")
					.data(datamap.values())

		svgs.enter()
			.append("svg")
				.attr("class", "bsvgs")
				.attr("width", barcodeWidth)
				.attr("height", barcodeHeight)
				.style("background-color", "#e8e8e8")

		svgs.exit().remove();

	//Add little barcode marks per respective svg
	var blips = d3.selectAll(".bsvgs").selectAll("rect")
				.data(function(d) {
					return d;
				})

		blips.enter()
			.append("rect")
				.attr("id", function(d, i) {
					return i;
				})
				.attr("width", "3px")
				.attr("height", barcodeHeight)	
				.attr("x", function(d) {
					return chartScale(d);
				})
				.style("fill", function(d) { // fill based on slider vals
					var values = stdSlider.noUiSlider.get();
					left = values[0];
					right = values[1];
					if (((+d) <=left) || ((+d)>=right)) {
						return "orange";
					} else {
						return "#969696";
					}
				})
				.style("stroke-width", "1px")
				.style("stroke", "#ededed")
				.on("mouseover", function(d) {

					var currid = this.id;
					d3.selectAll("rect").style("fill", function(d) {
						if (this.id == currid) {
							return "blue";
						} else {
							return colorUp(d);
						}
					});
				})
				.on("mouseout", function() {
					d3.selectAll("rect").style("fill", function(d) {
						return colorUp(d);
					});

					d3.selectAll("circle").style("fill", "gray");
				})
				.on("click", function() {
					var currid = this.id;
					// interaction for isolating the connected marks
					d3.selectAll("rect").style("fill", function(d) {
						if (this.id == currid) {
							if(colorUp(d) == "orange") {
								return "orange";
							} else {
								return "gray";
							}
						return "blue";
						} else {
							return "#e8e8e8";
						}
					});
					// interaction for hilighting the respective data point circle
					d3.selectAll("circle").style("fill", function(d) {
						if (this.id == currid) {
							return "gray";
						} else {
							return "white";
						}
					})
				})

}

makeBars(dummy);

// reverse domain function for recoloring bar marks based on slider values
var backwards = d3.scaleLinear()
					.domain([0, barcodeWidth])
					.range([0, 100])

// recolor function for barcode marks when the slider moves
function recolor() {
	d3.selectAll("rect").style("fill", function() {
		var values = stdSlider.noUiSlider.get();
		left = values[0];
		right = values[1];
		var lilval = (Math.floor(backwards(this.x.baseVal.value)));
		return colorUp(lilval);
	})
};


stdSlider.noUiSlider.on('change', recolor);

// eventually will be functionality for the drop down control above the barcode charts
// leave this along for now I guess
$("#sorts").on("change", function() {
	console.log("yes i know this doesn't work but eff it for now");

});