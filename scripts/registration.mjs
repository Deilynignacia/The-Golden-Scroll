import { generateAvatar, registerTeam } from './RegService.mjs';

const btnMeetCat = document.getElementById('btn-meet-cat');
const catImage = document.getElementById('cat-avatar');
const teamInput = document.getElementById('team-name');

// Modal
const modal = document.getElementById('modal-success');
const modalMessage = document.getElementById('modal-message');
const btnGoIndex = document.getElementById('btn-go-index');

btnMeetCat.addEventListener('click', async () => {
    const name = teamInput.value.trim() || "Adan";

    // Cat URL
    const avatarUrl = generateAvatar(name);
    catImage.style.backgroundImage = `url("${avatarUrl}")`;

    // Firebase y LocalStorage
    await registerTeam(name, avatarUrl);
    modalMessage.innerText = `${name} team has been successfully registered!`;
    modal.style.display = 'flex';
});

// Go to
btnGoIndex.addEventListener('click', () => {    
    window.location.href = "index.html";
});