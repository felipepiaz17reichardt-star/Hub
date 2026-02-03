/* ===== PLAYER ===== */
const songs = [
  "./music/libera-me.mp3",
  "./music/solario-days.mp3"
];

let index = 0;

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const playIcon = document.getElementById("playIcon");
const musicBox = document.querySelector(".music-box");

audio.src = songs[index];

function playPause() {
  audio.paused ? audio.play() : audio.pause();
}

function next() {
  index = (index + 1) % songs.length;
  loadSong();
}

function prev() {
  index = (index - 1 + songs.length) % songs.length;
  loadSong();
}

function loadSong() {
  audio.src = songs[index];
  audio.play().catch(err => console.log(err));
}

audio.addEventListener("loadedmetadata", () => {
  duration.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  progress.style.width = (audio.currentTime / audio.duration) * 100 + "%";
  current.textContent = formatTime(audio.currentTime);
});

function seek(e) {
  const width = e.currentTarget.clientWidth;
  audio.currentTime = (e.offsetX / width) * audio.duration;
}

function formatTime(t) {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

audio.addEventListener("play", () => {
  playIcon.className = "bi bi-pause-fill";
  musicBox.classList.add("playing");
});

audio.addEventListener("pause", () => {
  playIcon.className = "bi bi-play-fill";
  musicBox.classList.remove("playing");
});

audio.addEventListener("ended", next);


/* ===== INTRO ===== */
const startScreen = document.getElementById("startScreen");
const intro = document.getElementById("intro");
const introVideo = document.getElementById("introVideo");
const skipBtn = document.getElementById("skipBtn");
const hub = document.getElementById("hub");

startScreen.addEventListener("click", async () => {
  startScreen.remove();

  intro.classList.add("active");

  // fullscreen real
  if (introVideo.requestFullscreen) introVideo.requestFullscreen();

  introVideo.muted = false;
  introVideo.volume = 1;

  // só toca quando puder
  introVideo.addEventListener('canplay', () => {
    introVideo.play().catch(err => console.log(err));
  }, {once:true});
});

function endIntro() {
  intro.classList.remove("active");

  setTimeout(() => {
    intro.remove();
    hub.style.display = "flex";
    audio.play().catch(err => console.log(err));
  }, 500);
}

skipBtn.addEventListener("click", endIntro);
introVideo.addEventListener("ended", endIntro);
