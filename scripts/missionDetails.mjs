import { missionData } from './missionData.mjs';

// Obtener el ID de la misión desde la URL
const params = new URLSearchParams(window.location.search);
const missionId = params.get('id');

// CORRECCIÓN: Buscar dentro de missionData.missions
// Usamos == para que compare "1" con 1 sin problemas
const currentMission = missionData.missions.find(m => m.id == missionId);

// Llenar el HTML de la misión
if (currentMission) {
    // Asegúrate de que estos IDs existan en tu HTML
    const titleEl = document.getElementById('title-dtl');
    const subtitleEl = document.getElementById('subtitle-dtl');
    const iconEl = document.getElementById('icon-dtl');
    const difficultyEl = document.getElementById('difficulty-dtl');
    const descriptionEl = document.getElementById('description');

    if (titleEl) titleEl.innerText = currentMission.title;
    if (subtitleEl) subtitleEl.innerText = currentMission.subtitle;
    if (iconEl) iconEl.src = currentMission.image;
    if (difficultyEl) difficultyEl.innerText = `Dificultad: ${currentMission.difficulty}`;
    if (descriptionEl) descriptionEl.innerText = currentMission.activity;
} else {
    console.error("No se encontró la misión con ID:", missionId);
}

// Volver a la lista de misiones
const backBtn = document.getElementById('back-to-missions');
if (backBtn) {
    backBtn.onclick = () => window.location.href = 'missions.html';
}