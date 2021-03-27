let overflowEl = document.querySelector('.overflow-menu');
let closeBtn = document.querySelector('.overflow-menu__close');
let openBtn = document.querySelector('#js-open-overflow');


let openMenu = (e) => overflowEl.classList.add('active');
let closeMenu = (e) => overflowEl.classList.remove('active');


openBtn.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);