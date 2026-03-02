import { getFirestore, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

// Configuración necesaria para escuchar cambios en tiempo real
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

document.addEventListener('layoutReady', () => {
    const localData = JSON.parse(localStorage.getItem("goldenScroll_team"));
    if (!localData) return;

    // --- ESCUCHA EN TIEMPO REAL ---
    // Usamos onSnapshot para que, en cuanto el monitor presione "MARK AS DONE",
    // el mapa del niño se actualice sin tener que recargar la página.
    const teamRef = doc(db, "teams", localData.name); 

    onSnapshot(teamRef, (docSnap) => {
        if (docSnap.exists()) {
            const teamData = docSnap.data();
            // Actualizamos el localStorage para que el resto de la app esté al día
            localStorage.setItem("goldenScroll_team", JSON.stringify(teamData));
            
            renderMissions(teamData.progress);
        }
    });
});

function renderMissions(progress) {
    const missionButtons = document.querySelectorAll('.mission-btn');

    missionButtons.forEach(btn => {
        const id = btn.getAttribute('data-id');
        const status = progress[id] || "locked";

        // Gestionamos las clases para el CSS (Neo-brutalismo)
        btn.classList.remove('locked', 'unlocked', 'completed');
        btn.classList.add(status);

        // Lógica de interacción
        if (status === "locked") {
            btn.disabled = true;
            btn.onclick = null; // Quitamos cualquier evento previo
        } else {
            btn.disabled = false;
            btn.onclick = () => {
                window.location.href = `mission-details.html?id=${id}`;
            };
        }
    });
}