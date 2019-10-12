import React from 'react';

import './sign-in-style.scss';
import FormInput from '../form-input/form-input-component';
import CustomButton from '../custom-button/custom-button-component';
import { signInWithGoogle } from '../../firebase/firebase-util';

class SignIn extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({email: "", password: ""});
    }

    handleChange = (event) => {
        const {name, value} = event.target;

        this.setState({[name]: value});
    }


    render(){
        return(
            <div className="sign-in">
                <h2 className="title">I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        name="email" 
                        value={this.state.email} 
                        type="email" 
                        handleChange={this.handleChange}
                        label="email"
                        required />

                    <FormInput 
                        name="password" 
                        value={this.state.password} 
                        type="password" 
                        handleChange={this.handleChange}
                        label="password"
                        required />

                    <div className="buttons">
                        <CustomButton type="submit">SIGN IN</CustomButton>

                        <CustomButton onClick={signInWithGoogle} isGoogleSignInButton={true} >SIGN IN WITH GOOGLE</CustomButton>
                    </div>

                    
                </form>
            </div>
        );
    }

}

export default SignIn;