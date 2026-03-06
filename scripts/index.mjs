import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Tu config de Firebase
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
    let teamData = JSON.parse(localStorage.getItem("goldenScroll_team"));

    // --- 1. Sincronización PRIORITARIA con Firebase ---
    // Esperamos a que Firebase responda para tener la "verdad" antes de dibujar nada
    if (teamData && teamData.name) {
        try {
            const docRef = doc(db, "teams", teamData.name);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                // Actualizamos la variable local con los datos frescos de la nube
                teamData = docSnap.data();
                localStorage.setItem("goldenScroll_team", JSON.stringify(teamData));
            }
        } catch (e) {
            console.log("Offline mode: using local data");
        }
    }

    // --- 2. Progress Tracker (Ahora usa los datos ya sincronizados) ---
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        let percentage = 0; 
        if (teamData && teamData.progress) {
            const totalMissions = 10; 
            const completedCount = Object.values(teamData.progress).filter(s => s === "completed").length;
            percentage = (completedCount / totalMissions) * 100;
        }
        progressFill.style.width = `${percentage}%`;
    }

    // Header
    const headerProfile = document.getElementById('team-profile');
    if (teamData && headerProfile) {
        headerProfile.style.backgroundImage = `url(${teamData.avatar})`;
    }

    // Menu
    const buttons = { 'map': 'map.html', 'ranking': 'ranking.html', 'normas': 'normas.html', 'bible': 'bible.html' };
    Object.entries(buttons).forEach(([id, url]) => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', () => { window.location.href = url; });
    });

    // Profile
    const profileBtn = document.getElementById('team-profile');
    const modalProfile = document.getElementById('modal-profile');
    const closeProfile = document.getElementById('close-profile');

    if (profileBtn && modalProfile && teamData) {
        profileBtn.addEventListener('click', () => {
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

    if (closeProfile) {
        closeProfile.onclick = () => modalProfile.style.display = 'none';
    }
});