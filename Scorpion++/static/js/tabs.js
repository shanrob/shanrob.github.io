
// This is just a js file to enable the interactivity of the tabs at the bottom. I don't think 
// you'll need to mess with this, even if you want to generate the conent for the tabs themselves.

console.log("Building predicate tabs...");


function showTab(id, elem, color) {
	
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