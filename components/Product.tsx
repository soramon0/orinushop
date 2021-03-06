import { VFC } from 'react';

import IProduct from '@/interfaces/product';
import ProductRating from './ProductRating';

type Props = {
	product: IProduct;
};

const Product: VFC<Props> = ({ product }) => {
	const productPath = `/product/${product._id}`;

	return (
		<div className='p-4 pl-0 sm:w-1/3 md:w-1/4'>
			<div className='bg-white p-4 shadow-sm'>
				<a href={productPath}>
					<img
						className='w-full h-64 object-cover'
						src={product.image}
						alt=''
					/>
				</a>

				<div className='mt-4 space-y-4'>
					<a href={productPath}>
						<h3
							title={product.name}
							className='text-xl font-semibold text-gray-700'
						>
							{product.name}
						</h3>
					</a>

					<ProductRating rating={product.rating} count={product.numReviews} />

					<h3 className='text-2xl font-bold text-gray-800 tracking-wide'>
						${product.price}
					</h3>
				</div>
			</div>
		</div>
	);
};

export default Product;
