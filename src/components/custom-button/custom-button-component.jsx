import React from 'react';

import './custom-button-style.scss';

const CustomButton = ({children, isGoogleSignInButton, inverted, ...otherProps}) => {
    return (
        <button className={`${inverted ? "inverted" : ""} ${isGoogleSignInButton ? "google-sign-in" : ""} custom-button`} {...otherProps}>
            {children}
        </button>
    );
}

export default CustomButton;