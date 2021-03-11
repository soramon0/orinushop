import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { isValidObjectId } from 'mongoose';

import dbConnect from '@/lib/db';
import { default as ProductModel } from '@/models/Product';
import IProduct, { IProductDoc } from '@/interfaces/product';
import ProductRating from '@/components/ProductRating';

type Props = {
	product: IProduct;
};

function ProductPage({ product }: Props) {
	const router = useRouter();
	const productStatus = product?.countInStock ? 'In Stock' : 'Out Of Stock';
	const isDisabled = product?.countInStock ? false : true;
	const btnStyle = isDisabled
		? 'cursor-not-allowed bg-gray-700'
		: 'cursor-pointer bg-gray-800 hover:bg-gray-900';

	if (router.isFallback) {
		return <div>Finding Product...</div>;
	}

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
						Price: <span>{product.price}</span>
					</p>
					<p className='border border-t-0 p-2 flex justify-between md:px-4'>
						Status: <span>{productStatus}</span>
					</p>
					<div className='border border-t-0 p-2 text-center md:px-4'>
						<button
							className={`w-11/12 py-2 px-4 text-white font-bold rounded ${btnStyle}`}
							disabled={isDisabled}
						>
							Add to cart
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export async function getStaticPaths() {
	await dbConnect();

	const docs: IProductDoc[] = await ProductModel.find({});
	const paths = docs.map((p) => ({
		params: { id: p._id.toString() as string },
	}));

	return {
		paths,
		fallback: true,
	};
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
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
}

export default ProductPage;
