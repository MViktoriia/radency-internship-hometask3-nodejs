import fs from "fs/promises";
import path from "path";
import {nanoid} from 'nanoid';

export type Note = {
    id: string;
    name: string;
    created: string;
    category: string;
    content: string;
    archived: boolean;
}

const notesPath = path.join(__dirname, "notes_db.json");

const updateNotes = async (notes: Note[]) => {
    await fs.writeFile(notesPath, JSON.stringify(notes, null, 2))
};

const allNotes = async(): Promise<Note[]> => {
    const data = (await fs.readFile(notesPath)).toString();
    return JSON.parse(data);
};

const getNoteById = async (noteId: string) => {
    const notes: Note[] = await allNotes();
    const result = notes.find(item => item.id === noteId);
  
    return result || null;
};

const getNotesAggregatedData = async () => {

    const notes: Note[] = await allNotes();
    const categories: string[] = [];
    
    for (let i=0; i <= notes.length-1; i++ ) {
        categories.push(notes[i].category);
    };

    const uniqueCategories = [...new Set(categories)];

    type aggregatedDataByCategory = {
        category: string;
        totalActiveNotes: number;
        totalArchiverNotes: number;
    }

    const summary: aggregatedDataByCategory[] = [];

    uniqueCategories.forEach((item)=> {
        const totalActive = notes.filter((note)=> note.category === item && note.archived === false).length;
        const totalArchive = notes.filter((note)=> note.category === item && note.archived === true).length;

        summary.push({category: item, totalActiveNotes: totalActive, totalArchiverNotes: totalArchive})

    });

    return summary;
};

const addNote = async ({name, created, category, content, archived}: {name: string, created: string, category: string, content: string, archived: boolean}) => {
    const notes = await allNotes();

    const newNote = {
        id: nanoid(),
        name,
        created,
        category,
        content,
        archived        
    }

    notes.push(newNote);
    await updateNotes(notes);
    return newNote;
};


const removeNote = async (noteId: string) => {
    const notes = await allNotes();
    const index = notes.findIndex(item => item.id === noteId);
    if (index === -1) {
      return null;
    }
  
    const [result] = notes.splice(index, 1);
    await updateNotes(notes);
    return result;
};


const updateNote = async (id: string, {name, created, category, content, archived}:{name: string, created: string, category: string, content: string, archived: boolean}) => {

    const notes = await allNotes();
    const index = notes.findIndex(item => item.id === id);

    if (index === -1) {
        return null;
    };

    notes[index] = { id, name, created, category, content, archived };
    await updateNotes(notes);

    return notes[index];
};

const updateNoteStatus = async (id: string, {archived}:{archived:boolean}) => {

    const notes = await allNotes();
    const noteToUpdate = notes.find(item => item.id === id);

    if (!noteToUpdate) {
        return null;
    };

    noteToUpdate.archived = archived;
    await updateNotes(notes);

    return noteToUpdate;
};


export {allNotes, getNoteById, getNotesAggregatedData, removeNote, addNote, updateNote, updateNoteStatus};


