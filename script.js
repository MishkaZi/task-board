const noteData = document.getElementById('note-data-input');
const noteDate = document.getElementById('note-date-input');
const noteTime = document.getElementById('note-time-input');

const NoteDiv = document.getElementById('notes-div');

const alertError = document.getElementById('alert-error');

let parsedListOfNotes = [];

//Load from local storage
function loadFromLocalStorage() {
    if (localStorage.getItem("local-stored-notes") !== null) {
        let retrievedListOfNotes = localStorage.getItem("local-stored-notes");
        parsedListOfNotes = JSON.parse(retrievedListOfNotes);
    }
    return parsedListOfNotes;
}

//Save to local storage
function saveToLocalStorage(parsedListOfNotes) {
    localStorage.setItem("local-stored-notes", JSON.stringify(parsedListOfNotes));
}

//Helping function to create note element
function createNoteElement(id, data, date, time) {
    return `<div class="note fade-in">
                <button name="${id}" onclick="deleteNote(this)" class="delete-note">
                    <i class="fas fa-times-circle fa-2x"></i>
                </button>
                <p id="note-data"> ${data} </p>
                <p id="note-date"> ${date}</p>
                <p id="note-time"> ${time} </p>
            </div>`;
}

//Helping function to dipslay note on screen.
function printNoteToScreen(noteHTML) {
    tempDivToInsert = document.createElement('div');
    tempDivToInsert.innerHTML = noteHTML;

    NoteDiv.appendChild(tempDivToInsert);
}

function dismissAlert() {
    alertError.classList.remove('fade-in');
    alertError.classList.add('fade-out');

    setTimeout(() => {
        alertError.classList.add('hidden-alert');
        alertError.classList.remove('fade-out');
    }, 600);
}

//Generating random id function
function getRandomID() {
    return (Math.random() * 100) * Date.now();
}

function notesDisplay() {
    parsedListOfNotes = loadFromLocalStorage();

    for (let i = 0; i < parsedListOfNotes.length; i++) {
        (function (i) {
            setTimeout(function () {
                let noteHTML =
                    createNoteElement(parsedListOfNotes[i].id, parsedListOfNotes[i].data, parsedListOfNotes[i].date, parsedListOfNotes[i].time);
                printNoteToScreen(noteHTML);
            }, i * 500);
        })(i);
    }
    saveToLocalStorage(parsedListOfNotes);
}

notesDisplay();


//Adding new note to notes list
function addNote() {
    const inputedDate = new Date(noteDate.value);
    if (noteData.value !== '' && noteDate.value !== '' && inputedDate > Date.now()) {
        dismissAlert();
        parsedListOfNotes = loadFromLocalStorage();
        var randomID = getRandomID();

        //Time is not required, so we have two options, with, or without time inputed.
        parsedListOfNotes.push({
            id: randomID,
            data: noteData.value,
            date: noteDate.value,
            time: noteTime.value !== null ? noteTime.value : '',
        });
        let noteHTML =
            noteTime.value !== null
                ? createNoteElement(randomID, noteData.value, noteDate.value, noteTime.value)
                : createNoteElement(randomID, noteData.value, noteDate.value, '')

        printNoteToScreen(noteHTML);
        saveToLocalStorage(parsedListOfNotes);
        clearNote();
    } else {
        alertError.classList.add('fade-in');
        alertError.classList.remove('hidden-alert');

    }
}

function deleteNote(button) {
    let note = button.parentElement;
    note.classList.remove("fade-in");
    note.classList.add("fade-out");
    setTimeout(function () { note.parentNode.removeChild(note); }, 1000);
    parsedListOfNotes = loadFromLocalStorage();
    for (let i = 0; i < parsedListOfNotes.length; i++) {
        if (+parsedListOfNotes[i].id === +button.name) {
            parsedListOfNotes.splice(i, 1);
            saveToLocalStorage(parsedListOfNotes);
        }
    }

}

//Clear inpute note function
function clearNote() {
    noteData.value = '';
    noteDate.value = '';
    noteTime.value = '';

}


//Closing alert
function closeAlert() {
    dismissAlert();
}