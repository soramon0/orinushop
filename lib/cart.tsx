import {
	createContext,
	FC,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';

export type ICartItem = {
	productId: string;
	name: string;
	image: string;
	price: number;
	countInStock: number;
	quantity: number;
};

interface Context {
	items: ICartItem[];
	addItem(item: ICartItem): void;
	removeItem(productId: string): void;
	changeQuantity(productId: string, quantity: number): void;
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
	const [items, setItems] = useState<ICartItem[]>([]);

	useEffect(() => {
		const cart = localStorage.getItem('cart');

		if (cart) {
			const items: ICartItem[] = JSON.parse(cart);

			setItems(items);
		}
	}, []);

	const storeItems = (newItems: ICartItem[]) => {
		setItems(newItems);
		localStorage.setItem('cart', JSON.stringify(items));
	};

	const value = useMemo(
		() => ({
			items,
			addItem(item: ICartItem) {
				const itemExists = items.some((i) => i.productId === item.productId);

				if (!itemExists) {
					storeItems([...items, item]);
				}
			},
			removeItem(productId: string) {
				const newItems = items.filter((i) => i.productId !== productId);
				storeItems(newItems);
			},
			changeQuantity(productId: string, quantity: number) {
				const index = items.findIndex((i) => i.productId === productId);

				if (index === -1) return;

				const newItems = [...items];
				newItems[index].quantity = quantity;
				storeItems(newItems);
			},
		}),
		[items]
	);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
