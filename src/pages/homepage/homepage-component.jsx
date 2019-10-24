import React from 'react';
//import './homepage-style.scss'
import Directory from '../../components/directory/directory-component';
import { HomepageContainer } from './homepage-styles';

const HomePage = () => {
    return (
        <HomepageContainer>
            <Directory />
        </HomepageContainer>
    );
}

export default HomePage;