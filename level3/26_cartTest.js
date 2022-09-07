



let products = [];
let cart = [];

var proddiv = ''
		function prodlist(data, i){
			proddiv = `<div class="pdbox col" draggable="true" data-id="${data.id}">
									<img src="26_assets/${data.photo}" alt="">
									<p class="title">${data.title}</p>
									<p class="brand">${data.brand}</p>
									<p class="price">가격 : ${data.price}</p>
									<p class="bn mt-auto">
									<button class="btn btn-outline-secondary add" data-id="${data.id}"><i class="bi bi-cart-plus"></i> 담기</button>
									</p>
							</div>`;
			$('.pdlist').append(proddiv);
	};

 $.get('./26_assets/store.json').then(function(data){
	 products = data.products;
    data.products.forEach(function(a, i){
        prodlist(a, i);
    }); 

	     //========================
      //담기버튼 누르면 일어날 일들
      //========================

      $('.add').click(function(e){
        let productId = e.target.dataset.id;
        let 몇번째 = cart.findIndex((data)=>{ return data.id == productId });
				
        if (몇번째 == -1) {
          let 현재상품 = products.find((data)=> { return data.id == productId });
          현재상품.count = 1;
          cart.push(현재상품);
					console.log(현재상품.title)
        } else {
          cart[몇번째].count++;
        }; 
				
				
        $('.basket').html('');
        cart.forEach((data, i)=>{
          $('.basket').append(`
            <div class="col-md-3 bg-white" >
              <img src="26_assets/${data.photo}">
              <h4>${data.title}</h4>
              <h4>${data.brand}</h4>
              <p>${data.price}</p>
              <input type="number" value="${data.count}" class="item-count w-100">
            </div>
          `);
        });
			




        //총가격 계산해서 표기해주는 기능
        가격계산();

        //input값 조절해도 총가격 계산해서 표기해줘야될듯
        $('.item-count').on('input', function(){
          가격계산();
        });

      }); //add버튼 끝



      //===================
      //.item 드래그로 장바구니에 추가기능
      //===================

      $('.pdbox').on('dragstart', function(e){
        e.originalEvent.dataTransfer.setData('id', e.target.dataset.id)
      });
      $('.basket').on('dragover', function(e){
        e.preventDefault();
      });
      $('.basket').on('drop', function(e){
        let productId = e.originalEvent.dataTransfer.getData('id');
        console.log(productId);
        $('.add').eq(productId).click();
      });


}); //$.get().then() 끝

	
    //===========================
    //총가격 계산해서 표기해주는 기능
    //===========================

    
    function 가격계산(){
      
      let finalPrice = 0;
      
      for (let i = 0; i < $('.item-count').length; i++){
        var count = $('.item-count').eq(i).val();
        var price = $('.item-count').eq(i).siblings('p').text();
        finalPrice += parseFloat(price * count);
      }
      $('.final-price').html('합계' + finalPrice)
    };



		// ============
		// search
		// ============
		$('#search').on('input', function(){
      let 검색어 = $('#search').val();
      
      let newProducts = products.filter((a)=>{
        return a.title.includes(검색어) || a.brand.includes(검색어)
      });

      $('.pdlist').html('');
      newProducts.forEach((data, i) => {
        prodlist(data, i);
      });

			$('.pdlist .title').each(function(i, html요소){
        let title = html요소.innerHTML;
        title = title.replace(검색어, `<span style="background : yellow">${검색어}</span>`);
        html요소.innerHTML = title;
      })
      
    });

		



		//===========================
    //주문 누르면 뜨는 모달창, 영수증 기능 
    //=========================== 

    //최하단 주문버튼 누르면 모달창1 띄우는 기능 

    $('.buy').click(function(){
      $('.modal1').css('display', 'block');

    });


    //모달창1에 뭐 입력하면 전역변수에 저장해둠

    let 성함 = '';
    let 연락처 = '';

    $('#name').on('input', function(){
      성함 = $('#name').val();
    });

    $('#phone').on('input', function(){
      연락처 = $('#phone').val();
    });


    //모달창1의 완료버튼 누르면 모달창2 (영수증) 보여줌
    //거기안엔 canvas태그로 그림그려줌 

    $('.show-receipt').click(function(){
      $('.modal1').css('display', 'none');
      $('.modal2').css('display', 'block');

			
      var canvas = document.getElementById('canvas');
      var c = canvas.getContext('2d');
      c.font = '16px dotum';
      c.fillText('구매자 : ' + 성함, 20, 30);
      c.fillText('연락처 : ' + 연락처, 20, 60); 
      c.fillText($('.final-price').html(), 20, 90); 

      //상품명들 보여주려면 장바구니 상품만큼 c.fillText() 하면 되겠군요
      
    });
		//===========================
    //모달창 2개 닫기 기능 
    //===========================
		$('.close').click(function(e){
      //그냥 2개 동시에 닫음
      $(e.target).parents('.modal1').css('display', 'none');
      $(e.target).parents('.modal2').css('display', 'none');
    });