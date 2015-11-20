vex.defaultOptions.className = 'vex-theme-os';
var video_id;

vid_id = function() {
	try {
		video_id = window.location.search.split('v=')[1];
		var ampersandPosition = video_id.indexOf('&');
		if(ampersandPosition != -1) {
		  video_id = video_id.substring(0, ampersandPosition);
		}		
	}
	catch(err) {
		var video_id = null;
	}
	console.log("Found a video");
	return video_id;
}

callServer = function() {
	$.ajax({
		url: "http://fb-hacks.herokuapp.com/upload?youtube=" + encodeURIComponent(video_id),
		type: "GET",
		crossDomain: true,
		success: function(data){
			console.log(data);
			var celebrate = data.facebook == "success" || data.youtube == "success";
			// Change to different messages for success and failure
			if(celebrate){
				consumeServer(data);
			}
		}
	});
}

consumeServer = function(result) {
	if (result != null) {
		// if (result['matched']=='true' && window.location.href.indexOf(result['original'])==-1) {
		// 	vex.dialog.confirm({
		// 	  message: 'This video is likely stolen, pirated, or plagiarized. Would you like to support the original artist?',
		// 	  callback: function(value) {
		// 	  	if (value) {
		// 	  		window.location.assign(result['original']);
		// 	  	} else {

		// 	  	}
		// 	  }
		// 	});
		// }
		console.log("Made Pirated");
		video = document.getElementsByTagName('video')[0];
		video.classList.add("Pirated");
		video.parentNode.parentNode.parentNode.innerHTML += "<div><a href='https://www.google.com'><div class='full-width'>This video is likely pirated or plagiarized. Click here to support the original artist.</div></a></div>";
	}
}

if (vid_id()!=null) {

	callServer();

}


console.log("Loaded Youtube script");

