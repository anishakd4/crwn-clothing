import { Outlet, Route, Routes } from 'react-router-dom';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';

const Shop = () => {
	return <div>This is the shop</div>;
};

const App = () => {
	return (
		<Routes>
			{/* <Route path='/' element={<Home />} />
			<Route path='/shop' element={<Shop />} /> */}

			<Route path='/' element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path='shop' element={<Shop />} />
			</Route>
		</Routes>
	);
};

export default App;
