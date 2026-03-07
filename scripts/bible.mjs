import { getFullChapter } from './BibleService.mjs';

const bookList = document.getElementById('book-list');
const chapterList = document.getElementById('chapter-list');
const viewer = document.getElementById('viewer');
const scriptureText = document.getElementById('scripture-text');
const backBtn = document.getElementById('back-to');

// Configuración de los libros
const booksConfig = {
    'genesis': 50,
    'exodus': 40,
    'leviticus': 27,
    'numbers': 36,
    'deuteronomy': 34
};

// Función para manejar cada libro
function setupBook(bookId, totalChapters) {

    const btn = document.querySelector(`[data-book="${bookId}"]`);
    if (!btn) return;

    btn.onclick = function () {

        bookList.classList.add('hidden');
        chapterList.classList.remove('hidden');
        chapterList.innerHTML = "";

        for (let i = 1; i <= totalChapters; i++) {

            const chapBtn = document.createElement('button');
            chapBtn.innerText = i;
            chapBtn.classList.add('chapter-btn');

            chapBtn.onclick = async function () {

                chapterList.classList.add('hidden');
                viewer.classList.remove('hidden');
                scriptureText.innerText = "Cargando...";

                try {

                    const data = await getFullChapter(bookId, i);

                    if (data && data.verses && data.verses.length > 0) {

                        const fullText = data.verses
                            .map(v => `<b>${v.verse}</b> ${v.text}`)
                            .join('<br><br>');

                        scriptureText.innerHTML = fullText;

                    } else {

                        scriptureText.innerText = "No se encontraron versículos.";

                    }

                } catch (error) {

                    console.error("Error cargando capítulo:", error);

                    scriptureText.innerText =
                        "Error al abrir el pergamino.";

                }

            };

            chapterList.appendChild(chapBtn);
        }
    };
}

// Inicializar todos los libros
Object.entries(booksConfig).forEach(([id, chapters]) => {
    setupBook(id, chapters);
});

// Botón volver
backBtn.onclick = function () {

    viewer.classList.add('hidden');
    chapterList.classList.add('hidden');
    bookList.classList.remove('hidden');
    scriptureText.innerText = "";

};