import { Fragment, useContext } from 'react';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import ProductCard from '../../components/product-card/product-card.component';
import { CategoriesContext } from '../../contexts/categories.context';
// import SHOP_DATA from '../../shop-data.json';

const CategoriesPreview = () => {
	const { categoriesMap } = useContext(CategoriesContext);
	console.log('Shop:categoriesMap:', categoriesMap);
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
		<Fragment>
			{Object.keys(categoriesMap).map((title) => {
				const products = categoriesMap[title];
				return (
					<CategoryPreview key={title} title={title} products={products} />
				);
			})}
		</Fragment>
	);
};

export default CategoriesPreview;
