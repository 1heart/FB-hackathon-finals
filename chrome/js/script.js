$('document').ready(function(){

	$('.jumbotron').css('height', $(window).height());


	$('#send').click(function(){
		var url = $('#source-url').val();
		// Send url to be registered

		// Loading icon
		$('#message').html("<img id='loading' src='images/loading2.gif'>")
		// Change to different messages for success and failure
	});

});


confirm = function(){

}