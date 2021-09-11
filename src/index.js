const app = () => {
  const video = document.querySelector(".vid-container video");
  const sound = document.querySelector(".song");
  const play = document.querySelector(".play-btn");
  const outline = document.querySelector(".circle2 circle");
  const outlineLength = outline.getTotalLength();
  const timeDisplay = document.querySelector("#time-result");
  //const sounds = document.querySelectorAll(".sound-picker");
  const timeSelect = document.querySelectorAll(".btn");
  //console.log(timeSelect, "hi");
  let fakeDuration = 600;
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  play.addEventListener("click", () => {
    checkPlaying(sound);
  });

  timeSelect.forEach((option) => {
    option.addEventListener("click", function () {
      fakeDuration = this.getAttribute("data-time");
      console.log(fakeDuration);
      //const Minutes = Math.floor(fakeDuration / 60);
      //const Seconds = Math.floor(fakeDuration % 60);
      timeDisplay.textContent = `${Math.floor(
        fakeDuration / 60
      )} : ${Math.floor(fakeDuration % 60)}`;
    });
  });

  sound.ontimeupdate = () => {
    console.log(fakeDuration);
    const currentTime = sound.currentTime;
    const elapsedTime = fakeDuration - currentTime;
    const Minutes = Math.floor(elapsedTime / 60);
    const Seconds = Math.floor(elapsedTime % 60);
    timeDisplay.textContent = `${Minutes} : ${Seconds}`;
    //console.log(timeDisplay);
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    if (currentTime >= fakeDuration) {
      sound.currentTime = 0;
      sound.pause();
      play.src = "../src/svg/play.svg";
      video.pause();
    }
  };
  const checkPlaying = (song) => {
    if (song.paused) {
      //changeBackground(sound, video);
      song.play();
      play.src = "../src/svg/pause.svg";
      video.play();
    } else {
      song.pause();
      play.src = "../src/svg/play.svg";
      video.pause();
    }
  };
};
app();
