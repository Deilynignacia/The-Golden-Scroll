/**
 * Layout principal para El Pergamino Dorado
 * Maneja la carga dinámica de Header/Footer, Notificaciones y el Desafío Final.
 */

import { 
    getFirestore, collection, query, orderBy, limit, onSnapshot, getDocs 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function loadLayout() {
    try {
        // 1. Carga de componentes
        const [headerRes, footerRes] = await Promise.all([
            fetch('header.html'),
            fetch('footer.html')
        ]);

        document.getElementById('header-container').innerHTML = await headerRes.text();
        document.getElementById('footer-container').innerHTML = await footerRes.text();

        // 2. Inicialización
        setupGlobalProfile();
        setupDynamicFooter();

        console.log("Layout Ready");
        document.dispatchEvent(new Event('layoutReady'));
    } catch (error) {
        console.error("Error cargando el layout:", error);
    }

    window.layoutLoaded = true;
}

function setupGlobalProfile() {
    const userRole = localStorage.getItem('user_role');
    const profileBtn = document.getElementById('team-profile');
    if (!profileBtn) return;

    let avatarUrl = "";
    if (userRole === 'monitor') {
        avatarUrl = "https://cat-avatars.vercel.app/api/cat?name=EMAUS";
    } else {
        const teamData = JSON.parse(localStorage.getItem("goldenScroll_team"));
        if (!teamData) return;
        avatarUrl = teamData.avatar.replace('../', '').replace('./', '');
    }

    profileBtn.style.backgroundImage = `url('${avatarUrl}')`;
    profileBtn.style.backgroundSize = 'cover';
}

function setupDynamicFooter() {
    const userRole = localStorage.getItem('user_role');
    const navHome = document.getElementById('nav-home');
    const navCenter = document.getElementById('nav-center');
    const navComm = document.getElementById('nav-communication');

    if (!navHome || !navCenter || !navComm) return;

    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const homeImg = navHome.querySelector('img');

    // Limpiar clases activas
    [navHome, navCenter, navComm].forEach(el => el.classList.remove('active'));

    // 1. LÓGICA DEL BOTÓN HOME (PORTAL DINÁMICO PARA MONITORES)
    if (userRole === 'monitor') {
        if (currentPage === "index.html") {
            // El monitor está en la vista de niños, el botón lo lleva de vuelta a su Hub
            navHome.href = "monitor-index.html";
            if (homeImg) homeImg.src = "images/monitor-hub.png"; // Cambiamos el icono
        } else {
            // El monitor está en su panel o en otra página, el botón lo lleva a la vista de niños
            navHome.href = "index.html";
            if (homeImg) homeImg.src = "images/home.png"; // Icono de casita normal
            
            // Si está en su Hub principal, lo marcamos como activo
            if (currentPage === "monitor-index.html") navHome.classList.add('active');
        }
    } else {
        // Lógica normal para participantes
        navHome.href = "index.html";
        if (homeImg) homeImg.src = "images/home.png";
        if (currentPage === "index.html") navHome.classList.add('active');
    }

    // 2. LÓGICA DEL BOTÓN CENTRAL (MODAL PARA TODOS)
    navCenter.href = "#";
    navCenter.onclick = (e) => {
        e.preventDefault();
        window.openFinalChallengeModal();
    };

    // 3. LÓGICA DEL BOTÓN DERECHA (NOTAS PARA TODOS)
    navComm.href = "notes.html"; 
    if (currentPage === "notes.html") navComm.classList.add('active');
}

// --- SECCIÓN: DESAFÍO FINAL (MODAL) ---
window.openFinalChallengeModal = () => {
    if (!document.getElementById('challenge-modal-overlay')) {
        const modalHtml = `
            <div id="challenge-modal-overlay" class="modal-overlay">
                <div class="challenge-modal">
                    <button onclick="window.closeChallengeModal()" class="close-modal">×</button>
                    <h2>EL PERGAMINO DORADO</h2>
                    <div id="input-area">
                        <p>Para descubrir la ubicación del PERGAMINO DORADO ingresa la contraseña:</p>
                        <input type="text" id="challenge-password" placeholder="Escribe aquí..." autocomplete="off">
                        <button class="feedback-btn" onclick="window.checkFinalPassword()">REVELAR</button>
                    </div>
                    <div id="challenge-response" style="display:none;"></div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }
    document.getElementById('challenge-modal-overlay').style.display = 'flex';
    document.getElementById('challenge-password').value = ""; 
    document.getElementById('challenge-response').style.display = "none";
    document.getElementById('input-area').style.display = "block";
};

window.closeChallengeModal = () => {
    const overlay = document.getElementById('challenge-modal-overlay');
    if (overlay) overlay.style.display = 'none';
};

window.checkFinalPassword = () => {
    const input = document.getElementById('challenge-password').value.trim().toUpperCase();
    const responseDiv = document.getElementById('challenge-response');
    const inputArea = document.getElementById('input-area');
    
    if (input === "JESUCRISTO") {
        inputArea.style.display = "none";
        responseDiv.innerHTML = `
            <div class="correct-glow">
                <strong style="font-size: 1.5rem; display: block; margin-bottom: 10px;">¡FELICIDADES!</strong>
                <p>Estás a un paso de terminar. Encontrarás el pergamino dorado al resolver este último acertijo:</p>
                <p style="font-style: italic; line-height: 1.6;">
                    "Para hallar el tesoro final debes volver a tu origen, ve al lugar donde los ancestros aguardan y cada nombre cuenta una historia que el tiempo no pudo borrar."
                </p>
            </div>
        `;
        responseDiv.style.display = "block";
        window.lanzarConfeti(); 
    } else {
        alert("Esa no es la palabra... sigue buscando en las misiones.");
    }
};

window.lanzarConfeti = () => {
    for (let i = 0; i < 50; i++) {
        const confeti = document.createElement('div');
        confeti.innerText = ['✨', '🌟', '📜', '😺', '🎉'][Math.floor(Math.random() * 5)];
        confeti.style.position = 'fixed';
        confeti.style.left = Math.random() * 100 + 'vw';
        confeti.style.top = '-10px';
        confeti.style.zIndex = '3000';
        confeti.style.fontSize = Math.random() * 20 + 10 + 'px';
        confeti.style.pointerEvents = 'none';
        confeti.style.transition = `transform ${Math.random() * 3 + 2}s linear, opacity 5s`;
        document.body.appendChild(confeti);
        setTimeout(() => {
            confeti.style.transform = `translateY(100vh) rotate(${Math.random() * 360}deg)`;
            confeti.style.opacity = '0';
        }, 100);
        setTimeout(() => confeti.remove(), 5000);
    }
};

loadLayout();