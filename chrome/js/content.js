$('document').ready(function(){

	checkFeed();

	$('document').scroll(function(){

		checkFeed();

	});

});

checkFeed = function(){
	var url = $('video').first().attr('src');
	alert(url);
}