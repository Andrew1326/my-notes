import { createAction } from '@reduxjs/toolkit';

//* actions
export const createNote = createAction('CREATE_NOTE', obj => ({ payload: obj }));

export const completeNote = createAction('COMPLETE_NOTE', obj => ({ payload: obj }));

export const editNote = createAction('EDIT_NOTE', obj => ({ payload: obj }));

export const deleteNote = createAction('DELETE_NOTE', obj => ({ payload: obj }));

export const clearList = createAction('CLEAR_LIST', id => ({ payload: id }));

export const onDrop = createAction('ON_DROP', id => ({ payload: id }));

export const updateDates = createAction('UPDATE_DATES', currentDates => ({payload: currentDates}));

export const selectDay = createAction('SELECT_DAY', id => ({ payload: id }))

export const selectNote = createAction('SELECT_NOTE', id => ({ payload: id }))