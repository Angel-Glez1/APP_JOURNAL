import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { FireBaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
    try {

        const response = await signInWithPopup(FireBaseAuth, googleProvider);
        const { displayName, email, photoURL, uid, } = response.user;
        return { ok: true, displayName, email, photoURL, uid, }

    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}


export const loginWithEmailPassword = async ({ email, password }) => {
    try {

        const response = await signInWithEmailAndPassword(FireBaseAuth, email, password)
        const { displayName, photoURL, uid, } = response.user;
        return { ok: true, displayName, email: response.user.email, photoURL, uid, }

    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}


export const registerUserWithEmailPassword = async ({ email, password, displayName, }) => {
    try {

        const response = await createUserWithEmailAndPassword(FireBaseAuth, email, password);
        await updateProfile(FireBaseAuth.currentUser, { displayName });
        return {
            ok: true,
            photoURL: response.user.photoURL,
            uid: response.user.uid,
            displayName,
            email,
        }

    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}


export const logoutFirabase = async () => {
    return await FireBaseAuth.signOut();
}