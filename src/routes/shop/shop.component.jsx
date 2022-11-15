import { Fragment, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import ProductCard from '../../components/product-card/product-card.component';
import { CategoriesContext } from '../../contexts/categories.context';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
// import SHOP_DATA from '../../shop-data.json';
import './shop.styles.scss';

const Shop = () => {
	// const { categoriesMap } = useContext(CategoriesContext);
	// console.log('Shop:categoriesMap:', categoriesMap);
	return (
		// <div>
		// 	{SHOP_DATA.map(({ id, name }) => {
		// 		return (
		// 			<div key={id}>
		// 				<h1>{name}</h1>
		// 			</div>
		// 		);
		// 	})}
		// </div>

		// <div className='products-container'>
		// 		{/* {products.map((product) => {
		// 		return <ProductCard key={product.id} product={product} />;
		// 	})} */}
		// 	</div>
		// <div className='shop-container'>
		// 	{Object.keys(categoriesMap).map((title) => {
		// 		const products = categoriesMap[title];
		// 		return (
		// 			<CategoryPreview key={title} title={title} products={products} />
		// 		);
		// 	})}
		// </div>
		<Routes>
			<Route index element={<CategoriesPreview />} />
			<Route path=':category' element={<Category />} />
		</Routes>
	);
};

export default Shop;
