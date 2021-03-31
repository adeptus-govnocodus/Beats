var reviews = $('.review__slide');
var currReview = $('.review__slide--active');

var reviewBtn = $('.reviews__item');


reviewBtn.on('click', function(){
  $this = $(this);

  if($this.attr('slide-link') === currReview.attr('slide-id')) return;

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
    
    console.log(currReview);
    currReview.css('opacity',0);
    currReview.addClass('review__slide--active');
    currReview.animate({
      opacity: 1
    },time);  
  })
}