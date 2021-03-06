import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import IProduct from '@/interfaces/product';
import _products from '@/data/products';

type Props = {
	product: IProduct;
};

function ProductPage({ product }: Props) {
	const router = useRouter();

	if (router.isFallback) {
		return <div>loading...</div>;
	}

	return <div>{product?.name}</div>;
}

export async function getStaticPaths() {
	const paths = _products.map((p) => ({ params: { id: p._id } }));

	return {
		paths,
		fallback: true,
	};
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const id = params!.id;
	const product = _products.find((p) => p._id === id);

	if (!product) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			product,
		},
		revalidate: 1,
	};
};

export default ProductPage;
