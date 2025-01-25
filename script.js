const playlists = [
    {
        name: 'Playlist 1',
        songs: [
            {
                title: '1. Jo Tum Mere Ho',
                src: 'jotummereho.mp3'
            },
            {
                title: '2. Husn',
                src: 'husn.mp3'
            },
            {
                title: '3. Baarishein',
                src: 'baareshein.mp3'
            },
            {
                title: '4. Gul',
                src: 'gul.mp3'
            },
            // ...
        ]
    },
    // ...
];

const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressBar = document.getElementById('progress');
const seekBar = document.getElementById('seek-bar');
const currentTime = document.getElementById('current-time');
const duration = document.getElementById('duration');
const volume = document.getElementById('volume');
const pl1 = document.getElementById('pl1im');
const plarea = document.getElementById('pl1');
const start = document.getElementById('start');

 pl1.addEventListener('click', function () {
    plarea.style.display = 'block';
    start.style.display = 'none';
 })

let currentPlaylist = 0;
let currentSong = 0;

function loadPlaylist() {
    const playlist = playlists[currentPlaylist];
    const songs = playlist.songs;
    const songsList = document.createElement('ul');

    songs.forEach((song, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = song.title;
        listItem.addEventListener('click', () => {
            currentSong = index;
            loadSong();
        });
        songsList.appendChild(listItem);
    });

    document.getElementById('playlists').appendChild(songsList);
}

function loadSong() {
    const playlist = playlists[currentPlaylist];
    const song = playlist.songs[currentSong];
    audio.src = song.src;
}

function playPause() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = 'Pause';
    } else {
        audio.pause();
        playPauseBtn.textContent = 'Play';
    }
}

function prevSong() {
    currentSong--;
    if (currentSong < 0) {
        currentSong = playlists[currentPlaylist].songs.length - 1;
    }
    loadSong();
    playPause();
}

function nextSong() {
    currentSong++;
    if (currentSong >= playlists[currentPlaylist].songs.length) {
        currentSong = 0;
    }
    loadSong();
    playPause();
}

function updateProgressBar() {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progress + '%';
    seekBar.value = progress;

    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60);
    currentTime.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    const totalMinutes = Math.floor(audio.duration / 60);
    const totalSeconds = Math.floor(audio.duration % 60);
    duration.textContent = `${totalMinutes.toString().padStart(2, '0')}:${totalSeconds.toString().padStart(2, '0')}`;
}

function seekTo(time) {
    audio.currentTime = time;
}

function updateVolume() {
    audio.volume = volume.value;
}

audio.addEventListener('timeupdate', updateProgressBar);
audio.addEventListener('ended', nextSong);

playPauseBtn.addEventListener('click', playPause);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
seekBar.addEventListener('input', () => seekTo(audio.duration * (seekBar.value / 100)));
volume.addEventListener('input', updateVolume);

loadPlaylist();
loadSong();