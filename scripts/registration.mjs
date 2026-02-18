import { generateAvatar, registerTeam } from './RegService.mjs';

const btnMeetCat = document.getElementById('btn-meet-cat');
// Register Button
const btnFinalRegister = document.getElementById('btn-final-register'); 

const catImage = document.getElementById('cat-avatar');
const teamInput = document.getElementById('team-name');

// Profile Data
const childInput = document.getElementById('chname');
const companionInput = document.getElementById('coname');

// Modal
const modal = document.getElementById('modal-success');
const modalMessage = document.getElementById('modal-message');
const btnGoIndex = document.getElementById('btn-go-index');

let currentAvatarUrl = ""; 

// Cat Avatar API
btnMeetCat.addEventListener('click', () => {
    const name = teamInput.value.trim() || "Adan";
    currentAvatarUrl = generateAvatar(name);
    catImage.style.backgroundImage = `url("${currentAvatarUrl}")`;
    });

// Save
btnFinalRegister.addEventListener('click', async () => {
    const teamName = teamInput.value.trim();
    const childName = childInput.value.trim();
    const companionName = companionInput.value.trim();

    if (!teamName || !childName || !companionName || !currentAvatarUrl) {
        alert("Please complete all fields and meet your cat first!");
        return;
    }

    await registerTeam(teamName, currentAvatarUrl, childName, companionName);

    modalMessage.innerText = `Team ${teamName} is ready for the adventure!`;
    modal.style.display = 'flex';
});

btnGoIndex.addEventListener('click', () => {    
    window.location.href = "index.html";
});