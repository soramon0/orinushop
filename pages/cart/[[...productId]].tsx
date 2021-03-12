import { useCart } from '@/lib/cart';
import { useRouter } from 'next/router';

function Cart() {
	const router = useRouter();
	const { items } = useCart();

	if (!router.isReady) {
		return <p>Loading...</p>;
	}

	return (
		<div>
			<h1>Cart Items</h1>
			{items.map((item) => (
				<p>Product: {item}</p>
			))}
		</div>
	);
}

export default Cart;
