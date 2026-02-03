const songs = [
  "music/libera-me.mp3",
  "music/solario-days.mp3"
];

let index = 0;

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const playIcon = document.getElementById("playIcon");

audio.src = songs[index];

function playPause() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
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
  audio.play();
}

audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;

  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = percent + "%";

  current.textContent = formatTime(audio.currentTime);
  duration.textContent = formatTime(audio.duration);
});

function seek(e) {
  const width = e.currentTarget.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
}

function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}

audio.addEventListener("play", () => {
  playIcon.className = "bi bi-pause-fill";
});

audio.addEventListener("pause", () => {
  playIcon.className = "bi bi-play-fill";
});

audio.addEventListener("ended", next);
