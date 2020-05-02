

var favewords = {
	"Leslie Knope": ["waffles", "friends", "Ann", "Ben", "Ron", "Lil Sebastian"]
}



d3.json("../../data/analysis/character_words.json", function(error, data) {
	// console.log(data)
	var fixeddata = [];

	for (var key in data) {

		if (key == "Leslie Knope") {
			var currobj = new Object();
			currobj["character"] = key;

			var wordstosort = [];
			var word_data = data[key];
			console.log("Anne", word_data["Ann"])
			console.log("waffles", word_data["waffles"])
			console.log("Ben", word_data["Ben"])
			console.log("Lil", word_data["Sebastian"])

			// for (var wordkey in word_data) {

			// 	var wordobj = new Object();
			// 	wordobj[wordkey] = wordkey;
			// 	wordobj["count"] = word_data[wordkey];
			// 	wordstosort.push(wordobj);
			// }

			// wordstosort.sort(function(x, y) {
			// 	return d3.descending(x.count, y.count);
			// })
			
			// currobj["words"] = wordstosort
			// fixeddata.push(currobj)
		}
	}

	// console.log(fixeddata);
});

