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
			url = video_id;
			confirmation();
		}

		
	});

});

extractFbVideo = function(fbURL){
	// $.ajax({
 //   		url:fbURL,
 //   		type:'GET',
 //   		success: function(data){
 //   			console.log("abcdef");
 //   			console.log($(data).find('video').attr('src'));
 //   			console.log(data);
 //   		}
	// });
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
			confirmation();
		}
	})

}

confirmation = function(){
	// Send to server

	// Change to different messages for success and failure
}