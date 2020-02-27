
console.log("tabs!");



function openPage(id, elem, color) {
	
	var i, tabcontent, tablinks;

	tabcontent = document.getElementsByClassName("content");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	tablinks = tabcontent = document.getElementsByClassName("tablink");
		for (i = 0; i < tablinks.length; i++) {
		tablinks[i].style.backgroundColor = "#e8e8e8";
	}

	document.getElementById(id).style.display = "flex";
	elem.style.backgroundColor = color;

}

$(document).ready(function() {
	document.getElementById("defaultOpen").click();

})