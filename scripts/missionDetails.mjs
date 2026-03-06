import { missionData } from './missionData.mjs';

const params = new URLSearchParams(window.location.search);
const missionId = params.get('id');
const currentMission = missionData.missions.find(m => m.id == missionId);

if (currentMission) {
    document.getElementById('title-dtl').innerText = currentMission.title;
    document.getElementById('subtitle-dtl').innerText = currentMission.subtitle;
    document.getElementById('icon-dtl').src = currentMission.image;
    document.getElementById('difficulty-dtl').innerText = `Dificultad: ${currentMission.difficulty}`;
    
    const descriptionEl = document.getElementById('description');
    if (descriptionEl && currentMission.id != "6") {
        descriptionEl.innerText = currentMission.activity;
    }

    if (currentMission.id == "6") {
        setupPlagasGame();
    }

    if (currentMission.id == "9") {
    setupCensoGame();
    }
}

function setupPlagasGame() {
    // 1. Buscamos el contenedor donde va todo
    const container = document.getElementById('description');
    if (!container) return;

    // 2. Guardamos la descripción inicial (la historia) 
    // para que no se borre al empezar las adivinanzas
    const originalActivity = container.innerText;

    const plagas = [
        { r: "Sangre", q: "De los pozos al gran río, todo perdió su brillo frío. Nadie podía beber una gota, pues roja y espesa se nota." },
        { r: "Ranas", q: "En las camas y en la cena, de saltos la casa está llena. Un coro verde que no descansa, inundando toda la estancia." },
        { r: "Piojos", q: "Del polvo de la tierra nacieron y a todos los hombres mordieron. Tan pequeños que no los ves, pero te pican de la cabeza a los pies." },
        { r: "Moscas", q: "Zumban y vuelan sin parar, en ningún lugar te dejan estar. Nubes negras que traen molestia, atacando a toda la bestia." },
        { r: "Muerte del Ganado", q: "En los campos todo cayó, el animal del egipcio murió. Caballos y ovejas por igual, sucumbieron ante este mal." },
        { r: "Ulceras", q: "Ni el mago ni el señor se libraron, cuando en su piel llagas brotaron. Un dolor que no se puede aguantar, y nadie lo podía curar." },
        { r: "Granizo y Fuego", q: "Cayó del cielo una extraña mezcla, que a todo el campo lo desmantela. Hielo que golpea y fuego que arde, ¡corre a esconderte antes que sea tarde!" },
        { r: "Langostas", q: "Un ejército con hambre de oriente, que no deja nada para la gente. Lo que el granizo no destruyó, este insecto se lo comió." },
        { r: "Oscuridad", q: "Tres días sin ver la luz del sol, no sirve el fuego ni el farol. Una sombra que se puede sentir, y a nadie deja de casa salir." },
        { r: "Muerte de los Primogenitos", q: "La última sombra en la noche entró, y al hijo mayor se lo llevó. De hombres y bestias por igual, fue el más triste y final mal." }
    ];

    let currentStep = 0;

    const normalize = (text) => {
        return text.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    };

    const renderStep = () => {
        // Generamos el HTML del juego según el paso actual
        let gameHtml = "";

        if (currentStep < plagas.length) {
            gameHtml = `
                <div class="plaga-box" style="margin-top: 20px;">
                    <span class="plaga-counter">Plaga ${currentStep + 1} de 10</span>
                    <p class="plaga-riddle">"${plagas[currentStep].q}"</p>
                    <input type="text" id="plaga-answer" placeholder="Escribe la respuesta..." autocomplete="off">
                    <button id="check-plaga" class="feedback-btn">ADIVINAR</button>
                    <p id="plaga-error" style="color: red; display:none; font-size: 0.8rem; margin-top: 5px;">¡Casi! Sigue intentando...</p>
                </div>
            `;
        } else {
            gameHtml = `
                <div class="plaga-box correct-glow" style="margin-top: 20px;">
                    <p class="plaga-riddle" style="font-weight: bold;">
                        "Diez, diez, diez... Diez dedos en las manos, diez estaciones, diez plagas de Egipto, Diez mandamientos... <br><br> ¿Ya sabes a dónde ir?"
                    </p>
                </div>
            `;
        }

        // UNIMOS TODO: Historia original + Caja de adivinanza
        container.innerHTML = `
            <p class="mission-intro">${originalActivity}</p>
            ${gameHtml}
        `;

        // Si el juego sigue activo, configuramos los eventos del nuevo HTML inyectado
        if (currentStep < plagas.length) {
            const input = document.getElementById('plaga-answer');
            const btn = document.getElementById('check-plaga');

            if (input) {
                input.focus();
                input.onkeyup = (e) => {
                    if (e.key === 'Enter') btn.click();
                };
            }

            if (btn) {
                btn.onclick = () => {
                    const userVal = normalize(input.value);
                    const correctVal = normalize(plagas[currentStep].r);

                    if (userVal === correctVal) {
                        currentStep++;
                        renderStep();
                    } else {
                        document.getElementById('plaga-error').style.display = 'block';
                        input.value = "";
                        input.focus();
                    }
                };
            }
        } else {
            // Si terminó, lanzamos el confeti
            if (window.lanzarConfeti) window.lanzarConfeti();
        }
    };

    renderStep();
}

