// Check the url when the page loads
window.onload = function(){
	console.log("window loaded");
	var url;
	chrome.tabs.getSelected(null, function(tab) {
		url = tab.url;
		console.log(url);
		if(url.indexOf("redirect2.html") < 0){
			window.open("redirect2.html");
		}
	});

}
console.log("asdlkfjsaldkfjlkasdjfkla");


// redirect when browser action is clicked
chrome.browserAction.onClicked.addListener(function(tab) {
	window.open("redirect.html");
});