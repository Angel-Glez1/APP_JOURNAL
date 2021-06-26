import Swal from 'sweetalert2';
import { db } from '../firebase/firebase-config';
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from '../helpers/LoadNotes';
import { types } from '../types/types';


/*-------------------------------------------------------------------
|			ACCIONES SINCRONAS (Working in notesReducer)
---------------------------------------------------------------------*/

// Sirve para obtener la informacion de nota activa. 
export const activeNote = (id, nota) => ({
	type: types.notesActive,
	payload: { id, ...nota }
});

// Carga todo el array de notas del usuario
export const setNotes = (notes) => ({
	type: types.notesLoad,
	payload: notes
});

// Agrega una nueva nota a mi state.
export const addNewNote = (id, note) => ({
	type: types.notesAddNew,
	payload: { id, ...note }
})


// Refresca un nota en espesifico
export const refreshNote = (id, note) => ({
	type: types.notesUpdated,
	payload: { id, note: { id, ...note } }
});

// Elimina una nota.
export const deleteNote = (id) => ({
	type: types.notesDelete,
	payload: id
})

// Reinicializa el state.
export const noteLogout = () => ({
	type: types.notesLogoutCleaning
})


/*---------------------------------------------------------------
| 				Accion Asincronas
----------------------------------------------------------------- */

// Guarda la nota creada en FIEBASE
export const startNewNote = () => {
	return async (dispatch, getState) => {

		const { uid } = getState().auth;
		const newNote = { title: '', body: '', date: new Date().getTime()}

		try{

			const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
			dispatch( activeNote( doc.id, newNote));
			dispatch( addNewNote( doc.id, newNote ));
			
		}catch(e){

			console.log(e);
		}

	}
}



// Obtenemos las notas que sean del usuario auth de FIREBASE
export const startLoadingNotes = (uid) => {
	return async (dispatch) => {

		// Obtener las notas del usuario autentificado
		const notes = await loadNotes(uid);
		dispatch( setNotes(notes) );
	}
}



// Actuliza una nota 
export const startSaveNote = (note) => {
	return async (dispatch, getState) => {

		const {uid} = getState().auth;

		if(!note.url){
			delete note.url;
 		}

		const noteToFirestore = { ...note };
		delete noteToFirestore.id;
		

		try{

			await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
			dispatch(refreshNote( note.id, noteToFirestore ));
			Swal.fire('Saved', note.title, 'success');


		}catch(e){
			console.log(e);
		}

	}
}



// Hace la carga de la imagen a cloudinary y actuliza ese campo en firebase
export const startUploadin = (file) => {
	return async (dispatch, getState) => {
		const { active: activeNote } = getState().notes;

		Swal.fire({
			title: 'Uploading...',
			text: 'Please Wait...',
			allowOutsideClick: false,
			onBeforeOpen: () => {
				Swal.showLoading();
			}
		});

		const fileUrl = await fileUpload(file);
		activeNote.url = fileUrl;

		dispatch( startSaveNote(activeNote) );
		

		Swal.close();
	}

}

/**
 * Elimina una nota de Firebase por su id
 * @param {String} id ID de la note que se va a borrar.
 * @returns {<void>}
 */
export const startDeleting = (id) => {
	return async (dispatch, getState) => {

		const uid = getState().auth.uid;
		await db.doc(`${uid}/journal/notes/${id}`).delete();

		dispatch(deleteNote(id));


	}
}


