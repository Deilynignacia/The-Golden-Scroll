import { missionData } from './monitorMissionData.mjs'; 
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
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
        const teamId = teamDoc.id; 

        // Filtro para no mostrar a los monitores en la lista de gestión de equipos
        if (team.role === "monitor" || team.name === "MONITORES") return;

        // Verificamos si esta misión específica ya fue completada por el equipo
        const isCompleted = team.completedMissions && team.completedMissions.includes(missionId);

        const card = document.createElement('div');
        card.className = `team-unlock-card ${isCompleted ? 'completed' : ''}`;
        card.innerHTML = `
            <div class="team-info">
                <img src="${team.avatar}" alt="avatar" style="width:40px; height:40px; border-radius: 50%;">
                <span>${team.name}</span>
            </div>
        `;

        const btn = document.createElement('button');
        btn.innerText = isCompleted ? 'COMPLETADO' : 'MARCAR LOGRADA';
        btn.disabled = isCompleted;
        btn.className = isCompleted ? 'btn-done' : 'btn-unlock';
        
        btn.addEventListener('click', async () => {
            btn.innerText = "Guardando...";
            btn.disabled = true;

            try {
                const teamRef = doc(db, "teams", teamId);
                let currentMissions = team.completedMissions || [];
                
                if (!currentMissions.includes(missionId)) {
                    currentMissions.push(missionId);
                    
                    const totalMissions = 10;
                    const newProgress = Math.min((currentMissions.length / totalMissions) * 100, 100);
                    const nextMissionId = parseInt(missionId) + 1;

                    // --- ACTUALIZACIÓN ATÓMICA PARA PRESERVAR ESTADOS ---
                    // Al usar el formato "objeto.campo" nos aseguramos de no borrar las misiones previas
                    const updates = {
                        completedMissions: currentMissions,
                        score: (team.score || 0) + 10, // Ejemplo: suma puntos por misión
                        lastActive: Date.now()
                    };

                    // Marca la actual como completada en el mapa de progreso
                    updates[`progress.${missionId}`] = "completed";

                    // Desbloquea la siguiente misión si no hemos llegado al límite (10)
                    if (nextMissionId <= 10) {
                        updates[`progress.${nextMissionId}`] = "unlocked";
                        updates.currentChallenge = nextMissionId; // Actualiza el reto activo del equipo
                    }

                    await updateDoc(teamRef, updates);

                    btn.innerText = "¡LISTO!";
                    card.classList.add('completed');
                }
            } catch (error) {
                console.error("Error al actualizar progreso:", error);
                btn.innerText = "Error";
                btn.disabled = false;
            }
        });

        card.appendChild(btn);
        container.appendChild(card);
    });
}