import { VFC } from 'react';

type Props = {
	rating: number;
	count: number;
};

const stars = Array.from({ length: 5 }).fill(1);

const ProductRating: VFC<Props> = ({ rating, count }) => {
	return (
		<div className='flex items-center space-x-2'>
			<span className='flex text-gray-500'>
				{stars.map((_, i) => {
					const score = i + 0.5;
					const fillStar =
						rating >= score ? 'fill-current text-yellow-300' : '';

					return (
						<svg
							key={i}
							className={`w-6 h-6 ${fillStar}`}
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
							/>
						</svg>
					);
				})}
			</span>
			<span className='text-gray-500 italic'>{count} reviews</span>
		</div>
	);
};

export default ProductRating;
