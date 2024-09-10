const app = () => { 
  const song = document.querySelector(".song")
  const play = document.querySelector(".play")
  const outline = document.querySelector(".moving-outline circle")
  const video = document.querySelector(".vid-container video")
  
  // Sounds
  const sounds = document.querySelectorAll(".sound-picker button");
  // Time Display
  const timeDisplay = document.querySelector(".time-display");
  const timeSelect = document.querySelectorAll(".time-select button");
  // Get the length of the outline
  const outlineLength = outline.getTotalLength();
  // Duration
  let fakeDuration = 600;

   outline.style.strokeDasharray = outlineLength ;
   outline.style.strokeDashoffset = outlineLength ;
  // Pick different sounds
  sounds.forEach(sound => {
    sound.addEventListener("click", function () {
      song.src = this.getAttribute('data-sound')
      video.src = this.getAttribute('data-video')
      checkPlaying(song)
    })
  })
  // play sound
  play.addEventListener("click" , ()=> {
    checkPlaying(song)
    })


  // Select sound
  timeSelect.forEach(option => {
  option.addEventListener("click", function () {
    fakeDuration = this.getAttribute("data-time");
    // إعادة تعيين الصوت والفيديو للبدء من البداية
    song.currentTime = 0;
    video.currentTime = 0;
    timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:00`;
    if (!song.paused) {
      song.play();
      video.play();
    }
  });
});

    /**
    * This function toggles the play and pause state of a song and its associated video.
    * It changes the play button icon accordingly.
    * 
    * @param {HTMLAudioElement} song - The audio element to be played or paused.
    */
    const checkPlaying = song => { 
      if(song.paused){ 
      song.play();
      video.play()
      play.src = './svg/pause.svg'
    } else { 
      song.pause();
      video.pause()
      play.src = './svg/play.svg'
    }
  };

  // We can animate the circle
  song.ontimeupdate = () =>{  
    let currentTime = song.currentTime;
    let elapsed = fakeDuration -currentTime;
    let seconds = Math.floor(elapsed % 60)
    let minutes = Math.floor(elapsed / 60);

    // Animate the circle
    let progress = outlineLength - (currentTime / fakeDuration) *  outlineLength;
    outline.style.strokeDashoffset = progress 
    // Animate the text 
   timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    if(currentTime >= fakeDuration){ 
      song.pause();
      song.currentTime = 0;
      play.src = './svg/play.svg';
      video.pause()
    }
  }
}

app()