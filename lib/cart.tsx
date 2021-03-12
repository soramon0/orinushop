import {
	createContext,
	FC,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';

interface Context {
	items: string[];
	addItem(item: string): void;
}

const CartContext = createContext<Context | undefined>(undefined);

export function useCart() {
	const context = useContext(CartContext);

	if (context === undefined) {
		throw new Error('useCart must be used within a CartProvider');
	}

	return context;
}

const CartProvider: FC = ({ children }) => {
	const [items, setItems] = useState<string[]>([]);

	useEffect(() => {
		const cart = localStorage.getItem('cart');

		if (cart) {
			const items: string[] = JSON.parse(cart);

			setItems(items);
		}
	}, []);

	const value = useMemo(
		() => ({
			items,
			addItem: (item: string) => {
				const itemExists = items.includes(item);

				if (!itemExists) {
					const newState = [...items, item];
					setItems(newState);
					return localStorage.setItem('cart', JSON.stringify(newState));
				}
			},
		}),
		[items]
	);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
