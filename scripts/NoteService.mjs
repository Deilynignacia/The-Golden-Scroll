const textArea = document.getElementById('personal-notes');
const button = document.getElementById('btn-save-notes');
const div = document.getElementById('notes-container');

function renderNotes() {
    div.innerHTML = "";
    const notes = JSON.parse(localStorage.getItem('goldenScroll_allNotes')) || [];

    notes.forEach((note, index) => {
        const newNoteBox = document.createElement('div');
        newNoteBox.classList.add('saved-note');
        newNoteBox.innerText = note;

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = "x";
        deleteBtn.classList.add('delete-note-btn');

        deleteBtn.onclick = () => {
            notes.splice(index, 1);
            localStorage.setItem('goldenScroll_allNotes', JSON.stringify(notes));
            renderNotes();
        };

        newNoteBox.appendChild(deleteBtn);
        div.appendChild(newNoteBox);
    });
}

button.addEventListener('click', () => { 
    const text = textArea.value.trim(); 
    
    if (text !== "") {
        const notes = JSON.parse(localStorage.getItem('goldenScroll_allNotes')) || [];        
        notes.push(text);
        localStorage.setItem('goldenScroll_allNotes', JSON.stringify(notes));
        textArea.value = "";
        renderNotes();
    } 
});

window.addEventListener('DOMContentLoaded', renderNotes);