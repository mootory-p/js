
function prodlist(data, i){
    var proddiv = `<div class="pdbox col-3" draggable="true">
                <img src="26_assets/${data.photo}" alt="">
                <p class="title">${data.title}</p>
                <p class="brand">${data.brand}</p>
                <p class="price">가격 : ${data.price}</p>
                <p class="bn mt-auto">
                <button class="btn btn-outline-secondary"><i class="bi bi-cart-plus"></i> 담기</button>
                </p>
            </div>`;
    $('.pdlist').append(proddiv);
};



 $.get('./26_assets/store.json')
.done(function(data){
    data.products.forEach(function(a, i){
        prodlist(a, i);
    });
  
    
}).fail(function(){});


//search
var insearch ;
document.querySelector('#search').addEventListener('input', function(e){
    insearch = e.currentTarget.value;
})
document.querySelector('.srbtn').addEventListener('click', function(){
    if(insearch == prodlist.title){
      prodlist(a, i);
    }
    prodlist(a, i);
})