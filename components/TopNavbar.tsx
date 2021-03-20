import { useState } from 'react';
import { useSession, signOut } from 'next-auth/client';
import Link from 'next/link';

function TopNavbar() {
	const [session, loading] = useSession();
	const [isOpen, setIsOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropDownEntering = isDropdownOpen
		? 'transform opacity-100 scale-100 visible'
		: 'transform opacity-0 scale-95 invisible';
	const isSignedIn = session && !loading;
	const showOpenIcon = !isOpen ? 'block' : 'hidden';
	const shopCloseIcon = isOpen ? 'block' : 'hidden';
	const openTransition = !isOpen
		? '-translate-y-full opacity-0 top-0'
		: '-translate-y-0 opacity-1';

	return (
		<nav className='bg-gray-800'>
			<div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
				<div className='relative flex items-center justify-between h-16'>
					<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
						<button
							type='button'
							className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
							aria-controls='mobile-menu'
							aria-expanded='false'
							onClick={() => setIsOpen((state) => !state)}
						>
							<span className='sr-only'>Open main menu</span>

							<svg
								className={`${showOpenIcon} h-6 w-6`}
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								aria-hidden='true'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M4 6h16M4 12h16M4 18h16'
								/>
							</svg>
							<svg
								className={`${shopCloseIcon} h-6 w-6`}
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								aria-hidden='true'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</button>
					</div>
					<div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
						<div className='flex-shrink-0 flex items-center'>
							<Link href='/'>
								<a className='text-white font-semibold tracking-wide'>
									OrinuShop
								</a>
							</Link>
						</div>
						<div className='hidden sm:flex sm:items-center sm:ml-6 sm:w-full'>
							<div className='ml-auto space-x-4'>
								<Link href='/cart'>
									<a className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
										Cart
									</a>
								</Link>

								{!isSignedIn && (
									<Link href='/signin'>
										<a className='ml-1 bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'>
											Sign in
										</a>
									</Link>
								)}

								{isSignedIn && (
									<div className=' relative inline-block text-left visible'>
										<div>
											<button
												type='button'
												className='inline-flex justify-center w-full shadow-sm px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-600 focus:ring-indigo-500'
												id='options-menu'
												aria-expanded='true'
												aria-haspopup='true'
												onClick={() => setIsDropdownOpen((state) => !state)}
											>
												{session?.user.name}
												<svg
													className='-mr-1 ml-2 h-5 w-5'
													xmlns='http://www.w3.org/2000/svg'
													viewBox='0 0 20 20'
													fill='currentColor'
													aria-hidden='true'
												>
													<path
														fillRule='evenodd'
														d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
														clipRule='evenodd'
													/>
												</svg>
											</button>
										</div>
										<div
											className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-out duration-100 ${dropDownEntering}`}
											role='menu'
											aria-orientation='vertical'
											aria-labelledby='options-menu'
										>
											<div className='py-1' role='none'>
												<Link href='/account'>
													<a
														className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
														role='menuitem'
													>
														Account
													</a>
												</Link>
												<button
													type='submit'
													className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
													role='menuitem'
													onClick={() => signOut()}
												>
													Sign out
												</button>
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div
				className={`bg-gray-800 transition-all transform absolute inset-x-0 z-50 ${openTransition} sm:hidden`}
				id='mobile-menu'
			>
				<div className='px-2 pt-2 pb-3 space-y-1'>
					<Link href='/cart'>
						<a className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'>
							Cart
						</a>
					</Link>

					<Link href='/account'>
						<a className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'>
							Account
						</a>
					</Link>

					{!isSignedIn && (
						<Link href='/signin'>
							<a className='bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium'>
								Sign in
							</a>
						</Link>
					)}

					{isSignedIn && (
						<button
							className='bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium'
							onClick={() => signOut()}
						>
							Sign out
						</button>
					)}
				</div>
			</div>
		</nav>
	);
}

export default TopNavbar;
