
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

// ------------------------------------------------

var barcodeWidth = $("#bars").width() - 30;
var barcodeHeight = 30;

var chartScale = d3.scaleLinear()
		.domain([0, 100])
		.range([0, barcodeWidth]) 

var barscale = d3.scaleLinear()
	.domain([0, 100])

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

function makeBars(data) {
	console.log("makin bars at the bar factory");

	//get list of reading types/target variables:
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

	//Add marks for the
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
				.style("fill", function(d) {
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

var backwards = d3.scaleLinear()
					.domain([0, barcodeWidth])
					.range([0, 100])

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

$("#sorts").on("change", function() {

	console.log("yes i know this doesn't work but eff it for now");

});