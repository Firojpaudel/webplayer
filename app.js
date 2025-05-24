let currentMusic = 0;

const music = document.querySelector('#audio');
const seekBar = document.querySelector('.seek-bar');
const songName = document.querySelector('.music-name');
const artistName = document.querySelector('.artist-name');
const disk = document.querySelector('.disk');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const playBtn = document.querySelector('.play-btn');
const forwardBtn = document.querySelector('.btn-front');
const backwardBtn = document.querySelector('.btn-back');
const alertBox = document.querySelector('.alert');

// Show alert on page load and auto-hide after 4 seconds
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        alertBox.classList.add('show');
        
        // Auto-hide alert after 4 seconds
        setTimeout(() => {
            alertBox.classList.remove('show');
        }, 4000);
    }, 500); // 500ms delay to ensure DOM is ready
});

// Set up a song
const setMusic = (i) => {
    seekBar.value = 0; // Reset seek bar
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;

    currentTime.innerHTML = '00:00';
    setTimeout(() => {
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    }, 300);

    // Ensure paused state
    music.pause();
    playBtn.classList.remove('pause');
    disk.classList.remove('play');
};

// Load the first song
setMusic(0);

// Format time (e.g., "02:45")
const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10) {
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if (sec < 10) {
        sec = `0${sec}`;
    }
    return `${min}:${sec}`;
};

// Play/Pause button
playBtn.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        playBtn.classList.add('pause');
        disk.classList.add('play');
        alertBox.classList.remove('show'); // Hide alert on play
    } else {
        music.pause();
        playBtn.classList.remove('pause');
        disk.classList.remove('play');
    }
});

// Update seek bar and time
setInterval(() => {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
    if (Math.floor(music.currentTime) >= Math.floor(seekBar.max)) {
        forwardBtn.click(); // Auto-play next song
    }
}, 500);

// Seek bar manual change
seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
});

// Function to play music
const playMusic = () => {
    music.play();
    playBtn.classList.add('pause');
    disk.classList.add('play');
    alertBox.classList.remove('show'); // Hide alert on play
};

// Next song
forwardBtn.addEventListener('click', () => {
    if (currentMusic >= songs.length - 1) {
        currentMusic = 0; // Loop to start
    } else {
        currentMusic++;
    }
    setMusic(currentMusic);
    playMusic(); // Auto-play next song
});

// Previous song
backwardBtn.addEventListener('click', () => {
    if (currentMusic <= 0) {
        currentMusic = songs.length - 1; // Loop to end
    } else {
        currentMusic--;
    }
    setMusic(currentMusic);
    playMusic(); // Auto-play previous song
});