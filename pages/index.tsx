import Head from 'next/head';
import { InferGetStaticPropsType } from 'next';

import _products from '@/data/products';
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

export default Home;

export async function getStaticProps() {
	return {
		props: {
			products: _products,
		},
	};
}
