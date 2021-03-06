$(function(){
  const sections = $('section');
  const display = $('.maincontent');
  const sideMenu = $('.fixed-menu')
  const overflowEl = $('.overflow-menu');


  const getTrs = () =>{
    const trsStyle = display.css('transition-duration')
    const trsMs = parseFloat(trsStyle)*1000
    return Math.round(trsMs)
  }
  const trsTime = getTrs();

  let activeSection = sections.first();
  activeSection.addClass('active');


  let isScrolling = false;

  let isMobile = new MobileDetect(window.navigator.userAgent).mobile();


  $(window).on('wheel', e=>{
    if(isScrolling) return;
    if(e.ctrlKey) return;
    if(overflowEl.hasClass('active')) return;


    const deltaY = e.originalEvent.deltaY;

    if(deltaY > 0){
      scrollNext()
    }
    if(deltaY < 0){
      scrollPrev()
    }
  })

  $('a[data-scroll-to]').on('click', e=>{
    scrollTo($(e.target).attr('data-scroll-to'));
    $('.overflow-menu').removeClass('active');
  })

  display.on('transitionend', e=>{
    isScrolling = false
  })

  $(window).on('keydown',e=>{

    if(overflowEl.hasClass('active')) return;
    switch(e.keyCode){
      case 38:
        scrollPrev();
        break;
      case 40:
        scrollNext();
        break;
    }
  })



  function scrollNext(){
    let nextEl = activeSection.next();
    
    if(nextEl.length){
      scrollTo(nextEl.attr('data-section-id'));
    }
  }
  function scrollPrev(){
    let prevEl = activeSection.prev();

    if(prevEl.length){
      scrollTo(prevEl.attr('data-section-id'));
    }
  }

  function scrollTo(id){
    const element = sections.filter(`[data-section-id=${id}]`);
    const index = element.index();
    
    activeSection.removeClass('active')
    element.addClass('active');
    activeSection = element;

    sideMenu.find('.fixed-menu__item--active').removeClass('fixed-menu__item--active')
    sideMenu.find(`a[data-scroll-to=${id}]`).closest('.fixed-menu__item').addClass('fixed-menu__item--active')

    shiftTransform(index);
  }

  function shiftTransform(num){
    isScrolling = true;

    const pos = num * -100;

    display.css({
      transform: `translateY(${pos}%)`
    })
  }

  $('.wrapper').on('touchmove', e=>e.preventDefault());

  if(isMobile){
    $('body').swipe({
      swipe: function(event, direction){
        switch(direction){
          case "down":
            scrollPrev();
            break;
          case "up":
            scrollNext();
            break;
        }
      }
    });
  }

})