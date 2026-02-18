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
    const leaderboardContainer = document.getElementById('leaderboard-container');
    if (!leaderboardContainer) return;

    try {
        // Hacemos la consulta a la colección "teams" ordenada por puntaje
        const q = query(collection(db, "teams"), orderBy("score", "desc"));
        const querySnapshot = await getDocs(q);

        leaderboardContainer.innerHTML = ""; // Quitamos el "Loading..."

        let rank = 1;
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            
            const item = document.createElement('div');
            item.className = 'rank-item';
            
            // Usamos template strings para inyectar los datos del equipo
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

// Escuchamos el evento de tu layout.js
document.addEventListener('layoutReady', loadRanking);