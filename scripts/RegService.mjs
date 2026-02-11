import { saveTeamToCloud } from './Firebase.mjs';

// Cat Avatar API
const BASE_URL = "https://cat-avatars.vercel.app/api/cat";

export function generateAvatar(teamName) {
    const name = teamName || "Adan";
    return `https://cat-avatars.vercel.app/api/cat?name=${encodeURIComponent(name)}`;
}

export async function registerTeam(teamName, avatarUrl) {
    const teamData = {
        name: teamName,
        avatar: avatarUrl,
        score: 0,
        currentChallenge: 1,
        lastActive: new Date().getTime()
    };

    // LocalStorage
    localStorage.setItem("goldenScroll_team", JSON.stringify(teamData));

    // Firebase
    try {
        await saveTeamToCloud(teamData);
        console.log("Your team's cat was successfully saved!");
    } catch (error) {
        console.error("Oh no! The cat got lost!", error);
    }
}