import { createSlice } from "@reduxjs/toolkit";
import { getWeek } from "./dayCard/date";

//* create week
const createWeek = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return getWeek().map((el, i) => ({day: days[i], date: el, notes: []}))
};

//* initial state
const initialState = {
    days: createWeek(),
    selectedDayId: null,
    selectedNoteId: null
};

//* diary slice
const diarySlice = createSlice({
    name: 'diary',
    initialState,
    reducers: {
        //* create note
        createNote: (state, action) => {
            const { text, time, dayId } = action.payload;
            const selectedDayId = state.selectedDayId;
            const notes = state.days[selectedDayId].notes

            const listIncludesText = notes.map(el => el.text).includes(text);
            const listIncludesTime = notes.map(el => el.time).includes(time);

            ((!listIncludesText  || (listIncludesText && !listIncludesTime)) && text.length > 0) && state.days[dayId].notes.push({text, time, completed: false});
        },

        //* complete note 
        completeNote: (state, action) => {
            const { dayId, noteId } = action.payload;
            state.days[dayId].notes[noteId].completed = !state.days[dayId].notes[noteId].completed;
        },

        //* edit note
        editNote: (state, action) => {
            const { dayId, noteId, text, time } = action.payload;
            const listIncludesNote = state.days[dayId].notes.map(el => el.text).includes(text);

            if (text.length > 0 && !listIncludesNote) {
                const completed = state.days[dayId].notes[noteId].completed;
                const editedNote = state.days[dayId].notes[noteId];

                state.days[dayId].notes[noteId] = {text, time: time ? time : editedNote.time, completed};
            };
        },

        //* delete note
        deleteNote: (state, action) => {
            const { dayId, noteId } = action.payload;
            state.days[dayId].notes = state.days[dayId].notes.filter((_, i) => i !== noteId);
        },

        //* clear list
        clearList: (state, action) => {
            const id = action.payload;
            state.days[id].notes = [];
        },

        //* onDrop
        onDrop: (state, action) => {
            const { id, overElemId, dayId } = action.payload;

            const draggableElem = state.days[dayId].notes[id];
            const overElem = state.days[dayId].notes[overElemId];

            state.days[dayId].notes[overElemId] = draggableElem;
            state.days[dayId].notes[id] = overElem;
        },

        //* update dates
        updateDates: (state, action) => {
            const { currentDates } = action.payload
            state.days = state.days.map((el, i) => ({...el, date: currentDates[i]}))
        },

        //* select day
        selectDay: (state, action) => {
            state.selectedDayId = action.payload
        },

        //* select note
        selectNote: (state, action) => {
            state.selectedNoteId = action.payload
        }
    }
});

export const { createNote, completeNote, editNote, deleteNote, clearList, onDrop, updateDates, selectDay, selectNote } = diarySlice.actions
export default diarySlice.reducer