/**
 * Layout principal para El Pergamino Dorado
 * Maneja la carga dinámica de Header/Footer, Notificaciones y el Desafío Final.
 */

import { 
    getFirestore, collection, query, orderBy, limit, onSnapshot, getDocs} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function loadLayout() {
    try {
        const [headerRes, footerRes] = await Promise.all([
            fetch('header.html'),
            fetch('footer.html')
        ]);

        document.getElementById('header-container').innerHTML = await headerRes.text();
        document.getElementById('footer-container').innerHTML = await footerRes.text();

        // Inicialización
        setupGlobalProfile();
        setupDynamicFooter();
        setupEmaus();
        setupLogoInfo(); // <-- Nueva función para el Logo

        console.log("Layout Ready");
        document.dispatchEvent(new Event('layoutReady'));
    } catch (error) {
        console.error("Error cargando el layout:", error);
    }
    window.layoutLoaded = true;
}

function setupLogoInfo() {
    const logo = document.querySelector('.logo-app'); // Asegúrate que tu logo tenga esta clase o usa el ID
    if (!logo) return;

    logo.style.cursor = 'help'; // Indica que hay información disponible
    logo.onclick = () => {
        openDescriptionModal();
    };
}

function openDescriptionModal() {
    if (!document.getElementById('info-modal-overlay')) {
        const infoHtml = `
            <div id="info-modal-overlay" class="modal-overlay info-blue">
                <div class="info-modal-content">
                    <button onclick="document.getElementById('info-modal-overlay').style.display='none'" class="close-modal">×</button>
                    <h2>EL PERGAMINO DORADO</h2>
                    <p><strong>El Pergamino Dorado</strong> no es solo un juego, es una aventura épica de descubrimiento espiritual.</p>
                    <p>Es una plataforma interactiva diseñada para que los niños se convierten en <strong>"buscadores de tesoros"</strong> mientras recorren las historias más asombrosas del Pentateuco.</p>
                    <p>A través de misiones que mezclan el mundo real con el digital, los participantes junto a sus acompañantes deben descifrar acertijos, superar desafíos de ingenio y aprender principios eternos sobre su origen y su propósito en la tierra.</p>
                    <p>¡BUENA SUERTE EXPLORADORES!</p>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', infoHtml);
    }
    document.getElementById('info-modal-overlay').style.display = 'flex';
}

function setupGlobalProfile() {
    const userRole = localStorage.getItem('user_role');
    const profileBtn = document.getElementById('team-profile');
    const modal = document.getElementById('modal-profile');
    const closeBtn = document.getElementById('close-profile');
    
    if (!profileBtn || !modal) return;

    let avatarUrl = "";
    let teamDisplayName = ""; 
    let participantName = ""; 
    let companionName = "";   

    if (userRole === 'monitor') {
        const monitorData = JSON.parse(localStorage.getItem("goldenScroll_team"));
        avatarUrl = "https://cat-avatars.vercel.app/api/cat?name=EMAUS";
        teamDisplayName = "STAFF / MONITOR";
        participantName = monitorData?.name || "Monitor"; 
        companionName = "N/A"; 
    } else {
        const teamData = JSON.parse(localStorage.getItem("goldenScroll_team"));
        if (!teamData) return;
        
        avatarUrl = teamData.avatar ? teamData.avatar.replace('../', '').replace('./', '') : "images/default-avatar.png";
        teamDisplayName = teamData.name || "Equipo";       
        participantName = teamData.childName || "Explorador"; 
        companionName = teamData.companionName || "No registrado"; 
    }

    profileBtn.style.backgroundImage = `url('${avatarUrl}')`;
    profileBtn.style.backgroundSize = 'cover';

    profileBtn.onclick = () => {
        const avatarContainer = document.getElementById('modal-cat-avatar');
        if (avatarContainer) {
            avatarContainer.style.backgroundImage = `url('${avatarUrl}')`;
            avatarContainer.style.backgroundSize = 'cover';
        }

        const profileCard = modal.querySelector('.profile-card');
        
        // Limpiamos solo lo necesario para refrescar la info
        profileCard.querySelectorAll('.info-box, h2').forEach(el => el.remove());

        const infoHtml = `
            <h2 style="margin-top:10px; color:black; font-family: 'Arial Black', sans-serif;">${teamDisplayName}</h2>
            <div class="info-box">
                <p class="label">PARTICIPANTE</p>
                <p class="value">${participantName}</p>
            </div>
            <div class="info-box">
                <p class="label">ACOMPAÑANTE</p>
                <p class="value">${companionName}</p>
            </div>
        `;
        
        profileCard.insertAdjacentHTML('beforeend', infoHtml);
        modal.style.display = 'flex';
    };

    // La X para cerrar que ya tienes en tu HTML
    if (closeBtn) {
        closeBtn.onclick = (e) => {
            e.stopPropagation(); // Evita conflictos de clicks
            modal.style.display = 'none';
        };
    }

    // Cerrar al tocar el fondo oscuro
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
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
                    "Para hallar el tesoro final debes volver a tu origen, al lugar donde los ancestros aguardan y cada nombre cuenta una historia que el tiempo no pudo borrar."
                </p>
            </div>
        `;
        responseDiv.style.display = "block";
        window.lanzarConfeti(); 

        // --- NUEVA LÓGICA: ACTIVAR PISTA EXTRA DE EMAÚS ---
        const catBtn = document.getElementById("notifications");
        if (catBtn) {
            catBtn.classList.add("emaus-alert"); // Lo ponemos a brillar y saltar
            catBtn.onclick = () => {
                showEmausModal("¿Sientes eso? ¡Es la victoria respirándote en la nuca! Esta es mi última pista para ti: Este éxito no es solo tuyo, compartelo con tu familia. ¡CON TODA TU FAMILIA!");
                catBtn.classList.remove("emaus-alert");
            };
        }
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

function setupEmaus() {
    const userRole = localStorage.getItem('user_role');
    if (userRole === 'monitor') return; 

    const teamData = JSON.parse(localStorage.getItem("goldenScroll_team"));
    if (!teamData || !teamData.name) return;

    const db = getFirestore();
    const teamRef = doc(db, "teams", teamData.name);
    const catBtn = document.getElementById("notifications");
    if (!catBtn) return;

    const messages = {
        0: "¡Hola! Soy Emaús, tu monitor digital. Cuando me veas brillar es porque tengo un mensaje para ti. Para tu primera misión, no olvides que las respuestas pueden venir cuando menos lo esperes.",
        1: "¡Gracias por ayudar a mis amigos del bosque! Para agradecerte, aquí tienes una pista: Recuerda que a veces, la persistencia es la clave.",
        2: "Algo que me encanta de los animales, es que todos se comunican con diferentes sonidos. Mi amigo el león, ruge muuuy fuerte, el perro ladra cuando quiere jugar con la pelota, y la jirafa es muuuy calladita. Ustedes, los humanos, también se comunican de distintas maneras. ¿Recuerdas esa cosa en tu teléfono para traducir tomando fotos? Quizá sea momento de usarlo... ",
        3: "A los gatos NOS ENCANTA perseguir las luces. ¿Tienes alguna por ahí?",
        4: "Todos necesitamos relajarnos de vez en cuando. A mi me gusta pintar ¿y a ti?",
        5: "El arte es mucho más que lindos dibujos, cuentan historias, secretos, y algunas veces, pistas. ¿Ves algún dibujo a tu alrededor ahora? ",
        6: "Hay una gran diferencia entre desobedecer las reglas, y buscar soluciones creativas. ¿Haz intentado mirar las cosas desde otro ángulo?",
        7: "A veces hay que mirar desde otro ángulo, y otras, hay que mirar dos veces. ¿Ya buscaste bien?",
        8: "¡Uuuf! Matemáticas. Lo importante aquí es la precisión. Respira hondo, y... ¡Usa esos dedos para contar!",
        9: "¿Sabías que para muchas personas, los números pueden ser un dolor de cabeza? Como si fuera una contraseña imposible de descifrar..."
    };

// 1. Recuperamos el último que el usuario REALMENTE leyó al hacer click
    let lastReadProgress = parseInt(localStorage.getItem("emaus_last_read"));
    
    // Si es la primerísima vez (null), ponemos -1 para que brille el mensaje 0
    if (isNaN(lastReadProgress)) lastReadProgress = -1;

    onSnapshot(teamRef, (docSnap) => {
        if (!docSnap.exists()) return;

        const data = docSnap.data();
        const progress = data.progress || {};
        const completedCount = Object.values(progress).filter(s => s === "completed").length;

        // 2. LÓGICA DE ALERTA: 
        // Solo brilla si el progreso de la base de datos es SUPERIOR a lo que guardamos como "leído"
        if (completedCount > lastReadProgress) {
            catBtn.classList.add("emaus-alert"); 
        } else {
            catBtn.classList.remove("emaus-alert");
        }

        // 3. ACTUALIZACIÓN DEL CLICK
        catBtn.onclick = () => {
            showEmausModal(messages[completedCount] || "¡Sigan adelante, equipo!");
            
            // Al abrir el modal, quitamos el brillo inmediatamente
            catBtn.classList.remove("emaus-alert");
            
            // Y grabamos en el "disco duro" del navegador que este nivel ya se vio
            localStorage.setItem("emaus_last_read", completedCount);
            lastReadProgress = completedCount; // Actualizamos la variable local para esta sesión
        };
    });
}

function showEmausModal(message) {
    if (!document.getElementById("emaus-modal")) {
        const modalHTML = `
            <div id="emaus-modal" class="modal-overlay">
                <div class="emaus-modal-content">
                    <button onclick="document.getElementById('emaus-modal').style.display='none'" class="close-modal">×</button>
                    
                    <div class="emaus-character">
                        <img src="/images/modal.png" alt="Emaús">
                    </div>

                    <div class="emaus-bubble">
                        <h2>EMAÚS DICE:</h2>
                        <p id="emaus-text"></p>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML("beforeend", modalHTML);
    }

    document.getElementById("emaus-text").innerText = message;
    document.getElementById("emaus-modal").style.display = "flex";
}

loadLayout();