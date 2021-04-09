(function(){
  let overflowEl = $('.overflow-menu');
  let closeBtn = $('.overflow-menu__close');
  let openBtn = $('#js-open-overflow');


  let openMenu = e => {
    overflowEl.addClass('active');
  }
  let closeMenu = e => {
    overflowEl.removeClass('active');
  }

  openBtn.on('click', openMenu);
  closeBtn.on('click', closeMenu);
})()