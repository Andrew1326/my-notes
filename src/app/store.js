import { combineReducers, createStore, applyMiddleware, compose } from '@reduxjs/toolkit';
import { loadState, saveState } from './localStorage';
import notesReducer from '../components/screens/notes/notesSlice';
import diaryReducer from '../components/screens/diary/diarySlice';

//* compose enhancer
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//* root reducer
const rootReducer = combineReducers({
    notesReducer,
    diaryReducer
});

//* store
const store = createStore(rootReducer, loadState(), composeEnhancer(applyMiddleware()))

//* subscribe
store.subscribe(() => saveState(store.getState()));

export default store