import { useRouter } from 'next/router';

function Cart() {
	const router = useRouter();
	console.log(router);

	if (!router.isReady) {
		return <p>Loading...</p>;
	}

	return <h1>Cart</h1>;
}

export default Cart;
