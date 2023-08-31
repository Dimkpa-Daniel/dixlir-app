// DECLARING VARIABLES

var now_playing = document.querySelector(".now-playing");
var track_art = document.querySelector(".track-art");
var track_name = document.querySelector(".track-name");
var track_artist = document.querySelector(".track-artist");

var playpause_btn = document.querySelector(".playpause-track");
var next_btn = document.querySelector(".next-track");
var prev_btn = document.querySelector(".prev-track");

var seek_slider = document.querySelector(".seek_slider");
var volume_slider = document.querySelector(".volume_slider");
var curr_time = document.querySelector(".current-time");
var total_duration = document.querySelector(".total-duration");

var track_index = 0;
var isPlaying = false;
var updateTimer;

// Create new audio element
var curr_track = document.createElement('audio');

// Define the tracks that have to be played
var track_list = [
  {
    name: "Ebenezer Ohhhhh",
    artist: "Nathaniel Bassesy & Victoria Orenze",
    image: "./music/ebenezer.jpg",
    path: "./music/Nathaniel-Bassey-Ft-Victoria-Orenze-Ebenezer-Live-(TrendyBeatz.com).mp3"
  },
  {
    name: "Rise",
    artist: "Jonas blue & Jack and Jack",
    image: "./music/rise.jpg",
    path: "./music/Jonas Blue Rise (feat. Jack & Jack).mp3"
  },
  {
    name: "Everlasting shine",
    artist: "Tommorrow x Together",
    image: "./music/clover.jpg",
    path: "./music/TOMORROW X TOGETHER Everlasting Shine Opening 12 Black Clover.mp3",
  },
];

// function random_bg_color() {

//   // Get a number between 64 to 256 (for getting lighter colors)
//   var red = Math.floor(Math.random() * 256) + 64;
//   var green = Math.floor(Math.random() * 256) + 64;
//   var blue = Math.floor(Math.random() * 256) + 64;

//   // Construct a color withe the given values
//   var bgColor = "rgb(" + red + "," + green + "," + blue + ")";

//   // Set the background to that color
//   document.body.style.background = bgColor;
// }


// Load track function
function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  // random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  var seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  var seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    var currentMinutes = Math.floor(curr_track.currentTime / 60);
    var currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    var durationMinutes = Math.floor(curr_track.duration / 60);
    var durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

