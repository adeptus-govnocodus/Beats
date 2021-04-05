(function(){
  const time = 200;
  const team = $('.team');
  const teammates = $('.team__item');
  const arrowWidth = $('.team__arrow').css('borderTopWidth')

  let currIndex = null;


  teammates.on('click', function(e){
    let thisIndex = $(this).index();

    if(thisIndex === currIndex){
      hideContent(thisIndex);
      currIndex = null;
      return;
    }

    if(currIndex !== null){
      hideContent(currIndex);
      currIndex = null;
    }

    showContent(thisIndex);
    currIndex = thisIndex;
  })


  function hideContent(index){  
    let elements = teammates.filter(`:nth-child(${index+1})`);
    let arrows = elements.find('.team__arrow');

    elements.find('.team__content').slideUp(time);

    console.log(parseInt(arrowWidth))
    arrows.animate({
      borderBottomWidth: 0
    },time/2).animate({
      borderTopWidth: parseInt(arrowWidth)
    },time/2)
  }

  function showContent(index){ 
    let elements = teammates.filter(`:nth-child(${index+1})`);
    let arrows = elements.find('.team__arrow');

    elements.find('.team__content').slideDown(time);

    arrows.animate({
      borderTopWidth: 0
    },time/2).animate({
      borderBottomWidth: parseInt(arrowWidth)
    },time/2)
  }
})()