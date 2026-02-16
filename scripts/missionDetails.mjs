import { missionData } from './missionData.mjs';

// Mission ID
const params = new URLSearchParams(window.location.search);
const missionId = params.get('id');

// Search for the
const currentMission = missionData.missions.find(m => m.id === missionId);

// Fill the Mission HTML 
if (currentMission) {
    document.getElementById('title-dtl').innerText = currentMission.title;
    document.getElementById('subtitle-dtl').innerText = currentMission.subtitle;
    document.getElementById('icon-dtl').src = currentMission.image;
    document.getElementById('difficulty-dtl').innerText = currentMission.difficulty;
    document.getElementById('description').innerText = currentMission.activity;

}

// Back to Missions
const backBtn = document.getElementById('back-to-missions');
if (backBtn) {
    backBtn.onclick = () => window.location.href = 'missions.html';
}