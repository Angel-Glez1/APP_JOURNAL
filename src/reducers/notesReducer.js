import { types } from '../types/types';

const initialState = { notes: [], active: null };
export const notesReducer = (state = initialState, action) => {

	switch (action.type) {

		// Inserta una nueva nota a mi state
		case types.notesAddNew:
			return {
				...state,
				notes: [ action.payload, ...state.notes ]
			}

		// Retorna la infomacion de la nota activa
		case types.notesActive:
			return { 
				...state, 
				active : {
					...action.payload
				}  
			}

		// Retorna todo el arreglo de notas
		case types.notesLoad:
			return {
				...state, 
				notes: [...action.payload]
			}

		// Retorna una nota en espesifico.
		case types.notesUpdated:
			return {
				...state,
				notes: state.notes.map(
					note => note.id === action.payload.id 
						? action.payload.note
						: note
				)
			}

		// Elimina una nota.
		case types.notesDelete: 
			return {
				...state,
				active: null,
				notes: state.notes.filter(n => n.id !== action.payload )
			}	


		case types.notesLogoutCleaning:
			return {
				...state,
				notes : [],
				active: null,
			}

		default:
			return state;
	}

}