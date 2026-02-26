import { missionData } from './monitorMissionData.mjs'; 
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// Añadimos doc y updateDoc aquí abajo
import { getFirestore, collection, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

document.addEventListener('layoutReady', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const missionId = urlParams.get('id') || "1";
    const mission = missionData.missions.find(m => m.id === missionId);

    if (mission) {
        renderMissionDetail(mission);
        loadTeamsForMission(missionId);
    }
});

function renderMissionDetail(mission) {
    document.getElementById('mission-title').innerText = mission.title;
    document.getElementById('mission-subtitle').innerText = mission.subtitle;
    document.getElementById('mission-icon').src = mission.icon;
    
    const platformEl = document.getElementById('childrenPlatform');
    if (platformEl) platformEl.innerText = mission.childrenPlatform;

    const matList = mission.prepGuide.materials.map(m => `<li>${m}</li>`).join('');
    document.getElementById('prep-materials').innerHTML = `<ul>${matList}</ul>`;
    document.getElementById('prep-setup').innerText = mission.prepGuide.setup;

    document.getElementById('script-intro').innerText = mission.monitorScript.intro;
    document.getElementById('script-reference').innerText = mission.monitorScript.scripture;
    document.getElementById('secret-letter').innerText = mission.secretLetter || "?";
}

async function loadTeamsForMission(missionId) {
    const container = document.getElementById('teams-list-container');
    const querySnapshot = await getDocs(collection(db, "teams"));
    container.innerHTML = "";

    querySnapshot.forEach((teamDoc) => {
        const team = teamDoc.data();
        const teamId = teamDoc.id; // Necesitamos el ID del documento para actualizarlo
        
        // Verificamos si esta misión ya está completada por el equipo
        // Asumiremos que en Firebase los equipos tienen un array llamado 'completedMissions'
        const isCompleted = team.completedMissions && team.completedMissions.includes(missionId);

        const card = document.createElement('div');
        card.className = `team-unlock-card ${isCompleted ? 'completed' : ''}`;
        card.innerHTML = `
            <div class="team-info">
                <img src="${team.avatar}" alt="avatar" style="width:40px; height:40px;">
                <span>${team.name}</span>
            </div>
        `;

        const btn = document.createElement('button');
        btn.innerText = isCompleted ? 'COMPLETED' : 'MARK AS DONE';
        btn.disabled = isCompleted;
        btn.className = isCompleted ? 'btn-done' : 'btn-unlock';
        
        btn.addEventListener('click', async () => {
            btn.innerText = "Saving...";
            btn.disabled = true;

            try {
                const teamRef = doc(db, "teams", teamId);
                
                // Obtenemos la lista actual o creamos una vacía
                let currentMissions = team.completedMissions || [];
                
                if (!currentMissions.includes(missionId)) {
                    currentMissions.push(missionId);
                    
                    await updateDoc(teamRef, {
                        completedMissions: currentMissions,
                        progress: currentMissions.length * 10 // Ejemplo: 10% por misión
                    });

                    btn.innerText = "DONE!";
                    card.classList.add('completed');
                }
            } catch (error) {
                console.error("Error updating progress:", error);
                btn.innerText = "Error";
                btn.disabled = false;
            }
        });

        card.appendChild(btn);
        container.appendChild(card);
    });
}