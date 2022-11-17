import { useState } from 'react';
import {
	signInAuthUserWithEmailAndPassword,
	signInWithGooglePopup,
} from '../../utils/firebase/utils.firebase';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.style.scss';

const deafultFormFields = {
	email: '',
	password: '',
};
const SignInForm = () => {
	const [formFields, setFormFields] = useState(deafultFormFields);
	const { email, password } = formFields;
	//const { setCurrentUser } = useContext(UserContext);

	const signInWithGoogle = async () => {
		const response = await signInWithGooglePopup();
		//setCurrentUser(response.user);
		//await createUserDocumentFromAuth(response.user);
	};

	const resetFormFields = () => {
		setFormFields(deafultFormFields);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await signInAuthUserWithEmailAndPassword(
				email,
				password
			);
			const { user } = response;
			//setCurrentUser(user);
			resetFormFields();
		} catch (error) {
			switch (error.code) {
				case 'auth/wrong-password':
					alert('incorrect password');
					break;
				case 'auth/user-not-found':
					alert('incorrect password');
					break;
				default:
					console.log('SignInForm:handleSubmit:error:', error);
			}
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};
	return (
		<div className='sign-up-container'>
			<h2>Already have and account</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Email'
					type='email'
					required
					onChange={handleChange}
					name='email'
					value={email}
				/>

				<FormInput
					label='Password'
					type='password'
					required
					onChange={handleChange}
					name='password'
					value={password}
				/>

				<div className='buttons-container'>
					<Button type='submit'>Sign In</Button>
					<Button
						type='button'
						buttonType={BUTTON_TYPE_CLASSES.google}
						onClick={signInWithGoogle}>
						Google Sign In
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
