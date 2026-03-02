import { missionData } from './missionData.mjs';
import { saveTeamToCloud } from './Firebase.mjs';

export function generateAvatar(teamName) {
    const name = teamName || "Adan";
    return `https://cat-avatars.vercel.app/api/cat?name=${encodeURIComponent(name)}`;
}

// Añadimos 'role' y 'customProgress' como parámetros opcionales
export async function registerTeam(teamName, avatarUrl, childName, companionName, role = "player", password = "", customProgress = null) {

    // Si no viene un progreso personalizado (niños), generamos el inicial
    const progressMap = customProgress || {};
    
    if (!customProgress) {
        missionData.missions.forEach((mission, index) => {
            // Estado inicial: Misión 1 "unlocked", el resto "locked"
            progressMap[mission.id] = (index === 0) ? "unlocked" : "locked";
        });
    }

    const teamData = {
        name: teamName,
        avatar: avatarUrl,
        childName: childName,       
        companionName: companionName, 
        role: role, // Importante para filtrar en el Monitor Hub
        password: password,
        score: 0,
        currentChallenge: 1,
        progress: progressMap,
        completedMissions: [], // Array para rastrear misiones finalizadas
        lastActive: new Date().getTime()
    };

    localStorage.setItem("goldenScroll_team", JSON.stringify(teamData));
    localStorage.setItem("user_role", role);

    try {
        await saveTeamToCloud(teamData);
        console.log("¡Datos guardados con éxito!");
    } catch (error) {
        console.error("Error al guardar en la nube:", error);
    }
}