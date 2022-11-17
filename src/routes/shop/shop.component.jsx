import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { setCategories } from '../../store/categories/categories.action';
import { getCategoriesAndDocuments } from '../../utils/firebase/utils.firebase';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
// import SHOP_DATA from '../../shop-data.json';
import './shop.styles.scss';

const Shop = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const getCategoriesMap = async () => {
			const categoryArray = await getCategoriesAndDocuments();
			dispatch(setCategories(categoryArray));
		};
		getCategoriesMap();
	}, []);
	return (
		<Routes>
			<Route index element={<CategoriesPreview />} />
			<Route path=':category' element={<Category />} />
		</Routes>
	);
};

export default Shop;
