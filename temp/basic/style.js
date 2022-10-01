//topnav
var menu1 = $('.topnav .dep1'); 
var menu2 = $('.topnav .dep1 > .dep2');
var menunum ;
	menu1.on('mouseenter', function(e){
		menunum = $(e.currentTarget).index();
		menu2.removeClass('show');
		$(e.currentTarget).find('.dep2').addClass('show');
	})
menu2.on('mouseleave', function(e){
  menu2.removeClass('show');
})
menu1.on('mouseleave', function(e){
  menu2.removeClass('show');
})
menu1.on('click', function(e){
	menu1.find(' > a').removeClass('active');
	$(e.currentTarget).find(' > a').addClass('active');
})



// swiper
let card = [{img:'../../img/1.jpg'},{img:'../../img/2.jpg'},{img:'../../img/3.jpg'},{img:'../../img/4.jpg'}];
let cardlist =	``;
card.forEach((data, i)=>{
	$('.swiper-wrapper').append(`<li class="swiper-slide">
	<div class="cardlist">
		<p class="img"><img src="../../img/${i+1}.jpg"></p>
		<div class="body">
			<p class="title">Lorem, ipsum dolor.</p>
			<p class="subtitle">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi quas et provident magnam quaerat voluptatem porro fuga tempora, recusandae id.</p>
			<p class="icon"><i class="bi bi-heart-fill"></i></p>
		</div>
	</div>
</li>`);
});
const swiper = new Swiper('.swiper', {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
		clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});



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
};


//pagenav 
let sv1 = 0;
let sv2 = $('#listarea').position().top;
let sv3 = $('#parallax').position().top;
let sv4 = $('#footer').position().top;
let svalue = [ sv1, sv2,sv3, sv4];
let pagenav = $('.pagenav li a');
svalue.forEach((data, i) => {
	pagenav.eq(i).on('click', function(e){
		pagenav.removeClass('active');
		$(e.currentTarget).addClass('active');
		$(scrollableElement('html', 'body')).animate({ scrollTop: svalue[i] }, 300);
	});
});
$(window).scroll(function(){
	var yset = $(window).scrollTop();
	if( sv2 > yset){
		pagenav.removeClass('active');
		pagenav.eq(0).addClass('active');
	} else if ( sv3 > yset ){
		pagenav.removeClass('active');
		pagenav.eq(1).addClass('active');
	} else if ( sv4 > yset ){
		pagenav.removeClass('active');
		pagenav.eq(2).addClass('active');
	} else if ( sv4 <= yset + 100 ){
		pagenav.removeClass('active');
		pagenav.eq(3).addClass('active');
	} 
});


//parallax
$(window).scroll(function(){
	let yset2 = $(window).scrollTop();
	let posy = $('.parallax').position().top;
	let hei = document.querySelector('.parallax').clientHeight;
	let hei2 = posy + hei ;

	if( yset2 >= posy && yset2 <= hei2 ){
		let p1y = -hei - 50 + posy + yset2 * -0.5 + 'px';
		let p2y = posy + yset2 * -1 + 'px';
		$('.p1').css('bottom', p1y);
		$('.p2').css('bottom', p2y);
		
		
	}
	
	console.log(posy, hei,yset2 );
})