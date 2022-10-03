import { createSlice } from '@reduxjs/toolkit';

//* initial state
const initialState = {
    notes: []
};

//* notes slice
const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        //* create note
        createNote: (state, action) => {
            const note = action.payload;
            const listIncludes = state.notes.map(el => el.name).includes(note);

            (!listIncludes && note.length > 0) && state.notes.push({name: note, completed: false});
        },

        //* complete note 
        completeNote: (state, action) => {
            const id = action.payload;
            state.notes[id].completed = !state.notes[id].completed;
        },

        //* edit note
        editNote: (state, action) => {
            const { id, note } = action.payload;
            const listIncludes = state.notes.map(el => el.name).includes(note);

            if (note.length > 0 && !listIncludes) state.notes[id].name = note;
        },

        //* delete note
        deleteNote: (state, action) => {
            const noteId = action.payload;
            state.notes = state.notes.filter((_, i) => i !== noteId);
        },

        //* clear list
        clearList: state => {
            state.notes = []
        },
        
        //* onDrop
        onDrop: (state, action) => {
            const { id, overElemId } = action.payload;

            const draggableElem = state.notes[id];
            const overElem = state.notes[overElemId];

            state.notes[overElemId] = draggableElem;
            state.notes[id] = overElem;
        }
    } 
});

export const { createNote, completeNote, editNote, deleteNote, clearList, onDrop } = notesSlice.actions
export default notesSlice.reducer