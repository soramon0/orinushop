import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import { useCart } from '@/lib/cart';

function CartPage() {
	const router = useRouter();
	const { items, removeItem, changeQuantity } = useCart();
	const isCartEmpty = items.length === 0;
	const btnStyle = isCartEmpty
		? 'cursor-not-allowed bg-gray-700'
		: 'cursor-pointer bg-gray-800 hover:bg-gray-900';
	const subTotal = items.reduce((total, item) => total + item.quantity, 0);
	const priceTotal = items
		.reduce((total, item) => total + item.quantity * item.price, 0)
		.toFixed(2);

	const checkout = () => {
		router.push('/signin?=redirect=shipping');
	};

	if (!router.isReady) {
		return <p>Loading...</p>;
	}

	return (
		<main className='p-4 max-w-screen-lg mx-auto 2xl:max-w-screen-xl'>
			<div className='flex flex-col justify-between items-top sm:flex-row'>
				<h1 className='text-2xl font-medium tracking-wide lg:text-4xl'>
					Shopping Cart
				</h1>
				<div className='mt-4 sm:py-2 sm:mt-0'>
					<p className='flex justify-between text-sm border px-6 py-3 sm:py-1 sm:text-base sm:block'>
						Subtotal ({subTotal}) items <br />
						<span>${priceTotal}</span>
					</p>
					<div className='w-full border border-t-0 py-2 text-center'>
						<button
							className={`w-11/12 py-2 px-4 text-sm text-white font-bold rounded ${btnStyle}`}
							disabled={isCartEmpty}
							onClick={checkout}
						>
							Checkout
						</button>
					</div>
				</div>
			</div>

			<div className='mt-8'>
				{isCartEmpty ? (
					<div className='bg-yellow-200 px-4 py-2 rounded-sm'>
						<p>
							Your cart is empty,{' '}
							<Link href='/'>
								<a className='text-blue-500 underline'>Go Back</a>
							</Link>
						</p>
					</div>
				) : (
					items.map((item) => (
						<div
							className='pb-2 my-4 border-b sm:pb-0 sm:space-x-6 sm:flex'
							key={item.productId}
						>
							<div className='flex items-start space-x-4'>
								<div className='w-32'>
									<Image src={item.image} width='150' height='100' />
								</div>
								<div className='sm:w-32'>
									<h3 className='font-semibold text-gray-700'>{item.name}</h3>
								</div>
								<button
									className='w-8 h-8 focus:outline-none focus:ring-red-300 focus:border-red-300 sm:w-6 sm:h-6'
									onClick={() => removeItem(item.productId)}
								>
									<svg
										className='w-fill h-full'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
										/>
									</svg>
								</button>
							</div>
							<div className='w-full flex justify-between items-baseline sm:justify-start sm:space-x-4'>
								<p className='text-lg text-gray-800'>${item.price}</p>
								<select
									id='quantity'
									className='w-32 inline-block py-1 px-2 border border-gray-300 bg-white rounded-sm shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									defaultValue={item.quantity}
									onChange={({ target }) =>
										changeQuantity(item.productId, Number(target.value))
									}
								>
									{Array.from({ length: item.countInStock })
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
							</div>
						</div>
					))
				)}
			</div>
		</main>
	);
}

export default CartPage;
