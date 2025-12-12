const audio = new Audio("Ballade.m4a");
const image = document.getElementById("image");
const slider = document.getElementById("Zeit");
const zeitLabel = document.getElementById("zeitLabel");
const speeds = [1.0,1.5,2.0,0.5]
const speed_yield = changespeed()
audio.addEventListener("loadedmetadata", () => {
    slider.max = audio.duration;
});

let timeInterval; // Variable für das Intervall

const speedSlider = document.getElementById("speedControl");
const speedLabel = document.getElementById("speedLabel");

function setAudioTime() {
    if (isNaN(audio.duration)) return;

    const value = slider.value;
    audio.currentTime = value;

    const minuten = Math.floor(value / 60);
    const sekunden = Math.floor(value % 60).toString().padStart(2, '0');    
    zeitLabel.innerText = `${minuten}:${sekunden}`;
}

function Sound() {
    if (!audio.src) {
        console.warn("Kein Sound geladen!");
        return;
    }

    if (audio.paused) {
        audio.play();
        startTimeUpdate(); // Startet die Zeitaktualisierung, wenn der Sound abgespielt wird
    } else {
        audio.pause();
        stopTimeUpdate(); // Stoppt die Zeitaktualisierung, wenn der Sound pausiert wird
    }
}

// Funktion, um den Slider und die Zeit während des Abspielens zu aktualisieren
function updateTime() {
    if (!audio.paused) {
        slider.value = audio.currentTime;
        const minuten = Math.floor(audio.currentTime / 60);
        const sekunden = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
        zeitLabel.innerText = `${minuten}:${sekunden}`;
    }
}

function* changespeed() {
    while (true) {
        for (let speed of speeds) {
            yield speed
        }
    }
}

// Startet das Intervall für die Zeitaktualisierung
function startTimeUpdate() {
    if (!timeInterval) {
        timeInterval = setInterval(updateTime, 100); // Aktualisiert alle 100ms
    }
}

// Stoppt das Intervall für die Zeitaktualisierung
function stopTimeUpdate() {
    clearInterval(timeInterval);
    timeInterval = null;
}

document.getElementById("speed_change").addEventListener("click",()=>{
    let speed = speed_yield.next().value
    audio.playbackRate = speed
    document.getElementById("speed_change").innerText = speed + "x"
})

document.getElementById("play").addEventListener("click",Sound)