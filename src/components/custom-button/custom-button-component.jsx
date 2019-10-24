import React from 'react';

// import './custom-button-style.scss';
import { CustomButtonContainer } from './custom-button-styles';

const CustomButton = ({children, ...otherProps}) => {
    return (
        <CustomButtonContainer {...otherProps}>
            {children}
        </CustomButtonContainer>
    );
}

export default CustomButton;