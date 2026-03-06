const BASE_URL = "https://bible-api.com/";

export async function getFullChapter(bookId, chapterNumber) {
    // Añadimos el parámetro de traducción al final
    const url = `${BASE_URL}${bookId}+${chapterNumber}?translation=rva`;
    
    const response = await fetch(url);
    const data = await response.json();
    return data; 
}