let player;
let playerElement = $('.player');
let videoDuration;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    width: playerElement.width(),
    height: playerElement.height(),
    videoId: 'ar2UyGn27RU',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    },
    playerVars: {
      controls: 0,
      disablekb: 0,
      showinfo: 0,
      autoplay: 0,
      rel: 0,
      modestbranding: 0
    }
  });
}

eventInit();

//==========================================================================


function eventInit(){
  $('.player__start').on('click', playBtnListener);
  $('.player__splash').on('click', playBtnListener);
  $('.player__playback').on('click', pbClickListener)
}


function onPlayerReady(){  
  videoDuration = player.getDuration();
  $('.player__duration-estimate').text(formanTime(videoDuration));
  
  let interval;

  if(typeof interval !== 'undefined'){
    clearInterval(interval);
  }

  interval = setInterval(timeWatcher, 100)

}

function onPlayerStateChange(event){
  /* 
    -1 (воспроизведение видео не начато)
    0 (воспроизведение видео завершено)
    1 (воспроизведение)
    2 (пауза)
    3 (буферизация)
    5 (видео подают реплики).
  */
  switch(event.data){
    case 1:
      playerElement.addClass('active');
      playerElement.removeClass('paused');
      break;
    case 2:
      playerElement.removeClass('active')
      playerElement.addClass('paused');
      break;
  }
}

//------------------------------------------------------------------
// On ready functions

function timeWatcher(){
  const currTime = player.getCurrentTime()
  const timePercent = (currTime / videoDuration)*100;

  $('.player__duration-complited').text(formanTime(currTime));

  $('.player__progress-complited').css({
    width: `${timePercent}%`
  })
  $('.player__progress-draggable').css({
    left: `${timePercent}%`
  })
}

function formanTime(time){ 
  const durationSec = Math.round(time);

  const min = Math.round(durationSec / 60);
  const sec = durationSec % 60

  let addZero = num => num<10 ? `0${num}` : num; 

  return `${addZero(min)}:${addZero(sec)}`;
}

//------------------------------------------------------------------
// Event listeners

function playBtnListener(e){
  e.preventDefault();

  if(playerElement.hasClass('paused') || !playerElement.hasClass('active')){
    player.playVideo();
  } else {
    player.pauseVideo();
  }
};

function pbClickListener(e){
  let timeRatio = e.offsetX / $(e.currentTarget).width();
  let newTime = videoDuration * timeRatio;

  player.seekTo(Math.round(newTime));
}


