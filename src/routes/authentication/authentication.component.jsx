import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import {
	auth,
	createUserDocumentFromAuth,
	signInWithGooglePopup,
	signInWithGoogleRedirect,
} from '../../utils/firebase/utils.firebase';
import SignupForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import './authentication.styles.scss';

const Authentication = () => {
	// useEffect(() => {
	// 	async function fetchData() {
	// 		const response = await getRedirectResult(auth);
	// 		console.log(response);
	// 		if (response) {
	// 			const userDocRef = await createUserDocumentFromAuth(response.user);
	// 		}
	// 	}
	// 	fetchData();
	// }, []);
	// const logGoogleRedirectUser = async () => {
	// 	const response = await signInWithGoogleRedirect();
	// 	console.log(response);
	// };
	return (
		<div className='authentication-container'>
			{/* <button onClick={signInWithGoogleRedirect}>
				Sign in with Google redirect
			</button> */}
			<SignInForm />
			<SignupForm />
		</div>
	);
};

export default Authentication;
