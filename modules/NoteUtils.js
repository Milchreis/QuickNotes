export default function NoteUtils(moduleOptions) {

    this.key = "quicknote";

    this.loadNotes = function() {
        let quicknote = JSON.parse(localStorage.getItem(this.key));
        if (quicknote && quicknote.notes)
            return quicknote.notes;
        return [];
    }

    this.saveNote = function(note) {
        let notes = this.loadNotes();

        notes = notes.filter(
            n => n.id !== note.id
        );

        note.updated = new Date();
        notes.push(note);

        this.saveNotes(notes);
    }

    this.saveNotes = function(notes) {
        if (Array.isArray(notes))
            notes = { notes };

        localStorage.setItem(this.key, JSON.stringify(notes));
    }

    this.deleteNotes = function() {
        this.saveNotes([]);
    }

    this.deleteNote = function(note) {
        let notes = this.loadNotes();
        notes = notes.filter(
            n => n.id !== note.id
        );
        this.saveNotes(notes);
    }

    this.importNotes = function(importNotes) {
        let notes = this.loadNotes();
        let importStatus = {
            newNotes: 0,
            sameNotes: 0,
            ignoredNotes: 0
        };

        importNotes.forEach(element => {

            if (!element.id || !element.note) {
                importStatus.ignoredNotes++;
                return;
            }

            let parentNote = notes.find(e => e.id === element.id);

            if (!parentNote) {
                importStatus.newNotes++;
                notes.push(element);
                return;
            }

            if (element.note !== parentNote.note) {
                element.parentId = element.id;
                element.id = this.createUUID();
                importStatus.sameNotes++;
                notes.push(element);
            }
        });
        this.saveNotes(notes);
        return importStatus;
    }

    this.createUUID = function() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
            let dt = new Date().getTime();
            let r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        });
    }
};