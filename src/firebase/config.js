import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'


const firebaseConfig = {
    apiKey: "AIzaSyCK8QiTcPqHSuNOnVUkZUYdzQZ8_4P6XoE",
    authDomain: "journal-app-v2-1e510.firebaseapp.com",
    projectId: "journal-app-v2-1e510",
    storageBucket: "journal-app-v2-1e510.appspot.com",
    messagingSenderId: "811206694001",
    appId: "1:811206694001:web:f36f1d04387a4e58e077d0",
    measurementId: "G-BX14447JR6"
};


// const analytics = getAnalytics(fireBaseApp);
export const FireBaseApp  = initializeApp(firebaseConfig);
export const FireBaseAuth = getAuth(FireBaseApp);
export const FireBaseDB   = getFirestore(FireBaseApp);