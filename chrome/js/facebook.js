vex.defaultOptions.className = 'vex-theme-os';

var videos = Object();

grabVideoUrl = function() {
	var currVideos = document.getElementsByTagName("video");
	for (var i=0; i<currVideos.length; i++) {
		var video_src = currVideos[i].getAttribute('src');
		var video_id = currVideos[i].children[0].getAttribute('id');

		console.log(video_id);
		if (!videos.hasOwnProperty(video_id)) {
			videos[video_id] = video_src;
			callServer(video_src);
		}
	}
}
// && withinviewport(currVideos[i])
callServer = function(url) {

	// call server w/ url
	var dummyServerResult = {
		// 'pirated': 'false',
		// 'original': 'https://www.youtube.com/watch?v=tIcOqOWHyHk'
		'matched': 'true',
		'original': url
	}
	consumeServer(dummyServerResult);
}

consumeServer = function(result) {
	if (result != null) {
		if (result['matched']=='true' && window.location.href.indexOf(result['original'])==-1) {
			vex.dialog.confirm({
			  message: 'This video is likely stolen, pirated, or plagiarized. Would you like to support the original artist?',
			  callback: function(value) {
			  	if (value) {
			  		window.location.assign(result['original']);
			  	} else {

			  	}
			  }
			});
		}

	}
}


setInterval(grabVideoUrl, 3000);
