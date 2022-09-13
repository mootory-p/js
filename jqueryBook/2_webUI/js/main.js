$(function () {

    /*
     * Slideshow
     */
    $('.slideshow').each(function () {

    // 변수의 준비

        var $container = $(this),                                
            $slideGroup = $container.find('.slideshow-slides'),  
            $slides = $slideGroup.find('.slide'),                 
            $nav = $container.find('.slideshow-nav'),             
            $indicator = $container.find('.slideshow-indicator'),
      

            slideCount = $slides.length, // 슬라이드 수
            indicatorHTML = '',          // 인디게이터 콘텐트
            currentIndex = 0,            // 현재 슬라이드의 인덱스
            duration = 500,              // 다음 슬라이드에 애니메이션의 소요 시간
            easing = 'easeInOutExpo',    // 다음 슬라이드에 애니메이션의 여유 종류
            interval = 7500,             // 자동으로 다음 슬라이드로 옮길 때까지의 시간
            timer;                      


    // HTML 요소의 배치 생성 삽입

        // 각 슬라이드의 위치를 결정하고,
        // 해당 표시기의 앵커를 생성
        $slides.each(function (i) {
            $(this).css({ left: 100 * i + '%' });
            indicatorHTML += '<a href="#">' + (i + 1) + '</a>';
        });

        // 인디게이터에 컨텐츠를 삽입
        $indicator.html(indicatorHTML);


    // 함수의 정의

        function goToSlide (index) {
            $slideGroup.animate({ left: - 100 * index + '%' }, duration, easing);
            currentIndex = index;
            updateNav();
        }

        function updateNav () {
            var $navPrev = $nav.find('.prev'), 
                $navNext = $nav.find('.next'); 

            if (currentIndex === 0) {
                $navPrev.addClass('disabled');
            } else {
                $navPrev.removeClass('disabled');
            }
            if (currentIndex === slideCount - 1) {
                $navNext.addClass('disabled');
            } else {
                $navNext.removeClass('disabled');
            }
          
            $indicator.find('a').removeClass('active')
                .eq(currentIndex).addClass('active');
        }

        function startTimer () {
            timer = setInterval(function () {
                var nextIndex = (currentIndex + 1) % slideCount;
                goToSlide(nextIndex);
            }, interval);
        }

        function stopTimer () {
            clearInterval(timer);
        }


    // 인벤토리 등록
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        // 네비게이션 링크를 클릭하면 해당 슬라이드를 표시
        $nav.on('click', 'a', function (event) {
            event.preventDefault();
            if ($(this).hasClass('prev')) {
                goToSlide(currentIndex - 1);
            } else {
                goToSlide(currentIndex + 1);
            }
        });

        // 인디게이터의 링크를 클릭하면 해당 슬라이드를 표시
        $indicator.on('click', 'a', function (event) {
            event.preventDefault();
            if (!$(this).hasClass('active')) {
                goToSlide($(this).index());
            }
        });

        // 마우스오버면 타이머를 정지 그렇지 않으면 시작
        $container.on({
            mouseenter: stopTimer,
            mouseleave: startTimer
        });


    // 슬라이드 쇼 시작
  
        // 첫 번째 슬라이드를 표시
        goToSlide(currentIndex);
        startTimer();

    });

    

    /*
     * Tabs
     */
    $('.work-section').each(function () {

        var $container = $(this),                        
            $navItems = $container.find('.tabs-nav li'),  
            $highlight = $container.find('.tabs-highlight'); 
   

        $container.tabs({

            // 숨길 때의 애니메이션
            hide: { duration: 0 },

            // 볼 때 애니메이션
            show: { duration: 0 },

            // 로드시와 탭 선택시에 하이라이트의 위치를 조정
            create: moveHighlight,
            activate: moveHighlight
        });

        // 하이라이트의 위치를 조정하는 함수
        function moveHighlight (event, ui) {
            var $newTab = ui.newTab || ui.tab,  // 새로 선택된 탭의 jQuery 객체
                left = $newTab.position().left; // 새로 선택된 탭의 왼쪽 위치
				
            // 하이라이트의 위치를 애니메이션
            $highlight.animate({ left: left }, 250);
        }
    });

    /*
     * Back-toTop button (Smooth scroll)
     */
    $('.back-to-top').on('click', function () {
				// Smooth Scroll 플러그인을 실행
        $.smoothScroll({
            speed: 300 
        });
    });

   

});
