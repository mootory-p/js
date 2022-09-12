$(function(){
  var current = 1;
	var thumbListSize = 6;
	var thumbnail = $('#thumbnail');
	var prev = thumbnail.find('> .left');
	var next = thumbnail.find('> .right');
	var container = thumbnail.find('> .container > ul');
	var containWidth = thumbnail.find('> .container').width();
	var thumb = container.find('> .thumb');
	var maxSize = thumb.size();
	var image = $('#gallery #image > p');
	
	next.on('click', function(){
		if(current < maxSize / thumbListSize  ) current++;
		listMove();
		$('.current').text(current);
	});
	
	prev.on('click', function(){
		if(current > 1) current--;
		listMove();
		$('.current').text(current);
	});
	
	function listMove(){
			var tl = containWidth * (current - 1) * -1;
			container.stop().animate({left:tl}, {duration:400});
	}
	
	thumb.on('click', function(){
		image.css('display', 'none');
		var i = $(this).index();
		image.eq(i).css('display', 'block');
	});
	
});