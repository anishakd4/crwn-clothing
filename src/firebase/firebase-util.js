import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyB76PW73RNaAZpZwOsavGtmFnoTrDT8uUs",
    authDomain: "crwn-db-e92a3.firebaseapp.com",
    databaseURL: "https://crwn-db-e92a3.firebaseio.com",
    projectId: "crwn-db-e92a3",
    storageBucket: "crwn-db-e92a3.appspot.com",
    messagingSenderId: "73112251920",
    appId: "1:73112251920:web:f24595af7982e3ab176495"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) {
        return;
    }

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapshot = await userRef.get();

    if(!snapshot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        }catch(error){
            console.log("error creating user", error.message);
        }
    }

    return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;