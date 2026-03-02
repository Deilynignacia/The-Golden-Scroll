import { generateAvatar, registerTeam } from './RegService.mjs';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// --- CONFIGURACIÓN DE FIREBASE (Añadida para que db funcione) ---
const firebaseConfig = {
    apiKey: "AIzaSyAon2En6oCIlGNhJuVDC7PYbFGzPy6bW5c",
    authDomain: "the-golden-scroll.firebaseapp.com",
    projectId: "the-golden-scroll",
    storageBucket: "the-golden-scroll.firebasestorage.app",
    messagingSenderId: "162425132870",
    appId: "1:162425132870:web:0f8e982e27cae87d1eb747",
    measurementId: "G-TMKSXWGNL9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Elementos de Control de Flujo y UI
const roleSelector = document.querySelector('.role-selector');
const registrationFlow = document.getElementById('registration-flow');
const playerUI = document.getElementById('player-ui');
const monitorUI = document.getElementById('monitor-ui');
const catImage = document.getElementById('cat-avatar');
const loader = document.getElementById('loader');

// Inputs
const teamInput = document.getElementById('team-name');
const monitorNameInput = document.getElementById('monitor-name');
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
    
    btnUnlockMonitor.style.display = "block";
    btnStartMonitoring.style.display = "none";
    monitorPassInput.readOnly = false;
    monitorNameInput.readOnly = false;
    monitorPassInput.value = "";
    monitorNameInput.value = "";
});

// --- 2. LÓGICA DE MONITOR ---
btnUnlockMonitor.addEventListener('click', () => {
    const passValue = monitorPassInput.value.trim();
    const monitorName = monitorNameInput.value.trim();

    if (!monitorName) {
        alert("Por favor, ingresa tu nombre antes de continuar.");
        return;
    }
    
    if (passValue === "EMAUS") {
        currentAvatarUrl = generateAvatar("EMAUS"); 
        loadAvatar(currentAvatarUrl);
        btnUnlockMonitor.style.display = "none";
        btnStartMonitoring.style.display = "block";
        monitorPassInput.readOnly = true;
        monitorNameInput.readOnly = true;
    } else {
        alert("Contraseña incorrecta para el perfil de Monitor.");
    }
});

btnStartMonitoring.addEventListener('click', async () => {
    const monitorName = monitorNameInput.value.trim();
    // Aseguramos que la URL del gato azul esté lista
    const finalAvatarUrl = `https://cat-avatars.vercel.app/api/cat?name=EMAUS`;

    const masterProgress = {};
    for (let i = 1; i <= 10; i++) {
        masterProgress[i] = "unlocked";
    }

    try {
        // Ahora 'db' está definido, por lo que esto funcionará
        const monitorRef = doc(db, "staff", monitorName); 
        
        await setDoc(monitorRef, {
            name: monitorName,
            avatar: finalAvatarUrl,
            role: "monitor",
            isCreator: (monitorName === "Deilyn Zamudio"),
            lastActive: Date.now(),
            progress: masterProgress 
        });
        
        localStorage.setItem('current_monitor_name', monitorName);
        localStorage.setItem('user_role', 'monitor');
        
        window.location.href = "monitor-index.html"; 
    } catch (error) {
        console.error("Error al registrar en staff:", error);
        alert("Hubo un error al guardar los datos. Revisa la consola.");
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