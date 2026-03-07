export async function getFullChapter(bookId, chapterNumber) {

    const response = await fetch(`/scriptures/${bookId}.json`);

    if (!response.ok) {
        throw new Error("No se pudo cargar el libro");
    }

    const book = await response.json();

    const chapter = book[chapterNumber - 1];

    return {
        verses: chapter.map((text, index) => ({
            verse: index + 1,
            text: text
        }))
    };
}