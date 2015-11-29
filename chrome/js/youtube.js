vex.defaultOptions.className = 'vex-theme-os';


vid_id = function() {
	try {
		var video_id = window.location.search.split('v=')[1];
		var ampersandPosition = video_id.indexOf('&');
		if(ampersandPosition != -1) {
		  video_id = video_id.substring(0, ampersandPosition);
		}		
	}
	catch(err) {
		var video_id = null;
	}
	return video_id;
}

callServer = function() {
	// var dummyServerResult = {
	// 	// 'pirated': 'false',
	// 	// 'original': 'https://www.youtube.com/watch?v=tIcOqOWHyHk'
	// 	'matched': 'true',
	// 	'original': 'https://www.youtube.com/watch?v=-CEuEyptKX0'
	// }
	// consumeServer(dummyServerResult);
	var url = vid_id();
	$.ajax({
		url: "http://localhost/upload?url=" + encodeURIComponent(url),
		type: "GET",
		crossDomain: true,
		success: function(data){
			console.log(data);
			var celebrate = data.facebook == "success" || data.youtube == "success";
			celebrate = false;
			// Change to different messages for success and failure
			if(celebrate){
				consumeServer(data, element);
			}
		}
	})
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

if (vid_id()!=null) {

	callServer();

}




