import Swal from 'sweetalert2';
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { types } from '../types/types';
import { noteLogout } from './notes';
import { finishLoading, startLoading } from './ui';


/**
 * 
 * Esta accion la ocupamos el mi authReducer se encarga de generar el uid que el es que
 * me permite el acceso a mi app.
 * 
 * @param {Number|String } uid El id del usuario autentificado
 * @param {String} displayName El nombre del usuario autentificadp
 * @returns {Object} Retorna un objeto con el uid y el nombre del usuario autentificado
 */
export const login = (uid, displayName) => ({
	type: types.login,
	payload: { uid, displayName }
});


/**
 * Esta accion se encarga de hacer un login a firebase en base a un 
 * correo y password si se loguea con exito el user hacemos el dispatch
 * a mi authreducer que nos va a retornar el uid y el displayname del usuario logueado.
 * 
 * @param {String} email Email con el que el user se haciendo Login
 * @param {String} password Password del usuario
 * @returns Retorna un callback que ejecuta el auth 
 */
export const startLoginEmailPassword = (email = '', password = '') => {

	return async (dispatch) => {
		dispatch(startLoading());
		try {

			const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
			dispatch(login(user.uid, user.displayName))
			dispatch(finishLoading());
			console.log(user);

		} catch (e) {
			console.log(e);
			dispatch(finishLoading());
			Swal.fire('Error', e.message, 'error' );
		}

	}
}


/**
 * Esta accion se encarga de hacer el LOGIN de mis usuario por medio de GOOGLE en firebase
 * @returns Retorna un callback que hace el llamado a firebase
 */
export const startGoogleLogin = () => {

	return async (dispatch) => {

		try {
			const { user: { uid, displayName } } = await firebase.auth().signInWithPopup(googleAuthProvider);
			dispatch(login(uid, displayName));
		} catch (e) {
			// console.log(error);
			Swal.fire('Error', e.message, 'error');

		}

	}
}

/**
 * Esta accion se encarga de REGISTAR un nuevo usuario en Firebase, de forma
 * tradicional (por un email y password)
 * 
 * @param {String} email Email con el que se va a registar un nuevo usuario
 * @param {String} password El password del usuario a registarse
 * @param {String} name El nombre del user que se registra
 * @returns {Object} Retorna un objeto con el uid y el name del usuario que esta usando la app.
 */
export const startRegisterWithEmailPasswordName = (email, password, name) => {

	return async (dispatch) => {

		try {

			const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
			await user.updateProfile({ displayName: name });
			dispatch(login(user.uid, user.displayName));

		} catch (e) {
			// console.log(error);
			Swal.fire('Error', e.message, 'error');

		}

	}
}


export const startLogout = () =>{

	return async (dispatch) => {

		await firebase.auth().signOut();
		dispatch(noteLogout());
		dispatch( logout() );
	}
}


export const logout = () => {
	return {
		type: types.logout
	}
}




