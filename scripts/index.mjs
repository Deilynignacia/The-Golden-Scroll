import { generateHint } from './BibleService.mjs';

// Index Profile
const teamData = JSON.parse(localStorage.getItem("goldenScroll_team"));
if (teamData) {
    document.getElementById('team-profile').style.backgroundImage = `url(${teamData.avatar})`;
}

// Menu
const btnMap = document.getElementById('map');
const btnRanking = document.getElementById('ranking');
const btnNotes = document.getElementById('notes');
const btnBible = document.getElementById('bible');

if (btnMap) {
    btnMap.addEventListener('click', () => {
        window.location.href = "map.html";
    });
}

if (btnRanking) {
    btnRanking.addEventListener('click', () => {
        window.location.href = "ranking.html";
    });
}

if (btnNotes) {
    btnNotes.addEventListener('click', () => {
        window.location.href = "notes.html";
    });
}

if (btnBible) {
    btnBible.addEventListener('click', () => {
        window.location.href = "bible.html";
    });
}

// Bible-API
const hintButton = document.getElementById('btn-get-hint');
const display = document.getElementById('scriptures-content');

if (hintButton && display) {
    hintButton.addEventListener('click', async () => {
        display.innerText = "Loading Hint";
        const textoVersiculo = await generateHint("Genesis 1:1"); 
        display.innerText = textoVersiculo; 
    });
}