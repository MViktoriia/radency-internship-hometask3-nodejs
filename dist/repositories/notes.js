"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNoteStatus = exports.updateNote = exports.addNote = exports.removeNote = exports.getNotesAggregatedData = exports.getNoteById = exports.allNotes = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const nanoid_1 = require("nanoid");
const notesPath = path_1.default.join(__dirname, "notes_db.json");
const updateNotes = (notes) => __awaiter(void 0, void 0, void 0, function* () {
    yield promises_1.default.writeFile(notesPath, JSON.stringify(notes, null, 2));
});
const allNotes = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = (yield promises_1.default.readFile(notesPath)).toString();
    return JSON.parse(data);
});
exports.allNotes = allNotes;
const getNoteById = (noteId) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield allNotes();
    const result = notes.find(item => item.id === noteId);
    return result || null;
});
exports.getNoteById = getNoteById;
const getNotesAggregatedData = () => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield allNotes();
    const categories = [];
    for (let i = 0; i <= notes.length - 1; i++) {
        categories.push(notes[i].category);
    }
    ;
    const uniqueCategories = [...new Set(categories)];
    const summary = [];
    uniqueCategories.forEach((item) => {
        const totalActive = notes.filter((note) => note.category === item && note.archived === false).length;
        const totalArchive = notes.filter((note) => note.category === item && note.archived === true).length;
        summary.push({ category: item, totalActiveNotes: totalActive, totalArchiverNotes: totalArchive });
    });
    return summary;
});
exports.getNotesAggregatedData = getNotesAggregatedData;
const addNote = ({ name, created, category, content, archived }) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield allNotes();
    const newNote = {
        id: (0, nanoid_1.nanoid)(),
        name,
        created,
        category,
        content,
        archived
    };
    notes.push(newNote);
    yield updateNotes(notes);
    return newNote;
});
exports.addNote = addNote;
const removeNote = (noteId) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield allNotes();
    const index = notes.findIndex(item => item.id === noteId);
    if (index === -1) {
        return null;
    }
    const [result] = notes.splice(index, 1);
    yield updateNotes(notes);
    return result;
});
exports.removeNote = removeNote;
const updateNote = (id, { name, created, category, content, archived }) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield allNotes();
    const index = notes.findIndex(item => item.id === id);
    if (index === -1) {
        return null;
    }
    ;
    notes[index] = { id, name, created, category, content, archived };
    yield updateNotes(notes);
    return notes[index];
});
exports.updateNote = updateNote;
const updateNoteStatus = (id, { archived }) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield allNotes();
    const noteToUpdate = notes.find(item => item.id === id);
    if (!noteToUpdate) {
        return null;
    }
    ;
    noteToUpdate.archived = archived;
    yield updateNotes(notes);
    return noteToUpdate;
});
exports.updateNoteStatus = updateNoteStatus;
//# sourceMappingURL=notes.js.map