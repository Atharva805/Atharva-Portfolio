const audio = document.querySelector(".box73");

const playBtn = document.querySelector(".box70");

const previousBtn = document.querySelector(".box69");

const nextBtn = document.querySelector(".box71");

const playImg = document.querySelector(".play-img");

const pauseImg = document.querySelector(".pause-img");

const volume = document.querySelector(".volume");

const progress = document.querySelector(".progress");

const currentTime = document.querySelector(".current-time");

const duration = document.querySelector(".duration");

//pay and pause

playBtn.addEventListener("click", () => {

    if (audio.paused) {

        audio.play();

        playImg.style.display = "none";
        pauseImg.style.display = "block";

    } else {

        audio.pause();

        playImg.style.display = "block";
        pauseImg.style.display = "none";

    }
});

//voume button

volume.addEventListener("input", () => {

    audio.volume = volume.value;

});

//progress bar and timestamp
audio.addEventListener("timeupdate", () => {

    if (!audio.duration) return;

    const percentage =
        (audio.currentTime / audio.duration) * 100;

    progress.value = percentage;

    currentTime.innerText =
        formatTime(audio.currentTime);

});
audio.addEventListener("loadedmetadata", () => {

    duration.innerText =
        formatTime(audio.duration);

});
progress.addEventListener("input", () => {

    if (!audio.duration) return;

    audio.currentTime =
        (progress.value / 100) * audio.duration;

});
function formatTime(time) {

    if (isNaN(time)) return "0:00";

    let minutes = Math.floor(time / 60);

    let seconds = Math.floor(time % 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;
}

async function getSongs() {

    let a = await fetch("http://127.0.0.1:3000/link.html");

    let response = await a.text();

    let div = document.createElement("div");

    div.innerHTML = response;

    let as = div.getElementsByTagName("a");

    let songs = [];

    for (let index = 0; index < as.length; index++) {

        const element = as[index];

        if (element.href.endsWith(".mp3")) {

            songs.push(element.href);

        }

    }

    return songs;
}

async function getImages() {

    let a = await fetch("http://127.0.0.1:3000/link.html");

    let response = await a.text();

    let div = document.createElement("div");

    div.innerHTML = response;

    let imgs = div.getElementsByTagName("img");

    let images = [];

    for (let index = 0; index < imgs.length; index++) {

        const element = imgs[index];

        images.push(element.src);

    }

    return images;
}

async function getAuthors() {

    let a = await fetch("http://127.0.0.1:3000/link.html");

    let response = await a.text();

    let div = document.createElement("div");

    div.innerHTML = response;

    let authors = div.getElementsByClassName("author");

    let authorNames = [];

    for (let index = 0; index < authors.length; index++) {

        authorNames.push(authors[index].innerText);

    }

    return authorNames;
}

async function getTitles() {

    let a = await fetch("http://127.0.0.1:3000/link.html");

    let response = await a.text();

    let div = document.createElement("div");

    div.innerHTML = response;

    let titles = div.getElementsByClassName("song-title");

    let songTitles = [];

    for (let index = 0; index < titles.length; index++) {
        songTitles.push(titles[index].innerText);
    }

    return songTitles;
}

async function main() {

    let songs = await getSongs();

    let images = await getImages();

    let authors = await getAuthors();

    let titles = await getTitles();
    
    let currentSong = 0;

    let player = document.querySelector(".box73");

    let playerBox = document.querySelector(".box62");

    let playerImg = document.querySelector(".box63");

    let playerTitle = document.querySelector(".box64");

    let playerAuthor = document.querySelector(".box66");

    let pays = document.querySelectorAll(
        ".pay1, .pay2, .pay3, .pay4, .pay5"
    );

    function loadSong(index) {

            currentSong = index;

            // Stop current song
            player.pause();
            // Load selected song
            player.src = songs[index];
            player.load();
            player.currentTime = 0;
            // Show bottom player
            playerBox.style.display = "flex";
            // Set song title
            playerTitle.innerText = titles[index];
            // Set album image
            playerImg.src = images[index];
            // Set author
            playerAuthor.innerText = authors[index];
            // Play song
            player.play();
            // Change button to pause
            playImg.style.display = "none";

            pauseImg.style.display = "block";
        }
    
    pays.forEach((pay, index) => {

        pay.addEventListener("click", (e) => {

            e.preventDefault();

            loadSong(index);
      });

    });

     //previous button

    previousBtn.addEventListener("click", () => {

        currentSong--;

        if (currentSong < 0) {
            currentSong = songs.length - 1;
        }

        loadSong(currentSong);

    });

    //next button

     nextBtn.addEventListener("click", () => {

        currentSong++;

        if (currentSong >= songs.length) {
            currentSong = 0;
        }

        loadSong(currentSong);

    });

}

main();