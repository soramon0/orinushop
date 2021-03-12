import { AppProps } from 'next/app';

import '@/styles/globals.css';
import Layout from '@/components/Layout';
import CartProvider from '@/lib/cart';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<CartProvider>
				<Component {...pageProps} />
			</CartProvider>
		</Layout>
	);
}

export default MyApp;
