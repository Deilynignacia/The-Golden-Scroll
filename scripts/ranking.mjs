import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

// Variable para rastrear posiciones antes del cambio
let previousPositions = {};

function startRankingListener() {
    console.log("Ranking en tiempo real: Activado (Animación + Orden Justo)");
    const leaderboardContainer = document.getElementById('leaderboard-container');
    if (!leaderboardContainer) return;

    // CONSULTA JUSTA: 
    // 1. Los puntos más altos arriba (desc)
    // 2. Si empatan, el que llegó primero (el timestamp más viejo) va arriba (asc)
    const q = query(
        collection(db, "teams"), 
        orderBy("score", "desc"), 
        orderBy("lastUpdate", "asc")
    );

    onSnapshot(q, (querySnapshot) => {
        // A. FIRST: Guardar dónde están ahora los recuadros
        const currentItems = leaderboardContainer.querySelectorAll('.rank-item');
        currentItems.forEach(item => {
            previousPositions[item.dataset.id] = item.getBoundingClientRect().top;
        });

        // B. Re-dibujar el ranking
        leaderboardContainer.innerHTML = "";
        let rank = 1;

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const teamId = doc.id;
            const item = document.createElement('div');
            item.className = 'rank-item';
            item.dataset.id = teamId; 

            item.innerHTML = `
                <span class="rank-number">#${rank}</span>
                <div class="rank-avatar" style="background-image: url('${data.avatar}')"></div>
                <div class="rank-info">
                    <span class="rank-team-name">${data.name}</span>
                    <span class="rank-score">${data.score || 0} pts</span>
                </div>
            `;
            leaderboardContainer.appendChild(item);

            // C. LAST, INVERT & PLAY: Si el equipo ya existía, animamos su subida/bajada
            if (previousPositions[teamId]) {
                const newTop = item.getBoundingClientRect().top;
                const deltaY = previousPositions[teamId] - newTop;

                if (deltaY !== 0) {
                    item.style.transition = 'none';
                    item.style.transform = `translateY(${deltaY}px)`;
                    
                    item.offsetHeight; // Forzar al navegador a procesar el cambio

                    item.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    item.style.transform = 'translateY(0)';
                }
            } else {
                // Si es un equipo nuevo, aparece con zoom suave
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.transition = 'all 0.4s ease-out';
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            }
            rank++;
        });
    }, (error) => {
        // Si sale error de índice, el link aparecerá en la consola aquí:
        console.error("Error en Firebase:", error);
    });
}

function init() {
    const footerContainer = document.getElementById('footer-container');
    const isLayoutReady = footerContainer && footerContainer.children.length > 0;

    if (isLayoutReady) {
        startRankingListener();
    } else {
        document.addEventListener('layoutReady', startRankingListener, { once: true });
    }
}

init();