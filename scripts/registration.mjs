import { generateAvatar, registerTeam } from './RegService.mjs';

const btnMeetCat = document.getElementById('btn-meet-cat');
const btnFinalRegister = document.getElementById('btn-final-register'); 
const catImage = document.getElementById('cat-avatar');
const teamInput = document.getElementById('team-name');

// Profile Data
const childInput = document.getElementById('chname');
const companionInput = document.getElementById('coname');

let currentAvatarUrl = ""; 

// GenerateCat Avatar
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

    try {
        await registerTeam(teamName, currentAvatarUrl, childName, companionName);
        
        // Go to Home
        window.location.href = "index.html";
    } catch (error) {
        console.error("Error saving profile:", error);
        alert("Something went wrong. Please try again.");
    }
});