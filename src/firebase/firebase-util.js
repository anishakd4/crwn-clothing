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

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;