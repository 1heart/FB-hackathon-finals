// Check the url when the page loads
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	if(changeInfo.status == 'complete'){
		chrome.tabs.getSelected(null, function(tab) {
		url = tab.url;
		console.log(url);
		if(url.indexOf("redirect2.html") < 0){
			window.open("redirect2.html");
		}
	});
	}
})

// redirect when browser action is clicked
chrome.browserAction.onClicked.addListener(function(tab) {
	window.open("redirect.html");
});