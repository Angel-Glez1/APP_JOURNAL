import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDn8ta6WxhG_rAO2SYuU7vdHWe2z576SCI",
	authDomain: "app-react-cursos.firebaseapp.com",
	projectId: "app-react-cursos",
	storageBucket: "app-react-cursos.appspot.com",
	messagingSenderId: "472072551828",
	appId: "1:472072551828:web:1656beb057777c59992381",
	measurementId: "G-DFPY5KX9W0"
};

// References a firebase (Auth)
firebase.initializeApp(firebaseConfig);


// Reference the DataBase in firebase
const db = firebase.firestore();

// Referencia para hacer login ó Register con Google
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
	db,
	googleAuthProvider,
	firebase
}