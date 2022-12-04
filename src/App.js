import { lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Spinner from './components/spinner/spinner.component';
import { GlobalStyle } from './global.styles';
import { checkUserSession } from './store/user/user.action';

const Navigation = lazy(() =>
	import('./routes/navigation/navigation.component')
);
const Checkout = lazy(() => import('./routes/checkout/checkout.component'));
const Shop = lazy(() => import('./routes/shop/shop.component'));
const Home = lazy(() => import('./routes/home/home.component'));
const Authentication = lazy(() =>
	import('./routes/authentication/authentication.component')
);
const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		// getCurrentUser().then((user) => console.log('App:user:', user));
		dispatch(checkUserSession());
	}, []);
	return (
		<Suspense fallback={<Spinner />}>
			<GlobalStyle />
			<Routes>
				{/* <Route path='/' element={<Home />} />
			<Route path='/shop' element={<Shop />} /> */}

				<Route path='/' element={<Navigation />}>
					<Route index element={<Home />} />
					<Route path='shop/*' element={<Shop />} />
					<Route path='auth' element={<Authentication />} />
					<Route path='checkout' element={<Checkout />} />
				</Route>
			</Routes>
		</Suspense>
	);
};

export default App;
