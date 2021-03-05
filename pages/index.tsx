import Head from 'next/head';

export default function Home() {
	return (
		<div className='h-screen bg-gray-100'>
			<Head>
				<title>OrinuShop</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className='h-full flex justify-center items-center'>
				<h1 className='text-2xl font-semibold tracking-wide text-center lg:text-4xl'>
					Coming Soon!
				</h1>
			</main>
		</div>
	);
}
