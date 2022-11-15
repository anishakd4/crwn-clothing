import { Fragment, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/utils.firebase';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../contexts/cart.context';
import {
	LogoContainer,
	NavigationContainer,
	NavLinks,
	NavLink,
} from './navigation.styles';

const Navigation = () => {
	const { currentUser, setCurrentUser } = useContext(UserContext);
	const { isCartOpen, setIsCartOpen } = useContext(CartContext);
	console.log('Navigation:currentUser:', currentUser);
	// const signOutHandler = async () => {
	// 	await signOutUser();
	// 	setCurrentUser(null);
	// };
	return (
		<Fragment>
			<NavigationContainer>
				<LogoContainer to='/'>
					<CrownLogo className='logo' />
				</LogoContainer>
				<NavLinks>
					<NavLink to='/shop'>SHOP</NavLink>
					{currentUser ? (
						<NavLink as='span' className='nav-link' onClick={signOutUser}>
							SIGN OUT
						</NavLink>
					) : (
						<NavLink to='/auth'>SIGN IN</NavLink>
					)}
					<CartIcon />
				</NavLinks>
				{isCartOpen && <CartDropdown />}
			</NavigationContainer>
			<Outlet />
		</Fragment>
	);
};

export default Navigation;
