// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp  } from "firebase/app";
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
//push

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCKnjKIAW-hjej26pAVCiWwrkrFXgfCl0Q",
    authDomain: "time-vault-47a3e.firebaseapp.com",
    projectId: "time-vault-47a3e",
    storageBucket: "time-vault-47a3e.appspot.com",
    messagingSenderId: "1087873167788",
    appId: "1:1087873167788:web:f1b4152c681cfa20c8ca09"
};

  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = await new GoogleAuthProvider();




export {auth, provider, db};