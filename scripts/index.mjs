// 1. Datos del equipo
const teamData = JSON.parse(localStorage.getItem("goldenScroll_team"));

// 2. Lógica del Progress Tracker
const progressFill = document.querySelector('.progress-fill');
if (progressFill) {
    let percentage = 10;
    if (teamData && teamData.progress) {
        const total = 10; 
        const unlocked = Object.values(teamData.progress).filter(s => s !== "locked").length;
        percentage = (unlocked / total) * 100;
    }
    progressFill.style.width = `${percentage}%`;
}

// 3. Foto del Header (Miniatura)
const headerProfile = document.getElementById('team-profile');
if (teamData && headerProfile) {
    headerProfile.style.backgroundImage = `url(${teamData.avatar})`;
}

// 4. Menú de Navegación
const buttons = { 'map': 'map.html', 'ranking': 'ranking.html', 'notes': 'notes.html', 'bible': 'bible.html' };
Object.entries(buttons).forEach(([id, url]) => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', () => { window.location.href = url; });
});

// 5. Lógica del Modal de Perfil
const profileBtn = document.getElementById('team-profile');
const modalProfile = document.getElementById('modal-profile');
const closeProfile = document.getElementById('close-profile');

if (profileBtn && modalProfile && teamData) {
    profileBtn.addEventListener('click', () => {
        // Llenamos los datos del modal usando los IDs correctos del HTML
        const modalAvatar = document.getElementById('modal-cat-avatar');
        const modalTeam = document.getElementById('modal-team-name');
        const modalChild = document.getElementById('modal-ch-name');
        const modalCompanion = document.getElementById('modal-co-name');

        if (modalAvatar) modalAvatar.style.backgroundImage = `url("${teamData.avatar}")`;
        if (modalTeam) modalTeam.innerText = teamData.name;
        if (modalChild) modalChild.innerText = teamData.childName;
        if (modalCompanion) modalCompanion.innerText = teamData.companionName;
        
        modalProfile.style.display = 'flex';
    });
}

// Cerrar Modal (con seguridad por si no existe el botón)
if (closeProfile) {
    closeProfile.onclick = () => modalProfile.style.display = 'none';
}

window.onclick = (event) => {
    if (event.target == modalProfile) modalProfile.style.display = 'none';
};