(function(){
  let overflowEl = document.querySelector('.overflow-menu');
  let closeBtn = document.querySelector('.overflow-menu__close');
  let openBtn = document.querySelector('#js-open-overflow');


  let openMenu = (e) => {
    overflowEl.classList.add('active');
    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = "no";
  }
  let closeMenu = (e) => {
    overflowEl.classList.remove('active');
    document.documentElement.style.overflow = 'scroll';
    document.body.scroll = "yes";
  }

  openBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
})()