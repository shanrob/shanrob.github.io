
window.onload = function() {

	loadingBar();

	var ready = 0;
	var url = "https://rickandmortyapi.com/api/character/?page=";
	var list_of_chars;

	getChars(1).then(function(response){
		list_of_chars = response;
	});

	$("#btn").click(function() {

		var random = Math.floor(Math.random() * 493);
		$("#name").text("Name: " + list_of_chars[random].name);
		$("#species").text("Species: " + list_of_chars[random].species);
		$("#location").text("Location: " + list_of_chars[random].location.name);
		$("#img").attr('src', list_of_chars[random].image);
	})
}

function getChars(page) {

	return $.ajax({
			url: "https://rickandmortyapi.com/api/character/?page=" + (page || 1),
			method: "GET",
			dataType:'JSON'
		}).then(function(response) {
			if (page <=24) {
				return getChars(page+1).then(function(next){
					return response.results.concat(next);
				})
			}
			readyToGo();
			return response.results;
		});
	}

function readyToGo() {
	$("#temp").animate({
		opacity:'0',
		transition: 'opacity 1s'
	})
	$("#container").animate({
		opacity:'1',
		transition: 'opacity 1s linear 1s'
	})
}

function loadingBar() {
	$("#prog").animate({
		width: '400px'
	}, {
		duration:6500,
		easing:"linear"
	});
}