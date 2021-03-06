import { FC } from 'react';

import TopNavbar from './TopNavbar';
import Footer from './Footer';

const Layout: FC = ({ children }) => {
	return (
		<>
			<TopNavbar />
			{children}
			<Footer />
		</>
	);
};

export default Layout;
