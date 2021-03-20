import { ChangeEvent, FormEvent, useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getSession } from 'next-auth/client';
import axios from 'axios';

import IUser from '@/interfaces/user';

type Props = {
	sessionUser: IUser;
};

function AccountPage({ sessionUser }: Props) {
	const [user, setUser] = useState(sessionUser);

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUser((state) => ({ ...state, [name]: value }));
	};

	const updateUser = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const { data } = await axios.put<{ user: IUser }>('/api/users/me', user);
		setUser(data.user);
	};

	return (
		<>
			<Head>
				<title>OrinuShop | Account</title>
			</Head>

			<main className='p-4 max-w-screen-xl mx-auto space-y-4 sm:flex sm:space-x-4 sm:space-y-0'>
				<section className='sm:w-1/3'>
					<h3 className='text-2xl text-gray-800 tracking-wide font-medium'>
						User Profile
					</h3>
					<form className='mt-4 space-y-4' onSubmit={updateUser}>
						<div className='space-y-2'>
							<label
								htmlFor='name'
								className='block font-medium tracking-wide text-gray-500'
							>
								Name
							</label>
							<input
								type='text'
								name='name'
								id='name'
								placeholder='Enter name'
								className='w-full p-3 bg-gray-200 text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-700'
								defaultValue={user.name}
								onChange={onChange}
							/>
						</div>
						<div className='space-y-2'>
							<label
								htmlFor='email'
								className='block font-medium tracking-wide text-gray-500'
							>
								Email Address
							</label>
							<input
								type='email'
								name='email'
								id='email'
								placeholder='Enter email'
								className='w-full p-3 bg-gray-200 text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-700'
								defaultValue={user.email}
								onChange={onChange}
							/>
						</div>
						<div className='space-y-2'>
							<label
								htmlFor='password'
								className='block font-medium tracking-wide text-gray-500'
							>
								Password
							</label>
							<input
								type='password'
								name='password'
								id='password'
								placeholder='Enter password'
								className='w-full p-3 bg-gray-200 text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-700'
								onChange={onChange}
							/>
						</div>
						<button
							type='submit'
							className='bg-gray-900 uppercase tracking-wide hover:bg-gray-800 text-white font-bold py-2 px-4 rounded'
						>
							Update
						</button>
					</form>
				</section>

				<section className='sm:w-1/3'>
					<h3 className='text-2xl text-gray-800 tracking-wide font-medium'>
						Orders
					</h3>
				</section>
			</main>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx);

	if (!session) {
		return {
			redirect: {
				destination: '/signin',
				permanent: false,
			},
		};
	}

	return {
		props: {
			sessionUser: session.user,
		},
	};
};

export default AccountPage;
