$(function(){
  const items = $('.colors-menu__item');
  let currActive = null;
  
  items.find('.colors-menu__button').on('click', function(e){
    let $this = $(this);
    let newActive = $this.closest('.colors-menu__item');

    if(currActive && currActive[0] === newActive[0]){
      currActive.removeClass('active');
      currActive = null;
      return;
    }

    if(currActive){
      currActive.removeClass('active');
    }
    newActive.addClass('active');
    currActive = newActive;
  })
  $('.colors-menu__close').on('click', e=>{
    $(e.target).closest('.colors-menu__item').removeClass('active');
  })

  $(window).on('keydown',e=>{
    if(currActive && e.keyCode === 27){
      currActive.removeClass('active');
      currActive = null;
    }
  })
  $(document).on('click', e=>{
    if(currActive){      
      let $target = $(e.target);
      if( !($target.hasClass('colors-menu__item') || $target.closest('.colors-menu__item').length) ){
        currActive.removeClass('active');
        currActive = null;
      }
    }
  })
})