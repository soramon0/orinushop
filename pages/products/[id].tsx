import { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { isValidObjectId } from 'mongoose';

import dbConnect from '@/lib/db';
import { useCart, ICartItem } from '@/lib/cart';
import { default as ProductModel } from '@/models/Product';
import IProduct, { IProductDoc } from '@/interfaces/product';
import ProductRating from '@/components/ProductRating';

type Props = {
	product: IProduct;
};

function ProductPage({ product }: Props) {
	const router = useRouter();
	const [quantity, setQuantity] = useState(1);
	const { addItem } = useCart();
	const inStock = product.countInStock ? true : false;
	const productStatus = inStock ? 'In Stock' : 'Out Of Stock';
	const btnStyle = !inStock
		? 'cursor-not-allowed bg-gray-700'
		: 'cursor-pointer bg-gray-800 hover:bg-gray-900';

	const addToCart = () => {
		const item: ICartItem = {
			productId: product._id,
			name: product.name,
			image: product.image,
			price: product.price,
			countInStock: product.countInStock,
			quantity,
		};
		addItem(item);
		router.push(`/cart/${product._id}`);
	};

	return (
		<div className='p-4 max-w-screen-lg mx-auto 2xl:max-w-screen-xl'>
			<button
				className='bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded'
				onClick={() => router.back()}
			>
				Go back
			</button>

			<div className='sm:flex mt-4'>
				<div className='sm:w-2/5'>
					<Image src={product.image} width='1024' height='1024' />
				</div>
				<div className='mt-4 space-y-4 sm:mt-0 sm:px-4 sm:w-2/5'>
					<h1 className='pb-4 text-xl font-semibold text-gray-700 border-b'>
						{product.name}
					</h1>

					<div className='pb-4 border-b'>
						<ProductRating count={product.numReviews} rating={product.rating} />
					</div>
					<p className='pb-4 border-b text-gray-600'>
						Price: <span className='text-gray-800'>${product.price}</span>
					</p>
					<p className='pb-4 border-b text-gray-600'>
						Description:{' '}
						<span className='text-gray-800'>{product.description}</span>
					</p>
				</div>
				<div className='w-full mt-6 sm:mt-0 sm:w-1/5'>
					<p className='border p-2 flex justify-between md:px-4'>
						Price: <span className='class="text-sm"'>{product.price}</span>
					</p>
					<p className='border border-t-0 p-2 flex justify-between md:px-4'>
						Status: <span className='text-sm'>{productStatus}</span>
					</p>

					{inStock && (
						<form className='border border-t-0 p-2 flex justify-between md:px-4'>
							<label htmlFor='quantity'>Quantity:</label>
							<select
								id='quantity'
								className='w-1/2 py-1 px-2 border border-gray-300 bg-white rounded-sm shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
								onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
							>
								{Array.from({ length: product.countInStock })
									.fill(1)
									.map((_, i) => {
										const current = i + 1;

										return (
											<option key={current} value={current}>
												{current}
											</option>
										);
									})}
							</select>
						</form>
					)}

					<div className='border border-t-0 p-2 text-center md:px-4'>
						<button
							className={`w-11/12 py-2 px-4 text-sm text-white font-bold rounded ${btnStyle}`}
							disabled={!inStock}
							onClick={addToCart}
						>
							Add to cart
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	await dbConnect();

	const docs: IProductDoc[] = await ProductModel.find({});
	const paths = docs.map((p) => ({
		params: { id: p._id.toString() as string },
	}));

	return {
		paths,
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const id = params!.id;

	if (!id || !isValidObjectId(id)) {
		return {
			notFound: true,
		};
	}

	try {
		await dbConnect();

		const doc: IProductDoc = await ProductModel.findById(id);

		if (!doc) {
			return {
				notFound: true,
			};
		}

		return {
			props: {
				product: doc.serialize(),
			},
			revalidate: 1,
		};
	} catch {
		return {
			notFound: true,
		};
	}
};

export default ProductPage;
