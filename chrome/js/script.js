$('document').ready(function(){

	$('.jumbotron').css('height', $(window).height());


	$('#send').click(function(){
		// Loading icon
		$('#message').html("<img id='loading' src='images/loading2.gif'>")

		var url = $('#source-url').val();
		console.log(url);
		// Send url to be registered
		if(url.indexOf("facebook") > -1){
			extractFbVideo(url);
		}
		else if(url.indexOf('youtube') > -1){
			var video_id = url.split('v=')[1];
			var ampersandPosition = video_id.indexOf('&');
			if(ampersandPosition != -1) {
		  		video_id = video_id.substring(0, ampersandPosition);
			}		
			console.log(video_id);
			confirmation("", video_id);
		}

		
	});

});

extractFbVideo = function(fbURL){

	var v = fbURL.indexOf("video");
	var i=0;
	for(i=v; i<fbURL.length; i++){
		if(fbURL.charAt(i) == '/'){
			break;
		}
	}
	var id = fbURL.substring(i, fbURL.length-1);
	console.log(id);

	$.ajax({
		url: "https://graph.facebook.com/v2.5" + id + "?fields=source&access_token=1643038019290883|OiMezw7PZpgj2Z8SULow929SnRE",
		type: "GET",
		success: function(data){
			console.log(data.source);
			confirmation(data.source, "");
		}
	})

}

confirmation = function(fbSource, youtubeID){
	console.log("facebook=" + encodeURIComponent(fbSource) + "&youtube=" + youtubeID);
	// Send to server
	$.ajax({
		url: "http://fb-hacks.herokuapp.com/upload?facebook=" + encodeURIComponent(fbSource) + "&youtube=" + youtubeID,
		type: "GET",
		crossDomain: true,
		success: function(data){
				console.log(data);
				var celebrate = data.facebook == "success" || data.youtube == "success";
				// Change to different messages for success and failure
				if(celebrate){
					$("#message").html("<h2>Congratulations, your video was successfully posted and is now safe from pirates.</h2>");
				}
				else {
					$("#message").html("<h2>Sorry, it seems your video is a copy of an existing video. Please upload original content only.</h2>");
				}
		}
	})
}