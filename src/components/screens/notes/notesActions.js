import { createAction } from '@reduxjs/toolkit';

//* actions
export const createNote = createAction('CREATE_NOTE', text => ({ payload: text }));

export const completeNote = createAction('COMPLETE_NOTE', id => ({ payload: id }));

export const editNote = createAction('EDIT_NOTE', obj => ({ payload: obj }));

export const deleteNote = createAction('DELETE_NOTE', id => ({ payload: id }));

export const clearList = createAction('CLEAR_LIST');

export const onDrop = createAction('ON_DROP', obj => ({ payload: obj }));