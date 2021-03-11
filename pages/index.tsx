import Head from 'next/head';
import { InferGetStaticPropsType } from 'next';

import dbConnect from '@/lib/db';
import { default as ProductModel } from '@/models/Product';
import { IProductDoc } from '@/interfaces/product';
import Product from '@/components/Product';

function Home({ products }: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<div className='bg-gray-100'>
			<Head>
				<title>OrinuShop</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className='container mx-auto pt-8 px-4'>
				<h1 className='text-2xl font-semibold tracking-wide lg:text-4xl'>
					Latest Products
				</h1>

				<div className='mt-6 sm:flex sm:flex-wrap'>
					{products.map((product) => (
						<Product product={product} key={product._id} />
					))}
				</div>
			</main>
		</div>
	);
}

export async function getStaticProps() {
	await dbConnect();

	const docs: IProductDoc[] = await ProductModel.find({});
	const products = docs.map((doc) => doc.serialize());

	return {
		props: {
			products,
		},
	};
}

export default Home;
