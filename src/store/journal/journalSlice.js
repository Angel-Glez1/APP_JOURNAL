import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: {
        id: '',
        title: '',
        body: '',
        date: 0,
        imagesUrls: [],
    },
}

export const journalSlice = createSlice({
    name: 'journal',
    initialState,
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
        },
        updateNote: (state, { payload }) => {
            state.notes = state.notes.map(note => note.id === payload.id ? payload : note);
            state.isSaving = false;
        },
        setPhotosToActiveNote: (state, { payload }) => {
            state.active.imagesUrls = [...payload, ...state.active?.imagesUrls]
            state.isSaving = false;
        },
        deleteNoteById: (state, action) => ({
            ...state,
            isSaving: false,
            notes: state.notes.filter(n => n.id !== action.payload),
            active: initialState.active
        }),
        cleanNotesLogout: () => initialState,

    },
});


export const {
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById,
    savingNewNote,
    setPhotosToActiveNote,
    cleanNotesLogout,
} = journalSlice.actions;