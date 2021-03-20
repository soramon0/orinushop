import { useEffect, useState, useRef, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';

function RegisterPage() {
	const router = useRouter();
	const [creds, setCreds] = useState({ name: '', email: '', password: '' });
	const [message, setMessage] = useState<string | null>(null);
	const inputRef = useRef<HTMLInputElement>();

	useEffect(() => {
		axios.get('/api/auth/csrf').then(({ data }) => {
			if (inputRef.current) {
				inputRef.current.value = data.csrfToken;
			}
		});
	}, []);

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setCreds((state) => ({ ...state, [name]: value }));
	};

	const registerUser = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const { data } = await axios.post('/api/auth/register', creds);
			console.log(data);

			setMessage(null);
			router.push('/signin?register=success');
		} catch ({ response }) {
			if (response) {
				setMessage(response.data.message);
			} else {
				setMessage('Something went wrong. Please try agian.');
			}
		}
	};

	return (
		<main className='p-4 sm:w-128 mx-auto mt-4 space-y-6 sm:mt-8'>
			<h1 className='uppercase text-2xl tracking-wide font-medium text-gray-700'>
				Register
			</h1>

			{message && (
				<p className='bg-red-300 px-2 py-3 text-white border-red-400 border rounded-sm'>
					{message}
				</p>
			)}

			<form className='space-y-4' onSubmit={registerUser}>
				<input
					name='csrfToken'
					type='hidden'
					// @ts-ignore
					ref={inputRef}
				/>
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
					Sign up
				</button>
				<p className='text-gray-700'>
					Already a Customer?{' '}
					<Link href='/signin'>
						<a className='font-semibold'>Sign in</a>
					</Link>
				</p>
			</form>
		</main>
	);
}

export default RegisterPage;
