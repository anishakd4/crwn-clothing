// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	createUserWithEmailAndPassword,
	getAuth,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signInWithRedirect,
	signOut,
} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	query,
	setDoc,
	writeBatch,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCdV9dkAV82-20RP-WbJBzrIlQ02X0TZQE',
	authDomain: 'crwn-clothing-db-7fbc7.firebaseapp.com',
	projectId: 'crwn-clothing-db-7fbc7',
	storageBucket: 'crwn-clothing-db-7fbc7.appspot.com',
	messagingSenderId: '751591459923',
	appId: '1:751591459923:web:c07f9062ae893c7b3d4aa6',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
	signInWithRedirect(auth, googleProvider);
export const db = getFirestore();

export const addCollectionAndDocuments = async (
	collectionKey,
	objectsToAdd
) => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});

	await batch.commit();
};

export const getCategoriesAndDocuments = async (str) => {
	const collectionRef = collection(db, 'categories');
	const q = query(collectionRef);

	//await Promise.reject(new Error('Forced error'));
	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInfo = {}
) => {
	if (!userAuth) return;
	const userDocRef = doc(db, 'users', userAuth.uid);

	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createAt = new Date();
		try {
			setDoc(userDocRef, { displayName, email, createAt, ...additionalInfo });
		} catch (error) {
			console.log(
				'utils.firebase.js:createUserDocumentFromAuth:error creating user document',
				error.message
			);
		}
	}

	return userSnapshot;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
	onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = onAuthStateChanged(
			auth,
			(userAuth) => {
				unsubscribe();
				resolve(userAuth);
			},
			reject
		);
	});
};
