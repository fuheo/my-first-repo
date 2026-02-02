class NoteApp {
    constructor() {
        this.notes = JSON.parse(localStorage.getItem('notes')) || [];
        this.notesContainer = document.getElementById('notes-container');
        this.addNoteBtn = document.getElementById('add-note-btn');
        this.init();
    }

    init() {
        this.renderNotes();
        this.addNoteBtn.addEventListener('click', () => this.addNote());
    }

    renderNotes() {
        this.notesContainer.innerHTML = '';
        this.notes.forEach(note => this.renderNote(note));
    }

    renderNote(note) {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.dataset.id = note.id;

        noteElement.innerHTML = `
            <div class="note-header">
                <input type="text" class="note-title" value="${note.title}" placeholder="笔记标题">
                <button class="delete-btn">删除</button>
            </div>
            <textarea class="note-content" placeholder="笔记内容">${note.content}</textarea>
            <div class="note-timestamp">${this.formatDate(note.timestamp)}</div>
        `;

        const titleInput = noteElement.querySelector('.note-title');
        const contentTextarea = noteElement.querySelector('.note-content');
        const deleteBtn = noteElement.querySelector('.delete-btn');

        titleInput.addEventListener('input', () => {
            note.title = titleInput.value;
            note.timestamp = Date.now();
            this.updateNote(note);
        });

        contentTextarea.addEventListener('input', () => {
            note.content = contentTextarea.value;
            note.timestamp = Date.now();
            this.updateNote(note);
        });

        deleteBtn.addEventListener('click', () => this.deleteNote(note.id));

        this.notesContainer.appendChild(noteElement);
    }

    addNote() {
        const newNote = {
            id: Date.now().toString(),
            title: '新笔记',
            content: '',
            timestamp: Date.now()
        };

        this.notes.push(newNote);
        this.saveNotes();
        this.renderNote(newNote);
    }

    updateNote(updatedNote) {
        const index = this.notes.findIndex(note => note.id === updatedNote.id);
        if (index !== -1) {
            this.notes[index] = updatedNote;
            this.saveNotes();
            this.renderNotes();
        }
    }

    deleteNote(noteId) {
        this.notes = this.notes.filter(note => note.id !== noteId);
        this.saveNotes();
        this.renderNotes();
    }

    saveNotes() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }

    formatDate(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// 初始化应用
new NoteApp();