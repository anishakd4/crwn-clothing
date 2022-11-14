import { useState } from 'react';
import './sign-up-form.style.scss';
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from '../../utils/firebase/utils.firebase';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

const deafultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
};
const SignupForm = () => {
	const [formFields, setFormFields] = useState(deafultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	console.log(formFields);

	const resetFormFields = () => {
		setFormFields(deafultFormFields);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}

		try {
			const response = await createAuthUserWithEmailAndPassword(
				email,
				password
			);
			console.log(response);
			const { user } = response;

			await createUserDocumentFromAuth(user, { displayName });
			resetFormFields();
		} catch (error) {
			if (error.code === 'auth/email-already-in-use') {
				alert('Email already in use');
			} else {
				console.log(error);
			}
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};
	return (
		<div className='sign-up-container'>
			<h2>Don't have and account</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Display Name'
					type='text'
					required
					onChange={handleChange}
					name='displayName'
					value={displayName}
				/>

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

				<FormInput
					label='Confirm Password'
					type='password'
					required
					onChange={handleChange}
					name='confirmPassword'
					value={confirmPassword}
				/>

				<Button type='submit'>Sign Up</Button>
			</form>
		</div>
	);
};

export default SignupForm;
