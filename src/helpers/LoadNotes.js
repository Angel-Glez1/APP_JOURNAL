import { collection, getDocs } from "firebase/firestore/lite"
import { FireBaseDB } from "../firebase/config"



export const loadNotes = async (uid) => {

    const notes = [];
    const collectionRef = collection(FireBaseDB, `${uid}/journal/notes`)
    const docs = await getDocs(collectionRef);

    docs.forEach(doc => notes.push({ id: doc.id, ...doc.data() }))
    return notes;
}