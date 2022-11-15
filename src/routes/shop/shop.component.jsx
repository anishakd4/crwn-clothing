import { useContext } from 'react';
import ProductCard from '../../components/product-card/product-card.component';
import { ProductsContext } from '../../contexts/products.context';
import SHOP_DATA from '../../shop-data.json';
import './shop.styles.scss';

const Shop = () => {
	const { products } = useContext(ProductsContext);
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
		<div className='products-container'>
			{products.map((product) => {
				return <ProductCard key={product.id} product={product} />;
			})}
		</div>
	);
};

export default Shop;
