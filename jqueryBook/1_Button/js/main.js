$(function(){
    // 
    var duration = 300;

    // buttons1  3행
    $('#buttons1 button')
        .on('mouseover', function(){
            $(this).find('> span')
                .stop(true).animate({width: '100%'}, duration, 'easeOutQuad');
        })
        .on('mouseout', function(){
            $(this).find('> span')
                .stop(true).animate({width: '0%'}, duration, 'easeOutQuad');
        });


    // images ----------------------------------------
    var $images = $('#images p');

    // images 세번째 이미지
    $images.filter(':nth-child(1)')
        .on('mouseover', function(){
            $(this).find('strong').stop(true).animate({bottom: '0px'}, duration);
            $(this).find('span').stop(true).animate({opacity: 1}, duration);
            $(this).find('img').stop(true).animate({top: '-20px'}, duration * 1.3);
        })
        .on('mouseout', function(){
            $(this).find('strong').stop(true).animate({bottom: '-80px'}, duration);
            $(this).find('span').stop(true).animate({opacity: 0}, duration);
            $(this).find('img').stop(true).animate({top: '0px'}, duration);
        });


    // aside ----------------------------------------
    var $aside = $('.page-main > aside');
    var $asidButton = $aside.find('button').on('click', function(){
            $aside.toggleClass('open');
            if($aside.hasClass('open')){
                $aside.stop(true).animate({left: '-70px'}, duration);
                $asidButton.find('img').attr('src', 'img/btn_close.png');
            }else{
                $aside.stop(true).animate({left: '-350px'}, duration);
                $asidButton.find('img').attr('src', 'img/btn_open.png');
            };
        });


});
