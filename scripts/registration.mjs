import { generateAvatar, registerTeam } from './RegService.mjs';

// Elementos de Control de Flujo y UI
const roleSelector = document.querySelector('.role-selector');
const registrationFlow = document.getElementById('registration-flow');
const playerUI = document.getElementById('player-ui');
const monitorUI = document.getElementById('monitor-ui');
const catImage = document.getElementById('cat-avatar');
const loader = document.getElementById('loader');

// Inputs
const teamInput = document.getElementById('team-name');
const monitorPassInput = document.getElementById('monitor-password');
const childInput = document.getElementById('chname');
const companionInput = document.getElementById('coname');

// Botones
const btnUnlockMonitor = document.getElementById('btn-unlock-monitor');
const btnStartMonitoring = document.getElementById('btn-start-monitoring');
const btnMeetCat = document.getElementById('btn-meet-cat');
const btnFinalRegister = document.getElementById('btn-final-register');

let currentAvatarUrl = ""; 

// --- FUNCIÓN AUXILIAR PARA CARGA VISUAL ---
function loadAvatar(url) {
    if (loader) loader.style.display = "block";
    catImage.style.opacity = "0.3";
    
    const img = new Image();
    img.src = url;
    img.onload = () => {
        catImage.style.backgroundImage = `url("${url}")`;
        catImage.style.opacity = "1";
        if (loader) loader.style.display = "none";
    };
}

// --- 1. SELECTOR DE ROLES ---
// Al elegir un rol, usamos la clase .hidden para que los botones superiores desaparezcan
document.getElementById('role-player').addEventListener('click', () => {
    roleSelector.classList.add('hidden'); 
    registrationFlow.style.display = "flex";
    playerUI.style.display = "flex";
    monitorUI.style.display = "none";
    
    catImage.style.backgroundImage = "url('images/cat.jpg')"; 
    currentAvatarUrl = ""; 
});

document.getElementById('role-monitor').addEventListener('click', () => {
    roleSelector.classList.add('hidden');
    registrationFlow.style.display = "flex";
    monitorUI.style.display = "flex";
    playerUI.style.display = "none";
    
    catImage.style.backgroundImage = "url('images/cat.jpg')";
    currentAvatarUrl = "";
    
    // Reset de interfaz de monitor
    btnUnlockMonitor.style.display = "block";
    btnStartMonitoring.style.display = "none";
    monitorPassInput.readOnly = false;
    monitorPassInput.value = "";
});

// --- 2. LÓGICA DE MONITOR ---
btnUnlockMonitor.addEventListener('click', () => {
    const passValue = monitorPassInput.value.trim();
    
    if (passValue === "EMAUS") {
        currentAvatarUrl = generateAvatar("EMAUS"); 
        loadAvatar(currentAvatarUrl);
        
        btnUnlockMonitor.style.display = "none";
        btnStartMonitoring.style.display = "block";
        monitorPassInput.readOnly = true;
    } else {
        alert("Contraseña incorrecta para el perfil de Monitor.");
    }
});

btnStartMonitoring.addEventListener('click', async () => {
    if (!currentAvatarUrl) {
        currentAvatarUrl = generateAvatar("EMAUS");
    }

    try {
        await registerTeam("MONITORES", currentAvatarUrl, "Staff", "N/A", "monitor");
        window.location.href = "index.html";
    } catch (error) {
        console.error("Error al registrar monitor:", error);
    }
});

// --- 3. LÓGICA DE PARTICIPANTES ---
btnMeetCat.addEventListener('click', () => {
    const name = teamInput.value.trim() || "Explorador";
    currentAvatarUrl = generateAvatar(name);
    loadAvatar(currentAvatarUrl);
});

btnFinalRegister.addEventListener('click', async () => {
    const teamName = teamInput.value.trim();
    const childName = childInput.value.trim();
    const companionName = companionInput.value.trim();

    if (!teamName || !childName || !currentAvatarUrl) {
        alert("¡Completa tus datos y conoce a tu gato primero!");
        return;
    }

    try {
        await registerTeam(teamName, currentAvatarUrl, childName, companionName, "player");
        window.location.href = "index.html";
    } catch (error) {
        console.error("Error saving profile:", error);
    }
});