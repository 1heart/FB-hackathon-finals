vex.defaultOptions.className = 'vex-theme-os';

var videos = Object();

grabVideoUrl = function() {
	var currVideos = document.getElementsByTagName("video");
	for (var i=0; i<currVideos.length; i++) {
		var video_src = currVideos[i].getAttribute('src');
		var video_id = currVideos[i].children[0].getAttribute('id');
		
		// console.log(document.getElementsByTagName('video')[i]);

		if (!videos.hasOwnProperty(video_id) && !document.getElementsByTagName('video')[i].classList.contains("Pirated")) {
			videos[video_id] = video_src;
			element = document.getElementsByTagName('video')[i];
			callServer(video_src, element);
		}
	}
}
// && withinviewport(currVideos[i])
callServer = function(url, element) {

	// call server w/ url
	// var dummyServerResult = {
	// 	'matched': 'true',
	// 	'original': url
	// }
	$.ajax({
		url: "http://fb-hacks.herokuapp.com/upload?url=" + encodeURIComponent(url),
		type: "GET",
		crossDomain: true,
		success: function(data){
			console.log(data);
			var celebrate = data.facebook == "success" || data.youtube == "success";
			// Change to different messages for success and failure
			if(celebrate){
				consumeServer(data, element);
			}
		}
	});
}

consumeServer = function(result, element) {
	console.log("entered");
	if (result != null) {
		if (result['matched']=='true' && window.location.href.indexOf(result['original'])==-1) {
			element.classList.add("Pirated");
			element.parentNode.parentNode.parentNode.parentNode.innerHTML += "<div><a href='" + result.srcurl + "'><div class='full-width'>This video is likely pirated or plagiarized. Click here to support the original artist.</div></a></div>";
			console.log("added class");
		}

	}
}


setInterval(grabVideoUrl, 3000);
