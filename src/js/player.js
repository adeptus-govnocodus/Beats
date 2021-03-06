let player;
let playerElement = $('.player');
let videoDuration;


let isTimelineHolding = false;
let isAudioHolding = false;

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
  $(window).on('resize', e=>{
    player.setSize(playerElement.width(), playerElement.height())
  })
  $('.player__start').on('click', playBtnListener);
  $('.player__splash').on('click', playBtnListener);
  $('.player__audio-btn').on('click', audioBtnClickListener);

  $('.player__playback').on('mousedown', startTimelineHold)
  $(document).on('mouseup', stopTimelineHold)

  $('.player__audio-controll').on('mousedown', startAudioHold)
  $(document).on('mouseup', stopAudioHold)
}


function onPlayerReady(){  
  videoDuration = player.getDuration();
  $('.player__duration-estimate').text(formanTime(videoDuration));
  
  let timeChackInterval;
  if(typeof timeChackInterval !== 'undefined'){
    clearInterval(timeChackInterval);
  }
  timeChackInterval = setInterval(timeWatcher, 100)

  let volume = player.getVolume()
  $('.player__audio-current').css({
    width: `${volume}%`
  })
  $('.player__audio-draggable').css({
    left: `${volume}%`
  })
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

//==========================================================================
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

//==========================================================================
// Event listeners

function playBtnListener(e){
  e.preventDefault();

  if(playerElement.hasClass('paused') || !playerElement.hasClass('active')){
    player.playVideo();
  } else {
    player.pauseVideo();
  }
};
function audioBtnClickListener(e){
  if(player.isMuted()){
    player.unMute()

    changeAudioLine(player.getVolume());
  } else {
    player.mute();

    changeAudioLine(0);
  }
}


function startTimelineHold(e){
  isTimelineHolding = true;

  let timeline = $('.player__progress-bar');
  let timeRatio = (e.clientX - timeline.offset().left) / timeline.outerWidth();
  let newTime = videoDuration * timeRatio;

  setTimeline(Math.round(newTime));
  $(document).on('mousemove', processTimelineHold);
}
function stopTimelineHold(e){
  if(!isTimelineHolding) return;

  isTimelineHolding = false
  
  $(document).off('mousemove', processTimelineHold);
}
function processTimelineHold(e){
  let timeline = $('.player__progress-bar');
  let clientX = e.clientX;
  let timelineX = timeline.offset().left;
  let timelineWidth = timeline.outerWidth();

  if( clientX < timelineX ){
    setTimeline(0);
  }
  else if(clientX > ( timelineX + timelineWidth )){
    setTimeline(videoDuration)
  }
  else{
    let timeRatio = (clientX - timelineX) / timelineWidth;
    let newTime = videoDuration * timeRatio;
  
    setTimeline(Math.round(newTime));
  }
}


function startAudioHold(e){
  isAudioHolding = true;
  let audioLine = $('.player__audio-line')
  
  if(player.isMuted()) player.unMute();
  let volume = ((e.clientX - audioLine.offset().left) / audioLine.outerWidth()) * 100;

  setAudio(volume)
  $(document).on('mousemove', processAudioHold);
}
function stopAudioHold(e){
  if(!isAudioHolding) return;

  isAudioHolding = false
  
  $(document).off('mousemove', processAudioHold);
}
function processAudioHold(e){
  let audioLine = $('.player__audio-line');
  let clientX = e.clientX;
  let audioLineX = audioLine.offset().left;
  let audioLineWidth = audioLine.outerWidth();

  if( clientX < audioLineX ){
    setAudio(0);
  }
  else if(clientX > ( audioLineX + audioLineWidth )){
    setAudio(100);
  }
  else{
    let volume = ((clientX - audioLineX) / audioLineWidth) * 100;

    setAudio(Math.round(volume))
  }
}

//==========================================================================

function changeAudioLine(volume){
  $('.player__audio-current').css({
    width: `${volume}%`
  })
  $('.player__audio-draggable').css({
    left: `${volume}%`
  })
}

function setAudio(volume){
  player.setVolume(volume);
  changeAudioLine(volume);
}

function setTimeline(time){
  player.seekTo(time, true);
}


