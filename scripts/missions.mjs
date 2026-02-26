// Get data from LocalStorage
const teamData = JSON.parse(localStorage.getItem("goldenScroll_team"));
const missionButtons = document.querySelectorAll('.mission-btn');

missionButtons.forEach(button => {
    const id = button.getAttribute('data-id');
    const status = teamData?.progress?.[id] || "locked";

    const lockedImgPath = "images/padlock.jpg";

    // Reset de clases por si acaso
    button.classList.remove('is-locked', 'is-completed', 'is-unlocked');

    if (status === "locked") {
            button.classList.add('is-locked');
            button.setAttribute('disabled', 'true');
            button.innerHTML = `<img src="images/padlock.jpg" alt="Locked" class="lock-icon">`;
        } 
        else if (status === "completed") {
            button.classList.add('is-completed');
            // Usamos el símbolo directo ✨ y mantenemos el texto de la misión
            button.innerHTML = `<span>Mission ${id} ✨</span>`;
        }
        else if (status === "unlocked") {
            button.classList.add('is-unlocked');
            button.innerHTML = `<span>Mission ${id}</span>`;
        }

    button.addEventListener('click', () => {
        // Ahora pueden entrar si está desbloqueada O si ya la completaron (para repasar)
        if (status === "unlocked" || status === "completed") {
            window.location.href = `mission-details.html?id=${id}`;
        }
    });
});