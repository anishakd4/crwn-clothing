import React from 'react';
import {ReactComponent as Logo} from '../../assets/crown.svg';
// import './header-style.scss';
import { auth } from '../../firebase/firebase-util';

import {connect} from 'react-redux';
import CartIcon from '../cart-icon/cart-icon-component';
import CartDropDown from '../cart-dropdown/cart-dropdown-component';
import { selectCurrentUser } from '../../redux/user/user-selector';
import { selectCartHidden } from '../../redux/cart/cart-selector';
import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink, OptionDiv } from './header-styles';

const Header = ({currentUser, hidden}) => (
    <HeaderContainer>
        <LogoContainer to="/" >
            <Logo className="logo" />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to="/shop">
                SHOP
            </OptionLink>
            <OptionLink to="/contact" >
                CONTACT
            </OptionLink>
            {
                currentUser?
                (<OptionDiv onClick={() => auth.signOut() }>SIGN OUT</OptionDiv>)
                :
                (<OptionLink to="/signin">SIGN IN</OptionLink>)
            }
            <CartIcon />
        </OptionsContainer>
        { hidden ? null : (<CartDropDown />) }
    </HeaderContainer>
);

const mapStateToProps = (state) => ({
    currentUser: selectCurrentUser(state),
    hidden: selectCartHidden(state)
});

export default connect(mapStateToProps)(Header);