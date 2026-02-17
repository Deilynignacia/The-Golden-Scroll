// Team
const teamData = JSON.parse(localStorage.getItem("goldenScroll_team"));

// Progress Tracker
const progressFill = document.querySelector('.progress-fill');

if (progressFill) {
    let percentage = 10;

    if (teamData && teamData.progress) {
        const total = 10; 
        const unlocked = Object.values(teamData.progress).filter(s => s !== "locked").length;
        percentage = (unlocked / total) * 100;
    }

    progressFill.style.width = `${percentage}%`;
}

// Cat-Avatar API
if (teamData && document.getElementById('team-profile')) {
    document.getElementById('team-profile').style.backgroundImage = `url(${teamData.avatar})`;
}

// Menu
const buttons = { 'map': 'map.html', 'ranking': 'ranking.html', 'notes': 'notes.html', 'bible': 'bible.html' };
Object.entries(buttons).forEach(([id, url]) => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', () => { window.location.href = url; });
});