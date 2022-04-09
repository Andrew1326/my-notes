import { createSlice } from "@reduxjs/toolkit";
import { getWeek } from "./dayCard/date";

//* create week
const createWeek = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return getWeek().map((el, i) => {
        return {day: days[i], date: el, notes: []}
    })
};

//* initial state
const initialState = {days: createWeek()};

//* diary slice
const diarySlice = createSlice({
    name: 'diary',
    initialState,
    reducers: {
        //* create note
        createNote: (state, action) => {

            const note = action.payload.note;
            const time = action.payload.time;
            const dayId = action.payload.dayId;
            const listIncludes = state.days[dayId].notes.map(el => el.note).includes(note);

            (!listIncludes && note.length > 0) && state.days[dayId].notes.push({note, time, completed: false});
        },
        //* complete note 
        completeNote: (state, action) => {

            const dayId = action.payload.dayId;
            const noteId = action.payload.noteId
            state.days[dayId].notes[noteId].completed = !state.days[dayId].notes[noteId].completed;
        },
        //* edit note
        editNote: (state, action) => {

            const dayId = action.payload.dayId;
            const noteId = action.payload.noteId;
            const note = action.payload.note;
            const time = action.payload.time;

            const listIncludesNote = state.days[dayId].notes.map(el => el.note).includes(note);

            if (note.length > 0 && !listIncludesNote) {

                const completed = state.days[dayId].notes[noteId].completed;
                state.days[dayId].notes[noteId] = {note, time, completed};
            };
        },
        //* delete note
        deleteNote: (state, action) => {

            const dayId = action.payload.dayId;
            const noteId = action.payload.noteId;
            state.days[dayId].notes = state.days[dayId].notes.filter((_, i) => i !== noteId);
        },
        //* clear list
        clearList: (state, action) => {
            
            const id = action.payload;
            state.days[id].notes = [];
        },
        //* onDrop
        onDrop: (state, action) => {
            
            const id = action.payload.id;
            const overElemId = action.payload.overElemId;
            const dayId = action.payload.dayId;

            const draggableElem = state.days[dayId].notes[id];
            const overElem = state.days[dayId].notes[overElemId];

            state.days[dayId].notes[overElemId] = draggableElem;
            state.days[dayId].notes[id] = overElem;
        }
    }
});

export const { createNote, completeNote, editNote, deleteNote, clearList, onDrop } = diarySlice.actions
export default diarySlice.reducer