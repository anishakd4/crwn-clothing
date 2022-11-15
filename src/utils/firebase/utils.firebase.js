// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs,
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
	console.log('done');
};

export const getCategoriesAndDocuments = async () => {
	const collectionRef = collection(db, 'categories');
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);
	console.log('querySnapshot:', querySnapshot);
	const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
		console.log('querySnapshot:docSnapshot:', docSnapshot);
		const { title, items } = docSnapshot.data();
		acc[title.toLowerCase()] = items;
		return acc;
	}, {});

	return categoryMap;
};

export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInfo = {}
) => {
	if (!userAuth) return;
	const userDocRef = doc(db, 'users', userAuth.uid);
	console.log(
		'utils.firebase.js:createUserDocumentFromAuth:userDocRef:',
		userDocRef
	);
	const userSnapshot = await getDoc(userDocRef);
	console.log(
		'utils.firebase.js:createUserDocumentFromAuth:userSnapshot:',
		userSnapshot
	);
	console.log(
		'utils.firebase.js:createUserDocumentFromAuth:userSnapshot.exists:',
		userSnapshot.exists()
	);

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

	return userDocRef;
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
