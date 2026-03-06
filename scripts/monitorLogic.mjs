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

        if (team.role === "monitor" || team.name === "MONITORES") return;

        // Determinamos el estado inicial
        let isCompleted = team.completedMissions && team.completedMissions.includes(missionId);

        const card = document.createElement('div');
        card.className = `team-unlock-card ${isCompleted ? 'completed' : ''}`;
        card.innerHTML = `
            <div class="team-info">
                <img src="${team.avatar}" alt="avatar" style="width:40px; height:40px; border-radius: 50%;">
                <span>${team.name}</span>
            </div>
        `;

        const btn = document.createElement('button');
        // El botón ahora nunca está disabled para poder corregir
        btn.innerText = isCompleted ? 'COMPLETADO (Deshacer)' : 'MARCAR LOGRADA';
        btn.className = isCompleted ? 'btn-done' : 'btn-unlock';
        
        btn.addEventListener('click', async () => {
            // Verificamos el estado actual antes de procesar
            const currentlyDone = btn.classList.contains('btn-done');
            
            btn.innerText = "Guardando...";
            btn.disabled = true;

            try {
                const teamRef = doc(db, "teams", teamId);
                let currentMissions = team.completedMissions || [];
                const now = Date.now();
                let updates = {};

                if (!currentlyDone) {
                    // --- LÓGICA PARA MARCAR COMO LOGRADA ---
                    if (!currentMissions.includes(missionId)) {
                        currentMissions.push(missionId);
                    }
                    
                    const nextMissionId = parseInt(missionId) + 1;

                    updates = {
                        completedMissions: currentMissions,
                        score: (team.score || 0) + 10,
                        lastActive: now,
                        lastUpdate: now
                    };

                    updates[`progress.${missionId}`] = "completed";

                    if (nextMissionId <= 10) {
                        updates[`progress.${nextMissionId}`] = "unlocked";
                        updates.currentChallenge = nextMissionId;
                    }
                    } else {
                        // --- LÓGICA PARA CORREGIR (DESMARCAR Y VOLVER A ESTADO PENDIENTE) ---
                        currentMissions = currentMissions.filter(id => id !== missionId);
                        
                        updates = {
                            completedMissions: currentMissions,
                            score: Math.max(0, (team.score || 0) - 10), 
                            lastUpdate: now,
                            // ESTA ES LA CLAVE: 
                            // La misión actual vuelve a estar "desbloqueada" (el niño puede entrar)
                            // pero ya no está "completada".
                            [`progress.${missionId}`]: "unlocked", 
                            currentChallenge: parseInt(missionId)
                        };

                        // Bloqueamos la siguiente misión para que no se adelanten
                        const nextMissionId = parseInt(missionId) + 1;
                        if (nextMissionId <= 10) {
                            updates[`progress.${nextMissionId}`] = null; // O "locked"
                        }
                    }

                await updateDoc(teamRef, updates);

                // Actualizar interfaz visual
                const isNowDone = currentMissions.includes(missionId);
                btn.innerText = isNowDone ? 'COMPLETADO (Deshacer)' : 'MARCAR LOGRADA';
                btn.className = isNowDone ? 'btn-done' : 'btn-unlock';
                btn.disabled = false;
                
                if (isNowDone) {
                    card.classList.add('completed');
                } else {
                    card.classList.remove('completed');
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