(function(){
  let modal, form;

  $(document).ready(function(){
    form = $('.form');
    modal = $('.modal');

    form.on('submit', function(e){
      e.preventDefault()

      let name = form.find('[name=name]');
      let phone = form.find('[name=phone]');
      let comment = form.find('[name=comment]');
      let to = form.find('[name=to]'); 

      if( validate([name, phone, comment]) ){
        $.ajax({
          url: 'https://webdev-api.loftschool.com/sendmail',
          method: 'POST',
          responseType: 'json',
          data: {
            name: name.val(),
            to: to.val(),
            phone: phone.val(),
            comment: comment.val()
          },
          success: data=>showModal(data.message),
          error: data=>showModal(data.responseJSON.message)
        })
      }
    })

    modal.on('click', e=>{
      if($(e.target).hasClass('modal'))
        hideModal();
    })  
    $(window).on('keydown', e=>{
      if(e.keyCode === 27) 
        hideModal();
    })
    $('.modal__close-btn').on('click', hideModal)
  })

  function validate(arr){
    let result = true;
    for(let el of arr){
      el.removeClass('invalid');
      if(el.val().trim() === ''){
        el.addClass('invalid');
        result = false;
      }
    }
    return result;
  }

  function showModal(message){
    modal.find('.modal__message').text(message);
    modal.addClass('active');
  }
  function hideModal(){
    modal.removeClass('active');
    modal.find('.modal__message').empty();
  }
})()
