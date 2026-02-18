// Get data from LocalStorage
const teamData = JSON.parse(localStorage.getItem("goldenScroll_team"));
const missionButtons = document.querySelectorAll('.mission-btn');

//Buttons Logic
missionButtons.forEach(button => {
    const id = button.getAttribute('data-id');
    const status = teamData?.progress?.[id] || "locked";

    const lockedImgPath = "images/padlock.jpg";

    if (status === "locked") {
        // Locked
        button.classList.add('is-locked');
        button.setAttribute('disabled', 'true');

        button.innerHTML = `<img src="${lockedImgPath}" alt="Locked" class="lock-icon">`;
    }

    // Button can only be clicked if it is unlocked
        button.addEventListener('click', () => {
                if (status === "unlocked") {
                    window.location.href = `mission-details.html?id=${id}`;
                }
    });
});