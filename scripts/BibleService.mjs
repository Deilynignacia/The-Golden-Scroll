const BASE_URL = "https://bible-api.com/";

// Bible-API
export async function generateHint(reference) {
    try {
        const response = await fetch(`${BASE_URL}${reference}`);
        const data = await response.json();
        return data.text; 
    } catch (error) {
        console.error("Error:", error);
        return "It was not possible to find the scripture.";
    }
}