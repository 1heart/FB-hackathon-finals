// Check the url when the page loads
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	if(changeInfo.status == 'complete'){
		chrome.tabs.getSelected(null, function(tab) {
		url = tab.url;
		console.log(url);
		// if(url.indexOf("redirect2.html") < 0){
		// 	window.open("redirect2.html");
		// }
		var hasFacebookVideo = url.indexOf("facebook") >= 0 && url.indexOf("video") >= 0;
		var hasYoutubeVideo = url.indexOf("youtube") >= 0 && url.indexOf("watch?") >= 0;
		if(hasFacebookVideo || hasYoutubeVideo){
			// window.open("redirect2.html");
		}
	});
	}
})

setInterval(function(){console.log('LOL')}, 1000);

// redirect when browser action is clicked
chrome.browserAction.onClicked.addListener(function(tab) {
	window.open("register.html");
});