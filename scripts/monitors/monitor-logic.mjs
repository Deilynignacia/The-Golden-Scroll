import { missionData } from './missionData.mjs'; 
// GSTATIC for Firebase files
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 
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
    // Mission ID
    const urlParams = new URLSearchParams(window.location.search);
    const missionId = urlParams.get('id') || "1";
    const mission = missionData.missions.find(m => m.id === missionId);

    if (mission) {
        renderMissionDetail(mission);
        loadTeamsForMission(missionId);
    }
});


function renderMissionDetail(mission) {
    // Main Data
    document.getElementById('mission-title').innerText = mission.title;
    document.getElementById('mission-subtitle').innerText = mission.subtitle;
    document.getElementById('mission-icon').src = `../${mission.icon}`;
    document.getElementById('childrenPlatform').innerText = mission.childrenPlatform; // Participant platform information

    // Preparation Guide    
    const matList = mission.prepGuide.materials.map(m => `<li>${m}</li>`).join('');
    document.getElementById('prep-materials').innerHTML = `<ul>${matList}</ul>`;
    document.getElementById('prep-setup').innerText = mission.prepGuide.setup;

    // Monitor Script
    document.getElementById('script-intro').innerText = mission.monitorScript.intro;
    document.getElementById('script-reference').innerText = mission.monitorScript.scripture;
    document.getElementById('secret-letter').innerText = mission.secretLetter;
}


// All teams by ID and Unlock Mission logic
async function loadTeamsForMission(missionId) {
    const container = document.getElementById('teams-list-container');
    const querySnapshot = await getDocs(collection(db, "teams"));
    
    container.innerHTML = "";

    querySnapshot.forEach((teamDoc) => {
        const team = teamDoc.data();
        const isUnlocked = team.progress && team.progress[missionId] !== "locked";

        const card = document.createElement('div');
        card.className = `team-unlock-card ${isUnlocked ? 'completed' : ''}`;
        card.innerHTML = `
            <span>${team.name}</span>
            <button onclick="unlockMission('${teamDoc.id}', '${missionId}')" ${isUnlocked ? 'disabled' : ''}>
                ${isUnlocked ? '✅ DONE' : 'MARK AS DONE'}
            </button>
        `;
        container.appendChild(card);
    });
}

// Button logic (window for change the function to public)
window.unlockMission = async (teamUid, missionId) => {
    try {
        const teamRef = doc(db, "teams", teamUid);

        // Unlocked
        await updateDoc(teamRef, {
            [`progress.${missionId}`]: "unlocked"
        });
        alert("Mission unlocked for the team!");
        location.reload(); // Reload
} catch (e) {
    console.error("Error unlocking:", e); // Error message
    alert("Oops! Something went wrong. Check your internet connection.");
}
};