function setupCensoGame() {
    const container = document.getElementById('description');
    if (!container) return;

    const originalActivity = container.innerText;

    // Tus preguntas y respuestas
    const preguntas = [
        { q: "¿Cuántas personas mayores de 19 años participaron?", r: "6" },
        { q: "¿Cuántas personas de Betel tienen el pelo negro?", r: "1" },
        { q: "¿Cuántas años tiene la persona de Jericó que tiene el pelo rubio?", r: "8" },
        { q: "¿Cuántas personas en total tienen el pelo castaño?", r: "3" },
        { q: "¿Cuántas personas de Jericó tienen ojos de color negro o café oscuro?", r: "2" },
        { q: "¿Cuántos niños (entre 7 y 11 años) hay en total en el censo?", r: "4" }
    ];

    let currentStep = 0;

    const renderStep = () => {
        let gameHtml = "";

        if (currentStep < preguntas.length) {
            gameHtml = `
                <div class="plaga-box" style="margin-top: 20px;">
                    <span class="plaga-counter">Pregunta ${currentStep + 1} de ${preguntas.length}</span>
                    <p class="plaga-riddle">"${preguntas[currentStep].q}"</p>
                    <input type="number" id="censo-answer" placeholder="Escribe el número..." autocomplete="off" inputmode="numeric">
                    <button id="check-censo" class="feedback-btn">COMPROBAR</button>
                    <p id="censo-error" style="color: red; display:none; font-size: 0.8rem; margin-top: 5px;">El número no es correcto. ¡Revisa la hoja del censo!</p>
                </div>
            `;
        } else {
            gameHtml = `
                <div class="plaga-box correct-glow" style="margin-top: 20px;">
                    <p class="plaga-riddle" style="font-weight: bold;">
                        ¡Censo completado! <br><br> 
                        Has demostrado ser un gran escriba de Israel. Ve con tu monitor para recibir tu siguiente instrucción.
                    </p>
                </div>
            `;
        }

        container.innerHTML = `
            <p class="mission-intro">${originalActivity}</p>
            ${gameHtml}
        `;

        if (currentStep < preguntas.length) {
            const input = document.getElementById('censo-answer');
            const btn = document.getElementById('check-censo');

            if (input) {
                input.focus();
                input.onkeyup = (e) => { if (e.key === 'Enter') btn.click(); };
            }

            if (btn) {
                btn.onclick = () => {
                    const userVal = input.value.trim();
                    const correctVal = preguntas[currentStep].r;

                    if (userVal === correctVal) {
                        currentStep++;
                        renderStep();
                    } else {
                        document.getElementById('censo-error').style.display = 'block';
                        input.value = "";
                        input.focus();
                    }
                };
            }
        } else {
            // MENSAJE FINAL PERSONALIZADO
            gameHtml = `
                <div class="plaga-box correct-glow" style="margin-top: 20px;">
                    <p class="plaga-riddle" style="font-weight: bold; font-style: normal;">
                        ¡Censo completado! 🪶<br><br>
                        Has demostrado ser un gran escriba de Israel.<br><br>
                        <span style="color: #27ae60;">¿Puedes encontrar la única estación que aún no has visitado?</span>
                    </p>
                </div>
            `;
        }
    };

    renderStep();
}