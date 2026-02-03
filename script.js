
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
const musicBox = document.querySelector(".music-box");

audio.src = songs[index];
audio.volume = 0.8;

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

audio.addEventListener("loadedmetadata", () => {
  duration.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;

  progress.style.width =
    (audio.currentTime / audio.duration) * 100 + "%";

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




const startScreen = document.getElementById("startScreen");
const intro = document.getElementById("intro");
const introVideo = document.getElementById("introVideo");
const skipBtn = document.getElementById("skipBtn");
const hub = document.getElementById("hub");


hub.style.display = "none";
intro.classList.remove("active");
introVideo.controls = false;
introVideo.muted = true;

startScreen.addEventListener("click", async () => {
  startScreen.remove();

  intro.classList.add("active");


  if (intro.requestFullscreen) {
    intro.requestFullscreen().catch(() => {});
  }

  introVideo.muted = false;
  introVideo.volume = 1;

  introVideo.play().catch(() => {
    
    introVideo.muted = true;
    introVideo.play();
  });
});


function endIntro() {
  introVideo.pause();

  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {});
  }

  intro.classList.remove("active");

  setTimeout(() => {
    intro.remove();
    hub.style.display = "flex";

   
    audio.play().catch(() => {});
  }, 400);
}


skipBtn.addEventListener("click", endIntro);


introVideo.addEventListener("ended", endIntro);


introVideo.addEventListener("contextmenu", e => e.preventDefault());
introVideo.addEventListener("pause", () => {
  if (intro.classList.contains("active")) {
    introVideo.play();
  }
});



const DISCORD_ID = "1185962602258497570";

async function loadDiscord() {
  try {
    const res = await fetch(
      `https://api.lanyard.rest/v1/users/${DISCORD_ID}`
    );

    const json = await res.json();
    const data = json.data;

    const avatar = `https://cdn.discordapp.com/avatars/${DISCORD_ID}/${data.discord_user.avatar}.png?size=128`;

    document.getElementById("dcAvatar").src = avatar;
    document.getElementById("dcName").textContent =
      `${data.discord_user.username}#${data.discord_user.discriminator}`;

    // status
    const statusMap = {
      online: "🟢 Online",
      idle: "🌙 Ausente",
      dnd: "⛔ Não Perturbe",
      offline: "⚫ Offline"
    };

    let statusText = statusMap[data.discord_status] || "Offline";

   
    if (data.activities && data.activities.length > 0) {
      const act = data.activities[0];
      if (act.name) {
        statusText = `🎮 ${act.name}`;
      }
    }

    document.getElementById("dcStatus").textContent = statusText;


    document.getElementById("dcAdd").href =
      `https://discord.com/users/${DISCORD_ID}`;

  } catch (err) {
    document.getElementById("dcStatus").textContent =
      "⚠️ Discord offline";
  }
}


loadDiscord();
setInterval(loadDiscord, 15000);

