let recording = false;
let currentTrack = 1;
let recordedTracks = {
  1: [],
  2: [],
  3: [],
  4: [],
};
let startTime;
let recordedSounds = [];

const KeyToSound = {
  a: document.querySelector("#s1"),
  s: document.querySelector("#s2"),
  d: document.querySelector("#s3"),
  f: document.querySelector("#s4"),
  g: document.querySelector("#s5"),
  h: document.querySelector("#s6"),
  j: document.querySelector("#s7"),
  k: document.querySelector("#s8"),
  l: document.querySelector("#s9"),
};

function onTrackChange() {
  const checkedTracks = document.querySelectorAll(".trackCheckbox:checked");
  checkedTracks.forEach((checkedTrack) => {
    const track = parseInt(checkedTrack.getAttribute("data-track"), 10);
    currentTrack = track;
  });
}

function startRecording() {
  if (!recording && currentTrack !== null) {
    recording = true;
    startTime = Date.now();
    recordedTracks[currentTrack] = [];
    recordedSounds = [];
    console.log("Recording started on track", currentTrack);
  }
}

function stopRecording() {
  if (recording) {
    recording = false;
    console.log("Recording stopped");
  }
}

function playRecording() {
  const selectedTracks = document.querySelectorAll(".trackCheckbox:checked");
  selectedTracks.forEach((checkedTrack) => {
    const track = parseInt(checkedTrack.getAttribute("data-track"), 10);
    const soundsToPlay = recordedTracks[track];
    console.log(`Playback started for track ${track}`);
    if (soundsToPlay.length > 0) {
      soundsToPlay.forEach((event) => {
        setTimeout(() => {
          playSound(event.key);
        }, event.time);
      });
    } else {
      console.log(`No sounds recorded for track ${track}`);
    }
  });
}

function playRecordedSound(sound) {
  const audio = new Audio(sound.src);
  audio.play();
}

function onKeyPress(event) {
  const sound = KeyToSound[event.key];
  if (sound) {
    playSound(sound);
    if (recording && currentTrack !== null) {
      recordedTracks[currentTrack].push({
        key: sound,
        time: Date.now() - startTime,
      });
    }
  }
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

document.addEventListener("keypress", onKeyPress);
document.getElementById("record").addEventListener("click", startRecording);
document.getElementById("stop").addEventListener("click", stopRecording);
document.getElementById("play").addEventListener("click", playRecording);

const trackCheckboxes = document.querySelectorAll(".trackCheckbox");
trackCheckboxes.forEach((checkbox) =>
  checkbox.addEventListener("change", onTrackChange)
);
