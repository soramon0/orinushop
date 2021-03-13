import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';

import '@/styles/globals.css';
import Layout from '@/components/Layout';
import CartProvider from '@/lib/cart';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider session={pageProps.session}>
			<Layout>
				<CartProvider>
					<Component {...pageProps} />
				</CartProvider>
			</Layout>
		</Provider>
	);
}

export default MyApp;
