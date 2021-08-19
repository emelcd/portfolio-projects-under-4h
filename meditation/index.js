import { html, render, nothing } from "lit-html";

let timer = 0;
let optionsTime = [30, 60, 120, 300, 600, 1200, 1800, 3600];
let isPlaying = false;
let isSelected = false;
let isPlayingMusic = false;


const audio = new Audio("./goodbye-stress-calming-acoustic-guitar-instrumental-background-music-for-videos-5714.mp3", {
  loop: true,
});

const styles = html`
  <style>

    * {
      padding: 0.5rem;
      margin: 0.5rem;
      font-family: "Arial";
    }
    body {
      background-color: #464263;
    }
    h1 {
      text-align: center;
      font-size: 2rem;
    }
    button {
      /* make a fancy button */
      background-color: #dbd3d3;
      border: 1px solid #ccc;
      border-radius: 0.5rem;
      color: #333;
      font-size: 1.5rem;
      padding: 0.5rem;
      margin: 0.5rem;
      cursor: pointer;
    }
    button:disabled,
    button[disabled] {
      border: 1px solid #999999;
      background-color: #cccccc;
      color: #747171;
      border: 1px solid #ccc;
    }
    .timer-container {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }
    .controler-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .control-button {
      background-color: #d6d2d2;
      border: 1px solid #ccc;
      border-radius: 0.5rem;
      color: #000000;
      font-size: 1.5rem;
      font-weight: bold;
      min-width: 50%;
    }
    .player-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .timer {
      flex-grow: 2;
    }
    .players {
      font-size: 4rem;
      background-color: transparent;
      border:none;
      padding:0
    }
    .logo-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .logo-image {
      width: 33%;
      height: auto;
    }
    @keyframes blink {
      0% {
        opacity: 1;
        transform: scale(1);
      }
      60% {
        opacity: 0.8;
        transform: scale(1.2);
      }
      100% {
        opacity: 1;
      } 
    }
    .blink {
      animation: blink 8s ease-in-out infinite;
    }
    .time-display {
      color: white;
      font-size: 5rem;
    }
  </style>
`;

const timerUI = (t) => {
  return html`
    ${styles}
    <div class="logo-container">
          <img class="logo-image ${isPlaying?'blink':nothing}" src="./m.png" alt="logo" />
    </div>
    <div class="player-container">
      ${isPlayingMusic
        ? html`<button  class="players" @click=${playMusic}>⏹️</button>`
        : html`<button class="players" @click=${playMusic}>▶️</button>`}
    </div>
    <div class="timer-container">
      ${optionsTime.map((item) => {
        return html`
          <button
            class="timer"
            id=${item}
            @click=${setTimer}
            ?disabled=${isSelected}
          >
            ${min(item)}
          </button>
        `;
      })}
    </div>
    <div class="controler-container">
      ${isSelected
        ? html`<button class="control-button" @click=${resetClock}>
            RESET
          </button>`
        : nothing}
      ${isPlaying
        ? html`<button class="control-button" @click=${stopTimer}>STOP</button>`
        : isSelected
        ? html`<button class="control-button" @click=${continueTimer}>
            CONTINUE
          </button>`
        : nothing}
    </div>

    <h1 class="time-display">${min(t)}</h1>
  `;
};

const playMusic = () => {
  if (audio.paused) {
    isPlayingMusic = true;
    audio.play();
  } else {
    isPlayingMusic = false;
    audio.pause();
  }

  console.log(
    audio.paused ? "The audio is paused" : "The audio is playing"
  )
  render(timerUI(timer), document.body);
};

// make a function that transform seconds into min or hout
const min = (seconds) => {
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (minutes > 60) {
    let hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return hours + ":" + minutes + ":" + seconds;
  }

  return minutes + ":" + seconds;
};
let timerF;

const setTimer = (e) => {
  playMusic()
  isSelected = true;
  timer = e.target.id;
  isPlaying = true;
  render(timerUI(timer), document.body);
  timerF = setInterval(() => {
    timer--;
    render(timerUI(timer), document.body);
    if (timer <= 0) {
      clearInterval(timerF);
    }
  }, 1000);
};

const continueTimer = () => {
  playMusic()
  isPlaying = true;
  render(timerUI(timer), document.body);
  setInterval(() => {
    timer--;
    render(timerUI(timer), document.body);
    if (timer <= 0) {
      clearInterval(timerF);
      isPlaying = false;
      render(timerUI(timer), document.body);
    }
  }, 1000);
};

const resetClock = () => {
  playMusic()
  const interval_id = window.setInterval(function () {},
  Number.MAX_SAFE_INTEGER);
  
  // Clear any timeout/interval up to that id
  for (let i = 1; i < interval_id; i++) {
    window.clearInterval(i);
  }
  timer = 0;
  isPlaying = false;
  isSelected = false;
  clearInterval(timerF);
  render(timerUI(timer), document.body);
};

const stopTimer = () => {
  playMusic()
  const interval_id = window.setInterval(function () {},
  Number.MAX_SAFE_INTEGER);

  // Clear any timeout/interval up to that id
  for (let i = 1; i < interval_id; i++) {
    window.clearInterval(i);
  }

  isPlaying = false;
  clearInterval(timerF);
  render(timerUI(timer), document.body);
};

render(timerUI(timer), document.body);
