// Select Buttons
const missionButtons = document.querySelectorAll('.mission-btn');

missionButtons.forEach(button => {
    button.addEventListener('click', () => {
        // From HTML
        const id = button.getAttribute('data-id');
        window.location.href = `mission-details.html?id=${id}`;
    });
});