import { missionData } from './monitorMissionData.mjs';

function initMonitorHub() {
    // Grid ---
    const grid = document.getElementById('missions-grid');
    if (grid && missionData.missions) {
        grid.innerHTML = "";
        missionData.missions.forEach(mission => {
            const card = document.createElement('div');
            card.className = 'mission-menu-item';
            
            card.innerHTML = `
                <div class="icon-circle">
                    <img src="${mission.icon}" alt="${mission.title}" class="mission-icon">
                </div>
                <div class="mission-info">
                    <h3>${mission.title}</h3>
                    <p>${mission.subtitle}</p>
                </div>
            `;

            card.addEventListener('click', () => {
                window.location.href = `monitor-mission-details.html?id=${mission.id}`;
            });

            grid.appendChild(card);
        });
    }

    // Modal ---
    const modal = document.getElementById('welcome-modal');
    const openBtn = document.getElementById('open-message-btn');
    const closeBtn = document.getElementById('close-welcome');
    const startBtn = document.getElementById('start-monitoring-btn');

    const closeModal = () => { if (modal) modal.style.display = 'none'; };
    const openModal = () => { if (modal) modal.style.display = 'flex'; };

    // Close Modal
    if (closeBtn) closeBtn.onclick = closeModal;
    if (startBtn) startBtn.onclick = closeModal;
    if (openBtn) openBtn.onclick = openModal;

    window.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
    });
}


if (document.getElementById('header-container')?.innerHTML !== "") {
    initMonitorHub();
} else {
    document.addEventListener('layoutReady', initMonitorHub);
}