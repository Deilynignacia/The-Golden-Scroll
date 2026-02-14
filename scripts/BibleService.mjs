const BASE_URL = "https://bible-api.com/";

export async function getFullChapter(bookId, chapterNumber) {
    
    // URL scructure "https://bible-api.com/genesis+1"
    const url = `${BASE_URL}${bookId}+${chapterNumber}`;
    const response = await fetch(url);
    const data = await response.json();
    return data; 
}