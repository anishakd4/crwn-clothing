import { User } from 'firebase/auth';
import { all, call, put, takeLatest } from 'typed-redux-saga/macro';
import {
	AdditionalInformation,
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
	getCurrentUser,
	signInAuthUserWithEmailAndPassword,
	signInWithGooglePopup,
	signOutUser,
} from '../../utils/firebase/utils.firebase';
import {
	EmailSignInStart,
	signInFailed,
	signInSuccess,
	signOutFailed,
	signOutSuccess,
	signUpFailed,
	SignUpStart,
	SignUpSuccess,
	signUpSuccess,
} from './user.action';
import { USER_ACTION_TYPES } from './user.types';

export function* getSnapshotFromUserAuth(
	userAuth: User,
	additionalDetails?: AdditionalInformation
) {
	try {
		const snapshot = yield* call(
			createUserDocumentFromAuth,
			userAuth,
			additionalDetails
		);
		// console.log(snapshot);
		// console.log(snapshot.data());
		if (snapshot) {
			yield* put(signInSuccess({ id: snapshot.id, ...snapshot.data() }));
		}
	} catch (error) {
		yield* put(signInFailed(error as Error));
	}
}

export function* isUserAuthenticated() {
	try {
		const userAuth = yield* call(getCurrentUser);
		if (!userAuth) return;
		yield call(getSnapshotFromUserAuth, userAuth);
	} catch (error) {
		yield put(signInFailed(error as Error));
	}
}

export function* signInWithGoogle() {
	try {
		const { user } = yield* call(signInWithGooglePopup);
		yield* call(getSnapshotFromUserAuth, user);
	} catch (error) {
		yield* put(signInFailed(error as Error));
	}
}

export function* signInWithEmail(action: EmailSignInStart) {
	const { payload } = action;
	const { email, password } = payload;
	try {
		const userCredential = yield* call(
			signInAuthUserWithEmailAndPassword,
			email,
			password
		);
		if (userCredential) {
			const { user } = userCredential;
			yield* call(getSnapshotFromUserAuth, user);
		}
	} catch (error) {
		yield* put(signInFailed(error as Error));
	}
}

export function* signUp({
	payload: { email, password, displayName },
}: SignUpStart) {
	try {
		const userCredential = yield* call(
			createAuthUserWithEmailAndPassword,
			email,
			password
		);
		if (userCredential) {
			const { user } = userCredential;
			yield* put(signUpSuccess(user, { displayName }));
		}
	} catch (error) {
		yield* put(signUpFailed(error as Error));
	}
}

export function* signOut() {
	try {
		yield* call(signOutUser);
		yield* put(signOutSuccess());
	} catch (error) {
		yield* put(signOutFailed(error as Error));
	}
}

export function* signInAfterSignUp({
	payload: { user, additionalDetails },
}: SignUpSuccess) {
	yield* call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* onEmailSignInStart() {
	yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onGoogleSignInStart() {
	yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession() {
	yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignUpStart() {
	yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
	yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
	yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSagas() {
	yield* all([
		call(onCheckUserSession),
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(onSignUpStart),
		call(onSignUpSuccess),
		call(onSignOutStart),
	]);
}
