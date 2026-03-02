import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, query, orderBy, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

async function loadRanking() {
    console.log("Iniciando carga de ranking...");
    const leaderboardContainer = document.getElementById('leaderboard-container');
    if (!leaderboardContainer) return;

    try {
        const q = query(collection(db, "teams"), orderBy("score", "desc"));
        const querySnapshot = await getDocs(q);

        leaderboardContainer.innerHTML = "";

        let rank = 1;
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const item = document.createElement('div');
            item.className = 'rank-item';
            
            item.innerHTML = `
                <span class="rank-number">#${rank}</span>
                <div class="rank-avatar" style="background-image: url('${data.avatar}')"></div>
                <div class="rank-info">
                    <span class="rank-team-name">${data.name}</span>
                    <span class="rank-score">${data.score || 0} pts</span>
                </div>
            `;
            leaderboardContainer.appendChild(item);
            rank++;
        });
    } catch (error) {
        console.error("Error cargando ranking:", error);
        leaderboardContainer.innerHTML = "<p>Sorry, the leaderboard is sleeping! Try later.</p>";
    }
}

// --- CAMBIO CLAVE AQUÍ ---
// En lugar de solo escuchar, verificamos si el contenedor del footer ya existe
// Si el contenedor tiene contenido, significa que el layout ya cargó.
function init() {
    const footerLoaded = document.getElementById('footer-container').innerHTML.trim() !== "";
    
    if (footerLoaded) {
        // Si el layout ya está listo, cargamos el ranking de una vez
        loadRanking();
    } else {
        // Si no está listo, esperamos al evento
        document.addEventListener('layoutReady', loadRanking);
    }
}

init();