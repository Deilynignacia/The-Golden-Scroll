import { getFullChapter } from './BibleService.mjs';

// bible.html variables
const bookList = document.getElementById('book-list');
const chapterList = document.getElementById('chapter-list');
const viewer = document.getElementById('viewer');
const scriptureText = document.getElementById('scripture-text');

// GENESIS
const genesisBtn = document.querySelector('[data-book="genesis"]');
genesisBtn.onclick = function() {
    // hide book list
    bookList.classList.add('hidden');
    // Show chapter list
    chapterList.classList.remove('hidden');
  
    // Clean List
    chapterList.innerHTML = ""; 

    // Chapter buttons
    for (let i = 1; i <= 50; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.classList.add('chapter-btn');
        
    btn.onclick = async function() {
        // hide chapters to show scriptures
        chapterList.classList.add('hidden');
        viewer.classList.remove('hidden');
        scriptureText.innerText = "Loading...";

        // API call
        const data = await getFullChapter('genesis', i);
        scriptureText.innerText = data.text;
    };
        chapterList.appendChild(btn);
    }
};

// EXODUS
const exodusBtn = document.querySelector('[data-book="exodus"]');
exodusBtn.onclick = function() {
    // hide book list
    bookList.classList.add('hidden');
    // Show chapter list
    chapterList.classList.remove('hidden');   
    // Clean List
    chapterList.innerHTML = ""; 

    // Chapter buttons
    for (let i = 1; i <= 40; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.classList.add('chapter-btn');
        
    btn.onclick = async function() {
        // hide chapters to show scriptures
        chapterList.classList.add('hidden');
        viewer.classList.remove('hidden');
        scriptureText.innerText = "Loading...";

        // API call
        const data = await getFullChapter('exodus', i);
        scriptureText.innerText = data.text;
    };
        chapterList.appendChild(btn);
    }
};

// LEVITICUS
const leviticusBtn = document.querySelector('[data-book="leviticus"]');
leviticusBtn.onclick = function() {
    // hide book list
    bookList.classList.add('hidden');
    // Show chapter list
    chapterList.classList.remove('hidden');   
    // Clean List
    chapterList.innerHTML = ""; 

    // Chapter buttons
    for (let i = 1; i <= 27; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.classList.add('chapter-btn');
        
    btn.onclick = async function() {
        // hide chapters to show scriptures
        chapterList.classList.add('hidden');
        viewer.classList.remove('hidden');
        scriptureText.innerText = "Loading...";

        // API call
        const data = await getFullChapter('leviticus', i);
        scriptureText.innerText = data.text;
    };
        chapterList.appendChild(btn);
    }
};

// NUMBERS
const numbersBtn = document.querySelector('[data-book="numbers"]');
numbersBtn.onclick = function() {
    // hide book list
    bookList.classList.add('hidden');
    // Show chapter list
    chapterList.classList.remove('hidden'); 
    // Clean List
    chapterList.innerHTML = ""; 

    // Chapter buttons
    for (let i = 1; i <= 36; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.classList.add('chapter-btn');
        
    btn.onclick = async function() {
        // hide chapters to show scriptures
        chapterList.classList.add('hidden');
        viewer.classList.remove('hidden');
        scriptureText.innerText = "Loading...";

        // API call
        const data = await getFullChapter('numbers', i);
        scriptureText.innerText = data.text;
    };
        chapterList.appendChild(btn);
    }
};

// Deuteronomy
const deuteronomyBtn = document.querySelector('[data-book="deuteronomy"]');
deuteronomyBtn.onclick = function() {
    // hide book list
    bookList.classList.add('hidden');
    // Show chapter list
    chapterList.classList.remove('hidden');
    // Clean List
    chapterList.innerHTML = ""; 

    // Chapter buttons
    for (let i = 1; i <= 34; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.classList.add('chapter-btn');
        
    btn.onclick = async function() {
        // hide chapters to show scriptures
        chapterList.classList.add('hidden');
        viewer.classList.remove('hidden');
        scriptureText.innerText = "Loading...";

        // API call
        const data = await getFullChapter('deuteronomy', i);
        scriptureText.innerText = data.text;
    };
        chapterList.appendChild(btn);
    }
};

// "back-to" button
const backBtn = document.getElementById('back-to');

backBtn.onclick = function() {
    // hide chapter list
    viewer.classList.add('hidden');
    chapterList.classList.add('hidden');
    
    // Show book list
    bookList.classList.remove('hidden');
    
    // Clean
    scriptureText.innerText = "";
};