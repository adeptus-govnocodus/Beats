$(document).ready(function(){  
  const time = 100;

  const reviews = $('.review__slide');
  let currReview = $('.review__slide--active');

  const reviewBtn = $('.reviews__item');


  reviewBtn.on('click', function(){
    let $this = $(this);

    if( $this.attr('slide-link') === currReview.attr('slide-id') ) return;

    $('.reviews__item--active').removeClass('reviews__item--active');
    $this.addClass('reviews__item--active');
    changeSlide($this.attr('slide-link'));
  })


  function changeSlide(id){
    currReview.animate({
      'opacity': 0
    }, time, ()=>{
      currReview.removeClass('review__slide--active');

      currReview = reviews.filter(`[slide-id=${id}]`);
      
      currReview.css('opacity',0);
      currReview.addClass('review__slide--active');
      currReview.animate({
        opacity: 1
      },time);  
    })
  }
})