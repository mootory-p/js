

// gototop
var $el = $(scrollableElement('html', 'body'));
$('.pagetop').click((e)=>{
	e.preventDefault();
	$el.animate({ scrollTop: 0 }, 300);
})
function scrollableElement (elements) {
var i, len, el, $el, scrollable;
for (i = 0, len = arguments.length; i < len; i++) {
		el = arguments[i],
		$el = $(el);
		if ($el.scrollTop() > 0) {
				return el;
		} else {
				$el.scrollTop(1);
				scrollable = $el.scrollTop() > 0;
				$el.scrollTop(0);
				if (scrollable) {
						return el;
				}
		}
}
return [];
}


//pagenav 
let sv1 = 0;
let sv2 = $('#listarea').position().top;
let sv3 = $('#parallax').position().top;
let sv4 = $('#footer').position().top;

$('.pagenav li a').on('click', function(e){
	$('.pagenav li a').removeClass('active');
	svalue = $(e.currentTarget).position().top;
	$(e.currentTarget).addClass('active');
	$(scrollableElement('html', 'body')).animate({ scrollTop: svalue }, 300);
	console.log(svalue);
})