import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FireBaseDB } from '../../firebase/config';
import { loadNotes } from '../../helpers';
import { fileUpload } from './fileUpload';
import {
    addNewEmptyNote,
    savingNewNote,
    setActiveNote,
    setNotes,
    setPhotosToActiveNote,
    setSaving,
    updateNote,
    deleteNoteById
} from './journalSlice';



export const startNewNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imagesUrls: [],
        }


        dispatch(savingNewNote());

        const newDoc = doc(collection(FireBaseDB, `${uid}/journal/notes`))
        await setDoc(newDoc, newNote);

        dispatch(addNewEmptyNote({ ...newNote, id: newDoc.id }));
        dispatch(setActiveNote({ ...newNote, id: newDoc.id }));
    }
}



export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        const notes = await loadNotes(uid);
        dispatch(setNotes(notes))
    }
}



export const startSaveNote = note => {
    return async (dispatch, getState) => {
        dispatch(setSaving());
        const { uid } = getState().auth;
        const noteToFireStore = { ...note }
        delete noteToFireStore.id;
        const docRef = doc(FireBaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFireStore, { merge: true })
        dispatch(setActiveNote(note));
        dispatch(updateNote(note))
    }
}


export const startUploadingFiles = (files = [], note) => {
    return async (dispatch) => {
        dispatch(setSaving());
        const fileUploadPromises = Array.from(files).map(file => fileUpload(file));
        const photoUrls = await Promise.all(fileUploadPromises);
        dispatch(setActiveNote(note));
        dispatch(setPhotosToActiveNote(photoUrls))
    }
}


export const startDeletingNote = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docRef = doc(FireBaseDB, `${uid}/journal/notes/${note.id}`);
        await deleteDoc(docRef);

        dispatch(deleteNoteById(note.id))
    }
}