import { Fragment, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './navigation.styles.scss';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/utils.firebase';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../contexts/cart.context';

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
			<div className='navigation'>
				<Link className='logo-container' to='/'>
					<CrownLogo className='logo' />
				</Link>
				<div className='nav-links-container'>
					<Link className='nav-link' to='/shop'>
						SHOP
					</Link>
					{currentUser ? (
						<span className='nav-link' onClick={signOutUser}>
							SIGN OUT
						</span>
					) : (
						<Link className='nav-link' to='/auth'>
							SIGN IN
						</Link>
					)}
					<CartIcon />
				</div>
				{isCartOpen && <CartDropdown />}
			</div>
			<Outlet />
		</Fragment>
	);
};

export default Navigation;
