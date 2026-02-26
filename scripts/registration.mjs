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
const monitorNameInput = document.getElementById('monitor-name'); // NUEVO
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
    monitorNameInput.readOnly = false; // NUEVO
    monitorPassInput.value = "";
    monitorNameInput.value = ""; // NUEVO
});

// --- 2. LÓGICA DE MONITOR ---
btnUnlockMonitor.addEventListener('click', () => {
    const passValue = monitorPassInput.value.trim();
    const monitorName = monitorNameInput.value.trim(); // NUEVO

    // Validamos que haya puesto su nombre antes de la clave
    if (!monitorName) {
        alert("Por favor, ingresa tu nombre antes de continuar.");
        return;
    }
    
    if (passValue === "EMAUS") {
        // Generamos un avatar basado en su nombre personal para que sea único
        currentAvatarUrl = generateAvatar(monitorName); 
        loadAvatar(currentAvatarUrl);
        
        btnUnlockMonitor.style.display = "none";
        btnStartMonitoring.style.display = "block";
        monitorPassInput.readOnly = true;
        monitorNameInput.readOnly = true; // Bloqueamos el nombre tras validar
    } else {
        alert("Contraseña incorrecta para el perfil de Monitor.");
    }
});

btnStartMonitoring.addEventListener('click', async () => {
    const monitorName = monitorNameInput.value.trim();

    if (!currentAvatarUrl) {
        currentAvatarUrl = generateAvatar(monitorName || "Staff");
    }

    try {
        // Registramos al monitor. 
        // Pasamos monitorName como el "childName" para que se guarde su identidad.
        // El teamName sigue siendo "MONITORES" para agruparlos a todos.
        await registerTeam("MONITORES", currentAvatarUrl, monitorName, "N/A", "monitor");
        
        // Guardamos su nombre en localStorage para usarlo en el Hub y en el filtro de mensajes
        localStorage.setItem('current_monitor_name', monitorName);
        
        // Redirección al Hub de Monitores directamente como planeamos
        window.location.href = "monitor-index.html"; 
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